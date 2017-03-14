/**
 * Created by amunoz on 14/03/2017.
 */
import 'whatwg-fetch';
import {Course} from '../model/course';
import {Elective} from '../model/elective';

import * as Path from 'path';

const URL_API = '/api';

export class API {

    getCourses = (): Promise<Course[]> => {
        let url = Path.join(URL_API, 'courses');
        let request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return  fetch(request)
            .then(this.checkStatus)
            .then(this.parseJSON);
    };

    getElectives = (): Promise<Elective[]> => {
        let url = Path.join(URL_API, 'electives');
        let request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return  fetch(request)
            .then(this.checkStatus)
            .then(this.parseJSON);
    };

    checkStatus = (res: Response): Response => {
        const error = new Error(`HTTP Error ${res.status} ${res.statusText}`);
        if (res && res.status >= 200 && res.status < 300) {
            return res;
        }else {
            console.log(error);
            throw error;
        }
    };

    parseJSON = (res: Response): any => {
        return res.json();
    };
}

export default API;