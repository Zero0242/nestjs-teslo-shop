import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
	PORT: number;
	HOST_URL: string;
	APP_VERSION: string;
	STAGE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_NAME: string;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	JWT_SECRET: string;
	JWT_DURATION: string;
}

const schema = Joi.object<EnvVars>({
	PORT: Joi.number().default(3000),
	HOST_URL: Joi.string().default('http://127.0.0.1:3000'),
	APP_VERSION: Joi.string(),
	STAGE: Joi.string(),
	DB_HOST: Joi.string().required(),
	DB_NAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_PORT: Joi.number().required(),
	DB_USERNAME: Joi.string().required(),
	JWT_SECRET: Joi.string().default('nestjsapplication'),
	JWT_DURATION: Joi.string().default('1h'),
}).unknown(true);

const { value, error } = schema.validate(process.env);

if (error) throw new Error(`Faltan configuraciones ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvVars = {
	PORT: envVars.PORT,
	APP_VERSION: envVars.APP_VERSION,
	DB_HOST: envVars.DB_HOST,
	DB_NAME: envVars.DB_NAME,
	DB_PASSWORD: envVars.DB_PASSWORD,
	DB_PORT: envVars.DB_PORT,
	DB_USERNAME: envVars.DB_USERNAME,
	HOST_URL: envVars.HOST_URL,
	JWT_DURATION: envVars.JWT_DURATION,
	JWT_SECRET: envVars.JWT_SECRET,
	STAGE: envVars.STAGE,
};
