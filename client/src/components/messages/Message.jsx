import "./message.css";
import React from "react";
import moment from 'moment';

function message({own,message,profileDoc,profilePat}) {


  return (
    <div style={{paddingTop :"96px"}} className= {own?"message own":"message"} >
      
      {!own?<div className="messageTop ">
      
        <img
          className="messageImg"
          src={profilePat}
          alt=""
        />
        <p  className="messageText">{message.content}</p>
      </div>:<div className="messageTop">
      
      <p  className="messageText">{message.content}</p>
      <img
        className="messageImg"
        src={profileDoc}
        alt=""
      />
    </div>}
      <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
  );
}

export default message;
