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
          className={`p-3 ${isWarning 
            ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
          } border rounded-lg text-sm flex items-start`}
        >
          {isWarning 
            ? <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 mr-2" /> 
            : <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5 mr-2" />
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
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-emerald-500 dark:text-emerald-400" />
          Password Analysis Feedback
        </h3>
        <Button 
          variant="outline"
          size="sm" 
          onClick={toggleVisibility}
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-7 px-2"
        >
          {isVisible ? 'Hide details' : 'Show details'}
        </Button>
      </div>
      
      {!isVisible && (warnings.length > 0 || suggestions.length > 0) && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {warnings.length > 0 
            ? `${warnings.length} warning${warnings.length > 1 ? 's' : ''} and `
            : ''
          }
          {suggestions.length > 0 
            ? `${suggestions.length} suggestion${suggestions.length > 1 ? 's' : ''} available.`
            : ''
          } Click "Show details" to view.
        </p>
      )}
      
      {isVisible && (
        <div className="space-y-3 mt-3">
          {warnings.length > 0 && (
            <div className="space-y-2 mb-3">
              <h4 className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Warnings:</h4>
              {renderFeedbackItems(warnings, 'warning')}
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Suggestions:</h4>
              {renderFeedbackItems(suggestions, 'suggestion')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
