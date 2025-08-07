import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import SeatSelector from './SeatSelector';
import Alert from '../common/Alert';

const BookingForm = ({ isOpen, route, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerPhone: '',
    seatNumber: '',
    travelDate: '',
    routeId: route?.id || ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (formData.passengerPhone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
    
    if (!formData.seatNumber) {
      setError('Please select a seat');
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle phone number validation
    if (name === 'passengerPhone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue
        });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSeatSelect = (seatNumber) => {
    setFormData({ ...formData, seatNumber });
  };

  const getButtonText = () => {
    if (!formData.seatNumber) return 'Select a Seat';
    if (!formData.passengerName) return 'Enter Name';
    if (formData.passengerPhone.length !== 10) return 'Enter Valid Phone (10 digits)';
    if (!formData.travelDate) return 'Select Travel Date';
    return 'Proceed to Payment';
  };

  const isFormValid = () => {
    return formData.seatNumber && 
           formData.passengerName && 
           formData.passengerPhone.length === 10 && 
           formData.travelDate;
  };

  if (!isOpen || !route) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Book Ticket: {route.from} → {route.to}
      </h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="text-sm text-green-800 space-y-1">
          <p><strong>Route:</strong> {route.from} to {route.to}</p>
          <p><strong>Duration:</strong> {route.duration}</p>
          <p><strong>Price:</strong> Rs.{route.price}</p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
            placeholder="Enter 10-digit phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            required
          />
          {formData.passengerPhone && formData.passengerPhone.length !== 10 && (
            <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
          )}
        </div>
        
        <SeatSelector
          selectedSeat={formData.seatNumber}
          onSeatSelect={handleSeatSelect}
          totalSeats={30}
        />
        
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {error && <Alert type="error" message={error} />}
        
        <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="flex items-center justify-center"
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default BookingForm;