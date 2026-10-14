"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const LOADER_KEY = "loader-seen";

/** Runs before first paint: visitors who've already seen the loader this session skip it with no flash. */
export const loaderSkipScript = `try{if(sessionStorage.getItem("${LOADER_KEY}"))document.documentElement.classList.add("no-loader")}catch(e){}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Intro overlay: types "Hi there", backspaces, types "Welcome", then slides away. Once per session. */
export default function Loader() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(LOADER_KEY);
    } catch {}
    if (seen) {
      setOpen(false);
      return;
    }

    let cancelled = false;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const type = async (word: string) => {
      for (let i = 1; i <= word.length && !cancelled; i++) {
        setText(word.slice(0, i));
        await sleep(90);
      }
    };
    const erase = async (word: string) => {
      for (let i = word.length - 1; i >= 0 && !cancelled; i--) {
        setText(word.slice(0, i));
        await sleep(40);
      }
    };

    (async () => {
      await sleep(300);
      await type("Hi there");
      await sleep(650);
      await erase("Hi there");
      await sleep(150);
      await type("Welcome");
      await sleep(700);
      if (cancelled) return;
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {}
      setOpen(false);
    })();

    return () => {
      cancelled = true;
      root.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
      {open && (
        <motion.div
          className="loader"
          role="status"
          aria-label="Loading"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="loader-text" aria-hidden>
            {text}
            <span className="caret">_</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
