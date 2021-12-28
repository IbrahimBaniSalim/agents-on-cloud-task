const db = require("./../../db/db");



const getAllUsersService = (req, res) => {
  const command = `SELECT users.image, users_Service.user_id , users_Service.Service_id 
  , Service.Serviceer_id , users.firstName ,users.lastName From users_Service
  INNER JOIN Service ON users_Service.Service_id = Service.Service_id AND users_Service.is_deleted =0
  INNER JOIN users ON users.user_id = users_Service.user_id`;

  db.query(command, (err, result) => {
    if (err) return res.status(404);
    console.log("result", result);
    res.status(200);
    res.json(result);
  });
};



const getAllUsersService1 = (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const command = `SELECT users_Service.user_id , Service.Service, users_Service.Service_id 
  , Service.Serviceer_id, Service.photo , users.firstName From users_Service
  INNER JOIN Service ON users_Service.Service_id = Service.Service_id AND users_Service.is_deleted =0
  INNER JOIN users ON users.user_id = ? AND users.user_id = users_Service.user_id`;
  const data = [id];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};




module.exports = {

 

  getAllUsersService,
 
  getAllUsersService1,}


