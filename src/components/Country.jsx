export default function Country({ country }) {
    const {
        region,
        subregion,
        name,
        capital,
        population,
        area,
        flags,
        cca2,
        translations,
    } = country;

    return (
        <>
            <div className='flex mt-2 border p-2 border-slate-400 rounded-lg space-x-4 justify-around w-full items-center'>
                <img
                    className='w-10 h-10 object-center rounded-full border border-slate-200'
                    src={flags.png}
                    alt={cca2}
                />
                <p>{translations.spa.common}</p>
                <p>{capital}</p>
                <p>
                    {region}/{subregion}
                </p>
                <p>
                    {population} <span className='text-xs'>habs.</span>
                </p>
                <p>
                    {area} km
                    <sup>2</sup>
                </p>
            </div>
        </>
    );
}
