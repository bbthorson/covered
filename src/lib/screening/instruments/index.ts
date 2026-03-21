import type { InstrumentMeta } from "../types";
import { audit } from "./audit";
import { dast10 } from "./dast10";
import { cage } from "./cage";

export const instruments: Record<string, InstrumentMeta> = {
  audit,
  dast10,
  cage,
};

export function getInstrument(id: string): InstrumentMeta | undefined {
  return instruments[id];
}

export function getAllInstruments(): InstrumentMeta[] {
  return Object.values(instruments);
}
