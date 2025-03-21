import React, { useState } from "react";
import { API_ROOM_VIEW_ALL } from "../../constants/endpoints";
import { API_ROOM_CREATE } from "../../constants/endpoints";

const RoomFeed = (props) => {
    const handleRoomSelect = (room) => {
      if (props.onRoomSelect) {
        props.onRoomSelect(room);
      }
    };
    return (
        <>
           <h1> Hello from RoomFeed </h1>
           
        </>
    );
}

export default RoomFeed;