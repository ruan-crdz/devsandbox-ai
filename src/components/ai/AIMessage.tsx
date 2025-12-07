"use client";

export default function AIMessage({ sender, content }: {
  sender: "user" | "ai";
  content: string;
}) {

  const isUser = sender === "user";

  return (
    <div className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap
          ${isUser 
            ? "bg-[#38BDF8] text-black" 
            : "bg-[#1E293B] text-gray-200"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
