import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount,
  bookingDetails
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [upiId, setUpiId] = useState('');
  const [esewaId, setEsewaId] = useState('');
  const [khaltiId, setKhaltiId] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handlePhoneInput = (e) => {
    // If you want to restrict phone input to 10 digits, add this function to your phone input field
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setEsewaId(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <h3 className="text-xl font-bold flex items-center">
            <Lock className="h-6 w-6 mr-2" />
            Secure Payment
          </h3>
          <p className="text-blue-100 mt-1">Complete your booking payment</p>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">{bookingDetails.from} → {bookingDetails.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passenger:</span>
                <span className="font-medium">{bookingDetails.passengerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seat:</span>
                <span className="font-medium">{bookingDetails.seatNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Travel Date:</span>
                <span className="font-medium">{new Date(bookingDetails.travelDate).toLocaleDateString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">Rs.{amount}</span>
                <span className="text-green-600">Rs.{amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="mr-2">💳</span>
                <span>UPI Payment</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="esewa"
                  checked={paymentMethod === 'esewa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>eSewa</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="khalti"
                  checked={paymentMethod === 'khalti'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Khalti</span>
              </label>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment}>
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardData.cardholderName}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {paymentMethod === 'esewa' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    eSewa ID / Mobile Number
                  </label>
                  <input
                    type="text"
                    name="esewaId"
                    value={esewaId}
                    onChange={(e) => {
                      // Only allow 10 digits for phone number
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setEsewaId(val);
                    }}
                    placeholder="eSewa ID or Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  {esewaId && esewaId.length !== 10 && (
                    <p className="text-red-500 text-xs mt-1">Phone number must be exactly 10 digits</p>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'khalti' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khalti ID / Mobile Number
                  </label>
                  <input
                    type="text"
                    name="khaltiId"
                    value={khaltiId}
                    onChange={(e) => {
                      // Only allow 10 digits for phone number
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setKhaltiId(val);
                    }}
                    placeholder="Khalti ID or Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  {khaltiId && khaltiId.length !== 10 && (
                    <p className="text-red-500 text-xs mt-1">Phone number must be exactly 10 digits</p>
                  )}
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">
                  Your payment information is secure and encrypted
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Pay Rs.${amount}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;