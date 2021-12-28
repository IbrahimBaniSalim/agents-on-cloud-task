const db = require("../../db/db");

const getAllServiceByUserId = (req, res) => {
  const command = `SELECT * FROM Services
  WHERE Serviceer_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const addService = (req, res) => {
  const newService = {
    Service: req.body.Service,
    photo: req.body.photo,
   
    
    Serviceprovider_id: req.body.Serviceprovider_id,
  };
  console.log(newService);
  const command = `INSERT INTO Service (Service,photo,Serviceprovider_id) VALUES (?, ? ,?, ?, ?);`;
  const data = [
    newService.Service,
    newService.photo,
  ,
    newService.Serviceprovider_id,
  ];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(201);
    res.json(result);
  });
};

const getServiceId = (req, res) => {
  const command = `
      SELECT * FROM Service
      WHERE Service_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const deleteService = (req, res) => {
  const ServiceId = req.params.id;
  const data = [ServiceId];
  const command = `UPDATE Service SET is_deleted =1 WHERE Service_id= ?`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(404);
    res.json("This Service is delete successful");
    res.status(202);
  });
};

const updateService = (req, res) => {
  const ServiceId = req.params.id;
  const { Service, photo, Serviceer_id } = req.body;
  const data = [Service, photo,  Serviceer_id, ServiceId];
  const command = `UPDATE Service SET Service= ? , photo= ? , Serviceer_id=? WHERE Service_id=?; `;
  db.query(command, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(201);
  });
};

module.exports = {
getAllServiceByUserId,
addService,
getServiceId,
deleteService,
  updateService,
};
