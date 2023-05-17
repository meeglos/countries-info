import { useContext } from 'react';
import CountryContext from '../context/CountryProvider';

const useCountry = () => {
    return useContext(CountryContext);
};

export default useCountry;
