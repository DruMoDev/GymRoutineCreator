import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "production.env" });
  } else {
    dotenv.config({ path: "development.env" });
  }