export default function QuizLayout() {
    return (
        <>
            <div className='h-screen p-5 bg-gradient-to-bl from-indigo-900  via-indigo-500 to-indigo-900'>
                <div className='p-5 border-slate-200 rounded-lg border shadow-lg'>
                    <h1 className='text-slate-100 font-extrabold text-2xl font-dm uppercase tracking-wider text-center'>
                        country test
                    </h1>
                </div>
                <div className='flex flex-col items-center justify-center mt-10'>
                    <div className='w-full'>
                        <div className='w-full h-4 mb-1 bg-gray-200 rounded-full '>
                            <div
                                className='h-4 bg-yellow-500 rounded-full '
                                style={{ width: '45%' }}
                            ></div>
                        </div>
                        <div className='flex flex-row justify-between text-white text-sm font-thin tracking-wide mb-1'>
                            <div className='font-dm'>Pregunta 6 de 10</div>
                            <div className='font-dm'>25/100</div>
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='text-white text-xl tracking-widest'>
                            ¿Cuál es la capital de Canadá?
                        </div>
                        <div className='m-4 space-y-3'>
                            <div className='rounded-full text-sm text-gray-800 bg-yellow-500 font-bold font-dm px-4 py-2 tracking-widest'>
                                <span className='border rounded-full border-gray-800 px-1 mr-2 text-sm'>
                                    A
                                </span>
                                Copenhage
                            </div>
                            <div className='rounded-full text-sm text-gray-800 bg-yellow-500 font-bold font-dm px-4 py-2 tracking-widest'>
                                <span className='border rounded-full border-gray-800 px-1 mr-2 text-sm'>
                                    B
                                </span>
                                Manila
                            </div>
                            <div className='rounded-full text-sm text-gray-800 bg-green-500 font-bold font-dm px-4 py-2 tracking-widest flex relative'>
                                <span className='border rounded-full border-gray-800 px-1 mr-2 text-sm'>
                                    {' '}
                                    C{' '}
                                </span>
                                Ottawa
                                <span className='flex items-center absolute right-4'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth='{1.5}'
                                        stroke='currentColor'
                                        className='w-6 h-6 text-white'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                </span>
                            </div>

                            <div className='rounded-full text-sm text-gray-800 bg-yellow-500 font-bold font-dm px-4 py-2 tracking-widest'>
                                <span className='border rounded-full border-gray-800 px-1 mr-2 text-sm'>
                                    D
                                </span>
                                Caracas
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-around w-full'>
                        <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                            00:17
                        </div>
                        <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                            siguiente
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
