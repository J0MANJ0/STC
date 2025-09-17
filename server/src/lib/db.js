import mongoose from 'mongoose';
import { ENV } from './env.js';

const connectDB = async () => {
  try {
    const { CONN_STR } = ENV;

    const conn = await mongoose.connect(`${CONN_STR}/stc_db`);

    console.log('\nDATABASE CONNECTED:', conn.connection.host);
  } catch (error) {
    console.log('Error conecting DB', error);
    process.exit(1);
  }
};

export default connectDB;
