import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/auth/Auth";
import RoomIndex from "./components/room-section/RoomIndex";
import MessageIndex from "./components/message-section/MessageIndex";
import { Container, Row, Col } from "reactstrap";
import MessageCreate from "./components/message-section/MessageCreate";

function App() {
  // State to store the authentication token
  const [token, setToken] = useState("");

  // State to track which room is selected
  const [selectedRoom, setSelectedRoom] = useState(null);

  function updateToken(newToken) {
    console.log("Setting token in App:", newToken);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    console.log("Token state after update:", token);

    // Check  if it's in localStorage
    console.log("Token in localStorage:", localStorage.getItem("token"));
  }

  // Function to handle room selection
  function handleRoomSelect(room) {
    setSelectedRoom(room);
  }

  // Check for existing token in localStorage when app loads
  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      {/* ! Import and mount Auth */}
      {!token ? (
        <Auth updateToken={updateToken} />
      ) : (
        <>
          <Container fluid>
            <Row>
              {/* column broken into 12 segments : 4 for rooms 8 for messages */}
              <Col md="4">
                {/* Left column  for room list */}
                <RoomIndex token={token} onRoomSelect={handleRoomSelect} />
              </Col>
              <Col md="8">
                {/* Right column for message feed */}
                {selectedRoom ? (
                  <>
                    <MessageIndex token={token} selectedRoom={selectedRoom} />
                    <MessageCreate token={token} roomId={selectedRoom._id} fetchMessages={() => {}} />
                  </>
                ) : (
                  <div className="text-center p-5 secondary-background rounded">
                    <h3>Select a room to start messaging</h3>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default App;
