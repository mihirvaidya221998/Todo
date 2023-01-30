// const express = require('express');
import express from 'express';
const router = express.Router();
// const models = require('../models');
import models from '../models';
// const todoService = require('../service/todo');
// import todoService from '../service/todo';
import todoObj from '../service/todo';


// Get all Todos
router.get('/', async (req, res) => {
    try {
        const todos = await todoObj.getTodos();
        console.log('Get: ', todos);
        res.render('index', { todos })
        // res.send(todos)
    } catch (error) {
        console.log(error)
    }
})

// New Todo

router.post('/', async (req, res) => {
    // console.log("Pre Text: ", req.body)
    const text = req.body.text;
    // console.log(text)
    params = {
        text: text
    }
    // console.log('Data Post: ', data);
    // const { text } = req.body;
    const newTodo = await todoObj.postTodo(params);
    // const newTodo = await models.Todo.create({
    //     text
    // })
    console.log('Inside the insert new todo post route: ', newTodo);
    res.send(newTodo);

    // if (req.xhr) {
    //     res.json(newTodo)
    // }
    // else {
    //     res.send(newTodo);
    // }

})

// Update Todo
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    console.log('Update get: ', id);
    const todo = await todoObj.getUpdateTodo(id);
    console.log('Inside routes getUpdateTodo : ', todo)
    res.render('edit', { todo });
})
router.put('/:id', async (req, res) => {
    // const { id } = req.params;
    // res.send(id);
    const id = req.params.id;
    const text = req.body.text;
    console.log('Text in Put: ', text);
    const params = {
        id: id,
        text: text
    };
    console.log('Put route Params: ', params)
    const todo = await todoObj.updateTodo(params);
    // const todo = await models.Todo.update({
    //     text: req.body.text
    // },
    //     {
    //         where: {
    //             id: req.params.id
    //         }
    //     })

    res.json(todo);
})

router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    let params = {
        id: id
    }

    const deleteTodo = todoObj.deleteTodo(params);
    // const { id } = req.params;

    // const todo = await models.Todo.destroy({
    //     where: {
    //         id: id
    //     }
    // })
    res.json(deleteTodo);
    // res.send("Todo has been removed");
})
module.exports = router;