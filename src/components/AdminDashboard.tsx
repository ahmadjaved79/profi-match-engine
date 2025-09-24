import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Target, TrendingUp, Brain, MapPin, BookOpen } from 'lucide-react';
import { mockStudents, mockInternships } from '@/data/mockData';

interface AdminDashboardProps {
  language: 'en' | 'hi';
}

export const AdminDashboard = ({ language }: AdminDashboardProps) => {
  const t = language === 'en' ? {
    title: 'Admin Dashboard',
    subtitle: 'Platform Analytics and Insights',
    totalStudents: 'Total Students',
    totalInternships: 'Total Internships',
    activeMatches: 'Active Matches',
    successRate: 'Success Rate',
    topSkills: 'Top Skills in Demand',
    locationDistribution: 'Location Distribution',
    educationBreakdown: 'Education Breakdown',
    recentActivity: 'Recent Activity'
  } : {
    title: 'एडमिन डैशबोर्ड',
    subtitle: 'प्लेटफॉर्म एनालिटिक्स और इनसाइट्स',
    totalStudents: 'कुल छात्र',
    totalInternships: 'कुल इंटर्नशिप',
    activeMatches: 'सक्रिय मैच',
    successRate: 'सफलता दर',
    topSkills: 'मांग में टॉप कौशल',
    locationDistribution: 'स्थान वितरण',
    educationBreakdown: 'शिक्षा विभाजन',
    recentActivity: 'हाल की गतिविधि'
  };

  // Mock analytics data
  const analytics = {
    totalStudents: 2400,
    totalInternships: 850,
    activeMatches: 15000,
    successRate: 94.5,
    topSkills: [
      { name: 'JavaScript', count: 320, percentage: 85 },
      { name: 'Python', count: 280, percentage: 75 },
      { name: 'React', count: 250, percentage: 67 },
      { name: 'Machine Learning', count: 200, percentage: 53 },
      { name: 'Node.js', count: 180, percentage: 48 }
    ],
    locations: [
      { name: 'Bangalore', count: 450, percentage: 35 },
      { name: 'Mumbai', count: 380, percentage: 30 },
      { name: 'Hyderabad', count: 320, percentage: 25 },
      { name: 'Pune', count: 280, percentage: 22 },
      { name: 'Chennai', count: 240, percentage: 19 }
    ],
    education: [
      { name: 'Computer Science', count: 650, percentage: 55 },
      { name: 'Information Technology', count: 420, percentage: 35 },
      { name: 'Electronics', count: 280, percentage: 23 },
      { name: 'Mechanical', count: 180, percentage: 15 }
    ]
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    change, 
    description 
  }: { 
    icon: React.ElementType;
    title: string;
    value: string | number;
    change?: string;
    description: string;
  }) => (
    <Card className="hover:shadow-medium transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
        {change && (
          <p className="text-xs text-success">
            {change} from last month
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title={t.totalStudents}
            value={analytics.totalStudents.toLocaleString()}
            change="+12%"
            description="Registered student profiles"
          />
          <StatCard
            icon={Target}
            title={t.totalInternships}
            value={analytics.totalInternships.toLocaleString()}
            change="+8%"
            description="Available opportunities"
          />
          <StatCard
            icon={TrendingUp}
            title={t.activeMatches}
            value={analytics.activeMatches.toLocaleString()}
            change="+23%"
            description="Successful recommendations"
          />
          <StatCard
            icon={Brain}
            title={t.successRate}
            value={`${analytics.successRate}%`}
            change="+2.1%"
            description="AI matching accuracy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Skills */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{t.topSkills}</span>
              </CardTitle>
              <CardDescription>Most requested skills by employers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{skill.count}</span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Distribution */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{t.locationDistribution}</span>
              </CardTitle>
              <CardDescription>Student preferences by city</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.locations.map((location, index) => (
                  <div key={location.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{location.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{location.count}</span>
                        <Badge variant="outline" className="text-xs">
                          {location.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={location.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education Breakdown */}
          <Card className="shadow-medium lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{t.educationBreakdown}</span>
              </CardTitle>
              <CardDescription>Student distribution by education field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analytics.education.map((edu, index) => (
                  <div key={edu.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{edu.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{edu.count}</span>
                        <Badge variant="secondary" className="text-xs">
                          {edu.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={edu.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};