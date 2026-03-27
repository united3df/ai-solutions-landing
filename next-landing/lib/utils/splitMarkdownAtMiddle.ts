
function splitMarkdownBlocks(md: string): string[] {
  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let current: string[] = [];
  let inFence = false;

  const flush = () => {
    const text = current.join("\n").trim();
    if (text) blocks.push(text);
    current = [];
  };

  for (const line of lines) {
    const trimmedStart = line.trimStart();
    if (trimmedStart.startsWith("```")) {
      inFence = !inFence;
    }
    if (!inFence && line === "" && current.length > 0) {
      flush();
      continue;
    }
    current.push(line);
  }
  flush();
  return blocks;
}

function splitSingleBlockBySentences(block: string): [string, string] {
  const parts = block.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return [block, ""];
  }
  const mid = Math.floor(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

export function splitMarkdownAtMiddle(content: string): [string, string] {
  const trimmed = content.trim();
  if (!trimmed) {
    return ["", ""];
  }

  const blocks = splitMarkdownBlocks(trimmed);
  if (blocks.length === 0) {
    return [trimmed, ""];
  }

  if (blocks.length === 1) {
    return splitSingleBlockBySentences(blocks[0]);
  }

  const mid = Math.floor(blocks.length / 2);
  const top = blocks.slice(0, mid).join("\n\n");
  const bottom = blocks.slice(mid).join("\n\n");
  return [top, bottom];
}
