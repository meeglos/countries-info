import { regions } from '../data/regions';

export default function Region() {
    return (
        <>
            <div className='w-full flex justify-center'>
                <select className='form-select border-dotted rounded-lg w-2/3'>
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
