import React from 'react';
import { 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Shield 
} from 'lucide-react';
import { motion } from 'motion/react';

const STAFF = [
  { id: 1, name: 'Alice Johnson', role: 'Manager', email: 'alice@example.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 2, name: 'Bob Smith', role: 'Server', email: 'bob@example.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Charlie Brown', role: 'Chef', email: 'charlie@example.com', status: 'On Leave', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 4, name: 'Diana Prince', role: 'Bartender', email: 'diana@example.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export default function Staff() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Staff & Roles</h1>
          <p className="text-stone-500 mt-1">Manage your team access and permissions.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAFF.map((person) => (
          <motion.div 
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm relative group"
          >
            <div className="absolute top-4 right-4">
              <button className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-50">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-stone-200 mb-4 overflow-hidden border-4 border-white shadow-sm relative">
                 <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                 <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${person.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              </div>
              <h3 className="text-lg font-bold text-stone-900">{person.name}</h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Shield className="w-3 h-3" />
                {person.role}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Mail className="w-4 h-4 text-stone-400" />
                <span className="truncate">{person.email}</span>
              </div>
               <div className="flex items-center gap-3 text-sm text-stone-600">
                <Phone className="w-4 h-4 text-stone-400" />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-stone-100 flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
                  View Profile
                </button>
                 <button className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                  Edit Role
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
