/**
 * Created by Antonio on 14/03/2017.
 */

import * as React from 'react';

type type = 'submit' | 'button';
type appearance = 'default' | 'primary' | 'success' | 'info'| 'warning'| 'danger'| 'link';

export interface ButtonInputProps {
    name: string;
    label: string;
    type?: type;
    appearance?: appearance;
    onClick?(button: React.FormEvent<HTMLButtonElement>): void;
}

export class ButtonInput extends React.Component< ButtonInputProps ,{}> {
    props: ButtonInputProps;

    constructor(props: ButtonInputProps) {
        super(props);
        this.props = props;
    }

    onClickHandler = (event: React.FormEvent<HTMLButtonElement>): void => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    render() {
        let button;
        let appearance = this.props.appearance ? 'btn btn-' + this.props.appearance : 'btn btn-default';

        switch (this.props.type) {
            case 'submit':
                button = (
                    <input  name={this.props.name} className={appearance} type="submit" onClick={this.onClickHandler} />
                );
                break;
            case 'button':
            default:
                button = (
                    <button name={this.props.name} className={appearance} type="button" onClick={this.onClickHandler}>
                        {this.props.label}
                    </button>
                );
                break;
        }

        return(button);
    }

}