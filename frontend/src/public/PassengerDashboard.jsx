import React, { useState } from 'react';
import { MapPin, Clock, Wifi, CreditCard, RefreshCw, Calendar, User, Edit, Trash2, X } from 'lucide-react';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';

const PassengerDashboard: React.FC = () => {
  const { buses, bookings, bookTicket, requestRefund, updateBooking, cancelBooking } = useBus();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('routes');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditBookingForm, setShowEditBookingForm] = useState(false);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [travelDate, setTravelDate] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [editBookingForm, setEditBookingForm] = useState({
    travelDate: '',
    seatNumber: ''
  });

  const userBookings = bookings.filter(booking => booking.passengerId === user?.id);

  const handleBookTicket = (bus: any) => {
    setSelectedBus(bus);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBus && user && travelDate && seatNumber) {
      bookTicket({
        busId: selectedBus.id,
        passengerId: user.id,
        passengerName: user.name,
        busName: selectedBus.name,
        route: selectedBus.route,
        seatNumber: parseInt(seatNumber),
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: travelDate,
        amount: selectedBus.price,
        status: 'confirmed'
      });
      setShowBookingForm(false);
      setSelectedBus(null);
      setTravelDate('');
      setSeatNumber('');
    }
  };

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setEditBookingForm({
      travelDate: booking.travelDate,
      seatNumber: booking.seatNumber.toString()
    });
    setShowEditBookingForm(true);
  };

  const handleUpdateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBooking) {
      updateBooking(editingBooking.id, {
        travelDate: editBookingForm.travelDate,
        seatNumber: parseInt(editBookingForm.seatNumber)
      });
      setShowEditBookingForm(false);
      setEditingBooking(null);
    }
  };

  const handleRequestRefund = (bookingId: string) => {
    requestRefund(bookingId);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refund-requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'routes', name: 'Available Routes' },
    { id: 'bookings', name: 'My Bookings' },
    { id: 'profile', name: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Passenger Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${userBookings.reduce((sum, booking) => sum + booking.amount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <RefreshCw className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Trips</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Routes Tab */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Available Routes</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((bus) => (
                  <div key={bus.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{bus.name}</h3>
                      <p className="text-blue-600 font-medium">{bus.route}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{bus.departure} - {bus.arrival}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{bus.availableSeats} seats available</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {bus.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center space-x-1"
                        >
                          {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${bus.price}</span>
                      </div>
                      <button
                        onClick={() => handleBookTicket(bus)}
                        disabled={bus.availableSeats === 0}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {bus.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bus & Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travel Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.busName}</div>
                        <div className="text-sm text-gray-500">{booking.route}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.travelDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.seatNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleRequestRefund(booking.id)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Request Refund
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            </div>
            <div className="p-6">
              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingForm && selectedBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Book Ticket</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">{selectedBus.name}</h4>
                <p className="text-blue-700">{selectedBus.route}</p>
                <p className="text-blue-600 text-sm">{selectedBus.departure} - {selectedBus.arrival}</p>
                <p className="text-blue-900 font-bold text-lg">${selectedBus.price}</p>
              </div>
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seat Number
                  </label>
                  <input
                    type="number"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    min="1"
                    max={selectedBus.totalSeats}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Choose seat (1-${selectedBus.totalSeats})`}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Booking Modal */}
        {showEditBookingForm && editingBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Booking</h3>
                <button
                  onClick={() => setShowEditBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleUpdateBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={editBookingForm.travelDate}
                    onChange={(e) => setEditBookingForm({ ...editBookingForm, travelDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seat Number
                  </label>
                  <input
                    type="number"
                    value={editBookingForm.seatNumber}
                    onChange={(e) => setEditBookingForm({ ...editBookingForm, seatNumber: e.target.value })}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Update Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerDashboard;