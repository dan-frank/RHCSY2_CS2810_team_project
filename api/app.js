require("dotenv").config();
const http = require("http");
const app = require("express")();
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const Stripe = require("stripe");
const config = require("config");

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST", "UPDATE"],
  },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use((req, res, next) => {
  res.locals["socketio"] = io;
  res.locals["stripe"] = stripe;
  next();
});
app.use("/", routes);

const port = config.Port || 3000;
module.exports = server.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
