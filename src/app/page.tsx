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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Simple background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Neha.png')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-20">
        {particlePositions.map((position, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full opacity-25 animate-pulse"
            style={{
              left: position.left,
              top: position.top,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-30 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="animate-spin">
              <Sparkles className="text-pink-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
              <span className="relative">
                Love 
                <span className="inline-block mx-2 animate-bounce">
                  ✨
                </span>
                Language
              </span>
            </h1>
            <div className="animate-pulse">
              <Heart className="text-rose-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
            </div>
          </div>
          <p className="text-gray-200 text-lg md:text-xl font-light tracking-wide">
            Premium Hair & Beauty Products
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            All things Fashion and Beauty Coming Soon!
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto">
            Get ready to transform your beauty routine with our exclusive collection of premium products.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-pink-100 hover:scale-105 transition-transform duration-200"
              >
                <div className="text-2xl md:text-4xl font-bold text-pink-600 mb-1">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 text-xs md:text-sm font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="w-full max-w-md mb-8">
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email for early access"
              className="flex-1 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/90 backdrop-blur-sm disabled:opacity-50"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-3 h-3" />
                  Notify
                </>
              )}
            </button>
          </form>
          
          {message && (
            <div
              className={`mt-3 p-2 text-sm rounded-lg text-center transition-all duration-300 ${
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
        <div className="flex gap-4">
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
                className={`${social.color} hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110`}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Floating Stars */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            { left: '20%', top: '25%' },
            { left: '45%', top: '35%' },
            { left: '70%', top: '20%' }
          ].map((position, starIndex) => (
            <div
              key={starIndex}
              className="absolute animate-bounce"
              style={{
                left: position.left,
                top: position.top,
                animationDelay: `${starIndex}s`,
                animationDuration: `${3 + starIndex}s`
              }}
            >
              <Star className="text-yellow-200 w-3 h-3 opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
