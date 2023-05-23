import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';
import { subregions as subregionsDB } from '../data/subregions';
import { countries as countriesDB } from '../data/countries';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState(subregionsDB);
    // const [regionSelected, setRegionSelected] = useState(regions[0]);
    const [countries, setCountries] = useState(countriesDB);

    const handleRegionChange = event => {
        const id = event.target.value;
        const region = regions.filter(region => region.id.toString() === id);
        console.log(region);
        // console.log(region[0].slug);
        // Filtrar los países por la región seleccionada

        const filteredCountries = countries.filter(
            country => country.region === region[0].slug
        );

        const filteredSubRegions = subRegions.filter(
            subregion => subregion.region_id.toString() === id
        );

        setCountries(filteredCountries);
        setSubRegions(filteredSubRegions);
    };

    const handleSubRegionChange = event => {
        const subregionId = event.target.value;
        const subregion = subRegions.filter(
            subregion => subregion.region_id.toString() === 3
        );
        console.log(subregion);
        // return 0;
        // Filtrar los países por la subregión seleccionada
        /* const filteredCountries = countries.filter(
            country => country.subregion === subregion.slug
        ); */
        // console.log(filteredCountries);

        // setCountries(filteredCountries);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                countries,
                subRegions,
                handleRegionChange,
                handleSubRegionChange,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
