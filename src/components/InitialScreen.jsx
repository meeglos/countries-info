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

    return (
        <div>
            <div className='h-screen p-5 bg-gradient-to-bl from-indigo-900  via-indigo-600 to-indigo-900'>
                <div className='p-5 border-slate-200 rounded-lg border shadow-lg'>
                    <h1 className='text-slate-100 font-extrabold text-2xl font-dm uppercase tracking-wider text-center'>
                        country test
                    </h1>
                </div>

                <div className='my-8 flex flex-col justify-center items-center space-y-4'>
                    <p className='text-red-500 uppercase font-extralight tracking-widest text-xl'>
                        Configura el juego
                    </p>

                    <div>
                        <label
                            htmlFor='visitors'
                            className='block mb-2 text-sm font-medium text-white'
                        >
                            Número de preguntas
                        </label>
                        <input
                            type='number'
                            value={numQuestions}
                            onChange={e =>
                                setNumQuestions(parseInt(e.target.value))
                            }
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='visitors'
                            className='block mb-2 text-sm font-medium text-white'
                        >
                            Tiempo por pregunta:
                        </label>

                        <input
                            type='number'
                            value={timePerQuestion}
                            onChange={e =>
                                setTimePerQuestion(parseInt(e.target.value))
                            }
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='countries'
                            className='block mb-2 text-sm font-medium text-white'
                        >
                            Selecciona un continente
                        </label>
                        <select
                            value={continent}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 y-700 -gray-600 older-gray-400 hite ring-indigo-600 '
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
                    <button
                        className='bg-yellow-500 mt-6 rounded-full uppercase tracking-widest text-gray-700 border-red-600 border-2 px-6 py-2 text-sm flex items-center font-semibold font-dm'
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
                        Comenzar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitialScreen;
