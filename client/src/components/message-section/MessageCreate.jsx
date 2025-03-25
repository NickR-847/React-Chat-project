import React, {useState} from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { API_MESSAGE_CREATE } from "../../constants/endpoints";

const MessageCreate = (props) => {
    // State variable for message content
    const [content, setContent] = useState("");
  
    // Handle form submission
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        console.log("Submit Clicked");
        // Headers
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // Make sure to add authorization to headers if you need token for route
        myHeaders.append("Authorization", props.token);
  
        // Request body
        let body = {
          content,
          //  passing roomId as a prop
          room: props.roomId, 
        }; 
  
        // Request Options
        let requestOption = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        };

         // Send request
      let response = await fetch(API_MESSAGE_CREATE, requestOption);

      // Response Object
      let data = await response.json();
      console.log(data);

      // Clearing  input field after submission
      setContent("");

       // Calling fetchMessages function to refresh the message list
       if (props.fetchMessages) {
        props.fetchMessages();
      }
    } catch (error) {
      console.error("Error during message creation:", error);
    }
  }

  return (
    <>
      <h1> Create a Message </h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="content">Message</Label>
          <Input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}

            id="content"
            name="content"
            placeholder="Enter your message"
            type="text"
          />
        </FormGroup>
        <Button type="submit">Send Message</Button>
      </Form>
    </>
  );
};

export default MessageCreate;

