import{ useMap } from 'react-leaflet';


const ResetViewButton = ({ position, zoom }) => {
    const map = useMap();

    const handleReset = () => {
        map.setView(position, zoom);
    };

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control">
                <button
                    onClick={handleReset}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-sm"
                    title="Reset view to device location"
                >
                    Reset View
                </button>
            </div>
        </div>
    );
};
export default ResetViewButton;