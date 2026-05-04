export default () => ({
  app: {
    port: parseInt(process.env.PORT!, 10),
    env: process.env.NODE_ENV,
  },
});