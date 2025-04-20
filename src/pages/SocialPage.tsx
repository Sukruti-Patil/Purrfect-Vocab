
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Trophy, User, Users, MessageCircle, Star, Edit, Share2 } from 'lucide-react';

// Mock user data
interface SocialUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  level: number;
  wordsLearned: number;
  streak: number;
  joinDate: string;
  isFollowing: boolean;
  bio?: string;
  achievements?: string[];
}

const mockUsers: SocialUser[] = [
  {
    id: "user1",
    username: "language_master",
    fullName: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    level: 15,
    wordsLearned: 380,
    streak: 45,
    joinDate: "2023-10-15",
    isFollowing: true,
    bio: "English teacher and language enthusiast. I love learning new vocabulary every day!",
    achievements: ["Vocabulary Champion", "Perfect Streak - 30 Days", "Quiz Master"]
  },
  {
    id: "user2",
    username: "word_wizard",
    fullName: "Sam Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    level: 22,
    wordsLearned: 520,
    streak: 68,
    joinDate: "2023-08-05",
    isFollowing: false,
    bio: "Linguistics student with a passion for etymology and word origins.",
    achievements: ["Etymology Expert", "Story Creator", "Grammar Guru"]
  },
  {
    id: "user3",
    username: "bookworm42",
    fullName: "Jamie Rivera",
    avatar: "https://i.pravatar.cc/150?img=3",
    level: 19,
    wordsLearned: 450,
    streak: 30,
    joinDate: "2023-11-20",
    isFollowing: true,
    bio: "I read a book a week and collect interesting words along the way.",
    achievements: ["Vocabulary Builder", "Literary Terms Master"]
  },
  {
    id: "user4",
    username: "grammar_geek",
    fullName: "Taylor Kim",
    avatar: "https://i.pravatar.cc/150?img=4",
    level: 25,
    wordsLearned: 630,
    streak: 75,
    joinDate: "2023-07-18",
    isFollowing: false,
    bio: "Editor by day, language learner by night. Grammar is my passion!",
    achievements: ["Grammar Champion", "Preposition Perfect", "Conjunction Master"]
  },
  {
    id: "user5",
    username: "vocab_voyager",
    fullName: "Jordan Patel",
    avatar: "https://i.pravatar.cc/150?img=5",
    level: 18,
    wordsLearned: 410,
    streak: 22,
    joinDate: "2023-12-03",
    isFollowing: true,
    bio: "Traveling the world and learning new languages. Currently focused on English idioms.",
    achievements: ["Idiom Expert", "World Traveler"]
  }
];

// Mock challenge data
interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  deadline: string;
  type: "vocabulary" | "grammar" | "writing" | "quiz";
  difficulty: "easy" | "medium" | "hard";
  reward: number;
  isJoined: boolean;
}

const mockChallenges: Challenge[] = [
  {
    id: "c1",
    title: "Weekly Vocabulary Sprint",
    description: "Learn 30 new words in 7 days. Complete daily flashcard sessions to progress.",
    participants: 128,
    deadline: "2025-05-01",
    type: "vocabulary",
    difficulty: "medium",
    reward: 150,
    isJoined: false
  },
  {
    id: "c2",
    title: "Grammar Perfection",
    description: "Master prepositions with our targeted quiz challenge. Complete 10 grammar exercises with 90% accuracy.",
    participants: 85,
    deadline: "2025-04-28",
    type: "grammar",
    difficulty: "hard",
    reward: 200,
    isJoined: true
  },
  {
    id: "c3",
    title: "Story Writing Competition",
    description: "Write a 250-word story using at least 10 words from our advanced vocabulary list.",
    participants: 64,
    deadline: "2025-05-10",
    type: "writing",
    difficulty: "medium",
    reward: 300,
    isJoined: false
  },
  {
    id: "c4",
    title: "Beginner's Welcome Challenge",
    description: "Complete all beginner-level flashcards and take a quiz to test your knowledge.",
    participants: 210,
    deadline: "2025-05-15",
    type: "quiz",
    difficulty: "easy",
    reward: 100,
    isJoined: false
  }
];

