import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import Todo from './Todo'

function TodoList() {
    const [todoList, setTodoList] = useState();

    useEffect(() => {
        const todoRef = db.database().ref('Todo')
        //on= listen every time data change in todoRef
        todoRef.on('value', (snapshot) => {             //value=argument snapshot=param
            const todos = snapshot.val();               
            const todoList = [];
            for(let id in todos) {  
                todoList.push({id, ...todos[id]})         //loop getค่าจาก todos
            }
            setTodoList(todoList);                      //ดึงค่ามาเก็บไว้ใน todoList
        })
    }, [])

    return (
        <div>
            {todoList ?          //check whether there's data in todoLish
            todoList.map((todo, index) => <Todo todo={todo} key={index} /> )    
            : ""}                                               
        </div>                        //= send to Todo :else send blank
    )
}

export default TodoList