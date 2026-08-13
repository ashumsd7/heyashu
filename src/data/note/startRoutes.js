import { NOTES_CONFIG } from "@/data/note/allNotes";

/** First chapter to open for a notes collection (sidebar + reader). */
export function getNotesStartRoute(noteOrRoute) {
  if (typeof noteOrRoute === "string") return noteOrRoute;
  return noteOrRoute?.route || "/digital-garden/notes";
}

/** Default entry into notes reading from marketing CTAs */
export const DEFAULT_NOTES_START_ROUTE =
  NOTES_CONFIG.find((n) => !n.isComingSoon && n.route)?.route ||
  "/digital-garden/notes/namaste-node-js/prerequisite";
