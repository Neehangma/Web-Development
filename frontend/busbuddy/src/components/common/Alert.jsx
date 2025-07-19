import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info
  };

  const alertClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const Icon = icons[type];

  return (
    <div className={`p-3 border rounded-md mb-4 flex items-start ${alertClasses[type]}`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        <span className="flex-1">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-current hover:opacity-70 transition-opacity"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;