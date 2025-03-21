import React from "react";

const MessageCard = ({ message }) => {
    return (
      <div className="message-card">
        <h3>{message.user}</h3>
        <p>{message.content}</p>
        <small>{new Date(message.createdAt).toLocaleString()}</small>
      </div>
    );
  };
  
  export default MessageCard;

  