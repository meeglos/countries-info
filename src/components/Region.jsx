import useCountry from '../hooks/useCountry';

export default function Region({ region }) {
    const { handleRegionClick, regionActual } = useCountry();
    const { nombre, slug, id } = region;

    return (
        <>
            <div className='p-4'>
                <label className='flex items-center'>
                    <input
                        type='checkbox'
                        value={slug}
                        className='form-checkbox'
                        onClick={() => handleRegionClick(id)}
                    />
                    <span className='ml-2'>{nombre}</span>
                </label>
            </div>
        </>
    );
}
