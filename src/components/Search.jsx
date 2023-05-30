import useCountry from '../hooks/useCountry';

export default function Search() {
    const { handleSearchKeyUp } = useCountry();
    return (
        <>
            <label className='block'>
                <input
                    type='text'
                    className='form-input mt-1 block w-full border-slate-300 border-dotted rounded-lg'
                    placeholder='Ingrese el nombre del país - Ej: España'
                    onKeyUp={handleSearchKeyUp}
                />
            </label>
        </>
    );
}
