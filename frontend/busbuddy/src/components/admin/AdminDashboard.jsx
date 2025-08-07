import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bus, Route as RouteIcon, Users, BarChart3, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import Layout from '../layout/Layout';

// Utility: safely get field from booking or fallback
function get(obj, key, fallback = '') {
  if (!obj) return fallback;
  return obj[key] ?? fallback;
}

// Utility: format date robustly
const formatDate = (dt) => dt ? new Date(dt).toLocaleDateString() : '';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showBusForm, setShowBusForm] = useState(false);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedBuses = localStorage.getItem('buses');
    const savedRoutes = localStorage.getItem('routes');
    if (savedBuses) setBuses(JSON.parse(savedBuses));
    if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddBus = (busData) => {
    const newBus = { ...busData, id: `bus-${Date.now()}` };
    const updatedBuses = [...buses, newBus];
    setBuses(updatedBuses);
    localStorage.setItem('buses', JSON.stringify(updatedBuses));
    setShowBusForm(false);
  };

  const handleEditBus = (busData) => {
    if (editingBus) {
      const updatedBuses = buses.map(bus =>
        bus.id === editingBus.id ? { ...busData, id: editingBus.id } : bus
      );
      setBuses(updatedBuses);
      localStorage.setItem('buses', JSON.stringify(updatedBuses));
      setEditingBus(null);
      setShowBusForm(false);
    }
  };

  const handleDeleteBus = (id) => {
    const updatedBuses = buses.filter(bus => bus.id !== id);
    setBuses(updatedBuses);
    localStorage.setItem('buses', JSON.stringify(updatedBuses));
  };

  const handleAddRoute = (routeData) => {
    const newRoute = { ...routeData, id: `route-${Date.now()}` };
    const updatedRoutes = [...routes, newRoute];
    setRoutes(updatedRoutes);
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
    setShowRouteForm(false);
  };

  const handleEditRoute = (routeData) => {
    if (editingRoute) {
      const updatedRoutes = routes.map(route =>
        route.id === editingRoute.id ? { ...routeData, id: editingRoute.id } : route
      );
      setRoutes(updatedRoutes);
      localStorage.setItem('routes', JSON.stringify(updatedRoutes));
      setEditingRoute(null);
      setShowRouteForm(false);
    }
  };

  const handleDeleteRoute = (id) => {
    const updatedRoutes = routes.filter(route => route.id !== id);
    setRoutes(updatedRoutes);
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bus className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Manage your bus booking system</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'buses', label: 'Bus Management', icon: Bus },
                { id: 'routes', label: 'Route Management', icon: RouteIcon },
                { id: 'refunds', label: 'Refund Management', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
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

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <Bus className="h-12 w-12 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Buses</p>
                  <p className="text-2xl font-bold text-gray-900">{buses.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <RouteIcon className="h-12 w-12 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Routes</p>
                  <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <Users className="h-12 w-12 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Buses</p>
                  <p className="text-2xl font-bold text-gray-900">{buses.filter(bus => bus.status === 'active').length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <Users className="h-12 w-12 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Refunds</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(() => {
                      try {
                        const savedRefunds = localStorage.getItem('refunds');
                        const allRefunds = savedRefunds ? JSON.parse(savedRefunds) : [];
                        return allRefunds.filter(refund => refund.status === 'pending').length;
                      } catch {
                        return 0;
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bus Management */}
          {activeTab === 'buses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Bus Management</h2>
                <button
                  onClick={() => setShowBusForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add Bus
                </button>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {buses.map((bus) => (
                      <tr key={bus.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bus.busNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bus.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>{bus.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => { setEditingBus(bus); setShowBusForm(true); }}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBus(bus.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Route Management */}
          {activeTab === 'routes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
                <button
                  onClick={() => setShowRouteForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add Route
                </button>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {routes.map((route) => (
                      <tr key={route.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.from}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.to}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.distance} km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{route.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => { setEditingRoute(route); setShowRouteForm(true); }}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRoute(route.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Refund Management */}
          {activeTab === 'refunds' && <RefundManagement />}

        </div>

        {/* Modal: Bus Form */}
        {showBusForm && (
          <BusFormModal
            bus={editingBus}
            onSubmit={editingBus ? handleEditBus : handleAddBus}
            onClose={() => { setShowBusForm(false); setEditingBus(null); }}
          />
        )}

        {/* Modal: Route Form */}
        {showRouteForm && (
          <RouteFormModal
            route={editingRoute}
            onSubmit={editingRoute ? handleEditRoute : handleAddRoute}
            onClose={() => { setShowRouteForm(false); setEditingRoute(null); }}
          />
        )}
      </div>
    </Layout>
  );
};

// Refund Management
const RefundManagement = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    loadRefunds();
  }, []);

  const loadRefunds = () => {
    const savedRefunds = localStorage.getItem('refunds');
    if (savedRefunds) setRefunds(JSON.parse(savedRefunds));
    else setRefunds([]);
  };

  const handleRefundAction = (refundId, action) => {
    setLoading(prev => ({ ...prev, [refundId]: true }));
    setTimeout(() => {
      const savedRefunds = localStorage.getItem('refunds');
      if (savedRefunds) {
        const allRefunds = JSON.parse(savedRefunds);
        const updatedRefunds = allRefunds.map(refund =>
          refund.id === refundId
            ? {
                ...refund,
                status: action,
                processedDate: new Date().toISOString(),
                processedBy: 'admin'
              }
            : refund
        );
        localStorage.setItem('refunds', JSON.stringify(updatedRefunds));
        setRefunds(updatedRefunds);
      }
      setLoading(prev => ({ ...prev, [refundId]: false }));
    }, 800);
  };

  const safeBooking = (refund) => refund.booking || refund;
  const safeRoute = (refund) => safeBooking(refund).route || {};

  const pendingRefunds = refunds.filter(r => r.status === 'pending');
  const processedRefunds = refunds.filter(r => r.status !== 'pending');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Refund Management</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <span>Pending: {pendingRefunds.length}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span>Processed: {processedRefunds.length}</span>
          </div>
        </div>
      </div>

      {/* Pending */}
      {pendingRefunds.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            Pending Refund Requests ({pendingRefunds.length})
          </h3>
          <div className="space-y-4">
            {pendingRefunds.map((refund) => {
              const booking = safeBooking(refund);
              const route = booking.route || {};
              return (
                <div key={refund.id} className="bg-white rounded-lg shadow border-l-4 border-yellow-400 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Refund Request #{(refund.id || '').slice(-8).toUpperCase()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Requested on: {refund.requestedAt 
                          ? new Date(refund.requestedAt).toLocaleDateString() + ' at ' + new Date(refund.requestedAt).toLocaleTimeString()
                          : ''}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">PENDING REVIEW</span>
                  </div>
                  {/* Passenger Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Passenger Information</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium">{get(booking, 'passengerName', '--')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium">{get(booking, 'passengerPhone', '--')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Passenger ID:</span>
                        <p className="font-medium font-mono text-xs">{get(booking, 'passengerId', '--')}</p>
                      </div>
                    </div>
                  </div>
                  {/* Booking Info */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-blue-900 mb-2">Original Booking Details</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Route:</span>
                        <p className="font-medium text-blue-900">{get(route, 'from', '--')} → {get(route, 'to', '--')}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">Seat Number:</span>
                        <p className="font-medium text-blue-900">{get(booking, 'seatNumber', '--')}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">Travel Date:</span>
                        <p className="font-medium text-blue-900">{formatDate(get(booking, 'travelDate'))}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">Booking Date:</span>
                        <p className="font-medium text-blue-900">{formatDate(get(booking, 'bookingDate'))}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Booking ID:</span>
                        <span className="font-mono text-sm bg-blue-100 px-2 py-1 rounded">{String(refund.bookingId || '').slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  {/* Amount */}
                  <div className="bg-green-50 rounded-lg p-4 mb-4 flex justify-between items-center">
                    <span className="text-green-700 font-medium">Refund Amount:</span>
                    <span className="text-2xl font-bold text-green-600">₹{refund.amount}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleRefundAction(refund.id, 'rejected')}
                      disabled={loading[refund.id]}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 flex items-center"
                    >
                      {loading[refund.id] && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                      Reject Refund
                    </button>
                    <button
                      onClick={() => handleRefundAction(refund.id, 'approved')}
                      disabled={loading[refund.id]}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 flex items-center"
                    >
                      {loading[refund.id] && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                      Approve Refund
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Processed Refunds */}
      {processedRefunds.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            Processed Refunds ({processedRefunds.length})
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedRefunds.map((refund) => {
                  const booking = safeBooking(refund);
                  const route = booking.route || {};
                  return (
                    <tr key={refund.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{(refund.id || '').slice(-8).toUpperCase()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div><div className="font-medium">{get(booking, 'passengerName', '--')}</div>
                        <div className="text-gray-500">{get(booking, 'passengerPhone', '--')}</div></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {get(route, 'from', '--')} → {get(route, 'to', '--')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{refund.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          refund.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>{refund.status.toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {refund.processedDate ? new Date(refund.processedDate).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {refunds.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No refund requests found</p>
          <p className="text-gray-400 text-sm mt-2">Refund requests will appear here when passengers cancel bookings</p>
        </div>
      )}
    </div>
  );
};

// Bus Form Modal
const BusFormModal = ({ bus, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    busNumber: bus?.busNumber || '',
    capacity: bus?.capacity || 0,
    type: bus?.type || 'AC',
    status: bus?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {bus ? 'Edit Bus' : 'Add New Bus'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number</label>
            <input type="text"
              value={formData.busNumber}
              onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Sleeper">Sleeper</option>
              <option value="Semi-Sleeper">Semi-Sleeper</option>
              <option value="Wi-fi">Wi-fi</option>
              <option value="Special-need">Special-need</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {bus ? 'Update' : 'Add'} Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Route Form Modal
const RouteFormModal = ({ route, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    from: route?.from || '',
    to: route?.to || '',
    distance: route?.distance || 0,
    duration: route?.duration || '',
    price: route?.price || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {route ? 'Edit Route' : 'Add New Route'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input type="text"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input type="text"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
            <input type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 5h 30m"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
            <input type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required/>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {route ? 'Update' : 'Add'} Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
