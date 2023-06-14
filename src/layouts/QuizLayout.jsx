import { useState, useEffect } from 'react';
import useCountry from '../hooks/useCountry';

const QuizLayout = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);

    const { independentCountries } = useCountry();

    useEffect(() => {
        startTimer();
        generateQuestion();
    }, []);

    const startTimer = () => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
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
        if (selectedOption === options[0]) {
            console.log('Respuesta correcta');
        } else {
            console.log('Respuesta incorrecta');
        }

        setTimeLeft(20);
        generateQuestion();
    };

    const getQuestionData = () => {
        const countries = independentCountries;
        return countries;
    };

    return (
        <div>
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
                                style={{ width: '45%' }}
                            ></div>
                        </div>
                        <div className='flex flex-row justify-between text-white text-sm font-thin tracking-wide mb-1'>
                            <div className='font-dm'>Pregunta 6 de 10</div>
                            <div className='font-dm'>25/100</div>
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
                                    className='rounded-full text-sm text-gray-800 bg-yellow-500 font-bold font-dm px-4 py-2 tracking-widest mb-3 cursor-pointer'
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
                    <div className='flex flex-row justify-around w-full'>
                        <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                            {timeLeft}
                        </div>
                        <div className='border border-indigo-400 rounded-full px-4 py-2 text-slate-300 text-lg'>
                            siguiente
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizLayout;
