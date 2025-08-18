export function mapBotChunksToMsgs(chunks) {
  return (chunks || [])
    .map((c) => {
      if (c.type === "text") return { role: "bot", type: "text", text: c.text };
      if (c.type === "choices") return { role: "bot", type: "choices", options: c.options || [] };
      if (c.type === "card") return { role: "bot", type: "card", ...c };
      return null;
    })
    .filter(Boolean);
}
