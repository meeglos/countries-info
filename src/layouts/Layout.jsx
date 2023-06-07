import useCountry from '../hooks/useCountry';
import Modal from 'react-modal';
import Region from '../components/Region';
import SubRegion from '../components/SubRegion';
import Language from '../components/Language';
import Search from '../components/Search';
import Country from '../components/Country';
import Quiz from '../components/Quiz';

Modal.setAppElement('#root');
export default function Layout() {
    const {
        countries,
        modal,
        handleClickModal,
        filteredCountries,
        independentCountries,
    } = useCountry();

    return (
        <>
            <div className='flex flex-col items-center justify-center p-5'>
                <h1 className='font-lora font-bold text-4xl'>
                    Países y capitales del mundo
                </h1>
                <p className='font-dm italic text-sm w-full lg:w-2/3 my-2 text-center'>
                    Incluye todos los países y regiones{' '}
                    <span className='underline decoration-wavy decoration-1 decoration-green-600'>
                        no independientes
                    </span>{' '}
                    reconocidos por la ONU hasta el año 2023.
                </p>
                <div className='flex flex-col lg:flex-row w-full lg:w-2/3 lg:justify-between p-2 space-y-2 items-center border rounded-lg border-dotted border-slate-300'>
                    <div className='w-full lg:w-1/2'>
                        <Search />
                    </div>
                    <div className='w-full lg:w-2/3'>
                        <div className='p-2'>
                            <button
                                onClick={() => {
                                    handleClickModal();
                                }}
                                className='inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg border-gray-800 text-white text-center font-dm tracking-tight text-sm xl:text-lg p-2 w-full'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                                    />
                                </svg>

                                <span className='px-2'>
                                    ¡Pon a prueba tus conocimientos!
                                </span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                                    />
                                </svg>
                            </button>
                        </div>
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
                <div className='flex flex-col w-full lg:w-2/3 '>
                    <div className='w-full my-3'>
                        <p className='text-bold font-dm text-sm'>
                            Mostrando {Object(countries).length} países
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                        <Country />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modal}
                style={{ background: '#ff0' }}
            >
                <Quiz />
            </Modal>
        </>
    );
}
