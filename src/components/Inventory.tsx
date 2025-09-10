import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, RotateCcw } from 'lucide-react';
import BarcodeScanner from './BarcodeScanner';
import QuantityControls from './QuantityControls';
import ActionButtons from './ActionButtons';
import StatusBar from './StatusBar';

const Inventory: React.FC = () => {
  const [upc, setUpc] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScan = (scannedCode: string) => {
    setUpc(scannedCode);
    setIsScannerOpen(false);
  };

  const handleActionComplete = (action: string, success: boolean) => {
    console.log(`Action ${action} completed:`, success);
    // Additional logic for action completion if needed
  };

  const handleReset = () => {
    setUpc('');
    setQuantity(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">MBF Inventory</h1>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* UPC Scan Section */}
        <Card className="card-surface">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <QrCode className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-lg">ITEM-ID</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Scanner Button */}
            <Button
              onClick={() => setIsScannerOpen(true)}
              className="btn-accent w-full h-24 flex-col gap-2"
            >
              <QrCode className="w-8 h-8" />
              <span className="text-lg font-semibold">Scan UPC</span>
            </Button>

            {/* UPC Display */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="No code scanned"
                value={upc}
                onChange={(e) => setUpc(e.target.value)}
                className="input-field text-center font-mono"
                readOnly={false}
              />
              {!upc && (
                <p className="text-center text-sm text-muted-foreground">
                  Scan or enter UPC code manually
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quantity Section */}
        <Card className="card-surface">
          <CardContent className="pt-6">
            <QuantityControls
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="card-surface">
          <CardContent className="pt-6">
            <ActionButtons
              upc={upc}
              quantity={quantity}
              onActionComplete={handleActionComplete}
            />
          </CardContent>
        </Card>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={isScannerOpen}
        onScan={handleScan}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
};

export default Inventory;
