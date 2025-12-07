export interface AIMessage {
  id: number;
  sender: "user" | "ai";
  content: string; // markdown
}
