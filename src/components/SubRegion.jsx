import { subregions } from '../data/subregions';

export default function SubRegion() {
    return (
        <>
            <div className='w-full flex justify-center'>
                <select className='form-select border-dotted rounded-lg w-2/3'>
                    {subregions.map(subregion => (
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
