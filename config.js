import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    host: process.env.SERVER_IP || 'localhost',
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    name: 'mongodb',
    host: process.env.MONGODB_IP || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    user: process.env.MONGODB_USER || 'admin',
    password: process.env.MONGODB_PASSWORD || 'admin',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
};

if (process.env.NODE_ENV === 'test') config.database.name += '-test';

config.database.uri = process.env.NODE_ENV === 'production'
  ? `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}?authSource=admin`	
  : `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;

export default config;
