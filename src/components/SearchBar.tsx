import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tracks, artists, or albums..."
        className="w-full pl-10 pr-4 py-2 bg-black/50 border border-purple-900/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
};