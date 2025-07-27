// Advanced Export Service - Professional Quality Exports
// Supports PDF, PNG, SVG, PowerPoint, JSON, Markdown, and more

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

export interface ExportOptions {
  format: 'pdf' | 'png' | 'svg' | 'json' | 'markdown' | 'powerpoint' | 'csv';
  quality: 'draft' | 'standard' | 'high' | 'print';
  includeMetadata: boolean;
  includeConnections: boolean;
  theme: 'light' | 'dark' | 'professional';
  paperSize?: 'A4' | 'A3' | 'letter' | 'custom';
  orientation?: 'portrait' | 'landscape';
  customDimensions?: { width: number; height: number };
}

export interface ExportData {
  title: string;
  nodes: any[];
  edges: any[];
  metadata: {
    created: string;
    nodeCount: number;
    qualityScore?: number;
    aiModel?: string;
    template?: string;
  };
}

export class AdvancedExportService {
  
  // High-Quality PNG Export
  static async exportToPNG(
    canvasElement: HTMLElement, 
    options: ExportOptions,
    data: ExportData
  ): Promise<Blob> {
    toast.loading('📸 Generating high-quality PNG...', { duration: 2000 });
    
    const scale = this.getQualityScale(options.quality);
    
    try {
      const canvas = await html2canvas(canvasElement, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: options.theme === 'dark' ? '#1a1a1a' : '#ffffff',
        width: canvasElement.scrollWidth,
        height: canvasElement.scrollHeight,
        logging: false
      });
      
      // Add watermark if needed
      if (options.includeMetadata) {
        this.addWatermark(canvas, data);
      }
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            toast.success('🎨 PNG exported successfully!');
            resolve(blob);
          }
        }, 'image/png', 1.0);
      });
    } catch (error) {
      toast.error('Failed to export PNG');
      throw error;
    }
  }

  // Professional PDF Export
  static async exportToPDF(
    canvasElement: HTMLElement,
    options: ExportOptions,
    data: ExportData
  ): Promise<Blob> {
    toast.loading('📄 Creating professional PDF...', { duration: 3000 });
    
    try {
      const canvas = await html2canvas(canvasElement, {
        scale: this.getQualityScale(options.quality),
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options.orientation || 'landscape',
        unit: 'mm',
        format: options.paperSize || 'A4'
      });
      
      // Get page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit page
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = pageWidth - 20; // 10mm margin on each side
      let imgHeight = imgWidth / imgAspectRatio;
      
      if (imgHeight > pageHeight - 30) { // Leave space for header/footer
        imgHeight = pageHeight - 30;
        imgWidth = imgHeight * imgAspectRatio;
      }
      
      // Add header
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(data.title, pageWidth / 2, 15, { align: 'center' });
      
      // Add the mind map image
      pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, 20, imgWidth, imgHeight);
      
      // Add metadata footer if requested
      if (options.includeMetadata) {
        this.addPDFMetadata(pdf, data, pageHeight);
      }
      
      const pdfBlob = pdf.output('blob');
      toast.success('📋 Professional PDF created!');
      return pdfBlob;
    } catch (error) {
      toast.error('Failed to export PDF');
      throw error;
    }
  }

  // Structured Markdown Export
  static async exportToMarkdown(data: ExportData, options: ExportOptions): Promise<string> {
    toast.loading('📝 Generating structured Markdown...', { duration: 1500 });
    
    let markdown = `# ${data.title}\n\n`;
    
    // Add metadata
    if (options.includeMetadata) {
      markdown += `## Metadata\n\n`;
      markdown += `- **Created**: ${data.metadata.created}\n`;
      markdown += `- **Nodes**: ${data.metadata.nodeCount}\n`;
      if (data.metadata.qualityScore) {
        markdown += `- **Quality Score**: ${(data.metadata.qualityScore * 100).toFixed(1)}%\n`;
      }
      if (data.metadata.aiModel) {
        markdown += `- **AI Model**: ${data.metadata.aiModel}\n`;
      }
      if (data.metadata.template) {
        markdown += `- **Template**: ${data.metadata.template}\n`;
      }
      markdown += `\n`;
    }
    
    // Group nodes by importance and category
    const fundamentalNodes = data.nodes.filter(node => node.metadata?.isFundamental);
    const strategicNodes = data.nodes.filter(node => 
      !node.metadata?.isFundamental && (node.importance || 0) >= 7
    );
    const supportingNodes = data.nodes.filter(node => 
      !node.metadata?.isFundamental && (node.importance || 0) < 7
    );
    
    // Fundamental concepts
    if (fundamentalNodes.length > 0) {
      markdown += `## 🎯 Fundamental Concepts\n\n`;
      fundamentalNodes.forEach(node => {
        markdown += `### ${node.label}\n\n`;
        if (node.description) {
          markdown += `${node.description}\n\n`;
        }
        if (node.metadata?.suggestedBranches?.length > 0) {
          markdown += `**Key Areas**: ${node.metadata.suggestedBranches.join(', ')}\n\n`;
        }
      });
    }
    
    // Strategic nodes
    if (strategicNodes.length > 0) {
      markdown += `## 🚀 Strategic Elements\n\n`;
      strategicNodes.forEach(node => {
        markdown += `### ${node.label}\n\n`;
        if (node.description) {
          markdown += `${node.description}\n\n`;
        }
      });
    }
    
    // Supporting nodes
    if (supportingNodes.length > 0) {
      markdown += `## 🔧 Supporting Elements\n\n`;
      supportingNodes.forEach(node => {
        markdown += `- **${node.label}**`;
        if (node.description) {
          markdown += `: ${node.description}`;
        }
        markdown += `\n`;
      });
      markdown += `\n`;
    }
    
    // Add connections if requested
    if (options.includeConnections && data.edges.length > 0) {
      markdown += `## 🔗 Connections\n\n`;
      data.edges.forEach(edge => {
        const sourceNode = data.nodes.find(n => n.id === edge.source);
        const targetNode = data.nodes.find(n => n.id === edge.target);
        if (sourceNode && targetNode) {
          markdown += `- ${sourceNode.label} → ${targetNode.label}\n`;
        }
      });
    }
    
    toast.success('📝 Markdown export completed!');
    return markdown;
  }

  // Professional JSON Export
  static async exportToJSON(data: ExportData, options: ExportOptions): Promise<string> {
    toast.loading('💾 Preparing structured JSON...', { duration: 1000 });
    
    const exportData = {
      mindMap: {
        title: data.title,
        metadata: {
          ...data.metadata,
          exportedAt: new Date().toISOString(),
          exportOptions: options
        },
        structure: {
          fundamentalConcepts: data.nodes.filter(n => n.metadata?.isFundamental),
          strategicElements: data.nodes.filter(n => 
            !n.metadata?.isFundamental && (n.importance || 0) >= 7
          ),
          supportingElements: data.nodes.filter(n => 
            !n.metadata?.isFundamental && (n.importance || 0) < 7
          )
        },
        nodes: data.nodes,
        connections: options.includeConnections ? data.edges : [],
        analytics: {
          totalNodes: data.nodes.length,
          totalConnections: data.edges.length,
          fundamentalNodeCount: data.nodes.filter(n => n.metadata?.isFundamental).length,
          averageImportance: data.nodes.reduce((sum, n) => sum + (n.importance || 0), 0) / data.nodes.length
        }
      }
    };
    
    toast.success('💾 JSON export ready!');
    return JSON.stringify(exportData, null, 2);
  }

  // CSV Export for Data Analysis
  static async exportToCSV(data: ExportData, options: ExportOptions): Promise<string> {
    toast.loading('📊 Generating CSV for analysis...', { duration: 1000 });
    
    const headers = [
      'Label',
      'Category',
      'Importance',
      'Description',
      'Is Fundamental',
      'Complexity',
      'AI Generated',
      'Template Generated'
    ];
    
    let csv = headers.join(',') + '\n';
    
    data.nodes.forEach(node => {
      const row = [
        `"${node.label || ''}"`,
        `"${node.category || ''}"`,
        node.importance || 0,
        `"${(node.description || '').replace(/"/g, '""')}"`,
        node.metadata?.isFundamental || false,
        node.metadata?.complexity || 0,
        node.metadata?.aiGenerated || false,
        node.metadata?.templateGenerated || false
      ];
      csv += row.join(',') + '\n';
    });
    
    toast.success('📊 CSV export completed!');
    return csv;
  }

  // Utility methods
  private static getQualityScale(quality: string): number {
    switch (quality) {
      case 'draft': return 1;
      case 'standard': return 2;
      case 'high': return 3;
      case 'print': return 4;
      default: return 2;
    }
  }

  private static addWatermark(canvas: HTMLCanvasElement, data: ExportData): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.textAlign = 'right';
    ctx.fillText(
      `Generated by NOV8 Mind Map • ${data.metadata.created}`,
      canvas.width - 10,
      canvas.height - 10
    );
  }

  private static addPDFMetadata(pdf: any, data: ExportData, pageHeight: number): void {
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(128, 128, 128);
    
    const footerY = pageHeight - 10;
    pdf.text(`Generated by NOV8 Mind Map AI • ${data.metadata.created}`, 10, footerY);
    
    if (data.metadata.nodeCount) {
      pdf.text(`${data.metadata.nodeCount} nodes`, pdf.internal.pageSize.getWidth() - 10, footerY, { align: 'right' });
    }
  }

  // Download utility
  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static downloadText(content: string, filename: string, mimeType: string = 'text/plain'): void {
    const blob = new Blob([content], { type: mimeType });
    this.downloadFile(blob, filename);
  }
}

export default AdvancedExportService; 