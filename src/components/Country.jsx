import useCountry from '../hooks/useCountry';

export default function Country() {
    const { countries, handleClickModal, handleSetCountryInfo } = useCountry();

    const independentCountries = countries.filter(
        obj => obj.independent === true
    );
    // console.log(independentCountries);
    const filteredCountries = independentCountries.sort((a, b) =>
        a.translations.spa.common.localeCompare(b.translations.spa.common)
    );

    return (
        <>
            {filteredCountries.map(country => (
                <div
                    key={country.cca2}
                    className='overflow-hidden rounded-lg bg-white shadow-xl border border-slate-200 cursor-pointer'
                    onClick={() => {
                        handleClickModal();
                        handleSetCountryInfo(country);
                    }}
                >
                    <div
                        className='flex h-32 items-center justify-end bg-cover bg-center p-4 relative'
                        style={{
                            backgroundImage: `url(${country.flags.svg})`,
                        }}
                    >
                        <p className='bg-black px-2 py-1 text-xs tracking-tight text-white opacity-75 shadow-lg absolute right-0 bottom-0 rounded-tl-lg text-right'>
                            {country.name.official} ({country?.capital?.eng})
                        </p>
                    </div>
                    <div className='flex justify-between border-b border-gray-300 bg-gray-100 px-4 pb-3 pt-4'>
                        <div className='text-xs font-bold uppercase tracking-wide text-gray-600'>
                            Continente:{' '}
                            <span className='font-bold text-red-500'>
                                {country.region}
                            </span>
                        </div>
                        <div className='text-xs font-bold uppercase tracking-wide text-gray-600'>
                            Región:{' '}
                            <span className='font-bold text-green-600'>
                                {country.subregion}
                            </span>
                        </div>
                    </div>
                    <div className='flex items-start justify-between p-4 text-gray-700'>
                        <div>
                            <p className='my-1 uppercase text-3xl lg:text-4xl leading-none text-gray-900 font-slabo'>
                                {country.translations.spa.common}
                            </p>
                            <div className='ml-1 w-56 text-lg flex flex-col'>
                                <p className='tracking-widest text-xs'>
                                    Capital:{' '}
                                </p>
                                <p className='-mt-2 font-lora'>
                                    {country?.capital?.spa}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between border-t border-gray-300 p-2 text-gray-600 mt-auto'>
                        <div className='flex items-center justify-start'>
                            <p>
                                <span className='block text-xs'>
                                    Población:
                                </span>{' '}
                                <span className='text-xs font-bold text-gray-900'>
                                    {country.population.toLocaleString('es-ES')}{' '}
                                    habs.
                                </span>
                            </p>
                        </div>

                        <div className='flex items-center justify-end'>
                            <p>
                                <span className='block pr-1 text-xs'>
                                    Extensión:
                                </span>{' '}
                                <span className='text-xs font-bold text-gray-900'>
                                    {country.area.toLocaleString('es-ES')} km
                                    <sup>2</sup>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
