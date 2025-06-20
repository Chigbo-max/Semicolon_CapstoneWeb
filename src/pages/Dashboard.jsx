import React, { useState, useEffect } from 'react';
import {
  useGenerateEnrollmentUrlQuery,
  useGetDeviceMetaDataQuery,
  useGetAllDevicesQuery,
} from '../services/androidAntiTheftApi';
import Sidebar from '../components/reusables/Sideba';
import { Plus, CheckCircle, AlertCircle } from "lucide-react";
import EnrollmentModal from "./Enrollment";
import DeviceDetails from "./DeviceDetails";
import CommandActions from '../components/CommandActions';
import { Link } from 'react-router-dom';

// const devices = [
//   {
//     deviceId: 'test-device-001',
//     model: 'Samsung Galaxy S25',
//     simIccidSlot0: 'ICCID_9876543210',
//     latitude: 6.5350517,
//     longitude: 3.3424326,
//     lastSeen: '3 minutes ago',
//     isStolen: false,
//     status: 'unlocked',
//   },
//   {
//     id: 'device-456',
//     model: 'Pixel 9 Pro',
//     simIccidSlot0: 'ICCID_1234567890',
//     latitude: 6.5244,
//     longitude: 3.3792,
//     lastSeen: '1 hour ago',
//     isStolen: true,
//     status: 'locked',
//   },
// ];

function Dashboard() {
  const { data: enrollmentData } = useGenerateEnrollmentUrlQuery();
  const {data: devices = [], isLoading: isDevicesLoading, isError: isDevicesError } = useGetDeviceMetaDataQuery();
  console.log("All devices: ", Array.isArray(devices)? devices : devices?.data);

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  


  //   const {
  //   data: deviceDetails,
  //   isLoading,
  //   isError,
  // } = useGetDeviceDetailsQuery(selectedDevice, {
  //   skip: !selectedDevice,
  // });

  const deviceDetails =
    [

      {
        id: 'device-001',
        model: 'Samsung Galaxy S25',
        manufacturer: 'Samsung',
        serialNumber: 'SN123456789',
        imei: 'IMEI9876543210',
        simIccidSlot0: 'ICCID_9876543210',
        simIccidSlot1: 'ICCID_0123456789',
        carrierNameSlot0: 'MTN',
        carrierNameSlot1: 'Glo',
        phoneNumberSlot0: '+2348012345678',
        phoneNumberSlot1: '+2348098765432',
        latitude: 6.5350517,
        longitude: 3.3424326,
        lastSeen: '2025-06-10T11:05:00.000Z',
        isStolen: false,
        status: 'unlocked',
      },
      {
        id: 'device-456',
        model: 'Pixel 9 Pro',
        manufacturer: 'Google',
        serialNumber: 'SN987654321',
        imei: 'IMEI1234567890',
        simIccidSlot0: 'ICCID_1234567890',
        simIccidSlot1: 'ICCID_0987654321',
        carrierNameSlot0: 'Airtel',
        carrierNameSlot1: '9mobile',
        phoneNumberSlot0: '+2347012345678',
        phoneNumberSlot1: '+2347087654321',
        latitude: 6.5244,
        longitude: 3.3792,
        lastSeen: '1 hour ago',
        isStolen: true,
        status: 'locked',
      }
    ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div
                key={device.id}
                className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                    {device.model}
                  </h3>
                  <div className={`w-3 h-3 rounded-full ${device.isStolen ? 'bg-red-400 animate-pulse' : 'bg-emerald-400 animate-pulse'
                    }`}></div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-slate-700/30 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      IMEI
                    </p>
                    <p className="text-sm font-mono text-slate-200 break-all">
                      {device.simIccidSlot0}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">
                        Last Seen
                      </p>
                      <p className="text-sm font-medium text-slate-200">
                        {device.lastSeen}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${device.isStolen
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                      {device.isStolen ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                      {device.isStolen ? 'Stolen' : 'Active'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={
                      () => {
                        const fullDetails = deviceDetails.find(d => d.id === device.id);

                        setSelectedDevice(fullDetails);
                      }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    View Details
                  </button>
                  <button
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg border border-slate-600/50 hover:border-slate-500/50"
                  >
                    <Plus size={16} className="text-purple-400" />
                    <Link to={`/trustedContacts/${device.id}`}>
                      Contacts
                    </Link>
                  </button>
                </div>

                <div className="mt-3">
                  <CommandActions device={device} />
                </div>
              </div>
            ))}

            <div
              onClick={() => setShowEnrollmentModal(true)}
              className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-dashed border-blue-500/30 hover:border-blue-400/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 min-h-[320px]"
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
                  <p className="text-3xl font-bold text-white mt-1">
                    {devices.filter(d => !d.isStolen).length}
                  </p>
                </div>
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Stolen Devices</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {devices.filter(d => d.isStolen).length}
                  </p>
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

      {showEnrollmentModal && enrollmentData && (
        <EnrollmentModal
          onClose={() => setShowEnrollmentModal(false)}
          enrollmentUrl={enrollmentData.enrollmentUrl}
          tokenValue={enrollmentData.tokenValue}
          qrCodeContent={enrollmentData.qrCodeContent}
        />
      )}

      {selectedDevice && (
        <DeviceDetails

          onClose={() => setSelectedDevice(null)}
          details={selectedDevice}
        />
      )}
    </div>
  );
}

export default Dashboard;