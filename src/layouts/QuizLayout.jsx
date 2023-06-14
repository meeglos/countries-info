import { useState, useEffect } from 'react';
import useCountry from '../hooks/useCountry';

const QuizLayout = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);

    const { countriesDB } = useCountry();

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
        const countries = countriesDB;
        return countries;
    };

    return (
        <div>
            <h1>Quiz Layout</h1>
            <h2>Question: {question}</h2>
            <p>Time left: {timeLeft} seconds</p>
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleAnswer(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizLayout;
