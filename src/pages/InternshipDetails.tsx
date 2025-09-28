import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Users, CheckCircle, Building } from 'lucide-react';
import { Internship } from '@/types';

interface InternshipDetailsProps {
  internship: Internship | null;
  language: 'en' | 'hi';
  onBack: () => void;
  onApply: () => void;
}

export const InternshipDetails = ({ internship, language, onBack, onApply }: InternshipDetailsProps) => {
  const t = language === 'en' ? {
    back: 'Back to Listings',
    applyNow: 'Apply Now',
    overview: 'Overview',
    responsibilities: 'Key Responsibilities',
    requirements: 'Requirements',
    benefits: 'Benefits',
    aboutCompany: 'About Company',
    applicationDeadline: 'Application Deadline',
    positions: 'Positions Available',
    noInternship: 'Internship Not Found',
    noInternshipDesc: 'The internship you are looking for does not exist.',
    companyInfo: 'Leading technology company focused on innovation and student development.',
    sampleResponsibilities: [
      'Work on real-world projects with experienced developers',
      'Participate in code reviews and team meetings',
      'Learn industry best practices and modern technologies',
      'Contribute to product development and testing',
      'Collaborate with cross-functional teams'
    ],
    sampleRequirements: [
      'Currently pursuing or recently completed relevant degree',
      'Basic knowledge of programming concepts',
      'Strong problem-solving and analytical skills',
      'Good communication and teamwork abilities',
      'Eager to learn and adapt to new technologies'
    ],
    sampleBenefits: [
      'Competitive stipend and performance bonuses',
      'Mentorship from industry experts',
      'Certificate of completion',
      'Networking opportunities',
      'Potential for full-time offer'
    ]
  } : {
    back: 'सूची पर वापस जाएं',
    applyNow: 'अभी आवेदन करें',
    overview: 'अवलोकन',
    responsibilities: 'मुख्य जिम्मेदारियां',
    requirements: 'आवश्यकताएं',
    benefits: 'लाभ',
    aboutCompany: 'कंपनी के बारे में',
    applicationDeadline: 'आवेदन की अंतिम तिथि',
    positions: 'उपलब्ध पद',
    noInternship: 'इंटर्नशिप नहीं मिली',
    noInternshipDesc: 'आप जिस इंटर्नशिप की तलाश कर रहे हैं वह मौजूद नहीं है।',
    companyInfo: 'नवाचार और छात्र विकास पर केंद्रित अग्रणी प्रौद्योगिकी कंपनी।',
    sampleResponsibilities: [
      'अनुभवी डेवलपर्स के साथ वास्तविक परियोजनाओं पर काम करें',
      'कोड समीक्षा और टीम मीटिंग में भाग लें',
      'उद्योग की सर्वोत्तम प्रथाओं और आधुनिक तकनीकों को सीखें',
      'उत्पाद विकास और परीक्षण में योगदान दें',
      'क्रॉस-फंक्शनल टीमों के साथ सहयोग करें'
    ],
    sampleRequirements: [
      'वर्तमान में संबंधित डिग्री का पीछा कर रहे हैं या हाल ही में पूरा किया है',
      'प्रोग्रामिंग अवधारणाओं का बुनियादी ज्ञान',
      'मजबूत समस्या-समाधान और विश्लेषणात्मक कौशल',
      'अच्छी संचार और टीमवर्क क्षमताएं',
      'नई तकनीकों को सीखने और अनुकूलित करने की उत्सुकता'
    ],
    sampleBenefits: [
      'प्रतिस्पर्धी वजीफा और प्रदर्शन बोनस',
      'उद्योग विशेषज्ञों से मार्गदर्शन',
      'पूर्णता का प्रमाण पत्र',
      'नेटवर्किंग के अवसर',
      'पूर्णकालिक ऑफर की संभावना'
    ]
  };

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{t.noInternship}</CardTitle>
              <CardDescription>{t.noInternshipDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.back}
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{internship.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-primary flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      {internship.company}
                    </CardDescription>
                  </div>
                  <Button onClick={onApply} size="lg" className="bg-gradient-primary">
                    {t.applyNow}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {internship.location}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {internship.duration}
                  </Badge>
                  {internship.stipend && (
                    <Badge variant="secondary" className="text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {internship.stipend}
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{t.overview}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {internship.description}
                </p>
              </CardContent>
            </Card>

            {/* Key Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>{t.responsibilities}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sampleResponsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>{t.requirements}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill, index) => (
                        <Badge key={index} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">General Requirements:</h4>
                    <ul className="space-y-2">
                      {t.sampleRequirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>{t.benefits}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sampleBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{t.applicationDeadline}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      30 Nov 2024
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{t.positions}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      5-10
                    </Badge>
                  </div>

                  <Separator />

                  <Button onClick={onApply} className="w-full bg-gradient-primary">
                    {t.applyNow}
                  </Button>
                </CardContent>
              </Card>

              {/* About Company */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.aboutCompany}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-16 w-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{internship.company}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t.companyInfo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};