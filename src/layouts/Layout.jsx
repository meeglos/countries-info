import useCountry from '../hooks/useCountry';
import Country from '../components/Country';
import Region from '../components/Region';
import Language from '../components/Language';
import Search from '../components/Search';

import { countries as data } from '../data/countries';
import { regions } from '../data/regions';

export default function Layout() {
    const { regions, regionActual } = useCountry();
    const countries = data.filter(
        country => country.region === regionActual.slug
    );

    const count = Object.keys(countries).length;
    console.log(count);

    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <h1 className='font-lora font-bold text-4xl'>
                Países y capitales de {regionActual.nombre}
            </h1>
            <p className='font-dm italic text-lg w-2/3 my-2 text-center'>
                Incluye todos los países reconocidos por la ONU hasta el año
                2023.
            </p>
            <div className='flex justify-between items-center py-2 my-2 w-2/3'>
                <div className='w-1/2'>
                    <Search />
                </div>
                <div className='w-1/2'>
                    <Language />
                </div>
            </div>
            <div className='flex flex-col w-2/3 justify-between items-center border rounded-lg border-dotted border-slate-300'>
                <div className='w-full flex justify-between items-center'>
                    {regions.map(region => (
                        <Region
                            key={region.id}
                            region={region}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-2/3 p-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                    {countries.map(country => (
                        <Country
                            key={country.cca2}
                            country={country}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
