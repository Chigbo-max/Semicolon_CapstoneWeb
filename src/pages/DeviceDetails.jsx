import React, { useState } from 'react';
import { useGetDeviceDetailsQuery, useGetDeviceLocationQuery } from '../services/androidAntiTheftApi';
import DeviceLocationMap from '../components/DeviceLocationMap';

const DeviceDetails = ({ deviceId, onClose }) => {
  const { data: details, isLoading, isError } = useGetDeviceDetailsQuery(deviceId);
  const { data: locationData, refetch: refetchLocation } = useGetDeviceLocationQuery(deviceId, {
    skip: true // Don't fetch automatically
  });
  const [showMap, setShowMap] = useState(false);

  React.useEffect(() => {
    if (details && details.latitude && details.longitude) {
      setShowMap(true);
    }
  }, [details]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
        <div className="relative bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Device Details</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✖
            </button>
          </div>
          <div className="p-6 flex justify-center items-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Loading device details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
        <div className="relative bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Device Details</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✖
            </button>
          </div>
          <div className="p-6 flex justify-center items-center">
            <div className="text-center">
              <p className="text-red-400 mb-2">Error loading device details</p>
              <p className="text-slate-400 text-sm">Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
      <div
        className="relative bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Device Details</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            ✖
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400 uppercase">Device ID</label>
            <p className="text-lg text-white font-mono">{details.deviceId}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Manufacturer</label>
            <p className="text-lg text-white">{details.manufacturer || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Device Model</label>
            <p className="text-lg text-white">{details.deviceModel || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Serial Number</label>
            <p className="text-lg text-white font-mono">{details.deviceSerialNumber || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">IMEI</label>
            <p className="text-lg text-white font-mono">{details.imei || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Policy Name</label>
            <p className="text-lg text-white">{details.policyName || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">SIM ICCID (Slot 0)</label>
            <p className="text-lg text-white break-all font-mono">{details.simIccidSlot0 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">SIM ICCID (Slot 1)</label>
            <p className="text-lg text-white break-all font-mono">{details.simIccidSlot1 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Carrier (Slot 0)</label>
            <p className="text-lg text-white">{details.carrierSlot0 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Carrier (Slot 1)</label>
            <p className="text-lg text-white">{details.carrierSlot1 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Phone Number (Slot 0)</label>
            <p className="text-lg text-white break-all font-mono">{details.phoneNumberSlot0 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Phone Number (Slot 1)</label>
            <p className="text-lg text-white break-all font-mono">{details.phoneNumberSlot1 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Status</label>
            <p className={`text-lg ${details.isStolen ? 'text-red-400' : 'text-emerald-400'}`}>
              {details.isStolen ? 'Stolen' : 'Active'}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Last Seen</label>
            <p className="text-lg text-white">{details.lastSeen || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Location</label>
            <div className="flex items-center gap-2">
              <p className="text-lg text-white font-mono">
                {details.latitude && details.longitude
                  ? `${details.latitude.toFixed(6)}, ${details.longitude.toFixed(6)}`
                  : 'Unavailable'}
              </p>
              {details.latitude && details.longitude && (
                <>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    📍 Available
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${details.latitude},${details.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    🗺️ Open in Maps
                  </a>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">Location Timestamp</label>
            <p className="text-lg text-white">
              {details.locationTimestamp 
                ? new Date(details.locationTimestamp).toLocaleString()
                : 'N/A'}
            </p>
          </div>

          {/* Location Map Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                📍 Device Location
                {details.latitude && details.longitude && (
                  <span className="text-sm text-green-400">• Live</span>
                )}
              </h3>
              {details.latitude && details.longitude ? (
                <button
                  onClick={() => {
                    setShowMap(!showMap);
                    if (!showMap) {
                      refetchLocation();
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
                </button>
              ) : (
                <span className="text-gray-400 text-sm">📍 Location not available</span>
              )}
            </div>
            
            {showMap && details.latitude && details.longitude && (
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <DeviceLocationMap
                  latitude={locationData?.latitude || details.latitude}
                  longitude={locationData?.longitude || details.longitude}
                  deviceName={details.deviceModel || details.deviceId}
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;