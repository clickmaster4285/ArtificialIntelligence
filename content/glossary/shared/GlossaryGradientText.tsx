"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

/* =========================================================
   TYPES
========================================================= */

interface GlossaryGradientTextProps {
  text: string;
  highlightWordCount?: number;
}

/* =========================================================
   HELPERS
========================================================= */

function splitHeadingText(
  text: string,
  highlightWordCount: number,
) {
  const words = text.trim().split(/\s+/);

  if (words.length <= 1) {
    return {
      lead: "",
      highlight: text,
    };
  }

  const safeHighlightCount = Math.min(
    Math.max(1, highlightWordCount),
    Math.max(1, words.length - 1),
  );

  return {
    lead: words
      .slice(
        0,
        words.length - safeHighlightCount,
      )
      .join(" "),
    highlight: words
      .slice(
        words.length - safeHighlightCount,
      )
      .join(" "),
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export function GlossaryGradientText({
  text,
  highlightWordCount = 2,
}: GlossaryGradientTextProps) {
  const reduceMotion = useReducedMotion();

  const { lead, highlight } =
    splitHeadingText(
      text,
      highlightWordCount,
    );

  return (
    <>
      {lead && `${lead} `}

      <motion.span
        className="inline-block bg-[linear-gradient(100deg,#c084fc_0%,#f0abfc_34%,#a78bfa_62%,#22d3ee_100%)] bg-[length:220%_100%] bg-clip-text font-serif italic font-normal text-transparent drop-shadow-[0_0_22px_rgba(168,85,247,0.28)]"
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {highlight}
      </motion.span>
    </>
  );
}
