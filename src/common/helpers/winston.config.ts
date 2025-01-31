import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

export function WinstonConfig() {
	const { Console, DailyRotateFile } = transports;
	const {
		combine,
		colorize,
		timestamp,
		printf,
		prettyPrint,
		align,
		uncolorize,
		ms,
	} = format;

	const fileFormat = combine(
		colorize(),
		uncolorize(),
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		prettyPrint({ depth: 5 }),
		printf(
			(info) =>
				`${info.timestamp} ${info.level} [${info.context || 'Application'}]: ${
					info.message
				}`,
		),
	);

	const consoleFormat = combine(
		colorize({ all: true }),
		timestamp({ format: 'DD/MM/YYYY, HH:mm:ss' }),
		align(),
		printf(({ context, level, timestamp, message }) => {
			return `[Nest] ${level} - ${timestamp}  [${
				context || 'Application'
			}]  ${message}`;
		}),
		ms(),
	);

	return createLogger({
		level: 'info',
		transports: [
			new Console({ format: consoleFormat }),
			// * Referencia a logs de archivos
			// new DailyRotateFile({
			//   filename: 'logs/%DATE%_combined.log',
			//   datePattern: 'YYYY-MM-DD',
			//   maxFiles: '1d',
			//   format: fileFormat,
			// }),
			// * Valores de error
			new DailyRotateFile({
				filename: 'logs/%DATE%_errors.log',
				datePattern: 'YYYY-MM-DD',
				maxFiles: '7d',
				level: 'error',
				format: fileFormat,
			}),
			// * Para enviar logs a otro servidor
			// new Http({
			//   format: json(),
			//   host: 'localhost',
			//   port: 4000,
			//   path: '/logs',
			//   ssl: false,
			//   batch: true,
			//   batchCount: 10,
			//   batchInterval: 10000,
			// }),
		],
	});
}
