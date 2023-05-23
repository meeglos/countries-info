import useCountry from '../hooks/useCountry';

export default function SubRegion() {
    const {
        regions,
        regionActual,
        subRegions,
        countries,
        setCountries,
        handleSubRegionChange,
        regionSelected,
    } = useCountry();

    return (
        <>
            <div className='w-full flex justify-center'>
                <select
                    className='form-select border-dotted rounded-lg w-2/3'
                    onChange={handleSubRegionChange}
                >
                    {subRegions.map(subregion => (
                        <option
                            key={subregion.id}
                            value={subregion.id}
                        >
                            {subregion.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
