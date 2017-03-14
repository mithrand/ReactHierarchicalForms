import * as React from 'react';
import {AttendantForm} from './components/AttendantForm';
import {API} from './API/API';

import {Course} from './model/course';
import {Elective} from './model/elective';
import {Attendant} from './model/Attendant';

interface AppState {
    courses: Course[];
    electives: Elective[];
}

class App extends React.Component<{} , {}> {

    state: AppState;
    private api = new API();

    getInitialState = (): AppState => {
        return { courses: [], electives: []};
    };

    constructor() {
        super();
        this.state = this.getInitialState();
        this.getCourses();
        this.getElectives();
    }

    getCourses = () => {
        this.api.getCourses()
            .then(res => {
                let newState = Object.assign({}, this.state, {courses: res});
                this.setState(newState);
            });
    };

    getElectives = () => {
        this.api.getElectives()
            .then(res => {
                let newState = Object.assign({}, this.state, {electives: res});
                this.setState(newState);
            });
    };

    onFormSubmit = (value: Attendant): void => {
        console.log(value.toString());
    };

    render() {
        return (
            <div>
                <h2>My hierarchical React App</h2>
                <AttendantForm {...this.state} onSubmit={this.onFormSubmit} />
            </div>
        );
    }
}

export default App;
