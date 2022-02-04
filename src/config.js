const config = {
  PERS: process.env.PERS,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST
}

export default {
  ...config,
  mongodb: {
    cnxStr: `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_DATABASE}?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }
  }
}
