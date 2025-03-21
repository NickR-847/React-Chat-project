
import React from "react";

import { API_MESSAGE_VIEW_ALL } from "../../constants/endpoints";

// !need to import message card

const MessageIndex = (props) => {
  //state variables for messages
  const [messages, setMessages] = useState([]);

  //fuction to fetch messages
  async function fetchMesages() {
    try {
      //Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");

      //Adding authorization to headers since needing token
      myHeaders.append("Authorization", props.token);

      //Request Options
      let requestOption = {
        method: "GET",
        headers: myHeaders,
      };

      //Send Request
      let response = await fetch(API_MESSAGE_VIEW_ALL, requestOption);

      //Response Object
      let data = await response.json();
      console.log(data);

      //Updating state with fetched messages
      setMessages(data.messages);
    } catch (error) {}
  }

  //useEffect hook to fetch messages when the component mounts
  useEffect(() => {
      fetchMesages()
  }, []);

  return (
    <>
      <h1> Messages </h1>
      <div className="message-list">
        {messages.map((message,index)=>(
            //!re do this after making message card
            <MessageCard key={index} message={message}/>
        ))}

      </div>
    </>
  );
};

export default MessageIndex;
