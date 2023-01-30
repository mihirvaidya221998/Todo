const models = require('../models');
const { param } = require('../routes/apiRoutes');
const todoObj = models.Todo;

class Todo {
    Todo() {

    }
    async getTodos() {
        try {
            const todos = await todoObj.findAll();
            console.log('All todos worker: ', todos)
            return todos;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async postTodo(params) {
        try {
            const newTodo = await todoObj.create({ text: params.text })
            console.log(newTodo);
            return newTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getUpdateTodo(id) {
        try {
            console.log(`Inside the get update ${id}`);
            const getUpdateTodo = await todoObj.findAll({
                where: {
                    id: id
                }
            });
            console.log(`inside the getUpdate text: ${getUpdateTodo}`)
            return getUpdateTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateTodo(params) {
        try {
            console.log("Inside Worker", params)
            const updateTodo = todoObj.update({
                text: params.text,
            },
                {
                    where: { id: params.id }
                })
            console.log('Worker: ', updateTodo);
            return updateTodo;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    deleteTodo(params) {
        try {
            const deleteTodo = todoObj.destroy({
                where: {
                    id: params.id
                }
            })
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