import * as Joi from 'joi';
export const JoiValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_HOURS_EXPIRE: Joi.number().default(24),
  DB_NAME: Joi.string().required(),
  DB_URI: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  HASH: Joi.string().required(),
  PORT: Joi.number().default(8000),
  APP_NAME: Joi.string().default('Project Name'),
  URL_APP: Joi.string().default('http://localhost:3000'),
  CACHE_URL: Joi.string().default('redis://localhost:6379'),
});