// Mock leaderboard data
interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { userId: "user4", username: "grammar_geek", avatar: "https://i.pravatar.cc/150?img=4", score: 9850, rank: 1 },
  { userId: "user2", username: "word_wizard", avatar: "https://i.pravatar.cc/150?img=2", score: 9720, rank: 2 },
  { userId: "user1", username: "language_master", avatar: "https://i.pravatar.cc/150?img=1", score: 8900, rank: 3 },
  { userId: "user5", username: "vocab_voyager", avatar: "https://i.pravatar.cc/150?img=5", score: 7600, rank: 4 },
  { userId: "user3", username: "bookworm42", avatar: "https://i.pravatar.cc/150?img=3", score: 7200, rank: 5 },
  { userId: "user6", username: "etymologist", avatar: "https://i.pravatar.cc/150?img=6", score: 6890, rank: 6 },
  { userId: "user7", username: "wordsmith", avatar: "https://i.pravatar.cc/150?img=7", score: 6750, rank: 7 },
  { userId: "user8", username: "dictionary_lover", avatar: "https://i.pravatar.cc/150?img=8", score: 6500, rank: 8 },
  { userId: "user9", username: "syntax_specialist", avatar: "https://i.pravatar.cc/150?img=9", score: 6320, rank: 9 },
  { userId: "user10", username: "verb_virtuoso", avatar: "https://i.pravatar.cc/150?img=10", score: 6180, rank: 10 }
];

// Dummy user profile
const currentUserProfile: SocialUser = {
  id: "current",
  username: "your_username",
  fullName: "Your Name",
  avatar: "https://i.pravatar.cc/150?img=11",
  level: 12,
  wordsLearned: 250,
  streak: 15,
  joinDate: "2024-03-15",
  isFollowing: false,
  bio: "English language enthusiast. Learning new words daily!",
  achievements: ["5-Day Streak", "Quiz Novice", "Word Collector"]
};

