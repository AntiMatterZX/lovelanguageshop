'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

// Import your local image
import nehaImage from './Neha.png'; // Adjust path as needed

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
  const [isMobile, setIsMobile] = useState(false);
  
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
    // Check for mobile devices
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
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

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkIfMobile);
    };
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
      
      // Store in localStorage
      const subscribers = JSON.parse(localStorage.getItem('love-language-subscribers') || '[]');
      subscribers.push({
        email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('love-language-subscribers', JSON.stringify(subscribers));
      
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
    <div className="h-screen overflow-hidden relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${nehaImage.src})`,
            // Adjust background position for different devices
            backgroundPosition: isMobile ? 'top center' : 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full opacity-25"
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: position.left,
              top: position.top,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="inline-flex items-center gap-3 mb-2"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <Sparkles className="text-pink-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
            </motion.div>
            <motion.h1 
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent"
            >
              <span className="relative">
                Love 
                <motion.span 
                  className="inline-block mx-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ✨
                </motion.span>
                Language
              </span>
            </motion.h1>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <Heart className="text-rose-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-200 text-lg md:text-xl font-light tracking-wide"
          >
            Premium Hair & Beauty Products
          </motion.p>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            All things Fashion and Beauty Coming Soon!
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto">
            Get ready to transform your beauty routine with our exclusive collection of premium products.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-pink-100"
              >
                <motion.div
                  key={item.value}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-4xl font-bold text-pink-600 mb-1"
                >
                  {item.value.toString().padStart(2, '0')}
                </motion.div>
                <div className="text-gray-600 text-xs md:text-sm font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="w-full max-w-md mb-8"
        >
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
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </motion.button>
          </form>
          
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 p-2 text-sm rounded-lg text-center ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {messageType === 'success' ? '✨' : '⚠️'} {message}
            </motion.div>
          )}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex gap-4"
        >
          {[
            { icon: Instagram, href: '#', color: 'text-pink-300' },
            { icon: Facebook, href: '#', color: 'text-blue-300' },
            { icon: Twitter, href: '#', color: 'text-blue-200' },
          ].map((social, socialIndex) => (
            <motion.a
              key={socialIndex}
              href={social.href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`${social.color} hover:bg-white/20 p-2 rounded-full transition-all duration-300`}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Floating Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: '20%', top: '25%' },
            { left: '45%', top: '35%' },
            { left: '70%', top: '20%' }
          ].map((position, starIndex) => (
            <motion.div
              key={starIndex}
              className="absolute"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3 + starIndex,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: position.left,
                top: position.top,
              }}
            >
              <Star className="text-yellow-200 w-3 h-3 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
