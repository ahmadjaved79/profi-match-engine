import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { StudentRegistration } from '@/components/StudentRegistration';
import { InternshipCard } from '@/components/InternshipCard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { RecommendationEngine } from '@/utils/recommendation';
import { mockInternships, translations } from '@/data/mockData';
import { Student, Recommendation, Notification } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Brain, Target, Users, TrendingUp, Rocket, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-internship.jpg';

const Index = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'recommendations' | 'admin'>('home');

  const t = translations[language];

  useEffect(() => {
    // Simulate notifications
    if (currentStudent && recommendations.length > 0) {
      const newNotifications: Notification[] = recommendations.slice(0, 2).map((rec, index) => ({
        id: `notif-${index}`,
        type: 'match',
        title: language === 'en' ? 'New Match Found!' : 'नया मैच मिला!',
        message: language === 'en' 
          ? `You have a ${Math.round(rec.score * 100)}% match with ${rec.internship.title} at ${rec.internship.company}`
          : `आपका ${rec.internship.company} में ${rec.internship.title} के साथ ${Math.round(rec.score * 100)}% मैच है`,
        read: false,
        createdAt: new Date()
      }));
      setNotifications(newNotifications);
    }
  }, [recommendations, currentStudent, language]);

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNavigation = (view: string) => {
    if (view === 'home' || view === 'recommendations' || view === 'register' || view === 'admin') {
      setCurrentView(view);
    }
  };

  const handleStudentRegister = (studentData: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setCurrentStudent(newStudent);
    
    // Generate recommendations
    const recs = RecommendationEngine.generateRecommendations(newStudent, mockInternships);
    setRecommendations(recs);
    setCurrentView('recommendations');

    // Show success notification
    toast({
      title: language === 'en' ? 'Welcome!' : 'स्वागत है!',
      description: language === 'en' 
        ? `Found ${recs.length} matching internships for you!`
        : `आपके लिए ${recs.length} मैचिंग इंटर्नशिप मिलीं!`
    });
  };

  const StatCard = ({ icon: Icon, title, value, description }: { 
    icon: React.ElementType, 
    title: string, 
    value: string, 
    description: string 
  }) => (
    <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {t.heroSubtitle}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => setCurrentView('register')}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  {t.getStarted}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setCurrentView('recommendations')}
                >
                  {t.viewInternships}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Personalized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Instant Matches</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-strong">
                <img 
                  src={heroImage} 
                  alt="Students collaborating"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary/10"></div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 p-3 bg-card rounded-lg shadow-medium border">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Matching</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 p-3 bg-card rounded-lg shadow-medium border">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Match Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have found their dream internships through our AI-powered platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              title={t.totalStudents}
              value="2,400+"
              description="Active student profiles"
            />
            <StatCard
              icon={Target}
              title={t.totalInternships}
              value="850+"
              description="Available opportunities"
            />
            <StatCard
              icon={TrendingUp}
              title={t.matchesGenerated}
              value="15,000+"
              description="Successful recommendations"
            />
            <StatCard
              icon={Brain}
              title="AI Accuracy"
              value="94.5%"
              description="Match success rate"
            />
          </div>
        </div>
      </section>

      {/* Top Skills Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.topSkills}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most requested skills by employers on our platform
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science', 
              'UI/UX Design', 'Mobile Development', 'Cloud Computing', 'DevOps'].map(skill => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm font-medium">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderRecommendations = () => {
    const displayData = currentStudent && recommendations.length > 0 
      ? recommendations 
      : mockInternships.slice(0, 4).map(internship => ({ 
          internship, 
          score: Math.random() * 0.5 + 0.5,
          reasons: ['Sample recommendation', 'Demo purposes'],
          matchedSkills: internship.skills.slice(0, 2)
        }));

    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {currentStudent ? `Welcome, ${currentStudent.name}!` : 'Featured Internships'}
            </h1>
            <p className="text-muted-foreground">
              {currentStudent 
                ? `Here are your personalized recommendations based on your profile`
                : 'Discover amazing internship opportunities'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((rec, index) => (
              <InternshipCard
                key={rec.internship.id || index}
                internship={rec.internship}
                recommendation={rec}
                language={language}
              />
            ))}
          </div>

          {!currentStudent && (
            <div className="text-center mt-12">
              <Card className="max-w-md mx-auto shadow-medium">
                <CardHeader>
                  <CardTitle>Get Personalized Recommendations</CardTitle>
                  <CardDescription>
                    Create your profile to see internships tailored specifically for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setCurrentView('register')}
                    className="w-full bg-gradient-primary"
                  >
                    Create Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        language={language} 
        onLanguageChange={setLanguage}
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
        onNotificationDismiss={handleNotificationDismiss}
        onNavigate={handleNavigation}
        currentView={currentView}
      />
      
      {currentView === 'home' && renderHome()}
      {currentView === 'register' && (
        <div className="min-h-screen bg-gradient-subtle py-8">
          <div className="container">
            <StudentRegistration onRegister={handleStudentRegister} language={language} />
          </div>
        </div>
      )}
      {currentView === 'recommendations' && renderRecommendations()}
      {currentView === 'admin' && <AdminDashboard language={language} />}
      
      <Footer language={language} />
    </div>
  );
};

export default Index;