import { Router } from 'express';
import { Todo } from '../models/todo';

const router = Router();
let todos: Array<Todo> = [];

router.get('/todos', (req, res, next) => {
    res.status(200).json({
        todos: todos
    });
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }

    todos.push(newTodo);

    return res.status(200).json({
        message: 'Added todo',
        todo: newTodo,
        todos: todos
    })
});

router.put('/todo/:id', (req, res, next) => {
    const id = req.params.id;
    const idx = todos.findIndex(todo => todo.id === id);

    if(idx >= 0) {
        todos[idx] = {
            id: todos[idx].id,
            text: req.body.text
        }
        return res.status(200).json({
            message: 'Updated todo',
            todos: todos
        })
    }

    res.status(404).json({
        message: 'Could not find todo for this id.'
    })
})

router.delete('/todo/:id', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.id);
    res.status(200).json({
        message: 'Todo deleted successfully',
        todos: todos
    })
})

export default router;