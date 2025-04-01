import { useState, useEffect } from "react";
import { analyzePassword, type PasswordStrength } from "@/lib/passwordStrength";
import PasswordInput from "./PasswordInput";
import StrengthMeter from "./StrengthMeter";
import CrackTimeEstimator from "./CrackTimeEstimator";
import CharacterRequirements from "./CharacterRequirements";
import PasswordFeedback from "./PasswordFeedback";
import ImprovementSuggestions from "./ImprovementSuggestions";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Shield } from "lucide-react";

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState<PasswordStrength | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (password === "") {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate delay for analysis (makes the UI feel more responsive)
    const timeoutId = setTimeout(() => {
      const result = analyzePassword(password);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Card className="w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-700 dark:to-pink-600">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5" /> Password Strength Analyzer
            </h1>
            <ModeToggle />
          </div>
          <p className="text-purple-50 text-sm mt-1">Secure your digital identity with strong passwords</p>
        </div>

        {/* Main content */}
        <CardContent className="p-6">
          <PasswordInput 
            value={password} 
            onChange={setPassword} 
            isAnalyzing={isAnalyzing} 
            status={analysis?.strengthText} 
          />
          
          <StrengthMeter 
            percentage={analysis?.strengthPercentage ?? 0} 
            label={analysis?.strengthText ?? "None"} 
            color={analysis?.strengthColor ?? "bg-gray-300 dark:bg-gray-600"} 
          />
          
          <CrackTimeEstimator 
            onlineTime={analysis?.crackTimeDisplay.online ?? "Infinity"} 
            offlineTime={analysis?.crackTimeDisplay.offline ?? "Infinity"} 
            showWarning={analysis?.crackTimeSeconds.offline !== undefined && 
                         analysis.crackTimeSeconds.offline < 3600} 
          />
          
          <CharacterRequirements requirements={analysis?.requirements} />
          
          <PasswordFeedback 
            warnings={analysis?.feedbackWarnings ?? []} 
            suggestions={analysis?.feedbackSuggestions ?? []} 
          />
          
          <ImprovementSuggestions />
        </CardContent>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Privacy Notice:</span> Your password is analyzed securely in your browser and is never sent to a server.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p className="font-medium text-purple-700 dark:text-purple-400">Password Security Tips:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Use a different password for each account</li>
                <li>Consider using a password manager</li>
                <li>Enable two-factor authentication when available</li>
                <li>Change sensitive passwords every 3-6 months</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
