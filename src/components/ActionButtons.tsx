import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth hook

interface ActionButtonsProps {
  upc: string;
  quantity: number;
  onActionComplete: (action: string, success: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  upc, 
  quantity, 
  onActionComplete 
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth(); // Get the logged-in user

  const handleAction = async (action: 'add' | 'subtract' | 'get') => {
    if (!upc) {
      toast({
        variant: "destructive",
        title: "Missing UPC",
        description: "Please scan a UPC code first.",
        duration: 7000, // Set duration for readability
      });
      return;
    }

    setLoadingAction(action);

    try {
      // Get webhook URL from environment variables
      const webhookUrls = {
        add: import.meta.env.VITE_REACT_APP_ADD_URL,
        subtract: import.meta.env.VITE_REACT_APP_SUBTRACT_URL,
        get: import.meta.env.VITE_REACT_APP_GET_URL
      };

      const webhookUrl = webhookUrls[action];
      
      if (!webhookUrl) {
        toast({
          title: "Webhook Not Configured",
          description: `${action.toUpperCase()} webhook URL not found in environment variables.`,
          duration: 7000, // Set duration for readability
        });
        // Simulate successful action for demo if URL is missing
        await new Promise(resolve => setTimeout(resolve, 1000));
        onActionComplete(action, true);
        toast({
          title: "Action Simulated",
          description: `${action.toUpperCase()} operation completed (simulated).`,
          duration: 7000, // Set duration for readability
        });
        return;
      }

      let payload: { upc: string; units?: number; username: string };
      const username = user?.email || 'guest'; // Get username, default to 'guest' if not logged in

      // Construct payload based on action type
      if (action === 'add' || action === 'subtract') {
        payload = { upc, units: quantity, username };
      } else if (action === 'get') {
        payload = { upc, username };
      } else {
        // Default payload if action is not explicitly handled
        payload = { upc, username };
      }

      // Send request to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json(); // Parse response as JSON
        let message = data.message || `${action.toUpperCase()} operation completed successfully.`; // Extract 'message'
        
        // Replace escaped newlines (\\n) with actual newlines (\n)
        message = message.replace(/\\n/g, '\n');

        onActionComplete(action, true);
        toast({
          title: "Success",
          description: message, // Use the processed message
          duration: 7000, // Set duration for readability
        });
      } else {
        // Attempt to parse error message from response body if available
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          // If response is not JSON, use default error message
        }
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error(`${action} action failed:`, error);
      onActionComplete(action, false);
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: `Failed to ${action} items. ${error instanceof Error ? error.message : 'Please try again.'}`,
        duration: 7000, // Set duration for readability
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const actions = [
    {
      id: 'add',
      label: 'Add',
      icon: Plus,
      className: 'btn-primary',
      description: 'Add to inventory'
    },
    {
      id: 'subtract',
      label: 'Subtract', 
      icon: Minus,
      className: 'btn-secondary',
      description: 'Remove from inventory'
    },
    {
      id: 'get',
      label: 'Get',
      icon: Package,
      className: 'btn-accent',
      description: 'Get inventory status'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const isLoading = loadingAction === action.id;
          
          return (
            <Button
              key={action.id}
              onClick={() => handleAction(action.id as 'add' | 'subtract' | 'get')}
              disabled={isLoading || !upc}
              className={`${action.className} h-14 text-lg font-semibold justify-start gap-3`}
            >
              <Icon className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
              <div className="flex flex-col items-start">
                <span>{isLoading ? 'Processing...' : action.label}</span>
                <span className="text-xs opacity-75 font-normal">
                  {action.description}
                </span>
              </div>
            </Button>
          );
        })}
      </div>

      {!upc && (
        <p className="text-center text-sm text-muted-foreground">
          Scan a UPC code to enable actions
        </p>
      )}
    </div>
  );
};

export default ActionButtons;
