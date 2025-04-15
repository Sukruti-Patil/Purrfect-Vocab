
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CirclePlus, BookOpen, Award, Star, MessageSquare } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'word_learned' | 'achievement' | 'story_completed' | 'flashcard_completed' | 'chat_milestone';
  title: string;
  details?: string;
  timestamp: string;
  points?: number;
}

export const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'word_learned',
      title: 'Learned "Serendipity"',
      details: 'Added to your vocabulary',
      timestamp: '2 hours ago',
      points: 5
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Achievement Unlocked',
      details: 'Word Explorer: Learn 10 new words',
      timestamp: '5 hours ago',
      points: 20
    },
    {
      id: '3',
      type: 'story_completed',
      title: 'Story Completed',
      details: 'The Mysterious Artifact',
      timestamp: 'Yesterday',
      points: 15
    },
    {
      id: '4',
      type: 'flashcard_completed',
      title: 'Flashcard Session Completed',
      details: 'Academic vocabulary deck',
      timestamp: '2 days ago',
      points: 10
    },
    {
      id: '5',
      type: 'chat_milestone',
      title: 'Chat Milestone',
      details: 'Asked Meowford 50 questions',
      timestamp: '3 days ago',
      points: 25
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'word_learned':
        return <CirclePlus className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'story_completed':
        return <BookOpen className="h-4 w-4" />;
      case 'flashcard_completed':
        return <Star className="h-4 w-4" />;
      case 'chat_milestone':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <CirclePlus className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'word_learned':
        return 'text-green-500 bg-green-100';
      case 'achievement':
        return 'text-amber-500 bg-amber-100';
      case 'story_completed':
        return 'text-blue-500 bg-blue-100';
      case 'flashcard_completed':
        return 'text-purple-500 bg-purple-100';
      case 'chat_milestone':
        return 'text-pink-500 bg-pink-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-muted"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div>
                    <div className={`relative px-1.5 py-1.5 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
                      {activity.points && (
                        <Badge variant="outline" className="text-xs font-normal text-amber-500">
                          +{activity.points} points
                        </Badge>
                      )}
                    </div>
                    {activity.details && (
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
