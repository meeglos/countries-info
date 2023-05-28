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
    const [filteredCountries, setFilteredCountries] = useState();

    const handleRegionChange = event => {
        const id = event.target.value;
        const filteredRegion = regions.filter(
            region => region.id.toString() === id
        )[0];
        // console.log(region[0].slug);

        // Filtrar los países por la región seleccionada
        const filteredCountries = countries.filter(
            country => country.region === filteredRegion.slug
        );

        // Ordeno alfabéticamente los países - alfabetically ordered countries
        const aoc = filteredCountries.sort((a, b) =>
            a.translations.spa.common.localeCompare(b.translations.spa.common)
        );

        // Filtro las subregiones según la región seleccionada
        const filteredSubRegions = subRegions.filter(
            subregion => subregion.region_id.toString() === id
        );

        console.log(filteredRegion);
        console.log(filteredSubRegions);

        // setCountries(filteredCountries);
        setSubRegions(filteredSubRegions);
        // setFilteredCountries(aoc);
        setCountries(aoc);
    };

    const handleSubRegionChange = event => {
        const subregionId = event.target.value;
        const subregion = subRegions.filter(
            subregion => subregion.id.toString() === subregionId
        )[0];
        // console.log(subregion);
        // return 0;
        // Filtrar los países por la subregión seleccionada
        const filteredCountries = countries.filter(
            country => country.subregion === subregion.slug
        );
        const aoc = filteredCountries.sort((a, b) =>
            a.translations.spa.common.localeCompare(b.translations.spa.common)
        );
        // console.log(filteredCountries);

        setFilteredCountries(aoc);
        setCountries(aoc);
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                countries,
                subRegions,
                handleRegionChange,
                handleSubRegionChange,
                filteredCountries,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
