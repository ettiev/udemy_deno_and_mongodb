
import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import { getDb } from "../helpers/db_client.ts"; 

const router = new Router();

interface Todo {
    id?: string,    //optional attribute
    text: string
}

router.get("/todos", async (ctx) => {
    const todoList = await getDb().collection("todos").find().toArray();
    const transformedTodos = todoList.map((todo: { _id: ObjectId; text: string }) => {
        return {
            id: todo._id.$oid,
            text: todo.text
        }
    })
    ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
    try {
        const data = await ctx.request.body().value;
        const newTodo: Todo = { 
            //id: new Date().toISOString(), 
            text: data.text
        };
        const id = await getDb().collection("todos").insertOne(newTodo);
        newTodo.id = id.$iod;
        
        ctx.response.body = {
            message: "A new todo was created!",
            todo: newTodo
        };
    } catch (err) {
        console.log(err);
        ctx.response.body = {message: 'API error!'}
    };
});

router.put("/todos/:todoId", async (ctx) => {
    const todoId = ctx.params.todoId!;
    const data = await ctx.request.body().value;
    
    await getDb()
        .collection("todos")
        .updateOne({_id: ObjectId(todoId)}, { $set: { text: data.text } });  //data.value.text
    
    ctx.response.body = {
        message: "The todo was updated!"
    };    
})


router.delete("/todos/:todoId", async (ctx) => {
    const todoId = ctx.params.todoId!;

    await getDb()
        .collection("todos")
        .deleteOne({ _id: ObjectId(todoId) });

    ctx.response.body = ({
        message: "The item was deleted!"
    })
})

export default router;