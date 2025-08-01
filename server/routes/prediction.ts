import { RequestHandler } from "express";

interface AssessmentData {
  name: string;
  age: string;
  currentRole: string;
  studyHours: number;
  sleepHours: number;
  exerciseHours: number;
  recreationHours: number;
  workHours: number;
  currentSkills: string;
  learningStyle: string;
  motivation: number;
  consistency: number;
  dreamJob: string;
  timeframe: string;
  previousExperience: string;
  futureLearningPlan: string;
  challenges: string;
}

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

export const handlePrediction: RequestHandler = (req, res) => {
  try {
    const data: AssessmentData = req.body;
    
    // Validate required fields
    if (!data.name || !data.dreamJob || !data.timeframe) {
      return res.status(400).json({ 
        error: "Missing required fields: name, dreamJob, and timeframe are required" 
      });
    }

    // ML Algorithm Simulation
    const prediction = generatePrediction(data);
    
    res.json(prediction);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Internal server error during prediction' });
  }
};

function generatePrediction(data: AssessmentData): PredictionResult {
  // Advanced ML simulation with multiple factors
  let score = 50; // Base score
  
  // Study hours impact (20% weight)
  const studyWeight = 0.2;
  if (data.studyHours >= 4) score += 25 * studyWeight * 100;
  else if (data.studyHours >= 2) score += 15 * studyWeight * 100;
  else if (data.studyHours >= 1) score += 5 * studyWeight * 100;
  else score -= 10 * studyWeight * 100;
  
  // Sleep quality impact (15% weight)
  const sleepWeight = 0.15;
  if (data.sleepHours >= 7 && data.sleepHours <= 9) score += 20 * sleepWeight * 100;
  else if (data.sleepHours >= 6 && data.sleepHours <= 10) score += 10 * sleepWeight * 100;
  else score -= 15 * sleepWeight * 100;
  
  // Exercise impact (10% weight)
  const exerciseWeight = 0.1;
  if (data.exerciseHours >= 1) score += 15 * exerciseWeight * 100;
  else score -= 5 * exerciseWeight * 100;
  
  // Recreation balance (10% weight)
  const recreationWeight = 0.1;
  if (data.recreationHours >= 1 && data.recreationHours <= 4) score += 10 * recreationWeight * 100;
  else if (data.recreationHours > 6) score -= 15 * recreationWeight * 100;
  
  // Motivation and consistency (25% weight)
  const motivationWeight = 0.125;
  score += (data.motivation - 5) * 4 * motivationWeight * 100;
  score += (data.consistency - 5) * 4 * motivationWeight * 100;
  
  // Experience and planning (15% weight)
  const experienceWeight = 0.075;
  if (data.previousExperience.length > 100) score += 20 * experienceWeight * 100;
  else if (data.previousExperience.length > 50) score += 10 * experienceWeight * 100;
  
  if (data.futureLearningPlan.length > 100) score += 20 * experienceWeight * 100;
  else if (data.futureLearningPlan.length > 50) score += 10 * experienceWeight * 100;
  
  // Timeframe realism (5% weight)
  const timeframeWeight = 0.05;
  const timeframeAdjustments = { 
    '6months': -20, 
    '1year': 10, 
    '2years': 15, 
    '3years': 10, 
    '5years': 0 
  };
  score += (timeframeAdjustments[data.timeframe as keyof typeof timeframeAdjustments] || 0) * timeframeWeight * 100;
  
  // Cap score between 15-95 for realistic range
  score = Math.max(15, Math.min(95, score));
  
  const category: 'high' | 'medium' | 'low' = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';
  
  return {
    successProbability: Math.round(score),
    category,
    strengths: generateStrengths(data),
    weaknesses: generateWeaknesses(data),
    recommendations: generateRecommendations(category, data),
    resources: generateResources(data.dreamJob),
    schedule: generateSchedule(data),
    motivationalMessage: generateMotivationalMessage(category, data.name),
    realityCheck: category === 'low' ? generateRealityCheck(data) : undefined
  };
}

function generateStrengths(data: AssessmentData): string[] {
  const strengths: string[] = [];
  
  if (data.motivation >= 8) strengths.push("Exceptionally high motivation level");
  else if (data.motivation >= 6) strengths.push("Good motivation and drive");
  
  if (data.consistency >= 8) strengths.push("Excellent learning consistency");
  else if (data.consistency >= 6) strengths.push("Decent learning routine");
  
  if (data.studyHours >= 3) strengths.push("Dedicated study time allocation");
  if (data.sleepHours >= 7 && data.sleepHours <= 9) strengths.push("Healthy sleep patterns");
  if (data.exerciseHours >= 1) strengths.push("Regular physical activity");
  if (data.previousExperience.length > 50) strengths.push("Relevant background experience");
  if (data.futureLearningPlan.length > 50) strengths.push("Well-thought-out learning plan");
  
  return strengths.length > 0 ? strengths : ["Willingness to learn and improve"];
}

