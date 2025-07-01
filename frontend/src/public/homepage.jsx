import React from 'react';
import { MapPin, Clock, Shield, Wifi, CreditCard, Headphones } from 'lucide-react';
import { useBus } from '../context/BusContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { buses } = useBus();

  const features = [
    {
      icon: MapPin,
      title: 'Wide Network',
      description: 'Connect to 100+ destinations across the country'
    },
    {
      icon: Clock,
      title: 'On-Time Service',
      description: '99% on-time performance with reliable schedules'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'GPS tracking and safety protocols for peace of mind'
    },
    {
      icon: Wifi,
      title: 'Modern Amenities',
      description: 'WiFi, AC, and comfortable seating on all buses'
    },
    {
      icon: CreditCard,
      title: 'Easy Booking',
      description: 'Quick online booking with secure payment options'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for assistance'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Safe, comfortable, and reliable bus transportation nationwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105"
              >
                Book Your Ticket
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BusManager?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of bus travel with our comprehensive management system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Routes
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most traveled destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buses.slice(0, 3).map((bus) => (
              <div
                key={bus.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-48 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{bus.route}</h3>
                    <p className="text-blue-100">{bus.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Departure</p>
                      <p className="font-semibold">{bus.departure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Arrival</p>
                      <p className="font-semibold">{bus.arrival}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600">${bus.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available Seats</p>
                      <p className="font-semibold text-green-600">{bus.availableSeats}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Routes
            </button>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for testimonials */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-600 italic">"Best bus service I've ever used!"</p>
              <p className="mt-4 font-semibold">— John Doe</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-600 italic">"Comfortable and reliable, highly recommend!"</p>
              <p className="mt-4 font-semibold">— Jane Smith</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-600 italic">"Great experience, will travel again!"</p>
              <p className="mt-4 font-semibold">— Alice Johnson</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm mb-4">
            © {new Date().getFullYear()} BusManager. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white">
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;



