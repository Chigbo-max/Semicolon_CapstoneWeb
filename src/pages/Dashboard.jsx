import React, { useState, useEffect } from 'react';
import {
  useGenerateEnrollmentUrlQuery,
  useGetDeviceMetaDataQuery,
} from '../services/androidAntiTheftApi';
import Sidebar from '../components/reusables/Sideba';
import { Plus, CheckCircle, AlertCircle } from "lucide-react";
import EnrollmentModal from "./Enrollment";
import DeviceDetails from "./DeviceDetails";
import CommandActions from '../components/CommandActions';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { data: enrollmentData } = useGenerateEnrollmentUrlQuery();
  const { data: devices = [], isLoading: isDevicesLoading, isError: isDevicesError } = useGetDeviceMetaDataQuery();

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      <aside className="md:block">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-0 md:ml-10 transition-all duration-300">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              My Devices
            </h2>
            <p className="text-slate-400 text-lg">Monitor and manage your connected devices</p>
          </div>

          {isDevicesLoading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Loading devices...</p>
              </div>
            </div>
          ) : isDevicesError ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-red-400 mb-2">Error loading devices</p>
                <p className="text-slate-400 text-sm">Please try again later</p>
              </div>
            </div>
          ) : devices && devices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div
                key={device.deviceId}
                className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                      {device.deviceModel}
                  </h3>
                    <div className={`w-3 h-3 rounded-full ${device.isStolen ? 'bg-red-400 animate-pulse' : 'bg-emerald-400 animate-pulse'}`}></div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Policy Name</p>
                      <p className="text-sm font-mono text-slate-200 break-all">{device.policyName || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-700/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm font-mono text-slate-200 break-all">
                        {device.latitude && device.longitude ? `${device.latitude}, ${device.longitude}` : 'Unavailable'}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location Timestamp</p>
                      <p className="text-sm font-mono text-slate-200 break-all">{device.locationTimestamp ? new Date(device.locationTimestamp).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="bg-slate-700/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">IMEI</p>
                      <p className="text-sm font-mono text-slate-200 break-all">{device.imei || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Last Seen</p>
                        <p className="text-sm font-medium text-slate-200">{device.lastSeen}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        device.isStolen ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                      {device.isStolen ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                      {device.isStolen ? 'Stolen' : 'Active'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                      onClick={() => {
                        setSelectedDevice(device.deviceId);
                      }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    View Details
                  </button>
                    <button className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg border border-slate-600/50 hover:border-slate-500/50">
                    <Plus size={16} className="text-purple-400" />
                      <Link to={`/trustedContacts/${device.deviceId}`}>Contacts</Link>
                  </button>
                </div>

                <div className="mt-3">
                  <CommandActions device={device} />
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-slate-400 mb-2">No devices found</p>
                <p className="text-slate-500 text-sm">Enroll your first device to get started</p>
              </div>
            </div>
          )}

          {/* Enroll New Device Button - Always visible */}
          <div className="mt-8">
            <div
              onClick={() => setShowEnrollmentModal(true)}
              className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-dashed border-blue-500/30 hover:border-blue-400/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 min-h-[200px]"
              aria-label="Enroll New Device"
              role="button"
              tabIndex={0}
              onKeyUp={(e) => { if (e.key === 'Enter') setShowEnrollmentModal(true); }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus size={32} className="text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-blue-400 group-hover:text-blue-300 font-bold text-lg mb-2 transition-colors">
                Enroll New Device
              </h3>
              <p className="text-slate-400 text-sm text-center px-4">
                Add a new device to your security network
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 text-sm font-medium">Active Devices</p>
                  <p className="text-3xl font-bold text-white mt-1">{devices.filter(d => !d.isStolen).length}</p>
                </div>
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Stolen Devices</p>
                  <p className="text-3xl font-bold text-white mt-1">{devices.filter(d => d.isStolen).length}</p>
                </div>
                <AlertCircle size={32} className="text-red-400" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Total Devices</p>
                  <p className="text-3xl font-bold text-white mt-1">{devices.length}</p>
                </div>
                <Plus size={32} className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enrollment Modal */}
      {showEnrollmentModal && enrollmentData && (
        <EnrollmentModal
          onClose={() => setShowEnrollmentModal(false)}
          enrollmentUrl={enrollmentData.enrollmentUrl}
          tokenValue={enrollmentData.tokenValue}
          qrCodeContent={enrollmentData.qrCodeContent}
        />
      )}

      {/* Device Details Modal */}
      {selectedDevice && (
        <DeviceDetails
          onClose={() => setSelectedDevice(null)}
          deviceId={selectedDevice}
        />
      )}
    </div>
  );
}

export default Dashboard;
