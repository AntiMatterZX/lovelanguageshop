'use client';

import { useState } from 'react';
import { Sparkles, Heart, Star, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Seasons:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        @keyframes bounceText {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bounce-text {
          animation: bounceText 2s ease-in-out infinite;
        }
        
        .bounce-delay-1 {
          animation-delay: 0.2s;
        }
        
        .bounce-delay-2 {
          animation-delay: 0.4s;
        }
      `}</style>
      <div className="min-h-screen overflow-hidden relative" style={{ fontFamily: 'Seasons, serif' }}>
        {/* Background image without overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Neha .png')`,
          }}
        />

        {/* Animated background particles */}
        <div className="absolute inset-0 z-20">
          {particlePositions.map((position, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-25 animate-pulse"
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wide text-white leading-tight" style={{ fontFamily: 'Seasons, serif' }}>
              Love Language
            </h1>
          </div>

          {/* Description */}
          <div className="mb-8 sm:mb-10">
            <div className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wide max-w-lg mx-auto px-4 space-y-2" style={{ fontFamily: 'Seasons, serif' }}>
              <p>Love is in the hair</p>
              <p>Love is in the skin</p>
              <p>Love is in the clothes</p>
            </div>
          </div>

          {/* Coming Soon with Bouncing Animation */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-pink-400 tracking-wider flex items-center justify-center gap-1" style={{ fontFamily: 'Seasons, serif' }}>
              <span>Coming soon</span>
              <span className="bounce-text">.</span>
              <span className="bounce-text bounce-delay-1">.</span>
              <span className="bounce-text bounce-delay-2">.</span>
            </h2>
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
                style={{ fontFamily: 'Seasons, serif' }}
                disabled={isLoading}
              />
              <button
                onClick={handleSubscribe}
                disabled={isLoading || !email}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm sm:text-base rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                style={{ fontFamily: 'Seasons, serif' }}
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
                style={{ fontFamily: 'Seasons, serif' }}
              >
                {messageType === 'success' ? '✨' : '⚠️'} {message}
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3 sm:gap-4">
            {[
              { icon: Instagram, href: '#', color: 'text-white hover:text-pink-300' },
              { icon: Facebook, href: '#', color: 'text-white hover:text-blue-300' },
              { icon: Twitter, href: '#', color: 'text-white hover:text-blue-200' },
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
              <Sparkles className="text-white w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg opacity-70" />
            </div>
          </div>

          <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
            <div className="animate-pulse">
              <Heart className="text-white w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg opacity-70" />
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
                  <Star className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
