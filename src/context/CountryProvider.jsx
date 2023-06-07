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
    const [regionCfg, setRegionCfg] = useState(0);
    const [timerCfg, setTimerCfg] = useState(0);
    const [questionCfg, setQuestionCfg] = useState(5);
    const [isHidden, setIsHidden] = useState(false);
    const [randomElements, setRandomElements] = useState();

    // setCountries(extractedValues);

    const handleSetRegion = event => {
        const regionCfg = event.target.value;
        setRegionCfg(regionCfg);
        console.log(regionCfg);
    };

    const handleSetTimer = event => {
        const timerCfg = event.target.value;
        setTimerCfg(timerCfg);
        console.log(timerCfg);
    };

    const handleSetQuestions = event => {
        const questionCfg = event.target.value;
        setQuestionCfg(questionCfg);
        console.log(questionCfg);
    };

    const handleClickStart = () => {
        // console.log('Jugaré con ' + regionCfg);
        const title = 'Jugando con' + regionCfg;
        const questions = [];

        // ocultamos configuración y mostramos las preguntas
        setIsHidden(true);

        // mostramos un spinner con mensaje mientras se generan las preguntas

        // seleccionamos las preguntas en base a questionCfg y regionCfg
        const randomIndices = [];
        while (randomIndices.length < questionCfg) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            console.log(Math.random() * countries.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        const randomElements = randomIndices.map(index => countries[index]);
        setRandomElements(randomElements);
        // mostramos la pregunta 1, el puntaje acumulado, <pregunta 1 de 8>
    };

    const handleClickModal = () => {
        setModal(!modal);
    };

    const handleSearchKeyUp = event => {
        const search = event.target.value;

        const filteredCountries = independentCountries.filter(country =>
            country.translations.spa.common
                .toLowerCase()
                .includes(search.toLowerCase())
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
                subRegions,
                handleRegionChange,
                handleSubRegionChange,
                filteredCountries,
                filteredRegion,
                handleSearchKeyUp,
                modal,
                handleClickModal,
                handleSetRegion,
                handleSetTimer,
                handleSetQuestions,
                handleClickStart,
                regionCfg,
                timerCfg,
                questionCfg,
                isHidden,
                randomElements,
                independentCountries,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export { CountryProvider };
export default CountryContext;
