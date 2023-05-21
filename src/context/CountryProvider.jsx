import { createContext, useState } from 'react';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState([]);
    const [subRegions, setSubRegions] = useState([]);
    const [regionActual, setRegionActual] = useState(regions[0]);

    const handleRegionClick = id => {
        const region = regions.filter(region => region.id === id)[0];
        setRegionActual(region);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                subRegions,
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
