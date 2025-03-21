import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import RoomButton from "../custom/RoomButton";
import { API_ROOM_UPDATE } from "../../constants/endpoints";

const RoomUpdate = (props) => {
  const [description, setDescription] = useState("");

  // Update description when room changes
  useEffect(() => {
    if (props.room) {
      setDescription(props.room.description);
    }
  }, [props.room]);

  async function updateRoom(e) {
    e.preventDefault();
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      // Request Body
      let body = {
        id: props.room._id,
        description: description,
      };

      // Request Options
      let requestOption = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      let response = await fetch(API_ROOM_UPDATE, requestOption);

      // Response Object
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="mb-3">
        <h2>Update Room</h2>
        <Form onSubmit={updateRoom}>
          <FormGroup>
            <Label for="Description">Description</Label>
            <Input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
              name="description"
              placeholder="Enter description"
              type="textarea"
            />
          </FormGroup>
          <RoomButton type="submit">Update Room</RoomButton>
        </Form>
      </div>
    </>
  );
};

export default RoomUpdate;
