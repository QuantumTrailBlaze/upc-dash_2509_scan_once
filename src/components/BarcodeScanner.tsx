import React, { useEffect, useRef, useState, useCallback } from 'react';
import Quagga from 'quagga';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose, isOpen }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  // Use a ref for isProcessingScan to keep onDetectedCallback stable
  const isProcessingScanRef = useRef(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Define handleClose using useCallback to make it stable
  const handleClose = useCallback(() => {
    if (isInitialized) {
      Quagga.stop();
      setIsInitialized(false);
      isProcessingScanRef.current = false; // Reset processing state via ref
    }
    onClose();
  }, [isInitialized, onClose]);

  // Define the onDetected callback as a stable function
  // It should not depend on isProcessingScan state directly, but use the ref
  const onDetectedCallback = useCallback(async (result: any) => {
    if (isProcessingScanRef.current) { // Check ref's current value
      // Already processing a scan, ignore subsequent detections for this session
      return;
    }

    const code = result.codeResult.code;
    if (code) {
      isProcessingScanRef.current = true; // Start processing this scan via ref

      // 1. Pass the scanned code to the parent component
      onScan(code);

      // 2. Call the VITE_REACT_APP_GET_URL webhook
      const getWebhookUrl = import.meta.env.VITE_REACT_APP_GET_URL;
      const username = user?.email || 'guest';

      if (!getWebhookUrl) {
        toast({
          title: "Webhook Not Configured",
          description: "GET webhook URL not found in environment variables.",
          duration: 7000,
        });
        handleClose(); // Close scanner even if webhook URL is missing
        return;
      }

      try {
        const response = await fetch(getWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ upc: code, username }),
        });

        if (response.ok) {
          const data = await response.json();
          let message = data.message || "UPC information retrieved successfully.";
          message = message.replace(/\\n/g, '\n');

          toast({
            title: "UPC Information",
            description: message,
            duration: 7000,
          });
        } else {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            // If response is not JSON, use default error message
          }
          toast({
            variant: "destructive",
            title: "Failed to Get UPC Info",
            description: errorMessage,
            duration: 7000,
          });
        }
      } catch (error) {
        console.error('GET webhook call failed:', error);
        toast({
          variant: "destructive",
          title: "Network Error",
          description: `Could not retrieve UPC information. ${error instanceof Error ? error.message : 'Please try again.'}`,
          duration: 7000,
        });
      } finally {
        // 3. Close the scanner after all operations (success or failure)
        handleClose();
      }
    }
  }, [onScan, user, handleClose, toast]); // Dependencies for useCallback: isProcessingScanRef is not needed here

  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeScanner();
    }

    return () => {
      if (isInitialized) {
        // Explicitly remove the listener before stopping Quagga
        Quagga.offDetected(onDetectedCallback);
        Quagga.stop();
        setIsInitialized(false);
        isProcessingScanRef.current = false; // Ensure processing state is reset on cleanup
      }
    };
  }, [isOpen, isInitialized, onDetectedCallback]); // onDetectedCallback is now stable

  const initializeScanner = async () => {
    if (!scannerRef.current) {
      console.error('Scanner target element not found.');
      toast({
        variant: "destructive",
        title: "Scanner Error",
        description: "Could not find scanner target element.",
      });
      handleClose(); // Close if target is missing
      return;
    }

    // Ensure Quagga is stopped and listeners are cleared before re-initializing
    // This is a crucial step to prevent listener accumulation
    if (isInitialized) {
      Quagga.offDetected(onDetectedCallback); // Remove any existing listener
      Quagga.stop(); // Stop any running scanner
      setIsInitialized(false); // Reset state
      isProcessingScanRef.current = false; // Reset processing flag
    }

    try {
      const config = {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader"
          ]
        },
        locate: true,
        numOfWorkers: 2,
        frequency: 10,
        debug: {
          drawBoundingBox: true,
          showFrequency: false,
          drawScanline: true,
          showPattern: false
        }
      };

      await new Promise<void>((resolve, reject) => {
        Quagga.init(config, (err) => {
          if (err) {
            console.error('Quagga init error:', err);
            reject(err);
            return;
          }
          Quagga.start();
          setIsInitialized(true);
          resolve();
        });
      });

      // Attach the stable onDetected callback ONLY AFTER successful initialization
      Quagga.onDetected(onDetectedCallback);

    } catch (error) {
      console.error('Scanner initialization error:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access camera for scanning.",
      });
      handleClose(); // Close scanner if initialization fails
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-surface w-full max-w-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold">Scan UPC Code</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div
              ref={scannerRef}
              className="relative w-full h-64 bg-muted rounded-xl overflow-hidden"
            >
              {!isInitialized && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Initializing camera...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Position the barcode within the viewfinder</p>
              <p>The scanner will automatically detect and scan the code</p>
            </div>

            <Button
              onClick={handleClose}
              variant="secondary"
              className="btn-secondary w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
