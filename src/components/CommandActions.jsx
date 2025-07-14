import React, { useState } from 'react';
import {
    useLockDeviceMutation,
    useWipeDeviceMutation,
    useReportTheftMutation,
    useGetDeviceMetaDataQuery,
} from '../services/androidAntiTheftApi';
import { MdLock, MdDeleteForever, MdLockOpen, MdReportProblem, MdMyLocation, MdLayers } from 'react-icons/md';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ResetViewButton from '../components/ResetviewButton';


const deviceIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});



const CommandActions = ({ device }) => {

    const { data: deviceMetaData = [], isLoading: isMetaDataLoading } = useGetDeviceMetaDataQuery();

    const deviceId = deviceMetaData[0]?.deviceId;
    const [modalOpen, setModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapType, setMapType] = useState('detailed');

    const [lockDevice] = useLockDeviceMutation();
    const [wipeDevice] = useWipeDeviceMutation();
    const [reportTheft] = useReportTheftMutation();



    const tileLayerOptions = {
        detailed: {
            url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            maxZoom: 20,
            name: 'Detailed Streets'
        },
        streets: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            name: 'Standard Streets'
        },
        highDetail: {
            url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 20,
            name: 'High Detail'
        },
        satellite: {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 19,
            name: 'Satellite'
        }
    };

    const confirmAndSend = async () => {
        if (!actionType) return;
        setLoading(true);
        try {
            if (actionType === 'lock') {
                await lockDevice(device.deviceId).unwrap();
                toast.success('Lock command sent successfully.');
            } else if (actionType === 'remoteWipe') {
                await wipeDevice(device.deviceId).unwrap();
                toast.success('Wipe command sent successfully.');
            } else if (actionType === 'reportTheft') {
             
                await reportTheft(device.deviceId).unwrap();
                toast.success('Theft report submitted successfully.');
            }
        } catch (err) {
            toast.error(`Failed to send ${actionType} command.`);
        } finally {
            setLoading(false);
            setModalOpen(false);
        }
    };

    const handleAction = async (type) => {
        if (type === 'lock' || type === 'remoteWipe' || type === 'reportTheft') {
            setActionType(type);
            setModalOpen(true);
            toast.info(`Preparing to ${type} the device...`, {
                duration: 3000,
                position: 'bottom-right',
            });
        }
    };

    const isLocked = device?.status?.toLowerCase() === 'locked';

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {(
                    <button
                        onClick={() => handleAction('lock')}
                        className="flex-1 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 px-3 py-2 text-sm rounded flex items-center disabled:opacity-50"
                        disabled={loading}
                    >
                        <MdLock className="mr-1" /> Lock
                    </button>
                )}

                <button
                    onClick={() => handleAction('remoteWipe')}
                    className="flex-1 bg-gradient-to-r from-amber-600/20 to-amber-700/20 hover:from-amber-600/30 hover:to-amber-700/30 border border-amber-500/30 px-3 py-2 text-sm rounded flex items-center disabled:opacity-50"
                    disabled={loading}
                >
                    <MdDeleteForever className="mr-1" /> Wipe
                </button>

                <button
                    onClick={() => handleAction('reportTheft')}
                    className="flex-1 bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 hover:from-yellow-600/30 hover:to-yellow-700/30 border border-yellow-500/30 px-3 py-2 text-sm rounded flex items-center disabled:opacity-50"
                    disabled={loading}
                >
                    <MdReportProblem className="mr-1" /> Report Theft
                </button>

                <button
                    onClick={() => {
                        if (device.latitude != null && device.longitude != null) {
                            setShowMap(true);
                        } else {
                            toast.error("Device location not available yet.");
                        }
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600/20 to-green-700/20 hover:from-green-600/30 hover:to-green-700/30 border border-green-500/30 px-3 py-2 text-sm rounded flex items-center"
                >
                    <MdMyLocation className="mr-1" /> Find Device
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl relative">
                        {loading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
                                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <h3 className="text-lg font-bold mb-2">
                            Confirm{' '}
                            {actionType === 'lock'
                                ? 'Lock'
                                : actionType === 'remoteWipe'
                                    ? 'Wipe'
                                    : 'Theft Report'}{' '}
                            Action
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Are you sure you want to {actionType === 'lock' ? 'lock' : actionType === 'remoteWipe' ? 'wipe' : 'report theft on'} this device?
                            <br /> This will notify all trusted contacts immediately.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAndSend}
                                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 rounded"
                                disabled={loading}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showMap && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50">
                    <div className="relative bg-gray-800 rounded-lg shadow-2xl border border-gray-700 w-[90%] max-w-5xl h-[85vh] p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white font-bold text-lg">Device Location</h2>
                            <button
                                onClick={() => setShowMap(false)}
                                className="text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                            >
                                Close
                            </button>
                        </div>

                        <div className="flex justify-center mb-3">
                            <div className="flex bg-gray-700 rounded p-1">

                                {['detailed', 'streets', 'highDetail', 'satellite'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setMapType(type)}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${mapType === type
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="flex-1 relative z-10 rounded overflow-hidden">
                            <MapContainer
                                center={[device.latitude, device.longitude]}
                                zoom={15}
                                scrollWheelZoom={true}
                                className="w-full h-full rounded"
                            >
                                <TileLayer
                                    url={tileLayerOptions[mapType].url}
                                    attribution={tileLayerOptions[mapType].attribution}
                                    maxZoom={tileLayerOptions[mapType].maxZoom}
                                />
                                <Marker
                                    position={[device.latitude, device.longitude]}
                                    icon={deviceIcon}
                                >
                                    <Popup>
                                        <div className="text-sm space-y-1">
                                            <div><strong>Device:</strong> {device?.deviceName || 'Unknown'}</div>
                                            <div><strong>Latitude:</strong> {device?.latitude.toFixed(6)}</div>
                                            <div><strong>Longitude:</strong> {device?.longitude.toFixed(6)}</div>

                                        </div>
                                    </Popup>
                                </Marker>
                                <ResetViewButton
                                    position={[device.latitude, device.longitude]}
                                    zoom={15}
                                />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default CommandActions;