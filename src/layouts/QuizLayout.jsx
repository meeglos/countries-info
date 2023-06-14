import { useState, useEffect } from 'react';
import useCountry from '../hooks/useCountry';

const QuizLayout = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(5);

    const [backgroundColor, setBackgroundColor] = useState('bg-yellow-500');
    const [defaultColor, setDefaultColor] = useState('bg-yellow-500');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [width, setWidth] = useState('10%');

    const [questionIndex, setQuestionIndex] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const { independentCountries, score, setScore } = useCountry();

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
    }, [timeLeft]);

    // const updateAnswer = answer => {
    //     const correctAnswer = countryData[currentQuestion].capital.spa;
    //     const isCorrect = answer === correctAnswer;

    //     setCountryData(prevData => {
    //         const updatedData = [...prevData];
    //         updatedData[currentQuestion].answered = true;
    //         updatedData[currentQuestion].isCorrect = isCorrect;
    //         return updatedData;
    //     });

    //     getNextQuestion();
    // };

    // const getNextQuestion = () => {
    //     if (questionIndex < 9) {
    //         setScore(prevScore => prevScore + 2);
    //         setQuestionIndex(prevIndex => prevIndex + 1);
    //     } else {
    //         setGameOver(true);
    //     }
    // };

    const startGame = () => {
        setScore(0);
        setQuestionIndex(0);
        setGameOver(false);
        setWidth('0%');
    };

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
            const correctAnswer = countryData[randomKey].capital.spa;
            const incorrectOptions = generateIncorrectOptions(
                countryData,
                correctAnswer,
                randomKey
            );

            setQuestion(countryData[randomKey].translations.spa.common);
            setOptions([correctAnswer, ...incorrectOptions]);
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
                !incorrectOptions.includes(countryData[randomKey].capital.spa)
            ) {
                incorrectOptions.push(countryData[randomKey].capital.spa);
            }
        }

        return incorrectOptions;
    };

    const handleAnswer = selectedOption => {
        const correctAnswer = options[0];
        const selectedOptionIndex = options.indexOf(selectedOption);

        if (selectedOption === correctAnswer) {
            console.log('Respuesta correcta');
            setScore(prevScore => prevScore + 10);
            setBackgroundColor('bg-green-500');
        } else {
            console.log('Respuesta incorrecta');
            setBackgroundColor('bg-red-500');
        }
        setSelectedOptionIndex(selectedOptionIndex);

        setTimeLeft(5);

        setTimeout(() => {
            setSelectedOptionIndex(-1);
            generateQuestion();
            actualizarWidth();
            if (questionIndex < 9) {
                setQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setGameOver(true);
            }
        }, 1000);
    };

    const getQuestionData = () => {
        const countries = independentCountries;
        return countries;
    };

    return (
        <div>
            {gameOver ? (
                <div>
                    <h1>Juego terminado</h1>
                    <p>Puntaje obtenido: {score}</p>
                    <button onClick={startGame}>Comenzar</button>
                </div>
            ) : (
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
                                    className='h-4 bg-green-500 rounded-full '
                                    style={{ width: width }}
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
    );
};

export default QuizLayout;
