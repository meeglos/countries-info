import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState([]);
    // const [regionActual, setRegionActual] = useState(regions[0]);
    const [regionSelected, setRegionSelected] = useState(regions[0]);

    const handleRegionChange = event => {
        const id = event.target.value;
        // setRegionActual(regionActual);
        const region = regions.filter(region => region.id === id);
        console.log(typeof id);
        console.log(region);
        // Filtrar los países por la región seleccionada
        // const filteredCountries = countries.filter(
        //     country => country.region === regionActual
        // );

        // setCountries(filteredCountries);
        // setSubRegions([]);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                subRegions,
                regionSelected,
                handleRegionChange,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
