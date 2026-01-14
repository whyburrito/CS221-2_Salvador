import express from "express";

const app = express();
const PORT = 3000;

//get -> display name, var name = "sean",
//post -> logic, if usename="sean" password="Pass123" success else fail

app.use(express.json());

app.get("/getName", (req, res) => {
  var name = "sean";
  res.status(200).json(name);
});

app.post("/login", (req, res) => {
  var { username, password } = req.body;

  if (username == "sean" && password == "Pass123") {
    res.status(200).json({
      message: "Login Successful",
      status: "success",
    });
  } else {
    res.status(403).json({
      message: "Invalid Username or Password",
      status: "failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
