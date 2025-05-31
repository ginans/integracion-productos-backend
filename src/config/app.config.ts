export const EnvConfiguration = () => ({
  jwt_secret: process.env.JWT_SECRET,
  db_name: process.env.DB_NAME,
  db_uri: process.env.DB_URI,
  node_env: process.env.NODE_ENV,
  hash: process.env.HASH,
  port: process.env.PORT || 3000,
  jwt_hours_expire: process.env.JWT_HOURS_EXPIRE ? parseInt(process.env.JWT_HOURS_EXPIRE, 10) : 24,
  app_name: process.env.APP_NAME || 'Project Name',
  url_app: process.env.URL_APP || 'http://localhost:3000',
  cache_url: process.env.CACHE_URL || 'redis://localhost:6379',
});