import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Users, MessageCircle, Heart, Calendar, UserPlus, Search, Send, MapPin, Clock, CheckCircle, BookmarkCheck, FileText, CalendarCheck, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Community() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [joinGroupModal, setJoinGroupModal] = useState<number | null>(null);
  const [newTopicModal, setNewTopicModal] = useState(false);
  const [scheduleChatModal, setScheduleChatModal] = useState<{ name: string; specialty: string } | null>(null);
  const [registerEventModal, setRegisterEventModal] = useState<number | null>(null);
  const [eventProposalModal, setEventProposalModal] = useState(false);
  const [successModal, setSuccessModal] = useState<{ type: string; message: string } | null>(null);
  
  // Form states
  const [joinGroupForm, setJoinGroupForm] = useState({ name: '', email: '', reason: '' });
  const [newTopicForm, setNewTopicForm] = useState({ title: '', category: 'General', content: '' });
  const [scheduleChatForm, setScheduleChatForm] = useState({ name: '', email: '', date: '', time: '', topic: '' });
  const [registerEventForm, setRegisterEventForm] = useState({ name: '', email: '', dietary: '' });
  const [eventProposalForm, setEventProposalForm] = useState({ title: '', orgName: '', contactEmail: '', date: '', description: '', expectedAttendees: '' });

  // User activity tracking states
  const [myJoinedGroups, setMyJoinedGroups] = useState<Array<{ id: number; name: string; joinedDate: string; category: string; meetingTime: string; color: string }>>([]);
  const [myCreatedTopics, setMyCreatedTopics] = useState<Array<{ id: number; title: string; category: string; createdDate: string; replies: number; likes: number; content: string }>>([]);
  const [myScheduledChats, setMyScheduledChats] = useState<Array<{ id: number; counselor: string; date: string; time: string; topic: string; status: string }>>([]);
  const [myRegisteredEvents, setMyRegisteredEvents] = useState<Array<{ id: number; title: string; date: string; time: string; location: string; type: string }>>([]);
  const [myEventProposals, setMyEventProposals] = useState<Array<{ id: number; title: string; orgName: string; date: string; status: string; submittedDate: string }>>([]);

  // Auto-fill forms with user data when user is authenticated
  useEffect(() => {
    if (user) {
      const displayName = user.isAnonymous ? 'Anonymous User' : user.name;
      setJoinGroupForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setScheduleChatForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setRegisterEventForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setEventProposalForm(prev => ({ ...prev, contactEmail: user.email }));
    }
  }, [user]);

  // Helper to check authentication before action
  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    action();
  };

  // Handler functions
  const handleJoinGroup = () => {
    if (joinGroupModal) {
      const group = supportGroups.find(g => g.id === joinGroupModal);
      if (group) {
        const newJoinedGroup = {
          id: joinGroupModal,
          name: group.name,
          joinedDate: new Date().toLocaleDateString(),
          category: group.category,
          meetingTime: group.meetingTime,
          color: group.color
        };
        setMyJoinedGroups([...myJoinedGroups, newJoinedGroup]);
        setJoinGroupModal(null);
        setSuccessModal({ type: 'Join Group', message: 'You have successfully joined the support group!' });
      }
    }
  };

  const handleCreateTopic = () => {
    if (newTopicForm.title && newTopicForm.content) {
      const newTopic = {
        id: Date.now(),
        title: newTopicForm.title,
        category: newTopicForm.category,
        content: newTopicForm.content,
        createdDate: new Date().toLocaleDateString(),
        replies: 0,
        likes: 0
      };
      setMyCreatedTopics([...myCreatedTopics, newTopic]);
      setNewTopicForm({ title: '', category: 'General', content: '' });
      setNewTopicModal(false);
      setSuccessModal({ type: 'New Topic', message: 'Your topic has been posted!' });
    }
  };

  const handleScheduleChat = () => {
    if (scheduleChatModal && scheduleChatForm.date && scheduleChatForm.time) {
      const newChat = {
        id: Date.now(),
        counselor: scheduleChatModal.name,
        date: new Date(scheduleChatForm.date).toLocaleDateString(),
        time: scheduleChatForm.time,
        topic: scheduleChatForm.topic,
        status: 'Scheduled'
      };
      setMyScheduledChats([...myScheduledChats, newChat]);
      setScheduleChatModal(null);
      setSuccessModal({ type: 'Schedule Chat', message: 'Your chat has been scheduled!' });
    }
  };

  const handleRegisterEvent = () => {
    if (registerEventModal) {
      const event = upcomingEvents.find(e => e.id === registerEventModal);
      if (event) {
        const newRegistration = {
          id: registerEventModal,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          type: event.type
        };
        setMyRegisteredEvents([...myRegisteredEvents, newRegistration]);
        setRegisterEventModal(null);
        setSuccessModal({ type: 'Register Event', message: 'You have successfully registered for the event!' });
      }
    }
  };

  const handleSubmitProposal = () => {
    if (eventProposalForm.title && eventProposalForm.orgName) {
      const newProposal = {
        id: Date.now(),
        title: eventProposalForm.title,
        orgName: eventProposalForm.orgName,
        date: new Date(eventProposalForm.date).toLocaleDateString(),
        status: 'Under Review',
        submittedDate: new Date().toLocaleDateString()
      };
      setMyEventProposals([...myEventProposals, newProposal]);
      setEventProposalForm({ title: '', orgName: '', contactEmail: user?.email || '', date: '', description: '', expectedAttendees: '' });
      setEventProposalModal(false);
      setSuccessModal({ type: 'Event Proposal', message: 'Your event proposal has been submitted!' });
    }
  };

  const supportGroups = [
    {
      id: 1,
      name: 'Anxiety Support Circle',
      description: 'A safe space for students dealing with anxiety and stress.',
      members: 234,
      category: 'Anxiety',
      meetingTime: 'Tuesdays, 6:00 PM',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 2,
      name: 'Depression & Mood Support',
      description: 'Connect with others who understand depression and low mood.',
      members: 189,
      category: 'Depression',
      meetingTime: 'Thursdays, 7:00 PM',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 3,
      name: 'First-Gen Student Wellness',
      description: 'Support for first-generation college students navigating mental health.',
      members: 156,
      category: 'Student Life',
      meetingTime: 'Wednesdays, 5:30 PM',
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 4,
      name: 'Mindfulness & Meditation',
      description: 'Practice mindfulness together and learn stress-reduction techniques.',
      members: 312,
      category: 'Wellness',
      meetingTime: 'Mondays & Fridays, 7:30 AM',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 5,
      name: 'LGBTQ+ Mental Health',
      description: 'Affirming space for LGBTQ+ students to discuss mental health.',
      members: 178,
      category: 'Identity',
      meetingTime: 'Sundays, 4:00 PM',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      id: 6,
      name: 'Academic Stress Management',
      description: 'Strategies for managing academic pressure and exam stress.',
      members: 267,
      category: 'Academic',
      meetingTime: 'Wednesdays, 6:30 PM',
      color: 'bg-cyan-100 text-cyan-700',
    },
  ];

  const forumTopics = [
    {
      id: 1,
      title: 'How do you manage test anxiety?',
      author: 'Sarah M.',
      replies: 23,
      likes: 45,
      category: 'Coping Strategies',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      title: 'Finding motivation when feeling down',
      author: 'Alex P.',
      replies: 31,
      likes: 67,
      category: 'Depression',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      title: 'Best breathing exercises for panic attacks?',
      author: 'Jamie L.',
      replies: 18,
      likes: 52,
      category: 'Anxiety',
      timeAgo: '1 day ago',
    },
    {
      id: 4,
      title: 'Balancing school and self-care',
      author: 'Taylor R.',
      replies: 41,
      likes: 89,
      category: 'Student Life',
      timeAgo: '1 day ago',
    },
  ];

  const peerSupport = [
    {
      name: 'Emily Chen',
      role: 'Peer Counselor',
      specialty: 'Anxiety & Stress',
      availability: 'Mon-Fri, 2-6 PM',
      initials: 'EC',
    },
    {
      name: 'Marcus Johnson',
      role: 'Peer Counselor',
      specialty: 'Academic Pressure',
      availability: 'Tue-Thu, 4-8 PM',
      initials: 'MJ',
    },
    {
      name: 'Priya Patel',
      role: 'Peer Counselor',
      specialty: 'Depression Support',
      availability: 'Wed-Fri, 3-7 PM',
      initials: 'PP',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Mental Health Awareness Workshop',
      date: 'March 30, 2026',
      time: '3:00 PM - 5:00 PM',
      location: 'Student Center, Room 201',
      type: 'Workshop',
    },
    {
      id: 2,
      title: 'Stress Relief Yoga Session',
      date: 'April 2, 2026',
      time: '7:00 AM - 8:00 AM',
      location: 'Recreation Center',
      type: 'Activity',
    },
    {
      id: 3,
      title: 'Understanding Depression: Panel Discussion',
      date: 'April 5, 2026',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual (Zoom)',
      type: 'Panel',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">Support Community</h1>
            <p className="text-xl text-green-100">
              Connect with peers, join support groups, and find community. You're not alone in this journey.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdXBwb3J0JTIwZ3JvdXB8ZW58MXx8fHwxNzc0NjM1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students supporting each other"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8">
              <p className="text-white text-lg md:text-xl">
                Building connections and supporting each other through shared experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Alert */}
      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Alert className="border-purple-200 bg-purple-50">
            <Heart className="w-4 h-4 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>Sign in to participate!</strong> Create an account to join support groups, post in forums, and connect with peer counselors.{' '}
              <button onClick={() => navigate('/sign-in')} className="underline font-medium">Sign in now</button>
            </AlertDescription>
          </Alert>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-5 mb-8">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="peers">Peers</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="my-activity">Activity</TabsTrigger>
          </TabsList>

          {/* Support Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl mb-2 text-gray-900">Support Groups</h2>
                <p className="text-gray-600">Find a community that understands your experiences</p>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={group.color}>{group.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{group.members}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{group.meetingTime}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => requireAuth(() => setJoinGroupModal(group.id))}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl mb-2 text-gray-900">Community Forum</h2>
                <p className="text-gray-600">Share experiences and support one another</p>
              </div>
              <Button onClick={() => requireAuth(() => setNewTopicModal(true))}>
                <MessageCircle className="w-4 h-4 mr-2" />
                New Topic
              </Button>
            </div>

            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          {topic.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg mb-1 text-gray-900">{topic.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{topic.author}</span>
                          <span>•</span>
                          <span>{topic.timeAgo}</span>
                          <Badge variant="secondary">{topic.category}</Badge>
                        </div>
                        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{topic.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{topic.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Peer Support Tab */}
          <TabsContent value="peers" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">Peer Counselors</h2>
              <p className="text-gray-600">Connect with trained peer counselors for support</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peerSupport.map((peer, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white text-2xl">
                        {peer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{peer.name}</CardTitle>
                    <div className="mt-2">
                      <Badge variant="secondary" className="mb-2">{peer.role}</Badge>
                      <p className="text-sm text-gray-600 mt-2">{peer.specialty}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 mb-4 text-center">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {peer.availability}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => requireAuth(() => setScheduleChatModal({ name: peer.name, specialty: peer.specialty }))}
                    >
                      Schedule Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">Upcoming Events</h2>
              <p className="text-gray-600">Join workshops, activities, and discussions</p>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const dateParts = event.date.split(' ');
                const day = dateParts[1] ? dateParts[1].replace(',', '') : '';
                const month = dateParts[0] || '';
                
                return (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                          <div className="text-2xl">{day}</div>
                          <div className="text-xs uppercase">{month}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl mb-1 text-gray-900">{event.title}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {event.time}
                                </span>
                                <span className="hidden sm:block">•</span>
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        </div>
                        <Button 
                          className="w-full md:w-auto"
                          onClick={() => requireAuth(() => setRegisterEventModal(event.id))}
                        >
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 text-gray-900">Want to Host an Event?</h3>
                <p className="text-gray-700 mb-4">
                  Student organizations and individuals are encouraged to propose mental health events and workshops.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => requireAuth(() => setEventProposalModal(true))}
                >
                  Submit Event Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Activity Tab */}
          <TabsContent value="my-activity" className="space-y-6">
            {!isAuthenticated ? (
              <Card className="bg-purple-50">
                <CardContent className="p-12 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-lg mb-2 text-gray-900">Sign In to View Your Activity</h3>
                  <p className="text-gray-600 mb-4">Create an account to track your participation in the MindSpace community</p>
                  <Button onClick={() => navigate('/sign-in')}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">My Activity</h2>
                  <p className="text-gray-600 mb-6">Track your participation in the MindSpace community</p>
                </div>

                <Tabs defaultValue="joined-groups" className="w-full">
                  <TabsList className="grid w-full max-w-3xl grid-cols-5">
                    <TabsTrigger value="joined-groups">
                      <BookmarkCheck className="w-4 h-4 mr-2" />
                      Groups
                    </TabsTrigger>
                    <TabsTrigger value="my-topics">
                      <FileText className="w-4 h-4 mr-2" />
                      Topics
                    </TabsTrigger>
                    <TabsTrigger value="scheduled-chats">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      Chats
                    </TabsTrigger>
                    <TabsTrigger value="registered-events">
                      <Calendar className="w-4 h-4 mr-2" />
                      Events
                    </TabsTrigger>
                    <TabsTrigger value="proposals">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Proposals
                    </TabsTrigger>
                  </TabsList>

                  {/* Joined Groups */}
                  <TabsContent value="joined-groups" className="space-y-4 mt-6">
                    {myJoinedGroups.length === 0 ? (
                      <Card className="bg-gray-50">
                        <CardContent className="p-12 text-center">
                          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg mb-2 text-gray-900">No Groups Joined Yet</h3>
                          <p className="text-gray-600 mb-4">Start connecting with peers by joining a support group</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {myJoinedGroups.map((group) => (
                          <Card key={group.id}>
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <Badge className={group.color}>{group.category}</Badge>
                                <span className="text-xs text-gray-500">Joined {group.joinedDate}</span>
                              </div>
                              <CardTitle className="text-lg">{group.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{group.meetingTime}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Created Topics */}
                  <TabsContent value="my-topics" className="space-y-4 mt-6">
                    {myCreatedTopics.length === 0 ? (
                      <Card className="bg-gray-50">
                        <CardContent className="p-12 text-center">
                          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg mb-2 text-gray-900">No Topics Created Yet</h3>
                          <p className="text-gray-600 mb-4">Share your experiences and start a conversation</p>
                          <Button onClick={() => setNewTopicModal(true)}>
                            Create New Topic
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {myCreatedTopics.map((topic) => (
                          <Card key={topic.id}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-lg mb-2 text-gray-900">{topic.title}</h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <Badge variant="secondary">{topic.category}</Badge>
                                    <span>Created {topic.createdDate}</span>
                                  </div>
                                  <p className="text-gray-700 line-clamp-2">{topic.content}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{topic.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Heart className="w-4 h-4" />
                                  <span>{topic.likes} likes</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Scheduled Chats */}
                  <TabsContent value="scheduled-chats" className="space-y-4 mt-6">
                    {myScheduledChats.length === 0 ? (
                      <Card className="bg-gray-50">
                        <CardContent className="p-12 text-center">
                          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg mb-2 text-gray-900">No Chats Scheduled</h3>
                          <p className="text-gray-600 mb-4">Connect one-on-one with a peer counselor</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {myScheduledChats.map((chat) => (
                          <Card key={chat.id}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-lg mb-1 text-gray-900">Chat with {chat.counselor}</h3>
                                  <Badge variant="outline" className="text-green-600 border-green-600">{chat.status}</Badge>
                                </div>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{chat.date} at {chat.time}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MessageCircle className="w-4 h-4 mt-0.5" />
                                  <span>{chat.topic}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Registered Events */}
                  <TabsContent value="registered-events" className="space-y-4 mt-6">
                    {myRegisteredEvents.length === 0 ? (
                      <Card className="bg-gray-50">
                        <CardContent className="p-12 text-center">
                          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg mb-2 text-gray-900">No Events Registered</h3>
                          <p className="text-gray-600 mb-4">Attend workshops and activities to support your wellbeing</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {myRegisteredEvents.map((event) => {
                          const dateParts = event.date.split(' ');
                          const day = dateParts[1] ? dateParts[1].replace(',', '') : '';
                          const month = dateParts[0] || '';
                          
                          return (
                            <Card key={event.id}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                                    <div className="text-xl">{day}</div>
                                    <div className="text-xs uppercase">{month}</div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg mb-2 text-gray-900">{event.title}</h3>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {event.time}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {event.location}
                                      </span>
                                      <Badge variant="outline">{event.type}</Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  {/* Event Proposals */}
                  <TabsContent value="proposals" className="space-y-4 mt-6">
                    {myEventProposals.length === 0 ? (
                      <Card className="bg-gray-50">
                        <CardContent className="p-12 text-center">
                          <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg mb-2 text-gray-900">No Proposals Submitted</h3>
                          <p className="text-gray-600 mb-4">Have an idea for a mental health event? Share it with us!</p>
                          <Button onClick={() => setEventProposalModal(true)}>
                            Submit Proposal
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {myEventProposals.map((proposal) => (
                          <Card key={proposal.id}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg mb-2 text-gray-900">{proposal.title}</h3>
                                  <p className="text-sm text-gray-600">{proposal.orgName}</p>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={proposal.status === 'Approved' ? 'text-green-600 border-green-600' : 'text-amber-600 border-amber-600'}
                                >
                                  {proposal.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Proposed Date: {proposal.date}</span>
                                <span>•</span>
                                <span>Submitted: {proposal.submittedDate}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Join Group Modal */}
      <Dialog open={joinGroupModal !== null} onOpenChange={() => setJoinGroupModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Support Group</DialogTitle>
            <DialogDescription>
              Confirm your registration to join this support group.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={joinGroupForm.name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={joinGroupForm.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Joining (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Why do you want to join this group?"
                value={joinGroupForm.reason}
                onChange={(e) => setJoinGroupForm({ ...joinGroupForm, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinGroupModal(null)}>Cancel</Button>
            <Button onClick={handleJoinGroup}>Join Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Topic Modal */}
      <Dialog open={newTopicModal} onOpenChange={() => setNewTopicModal(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Forum Topic</DialogTitle>
            <DialogDescription>
              Start a new discussion in the community forum.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Topic title"
                value={newTopicForm.title}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category"
                value={newTopicForm.category}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your topic here..."
                value={newTopicForm.content}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, content: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTopicModal(false)}>Cancel</Button>
            <Button onClick={handleCreateTopic}>Post Topic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Chat Modal */}
      <Dialog open={scheduleChatModal !== null} onOpenChange={() => setScheduleChatModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Chat with Peer Counselor</DialogTitle>
            <DialogDescription>
              Schedule a chat with {scheduleChatModal?.name || 'peer counselor'}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={scheduleChatForm.name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={scheduleChatForm.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={scheduleChatForm.date}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={scheduleChatForm.time}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic (Optional)</Label>
              <Textarea
                id="topic"
                placeholder="What would you like to discuss?"
                value={scheduleChatForm.topic}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, topic: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleChatModal(null)}>Cancel</Button>
            <Button onClick={handleScheduleChat}>Schedule Chat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Register Event Modal */}
      <Dialog open={registerEventModal !== null} onOpenChange={() => setRegisterEventModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              Confirm your registration for this event.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={registerEventForm.name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={registerEventForm.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietary">Dietary Restrictions (Optional)</Label>
              <Input
                id="dietary"
                placeholder="Any dietary restrictions?"
                value={registerEventForm.dietary}
                onChange={(e) => setRegisterEventForm({ ...registerEventForm, dietary: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegisterEventModal(null)}>Cancel</Button>
            <Button onClick={handleRegisterEvent}>Register</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Proposal Modal */}
      <Dialog open={eventProposalModal} onOpenChange={() => setEventProposalModal(false)}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Event Proposal</DialogTitle>
            <DialogDescription>
              Propose a new mental health event or workshop for the community.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                id="eventTitle"
                placeholder="Event title"
                value={eventProposalForm.title}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="Name of your organization"
                value={eventProposalForm.orgName}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, orgName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input value={eventProposalForm.contactEmail} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposedDate">Proposed Date</Label>
              <Input
                id="proposedDate"
                type="date"
                value={eventProposalForm.date}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event..."
                value={eventProposalForm.description}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, description: e.target.value })}
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedAttendees">Expected Attendees</Label>
              <Input
                id="expectedAttendees"
                placeholder="Estimated number of attendees"
                value={eventProposalForm.expectedAttendees}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, expectedAttendees: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventProposalModal(false)}>Cancel</Button>
            <Button onClick={handleSubmitProposal}>Submit Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModal !== null} onOpenChange={() => setSuccessModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <DialogTitle>Success!</DialogTitle>
            </div>
            <DialogDescription>
              {successModal?.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSuccessModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
