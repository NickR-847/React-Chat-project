
import React, { useState, useEffect } from "react";
import { API_ROOM_VIEW_ALL } from "../../constants/endpoints";
import RoomFeed from "./RoomFeed";

const RoomIndex = (props) => {
  //state variable for roomFeedItems using the useState hook initialze the state variable to an empty array
  const [roomFeedItems, setRoomFeedItems] = useState([]);

  async function fetchRoomFeed() {
    //Headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //!make sure to add authorization to headers if you need token for route 
    myHeaders.append("Authorization", props.token);

     // Request Options
     let requestOption = {
        method: "GET",
        headers: myHeaders,
      }

      //send request
      let response = await fetch(API_ROOM_VIEW_ALL, requestOption)

      let data = await response.json()

       //to see all rooms
       console.log(data.rooms);

       //updating items with setter
       setRoomFeedItems(data.rooms)


  }

  useEffect(() => {
    fetchRoomFeed()
}, []);

  return (
    <>
      <h1> Hello from RoomIndex </h1>

       {/* displaying room feed items */}
       <RoomFeed roomFeedItems={roomFeedItems}/>
    </>
  );
};

export default RoomIndex;
