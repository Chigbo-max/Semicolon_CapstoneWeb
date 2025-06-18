import { useState } from 'react';
import { Menu, X, Home, Users, Shield, Settings, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const device = {
    id: 'device-123',
    model: 'Samsung Galaxy S25',
    simIccidSlot0: 'ICCID_9876543210',
    location: '',
    lastSeen: '2 minutes ago',
    isStolen: false,
  };

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Trusted Contacts', href: `/trustedContacts/${device.id}` },
    { icon: Shield, label: 'Security', href: '/security' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>

      <button
        className="fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-40 transform transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block border-r border-slate-700/50`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10 md:justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SafeGad
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto px-4 pb-16">

          <div className="mx-4 my-6 p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-400">Device Online</span>
            </div>
            <p className="text-xs text-slate-300 mb-1">{device.model}</p>
            <p className="text-xs text-slate-400">Last seen: {device.lastSeen}</p>
          </div>


          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-200 hover:shadow-lg hover:translate-x-1"
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className="text-slate-300 group-hover:text-white transition-colors duration-200" />
                  <span className="font-medium text-slate-200 group-hover:text-white transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-slate-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                />
              </a>
            ))}
          </nav>
        </div>


        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">User Account</p>
              <p className="text-xs text-slate-400">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}