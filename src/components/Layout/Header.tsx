import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Globe, User, Menu, X, BarChart3 } from 'lucide-react';
import { translations } from '@/data/mockData';
import { NotificationPanel } from '@/components/NotificationPanel';
import { Notification, Student } from '@/types';

interface HeaderProps {
  language: 'en' | 'hi';
  onLanguageChange: (lang: 'en' | 'hi') => void;
  notifications?: Notification[];
  onNotificationRead?: (id: string) => void;
  onNotificationDismiss?: (id: string) => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
  currentStudent?: Student | null;
}

export const Header = ({ 
  language, 
  onLanguageChange, 
  notifications = [],
  onNotificationRead = () => {},
  onNotificationDismiss = () => {},
  onNavigate = () => {},
  currentView = 'home',
  currentStudent = null
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IM</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">{t.title}</h1>
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant={currentView === 'home' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => onNavigate('home')}
          >
            Home
          </Button>
          <Button 
            variant={currentView === 'recommendations' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => onNavigate('recommendations')}
          >
            {t.recommendations}
          </Button>
          <Button 
            variant={currentView === 'register' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => onNavigate('register')}
          >
            {t.register}
          </Button>
          <Button 
            variant={currentView === 'admin' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => onNavigate('admin')}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            {t.adminDashboard}
          </Button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
            className="hidden sm:flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'हिं' : 'EN'}</span>
          </Button>

          {/* Notifications */}
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={onNotificationRead}
            onDismiss={onNotificationDismiss}
            language={language}
          />

          {/* User Menu */}
          {currentStudent ? (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{currentStudent.name.split(' ')[0]}</span>
            </Button>
          ) : (
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="container py-4 space-y-2">
            <Button 
              variant={currentView === 'home' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('home')}
            >
              Home
            </Button>
            <Button 
              variant={currentView === 'recommendations' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('recommendations')}
            >
              {t.recommendations}
            </Button>
            <Button 
              variant={currentView === 'register' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('register')}
            >
              {t.register}
            </Button>
            <Button 
              variant={currentView === 'admin' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('admin')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {t.adminDashboard}
            </Button>
            <Button
              variant="outline"
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="w-full justify-start"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
            {currentStudent && (
              <Button 
                variant={currentView === 'profile' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => onNavigate('profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Profile - {currentStudent.name}
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};