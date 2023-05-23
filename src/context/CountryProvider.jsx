import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';
import { countries as countriesDB } from '../data/countries';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState([]);
    const [regionSelected, setRegionSelected] = useState(regions[0]);
    const [countries, setCountries] = useState(countriesDB);

    const handleRegionChange = event => {
        const id = event.target.value;
        const region = regions.filter(region => region.id.toString() === id);
        console.log(region[0].slug);
        // Filtrar los países por la región seleccionada
        const filteredCountries = countries.filter(
            country => country.region === region[0].slug
        );

        setCountries(filteredCountries);
        setSubRegions([]);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                countries,
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
