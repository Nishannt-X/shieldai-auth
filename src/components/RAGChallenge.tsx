import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Brain, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface RAGChallengeProps {
  onComplete: (success: boolean) => void;
  className?: string;
}

const sampleQuestions = [
  {
    question: "What is the name of the contact you last sent ₹5,000 to via UPI?",
    expectedAnswer: "Rajesh Kumar",
    hint: "Think about your recent UPI transactions"
  },
  {
    question: "Which restaurant did you pay ₹2,500 to last Tuesday?",
    expectedAnswer: "Spice Garden",
    hint: "Your recent dining transaction"
  },
  {
    question: "What was the amount of your last electricity bill payment?",
    expectedAnswer: "₹3,200",
    hint: "Check your recent utility payments"
  }
];

export const RAGChallenge = ({ onComplete, className }: RAGChallengeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = sampleQuestions[currentQuestion];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeOut();
    }
  }, [timeLeft]);

  const handleTimeOut = () => {
    onComplete(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isCorrect = userAnswer.toLowerCase().includes(question.expectedAnswer.toLowerCase());
    
    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => onComplete(true), 1000);
    } else {
      setFeedback('incorrect');
      setAttempts(prev => prev + 1);
      
      if (attempts >= 2) {
        setTimeout(() => onComplete(false), 1000);
      } else {
        setTimeout(() => {
          setFeedback(null);
          setUserAnswer("");
          setCurrentQuestion((prev) => (prev + 1) % sampleQuestions.length);
        }, 2000);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <Card className={`border-border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>RAG Security Challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={timeLeft > 10 ? 'default' : 'destructive'} className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {timeLeft}s
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Attempt {attempts + 1}/3
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-4 bg-secondary/50 rounded-lg border">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium">{question.question}</p>
                <p className="text-sm text-muted-foreground">{question.hint}</p>
              </div>
            </div>
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg border ${
              feedback === 'correct' 
                ? 'bg-success/10 border-success text-success' 
                : 'bg-destructive/10 border-destructive text-destructive'
            }`}>
              <div className="flex items-center gap-2">
                {feedback === 'correct' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {feedback === 'correct' 
                    ? 'Correct! Identity verified.' 
                    : 'Incorrect answer. Please try again.'}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              disabled={isLoading || feedback === 'correct'}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && userAnswer && handleSubmit()}
              className="bg-background/50"
            />
            
            <Button 
              onClick={handleSubmit}
              disabled={!userAnswer || isLoading || feedback === 'correct'}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                'Submit Answer'
              )}
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-secondary/30 rounded border">
          <strong>How it works:</strong> This RAG (Retrieval-Augmented Generation) system asks personalized questions based on your banking history that only you would know. Remote attackers cannot answer these contextual challenges.
        </div>
      </CardContent>
    </Card>
  );
};