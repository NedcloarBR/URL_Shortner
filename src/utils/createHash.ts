import { createHash as cH } from "node:crypto";
export const createHash = (): string => cH("sha1").update(Math.random().toString()).digest("hex").substring(0, 10);
