/**
 * Created by Antonio on 14/03/2017.
 */

export class Attendant {

    public name: string;
    public surname: string;
    public email: string;
    public courseId: number;
    public electiveId: number;

    constructor() {
        this.name = '';
        this.surname = '';
        this.email = '';
        this.courseId = 0;
        this.electiveId = 0;
    }
}

export default Attendant;