function generateWeaknesses(data: AssessmentData): string[] {
  const weaknesses: string[] = [];
  
  if (data.studyHours < 2) weaknesses.push("Limited daily study time");
  if (data.sleepHours < 7) weaknesses.push("Insufficient sleep affecting performance");
  if (data.sleepHours > 9) weaknesses.push("Excessive sleep reducing productive hours");
  if (data.recreationHours > 6) weaknesses.push("High recreational time reducing focus");
  if (data.exerciseHours < 0.5) weaknesses.push("Lack of physical activity affecting energy");
  if (data.motivation < 6) weaknesses.push("Low motivation levels");
  if (data.consistency < 6) weaknesses.push("Inconsistent learning habits");
  if (data.previousExperience.length < 30) weaknesses.push("Limited relevant experience");
  if (data.futureLearningPlan.length < 30) weaknesses.push("Vague future learning plans");
  
  return weaknesses.length > 0 ? weaknesses : ["Areas for minor improvements"];
}

function generateRecommendations(category: 'high' | 'medium' | 'low', data: AssessmentData) {
  const base = [
    {
      title: "Maintain Learning Momentum",
      description: "Continue your current learning pace and stay consistent",
      priority: 'medium' as const,
      timeframe: "Ongoing"
    }
  ];

  if (category === 'high') {
    return [
      {
        title: "Network and Build Portfolio",
        description: "Start networking in your industry and create impressive portfolio projects",
        priority: 'high' as const,
        timeframe: "Next 2 months"
      },
      {
        title: "Apply Strategically",
        description: "Begin applying to positions that match your skills and goals",
        priority: 'high' as const,
        timeframe: "Next month"
      },
      ...base
    ];
  } else if (category === 'medium') {
    return [
      {
        title: "Increase Study Time",
        description: `Increase daily study time from ${data.studyHours} to at least 3 hours`,
        priority: 'high' as const,
        timeframe: "This week"
      },
      {
        title: "Improve Consistency",
        description: "Establish and stick to a daily learning routine",
        priority: 'high' as const,
        timeframe: "Next 2 weeks"
      },
      ...base
    ];
  } else {
    return [
      {
        title: "Complete Learning Schedule Overhaul",
        description: "Restructure your entire daily schedule to prioritize learning",
        priority: 'high' as const,
        timeframe: "This week"
      },
      {
        title: "Set More Realistic Timeline",
        description: `Consider extending your ${data.timeframe} goal to allow for proper skill development`,
        priority: 'high' as const,
        timeframe: "Immediately"
      },
      {
        title: "Find Accountability Partner",
        description: "Get someone to help keep you on track with your goals",
        priority: 'medium' as const,
        timeframe: "Next 2 weeks"
      }
    ];
  }
}

function generateResources(dreamJob: string) {
  const jobKeywords = dreamJob.toLowerCase();
  const resources = [
    {
      title: "Coursera Professional Certificates",
      type: 'course' as const,
      description: "Industry-recognized certificates for career advancement",
      url: "https://coursera.org"
    },
    {
      title: "GitHub Portfolio Development",
      type: 'practice' as const,
      description: "Build and showcase your projects on GitHub",
      url: "https://github.com"
    }
  ];

  // Add job-specific resources
  if (jobKeywords.includes('software') || jobKeywords.includes('developer') || jobKeywords.includes('engineer')) {
    resources.push({
      title: "LeetCode Technical Practice",
      type: 'practice' as const,
      description: "Essential coding practice for technical interviews",
      url: "https://leetcode.com"
    });
  }
  
  if (jobKeywords.includes('data') || jobKeywords.includes('analyst') || jobKeywords.includes('scientist')) {
    resources.push({
      title: "Kaggle Data Science Courses",
      type: 'course' as const,
      description: "Hands-on data science learning and competitions",
      url: "https://kaggle.com/learn"
    });
  }

  return resources;
}

function generateSchedule(data: AssessmentData) {
  const recommendedStudyHours = Math.max(3, data.studyHours + 1);
  
  return {
    daily: [
      `Focused learning: ${recommendedStudyHours} hours`,
      "Practice/project work: 1 hour",
      "Industry reading: 30 minutes",
      "Progress review: 15 minutes"
    ],
    weekly: [
      "Complete 1 major project or assignment",
      "Network with 2-3 industry professionals",
      "Review and adjust learning plan",
      "Skills assessment and gap analysis"
    ],
    monthly: [
      "Complete a certification or major course",
      "Update portfolio and resume",
      "Conduct mock interviews",
      "Reassess goals and timeline"
    ]
  };
}

function generateMotivationalMessage(category: string, name: string): string {
  if (category === 'high') {
    return `Outstanding work, ${name}! 🌟 Your dedication and structured approach show you're truly committed to achieving your goals. You're on the right path - keep pushing forward with confidence!`;
  } else if (category === 'medium') {
    return `Great progress, ${name}! 💪 You're building good habits and showing real potential. With some focused improvements and consistency, you'll significantly boost your chances of success!`;
  } else {
    return `${name}, every expert was once a beginner! 🚀 Your journey starts with recognizing where you are and taking action. The fact that you're here shows you're ready to change - let's build that future together!`;
  }
}

function generateRealityCheck(data: AssessmentData): string {
  return `Based on your current habits and the ${data.timeframe} timeline for achieving ${data.dreamJob}, there are some significant challenges ahead. This isn't meant to discourage you - it's meant to help you succeed. Consider the recommendations below as your roadmap to transformation. Remember, many successful people had to completely restructure their approach before achieving their goals.`;
}
