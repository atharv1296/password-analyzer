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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-slate-800 transition-colors duration-200">
      <div className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
          Password Strength Analyzer
        </h1>
        <p className="text-emerald-700 dark:text-emerald-300 text-lg">
          Your personal security assistant for creating unbreakable passwords
        </p>
      </div>
      
      <Card className="w-full max-w-4xl overflow-hidden shadow-lg border-0">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-6 h-6" /> Password Defender
            </h2>
            <ModeToggle />
          </div>
          <p className="text-emerald-50 text-md mt-2">Advanced security analysis for your digital fortress</p>
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
        <div className="px-8 py-6 bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 border-t border-emerald-100 dark:border-emerald-900/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">Why Password Security Matters</h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  A strong password is your first line of defense against unauthorized access. Cyber attacks are becoming more sophisticated every day, with hackers using advanced tools to crack weak passwords.
                </p>
                <p>
                  In 2023, over 24 billion passwords were exposed in data breaches. The average cost of a data breach to an organization is $4.45 million, and 80% of these breaches involve compromised credentials.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm mb-4">Password Security Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-xs mb-1">Strong & Unique</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Use a different strong password for each of your accounts.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-xs mb-1">Password Manager</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Use a reputable password manager to generate and store complex passwords.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-xs mb-1">Multi-Factor Authentication</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Enable 2FA/MFA wherever possible to add an extra layer of security.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-medium text-emerald-600 dark:text-emerald-400 text-xs mb-1">Regular Updates</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Change sensitive passwords every 3-6 months and after any breach.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-emerald-100 dark:border-emerald-900/30 text-center">
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              <span className="font-semibold">Privacy Notice:</span> Your password is analyzed securely in your browser and is never transmitted over the internet.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
