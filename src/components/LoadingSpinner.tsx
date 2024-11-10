import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
);