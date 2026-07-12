import { useState, useEffect, useCallback, useRef } from "react";

export type LineType = "cmd" | "success" | "error" | "info" | "output";

export interface TerminalMessage {
  text: string;
  type: LineType;
  prompt?: string; // only for "cmd" lines
}

export interface TypewriterState {
  /** Lines fully typed so far (index → displayed text) */
  lines: string[];
  /** Index of the line currently being typed (-1 = not started) */
  activeIndex: number;
  isFinished: boolean;
  reset: () => void;
}

export function useTypewriter(
  textMessages: TerminalMessage[],
  speed = 30,
  delayBetweenLines = 800
): TypewriterState {
  const [lines, setLines]           = useState<string[]>([]);
  const [activeIndex, setActive]    = useState(-1);
  const [isFinished, setFinished]   = useState(false);
  const timersRef                   = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const start = useCallback(() => {
    clearTimers();
    setLines([]);
    setActive(-1);
    setFinished(false);

    let cursor = 0; // absolute ms from now

    textMessages.forEach((msg, lineIdx) => {
      const fullText = msg.type === "cmd" && msg.prompt
        ? `${msg.prompt} ${msg.text}`
        : msg.text;

      // small pause before each line starts
      cursor += lineIdx === 0 ? 0 : delayBetweenLines;
      const lineStart = cursor;

      // reveal line slot immediately so the array index exists
      timersRef.current.push(
        setTimeout(() => {
          setActive(lineIdx);
          setLines(prev => {
            const next = [...prev];
            next[lineIdx] = "";
            return next;
          });
        }, lineStart)
      );

      // type each character
      for (let i = 1; i <= fullText.length; i++) {
        const charDelay = lineStart + i * speed;
        cursor = Math.max(cursor, charDelay);
        timersRef.current.push(
          setTimeout(() => {
            setLines(prev => {
              const next = [...prev];
              next[lineIdx] = fullText.slice(0, i);
              return next;
            });
          }, charDelay)
        );
      }

      // mark finished after last line completes
      if (lineIdx === textMessages.length - 1) {
        timersRef.current.push(
          setTimeout(() => {
            setActive(-1);
            setFinished(true);
          }, cursor + speed)
        );
      }
    });
  }, [textMessages, speed, delayBetweenLines]);

  useEffect(() => {
    start();
    return clearTimers;
  }, [start]);

  return { lines, activeIndex, isFinished, reset: start };
}
