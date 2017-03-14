/**
 * Created by amunoz on 13/03/2017.
 */
const validator = require('validator');

export class Validations {
    static required = (value: any): boolean => {
        return !validator.isEmpty(value);
    };

    static validEmail = (value: any): boolean => {
        return validator.isEmail(value);
    };
}

export default Validations;
