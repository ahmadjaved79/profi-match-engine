import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, MapPin, Clock, DollarSign } from 'lucide-react';
import { Internship } from '@/types';

interface ApplyPageProps {
  internship: Internship | null;
  language: 'en' | 'hi';
  onBack: () => void;
}

export const ApplyPage = ({ internship, language, onBack }: ApplyPageProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    yearOfStudy: '',
    cgpa: '',
    coverLetter: '',
    resumeFile: null as File | null,
    portfolioUrl: ''
  });

  const t = language === 'en' ? {
    applyFor: 'Apply for',
    personalDetails: 'Personal Details',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    academicInfo: 'Academic Information',
    university: 'University/College',
    yearOfStudy: 'Year of Study',
    cgpa: 'CGPA/Percentage',
    application: 'Application',
    coverLetter: 'Cover Letter',
    coverLetterPlaceholder: 'Tell us why you\'re interested in this position and what makes you a great candidate...',
    resume: 'Resume/CV',
    portfolio: 'Portfolio URL (Optional)',
    portfolioPlaceholder: 'Link to your portfolio, GitHub, or LinkedIn',
    uploadResume: 'Upload Resume',
    chooseFile: 'Choose File',
    submitApplication: 'Submit Application',
    back: 'Back to Details',
    applicationSuccess: 'Application Submitted!',
    applicationMessage: 'Your application has been submitted successfully. We\'ll review it and get back to you soon.',
    required: 'This field is required'
  } : {
    applyFor: 'आवेदन करें',
    personalDetails: 'व्यक्तिगत विवरण',
    fullName: 'पूरा नाम',
    email: 'ईमेल पता',
    phone: 'फोन नंबर',
    academicInfo: 'शैक्षणिक जानकारी',
    university: 'विश्वविद्यालय/कॉलेज',
    yearOfStudy: 'अध्ययन का वर्ष',
    cgpa: 'सीजीपीए/प्रतिशत',
    application: 'आवेदन',
    coverLetter: 'कवर लेटर',
    coverLetterPlaceholder: 'बताएं कि आप इस पद में क्यों रुचि रखते हैं और आप एक बेहतरीन उम्मीदवार क्यों हैं...',
    resume: 'रिज्यूमे/सीवी',
    portfolio: 'पोर्टफोलियो URL (वैकल्पिक)',
    portfolioPlaceholder: 'अपने पोर्टफोलियो, GitHub, या LinkedIn का लिंक',
    uploadResume: 'रिज्यूमे अपलोड करें',
    chooseFile: 'फ़ाइल चुनें',
    submitApplication: 'आवेदन जमा करें',
    back: 'विवरण पर वापस जाएं',
    applicationSuccess: 'आवेदन जमा हो गया!',
    applicationMessage: 'आपका आवेदन सफलतापूर्वक जमा हो गया है। हम इसकी समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।',
    required: 'यह फ़ील्ड आवश्यक है'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'email', 'phone', 'university', 'yearOfStudy', 'cgpa', 'coverLetter'];
    const missing = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0 || !formData.resumeFile) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields and upload your resume.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate application submission
    toast({
      title: t.applicationSuccess,
      description: t.applicationMessage
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      university: '',
      yearOfStudy: '',
      cgpa: '',
      coverLetter: '',
      resumeFile: null,
      portfolioUrl: ''
    });
  };

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>No Internship Selected</CardTitle>
              <CardDescription>Please select an internship to apply for.</CardDescription>
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
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.back}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Internship Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">{t.applyFor}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary">{internship.title}</h3>
                  <p className="text-muted-foreground">{internship.company}</p>
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-start text-xs">
                    <MapPin className="h-3 w-3 mr-2" />
                    {internship.location}
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start text-xs">
                    <Clock className="h-3 w-3 mr-2" />
                    {internship.duration}
                  </Badge>
                  {internship.stipend && (
                    <Badge variant="secondary" className="w-full justify-start text-xs">
                      <DollarSign className="h-3 w-3 mr-2" />
                      {internship.stipend}
                    </Badge>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {internship.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.personalDetails}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName} *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">{t.phone} *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.academicInfo}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="university">{t.university} *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfStudy">{t.yearOfStudy} *</Label>
                    <Input
                      id="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                      placeholder="e.g., 2nd Year, Final Year"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">{t.cgpa} *</Label>
                    <Input
                      id="cgpa"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                      placeholder="e.g., 8.5/10 or 85%"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Application */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.application}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">{t.coverLetter} *</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      placeholder={t.coverLetterPlaceholder}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">{t.resume} *</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('resume')?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {formData.resumeFile ? formData.resumeFile.name : t.chooseFile}
                      </Button>
                    </div>
                    {formData.resumeFile && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-2 h-4 w-4" />
                        {formData.resumeFile.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">{t.portfolio}</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                      placeholder={t.portfolioPlaceholder}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary">
                    {t.submitApplication}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};