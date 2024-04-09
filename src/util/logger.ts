import * as winston from 'winston';

const {combine, timestamp, printf, colorize, align} = winston.format;

/**
 * Winston logger instance.
 */
export const logger = winston.createLogger({
  format: combine(
    colorize({all: true}),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info: any) => {
      if (info.skipFormat) {
        return info.message;
      }
      return `[${info.timestamp}] ${info.level}: ${info.message}
${info.stack || ''}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
