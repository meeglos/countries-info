import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState([]);
    const [regionActual, setRegionActual] = useState(regions[0]);

    const handleRegionChange = id => {
        console.log('cambio de región');
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                subRegions,
                regionActual,
                handleRegionChange,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
