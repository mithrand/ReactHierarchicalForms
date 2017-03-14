/**
 * Created by amunoz on 14/03/2017.
 */

import * as React from 'react';
import {SelectInput, SelectOption} from './SelectInput';
import {Course} from '../model/course';
import {Elective} from '../model/elective';

import {API} from '../API/API';

interface CoursesSelectState {
    courses: Course[];
    electives: Elective[];
}

export class CoursesSelect extends React.Component<{}, {}> {

    state: CoursesSelectState;
    private api = new API();

    constructor() {
        super();
        this.state = this.getInitialState();
        this.getCourses();
    }

    getInitialState = (): CoursesSelectState => {
      return { courses: [], electives: []};
    };

    getCourses = () => {
        this.api.getCourses()
            .then(res => {
                let newState = Object.assign({}, this.state, {courses: res});
                this.setState(newState);
            });
    };

    getElectives = (courseId: number) => {
        this.api.getElectives()
            .then(res => {
                let newElectives = res.filter( ele => ele.courseId === courseId);
                let newState = Object.assign({}, this.state, {electives: newElectives});
                this.setState(newState);
            });
    };

    onSelect= (value: any): void => {
        this.getElectives(value);
    };

    render() {

        let coursesOptions =  this.state.courses.map( (x): SelectOption  => {
            return { value: x.id , label: x.name }
        });

        let electivesOptions = this.state.electives.map( (x): SelectOption => {
            return { value: x.id , label: x.name }
        });

        return (
            <form className="form-horizontal">
                <SelectInput
                    placeholder="Course"
                    label="Course"
                    name="Course"
                    options={coursesOptions}
                    onSelect={this.onSelect}
                    firstElement="Which Course?"
                />
                <SelectInput
                    placeholder="Elective"
                    label="Elective"
                    name="Elective"
                    options={electivesOptions}
                    firstElement="Which Elective?"
                />
            </form>
        );
    }
}

export default CoursesSelect;