import React from 'react';
import { Link } from 'react-router-dom';

const AdminAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="fas fa-shield-alt text-white text-2xl"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Access the Illusion admin dashboard to manage contacts, newsletter subscribers, and website analytics.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/dashboard" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Open Dashboard</span>
            </Link>
            
            <Link 
              to="/" 
              className="w-full border-2 border-white/30 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <i className="fas fa-home"></i>
              <span>Back to Website</span>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              For mobile access, bookmark this page or add to home screen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;