import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Split description by newline characters to render each line separately
        const descriptionLines = description ? description.split('\n') : [];

        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {descriptionLines.length > 0 && (
                <ToastDescription>
                  {descriptionLines.map((line, index) => (
                    <p key={index} className="mb-1 last:mb-0">
                      {line}
                    </p>
                  ))}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
