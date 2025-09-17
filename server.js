const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let userData = [
  { email: "user@gmail.com", pass: "12345", firstname: "uzair", lastname: "faiz" }
];

app.post("/signup", (req, res) => {
  const { userEmail, passowrd, firstname, lastname } = req.body;

  if (!userEmail || !passowrd || !firstname || !lastname) {
    return res.send("All fields are required ");
  }

  if (passowrd.length < 5) {
    return res.send("Password length must be at least 5 ");
  }

  // Check if email already exists (for loop)
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email === userEmail) {
      return res.send({
        message: "User already registered "
      });
    }
  }

  
  userData.push({ email: userEmail, pass: passowrd, firstname, lastname });
  return res.send({
    message: "Signup successful ",
    users: userData
  });
});


app.post("/login", (req, res) => {
  const { userEmail, passowrd } = req.body;
  let isFound = false;

  if (!userEmail || !passowrd) {
    return res.send("Email and password required ");
  }

  if (passowrd.length < 5) {
    return res.send("Password length must be at least 5 ");
  }

  for (let i = 0; i < userData.length; i++) {
    if (userEmail === userData[i].email && passowrd === userData[i].pass) {
      isFound = true;
      return res.send({
        message: "Login successfully ",
        user: userData[i]
      });
    }
  }

  if (isFound === false) {
    return res.send({
      message: "User Not Found "
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
