import { createContext, useState } from 'react';
import { regions as regionsDB } from '../data/regions';
import { subregions as subregionsDB } from '../data/subregions';
import { countries as countriesDB } from '../data/countries';

const CountryContext = createContext();

const independentCountries = countriesDB.filter(
    obj => obj.independent === true
);

const CountryProvider = ({ children }) => {
    const [regions, setRegions] = useState(regionsDB);
    const [subRegions, setSubRegions] = useState(subregionsDB);
    const [countries, setCountries] = useState(independentCountries);
    const [filteredCountries, setFilteredCountries] = useState();
    const [filteredRegion, setFilteredRegion] = useState();
    const [modal, setModal] = useState(false);
    const [countryInfo, setCountryInfo] = useState({});

    const handleSetCountryInfo = countryInfo => {
        setCountryInfo(countryInfo);
    };

    const handleClickModal = () => {
        setModal(!modal);
    };

    const handleSearchKeyUp = event => {
        const search = event.target.value;

        const filteredCountries = independentCountries.filter(
            country =>
                country.translations.spa.common
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                country.capital.spa.toLowerCase().includes(search.toLowerCase())
        );

        setCountries(filteredCountries);
    };

    const handleRegionChange = event => {
        const id = event.target.value;

        if (id !== '0') {
            const filteredRegion = regions.filter(
                region => region.id.toString() === id
            )[0];

            // Filtro los países por la región seleccionada
            const filteredCountries = independentCountries.filter(
                country => country.region === filteredRegion.slug
            );

            // Ordeno alfabéticamente los países - alfabetically ordered countries
            const aoc = filteredCountries.sort((a, b) =>
                a.translations.spa.common.localeCompare(
                    b.translations.spa.common
                )
            );

            // Filtro las subregiones según la región seleccionada
            const filteredSubRegions = subregionsDB.filter(
                subregion => subregion.region_id.toString() === id
            );

            setCountries(aoc);
            setFilteredRegion(filteredRegion);
            setSubRegions(filteredSubRegions);
        } else {
            console.log('ahora vuelvo al inicio');
            const independentCountries = countriesDB.filter(
                obj => obj.independent === true
            );

            const aoc = independentCountries.sort((a, b) =>
                a.translations.spa.common.localeCompare(
                    b.translations.spa.common
                )
            );

            setCountries(aoc);
        }
    };

    const handleSubRegionChange = event => {
        const subregionId = event.target.value;

        if (subregionId !== '0') {
            const subregion = subregionsDB.filter(
                subregion => subregion.id.toString() === subregionId
            )[0];

            // Filtrar los países por la subregión seleccionada
            const filteredCountries = independentCountries.filter(
                country => country.subregion === subregion.slug
            );

            // Ordenamos los países alfabéticamente
            const aoc = filteredCountries.sort((a, b) =>
                a.translations.spa.common.localeCompare(
                    b.translations.spa.common
                )
            );

            setFilteredCountries(aoc);
            setCountries(aoc);
        } else {
            const filteredCountries = independentCountries.filter(
                country => country.region === filteredRegion.slug
            );

            const aoc = filteredCountries.sort((a, b) =>
                a.translations.spa.common.localeCompare(
                    b.translations.spa.common
                )
            );
            setCountries(aoc);
        }
    };

    return (
        <CountryContext.Provider
            value={{
                regions,
                countries,
                countriesDB,
                subRegions,
                handleRegionChange,
                handleSubRegionChange,
                filteredCountries,
                filteredRegion,
                handleSearchKeyUp,
                modal,
                handleClickModal,
                independentCountries,
                countryInfo,
                handleSetCountryInfo,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
