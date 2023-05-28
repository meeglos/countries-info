import useCountry from '../hooks/useCountry';
// import Country from '../components/Country';
import Region from '../components/Region';
import SubRegion from '../components/SubRegion';
import Language from '../components/Language';
import Search from '../components/Search';
import Country from '../components/Country';

export default function Layout() {
    return (
        <div className='flex flex-col items-center justify-center p-5'>
            <h1 className='font-lora font-bold text-4xl'>
                Países y capitales del mundo
            </h1>
            <p className='font-dm italic text-lg w-full lg:w-2/3 my-2 text-center'>
                Incluye todos los países reconocidos por la ONU hasta el año
                2023.
            </p>
            <div className='flex justify-between items-center py-2 my-2 w-full lg:w-2/3'>
                <div className='w-1/2'>
                    <Search />
                </div>
                <div className='w-1/2'>
                    <Language />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row w-full lg:w-2/3 lg:justify-between  p-2 space-y-2 items-center border rounded-lg border-dotted border-slate-300'>
                <div className='w-full lg:w-1/2'>
                    <Region />
                </div>
                <div className='w-full lg:w-1/2'>
                    <SubRegion />
                </div>
            </div>
            <div className='flex flex-col w-full lg:w-2/3 p-2'>
                <div className='w-full my-2'>
                    <p>Mostrando los paises de ... </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                    <Country />
                </div>
            </div>
        </div>
    );
}
