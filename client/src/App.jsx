
import React, { useState, useEffect } from "react";
import './App.css';
import Auth from "./components/auth/Auth";
import RoomIndex from "./components/room-section/RoomIndex";



function App() {
  //state variable called token and a function called setToken using the useState hook.
  const [token, setToken] = useState("");

  // function called updateToken that will update the token state variable and save the token to local storage. The function should take in a newToken parameter

  function updateToken(newToken){
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  //useEffect hook that will run when the component mounts and only run once. The useEffect hook should check if there is a token in local storage and if there is, it should set the token state variable to the token in local storage
  useEffect(() => {
      let storedToken =localStorage.getItem("token")
      if(storedToken){
        //updating
        setToken(storedToken)
      }
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      {!token &&<Auth updateToken={updateToken}/>}
      {token &&<RoomIndex token={token}/>}
      
      
       
      </header>

    </div>
  );
}

export default App;
