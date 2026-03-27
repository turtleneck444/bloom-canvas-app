// Advanced Simulation Engine with Monte Carlo, Sensitivity Analysis, and Risk Modeling

export interface SimulationVariable {
  id: string;
  name: string;
  type: 'budget' | 'timeline' | 'resources' | 'market' | 'custom';
  currentValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  distribution: 'normal' | 'uniform' | 'triangular' | 'lognormal';
  volatility: number; // 0-1 scale
}

export interface SimulationOutcome {
  id: string;
  name: string;
  probability: number;
  roi: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timeline: number;
  resources: number;
  description: string;
  recommendations: string[];
  risks: string[];
  npv: number;
  irr: number;
  paybackPeriod: number;
  confidenceInterval: { lower: number; upper: number };
}

export interface MonteCarloResult {
  iterations: number;
  meanOutcome: number;
  medianOutcome: number;
  stdDeviation: number;
  percentile5: number;
  percentile25: number;
  percentile75: number;
  percentile95: number;
  probabilityOfSuccess: number;
  probabilityOfLoss: number;
  distribution: number[];
  convergenceHistory: number[];
}

export interface SensitivityResult {
  variableId: string;
  variableName: string;
  baseOutcome: number;
  lowOutcome: number;
  highOutcome: number;
  sensitivity: number; // Absolute sensitivity coefficient
  elasticity: number;  // Percentage change in output / percentage change in input
  rank: number;
  tornadoLow: number;
  tornadoHigh: number;
}

export interface RiskHeatmapCell {
  likelihood: number;   // 1-5
  impact: number;       // 1-5
  riskScore: number;    // likelihood * impact
  riskLevel: 'negligible' | 'low' | 'medium' | 'high' | 'critical';
  risks: string[];
  mitigations: string[];
}

export interface ScenarioComparison {
  scenarioId: string;
  scenarioName: string;
  expectedReturn: number;
  risk: number;
  sharpeRatio: number;
  maxDrawdown: number;
  successProbability: number;
  breakEvenTime: number;
}

// --- Statistical Utility Functions ---

function normalRandom(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

function lognormalRandom(mean: number, stdDev: number): number {
  const variance = stdDev * stdDev;
  const mu = Math.log((mean * mean) / Math.sqrt(variance + mean * mean));
  const sigma = Math.sqrt(Math.log(1 + variance / (mean * mean)));
  return Math.exp(normalRandom(mu, sigma));
}

function triangularRandom(min: number, mode: number, max: number): number {
  const u = Math.random();
  const fc = (mode - min) / (max - min);
  if (u < fc) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  }
  return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
}

