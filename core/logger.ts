import * as log from "jsr:@std/log";

await log.setup({
    //define handlers
    handlers: {
        console: new log.ConsoleHandler("DEBUG", {
            formatter: (record) => `${record.datetime} ${record.levelName} ${record.msg}`
        }),
        file: new log.RotatingFileHandler('INFO', {
            filename: `./server-${new Date().getTime()}.log`,
            maxBytes: 15,
            maxBackupCount: 5,
            formatter: rec => JSON.stringify({region: rec.loggerName, ts: rec.datetime, level: rec.levelName, data: rec.msg})})
    },
    //assign handlers to loggers  
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console"],
        },
        client: {
            level: "DEBUG",
            handlers: ["file"]
        }
    },
});

export const logger = log.getLogger();