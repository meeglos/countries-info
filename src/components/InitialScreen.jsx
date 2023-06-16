import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialScreen = () => {
    const [numQuestions, setNumQuestions] = useState(5);
    const [timePerQuestion, setTimePerQuestion] = useState(10);
    const [continent, setContinent] = useState('');

    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate(
            `/quiz-game?numQuestions=${numQuestions}&timePerQuestion=${timePerQuestion}&continent=${continent}`
        );
    };
    return (
        <div>
            <label>
                Número de preguntas:
                <input
                    type='number'
                    value={numQuestions}
                    onChange={e => setNumQuestions(parseInt(e.target.value))}
                />
            </label>

            <label>
                Tiempo por pregunta:
                <input
                    type='number'
                    value={timePerQuestion}
                    onChange={e => setTimePerQuestion(parseInt(e.target.value))}
                />
            </label>

            <label>
                Continente:
                <select
                    value={continent}
                    onChange={e => setContinent(e.target.value)}
                >
                    <option value=''>Seleccione un continente</option>
                    <option value='Americas'>América</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>África</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceanía</option>
                </select>
            </label>

            <button onClick={handleStartGame}>JUGAR</button>
        </div>
    );
};

export default InitialScreen;
