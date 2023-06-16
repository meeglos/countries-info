import { useState, useEffect } from 'react';
import useCountry from '../hooks/useCountry';

const QuizLayout = () => {
    const { independentCountries, score, setScore } = useCountry();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);
    const [correctAnswer, setCorrectAnswer] = useState('');

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
        setTimeLeft(20);
    };

    useEffect(() => {
        if (!gameOver && questionIndex === 1) {
            startGame();
        }
    }, []);

    const getQuestionData = () => {
        const countries = independentCountries;
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
        const newWidth = `${questionIndex * 10}%`;
        setWidth(newWidth);
    };

    const generateQuestion = () => {
        const countryData = getQuestionData();

        if (countryData) {
            const countryKeys = Object.keys(countryData);
            const randomKey =
                countryKeys[Math.floor(Math.random() * countryKeys.length)];
            const capital = countryData[randomKey].capital.spa;

            const incorrectOptions = generateIncorrectOptions(
                countryData,
                capital,
                randomKey
            );

            const allOptions = shuffleArray([capital, ...incorrectOptions]);

            setQuestion(countryData[randomKey].translations.spa.common);
            setOptions(allOptions);
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
            setScore(prevScore => prevScore + 10);
            setBackgroundColor('bg-green-500');
        } else {
            setBackgroundColor('bg-red-500');
        }

        const selectedOptionIndex = options.indexOf(selectedOption);
        setSelectedOptionIndex(selectedOptionIndex);

        setTimeLeft(20);

        setTimeout(() => {
            setSelectedOptionIndex(-1);
            if (questionIndex < 10) {
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
                        <p className='text-2xl text-white my-6'>
                            Puntaje obtenido: {score}
                        </p>
                        <button
                            className='bg-yellow-500 mt-6 rounded-full uppercase tracking-widest text-gray-700 border-red-600 border-2 px-6 py-2 text-lg font-semibold font-dm'
                            onClick={startGame}
                        >
                            Comenzar
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
                                        Pregunta {questionIndex} de 10
                                    </div>
                                    <div className='font-dm'>{score}/100</div>
                                </div>
                            </div>
                        </div>
                        <div className='my-5'>
                            <div className='text-white text-xl tracking-widest text-center'>
                                ¿Cuál es la capital de {question}?
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
