export type LogLevel = "debug" | "info" | "warning" | "error";

export function log(logLevel: LogLevel, content: string) {
  const logLevelPrecedence = {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3,
  };

  const configedLevel = process.env.LOG_LEVEL || "info";
  const configedPrecedence = logLevelPrecedence[configedLevel];

  const logPrecedence = logLevelPrecedence[logLevel];

  if (logPrecedence >= configedPrecedence) {
    console.log(content);
  }
}
