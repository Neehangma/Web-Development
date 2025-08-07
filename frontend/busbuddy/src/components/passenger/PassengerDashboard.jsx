import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bus, Calendar, Clock, MapPin, LogOut, Plus, Trash2, User, CreditCard } from 'lucide-react';
import Layout from '../layout/Layout';
import PaymentModal from './PaymentModal';

const PassengerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('book');
  const [routes, setRoutes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/passenger/login');
      return;
    }
    loadData();
    // eslint-disable-next-line
  }, [user]);

  const loadData = () => {
    // Load routes
    const savedRoutes = localStorage.getItem('routes');
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes));
    }

    // Load bookings for current user
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      const userBookings = allBookings.filter((booking) =>
        booking.passengerId === user?.id
      );
      setBookings(userBookings);
    }

    // Load refunds for current user
    const savedRefunds = localStorage.getItem('refunds');
    if (savedRefunds) {
      const allRefunds = JSON.parse(savedRefunds);
      const userRefunds = allRefunds.filter((refund) =>
        refund.passengerId === user?.id
      );
      setRefunds(userRefunds);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBookTicket = (bookingData) => {
    setPendingBooking(bookingData);
    setShowBookingForm(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    if (!selectedRoute || !user || !pendingBooking) return;

    const newBooking = {
      ...pendingBooking,
      id: `booking-${Date.now()}`,
      passengerId: user.id,
      routeId: selectedRoute.id,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      route: selectedRoute,
    };

    // Save to localStorage
    const savedBookings = localStorage.getItem('bookings');
    const allBookings = savedBookings ? JSON.parse(savedBookings) : [];
    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Update local state
    setBookings((prev) => [...prev, newBooking]);
    setShowPaymentModal(false);
    setSelectedRoute(null);
    setPendingBooking(null);
    setActiveTab('bookings');
  };

  // Cancel booking without refund (optional, use only if you want a "Cancel" button as well)
  const handleCancelBooking = (bookingId) => {
    // Update booking status
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      const updatedBookings = allBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      );
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
    }
  };

  // Request refund: cancels booking + creates refund record
  const handleRequestRefund = (booking) => {
    // Mark booking as cancelled
    handleCancelBooking(booking.id);

    // Create refund request
    const newRefund = {
      id: `refund-${Date.now()}`,
      bookingId: booking.id,
      passengerId: booking.passengerId,
      passengerName: booking.passengerName,
      route: booking.route,
      amount: booking.route.price,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const savedRefunds = localStorage.getItem('refunds');
    const allRefunds = savedRefunds ? JSON.parse(savedRefunds) : [];
    const updatedRefunds = [...allRefunds, newRefund];
    localStorage.setItem('refunds', JSON.stringify(updatedRefunds));

    // Update local state only for current user
    setRefunds((prev) => [...prev, newRefund]);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bus className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                  <p className="text-gray-600">Manage your bookings and travel plans</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-1" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'book', label: 'Book Ticket', icon: Plus },
                { id: 'bookings', label: 'My Bookings', icon: Calendar },
                { id: 'refunds', label: 'Refunds', icon: CreditCard },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Book Ticket Tab */}
          {activeTab === 'book' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Routes</h2>
              {routes.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No routes available at the moment</p>
                  <p className="text-gray-400 text-sm mt-2">Please check back later or contact admin</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {routes.map((route) => (
                    <div key={route.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-1" />
                          <span className="font-medium">{route.from}</span>
                          <span className="mx-2">→</span>
                          <span className="font-medium">{route.to}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Duration: {route.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span>Distance: {route.distance} km</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{route.price}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedRoute(route);
                            setShowBookingForm(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
              {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No bookings found</p>
                  <p className="text-gray-400 text-sm mt-2">Book your first ticket to see it here</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Book a Ticket
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="font-medium text-lg">
                              {booking.route.from} → {booking.route.to}
                            </span>
                            <span
                              className={`ml-4 px-2 py-1 text-xs font-semibold rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Passenger:</span><br />
                              {booking.passengerName}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span><br />
                              {booking.passengerPhone}
                            </div>
                            <div>
                              <span className="font-medium">Seat:</span><br />
                              {booking.seatNumber}
                            </div>
                            <div>
                              <span className="font-medium">Travel Date:</span><br />
                              {new Date(booking.travelDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">
                              Rs.{booking.route.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {/* Only show refund button if booking is confirmed */}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleRequestRefund(booking)}
                            className="ml-4 text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                            title="Request Refund"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="ml-2 text-xs">Request Refund</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Refunds Tab */}
          {activeTab === 'refunds' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Refund Requests</h2>
              {refunds.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No refund requests found</p>
                  <p className="text-gray-400 text-sm mt-2">Request a refund from your bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {refunds.map((refund) => (
                    <div key={refund.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-lg">
                            {refund.route.from} → {refund.route.to}
                          </div>
                          <div className="text-sm text-gray-600">
                            Amount: <span className="font-bold text-green-600">₹{refund.amount}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Requested on: {new Date(refund.requestedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            refund.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : refund.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {refund.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && selectedRoute && (
          <BookingFormModal
            route={selectedRoute}
            onSubmit={handleBookTicket}
            onClose={() => {
              setShowBookingForm(false);
              setSelectedRoute(null);
            }}
          />
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedRoute && pendingBooking && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedRoute(null);
              setPendingBooking(null);
            }}
            onPaymentSuccess={handlePaymentSuccess}
            amount={selectedRoute.price}
            bookingDetails={{
              from: selectedRoute.from,
              to: selectedRoute.to,
              passengerName: pendingBooking.passengerName,
              seatNumber: pendingBooking.seatNumber,
              travelDate: pendingBooking.travelDate,
            }}
          />
        )}
      </div>
    </Layout>
  );
};

// BookingFormModal as you had
const BookingFormModal = ({ route, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerPhone: '',
    seatNumber: '',
    travelDate: '',
    routeId: route.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate seat options
  const seatOptions = Array.from({ length: 40 }, (_, i) => `${i + 1}`);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Book Ticket: {route.from} → {route.to}
        </h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="text-sm text-green-800">
            <p><strong>Route:</strong> {route.from} to {route.to}</p>
            <p><strong>Duration:</strong> {route.duration}</p>
            <p><strong>Price:</strong> ₹{route.price}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passenger Name
            </label>
            <input
              type="text"
              name="passengerName"
              value={formData.passengerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="passengerPhone"
              value={formData.passengerPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Seat Number
            </label>
            <select
              name="seatNumber"
              value={formData.seatNumber}
              onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a seat</option>
              {seatOptions.map((seat) => (
                <option key={seat} value={seat}>Seat {seat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date
            </label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Book Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingFormModal.propTypes = {
  route: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PassengerDashboard;
