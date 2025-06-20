import React from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, loading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full relative">
                {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-300 mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 rounded"
                        disabled={loading}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}