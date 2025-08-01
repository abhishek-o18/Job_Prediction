import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Brain, ChevronLeft, ChevronRight, Clock, BookOpen, Gamepad2, Bed, Dumbbell } from 'lucide-react';

interface AssessmentData {
  // Personal Info
  name: string;
  age: string;
  currentRole: string;
  
  // Daily Habits (hours per day)
  studyHours: number;
  sleepHours: number;
  exerciseHours: number;
  recreationHours: number;
  workHours: number;
  
  // Learning & Skills
  currentSkills: string;
  learningStyle: string;
  motivation: number;
  consistency: number;
  
  // Goal Information
  dreamJob: string;
  timeframe: string;
  previousExperience: string;
  futureLearningPlan: string;
  challenges: string;
}

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    name: '',
    age: '',
    currentRole: '',
    studyHours: 2,
    sleepHours: 8,
    exerciseHours: 1,
    recreationHours: 3,
    workHours: 8,
    currentSkills: '',
    learningStyle: '',
    motivation: 7,
    consistency: 6,
    dreamJob: '',
    timeframe: '',
    previousExperience: '',
    futureLearningPlan: '',
    challenges: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(data.name.trim() && data.age.trim() && data.currentRole.trim());
      case 2:
        // All slider values have defaults, so this step is always valid
        return true;
      case 3:
        return !!(data.currentSkills.trim() && data.learningStyle);
      case 4:
        return !!(data.dreamJob.trim() && data.timeframe && data.previousExperience.trim() && data.futureLearningPlan.trim());
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return; // Don't proceed if validation fails
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results with data
      localStorage.setItem('assessmentData', JSON.stringify(data));
      navigate('/prediction');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Brain className="mx-auto h-16 w-16 text-ai-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Let's Get to Know You</h2>
              <p className="text-muted-foreground">Tell us about yourself to personalize your assessment</p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  placeholder="Enter your name"
                  className={!data.name.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.name.trim() && (
                  <p className="text-sm text-red-500 mt-1">Name is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="age" className="flex items-center gap-1">
                  Age <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => updateData('age', e.target.value)}
                  placeholder="Enter your age"
                  className={!data.age.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.age.trim() && (
                  <p className="text-sm text-red-500 mt-1">Age is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="currentRole" className="flex items-center gap-1">
                  Current Role/Status <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="currentRole"
                  value={data.currentRole}
                  onChange={(e) => updateData('currentRole', e.target.value)}
                  placeholder="e.g., Student, Software Developer, Unemployed"
                  className={!data.currentRole.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.currentRole.trim() && (
                  <p className="text-sm text-red-500 mt-1">Current role/status is required</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="mx-auto h-16 w-16 text-ai-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Daily Lifestyle Habits</h2>
              <p className="text-muted-foreground">How do you spend your time each day? (Average hours)</p>
            </div>

            <div className="grid gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-5 w-5 text-ai-500" />
                  <Label>Study/Learning Time: {data.studyHours} hours</Label>
                </div>
                <Slider
                  value={[data.studyHours]}
                  onValueChange={(value) => updateData('studyHours', value[0])}
                  max={12}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Bed className="h-5 w-5 text-ai-500" />
                  <Label>Sleep Time: {data.sleepHours} hours</Label>
                </div>
                <Slider
                  value={[data.sleepHours]}
                  onValueChange={(value) => updateData('sleepHours', value[0])}
                  max={12}
                  min={4}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Dumbbell className="h-5 w-5 text-ai-500" />
                  <Label>Exercise/Physical Activity: {data.exerciseHours} hours</Label>
                </div>
                <Slider
                  value={[data.exerciseHours]}
                  onValueChange={(value) => updateData('exerciseHours', value[0])}
                  max={6}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Gamepad2 className="h-5 w-5 text-ai-500" />
                  <Label>Recreation/Entertainment: {data.recreationHours} hours</Label>
                </div>
                <Slider
                  value={[data.recreationHours]}
                  onValueChange={(value) => updateData('recreationHours', value[0])}
                  max={10}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-ai-500" />
                  <Label>Work/Job Time: {data.workHours} hours</Label>
                </div>
                <Slider
                  value={[data.workHours]}
                  onValueChange={(value) => updateData('workHours', value[0])}
                  max={16}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BookOpen className="mx-auto h-16 w-16 text-ai-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Learning & Skills Assessment</h2>
              <p className="text-muted-foreground">Help us understand your learning patterns and skills</p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="currentSkills" className="flex items-center gap-1">
                  Current Skills & Expertise <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="currentSkills"
                  value={data.currentSkills}
                  onChange={(e) => updateData('currentSkills', e.target.value)}
                  placeholder="List your current skills, technologies, or areas of expertise..."
                  rows={3}
                  className={!data.currentSkills.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.currentSkills.trim() && (
                  <p className="text-sm text-red-500 mt-1">Please describe your current skills</p>
                )}
              </div>

              <div>
                <Label htmlFor="learningStyle" className="flex items-center gap-1">
                  Preferred Learning Style <span className="text-red-500">*</span>
                </Label>
                <Select value={data.learningStyle} onValueChange={(value) => updateData('learningStyle', value)}>
                  <SelectTrigger className={!data.learningStyle ? "border-red-200" : ""}>
                    <SelectValue placeholder="Select your learning style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual (videos, diagrams, reading)</SelectItem>
                    <SelectItem value="hands-on">Hands-on (projects, practice)</SelectItem>
                    <SelectItem value="structured">Structured (courses, tutorials)</SelectItem>
                    <SelectItem value="social">Social (group learning, mentorship)</SelectItem>
                    <SelectItem value="mixed">Mixed approach</SelectItem>
                  </SelectContent>
                </Select>
                {!data.learningStyle && (
                  <p className="text-sm text-red-500 mt-1">Please select your learning style</p>
                )}
              </div>

              <div>
                <Label>Motivation Level: {data.motivation}/10</Label>
                <Slider
                  value={[data.motivation]}
                  onValueChange={(value) => updateData('motivation', value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">How motivated are you to achieve your goals?</p>
              </div>

              <div>
                <Label>Learning Consistency: {data.consistency}/10</Label>
                <Slider
                  value={[data.consistency]}
                  onValueChange={(value) => updateData('consistency', value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">How consistent are you with your learning routine?</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Brain className="mx-auto h-16 w-16 text-ai-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your Career Goals</h2>
              <p className="text-muted-foreground">Tell us about your dream job and future plans</p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="dreamJob" className="flex items-center gap-1">
                  Dream Job/Career Goal <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dreamJob"
                  value={data.dreamJob}
                  onChange={(e) => updateData('dreamJob', e.target.value)}
                  placeholder="e.g., Senior Software Engineer at Google, Product Manager, Data Scientist"
                  className={!data.dreamJob.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.dreamJob.trim() && (
                  <p className="text-sm text-red-500 mt-1">Please specify your dream job</p>
                )}
              </div>

              <div>
                <Label htmlFor="timeframe" className="flex items-center gap-1">
                  Target Timeframe <span className="text-red-500">*</span>
                </Label>
                <Select value={data.timeframe} onValueChange={(value) => updateData('timeframe', value)}>
                  <SelectTrigger className={!data.timeframe ? "border-red-200" : ""}>
                    <SelectValue placeholder="When do you want to achieve this goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Within 6 months</SelectItem>
                    <SelectItem value="1year">Within 1 year</SelectItem>
                    <SelectItem value="2years">Within 2 years</SelectItem>
                    <SelectItem value="3years">Within 3 years</SelectItem>
                    <SelectItem value="5years">Within 5 years</SelectItem>
                  </SelectContent>
                </Select>
                {!data.timeframe && (
                  <p className="text-sm text-red-500 mt-1">Please select your target timeframe</p>
                )}
              </div>

              <div>
                <Label htmlFor="previousExperience" className="flex items-center gap-1">
                  Previous Experience & Learning <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="previousExperience"
                  value={data.previousExperience}
                  onChange={(e) => updateData('previousExperience', e.target.value)}
                  placeholder="Describe your relevant experience, education, courses, projects..."
                  rows={3}
                  className={!data.previousExperience.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.previousExperience.trim() && (
                  <p className="text-sm text-red-500 mt-1">Please describe your previous experience</p>
                )}
              </div>

              <div>
                <Label htmlFor="futureLearningPlan" className="flex items-center gap-1">
                  Future Learning Plan <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="futureLearningPlan"
                  value={data.futureLearningPlan}
                  onChange={(e) => updateData('futureLearningPlan', e.target.value)}
                  placeholder="What's your plan to learn and improve? Courses, certifications, projects..."
                  rows={3}
                  className={!data.futureLearningPlan.trim() ? "border-red-200 focus:border-red-400" : ""}
                />
                {!data.futureLearningPlan.trim() && (
                  <p className="text-sm text-red-500 mt-1">Please describe your future learning plan</p>
                )}
              </div>

              <div>
                <Label htmlFor="challenges">Biggest Challenges (Optional)</Label>
                <Textarea
                  id="challenges"
                  value={data.challenges}
                  onChange={(e) => updateData('challenges', e.target.value)}
                  placeholder="What challenges do you face in achieving your goal? Time, money, skills, etc."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-50 via-background to-neural-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Career Assessment</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Assessment Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-ai-500" />
              AI Career Prediction Assessment
            </CardTitle>
            <CardDescription>
              Answer these questions honestly to get the most accurate prediction about your career success.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex flex-col items-end gap-2">
            {!validateCurrentStep() && (
              <p className="text-sm text-red-500">Please fill all required fields to continue</p>
            )}
            <Button
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              className="bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps ? 'Get Prediction' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
