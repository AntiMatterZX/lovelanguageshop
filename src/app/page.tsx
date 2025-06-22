'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Heart, Star, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  // Hardcoded launch date - 30 days from now
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);

  // Predefined positions for background particles
  const particlePositions = [
    { left: '10%', top: '20%' },
    { left: '25%', top: '15%' },
    { left: '40%', top: '25%' },
    { left: '60%', top: '10%' },
    { left: '75%', top: '30%' },
    { left: '85%', top: '20%' },
    { left: '15%', top: '50%' },
    { left: '35%', top: '45%' },
    { left: '55%', top: '55%' },
    { left: '70%', top: '40%' },
    { left: '90%', top: '60%' },
    { left: '20%', top: '75%' },
    { left: '45%', top: '80%' },
    { left: '65%', top: '70%' },
    { left: '80%', top: '85%' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubscribe = async () => {
    if (!email) return;

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Thank you! You\'ll be notified when we launch! ✨');
      setMessageType('success');
      setEmail('');
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

    } catch {
      setMessage('Network error. Please try again.');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Simple background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900"
        style={{
          backgroundImage: `url('/Neha .png')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 z-20">
        {particlePositions.map((position, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-300 rounded-full opacity-25 animate-pulse"
            style={{
              left: position.left,
              top: position.top,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-30 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center text-center">
        
        {/* Main Brand Title */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wide bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 bg-clip-text text-transparent leading-tight">
            Love Language
          </h1>
        </div>

        {/* Coming Soon Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-wider">
            Coming soon
          </h2>
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-10">
          <p className="text-gray-200 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mx-auto px-4">
            Premium Hair & Beauty Products - Get ready to transform your beauty routine with our exclusive collection
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-lg mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-lg border border-pink-100 hover:scale-105 transition-transform duration-200"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-pink-600 mb-1">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="w-full max-w-sm sm:max-w-md mb-6 sm:mb-8 px-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter email for early access"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-500 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/90 backdrop-blur-sm disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              onClick={handleSubscribe}
              disabled={isLoading || !email}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm sm:text-base rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Notify Me
                </>
              )}
            </button>
          </div>
          
          {message && (
            <div
              className={`mt-3 p-3 text-sm rounded-lg text-center transition-all duration-300 ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {messageType === 'success' ? '✨' : '⚠️'} {message}
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="flex gap-3 sm:gap-4">
          {[
            { icon: Instagram, href: '#', color: 'text-pink-300 hover:text-pink-200' },
            { icon: Facebook, href: '#', color: 'text-blue-300 hover:text-blue-200' },
            { icon: Twitter, href: '#', color: 'text-blue-200 hover:text-blue-100' },
          ].map((social, socialIndex) => {
            const IconComponent = social.icon;
            return (
              <a
                key={socialIndex}
                href={social.href}
                className={`${social.color} hover:bg-white/20 p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110`}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <div className="animate-spin" style={{ animationDuration: '8s' }}>
            <Sparkles className="text-pink-400 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg opacity-70" />
          </div>
        </div>

        <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
          <div className="animate-pulse">
            <Heart className="text-rose-400 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg opacity-70" />
          </div>
        </div>

        {/* Floating Stars with slower rotation */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            { left: '15%', top: '25%' },
            { left: '85%', top: '35%' },
            { left: '25%', top: '65%' },
            { left: '75%', top: '75%' }
          ].map((position, starIndex) => (
            <div
              key={starIndex}
              className="absolute animate-bounce opacity-40"
              style={{
                left: position.left,
                top: position.top,
                animationDelay: `${starIndex * 0.5}s`,
                animationDuration: `${4 + starIndex}s`
              }}
            >
              <div 
                className="animate-spin"
                style={{ animationDuration: `${12 + starIndex * 2}s` }}
              >
                <Star className="text-yellow-200 w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
