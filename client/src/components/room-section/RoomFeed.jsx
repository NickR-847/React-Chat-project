import React from "react";

const RoomFeed = (props) => {
  // Handle selecting a room
  const handleRoomSelect = (room) => {
    if (props.onRoomSelect) {
      props.onRoomSelect(room);
    }
  };

  return (
    <div>
      <h3>Available Rooms:</h3>
      
      <div className="room-list">
        {props.roomFeedItems && props.roomFeedItems.length > 0 ? (
          // Map through the room items and display each one
          props.roomFeedItems.map(room => (
            <div
              key={room._id}
              className="room-item p-3 mb-2 bg-light rounded"
              onClick={() => handleRoomSelect(room)}
              style={{ cursor: "pointer" }}
            >
              <h4>{room.name}</h4>
              <p>{room.description || ""}</p>
            </div>
          ))
        ) : (
          <p>No rooms available. Go ahead and create one!</p>
        )}
      </div>
    </div>
  );
};

export default RoomFeed;