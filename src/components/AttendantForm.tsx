/**
 * Created by amunoz on 14/03/2017.
 */
import * as React from 'react';
import {SelectInput, SelectOption} from './SelectInput';
import {TextInput, TextInputProps} from './TextInput';
import {ButtonInput} from './ButtonInput';
import {Validations} from '../validations/validations';

import {Course} from '../model/course';
import {Elective} from '../model/elective';
import {Attendant} from '../model/Attendant';

interface CoursesSelectProps {
    courses: Course[];
    electives: Elective[];
    onSubmit(result: Attendant): void;
}

export class AttendantForm extends React.Component<CoursesSelectProps, {}> {

    state: Attendant;
    props: CoursesSelectProps;

    constructor(props: CoursesSelectProps) {
        super(props);
        this.props = props;
        this.state = this.getInitialState();
    }

    getInitialState = (): Attendant => {
      return new Attendant();
    };

    getInputs = (): TextInputProps[] => {
        return [
            {
                name: 'name',
                placeholder: 'name',
                errorMessage: 'Name must be provided',
                onChange: this.onChangeTextInput,
                validateField: Validations.required
            },
            {
                name: 'surname',
                placeholder: 'surname',
                errorMessage: 'Surname must be provided',
                onChange: this.onChangeTextInput,
                validateField: Validations.required
            },
            {
                name: 'email',
                placeholder: 'email',
                errorMessage: 'Proper email must be provided',
                onChange: this.onChangeTextInput,
                validateField: Validations.validEmail
            }
        ];
    };

    onSelectCourse = (value: any): void => {
        let newState = Object.assign({}, this.state, { courseId: Number(value) }) ;
        this.setState(newState);
    };

    onSelectElective = (value: any): void => {
        let newState = Object.assign({}, this.state, { electiveId: Number(value) }) ;
        this.setState(newState);
    };

    onChangeTextInput  = (event: React.FormEvent<HTMLInputElement> ) => {
        let newState = Object.assign({}, this.state) ;
        newState[event.currentTarget.name] = event.currentTarget.value;
        this.setState(newState);
    };

    validateForm = (): boolean => {
        let result = true;
        if (!this.state.name ) { result = false }
        if (!this.state.surname ) { result = false }
        if (!this.state.email ) { result = false }
        if (!this.state.courseId ) { result = false }
        if (!this.state.electiveId ) { result = false }
        return result;
    };

    onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (this.validateForm()) {
            this.props.onSubmit(this.state);
        } else {
            console.log('Error de validación');
        }
    };

    render() {

        let coursesOptions =  this.props.courses.map( (x): SelectOption  => {
            return { value: x.id , label: x.name }
        });

        let electivesOptions = this.props.electives
            .filter( x => x.courseId === this.state.courseId)
            .map( (x): SelectOption => {
                return { value: x.id , label: x.name }
            });

        return (
            <form className="form-horizontal" onSubmit={this.onSubmitHandler}>
                {this.getInputs().map( x => (<TextInput key={x.name} {...x} />))}
                <SelectInput
                    placeholder="Course"
                    label="Course"
                    name="Course"
                    options={coursesOptions}
                    onSelect={this.onSelectCourse}
                    firstElement="Which Course?"
                />
                <SelectInput
                    placeholder="Elective"
                    label="Elective"
                    name="Elective"
                    options={electivesOptions}
                    onSelect={this.onSelectElective}
                    firstElement="Which Elective?"
                />
                <ButtonInput label="Submit" name="Submit" appearance="success" type="submit" />
            </form>
        );
    }
}

export default AttendantForm;