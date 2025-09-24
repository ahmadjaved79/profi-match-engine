import { Badge } from '@/components/ui/badge';
import { Heart, Code, Brain } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'hi';
}

export const Footer = ({ language }: FooterProps) => {
  const t = language === 'en' ? {
    builtWith: 'Built with',
    poweredBy: 'Powered by AI',
    madeWith: 'Made with',
    forStudents: 'for students',
    features: ['Smart Matching', 'TF-IDF Algorithm', 'Multilingual', 'Real-time Notifications']
  } : {
    builtWith: 'निर्मित',
    poweredBy: 'AI द्वारा संचालित',
    madeWith: 'बनाया गया',  
    forStudents: 'छात्रों के लिए',
    features: ['स्मार्ट मैचिंग', 'TF-IDF एल्गोरिदम', 'बहुभाषी', 'रियल-टाइम नोटिफिकेशन']
  };

  return (
    <footer className="border-t bg-gradient-subtle py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IM</span>
              </div>
              <div>
                <h3 className="font-bold">InternMatch AI</h3>
                <p className="text-xs text-muted-foreground">Smart Internship Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.madeWith} <Heart className="inline-block h-4 w-4 text-red-500 mx-1" /> {t.forStudents}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">{t.poweredBy}</h4>
            <div className="flex flex-wrap gap-2">
              {t.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">{t.builtWith}</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'AI/ML'].map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Code className="h-3 w-3 mr-1" />
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>© 2024 InternMatch AI. Connecting talent with opportunity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};