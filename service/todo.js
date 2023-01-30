
// const { param } = require("../routes/apiRoutes");
import {param} from '../routes/apiRoutes';
// const todoWorker = require('../worker/todo');
import todoObj from '../worker/todo';

class Todo {
    Todo() {

    }
    async getTodos() {
        try {
            const todos = await todoObj.getTodos();
            return todos;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async postTodo(params) {
        try {
            const newTodo = await todoObj.postTodo(params);
            console.log(newTodo)
            return newTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getUpdateTodo(id) {
        try {
            const getUpdateTodo = await todoObj.getUpdateTodo(id);
            console.log('Service getUpdate: ', getUpdateTodo);
            return getUpdateTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateTodo(params) {
        try {
            const updateTodo = await todoObj.updateTodo(params);
            console.log('service: ', updateTodo);
            return updateTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    deleteTodo(params) {
        try {
            const deleteTodo = todoObj.deleteTodo(params);
            return deleteTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}

// module.exports = {
//     todoClass: Todo
// }

export default new Todo();