import React from "react";
import { API_ROOM_DELETE } from "../../constants/endpoints";
import RoomButton from "../custom/RoomButton";

const RoomDelete = (props) => {
  async function roomDelete() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      // Request Body
      let body = {
        id: props.room._id,
      };
      // Request Options
      let requestOption = {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      let response = await fetch(API_ROOM_DELETE, requestOption);

      // Response Object
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div>
     <h2 className="font-primary text-center">Delete Room</h2>
      <RoomButton onClick={roomDelete}>Delete</RoomButton>
      </div>
    </>
  );
};

export default RoomDelete;
