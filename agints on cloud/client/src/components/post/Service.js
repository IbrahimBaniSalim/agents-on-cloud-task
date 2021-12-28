import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setService, AddService } from "./../../reducers/Service";
import "./Service.css";
const Service = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Service, setService2] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [state1, setState1] = useState([]);
  const [sport_id, setSport_id] = useState(0);
  const [message, setMessage] = useState("");
  const [addNew, setAddNew] = useState(false);

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      Services: state.ServicesReducer.Services,
    };
  });
  const user = jwt.decode(state.token);
  let userID;
  if (user) {
    userID = user.userId;
  }
  const [userId, setUserId] = useState(userID);

  async function addNewService() {
    try {
      const newService = {
        Service,
        photo,
        video,
        sport_id,
        Serviceer_id: userId,
      };
      console.log("....new Service ....", newService);
      if (!Service) {
        setMessage("Please write a text");
      } else {
        await axios.Service("/Services", newService).then((response) => {
          if (response) {
            dispatch(AddService(response.data));
            setMessage("The Service has been successfully added");
          } else {
            setMessage("Error happened while add Service, please try again");
          }
        });
      }
    } catch (error) {
      setMessage("Error 404 happened while add Service, please try again");
      throw error;
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    addNewService();
    setTimeout(() => {
      setAddNew(false);
    }, 2000);
  };

  const getAllService = () => {
    axios
      .get(`/Services/all/${userId}`)
      .then((res) => {
        dispatch(setService(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`/Services/all/${userId}`).then((result) => {
      dispatch(setService(result.data));
    });
  }, []);

  const viewService = (e) => {
    axios.get(`/Services/${e.target.value}`).then((result) => {
      dispatch(setService(result.data));
      history.push(`/Service`);
    });
  };

  const SportType = () => {
    axios.get("/sports").then((response) => {
      setState1(response.data);
    });
  };

  useEffect(() => {
    getAllService();
  }, [addNew]);

  return (
    <div className="App1212">
      {addNew ? (
        <div className="allAddService">
        <div className="addService">
          <Form onSubmit={handelSubmit}>
            <h3> Add New Service </h3>

            <Form.Group size="lg" controlId="formBasicEmail">
              <Form.Label className="titleAddService">Service : </Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Service here"
                onChange={(e) => setService2(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group size="lg" controlId="formBasicEmail">
              <Form.Label className="titleAddService">Image : </Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Url photo here"
                onChange={(e) => setPhoto(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group size="lg" controlId="formBasicEmail">
              <Form.Label className="titleAddService">Sports Type : </Form.Label>
              <Form.Label>
              <select
                className="input select"
                type="select"
                onClick={async (e) => {
                  SportType();
                  await setSport_id(e.target.value);
                }}
              >
                {}
                {state1.map((ele, i) => {
                  return (
                    <option value={ele.sport_id} key={i}>
                      {ele.type}
                    </option>
                  );
                })}
              </select>
            </Form.Label>
            </Form.Group>

            
            <div>
              <Button className="styleButton12AddService marg32"  size="lg" variant="outline-dark" type="submit">
                add Service
              </Button>
            </div>
            <div className="tostMassage3">
              <Form.Label>{message && <div>{message}</div>}</Form.Label>
            </div>
          </Form>
        </div>
        <div>
        <img src="https://i.ibb.co/LQ1P3yD/dmitrii-vaccinium-By-UAo3-Rp-A6c-unsplash.jpg" className="imageAddServices" />
        </div>
      </div>
      ) : (
        <div className="divbtn1">
          {" "}
          <button
            onClick={() => {
              setAddNew(true);
            }}
            className="bntStart "
          >
            click to add Service
          </button>
        </div>
      )}
      <div className="Service12">
        {state.Services.map((elem, i) => (
          <div key={i} class="card1Service"> 
              <img src={elem.photo} className="imageServices" />
              <p className="p11">{elem.Service}</p>
              <Button onClick={viewService} value={elem.Service_id} className="styleButton12AddService marg32B"  variant="outline-dark">
                view 
              </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
