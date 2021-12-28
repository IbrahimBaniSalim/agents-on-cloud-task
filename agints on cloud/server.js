const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/db");

//routers//
const registerRouter = require("./routers/routes/auth/signUp");
const loginRouter = require("./routers/routes/auth/login");
const favoriteRouter = require("./routers/routes/favorite");
const buyerRouter = require("./routers/routes/buyer");
const profileRouter = require("./routers/routes/profile");
const ServiceRouter = require("./routers/routes/seller");

const imageRouter = require("./routers/routes/Image");

const app = express();

//third-party middleware
app.use(express.json());
app.use(cors());


//app routers
app.use(registerRouter);
app.use(loginRouter);
app.use(buyerRouter);
app.use(favoriteRouter);

app.use(imageRouter);
app.use(profileRouter);
app.use(ServiceRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
