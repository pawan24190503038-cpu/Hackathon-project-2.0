import { Link } from 'react-router';
import { Brain, Users, ClipboardList, Phone, BookOpen, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Mental Health Resources',
      description: 'Access articles, guides, and coping strategies for various mental health concerns.',
      link: '/resources',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ClipboardList,
      title: 'Self-Assessment Tools',
      description: 'Take confidential assessments to better understand your mental health.',
      link: '/assessment',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Support Community',
      description: 'Connect with peers who understand and share similar experiences.',
      link: '/community',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Phone,
      title: 'Crisis Support',
      description: 'Get immediate help if you\'re in crisis. Available 24/7.',
      link: '/crisis',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4" />
                <span className="text-sm">You're Not Alone</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
                Your Mental Health Matters
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                A safe space for students to access mental health resources, connect with support communities, and prioritize their wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link to="/assessment">Take Self-Assessment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources">Explore Resources</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwdGhlcmFweSUyMGNvdW5zZWxpbmd8ZW58MXx8fHwxNzc0NjM2MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mental health support and counseling"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">How We Can Help</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive suite of tools and resources designed specifically for students.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">1 in 3</div>
              <div className="text-purple-100">College students experience significant anxiety</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">73%</div>
              <div className="text-purple-100">Report mental health crisis while in college</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">24/7</div>
              <div className="text-purple-100">Crisis support available when you need it</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdXBwb3J0JTIwZ3JvdXB8ZW58MXx8fHwxNzc0NjM1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students supporting each other"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">Why MindSpace?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Confidential & Anonymous</h3>
                  <p className="text-gray-600">Your privacy is our priority. Use our tools anonymously without judgment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Peer Support Community</h3>
                  <p className="text-gray-600">Connect with students who understand what you're going through.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Evidence-Based Resources</h3>
                  <p className="text-gray-600">Access professionally curated mental health information and strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Ready to Take the First Step?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're struggling or just want to learn more about mental health, we're here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/assessment">Start Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}