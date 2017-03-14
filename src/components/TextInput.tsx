/**
 * Created by amunoz on 13/03/2017.
 */

import * as React from 'react';

export interface TextInputProps {
    placeholder: string;
    name: string;
    errorMessage: string;
    onChange(value: React.FormEvent<HTMLInputElement>): void;
    validateField(value: any): boolean;
}

interface TextInputState {
    isValid: boolean;
}

export class TextInput extends React.Component<TextInputProps , {}> {

    props: TextInputProps;
    state: TextInputState;

    constructor(props: TextInputProps) {
        super(props);
        this.props = props;
        this.state = { isValid: true };
    };

    onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        if (this.props.validateField(value)) {
            this.props.onChange(event);
            this.setState(Object.assign({}, this.state, {isValid: true}));
        } else {
            this.setState(Object.assign({}, this.state, {isValid: false}));
        }
    };

    render() {
        let errorMessage: any = '';
        let errorIcon: any = '';
        let hasError: string = '';

        if (!this.state.isValid) {
            errorIcon = (
                <span className="glyphicon glyphicon-remove  form-control-feedback"/>
            );
            errorMessage = (
                <span className="sr-only">{this.props.errorMessage}</span>
            );
            hasError = 'has-error';
        }
        return(
            <div className={['form-group has-feedback', hasError].join(' ')}>
                <label className="control-label" htmlFor="inputGroupSuccess1">{this.props.placeholder}</label>
                <div className="input-group">
                    <span className="input-group-addon">@</span>
                    <input
                        name={this.props.name}
                        type="text"
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onChange={this.onChangeHandler}
                    />
                </div>
                {errorIcon}
                {errorMessage}
            </div>
        );
    };
}

export default TextInput;
