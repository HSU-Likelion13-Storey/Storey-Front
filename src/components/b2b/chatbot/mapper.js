export function mapBotChunksToMsgs(chunks) {
  return (chunks || [])
    .map((c) => {
      if (c.type === "text") {
        return { role: "bot", type: "text", text: c.text };
      }
      if (c.type === "choices" || c.type === "categories") {
        return { role: "bot", type: c.type, options: c.options || [] };
      }
      if (c.type === "card") {
        return {
          role: "bot",
          type: "card",
          imageSrc: c.imageSrc,
          name: c.name,
          speech: c.speech,
          description: c.description,
        };
      }
      return null;
    })
    .filter(Boolean);
}
