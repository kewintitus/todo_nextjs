import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', false);

  if (isConnected) {
    console.log('Already connected');
    return;
  }

  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mdb1.nzmjbpp.mongodb.net/`,
      { dbName: 'TODOApp', useNewUrlParser: true, useUnifiedTopology: true }
    );
    isConnected = true;
    console.log('DB Connected successfully');
  } catch (error) {
    console.log('Error connecting to DB', error);
  }
};