function uniformRandom(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function sampleVariable(variable: SimulationVariable): number {
  const { currentValue, minValue, maxValue, distribution, volatility } = variable;
  const stdDev = (maxValue - minValue) * volatility * 0.25;

  switch (distribution) {
    case 'normal':
      return Math.max(minValue, Math.min(maxValue, normalRandom(currentValue, stdDev)));
    case 'lognormal':
      return Math.max(minValue, Math.min(maxValue, lognormalRandom(currentValue, stdDev)));
    case 'triangular':
      return triangularRandom(minValue, currentValue, maxValue);
    case 'uniform':
    default:
      return uniformRandom(minValue, maxValue);
  }
}

function percentile(sortedArr: number[], p: number): number {
  const idx = (p / 100) * (sortedArr.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sortedArr[lower];
  return sortedArr[lower] + (sortedArr[upper] - sortedArr[lower]) * (idx - lower);
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr: number[], avg: number): number {
  const variance = arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

// --- Outcome Model ---

function computeOutcome(sampledVars: Map<string, number>, variables: SimulationVariable[]): number {
  // Weighted outcome model: sum of (normalizedValue * impactWeight)
  let score = 0;
  let totalWeight = 0;

  for (const v of variables) {
    const sampled = sampledVars.get(v.id) || v.currentValue;
    const normalized = (sampled - v.minValue) / (v.maxValue - v.minValue); // 0-1
    const weight = v.impact === 'high' ? 3 : v.impact === 'medium' ? 2 : 1;

    // Budget inversely correlates (lower cost = better), others directly
    if (v.type === 'budget') {
      score += (1 - normalized) * weight;
    } else {
      score += normalized * weight;
    }
    totalWeight += weight;
  }

  return totalWeight > 0 ? score / totalWeight : 0.5;
}

// --- Public Simulation Engine ---

class SimulationEngine {
  /**
   * Run a full Monte Carlo simulation
   */
  runMonteCarlo(
    variables: SimulationVariable[],
    iterations: number = 10000,
    onProgress?: (pct: number) => void
  ): MonteCarloResult {
    const results: number[] = [];
    const convergence: number[] = [];
    const batchSize = Math.max(1, Math.floor(iterations / 100));

    for (let i = 0; i < iterations; i++) {
      const sampledVars = new Map<string, number>();
      for (const v of variables) {
        sampledVars.set(v.id, sampleVariable(v));
      }
      results.push(computeOutcome(sampledVars, variables));

      if ((i + 1) % batchSize === 0) {
        const pct = Math.round(((i + 1) / iterations) * 100);
        convergence.push(mean(results));
        onProgress?.(pct);
      }
    }

    results.sort((a, b) => a - b);
    const avg = mean(results);
    const sd = stdDev(results, avg);

    return {
      iterations,
      meanOutcome: avg,
      medianOutcome: percentile(results, 50),
      stdDeviation: sd,
      percentile5: percentile(results, 5),
      percentile25: percentile(results, 25),
      percentile75: percentile(results, 75),
      percentile95: percentile(results, 95),
      probabilityOfSuccess: results.filter(r => r >= 0.5).length / iterations,
      probabilityOfLoss: results.filter(r => r < 0.3).length / iterations,
      distribution: this.buildHistogram(results, 50),
      convergenceHistory: convergence,
    };
  }

  /**
   * Sensitivity analysis – tornado chart data
   */
  runSensitivityAnalysis(
    variables: SimulationVariable[],
    iterations: number = 2000
  ): SensitivityResult[] {
    // Base case
    const baseVars = new Map<string, number>();
    variables.forEach(v => baseVars.set(v.id, v.currentValue));
    const baseOutcome = computeOutcome(baseVars, variables);

    const results: SensitivityResult[] = variables.map(targetVar => {
      // Low scenario: set target to min, others at current
      const lowVars = new Map(baseVars);
      lowVars.set(targetVar.id, targetVar.minValue);
      const lowOutcome = computeOutcome(lowVars, variables);

      // High scenario: set target to max, others at current
      const highVars = new Map(baseVars);
      highVars.set(targetVar.id, targetVar.maxValue);
      const highOutcome = computeOutcome(highVars, variables);

      const sensitivity = Math.abs(highOutcome - lowOutcome);
      const pctChangeInput = (targetVar.maxValue - targetVar.minValue) / targetVar.currentValue;
      const pctChangeOutput = (highOutcome - lowOutcome) / baseOutcome;
      const elasticity = pctChangeInput !== 0 ? pctChangeOutput / pctChangeInput : 0;

      return {
        variableId: targetVar.id,
        variableName: targetVar.name,
        baseOutcome,
        lowOutcome,
        highOutcome,
        sensitivity,
        elasticity,
        rank: 0,
        tornadoLow: lowOutcome - baseOutcome,
        tornadoHigh: highOutcome - baseOutcome,
      };
    });

    // Rank by sensitivity
    results.sort((a, b) => b.sensitivity - a.sensitivity);
    results.forEach((r, i) => (r.rank = i + 1));

    return results;
  }

  /**
   * Generate a risk heatmap (5x5 grid)
   */
  generateRiskHeatmap(variables: SimulationVariable[]): RiskHeatmapCell[][] {
    const grid: RiskHeatmapCell[][] = [];

    for (let likelihood = 1; likelihood <= 5; likelihood++) {
      const row: RiskHeatmapCell[] = [];
      for (let impact = 1; impact <= 5; impact++) {
        const score = likelihood * impact;
        const level = score <= 4 ? 'negligible'
          : score <= 8 ? 'low'
          : score <= 12 ? 'medium'
          : score <= 16 ? 'high'
          : 'critical';

        // Map variables to cells based on their volatility and impact
        const cellRisks: string[] = [];
        const cellMitigations: string[] = [];

        variables.forEach(v => {
          const vLikelihood = Math.ceil(v.volatility * 5);
          const vImpact = v.impact === 'high' ? 5 : v.impact === 'medium' ? 3 : 1;
          if (vLikelihood === likelihood && vImpact === impact) {
            cellRisks.push(`${v.name} volatility risk`);
            cellMitigations.push(`Monitor ${v.name.toLowerCase()} closely, set thresholds`);
          }
        });

        row.push({ likelihood, impact, riskScore: score, riskLevel: level, risks: cellRisks, mitigations: cellMitigations });
      }
      grid.push(row);
    }

    return grid;
  }

  /**
   * Compare multiple scenarios
   */
  compareScenarios(
    scenarios: Array<{ id: string; name: string; variables: SimulationVariable[] }>,
    iterations: number = 5000
  ): ScenarioComparison[] {
    return scenarios.map(scenario => {
      const mc = this.runMonteCarlo(scenario.variables, iterations);

      const sharpeRatio = mc.stdDeviation > 0
        ? (mc.meanOutcome - 0.3) / mc.stdDeviation // 0.3 as risk-free threshold
        : 0;

      // Compute max drawdown from convergence history
      let peak = -Infinity;
      let maxDrawdown = 0;
      for (const val of mc.convergenceHistory) {
        if (val > peak) peak = val;
        const drawdown = (peak - val) / peak;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
      }

      return {
        scenarioId: scenario.id,
        scenarioName: scenario.name,
        expectedReturn: mc.meanOutcome,
        risk: mc.stdDeviation,
        sharpeRatio,
        maxDrawdown,
        successProbability: mc.probabilityOfSuccess,
        breakEvenTime: Math.round((1 - mc.meanOutcome) * 24), // months estimate
      };
    });
  }

  /**
   * Generate AI-style outcome narratives from Monte Carlo results
   */
  generateOutcomes(
    variables: SimulationVariable[],
    mcResult: MonteCarloResult
  ): SimulationOutcome[] {
    const outcomes: SimulationOutcome[] = [];

    // Conservative outcome (25th percentile)
    outcomes.push({
      id: 'outcome-conservative',
      name: 'Conservative Scenario',
      probability: 0.25,
      roi: (mcResult.percentile25 - 0.5) * 0.4,
      riskLevel: 'low',
      timeline: Math.round(18 + (1 - mcResult.percentile25) * 12),
      resources: Math.round(variables.filter(v => v.type === 'resources').reduce((s, v) => s + v.currentValue, 0) * 0.7),
      description: `Conservative approach with ${(mcResult.percentile25 * 100).toFixed(0)}% outcome score. Lower risk with steady, predictable returns. Best for risk-averse stakeholders.`,
      recommendations: [
        'Start with pilot markets or small-scale implementation',
        'Build strong local partnerships before scaling',
        'Focus on proven revenue models first',
        'Maintain 20% budget reserve for contingencies',
      ],
      risks: [
        'Slow market penetration may allow competitors to establish first',
        'Limited growth ceiling in conservative mode',
        'Team may lose momentum with slower pace',
      ],
      npv: mcResult.percentile25 * 500000,
      irr: mcResult.percentile25 * 0.15,
      paybackPeriod: 24,
      confidenceInterval: { lower: mcResult.percentile5, upper: mcResult.percentile25 },
    });

    // Balanced outcome (median)
    outcomes.push({
      id: 'outcome-balanced',
      name: 'Balanced Strategy',
      probability: 0.5,
      roi: (mcResult.medianOutcome - 0.5) * 0.6,
      riskLevel: 'medium',
      timeline: Math.round(12 + (1 - mcResult.medianOutcome) * 8),
      resources: Math.round(variables.filter(v => v.type === 'resources').reduce((s, v) => s + v.currentValue, 0)),
      description: `Balanced approach with ${(mcResult.medianOutcome * 100).toFixed(0)}% outcome score. Moderate risk with strong growth potential. Recommended for most organizations.`,
      recommendations: [
        'Phase-based expansion with quarterly review gates',
        'Data-driven market selection using analytics',
        'Flexible resource allocation with rebalancing triggers',
        'Invest in both proven and emerging channels',
      ],
      risks: [
        'Market timing may not align with execution timeline',
        'Resource constraints during peak scaling periods',
        'Competitive pressure from both incumbents and disruptors',
      ],
      npv: mcResult.medianOutcome * 750000,
      irr: mcResult.medianOutcome * 0.22,
      paybackPeriod: 16,
      confidenceInterval: { lower: mcResult.percentile25, upper: mcResult.percentile75 },
    });

    // Aggressive outcome (75th percentile)
    outcomes.push({
      id: 'outcome-aggressive',
      name: 'Aggressive Expansion',
      probability: 0.25,
      roi: (mcResult.percentile75 - 0.5) * 1.0,
      riskLevel: 'high',
      timeline: Math.round(8 + (1 - mcResult.percentile75) * 4),
      resources: Math.round(variables.filter(v => v.type === 'resources').reduce((s, v) => s + v.currentValue, 0) * 1.5),
      description: `Aggressive approach with ${(mcResult.percentile75 * 100).toFixed(0)}% outcome score. High risk with maximum growth potential. For organizations with strong capital reserves.`,
      recommendations: [
        'Invest heavily in marketing and brand presence from day one',
        'Hire experienced teams in target markets simultaneously',
        'Pursue strategic acquisitions to accelerate market entry',
        'Set aggressive KPIs with weekly tracking',
      ],
      risks: [
        'High upfront capital expenditure with delayed returns',
        'Operational complexity of managing rapid multi-market expansion',
        'Quality control challenges at scale',
        'Market rejection risk if product-market fit is not validated',
      ],
      npv: mcResult.percentile75 * 1200000,
      irr: mcResult.percentile75 * 0.35,
      paybackPeriod: 10,
      confidenceInterval: { lower: mcResult.percentile75, upper: mcResult.percentile95 },
    });

    return outcomes;
  }

  // --- Helpers ---

  private buildHistogram(data: number[], bins: number): number[] {
    const min = data[0];
    const max = data[data.length - 1];
    const binWidth = (max - min) / bins;
    const histogram = new Array(bins).fill(0);

    for (const val of data) {
      const idx = Math.min(Math.floor((val - min) / binWidth), bins - 1);
      histogram[idx]++;
    }

    return histogram.map(count => count / data.length); // Normalize to probabilities
  }
}

export const simulationEngine = new SimulationEngine();
