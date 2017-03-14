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
        let errorMessage = !this.state.isValid ? (<span className="error">{this.props.errorMessage}</span> ) : '';
        return(
            <div className="controlGroup">
                <input
                    placeholder={this.props.placeholder}
                    type="text"
                    name={this.props.name}
                    onChange={this.onChangeHandler}
                />
                {errorMessage}
            </div>
        );
    };
}

export default TextInput;
