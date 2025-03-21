import React, { useState } from "react";
import { API_ROOM_CREATE } from "../../constants/endpoints";
import RoomButton from "../custom/RoomButton";

// ! IMPORT FROM REACTSTRAP FOR FORM HANDLING
import { Form, FormGroup, Label, Input } from "reactstrap";

const RoomCreate = (props) => {
  //state variables
  //usf
  const [name, setName] = useState("Continental");
  const [description, setDescription] = useState("No business conducted");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Submit Clicked");
      //create
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      //!make sure to add authorization to headers if you need token for route

      //request body
      let body = {
        name,
        description,
      };

      //Request Options
      let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      //send request
      let response = await fetch(API_ROOM_CREATE, requestOption);

      // Response Object
      let data = await response.json();
      console.log(data);

      // Clearing input field after submission
      setName("");
      setDescription("");
      
      // Refresh room list
      if (props.fetchRoomFeed) {
        props.fetchRoomFeed();
      }
    } catch (error) {
      console.error("Error during room creation:", error);
    }
  }

  return (
    <>
      <h2>Create A New Room</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="Name">Name</Label>
          
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            name="name"
            placeholder="Enter Room Name"
            type="text"
          />
        </FormGroup>

        <FormGroup>
          <Label for="Description">Description</Label>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="description"
            name="description"
            placeholder="Enter Description"
            type="textarea"
          />
        </FormGroup>
        <RoomButton type="submit">Submit</RoomButton>
      </Form>
    </>
  );
};
export default RoomCreate;