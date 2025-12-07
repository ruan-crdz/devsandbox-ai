export type LogType = "log" | "error";

export interface LogEntry {
  id: number;
  type: LogType;
  message: string;
}
