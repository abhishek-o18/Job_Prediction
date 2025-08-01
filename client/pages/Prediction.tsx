import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  BookOpen, 
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Zap,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface PredictionResult {
  successProbability: number;
  category: 'high' | 'medium' | 'low';
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    timeframe: string;
  }[];
  resources: {
    title: string;
    type: 'course' | 'book' | 'practice' | 'tool';
    description: string;
    url: string;
  }[];
  schedule: {
    daily: string[];
    weekly: string[];
    monthly: string[];
  };
  motivationalMessage: string;
  realityCheck?: string;
}

export default function Prediction() {
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get assessment data from localStorage
    const data = localStorage.getItem('assessmentData');
    if (data) {
      const parsed = JSON.parse(data);
      setAssessmentData(parsed);
      
      // Simulate AI prediction analysis
      setTimeout(() => {
        const prediction = generatePrediction(parsed);
        setResult(prediction);
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const generatePrediction = (data: any): PredictionResult => {
    // Simple ML simulation based on assessment data
    let score = 50; // Base score
    
    // Study hours impact
    if (data.studyHours >= 4) score += 20;
    else if (data.studyHours >= 2) score += 10;
    else score -= 10;
    
    // Sleep quality impact
    if (data.sleepHours >= 7 && data.sleepHours <= 9) score += 15;
    else score -= 5;
    
    // Motivation and consistency
    score += (data.motivation * 2);
    score += (data.consistency * 2);
    
    // Experience and learning plan
    if (data.previousExperience.length > 50) score += 10;
    if (data.futureLearningPlan.length > 50) score += 15;
    
    // Timeframe realism
    const timeframes = { '6months': -10, '1year': 5, '2years': 10, '3years': 5, '5years': 0 };
    score += timeframes[data.timeframe as keyof typeof timeframes] || 0;
    
    // Cap score between 0-100
    score = Math.max(0, Math.min(100, score));
    
    const category = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';
    
    const commonStrengths = [
      `${data.motivation >= 7 ? 'High motivation level' : 'Moderate motivation'}`,
      `${data.studyHours >= 3 ? 'Good study habits' : 'Some learning dedication'}`,
      `${data.consistency >= 7 ? 'Consistent learning approach' : 'Developing consistency'}`
    ];
    
    const commonWeaknesses = [
      `${data.studyHours < 2 ? 'Limited study time allocation' : ''}`,
      `${data.sleepHours < 7 ? 'Insufficient sleep affecting performance' : ''}`,
      `${data.recreationHours > 6 ? 'High recreational time usage' : ''}`
    ].filter(Boolean);
    
    return {
      successProbability: score,
      category,
      strengths: commonStrengths,
      weaknesses: commonWeaknesses,
      recommendations: category === 'high' ? getHighSuccessRecommendations() : 
                      category === 'medium' ? getMediumSuccessRecommendations() : 
                      getLowSuccessRecommendations(),
      resources: getRelevantResources(data.dreamJob),
      schedule: generateSchedule(data),
      motivationalMessage: getMotivationalMessage(category, data.name),
      realityCheck: category === 'low' ? getRealityCheck(data) : undefined
    };
  };

  const getHighSuccessRecommendations = () => [
    {
      title: "Maintain Your Momentum",
      description: "Continue your excellent habits and stay focused on your goal.",
      priority: 'high' as const,
      timeframe: "Ongoing"
    },
    {
      title: "Network Actively",
      description: "Start building professional connections in your target industry.",
      priority: 'high' as const,
      timeframe: "Next 2 months"
    },
    {
      title: "Build Portfolio Projects",
      description: "Create impressive projects that showcase your skills.",
      priority: 'medium' as const,
      timeframe: "Next 3 months"
    }
  ];

  const getMediumSuccessRecommendations = () => [
    {
      title: "Increase Study Time",
      description: "Dedicate more time to focused learning and skill development.",
      priority: 'high' as const,
      timeframe: "Start immediately"
    },
    {
      title: "Improve Consistency",
      description: "Establish a daily learning routine and stick to it.",
      priority: 'high' as const,
      timeframe: "Next 2 weeks"
    },
    {
      title: "Find a Mentor",
      description: "Connect with someone experienced in your target field.",
      priority: 'medium' as const,
      timeframe: "Next month"
    }
  ];

  const getLowSuccessRecommendations = () => [
    {
      title: "Restructure Your Schedule",
      description: "Prioritize learning time over recreational activities.",
      priority: 'high' as const,
      timeframe: "This week"
    },
    {
      title: "Set Realistic Goals",
      description: "Consider extending your timeframe or adjusting your target role.",
      priority: 'high' as const,
      timeframe: "Immediately"
    },
    {
      title: "Improve Sleep Habits",
      description: "Better sleep will improve your learning capacity and productivity.",
      priority: 'medium' as const,
      timeframe: "Next 2 weeks"
    }
  ];

  const getRelevantResources = (dreamJob: string) => [
    {
      title: "Coursera Professional Certificates",
      type: 'course' as const,
      description: "Industry-recognized certificates for career advancement",
      url: "https://coursera.org"
    },
    {
      title: "LeetCode Practice",
      type: 'practice' as const,
      description: "Essential for technical interview preparation",
      url: "https://leetcode.com"
    },
    {
      title: "Industry-Specific Learning Path",
      type: 'course' as const,
      description: "Customized learning path for your target role",
      url: "#"
    }
  ];

  const generateSchedule = (data: any) => ({
    daily: [
      `Study/Practice: ${Math.max(2, data.studyHours + 1)} hours`,
      "Review progress and plan next day: 30 minutes",
      "Industry news/articles: 20 minutes"
    ],
    weekly: [
      "Complete 1 significant project or assignment",
      "Network with 2-3 professionals in your field",
      "Review and adjust your learning plan"
    ],
    monthly: [
      "Complete a certification or major course",
      "Update your portfolio and resume",
      "Assess progress and adjust goals if needed"
    ]
  });

  const getMotivationalMessage = (category: string, name: string) => {
    if (category === 'high') {
      return `Congratulations ${name}! 🎉 You're on an excellent path to achieving your dream job. Your dedication and habits show real commitment to success. Keep pushing forward - you've got this!`;
    } else if (category === 'medium') {
      return `${name}, you're making good progress! 💪 With some focused improvements, you can significantly increase your chances of success. Stay motivated and keep learning!`;
    } else {
      return `${name}, I believe in your potential! 🌟 While the current prediction shows challenges, this is your opportunity to transform your approach and come back stronger.`;
    }
  };

  const getRealityCheck = (data: any) => {
    return `I need to be honest with you - achieving ${data.dreamJob} in ${data.timeframe} will be challenging with your current habits and approach. This isn't to discourage you, but to help you succeed. Consider the recommendations below as your roadmap to improvement. Many successful people started exactly where you are now.`;
  };

  if (!assessmentData && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ai-50 via-background to-neural-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Assessment Found</CardTitle>
            <CardDescription>Please complete the assessment first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/assessment">
              <Button className="w-full">Take Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ai-50 via-background to-neural-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-ai-500 animate-pulse" />
              Analyzing Your Data...
            </CardTitle>
            <CardDescription>Our AI is processing your assessment and generating predictions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Processing lifestyle patterns...
              </div>
              <Progress value={33} />
              <div className="text-center text-sm text-muted-foreground">
                Analyzing learning habits...
              </div>
              <Progress value={66} />
              <div className="text-center text-sm text-muted-foreground">
                Generating recommendations...
              </div>
              <Progress value={90} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-50 via-background to-neural-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Career Prediction Results</h1>
          <p className="text-muted-foreground">AI-powered analysis of your path to {assessmentData?.dreamJob}</p>
        </div>

        {/* Main Result Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Success Probability</CardTitle>
                <CardDescription>Based on your current habits and goals</CardDescription>
              </div>
              <Badge variant={result?.category === 'high' ? 'default' : result?.category === 'medium' ? 'secondary' : 'destructive'} className="text-lg px-4 py-2">
                {result?.category === 'high' ? 'High Potential' : result?.category === 'medium' ? 'Good Potential' : 'Needs Improvement'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Success Probability</span>
                  <span className="text-2xl font-bold text-ai-600">{result?.successProbability}%</span>
                </div>
                <Progress value={result?.successProbability} className="h-4" />
              </div>

              <div className="p-4 rounded-lg bg-ai-50 border border-ai-200">
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-ai-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Personal Message</h3>
                    <p className="text-sm">{result?.motivationalMessage}</p>
                  </div>
                </div>
              </div>

              {result?.realityCheck && (
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2 text-orange-800">Reality Check</h3>
                      <p className="text-sm text-orange-700">{result.realityCheck}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result?.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <TrendingDown className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result?.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {result?.recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <Badge variant={rec.priority === 'high' ? 'default' : rec.priority === 'medium' ? 'secondary' : 'outline'}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Timeline: {rec.timeframe}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-ai-500" />
                    Daily Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result?.schedule.daily.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-ai-500 rounded-full mt-2" />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-neural-500" />
                    Weekly Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result?.schedule.weekly.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-neural-500 rounded-full mt-2" />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Monthly Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result?.schedule.monthly.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-accent rounded-full mt-2" />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {result?.resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-ai-500" />
                      {resource.title}
                    </CardTitle>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/assessment">
            <Button variant="outline">Take Assessment Again</Button>
          </Link>
          <Link to="/">
            <Button className="bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
