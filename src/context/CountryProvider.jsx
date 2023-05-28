import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';
import { subregions as subregionsDB } from '../data/subregions';
import { countries as countriesDB } from '../data/countries';

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState(subregionsDB);
    const [countries, setCountries] = useState(countriesDB);
    const [filteredCountries, setFilteredCountries] = useState();
    const [filteredRegion, setFilteredRegion] = useState();

    const handleRegionChange = event => {
        const id = event.target.value;
        const filteredRegion = regions.filter(
            region => region.id.toString() === id
        )[0];

        // Filtrar los países por la región seleccionada
        const filteredCountries = countriesDB.filter(
            country => country.region === filteredRegion.slug
        );

        // Ordeno alfabéticamente los países - alfabetically ordered countries
        const aoc = filteredCountries.sort((a, b) =>
            a.translations.spa.common.localeCompare(b.translations.spa.common)
        );

        // Filtro las subregiones según la región seleccionada
        const filteredSubRegions = subregionsDB.filter(
            subregion => subregion.region_id.toString() === id
        );

        setSubRegions(filteredSubRegions);
        setCountries(aoc);
        setFilteredRegion(filteredRegion);
    };

    const handleSubRegionChange = event => {
        const subregionId = event.target.value;
        const subregion = subregionsDB.filter(
            subregion => subregion.id.toString() === subregionId
        )[0];

        // Filtrar los países por la subregión seleccionada
        const filteredCountries = countriesDB.filter(
            country => country.subregion === subregion.slug
        );

        // Ordenamos los países alfabéticamente
        const aoc = filteredCountries.sort((a, b) =>
            a.translations.spa.common.localeCompare(b.translations.spa.common)
        );

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
                filteredRegion,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
