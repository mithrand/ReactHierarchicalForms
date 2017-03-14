/**
 * Created by amunoz on 14/03/2017.
 */

import * as React from 'react';

export interface SelectOption {
    label: string;
    value: any;
}

export interface SelectButtonProps {
    placeholder: string;
    label: string;
    name: string;
    options: SelectOption[];
    firstElement?: string;
    onSelect?(value: number): void;
}

export class SelectButton extends React.Component<SelectButtonProps, {}> {

    props: SelectButtonProps;

    constructor(props: SelectButtonProps) {
        super(props);
        this.props = props;
    }

    onChangeHandler= (event: React.FormEvent<HTMLSelectElement>): void => {
        if (this.props.onSelect) {
            this.props.onSelect( Number(event.currentTarget.value) );
        }

    };

    render() {
        let options = this.props.options.map((opt) => {return(<option value={opt.value}>{opt.label}</option>)});
        let firstElement = this.props.firstElement ? (<option>{this.props.firstElement}</option>) : '';
        let disabled = this.props.options.length <= 0;
        return(
            <div className="form-group">
                <label  htmlFor="exampleInputEmail1">{this.props.label}</label>
                <select className={'form-control'} disabled={disabled} onChange={this.onChangeHandler}>
                {firstElement}
                {options}
                </select>
            </div>
        );
    }
}

export default SelectButton;