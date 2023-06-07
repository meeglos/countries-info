import useCountry from '../hooks/useCountry';

export default function Quiz() {
    const {
        modal,
        handleSetRegion,
        handleSetTimer,
        handleSetQuestions,
        handleClickModal,
        handleClickStart,
        regionCfg,
        timerCfg,
        questionCfg,
        isHidden,
        randomElements,
    } = useCountry();

    return (
        <div className='relative h-full'>
            <div className='flex items-center justify-center h-20 border rounded-lg bg-purple-500 text-slate-200'>
                <p className='text-2xl font-bold text-center'>Flag Test</p>
            </div>
            <div
                id='testConfig'
                className={isHidden ? 'hidden' : ''}
            >
                <div className='flex flex-col items-center justify-start border-slate-300 my-4 space-y-4 rounded-lg border-2 p-10 w-full'>
                    <div className='mb-4 flex items-center justify-center flex-col space-y-2 w-7/8 bg-slate-200'>
                        <p className='text-lg text-center font-dm'>
                            ¿en qué continente quieres jugar?
                        </p>
                        <select
                            className='form-select border-dotted rounded-lg w-full'
                            onChange={handleSetRegion}
                        >
                            <option value='0'>Todos</option>
                            <option value='Americas'>América</option>
                            <option value='Africa'>Africa</option>
                            <option value='Asia'>Asia</option>
                            <option value='Europe'>Europa</option>
                            <option value='Oceania'>Oceanía</option>
                        </select>
                    </div>
                    <div className='mb-4 flex items-center justify-center flex-col space-y-2 w-7/8 bg-yellow-100'>
                        <p className='text-lg text-center font-dm'>
                            ¿quieres jugar con tiempo?
                        </p>
                        <select
                            className='form-select border-dotted rounded-lg  w-full'
                            onChange={handleSetTimer}
                        >
                            <option value='0'>No, sin reloj</option>
                            <option value='10'>Sí, 10 seg x pregunta</option>
                            <option value='20'>Sí, 20 seg x pregunta</option>
                            <option value='30'>Sí, 30 seg x pregunta</option>
                        </select>
                    </div>
                    <div className='mb-4 flex items-center justify-center flex-col space-y-2 w-7/8'>
                        <p className='text-lg text-center font-dm'>
                            ¿cuántas preguntas quieres?
                        </p>
                        <select
                            className='form-select border-dotted rounded-lg  w-full'
                            onChange={handleSetQuestions}
                        >
                            <option value='5'>5 preguntas</option>
                            <option value='8'>8 preguntas</option>
                            <option value='10'>10 preguntas</option>
                            <option value='249'>Todas</option>
                        </select>
                    </div>
                </div>
                <div className='absolute bottom-0 w-full flex flex-col space-y-2'>
                    <button
                        className='w-full h-12 px-6 text-slate-800 transition-colors duration-150 bg-yellow-500 rounded-lg focus:shadow-outline hover:bg-yellow-600'
                        onClick={() => handleClickStart()}
                    >
                        Comenzar
                    </button>
                    <button
                        className='w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-purple-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'
                        onClick={handleClickModal}
                    >
                        Cerrar
                    </button>
                </div>
            </div>

            <div
                id='testDisplay'
                className={isHidden ? 'none' : 'hidden'}
            >
                <div className='bg-gradient-to-r from-red-500 to-red-800 my-4 rounded-lg p-6 text-white'>
                    <div className='p-8'>
                        {randomElements?.map(rElem => (
                            <p key={rElem.cca3}>
                                {rElem.translations.spa.common} :
                                <span> {rElem.capital}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
