import { useState, useRef } from "react";
import { sendMessage } from "../services/api";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const sessionId = useRef(crypto.randomUUID());

  const send = async () => {
    const userMsg = input;
    setInput("");

    setChat((c) => [...c, { role: "user", content: userMsg }]);

    const reply = await sendMessage(userMsg, sessionId.current);

    setChat((c) => [...c, { role: "assistant", content: reply }]);
  };

  return (
    <div>
      {chat.map((m, i) => (
        <div key={i}>
          <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
