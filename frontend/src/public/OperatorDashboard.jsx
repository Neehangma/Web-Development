import React, { useState } from 'react';
import { Bus, Edit, Users, Clock, MapPin, Plus, Trash2, X } from 'lucide-react';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';

const OperatorDashboard: React.FC = () => {
  const { buses, bookings, addBus, updateBus, deleteBus } = useBus();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingBus, setEditingBus] = useState<string | null>(null);
  const [showAddBusForm, setShowAddBusForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    route: '',
    departure: '',
    arrival: '',
    price: '',
    amenities: ''
  });

  const operatorBuses = buses.filter(bus => bus.operatorId === user?.id);
  const operatorBookings = bookings.filter(booking => 
    operatorBuses.some(bus => bus.id === booking.busId)
  );

  const handleEditBus = (bus: any) => {
    setEditingBus(bus.id);
    setEditForm({
      name: bus.name,
      route: bus.route,
      departure: bus.departure,
      arrival: bus.arrival,
      price: bus.price.toString(),
      amenities: bus.amenities.join(', ')
    });
  };

  const handleUpdateBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBus) {
      updateBus(editingBus, {
        name: editForm.name,
        route: editForm.route,
        departure: editForm.departure,
        arrival: editForm.arrival,
        price: parseFloat(editForm.price),
        amenities: editForm.amenities.split(',').map(a => a.trim())
      });
      setEditingBus(null);
    }
  };

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    addBus({
      name: editForm.name,
      route: editForm.route,
      departure: editForm.departure,
      arrival: editForm.arrival,
      price: parseFloat(editForm.price),
      totalSeats: 40, // Default value
      availableSeats: 40,
      operatorId: user?.id || '',
      amenities: editForm.amenities.split(',').map(a => a.trim())
    });
    setEditForm({
      name: '',
      route: '',
      departure: '',
      arrival: '',
      price: '',
      amenities: ''
    });
    setShowAddBusForm(false);
  };

  const totalRevenue = operatorBookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.amount, 0);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'buses', name: 'My Buses' },
    { id: 'bookings', name: 'Bookings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Operator Dashboard</h1>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Bus className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">My Buses</p>
                  <p className="text-2xl font-bold text-gray-900">{operatorBuses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{operatorBookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full">
                  <span className="text-teal-600 font-bold">$</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bus Management Tab */}
        {activeTab === 'buses' && (
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Bus Fleet</h2>
                <button
                  onClick={() => setShowAddBusForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Bus</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {operatorBuses.map((bus) => (
                  <div key={bus.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bus.name}</h3>
                        <p className="text-gray-600">{bus.route}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBus(bus)}
                          className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteBus(bus.id)}
                          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{bus.departure} - {bus.arrival}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Price: ${bus.price}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Seat Occupancy</span>
                        <span>{bus.totalSeats - bus.availableSeats}/{bus.totalSeats}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${((bus.totalSeats - bus.availableSeats) / bus.totalSeats) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {bus.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passenger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bus
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travel Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operatorBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.passengerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.busName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.seatNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.travelDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          booking.status === 'refund-requested' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Bus Modal */}
        {(editingBus || showAddBusForm) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingBus ? 'Edit Bus Details' : 'Add New Bus'}
                </h3>
                <button
                  onClick={() => {
                    setEditingBus(null);
                    setShowAddBusForm(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={editingBus ? handleUpdateBus : handleAddBus} className="space-y-4">
                <input
                  type="text"
                  placeholder="Bus Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Route"
                  value={editForm.route}
                  onChange={(e) => setEditForm({ ...editForm, route: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    value={editForm.departure}
                    onChange={(e) => setEditForm({ ...editForm, departure: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="time"
                    value={editForm.arrival}
                    onChange={(e) => setEditForm({ ...editForm, arrival: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="number"
                  placeholder="Price"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Amenities (comma separated)"
                  value={editForm.amenities}
                  onChange={(e) => setEditForm({ ...editForm, amenities: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingBus ? 'Update Bus' : 'Add Bus'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBus(null);
                      setShowAddBusForm(false);
                    }}
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

export default OperatorDashboard;