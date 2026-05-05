export default () => ({
  app: {
    port: parseInt(process.env.PORT!, 10),
    env: process.env.NODE_ENV,
  },
  database: {
    url: process.env.DATABASE_URL!,
  }
});