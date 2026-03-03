import React from 'react';
import { useLocation } from 'react-router';
import { Construction } from 'lucide-react';

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop()?.replace('-', ' ') || 'Page';

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
      <div className="bg-stone-100 p-6 rounded-full mb-6 animate-pulse">
        <Construction className="w-12 h-12 text-stone-400" />
      </div>
      <h2 className="text-2xl font-bold text-stone-900 capitalize mb-2">{pageName}</h2>
      <p className="text-stone-500 max-w-md mx-auto">
        This section is currently under development. The Genie team is working their magic!
      </p>
    </div>
  );
}
