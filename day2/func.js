import {odd, even} from './var';

function checkOddorEven(number)
{
    if(number%2)
    {
        return odd;
    }
    else
    {
        return even;
    }
}

export default checkOddorEven;