import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({ 
  quantity, 
  onQuantityChange 
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 text-sm font-medium text-accent">
        <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
          1
        </span>
        <span className="text-foreground">QUANTITY</span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="btn-secondary flex-shrink-0 w-12 h-12 p-0 rounded-xl"
        >
          <Minus className="w-5 h-5" />
        </Button>

        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleInputChange}
          className="input-field text-center text-lg font-semibold"
        />

        <Button
          onClick={handleIncrement}
          className="btn-secondary flex-shrink-0 w-12 h-12 p-0 rounded-xl"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuantityControls;
