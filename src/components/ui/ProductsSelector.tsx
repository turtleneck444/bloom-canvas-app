import React from 'react';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActionSearchBar } from '@/components/ui/action-search-bar';

interface ProductsSelectorProps {
  currentProduct: string;
  onProductChange: (product: string) => void;
}

const ProductsSelector: React.FC<ProductsSelectorProps> = ({
  currentProduct,
  onProductChange,
}) => {
  const products = [
    { id: 'mindmaps', label: 'Mind Maps', description: 'AI-powered mind mapping', icon: '🧠' },
    { id: 'presentations', label: 'Presentations', description: 'Dynamic presentations', icon: '📊' },
    { id: 'meetings', label: 'Meetings', description: 'Smart meeting tools', icon: '🤝' },
    { id: 'canvas', label: 'Canvas', description: 'Creative canvas workspace', icon: '🎨' },
    { id: 'docs', label: 'Documents', description: 'Collaborative documents', icon: '📝' },
    { id: 'analytics', label: 'Analytics', description: 'Data insights & reports', icon: '📈' },
  ];

  const currentProductData = products.find(p => p.id === currentProduct);

  const productActions = products.map(product => ({
    id: product.id,
    label: product.label,
    description: product.description,
    icon: <span className="text-lg">{product.icon}</span>,
    color: '#7F5FFF',
    onClick: () => {
      console.log('Product selected:', product.id);
      onProductChange(product.id);
    }
  }));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-nov8-primary" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentProductData?.label || 'Mind Maps'}
        </span>
      </div>
      
      <ActionSearchBar
        placeholder="Search products..."
        actions={productActions}
        className="w-32 h-8 text-xs"
        compact={true}
      />
    </div>
  );
};

export default ProductsSelector; 