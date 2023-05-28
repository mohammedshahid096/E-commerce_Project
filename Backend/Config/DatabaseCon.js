import mongoose from "mongoose";

const DataBaseCon = () => {
  mongoose
    .connect(process.env.DBCONNECTION_URI_ONLINE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Data Base is Connceted to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default DataBaseCon;
