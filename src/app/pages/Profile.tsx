import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { useNavigate } from 'react-router';
import { User, Mail, Calendar, Edit2, Save, X, Shield, Eye, EyeOff, LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Profile() {
  const { user, updateProfile, toggleAnonymousMode, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    pronouns: user?.pronouns || '',
  });

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || '',
      pronouns: user.pronouns || '',
    });
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">My Profile</h1>
            <p className="text-xl text-purple-100">
              Manage your account settings and privacy preferences
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {/* Anonymous Mode Alert */}
        {user.isAnonymous && (
          <Alert className="border-amber-200 bg-amber-50">
            <Shield className="w-4 h-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Anonymous Mode is active.</strong> Your name and personal information are hidden from other users.
              You can still access all features of MindSpace.
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                    {user.isAnonymous ? '?' : user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {user.isAnonymous ? 'Anonymous User' : user.name}
                  </CardTitle>
                  {user.pronouns && !user.isAnonymous && (
                    <p className="text-sm text-gray-600 mt-1">{user.pronouns}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Member since {user.joinedDate}
                    </Badge>
                    {user.isAnonymous && (
                      <Badge variant="outline" className="text-xs text-amber-700 border-amber-300">
                        Anonymous
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pronouns">Pronouns (Optional)</Label>
                  <Input
                    id="pronouns"
                    value={formData.pronouns}
                    onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                    placeholder="e.g., they/them, she/her, he/him"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us a bit about yourself..."
                    className="min-h-24"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{user.isAnonymous ? '••••••@••••••.com' : user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p>{user.joinedDate}</p>
                    </div>
                  </div>

                  {user.bio && !user.isAnonymous && (
                    <div className="flex items-start gap-3 text-gray-700">
                      <User className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Bio</p>
                        <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control how your information is displayed to others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {user.isAnonymous ? (
                    <EyeOff className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-green-600" />
                  )}
                  <h3 className="font-medium">Anonymous Mode</h3>
                </div>
                <p className="text-sm text-gray-600">
                  When enabled, your name and personal information will be hidden from other users. 
                  You'll appear as "Anonymous User" in all community interactions. You can still access 
                  all features including support groups, forums, and events.
                </p>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>What's hidden:</strong> Name, email, bio, pronouns
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <strong>What's still visible:</strong> Your posts and participation (shown as "Anonymous User")
                  </p>
                </div>
              </div>
              <Switch
                checked={user.isAnonymous}
                onCheckedChange={toggleAnonymousMode}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              If you have questions about your account, privacy settings, or need support, 
              please don't hesitate to reach out.
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
