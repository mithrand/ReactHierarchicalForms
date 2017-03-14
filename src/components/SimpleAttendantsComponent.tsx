/**
 * Created by amunoz on 13/03/2017.
 */

import * as React from 'react';
import {AddAttendantForm, AttendantForm} from './AddAttendanFormComponent';

export interface Attendant extends AttendantForm {
    name: string;
    surname: string;
    email: string;
}

interface TextInputFormState {
    attendants: Attendant[];
}

export class SimpleAttendantList extends React.Component<{}, {}> {

    state: TextInputFormState;

    getInitialState = (): TextInputFormState => {
        return {attendants: []};
    };

    constructor() {
        super();
        this.state = this.getInitialState();
    };

    onAttendantFormSubmit = (attendant: Attendant): void => {
        let newState = Object.assign({}, this.state, {attendants: this.state.attendants.concat([attendant])});
        this.setState(newState);
    };

    render() {
        let attendants = this.state.attendants.map((x) => (
            <li key={x.name + x.surname}>{x.name} {x.surname} ({x.email})</li>
        ));
        return(
            <div >
                <h2>List of Attendants</h2>
                <AddAttendantForm onFormSubmit={this.onAttendantFormSubmit} />
                <ul>
                {attendants}
                </ul>
            </div>
        );
    }
}

export default SimpleAttendantList;