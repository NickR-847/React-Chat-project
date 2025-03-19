import React from "react";
import { Button } from "reactstrap";
import { API_MESSAGE_DELETE } from "../../constants/endpoints";

const MessageDelete = (props) => {
    //handling message deletion
    async function handleDelete(){
        try {
            //headers
            let myHeaders = new Headers()
            myHeaders.append("Content-typr", "application/json")
             // Make sure to add authorization to headers if you need token for route
             myHeaders.append("Authorization", props.token)

             //Request Options
             let requestOptions = {
                method: "DELETE",
                headers: myHeaders,
             }

             //Sending request
             let response = await fetch (`${API_MESSAGE_DELETE}/${props.messageId}`, requestOptions)

             //Response Object
             let data = await response.json()
             console.log(data);

             
             


            
        } catch (error) {
            
        }
    }








    return (
        <>
           <h1> Hello from MessageDelete </h1>
        </>
    );
}

export default MessageDelete;