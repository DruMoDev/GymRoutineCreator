import jwt from "jsonwebtoken";

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateJWT;



console.log(jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwbTg3cTA2YTdnMWh1djYyZ250IiwiaWF0IjoxNzE2ODg1OTk2LCJleHAiOjE3MTk0Nzc5OTZ9.UK1HZHm_XdlsG-eMLBQETZqs7re4xvIDx8areb9jVxM", "drumivillanofavorito"));
