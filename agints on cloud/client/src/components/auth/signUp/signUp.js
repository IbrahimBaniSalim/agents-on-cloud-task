import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./signUp.css";
import SignUp from "./index";

const BeforeSignUp = () => {
  const [state, setState] = useState("");
  const history = useHistory();
  localStorage.setItem("status", state);

  const stateForSignUp = async (e) => {
    await setState(e.target.value);
    history.push(`/register/${e.target.value}`);
  };

  const stateForSignUpImages = async (e) => {
    await setState(e.target.alt);
    history.push(`/register/${e.target.alt}`);
  };

  return (
    <div className="SignUpSelect">
      <h2 className="RegisterSelectSignUp"> Join us </h2>
      <CardDeck className=' CardDeckMarg row row-cols-1 row-cols-md-3' style={{ width: "65rem" }}>
        <div className="col mb-1 style">
          <Card className="h-10 Shadow">
            <Card.Img variant="top" className="imageCard pointer" src="" alt="user"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body className="card-body">
              <Card.Title className="card-title">User</Card.Title>
              <Card.Text className="card-text">
              register 
              </Card.Text>
              <Button variant="outline-dark" className="buttonStyleHome" value="user" onClick={stateForSignUp}>join </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted ">+900 Users</small>
            </Card.Footer>
          </Card>
        </div>
       
     
      </CardDeck>
    </div>
  );
};
export default BeforeSignUp;
