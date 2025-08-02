import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Video, CheckCircle, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BookDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    useCase: '',
    message: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Available dates (next 2 weeks)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Team size options
  const teamSizes = [
    '1-5 people', '6-10 people', '11-25 people', '26-50 people', '50+ people'
  ];

  // Use case options
  const useCases = [
    'Mind Mapping & Brainstorming',
    'Presentation Creation',
    'Strategic Planning',
    'Team Collaboration',
    'Project Management',
    'Client Presentations',
    'Research & Analysis',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedDate && selectedTime) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.firstName && formData.lastName && formData.email) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setIsBooked(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Demo Scheduled Successfully!</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                We've sent a confirmation email with calendar invites and meeting details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Attendee:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our team will prepare a personalized demo based on your needs. 
                  You'll receive a meeting link 15 minutes before your scheduled time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                  <Button onClick={() => window.location.reload()}>
                    Schedule Another Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <img 
                src="/nov8black.png" 
                alt="NOV8 Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">Book a Demo</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Schedule Your Personalized Demo
                </CardTitle>
                <CardDescription>
                  Choose a time that works for you and we'll show you how NOV8 can transform your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Step 1: Date & Time Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Step 1: Select Date & Time
                      </Label>
                      
                      {/* Date Selection */}
                      <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Available Dates
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {availableDates.map((date) => (
                            <button
                              key={date}
                              onClick={() => handleDateSelect(date)}
                              className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                                selectedDate === date
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {new Date(date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                weekday: 'short'
                              })}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">
                            Available Times for {formatDate(selectedDate)}
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                                  selectedTime === time
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDate && selectedTime && (
                        <div className="mt-6">
                          <Button onClick={handleNextStep} className="w-full">
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Step 2: Contact Information
                      </Label>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="mt-1"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="mt-1"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1"
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="mt-1"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="mt-1"
                          placeholder="Enter your company name"
                        />
                      </div>

                      {formData.firstName && formData.lastName && formData.email && (
                        <div className="mt-6">
                          <Button onClick={handleNextStep} className="w-full">
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Step 3: Additional Information
                      </Label>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="teamSize" className="text-sm font-medium text-gray-700">
                            Team Size
                          </Label>
                          <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamSizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="useCase" className="text-sm font-medium text-gray-700">
                            Primary Use Case
                          </Label>
                          <Select value={formData.useCase} onValueChange={(value) => handleInputChange('useCase', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select use case" />
                            </SelectTrigger>
                            <SelectContent>
                              {useCases.map((useCase) => (
                                <SelectItem key={useCase} value={useCase}>
                                  {useCase}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Additional Notes (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="mt-1"
                          placeholder="Tell us about your specific needs or questions..."
                          rows={4}
                        />
                      </div>

                      <div className="mt-6">
                        <Button 
                          onClick={handleSubmit} 
                          className="w-full"
                          disabled={isBooking}
                        >
                          {isBooking ? 'Scheduling Demo...' : 'Schedule Demo'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Process & Info */}
          <div className="space-y-6">
            {/* What to Expect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span>What to Expect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Personalized Demo</h4>
                      <p className="text-sm text-gray-600">We'll tailor the demo to your specific needs and use cases.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Live Q&A</h4>
                      <p className="text-sm text-gray-600">Ask questions and see how NOV8 fits your workflow.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Next Steps</h4>
                      <p className="text-sm text-gray-600">Get a trial account and implementation guidance.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>Demo Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">30-45 minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">1-on-1 session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Video className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Video call (Zoom/Teams)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">demo@nov8.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Available worldwide</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo; 