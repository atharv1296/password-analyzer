import { useState } from "react";
import { MessageSquare, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordFeedbackProps {
  warnings: string[];
  suggestions: string[];
}

export default function PasswordFeedback({ warnings, suggestions }: PasswordFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  // Helper function to render feedback items
  const renderFeedbackItems = (items: string[], type: 'warning' | 'suggestion') => {
    if (items.length === 0) return null;

    return items.map((item, index) => {
      const isWarning = type === 'warning';
      
      return (
        <div 
          key={`${type}-${index}`} 
          className={`p-2 ${isWarning 
            ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
            : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
          } border rounded text-sm`}
        >
          {isWarning 
            ? <AlertCircle className="h-4 w-4 inline mr-1" /> 
            : <Lightbulb className="h-4 w-4 inline mr-1" />
          }
          <span>{item}</span>
        </div>
      );
    });
  };

  // Don't show toggle if there's no feedback
  if (warnings.length === 0 && suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-purple-500 dark:text-purple-400" />
          Feedback
        </h3>
        <Button 
          variant="link" 
          size="sm" 
          onClick={toggleVisibility}
          className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 p-0 h-auto"
        >
          {isVisible ? 'Hide details' : 'Show details'}
        </Button>
      </div>
      {isVisible && (
        <div className="space-y-2">
          {warnings.length > 0 && (
            <div className="space-y-2 mb-2">
              {renderFeedbackItems(warnings, 'warning')}
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              {renderFeedbackItems(suggestions, 'suggestion')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
