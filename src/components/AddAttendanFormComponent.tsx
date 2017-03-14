/**
 * Created by amunoz on 13/03/2017.
 */

import * as React from 'react';
import {TextInput, TextInputProps} from './TextInput';
import {Validations} from '../validations/validations'

export interface AttendantForm {
    name: string;
    surname: string;
    email: string;
}

export interface AddAttendantFormProps {
    onFormSubmit(attendant: AttendantForm): any | void;
}

export class AddAttendantForm extends React.Component<AddAttendantFormProps, {}> {

    props: AddAttendantFormProps;
    state: AttendantForm;

    resetState = (): void => {
        this.setState({name: '', surname: '', email: ''});
    };

    constructor(props: AddAttendantFormProps) {
        super(props);
        this.props = props;
        this.state = {name: '', surname: '', email: ''}
    };

    getInputs = (): TextInputProps[] => {
        return [
            {
                name: 'name',
                placeholder: 'name',
                errorMessage: 'Name must be provided',
                onChange: this.onChangeHandler,
                validateField: Validations.required
            },
            {
                name: 'surname',
                placeholder: 'surname',
                errorMessage: 'Surname must be provided',
                onChange: this.onChangeHandler,
                validateField: Validations.required
            },
            {
                name: 'email',
                placeholder: 'email',
                errorMessage: 'Proper email must be provided',
                onChange: this.onChangeHandler,
                validateField: Validations.validEmail
            }
        ];
    };

    formSubmitHandler= (e: any): void => {
        e.preventDefault();
        if (this.state.name &&  this.state.surname ) {
            this.props.onFormSubmit(this.state);
            this.resetState();
        }
    };

    onChangeHandler = (event: React.FormEvent<HTMLInputElement> ) => {
      let newState = Object.assign({}, this.state) ;
      newState[event.currentTarget.name] = event.currentTarget.value;
      this.setState(newState);
    };

    render() {
        let inputs = this.getInputs().map((input) => {return <TextInput key={input.name} {...input}/>});
        return(
            <form onSubmit={this.formSubmitHandler}>
            {inputs}
            <input type="submit"/>
            </form>
        );
    }

}

export default AddAttendantForm;