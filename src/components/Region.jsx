import useCountry from '../hooks/useCountry';

export default function Region() {
    const { regions, handleRegionChange } = useCountry();

    return (
        <>
            <div className='w-full flex justify-center'>
                <select
                    className='form-select border-dotted rounded-lg w-2/3'
                    onChange={handleRegionChange}
                >
                    <option value='0'>Todos</option>
                    {regions.map(region => (
                        <option
                            key={region.id}
                            value={region.id}
                        >
                            {region.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
