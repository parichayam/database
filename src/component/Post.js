import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import Comment from "./Comment";
import Option from "./Option";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

function Post(props) {

    const [date, setDate] = useState();

    //get Date
    useEffect(() => {
        if (props.date) {
            setDate(new Date(props.date.seconds * 1000));
        }
    }, [props.date])

    const timeConverter = (timestamp) => {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    const getDate = timeConverter(date)     //use getDate in post and comment

    //handle like,share
    //add like
    const getLike = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "like"), {
                post_id: props.postID,
                user_id: props.login
            })
            console.log("Post id in like ",props.postID)

            const likeRef = collection(db, "post");
            const addLike = await setDoc(doc(likeRef, props.postID), {
                likeCount: props.likes + 1,  
                shareCount: props.share,
                text_post: props.content,
                img_post: props.img,
                location: "Earth",
                upload_date: props.date,
                user_id: props.userID
            });

        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    //add share
    const getShare = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "share"), {
                post_id: props.postID,
                user_id: props.login

            })
            const shareRef = collection(db, "post");
            const addShare = await setDoc(doc(shareRef, props.postID), {
                shareCount: props.share + 1,
                likeCount: props.likes,
                text_post: props.content,
                img_post: props.img,
                location: "Earth",
                upload_date: props.date,
                user_id: props.userID
            })

        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    //for comment
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    //add comment
    const addcomment = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "comment"), {
                text_comment: comment,
                post_id: props.postID,
                user_id: props.login,
                img_comment: "",
                gif_comment: "",
                emoji_comment: "",
                sticker_comment: "",
                comment_date: new Date()
            })
            console.log("Comment's written with id: ", docRef.id)
        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    //get comment
    const fetchComment = async () => {
        await getDocs(collection(db, "comment"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setComments(newData)
                //console.log(comments, newData)
            })
    }

    useEffect(() => {
        fetchComment();
    }, []);

    //get user    
    const [user, setUser] = useState([])

    const fetchUser = async () => {
        await getDocs(collection(db, "user"))
            .then((querySnapshot) => {
                const getUser = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setUser(getUser)
                //console.log("User: ",user, getUser);
            })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="post">
            <div className="profile">
                <img src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg" alt="" width={30} height={30} />
                {user.filter((user) => user.id === props.userID).map((user, i) => (
                    <p key={i}>{user.username}</p>
                ))}
            </div>
            <div className="location">
                <img src="https://cdn-icons.flaticon.com/svg/3916/3916862.svg?token=exp=1680105685~hmac=d3723087f227674470c1d6480323d1f3" alt="location-icon" width={20} height={20} />
                <p>{props.location}</p>
                <p className="post-date">Posted at: {getDate}</p>
            </div>
            <div className="post-content">
                <p>{props.content}</p>
                    {
                    props.img &&
                        <img
                        src={props.img}
                        alt="post-img"
                        style={{ width: "200px", height: "200px" }}
                    />
                    }
            </div>
            <div className="option">
                <div className="post-option">
                    <button onClick={getLike} >{props.likes} Likes</button>
                </div>
                <div className="post-option">
                    <button onClick={getShare}>{props.share} Shares</button>
                </div>
            </div>
            <div className="post-comment">
                <div className="comment-input">
                    <input
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" onClick={addcomment}>comment</button>
                </div>
                <Option />

                {comments.filter((comment) => comment.post_id === props.postID).map((comment, i) => (
                    <Comment
                        key={i}
                        commentID={comment.id}
                        userComment={user}       //check user   
                        cuid={comment.user_id}      
                        comment={comment.text_comment}
                        comDate={comment.comment_date}
                    />
                ))}
            </div>

        </div>
    )
}
export default Post