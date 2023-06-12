import useCountry from '../hooks/useCountry';

export default function CountryInfo() {
    const { handleClickModal, countryInfo } = useCountry();

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
                <span key={key}>
                    <span>{obj[key]}</span>
                    {index !== keys.length - 1 && (
                        <span className='mr-1'>,</span>
                    )}
                </span>
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
                            <div className='table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700'>
                                <div className='table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800'>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Capital
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {countryInfo.capital?.spa}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Continente
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {countryInfo.continents}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Area
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {countryInfo.area.toLocaleString(
                                                'es-ES'
                                            )}{' '}
                                            kms
                                            <sup className='text-xs'>2</sup>
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Población
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {countryInfo.population.toLocaleString(
                                                'es-ES'
                                            )}{' '}
                                            habs.
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Gentilicio
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {countryInfo?.demonyms.eng.m}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Idioma(s)
                                        </div>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                            {languages}
                                        </div>
                                    </div>
                                    <div className='table-row'>
                                        <div className='table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                            Fronteras
                                        </div>
                                        <div className='table-cell px-6 py-4 line-clamp-2 text-sm text-gray-800 dark:text-gray-200'>
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

            <div className='absolute bottom-0 w-full flex flex-col space-y-2'>
                <button
                    className='w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-purple-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'
                    onClick={handleClickModal}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
