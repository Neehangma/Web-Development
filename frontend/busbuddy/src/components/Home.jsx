
import React from 'react';
import { Bus, Users, Shield, Clock } from 'lucide-react';
import Layout from './layout/Layout';
import busbuddyBg from '../assets/images/busbuddy.jpg';

const Home = () => {
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Blurred Background Image */}
        <img
          src={busbuddyBg}
          alt="Home Background"
          className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105 opacity-80 -z-10"
        />
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/70 -z-10" />
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white mb-16">
            <div className="flex justify-center mb-6">
              <Bus className="h-20 w-20 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to BusBuddy
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your trusted partner for comfortable and reliable bus travel. Book tickets online with ease and travel with confidence.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center text-white">
              <Bus className="h-12 w-12 text-cyan-400 bg-cyan-900/30 rounded-full p-2 mx-auto mb-4 shadow-lg" />
              <h4 className="text-xl font-semibold mb-2">Easy Booking</h4>
              <p className="text-gray-300">
                Simple and intuitive interface for quick ticket booking and management.
              </p>
            </div>
            <div className="text-center text-white">
              <Clock className="h-12 w-12 text-emerald-400 bg-emerald-900/30 rounded-full p-2 mx-auto mb-4 shadow-lg" />
              <h4 className="text-xl font-semibold mb-2">Real-time Updates</h4>
              <p className="text-gray-300">
                Get instant updates on your bookings and travel schedules.
              </p>
            </div>
            <div className="text-center text-white">
              <Shield className="h-12 w-12 text-fuchsia-400 bg-fuchsia-900/30 rounded-full p-2 mx-auto mb-4 shadow-lg" />
              <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
              <p className="text-gray-300">
                Your data and transactions are protected with advanced security measures.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Routes Section */}
        <div className="bg-gray-900 py-20 relative overflow-hidden border-t-4 border-blue-700 shadow-[0_0_60px_0_rgba(59,130,246,0.15)]">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{background: 'radial-gradient(circle at 70% 30%, #2563eb 0%, transparent 70%)'}} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">Popular Routes</h2>
              <p className="text-blue-200 text-lg">Discover our most traveled destinations</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                { from: 'Kathmandu', to: 'Pokhara', price: 'Rs.1600', duration: '9h 30m' },
                { from: 'Chitwan', to: 'Dharan', price: 'Rs.1300', duration: '4h 15m' },
                { from: 'Biratnagar', to: 'Kathmandu', price: 'Rs.1800', duration: '12h 45m' }
              ].map((route, index) => (
                <div key={index} className="backdrop-blur-md bg-blue-900/40 border border-blue-700/60 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-semibold text-white text-lg tracking-wide drop-shadow">{route.from}</span>
                    <span className="text-blue-300 text-3xl font-bold mx-2">→</span>
                    <span className="font-semibold text-white text-lg tracking-wide drop-shadow">{route.to}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-blue-700/90 text-white font-semibold text-base px-4 py-1 rounded-full shadow-md border border-blue-400 hover:bg-blue-600 hover:scale-110 transition-all duration-200 cursor-pointer mr-2">
                      {route.price}
                    </span>
                    <span className="inline-block bg-blue-800/90 text-white font-semibold text-base px-4 py-1 rounded-full shadow-md border border-blue-400 hover:bg-blue-700 hover:scale-110 transition-all duration-200 cursor-pointer">
                      {route.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-gray-900 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">Why Choose BusBuddy?</h2>
              <p className="text-blue-200 text-lg">Experience the difference with our premium services</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Shield, title: 'Safe & Secure', desc: 'Advanced security for all transactions', color: 'bg-blue-700/80 text-blue-200' },
                { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer assistance', color: 'bg-cyan-700/80 text-cyan-200' },
                { icon: Users, title: 'Trusted by Millions', desc: 'Over 1M+ satisfied customers', color: 'bg-indigo-700/80 text-indigo-200' },
                { icon: Bus, title: 'Modern Fleet', desc: 'Well-maintained, comfortable buses', color: 'bg-fuchsia-700/80 text-fuchsia-200' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center backdrop-blur-md bg-white/10 border border-blue-700/30 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-blue-400/30 transition-all duration-200">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${feature.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 drop-shadow">{feature.title}</h4>
                    <p className="text-blue-100">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;