import React, { useState } from "react";
import { db } from "../utils/firebase";

function Form() {

    const [title, setTitle] = useState('');             //title ไว้รับค่า

    const handleOnchange = (e) => {
        setTitle(e.target.value);                       //set ค่าที่รับจาก input ส่งไปเก็บใน title
    };

    const createTodo = () => {
        const todoRef = db.database().ref('Todo')     //ดึงข้อมูลจากdatabase
        const todo = {
            title,
            complete: false
        };

        todoRef.push(todo);                              //push todo เข้าdatabase
    };

    return (
        <div>
            <input type="text" onChange={handleOnchange} value={title}/>
            <button className="add-btn" onClick={createTodo}>Add Todo</button>
        </div>
    )
}

export default Form