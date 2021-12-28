const connection = require("../../db/db");

const addToFavorite = async (req, res) => {
  const { userID, ServiceID } = req.body;
  console.log("userI2222D", userID);
  console.log("ServiceID2222", ServiceID);

  const query = `INSERT INTO users_Services (user_id,Service_id) VALUES (?,?);`;
  const data = [userID, ServiceID];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    res.json(results);
  });
  // const query_select = `SELECT * FROM users_Services WHERE user_id= ? && Service_id = ?`;
  // const data_select = [userID, ServiceID];
  // const favorite = await connection.promise().query(query_select, data_select);
  // res.status(200).json(favorite[0]);
};

const getFavorite = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,Service,photo,video,Serviceer_id,Services.Service_id FROM users
  INNER JOIN users_Services ON users.user_id = users_Services.user_id AND  users_Services.user_id =? 
  INNER JOIN Services ON users_Services.Service_id = Services.Service_id AND users_Services.is_deleted=0`;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) return res.status(404).json(err);
    res.status(200).json(results);
  });
};

const deleteFavorite = (req, res) => {
  const { ServiceId, userId } = req.body;
  console.log("ServiceId", ServiceId);
  console.log("userId", userId);

  const query = `UPDATE users_Services SET is_deleted = 1 WHERE Service_id =? AND user_id =?;`;
  const data = [ServiceId, userId];
  connection.query(query, data, (err, results) => {
    if (err) return res.json(err);
    // res.status(202).json("deleted successfully");
  });
};

module.exports = {
  addToFavorite,
  getFavorite,
  deleteFavorite,
};
