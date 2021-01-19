import express from "express";
import "./database/connection";

const app = express();

//faz com que o express reconheca JSON
app.use(express.json());

app.get("/users", (request, response) => {
  return response.json({ mess: "hello world" });
});

app.listen(3333);
