import { useState, useEffect } from 'react';
import useCountry from '../hooks/useCountry';
import { useNavigate } from 'react-router-dom';

const QuizLayout = () => {
    const {
        independentCountries,
        score,
        setScore,
        numQuestions,
        timePerQuestion,
        continent,
        gameStarted,
        correctAnswers,
        setCorrectAnswers,
    } = useCountry();

    const navigate = useNavigate();

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [countryFlag, setCountryFlag] = useState('');

    const [backgroundColor, setBackgroundColor] = useState('bg-yellow-500');
    const [defaultColor, setDefaultColor] = useState('bg-yellow-500');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [width, setWidth] = useState('10%');

    const [questionIndex, setQuestionIndex] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        setScore(0);
        setQuestionIndex(1);
        setGameOver(false);
        setWidth('0%');
        setTimeLeft(timeLeft);
        setCorrectAnswers(0);
    };

    useEffect(() => {
        if (!gameOver && questionIndex === 1) {
            startGame();
        }
    }, []);

    const getQuestionData = continent => {
        let countries;
        if (continent === 'Todos') {
            countries = independentCountries;
        } else {
            countries = independentCountries.filter(country => {
                return country.region === continent;
            });
        }
        return countries;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(interval);
            handleAnswer('');
        }

        return () => {
            clearInterval(interval);
        };
    }, [timeLeft, gameOver]);

    const actualizarWidth = () => {
        const newWidth = `${questionIndex * (100 / numQuestions)}%`;
        setWidth(newWidth);
    };

    const generateQuestion = () => {
        const countryData = getQuestionData(continent);

        if (countryData) {
            const countryKeys = Object.keys(countryData);
            const randomKey =
                countryKeys[Math.floor(Math.random() * countryKeys.length)];
            const capital = countryData[randomKey].capital.spa;
            const countryFlag = countryData[randomKey].flags.svg;

            const incorrectOptions = generateIncorrectOptions(
                countryData,
                capital,
                randomKey
            );

            const allOptions = shuffleArray([capital, ...incorrectOptions]);

            setQuestion(countryData[randomKey].translations.spa.common);
            setOptions(allOptions);
            setCountryFlag(countryFlag);
            setCorrectAnswer(capital.trim());
            setSelectedOptionIndex(-1);
        }
    };

    const generateIncorrectOptions = (
        countryData,
        correctAnswer,
        correctKey
    ) => {
        const incorrectOptions = [];
        const countryKeys = Object.keys(countryData);

        while (incorrectOptions.length < 3) {
            const randomKey =
                countryKeys[Math.floor(Math.random() * countryKeys.length)];
            if (
                randomKey !== correctKey &&
                countryData[randomKey].capital &&
                countryData[randomKey].capital.spa &&
                countryData[randomKey].capital.spa !== correctAnswer &&
                !incorrectOptions.includes(countryData[randomKey].capital.spa)
            ) {
                incorrectOptions.push(countryData[randomKey].capital.spa);
            }
        }

        return incorrectOptions;
    };

    const handleAnswer = selectedOption => {
        const selectedOptionTrimmed = selectedOption.trim();
        if (selectedOptionTrimmed === correctAnswer) {
            setScore(prevScore => prevScore + 100 / numQuestions);
            setCorrectAnswers(correctAnswers => correctAnswers + 1);
            setBackgroundColor('bg-green-500');
        } else {
            setBackgroundColor('bg-red-500');
        }

        const selectedOptionIndex = options.indexOf(selectedOption);
        setSelectedOptionIndex(selectedOptionIndex);

        setTimeLeft(timePerQuestion);

        setTimeout(() => {
            setSelectedOptionIndex(-1);
            if (questionIndex < numQuestions) {
                setQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setGameOver(true);
            }
        }, 1000);
    };

    useEffect(() => {
        if (questionIndex !== 0) {
            generateQuestion();
            actualizarWidth();
        }
    }, [questionIndex]);

    const shuffleArray = array => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const changeConfig = () => {
        navigate(`/initial-screen`);
    };

    return (
        <div>
            <div className='h-screen p-5 bg-gradient-to-bl from-indigo-900  via-indigo-600 to-indigo-900'>
                <div className='p-5 border-slate-200 rounded-lg border shadow-lg'>
                    <h1 className='text-slate-100 font-extrabold text-2xl font-dm uppercase tracking-wider text-center'>
                        country test
                    </h1>
                </div>
                {gameOver ? (
                    <div className='flex flex-col items-center justify-center mt-10'>
                        <h1 className='text-2xl text-red-500 uppercase my-6'>
                            Juego terminado
                        </h1>
                        <div className='text-2xl text-white my-6 flex flex-col justify-center items-center space-y-2'>
                            <p>Puntaje obtenido:</p>
                            <p className='text-yellow-500 font-bold text-3xl'>
                                {score.toFixed(2)}
                                <span className='text-xl'>/100</span>
                            </p>
                            <p className='text-lg text-red-500'>
                                ({correctAnswers} aciertos de {numQuestions})
                            </p>
                        </div>
                        <button
                            className='bg-green-500 hover:bg-green-600 mt-6 uppercase tracking-widest text-white rounded-sm shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                            onClick={startGame}
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
                        <button
                            className='bg-blue-500 hover:bg-blue-600 mt-6 uppercase tracking-widest text-white rounded-sm shadow-sm  px-6 py-2 text-sm flex items-center justify-center font-semibold font-dm w-48'
                            onClick={changeConfig}
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
                                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                                />
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                            </svg>
                            Ajustes
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-col items-center justify-center mt-10'>
                            <div className='w-full'>
                                <div className='w-full h-4 mb-1 bg-gray-200 rounded-full '>
                                    <div
                                        className='h-4 bg-green-500 rounded-full '
                                        style={{ width }}
                                    ></div>
                                </div>
                                <div className='flex flex-row justify-between text-white text-sm font-thin tracking-wide mb-1'>
                                    <div className='font-dm'>
                                        Pregunta {questionIndex} de{' '}
                                        {numQuestions}
                                    </div>
                                    <div className='font-dm'>
                                        {score.toFixed(2)}/100
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-6'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='text-white text-xl tracking-widest text-center'>
                                    ¿Cuál es la capital de {question}?
                                </div>
                                <img
                                    src={countryFlag}
                                    alt='Country Flag'
                                    className='w-56 h-[126px] rounded-lg border border-indigo-600 my-6 shadow-md object-cover'
                                />
                            </div>
                            <div className='m-4 space-y-3'>
                                <ul>
                                    {options.map((option, index) => (
                                        <li
                                            className={`rounded-full text-sm text-gray-800 font-bold font-dm px-4 py-2 mb-3 tracking-widest cursor-pointer flex ${
                                                selectedOptionIndex === index
                                                    ? backgroundColor
                                                    : defaultColor
                                            }`}
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                        >
                                            <span className='border rounded-full border-gray-800 px-1 mr-2 text-sm'>
                                                {index + 1}
                                            </span>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex flex-row justify-around w-full mt-10'>
                                <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                                    {timeLeft}
                                </div>
                                <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                                    siguiente
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizLayout;
