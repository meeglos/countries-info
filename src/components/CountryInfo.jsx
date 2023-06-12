import useCountry from '../hooks/useCountry';

export default function CountryInfo() {
    const { handleClickModal, countryInfo, countries } = useCountry();

    const languages = Object.entries(countryInfo.languages).map(
        ([key, value], index, arr) => {
            const isLast = index === arr.length - 1;

            return (
                <span key={key}>
                    {value}
                    {!isLast && ', '}
                </span>
            );
        }
    );

    function getFlagByCca3(cca3) {
        const country = countries.find(country => country.cca3 === cca3);
        return country ? country.flags.svg : null;
    }

    const currencies = Object.entries(countryInfo.currencies).map(
        ([key, value], index, arr) => {
            const isLast = index === arr.length - 1;

            return (
                <span key={key}>
                    {value}
                    {!isLast && ', '}
                </span>
            );
        }
    );

    const renderObjectValuesWithCommas = obj => {
        if (obj) {
            const keys = Object.keys(obj);
            return keys.map((key, index) => (
                <div
                    className='flex items-center space-x-2'
                    key={key}
                >
                    <img
                        className='h-4 w-4 rounded-full border'
                        src={getFlagByCca3(obj[key])}
                        alt={`Flag of ${obj[key]}`}
                    />
                    <span>{obj[key]}</span>
                    {index !== keys.length - 1 && (
                        <span className='-mr-2'></span>
                    )}
                </div>
            ));
        } else {
            return 'Sin datos';
        }
    };

    return (
        <div className='relative h-full'>
            <div className='flex flex-col w-full items-center justify-center'>
                <div className='text-2xl font-bold'>
                    {countryInfo.translations.spa.common}
                </div>
                <div className='text-sm font-lora'>
                    {countryInfo.translations.spa.official}
                </div>
                <div className='my-4'>
                    <img
                        src={countryInfo.flags.svg}
                        alt={countryInfo.name.common}
                        className='w-48 rounded-lg border border-slate-300'
                    />
                </div>

                <div className='-m-1.5 overflow-auto'>
                    <div className='p-1.5 min-w-full inline-block align-middle'>
                        <div className='overflow-hidden'>
                            <div className='table border-collapse table-auto w-full divide-y divide-gray-200'>
                                <div className='table-row-group divide-y divide-gray-200 bg-white'>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Capital
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {countryInfo.capital?.spa}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Continente
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {countryInfo.continents}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Area
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {countryInfo.area.toLocaleString(
                                                'es-ES'
                                            )}{' '}
                                            kms
                                            <sup className='text-xs'>2</sup>
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Población
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {countryInfo.population.toLocaleString(
                                                'es-ES'
                                            )}{' '}
                                            habs.
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Gentilicio
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {countryInfo?.demonyms.eng.m}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Idioma(s)
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                                            {languages}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                            Fronteras
                                        </div>
                                        <div className='table-cell px-6 py-4 line-clamp-2 text-sm text-gray-800'>
                                            {renderObjectValuesWithCommas(
                                                countryInfo.borders
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute top-0 right-0'>
                <button onClick={handleClickModal}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-10 h-10'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
