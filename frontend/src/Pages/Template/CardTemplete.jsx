import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CardTemplate = ({ data }) => {
    return (
        <div className="group relative w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            {/* Image container with subtle gradient border */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                <img 
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                    src={data.tempLogo} 
                    alt={`${data.fullName} template preview`} 
                    loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            
            {/* Content area */}
            <div className="p-4 pt-3">
                <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-gray-800 ${data.fullName.length > 20 ? 'text-sm' : 'text-base'}`}>
                        {data.fullName}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        #{data.id}
                    </span>
                </div>
                
                {/* Hover action indicator */}
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Template</span>
                    <span className="text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Select →
                    </span>
                </div>
            </div>
        </div>
    );
};

CardTemplate.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        fullName: PropTypes.string.isRequired,
        tempLogo: PropTypes.string.isRequired
    }).isRequired
};

export default CardTemplate;