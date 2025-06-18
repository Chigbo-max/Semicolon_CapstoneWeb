

const DeviceDetails = ({ details, onClose }) => {
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
            <label className="text-sm text-gray-400 uppercase">Model</label>
            <p className="text-lg text-white">{details.model}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">IMEI</label>
            <p className="text-lg text-white">{details.imei}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400 uppercase">SIM ICCID</label>
            <p className="text-lg text-white break-all">{details.simIccidSlot0 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">PHN NUMBER(SLOT 1)</label>
            <p className="text-lg text-white break-all">{details.phoneNumberSlot0 || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase">PHN NUMBER(SLOT 2)</label>
            <p className="text-lg text-white break-all">{details.phoneNumberSlot1 || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400 uppercase">Status</label>
            <p className={`text-lg ${details.status === 'locked' ? 'text-red-400' : 'text-emerald-400'}`}>
              {details.status ? details.status.charAt(0).toUpperCase() + details.status.slice(1) : 'Unknown'}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-400 uppercase">Last Seen</label>
            <p className="text-lg text-white">{details.lastSeen}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400 uppercase">Location</label>
            <p className="text-lg text-white">
              {details.latitude && details.longitude
                ? `${details.latitude.toFixed(6)}, ${details.longitude.toFixed(6)}`
                : 'Unavailable'}
            </p>
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