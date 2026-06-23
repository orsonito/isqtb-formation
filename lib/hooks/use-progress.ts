"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";
import type { Progress } from "@/lib/types";

export function useProgress() {
  const [progress, setProgressState] = useState<Progress>({ chapters: {}, examAttempts: [] });

  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  function refresh() {
    setProgressState(getProgress());
  }

  return { progress, refresh };
}
