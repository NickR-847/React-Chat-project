import React, { useState, useEffect } from "react";
import { API_ROOM_DELETE, API_ROOM_VIEW_ALL } from "../../constants/endpoints";
import RoomFeed from "./RoomFeed";
import RoomCreate from "./RoomCreate";
import RoomDelete from "./RoomDelete";
import RoomUpdate from "./RoomUpdate";

const RoomIndex = (props) => {
  //state variable for roomFeedItems using the useState hook initialze the state variable to an empty array
  const [roomFeedItems, setRoomFeedItems] = useState([]);

  // State variable for selectedRoom to pass which room is selected to get description and messages
  const [selectedRoom, setSelectedRoom] = useState();

  async function fetchRoomFeed() {
    //Headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //!make sure to add authorization to headers if you need token for route
    myHeaders.append("Authorization", props.token);

    console.log("Authorization header:", myHeaders.get("Authorization"));

    // Request Options
    let requestOption = {
      method: "GET",
      headers: myHeaders,
    };

    //send request
    let response = await fetch(API_ROOM_VIEW_ALL, requestOption);
    let data = await response.json();

    //to see all rooms
    console.log(data.rooms);

    //updating items with setter
    setRoomFeedItems(data.rooms);
  }

  useEffect(() => {
    if (props.token) {
      fetchRoomFeed();
    }
  }, []);

  return (
    <>
      {/* displaying room feed items */}
      <RoomFeed roomFeedItems={roomFeedItems} token={props.token} />
      <RoomCreate token={props.token} fetchRoomFeed={fetchRoomFeed}/>
      <RoomUpdate token={props.token} />
      <RoomDelete token={props.token} />
    </>
  );
};

export default RoomIndex;
