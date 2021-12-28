const db = require("./../../db/db");

const getAllUsers = (req, res) => {
  const { roleId, type } = req.query;
  const command = `SELECT * FROM users
  INNER JOIN sports ON  users.role_id =? AND sports.type=? AND sports.is_deleted = 0 AND users.is_deleted =0;`;
  const data = [roleId, type];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getAllUsers1 = (req, res) => {
  const { roleId, type } = req.query;
  let typeByID;
  const command_type = `SELECT * FROM sports where sports.type = ?  `;
  const data_type = [type];
  db.query(command_type, data_type, (err, result) => {
    if (err) return res.status(404);
    typeByID = result[0].sport_id;
    const command = `SELECT * FROM users 
    where  role_id =? AND sport_id=? AND is_deleted =0;`;
    const data = [roleId, typeByID];
    db.query(command, data, (err, result) => {
      if (err) return res.status(404);
      res.status(200);
      res.json(result);
    });
  });
};

const getAllUsersService = (req, res) => {
  const command = `SELECT users.image, users_Services.user_id , users_Services.Service_id 
  , Services.Serviceer_id , users.firstName ,users.lastName From users_Services
  INNER JOIN Services ON users_Services.Service_id = Services.Service_id AND users_Services.is_deleted =0
  INNER JOIN users ON users.user_id = users_Services.user_id`;

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
  const command = `SELECT users_Services.user_id , Services.Service, users_Services.Service_id 
  , Services.Serviceer_id, Services.photo , users.firstName From users_Services
  INNER JOIN Services ON users_Services.Service_id = Services.Service_id AND users_Services.is_deleted =0
  INNER JOIN users ON users.user_id = ? AND users.user_id = users_Services.user_id`;
  const data = [id];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getProfileById = (req, res) => {
  const command = `
    SELECT * FROM users  
    WHERE user_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};

const getProfileFirstName = (req, res) => {
  const command = `
    SELECT * FROM users  
    WHERE firstName= ? AND is_deleted=0;`;
  const data = [req.body.firstName];
  console.log("req.body.firstName", req.body.firstName);
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};

const getProfileById1 = (req, res) => {
  const command = `
    SELECT * FROM users 
    INNER JOIN sports ON users.user_id= ? AND users.is_deleted=0 AND users.sport_id = sports.sport_id;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};
const updateProfile = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, image, phone, age } = req.body;
  const data = [firstName, lastName, image, phone, age, userId];
  const command = `UPDATE users SET firstName= ? , lastName= ? , image= ? , phone= ?, age= ?  WHERE user_id=?; `;
  db.query(command, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(201);
  });
};

const deleteProfile = (req, res) => {
  const userId = req.params.id;
  const data = [userId];
  const command = `UPDATE users SET is_deleted =1 WHERE user_id= ?`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(500);
    res.json("This user is delete successful");
    res.status(201);
  });
};

const deleteProfile1 = (req, res) => {
  const userId = req.body.userId;
  const ServiceId = req.body.ServiceId;
  const data = [userId, ServiceId];
  const command = `UPDATE users_Services SET is_deleted =1 WHERE user_id= ? AND Service_id =?;`;
  db.query(command, data, (err, results) => {
    if (err) return res.status(500);
    res.json("This user is delete successful");
    res.status(201);
  });
};

const deleteFromUserServices = (req, res) => {
  const { userId, ServiceId } = req.body;
  const command = `UPDATE users_Services SET is_deleted =1 where user_id =? AND Service_id = ?`;
  data = [userId, ServiceId];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

module.exports = {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllUsersService,
  deleteFromUserServices,
  getProfileById1,
  getAllUsersService1,
  getAllUsers1,
  getProfileFirstName,

  deleteProfile1,
};
