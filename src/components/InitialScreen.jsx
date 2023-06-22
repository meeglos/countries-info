import { useState } from 'react';
import useCountry from '../hooks/useCountry';
import { useNavigate } from 'react-router-dom';

const InitialScreen = () => {
    const navigate = useNavigate();

    const {
        numQuestions,
        timePerQuestion,
        continent,
        gameStarted,
        setNumQuestions,
        setTimePerQuestion,
        setContinent,
        setGameStarted,
    } = useCountry();

    const handleStartGame = () => {
        navigate(
            `/quiz-game?numQuestions=${numQuestions}&timePerQuestion=${timePerQuestion}&continent=${continent}`
        );
    };

    const handleBackHome = () => {
        navigate(`/`);
    };

    return (
        <div className='py-5 h-full bg-gradient-to-bl from-indigo-900  via-indigo-600 to-indigo-900'>
            <div className='flex flex-col justify-center items-center'>
                <div className='p-5 w-10/12 border-slate-200 rounded-lg border shadow-lg'>
                    <h1 className='text-slate-100 font-extrabold text-2xl font-dm uppercase tracking-wider text-center'>
                        country test
                    </h1>
                </div>

                <div className='my-8 flex flex-col justify-center items-center space-y-4'>
                    <p className='text-red-500 uppercase font-semibold tracking-widest text-xl'>
                        Configura el juego
                    </p>

                    <div>
                        <label
                            htmlFor='visitors'
                            className='block mb-1 text-sm font-medium text-white'
                        >
                            Número de preguntas:
                        </label>
                        <input
                            type='number'
                            value={numQuestions}
                            onChange={e =>
                                setNumQuestions(parseInt(e.target.value))
                            }
                            className='bg-yellow-500 hover:bg-yellow-600 text-center uppercase tracking-widest text-white rounded-lg shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='visitors'
                            className='block mb-1 text-sm font-medium text-white'
                        >
                            Tiempo por pregunta:
                        </label>

                        <input
                            type='number'
                            value={timePerQuestion}
                            onChange={e =>
                                setTimePerQuestion(parseInt(e.target.value))
                            }
                            className='bg-yellow-500 hover:bg-yellow-600 text-center uppercase tracking-widest text-white rounded-lg shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='countries'
                            className='block mb-1 text-sm font-medium text-white'
                        >
                            Selecciona un continente:
                        </label>
                        <select
                            value={continent}
                            className='bg-yellow-500 hover:bg-yellow-600 text-center uppercase tracking-widest text-white rounded-lg shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                            onChange={e => setContinent(e.target.value)}
                        >
                            <option value='Todos'>Todos</option>
                            <option value='Americas'>América</option>
                            <option value='Asia'>Asia</option>
                            <option value='Africa'>África</option>
                            <option value='Europe'>Europa</option>
                            <option value='Oceania'>Oceanía</option>
                        </select>
                    </div>
                    <div className='mt-8'>
                        <button
                            className='bg-green-500 hover:bg-green-600 mt-6 uppercase tracking-widest text-white rounded-sm shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                            onClick={handleStartGame}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 mr-3'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                                />
                            </svg>
                            jugar
                        </button>
                        <button
                            className='bg-sky-500 hover:bg-sky-600 mt-6 uppercase tracking-widest text-white rounded-sm shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                            onClick={handleBackHome}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 mr-3'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                                />
                            </svg>
                            inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitialScreen;
