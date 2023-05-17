import { createContext, useState } from 'react';
import { countries } from '../data/countries';
import { regions as regionsDB } from '../data/regions';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [regionActual, setRegionActual] = useState(regions[0]);

    const handleRegionClick = id => {
        const region = regions.filter(region => region.id === id)[0];
        setRegionActual(region);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                regionActual,
                handleRegionClick,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
