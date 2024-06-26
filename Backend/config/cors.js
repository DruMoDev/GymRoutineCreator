// CORS
let whitelist = [process.env.FRONTEND_URL, process.env.BACKEND_URL, "https://gym-routine-creator-dru.vercel.app", "https://gym-routine-creator-dru.vercel.app/", "http://gym-routine-creator-dru.vercel.app", "http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOptions;
