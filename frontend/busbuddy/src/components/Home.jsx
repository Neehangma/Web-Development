
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
        <div className="absolute inset-0 bg-black/50 -z-10" />
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white mb-16">
            <div className="flex justify-center mb-6">
              <Bus className="h-20 w-20 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to BusBook
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your trusted partner for comfortable and reliable bus travel. Book tickets online with ease and travel with confidence.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center text-white">
              <Bus className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Easy Booking</h4>
              <p className="text-gray-300">
                Simple and intuitive interface for quick ticket booking and management.
              </p>
            </div>
            <div className="text-center text-white">
              <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Real-time Updates</h4>
              <p className="text-gray-300">
                Get instant updates on your bookings and travel schedules.
              </p>
            </div>
            <div className="text-center text-white">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
              <p className="text-gray-300">
                Your data and transactions are protected with advanced security measures.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Routes Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Routes</h2>
              <p className="text-gray-600 text-lg">Discover our most traveled destinations</p>
            </div>
            
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { from: 'Kathmandu', to: 'Pokhara', price: 'Rs.1600', duration: '9h 30m' },
                  { from: 'Chitwan', to: 'Dharan', price: 'Rs.1300', duration: '4h 15m' },
                  { from: 'Biratnagar', to: 'Kathmandu', price: 'Rs.1800', duration: '12h 45m' }
                ].map((route, index) => (
                  <div key={index} className="bg-primary-light/30 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-primary-dark">{route.from}</span>
                      <span className="text-accent">→</span>
                      <span className="font-semibold text-primary-dark">{route.to}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-accent font-bold text-lg">{route.price}</span>
                      <span className="text-primary text-sm">{route.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BusBook?</h2>
              <p className="text-gray-600 text-lg">Experience the difference with our premium services</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Safe & Secure', desc: 'Advanced security for all transactions' },
                { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer assistance' },
                { icon: Users, title: 'Trusted by Millions', desc: 'Over 1M+ satisfied customers' },
                { icon: Bus, title: 'Modern Fleet', desc: 'Well-maintained, comfortable buses' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
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