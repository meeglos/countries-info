import useCountry from '../hooks/useCountry';

export default function Region() {
    const {
        regions,
        regionActual,
        setSubRegions,
        countries,
        setCountries,
        handleRegionChange,
        regionSelected,
    } = useCountry();

    return (
        <>
            <div className='w-full flex justify-center'>
                <select
                    className='form-select border-dotted rounded-lg w-2/3'
                    onChange={handleRegionChange}
                >
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
