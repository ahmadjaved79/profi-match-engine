import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';
import { Internship, Recommendation } from '@/types';

interface InternshipCardProps {
  internship: Internship;
  recommendation?: Recommendation;
  language: 'en' | 'hi';
}

export const InternshipCard = ({ internship, recommendation, language }: InternshipCardProps) => {
  const t = language === 'en' ? {
    whyRecommended: 'Why Recommended',
    apply: 'Apply Now',
    viewDetails: 'View Details',
    matchScore: 'Match Score'
  } : {
    whyRecommended: 'क्यों सुझाया गया',
    apply: 'अभी आवेदन करें',
    viewDetails: 'विवरण देखें',
    matchScore: 'मैच स्कोर'
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {internship.title}
            </CardTitle>
            <CardDescription className="font-medium text-accent">
              {internship.company}
            </CardDescription>
          </div>
          {recommendation && (
            <div className="flex items-center space-x-1 text-success">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">
                {Math.round(recommendation.score * 100)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {internship.location}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {internship.duration}
          </Badge>
          {internship.stipend && (
            <Badge variant="secondary" className="text-xs">
              <DollarSign className="h-3 w-3 mr-1" />
              {internship.stipend}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {internship.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Required Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {internship.skills.map((skill, index) => {
              const isMatched = recommendation?.matchedSkills.includes(skill);
              return (
                <Badge
                  key={index}
                  variant={isMatched ? "default" : "outline"}
                  className={`text-xs ${isMatched ? 'bg-success text-success-foreground' : ''}`}
                >
                  {isMatched && <CheckCircle className="h-3 w-3 mr-1" />}
                  {skill}
                </Badge>
              );
            })}
          </div>
        </div>

        {recommendation && (
          <div className="space-y-2 p-3 bg-gradient-hero rounded-lg border">
            <h4 className="text-sm font-medium text-primary flex items-center">
              <Star className="h-4 w-4 mr-1" />
              {t.whyRecommended}
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {recommendation.reasons.map((reason, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-success mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button className="flex-1" size="sm">
            {t.apply}
          </Button>
          <Button variant="outline" size="sm">
            {t.viewDetails}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};