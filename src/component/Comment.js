import React, { useState, useEffect } from "react";

function Comment(props) {

    const [date, setDate ] = useState();

//get Date
    useEffect(() => {
        if(props.comDate){
        setDate(new Date(props.comDate.seconds*1000));
        }
    }, [props.comDate])

    const  timeConverter = (timestamp) =>{
      var a = new Date(timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }
    const getDate = timeConverter(date)

    return(
        <div>   
            <p>Comments:</p>         
            <div className="show-comment">
                <div className="comment-section">                        
                    {props.userComment && props.userComment.filter((user) => user.id === props.cuid).map((user,i) => (
                        <div key={i}>
                            <p>{user.username}: {props.comment}</p>
                        </div>
                    ))}    
                </div>
                <div className="comment-section">
                    <p className="time">commented at {getDate}</p> 
                </div>   
            </div>
        </div>
    )
}
export default Comment