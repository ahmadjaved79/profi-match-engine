import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Student } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface StudentRegistrationProps {
  onRegister: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  language: 'en' | 'hi';
}

export const StudentRegistration = ({ onRegister, language }: StudentRegistrationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: [] as string[],
    interests: [] as string[],
    locationPreference: ''
  });
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentInterest, setCurrentInterest] = useState('');

  const t = language === 'en' ? {
    title: 'Student Registration',
    subtitle: 'Create your profile to get personalized internship recommendations',
    name: 'Full Name',
    email: 'Email Address',
    education: 'Education/Degree',
    skills: 'Skills',
    interests: 'Interests',
    location: 'Location Preference',
    addSkill: 'Add Skill',
    addInterest: 'Add Interest',
    register: 'Create Profile',
    success: 'Profile created successfully!',
    error: 'Please fill all required fields',
    skillPlaceholder: 'e.g., JavaScript, Python, Design',
    interestPlaceholder: 'e.g., Web Development, AI/ML, Design'
  } : {
    title: 'छात्र पंजीकरण',
    subtitle: 'व्यक्तिगत इंटर्नशिप सुझाव पाने के लिए अपनी प्रोफाइल बनाएं',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    education: 'शिक्षा/डिग्री',
    skills: 'कौशल',
    interests: 'रुचियां',
    location: 'स्थान प्राथमिकता',
    addSkill: 'कौशल जोड़ें',
    addInterest: 'रुचि जोड़ें',
    register: 'प्रोफाइल बनाएं',
    success: 'प्रोफाइल सफलतापूर्वक बनाई गई!',
    error: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    skillPlaceholder: 'जैसे: JavaScript, Python, Design',
    interestPlaceholder: 'जैसे: Web Development, AI/ML, Design'
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const addInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, currentInterest.trim()]
      }));
      setCurrentInterest('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.education || 
        formData.skills.length === 0 || formData.interests.length === 0) {
      toast({
        title: t.error,
        variant: "destructive"
      });
      return;
    }

    onRegister(formData);
    toast({
      title: t.success,
      description: language === 'en' 
        ? 'You can now browse personalized internship recommendations.'
        : 'अब आप व्यक्तिगत इंटर्नशिप सुझाव देख सकते हैं।'
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-primary bg-clip-text text-transparent">
          {t.title}
        </CardTitle>
        <CardDescription className="text-center">
          {t.subtitle}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">{t.education} *</Label>
            <Input
              id="education"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              placeholder="e.g., Computer Science Engineering, B.Tech"
            />
          </div>

          <div className="space-y-2">
            <Label>{t.skills} *</Label>
            <div className="flex space-x-2">
              <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder={t.skillPlaceholder}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                  <span>{skill}</span>
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.interests} *</Label>
            <div className="flex space-x-2">
              <Input
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                placeholder={t.interestPlaceholder}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <Button type="button" onClick={addInterest} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map(interest => (
                <Badge key={interest} variant="secondary" className="flex items-center space-x-1">
                  <span>{interest}</span>
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeInterest(interest)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t.location}</Label>
            <Input
              id="location"
              value={formData.locationPreference}
              onChange={(e) => setFormData(prev => ({ ...prev, locationPreference: e.target.value }))}
              placeholder="e.g., Bangalore, Mumbai, Remote, Any"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
            {t.register}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};