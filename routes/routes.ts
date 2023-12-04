// # run with: deno run --allow-net app.ts

import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string,
    text: string
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
    ctx.response.body = { todos: todos};
})

router.post("/todos", async (ctx: any) => {
    try {
        const body = await ctx.request.body();
        const data = await body.value;
        const newTodo: Todo = { 
            id: new Date().toISOString(), 
            text: data.text
        };
        todos.push(newTodo);
        ctx.response.body = {
            message: "A new todo was created!",
            todo: newTodo
        };
    } catch (err) {
        console.log(err);
        ctx.response.body = {message: 'API error!'}
    };
});

router.put("/todos/:todoId", async (ctx: any) => {
    const todoId = ctx.params.todoId;
    const body = await ctx.request.body();
    const data = await body.value;
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === todoId;
    });
    todos[todoIndex] = {
        id: todos[todoIndex].id,
        text: data.text
    }
    ctx.response.body = {
        message: "The todo was updated!"
    };    
})

router.delete("/todos/:todoId", (ctx) => {
    const todoId = ctx.params.todoId;
    todos = todos.filter(todo => { todo.id !== todoId })
        ctx.response.body = ({
            message: "The item was deleted!"
        })
})

export default router;