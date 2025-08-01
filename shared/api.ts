/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Assessment data interface for career prediction
 */
export interface AssessmentData {
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

/**
 * ML prediction result interface
 */
export interface PredictionResult {
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
