import { languages } from '../data/languages';

export default function Language() {
    return (
        <>
            <label className='flex space-x-2 items-center justify-end'>
                <span className='text-gray-700'>Idioma</span>
                <select className='form-select px-4 w-32 rounded-lg border-dotted border-slate-200'>
                    <option>Español</option>
                    <option>Inglés</option>
                    <option>Alemán</option>
                    <option>Francés</option>
                </select>
            </label>
        </>
    );
}
