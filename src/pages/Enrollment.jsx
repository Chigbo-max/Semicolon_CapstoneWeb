import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import {
 
  MdDeviceHub,

  MdClose,
  MdContentCopy,
  MdOpenInNew,
} from 'react-icons/md';

function EnrollmentModal({ onClose, enrollmentUrl, tokenValue, qrCodeContent }) {
  const [showQR, setShowQR] = useState(false);
  const qrString = JSON.stringify(qrCodeContent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 w-full max-w-lg mx-4 p-6 rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
          aria-label="Close modal"
        >
          <MdClose />
        </button>

        <h3 className="text-2xl font-bold mb-4">Enroll New Device</h3>

        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-indigo-400 hover:text-indigo-300 underline text-sm flex items-center gap-1"
          >
            {showQR ? "Show Link" : "Show QR Code"}
            {showQR ? <MdOpenInNew /> : <MdDeviceHub />}
          </button>
        </div>

        {!showQR && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Enrollment Token:</label>
            <input
              type="text"
              value={tokenValue}
              readOnly
              className="w-full p-2 bg-gray-700 text-white rounded text-sm"
            />
            <p className="mt-2 text-xs text-gray-400">
              Copy this token to enroll a new device.
            </p>
          </div>
        )}

        {showQR && (
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded shadow-inner inline-block">
              <QRCodeSVG value={qrString} size={200} bgColor="#ffffff" fgColor="#000000" />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Enrollment Link:</label>
          <a
            href={enrollmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline break-all text-sm flex items-center gap-1"
          >
            {enrollmentUrl} <MdOpenInNew />
          </a>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm flex items-center gap-1"
          >
            <MdClose /> Close
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(tokenValue)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm flex items-center gap-1"
          >
            <MdContentCopy /> Copy Token
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentModal;
