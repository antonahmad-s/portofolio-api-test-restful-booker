import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
  username: process.env.API_USERNAME || 'admin_user',
  password: process.env.API_PASSWORD || 'Kapanya2233!',
};
