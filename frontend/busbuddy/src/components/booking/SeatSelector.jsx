import React from 'react';

const SeatSelector = ({ selectedSeat, onSeatSelect, totalSeats = 30 }) => {
  const renderSeatLayout = () => {
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
    const rows = [];
    
    for (let i = 0; i < seats.length; i += 3) {
      const rowSeats = seats.slice(i, i + 3);
      rows.push(
        <div key={i} className="flex justify-center items-center mb-2">
          {rowSeats.map((seatNum, index) => (
            <div key={seatNum} className="flex items-center">
              <button
                type="button"
                onClick={() => onSeatSelect(seatNum.toString())}
                className={`w-8 h-6 text-xs font-bold rounded border-2 transition-all duration-200 ease-in-out flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedSeat === seatNum.toString()
                    ? 'bg-green-500 border-green-600 text-white animate-pulse'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-300 hover:scale-105'
                }`}
              >
                {seatNum}
              </button>
              {index === 1 && <div className="w-4"></div>}
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto border border-gray-200">
        <div className="text-center mb-3">
          <div className="bg-gray-300 rounded-t-lg p-2 text-xs font-medium text-gray-700">🚌 Driver</div>
        </div>
        <div>
          {rows}
        </div>
        <div className="flex justify-center mt-3 text-xs text-gray-600 gap-4">
          <div className="flex items-center mr-4">
            <div className="w-4 h-3 bg-gray-100 border border-gray-300 rounded mr-1"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-3 bg-green-500 border border-green-600 rounded mr-1"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Your Seat
      </label>
      {renderSeatLayout()}
      {selectedSeat && (
        <p className="text-sm text-green-600 mt-2">
          Selected Seat: {selectedSeat}
        </p>
      )}
      {!selectedSeat && (
        <p className="text-sm text-gray-500 mt-2">
          Please select a seat from the layout above
        </p>
      )}
    </div>
  );
};

export default SeatSelector;