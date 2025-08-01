import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, TrendingUp, Users, Zap, ChevronRight, Sparkles } from 'lucide-react';

export default function Index() {
  const [isStarting, setIsStarting] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced ML model analyzes your lifestyle patterns, study habits, and goals to predict career success."
    },
    {
      icon: Target,
      title: "Goal-Oriented Predictions",
      description: "Set specific career goals and get personalized insights about your probability of achieving them."
    },
    {
      icon: TrendingUp,
      title: "Learning Roadmaps",
      description: "Receive customized learning schedules and resource recommendations to improve your chances."
    },
    {
      icon: Users,
      title: "Reality Check & Motivation",
      description: "Get honest feedback about your goals and motivation to keep pushing towards success."
    }
  ];

  const stats = [
    { number: "94%", label: "Prediction Accuracy" },
    { number: "10K+", label: "Career Predictions Made" },
    { number: "87%", label: "Users Achieved Goals" },
    { number: "2.5x", label: "Faster Goal Achievement" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-50 via-background to-neural-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ai-500/10 via-transparent to-neural-500/10" />
        <div className="container relative mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-ai-100 px-4 py-2 text-sm font-medium text-ai-700">
              <Sparkles className="h-4 w-4" />
              Powered by Advanced Machine Learning
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Will You Get Your{' '}
              <span className="bg-gradient-to-r from-ai-500 to-neural-500 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Our AI agent analyzes your lifestyle, study habits, and learning patterns to predict your career success. 
              Get personalized insights, reality checks, and actionable roadmaps to achieve your professional goals.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/assessment">
                <Button 
                  size="lg" 
                  className="group w-full sm:w-auto bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600 px-8 py-4 text-lg"
                  onClick={() => setIsStarting(true)}
                >
                  Start Career Prediction
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-ai-200 hover:bg-ai-50 px-8 py-4 text-lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-ai-600 lg:text-4xl">{stat.number}</div>
                <div className="text-sm text-muted-foreground lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              How Our AI Agent Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent system asks the right questions and provides actionable insights to help you succeed.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-ai-100 hover:border-ai-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-ai-500 to-neural-500 text-white group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-r from-ai-50 to-neural-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Your Journey to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to get your personalized career prediction and improvement plan.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-ai-500 to-ai-600 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Answer Lifestyle Questions</h3>
              <p className="text-muted-foreground">
                Tell our AI about your daily habits: study time, sleep patterns, recreational activities, and current skills.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-neural-500 to-neural-600 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Career Goal</h3>
              <p className="text-muted-foreground">
                Define your dream job and share your previous learning experiences and future learning plans.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-ai-600 to-neural-600 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Your Prediction</h3>
              <p className="text-muted-foreground">
                Receive your career success prediction with personalized feedback, motivation, and improvement resources.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/assessment">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600 px-12 py-4 text-lg"
              >
                Begin Your Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
