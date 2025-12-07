"use client";

export default function TerminalPanel({
  logs,
  onCommand,
}: {
  logs: string[];
  onCommand: (cmd: string) => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      (e.target as HTMLInputElement).value = "";
      if (value.trim()) onCommand(value.trim());
    }
  }

  return (
    <div className="h-40 bg-black text-green-400 text-xs font-mono flex flex-col">
      <div className="flex-1 overflow-auto p-2">
        {logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="border-t border-gray-700 px-2 py-1">
        <span className="text-green-500">$ </span>
        <input
          className="bg-transparent outline-none text-green-400 text-xs w-[90%]"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