const SocialPage: React.FC = () => {
  const [users, setUsers] = useState<SocialUser[]>(mockUsers);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [userProfile, setUserProfile] = useState<SocialUser>(currentUserProfile);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRank, setUserRank] = useState(42);
  const { toast } = useToast();

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollowToggle = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ));
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: user.isFollowing ? `Unfollowed ${user.username}` : `Now following ${user.username}`,
        description: user.isFollowing ? "You will no longer see their updates." : "You'll now see their activity in your feed."
      });
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId ? { ...challenge, isJoined: !challenge.isJoined } : challenge
    ));
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      if (!challenge.isJoined) {
        toast({
          title: `Joined "${challenge.title}"`,
          description: "Good luck with the challenge! Your progress will be tracked automatically."
        });
      } else {
        toast({
          title: `Left "${challenge.title}"`,
          description: "You have withdrawn from this challenge."
        });
      }
    }
  };

  // Simulate calculating user's own rank
  useEffect(() => {
    // In a real app, this would come from the API
    const mockUserScore = 3500;
    const mockTotalUsers = 2453;
    
    // Calculate an appropriate rank based on the score
    const calculatedRank = Math.floor((mockUserScore / mockLeaderboard[0].score) * 10);
    setUserRank(calculatedRank <= 100 ? calculatedRank : Math.floor(mockTotalUsers * 0.02));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Community</h1>
        <p className="text-muted-foreground">Connect with others, join challenges, and climb the leaderboard</p>
      </div>
      
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="profile">Your Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Language Learners
              </CardTitle>
              <CardDescription>
                Compete with other users for the top spot on our vocabulary leaderboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border">
                <div className="bg-muted py-2 px-4 flex font-medium text-sm">
                  <div className="w-12 text-center">Rank</div>
                  <div className="flex-1 ml-2">User</div>
                  <div className="w-20 text-right">Score</div>
                </div>
                
                <ScrollArea className="h-[400px]">
                  {leaderboard.map((entry, index) => (
                    <div 
                      key={entry.userId}
                      className={`flex items-center py-3 px-4 border-b last:border-b-0 ${index < 3 ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}
                    >
                      <div className="w-12 text-center font-semibold">
                        {index === 0 && <span className="text-yellow-500">🥇</span>}
                        {index === 1 && <span className="text-gray-400">🥈</span>}
                        {index === 2 && <span className="text-amber-600">🥉</span>}
                        {index > 2 && <span>{entry.rank}</span>}
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img src={entry.avatar} alt={entry.username} className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium">{entry.username}</span>
                      </div>
                      <div className="w-20 text-right font-medium">{entry.score.toLocaleString()}</div>
                    </div>
                  ))}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex items-center py-3 px-4 bg-muted/50">
                    <div className="w-12 text-center font-semibold">{userRank}</div>
                    <div className="flex-1 flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                        <img src={userProfile.avatar} alt="Your profile" className="h-full w-full object-cover" />
                      </div>
                      <span className="font-medium">{userProfile.username}</span>
                      <Badge variant="outline" className="ml-2">You</Badge>
                    </div>
                    <div className="w-20 text-right font-medium">3,500</div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Last updated: today</p>
              <Button variant="outline" size="sm">See Full Rankings</Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,500</div>
                <p className="text-sm text-muted-foreground">Total points earned</p>
                <div className="mt-2 text-sm text-green-600">+150 this week</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Words to Next Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">25</div>
                <p className="text-sm text-muted-foreground">Learn more words to advance</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-full rounded-full" style={{width: '75%'}}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">50<span className="text-lg font-normal text-muted-foreground">/100</span></div>
                <p className="text-sm text-muted-foreground">Words learned this week</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-full rounded-full" style={{width: '50%'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(challenge => (
              <Card key={challenge.id} className={`${challenge.isJoined ? 'border-primary bg-primary/5' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription className="mt-1">{challenge.description}</CardDescription>
                    </div>
                    <Badge className={
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span>{challenge.reward} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Ends:</span>
                      <span>{new Date(challenge.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={challenge.isJoined ? "outline" : "default"}
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    {challenge.isJoined ? "Leave Challenge" : "Join Challenge"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a Custom Challenge</CardTitle>
              <CardDescription>
                Invite friends to compete in a personalized vocabulary challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Challenge Title</label>
                  <Input placeholder="Enter a catchy title for your challenge" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input placeholder="Describe the rules and goals of your challenge" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Challenge Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="vocabulary">Vocabulary</option>
                      <option value="grammar">Grammar</option>
                      <option value="writing">Writing</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Challenge</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="community" className="space-y-4">
          <div className="relative">
            <Input 
              placeholder="Search for users by name or username" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1 h-8" 
                onClick={() => setSearchTerm('')}
              >
                Clear
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                        <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{user.fullName}</h3>
                        <p className="text-muted-foreground">@{user.username}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-2 text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-amber-500" />
                            <span>Level {user.level}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{user.wordsLearned} words</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{user.streak} day streak</span>
                          </div>
                        </div>
                        
                        {user.bio && (
                          <p className="mt-3 text-sm line-clamp-2">{user.bio}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {user.achievements?.slice(0, 2).map((achievement, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                          {(user.achievements?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{(user.achievements?.length || 0) - 2} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button 
                            variant={user.isFollowing ? "outline" : "default"}
                            size="sm"
                            className="flex-1"
                            onClick={() => handleFollowToggle(user.id)}
                          >
                            {user.isFollowing ? "Unfollow" : "Follow"}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center bg-muted rounded-lg">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-lg font-medium">No users found</p>
                <p className="text-muted-foreground">Try searching with a different name or username</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                    <img src={userProfile.avatar} alt="Your profile" className="h-full w-full object-cover" />
                  </div>
                  
                  <h2 className="text-xl font-bold">{userProfile.fullName}</h2>
                  <p className="text-muted-foreground">@{userProfile.username}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.level}</div>
                      <p className="text-xs text-muted-foreground">Level</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.wordsLearned}</div>
                      <p className="text-xs text-muted-foreground">Words</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.streak}</div>
                      <p className="text-xs text-muted-foreground">Streak</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 w-full">
                    <Button className="w-full" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold mb-2">About Me</h3>
                  <p className="text-sm text-muted-foreground mb-4">{userProfile.bio}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {userProfile.achievements?.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between text-sm">
                        <span>Completed "Grammar Perfection" challenge</span>
                        <span className="text-muted-foreground">2 days ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between text-sm">
                        <span>Learned 10 new vocabulary words</span>
                        <span className="text-muted-foreground">3 days ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between text-sm">
                        <span>Created a new story: "Adventure in the Forest"</span>
                        <span className="text-muted-foreground">5 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Vocabulary Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-full rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Grammar Mastery</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-full rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Quiz Performance</span>
                      <span>82%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-full rounded-full" style={{width: '82%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Story Creation</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-full rounded-full" style={{width: '40%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=1" alt="Friend" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">Level 15</p>
                      </div>
                    </div>
                    <Badge variant="outline">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=3" alt="Friend" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">Jamie Rivera</p>
                        <p className="text-xs text-muted-foreground">Level 19</p>
                      </div>
                    </div>
                    <Badge variant="outline">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=5" alt="Friend" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">Jordan Patel</p>
                        <p className="text-xs text-muted-foreground">Level 18</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-muted">Offline</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Find Friends
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialPage;
