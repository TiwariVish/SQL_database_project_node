// index.js
import { app } from "./app.js";
import sequelize from "./DB/index.js"
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

const startServer = async () => {
  try {
    // await connectMySQL();
    await sequelize.authenticate();
    console.log("MySQL connected successfully:::::");
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
      console.log(`Server is running on PORT::::: ${PORT}`);
    });

  } catch (error) {
    console.error("Error starting the server:::", error);
    process.exit(1); 
  }
};

startServer();