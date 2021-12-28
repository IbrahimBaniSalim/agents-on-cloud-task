import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setService, deleteService } from "../../reducers/Service";
import { Form, Button, Modal } from "react-bootstrap";
import "./viewService.css";
const ViewService = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [deleteService, setDeleteService] = useState(true);
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      Services: state.ServicesReducer.Services,
    };
  });
  useEffect(() => {
    setService();
  }, []);

  const editService = (e) => {
    axios.put(`/Services/${e.target.value}`).then((result) => {});
    setEdit(true);
  };

  const saveService = async (elem, Service, photo, video) => {
    await axios.put(`/Services/${elem.Service_id}`, {
      Service,
      photo,
      video,
      sport_id: elem.sport_id,
      Serviceer_id: elem.Serviceer_id,
      ServiceId: elem.Service_id,
    });
    setMessage("save edit");
    setTimeout(() => {
      history.push("/Services");
    }, 1000);
    setDeleteService(true);
  };

  const deleteServicea = async (elem) => {
    await axios.put(`/Service/${elem.Service_id}`);
    setMessage("delete Service");
    setTimeout(() => {
      history.push("/Services");
    }, 1000);
  };

  const popup = () => {
    setDeleteService(false);
    setMessage("are you sure you want to delete this Service");
  };

  const cancel = async (elem) => {
    setDeleteService(true);
    setMessage("");
    await axios.get(`/Services/${elem.Service_id}`);
  };

  const returnToAllService = () => {
    history.push("/Services");
  };

  return (
    <>
      {deleteService ? (
        <>
          <div className="app12">
            {" "}
            {edit ? (
              <div className="allEditEditServiceStyle1">
                <div className="editEditServiceStyle5"> 
                {state.Services.map((elem, i) => (
                  <Form
                    key={i}
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveService(
                        elem,
                        e.target.Service.value,
                        e.target.photo.value,
                      );
                    }}
                  >
                    <h2> edit Service </h2>
                    <Form.Group size="lg" controlId="formService">
                      <Form.Label>
                        Service :
                        <Form.Control
                          type="text"
                          name="Service"
                          defaultValue={elem.Service}
                        />
                      </Form.Label>{" "}
                    </Form.Group>
                    <Form.Group size="lg" controlId="formPhoto">
                      <Form.Label>
                        url photo :
                        <Form.Control
                          type="text"
                          name="photo"
                          defaultValue={elem.photo}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Button
                        size="lg"
                        variant="outline-dark"
                        type="submit"
                        className="buttonStyleEditService3 margButton"
                      >
                        Save changes
                      </Button>
                    </Form.Group>
                    <div>
                      <Form.Label>{message && <div>{message}</div>}</Form.Label>
                    </div>
                  </Form>
                ))}
                </div>
                <div className="editImageEditServiceStyle5"> 
                <img src="https://i.ibb.co/FK473Rs/alexander-redl-d3b-Ymn-Z0ank-unsplash-1.jpg" alt="Service" className="sizeImageEditEditServiceStyle6"/>
                </div>
              </div>
            ) : (
              <div className="topEditServiceStyle1">
                {state.Services.map((elem, i) => (
                  <div key={i} className="editServiceStyle1">
                    <div className="ImageEditServiceStyle1">
                      <img src={elem.photo} alt="Service" className="sizeImageEditServiceStyle1"/>
                    </div>
                    <div className="TextEditServiceStyle1">
                      <div className="titleEditServiceStyle4"> 
                        Service
                      </div>
                      <div className="textServiceEditServiceStyle1">{elem.Service}</div>
                      <div>
                        <div className="buttonStyleEditService2">
                        <Button onClick={editService} variant="outline-dark" value={elem.Service_id} className="buttonStyleEditService3">
                          Edit 
                        </Button>
                        <Button onClick={popup} variant="outline-dark" className="buttonStyleEditService3">Deleted </Button>
                        <Button onClick={returnToAllService} variant="outline-dark" className="buttonStyleEditService3">
                          Cancel
                        </Button>
                        </div>
                        {message && <div> {message} </div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="popupb2">
          <div className="popup1 justifyText1">
            <h1>Delete Service</h1>
            {message && <div className="msg"> {message} </div>}
            {state.Services.map((elem, i) => (
              <form
                key={i}
                onSubmit={(e) => {
                  e.preventDefault();
                  deleteServicea(elem);
                }}
              >
                <div className="buttonStylePadding">
                  <button  variant="outline-dark" className="buttonStyleEditService32">Deleted</button>
                </div>
              </form>
            ))}
            {state.Services.map((elem, i) => (
              <form
                key={i}
                onSubmit={(e) => {
                  e.preventDefault();
                  cancel(elem);
                }}
              >
                <div className="buttonStylePadding">
                  <button variant="outline-dark" className="buttonStyleEditService32">Cancel</button>
                  <br />
                </div>
              </form>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewService;
