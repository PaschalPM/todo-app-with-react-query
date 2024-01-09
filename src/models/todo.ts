export default class Todo {
    public readonly id?: string;
    public readonly createdAt?: Date
    constructor(public task: string, public isComplete: boolean = false) {
        this.createdAt = new Date()
    }
}

// export type Todo = {
//     id?: string,
//     task: string,
//     isComplete: boolean,
//     createdAt?: Date
// }