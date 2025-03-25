import React from "react";
import { Card, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";

const MessageCard = ({ message }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">{message.user}</CardTitle>
        <CardText>{message.content}</CardText>
      </CardBody>
      <CardFooter className="text-muted">
        {new Date(message.createdAt).toLocaleString()}
      </CardFooter>
    </Card>
  );
};

  export default MessageCard;

  