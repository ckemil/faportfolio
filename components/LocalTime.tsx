"use client";

import { useEffect, useState } from "react";

/** Live clock in Fathima's timezone (UAE). */
export default function LocalTime({ timeZone = "Asia/Dubai" }: { timeZone?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span suppressHydrationWarning>{time || " "}</span>;
}
