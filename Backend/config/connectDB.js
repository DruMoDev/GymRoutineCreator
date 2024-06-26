import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connection = await connect(process.env.MONGOOSE_URI);

    // Esto es solo para saber información de conexion y mostrarlo en un clg
    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connectDB;

