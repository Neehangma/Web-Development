import React, { useState } from 'react';
import { Bus, Plus, Trash2, Edit, RefreshCw, DollarSign, Users, BarChart3, User, X } from 'lucide-react';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const {
    buses,
    bookings,
    users,
    addBus,
    deleteBus,
    updateBus,
    processRefund,
    deleteBooking,
    updateBooking,
    addUser,
    updateUser,
    deleteUser
  } = useBus();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [showAddBusForm, setShowAddBusForm] = useState(false);
  const [showEditBusForm, setShowEditBusForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showEditBookingForm, setShowEditBookingForm] = useState(false);

  const [editingBus, setEditingBus] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const [newBus, setNewBus] = useState({
    name: '',
    route: '',
    departure: '',
    arrival: '',
    price: '',
    totalSeats: '',
    amenities: ''
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'passenger',
    password: ''
  });

  const [editBookingForm, setEditBookingForm] = useState({
    passengerName: '',
    seatNumber: '',
    travelDate: '',
    status: 'confirmed'
  });

  const handleAddBus = (e) => {
    e.preventDefault();
    addBus({
      name: newBus.name,
      route: newBus.route,
      departure: newBus.departure,
      arrival: newBus.arrival,
      price: parseFloat(newBus.price),
      totalSeats: parseInt(newBus.totalSeats),
      availableSeats: parseInt(newBus.totalSeats),
      operatorId: user?.id || '',
      amenities: newBus.amenities.split(',').map(a => a.trim())
    });
    setNewBus({
      name: '',
      route: '',
      departure: '',
      arrival: '',
      price: '',
      totalSeats: '',
      amenities: ''
    });
    setShowAddBusForm(false);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setNewBus({
      name: bus.name,
      route: bus.route,
      departure: bus.departure,
      arrival: bus.arrival,
      price: bus.price.toString(),
      totalSeats: bus.totalSeats.toString(),
      amenities: bus.amenities.join(', ')
    });
    setShowEditBusForm(true);
  };

  const handleUpdateBus = (e) => {
    e.preventDefault();
    if (editingBus) {
      updateBus(editingBus.id, {
        name: newBus.name,
        route: newBus.route,
        departure: newBus.departure,
        arrival: newBus.arrival,
        price: parseFloat(newBus.price),
        totalSeats: parseInt(newBus.totalSeats),
        amenities: newBus.amenities.split(',').map(a => a.trim())
      });
      setShowEditBusForm(false);
      setEditingBus(null);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({
      name: '',
      email: '',
      role: 'passenger',
      password: ''
    });
    setShowAddUserForm(false);
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setNewUser({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
      password: userToEdit.password
    });
    setShowEditUserForm(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, newUser);
      setShowEditUserForm(false);
      setEditingUser(null);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setEditBookingForm({
      passengerName: booking.passengerName,
      seatNumber: booking.seatNumber.toString(),
      travelDate: booking.travelDate,
      status: booking.status
    });
    setShowEditBookingForm(true);
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    if (editingBooking) {
      updateBooking(editingBooking.id, {
        passengerName: editBookingForm.passengerName,
        seatNumber: parseInt(editBookingForm.seatNumber),
        travelDate: editBookingForm.travelDate,
        status: editBookingForm.status
      });
      setShowEditBookingForm(false);
      setEditingBooking(null);
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.amount, 0);

  const refundRequests = bookings.filter(b => b.status === 'refund-requested');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'buses', name: 'Bus Management', icon: Bus },
    { id: 'bookings', name: 'Booking Management', icon: RefreshCw },
    { id: 'users', name: 'User Management', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Rest of your big JSX remains UNCHANGED! */}
        {/* Just paste the entire rest of the original JSX here, which is already valid JSX! */}

      </div>
    </div>
  );
};

export default AdminDashboard;
