import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Check, Star, Briefcase, Info } from 'lucide-react';
import { Notification } from '@/types';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  language: 'en' | 'hi';
}

export const NotificationPanel = ({ 
  notifications, 
  onMarkAsRead, 
  onDismiss, 
  language 
}: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const t = language === 'en' ? {
    notifications: 'Notifications',
    markAllRead: 'Mark All Read',
    noNotifications: 'No new notifications',
    newMatch: 'New Match!',
    applicationUpdate: 'Application Updated',
    systemUpdate: 'System Update'
  } : {
    notifications: 'सूचनाएं',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noNotifications: 'कोई नई सूचना नहीं',
    newMatch: 'नया मैच!',
    applicationUpdate: 'आवेदन अपडेट',
    systemUpdate: 'सिस्टम अपडेट'
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match':
        return <Star className="h-4 w-4 text-success" />;
      case 'application':
        return <Briefcase className="h-4 w-4 text-primary" />;
      case 'update':
        return <Info className="h-4 w-4 text-warning" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return language === 'en' ? 'Just now' : 'अभी';
    if (minutes < 60) return language === 'en' ? `${minutes}m ago` : `${minutes}मि पहले`;
    if (hours < 24) return language === 'en' ? `${hours}h ago` : `${hours}घं पहले`;
    return language === 'en' ? `${days}d ago` : `${days}दिन पहले`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-full mt-2 w-80 z-50 shadow-strong border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t.notifications}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    notifications.forEach(n => !n.read && onMarkAsRead(n.id));
                  }}
                >
                  <Check className="h-3 w-3 mr-1" />
                  {t.markAllRead}
                </Button>
              )}
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{t.noNotifications}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                          !notification.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(notification.createdAt)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2"
                                  onClick={() => onMarkAsRead(notification.id)}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  {language === 'en' ? 'Mark Read' : 'पढ़ा गया'}
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                                onClick={() => onDismiss(notification.id)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                {language === 'en' ? 'Dismiss' : 'हटाएं'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};