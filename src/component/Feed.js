import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Post from "./Post";

function Feed() {
    const [ posts, setPosts ] = useState("");
    const [ post, setPost ] = useState([]);

    const [ user, setUser ] = useState({id:"uid",uname:"haiyuuno"});

    const [imageURLs, setImage] = useState("");    

//add post
    const addPost = async (e) => {
        e.preventDefault();

        try {
            const postRef = await addDoc(collection(db, "post"), {
                text_post: posts, 
                location: "Earth",
                upload_date: new Date(),
                user_id: user.id,
                likeCount: 0,
                shareCount: 0,
                img_post: imageURLs
                                                       
            })
            console.log("Post written with id: ",postRef.id);     //check if data has added yet
        } catch(e) {
            console.error("error adding document: ",e)
        }
    }

//get post data
    const fetchPost = async () => {
        await getDocs(collection(db, "post"))
                .then((querySnapshot) => {          //เข้าถึงข้อมูลdb เก็บใน newData
                    const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
                    setPost(newData)
                    console.log("New post added: ",post, newData);
                })
    }

    useEffect(() => {
        fetchPost();      
    },[]);
    
    return (
        <div className="feed"> 
                <ul className="users">
                    <p>Select user: </p>
                    <li className="username" id="input" onClick={() => setUser({id:"uid",uname:"haiyuuno"})}><a>haiyuuuno</a></li>
                    <li className="username" id="input2" onClick={() => setUser({id:"uid2",uname:"ohsehun"})}><a>ohsehun</a></li>
                </ul> 
            <p>Log in as: {user.uname}</p>           
            <div className="post-box">
                <textarea 
                    name="postBox" 
                    placeholder="what're you thinking?..."
                    onChange={(e) => setPosts(e.target.value)}  >
                </textarea>                                                    
                <button type="submit" onClick={addPost}>post</button>
            </div>
            <div className="post-img">
                Insert image URL here <input type="text" onChange={(e) => setImage(e.target.value)} />                                 
            </div> 

            {post.map((post,i) => (
                <Post
                key={i}
                postID={post.id} 
                userID={post.user_id}
                login={user.id}                 //check user id                                         
                content={post.text_post}
                img={post.img_post}               
                likes={post.likeCount}
                share={post.shareCount}
                location={post.location}
                date={post.upload_date}               
                />                
        ))}
        
        </div>
    )
}
export default Feed