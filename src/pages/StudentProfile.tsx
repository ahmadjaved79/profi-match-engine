import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, Save, X, Plus, User, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { Student } from '@/types';

interface StudentProfileProps {
  student: Student | null;
  language: 'en' | 'hi';
  onBack: () => void;
  onUpdateStudent: (student: Student) => void;
}

export const StudentProfile = ({ student, language, onBack, onUpdateStudent }: StudentProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student || {
    id: '',
    name: '',
    email: '',
    education: '',
    skills: [],
    interests: [],
    locationPreference: '',
    createdAt: new Date()
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const t = language === 'en' ? {
    profile: 'Student Profile',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancelEdit: 'Cancel',
    personalInfo: 'Personal Information',
    academicInfo: 'Academic Information',
    skillsInterests: 'Skills & Interests',
    name: 'Full Name',
    email: 'Email Address',
    education: 'Education',
    locationPreference: 'Location Preference',
    skills: 'Skills',
    interests: 'Interests',
    addSkill: 'Add Skill',
    addInterest: 'Add Interest',
    profileUpdated: 'Profile Updated',
    profileUpdateMessage: 'Your profile has been updated successfully.',
    noProfile: 'No Profile Found',
    noProfileDesc: 'Please register first to view your profile.',
    memberSince: 'Member since',
    contactInfo: 'Contact Information',
    bio: 'Bio',
    bioPlaceholder: 'Tell us a little about yourself, your goals, and what you\'re passionate about...',
    phone: 'Phone Number',
    phonePlaceholder: 'Your phone number'
  } : {
    profile: 'छात्र प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    saveChanges: 'बदलाव सहेजें',
    cancelEdit: 'रद्द करें',
    personalInfo: 'व्यक्तिगत जानकारी',
    academicInfo: 'शैक्षणिक जानकारी',
    skillsInterests: 'कौशल और रुचियां',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    education: 'शिक्षा',
    locationPreference: 'स्थान प्राथमिकता',
    skills: 'कौशल',
    interests: 'रुचियां',
    addSkill: 'कौशल जोड़ें',
    addInterest: 'रुचि जोड़ें',
    profileUpdated: 'प्रोफ़ाइल अपडेट हो गई',
    profileUpdateMessage: 'आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई है।',
    noProfile: 'कोई प्रोफ़ाइल नहीं मिली',
    noProfileDesc: 'कृपया अपनी प्रोफ़ाइल देखने के लिए पहले रजिस्टर करें।',
    memberSince: 'सदस्य बने',
    contactInfo: 'संपर्क जानकारी',
    bio: 'बायो',
    bioPlaceholder: 'अपने बारे में, अपने लक्ष्यों और अपनी रुचियों के बारे में बताएं...',
    phone: 'फोन नंबर',
    phonePlaceholder: 'आपका फोन नंबर'
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !editData.interests.includes(newInterest.trim())) {
      setEditData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSave = () => {
    if (!editData.name.trim() || !editData.email.trim() || !editData.education.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    onUpdateStudent(editData);
    setIsEditing(false);
    
    toast({
      title: t.profileUpdated,
      description: t.profileUpdateMessage
    });
  };

  const handleCancel = () => {
    setEditData(student || {
      id: '',
      name: '',
      email: '',
      education: '',
      skills: [],
      interests: [],
      locationPreference: '',
      createdAt: new Date()
    });
    setIsEditing(false);
    setNewSkill('');
    setNewInterest('');
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{t.noProfile}</CardTitle>
              <CardDescription>{t.noProfileDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              {t.editProfile}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm">
                <Save className="mr-2 h-4 w-4" />
                {t.saveChanges}
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                {t.cancelEdit}
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">{student.name}</CardTitle>
                <CardDescription>{student.education}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {t.memberSince} {student.createdAt.toLocaleDateString()}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.locationPreference || 'Not specified'}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">{t.skills}</h4>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.length > 0 ? (
                      student.skills.map((skill, index) => (
                        <Badge key={index} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No skills added</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  {t.personalInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t.locationPreference}</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editData.locationPreference}
                      onChange={(e) => handleInputChange('locationPreference', e.target.value)}
                      placeholder="e.g., Mumbai, Remote, Bangalore"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{student.locationPreference || 'Not specified'}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  {t.academicInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="education">{t.education}</Label>
                  {isEditing ? (
                    <Textarea
                      id="education"
                      value={editData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      rows={3}
                      placeholder="e.g., B.Tech Computer Science, XYZ University, 2024"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{student.education}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card>
              <CardHeader>
                <CardTitle>{t.skillsInterests}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills */}
                <div className="space-y-3">
                  <Label>{t.skills}</Label>
                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="default" 
                        className="text-xs flex items-center space-x-1"
                      >
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      />
                      <Button onClick={handleAddSkill} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Interests */}
                <div className="space-y-3">
                  <Label>{t.interests}</Label>
                  <div className="flex flex-wrap gap-2">
                    {editData.interests.map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs flex items-center space-x-1"
                      >
                        <span>{interest}</span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInterest(interest)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Enter an interest"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                      />
                      <Button onClick={handleAddInterest} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};