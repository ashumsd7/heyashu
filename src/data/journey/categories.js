export const JOURNEY_CATEGORIES = [
  { id: "all", label: "All", color: "#64748b", bg: "bg-slate-500/15", text: "text-slate-700 dark:text-slate-300", ring: "ring-slate-400/40", bar: "bg-slate-500" },
  { id: "general", label: "General", color: "#57534e", bg: "bg-stone-500/15", text: "text-stone-700 dark:text-stone-300", ring: "ring-stone-400/40", bar: "bg-stone-500" },
  { id: "books", label: "Books", color: "#d97706", bg: "bg-amber-500/15", text: "text-amber-800 dark:text-amber-300", ring: "ring-amber-400/40", bar: "bg-amber-500" },
  { id: "films", label: "Films", color: "#e11d48", bg: "bg-rose-500/15", text: "text-rose-700 dark:text-rose-300", ring: "ring-rose-400/40", bar: "bg-rose-500" },
  { id: "webseries", label: "Webseries", color: "#7c3aed", bg: "bg-violet-500/15", text: "text-violet-700 dark:text-violet-300", ring: "ring-violet-400/40", bar: "bg-violet-500" },
  { id: "poems", label: "Poems", color: "#db2777", bg: "bg-pink-500/15", text: "text-pink-700 dark:text-pink-300", ring: "ring-pink-400/40", bar: "bg-pink-500" },
  { id: "people", label: "People", color: "#0284c7", bg: "bg-sky-500/15", text: "text-sky-700 dark:text-sky-300", ring: "ring-sky-400/40", bar: "bg-sky-500" },
  { id: "family-time", label: "Family Time", color: "#ea580c", bg: "bg-orange-500/15", text: "text-orange-700 dark:text-orange-300", ring: "ring-orange-400/40", bar: "bg-orange-500" },
  { id: "stories", label: "Stories", color: "#0d9488", bg: "bg-teal-500/15", text: "text-teal-700 dark:text-teal-300", ring: "ring-teal-400/40", bar: "bg-teal-500" },
  { id: "travel", label: "Travel", color: "#059669", bg: "bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-300", ring: "ring-emerald-400/40", bar: "bg-emerald-500" },
  { id: "dish", label: "Dish", color: "#65a30d", bg: "bg-lime-500/15", text: "text-lime-800 dark:text-lime-300", ring: "ring-lime-400/40", bar: "bg-lime-500" },
  { id: "donations", label: "Donations", color: "#dc2626", bg: "bg-red-500/15", text: "text-red-700 dark:text-red-300", ring: "ring-red-400/40", bar: "bg-red-500" },
  { id: "links", label: "Links", color: "#2563eb", bg: "bg-blue-500/15", text: "text-blue-700 dark:text-blue-300", ring: "ring-blue-400/40", bar: "bg-blue-500" },
  { id: "courses", label: "Courses", color: "#4f46e5", bg: "bg-indigo-500/15", text: "text-indigo-700 dark:text-indigo-300", ring: "ring-indigo-400/40", bar: "bg-indigo-500" },
  { id: "projects", label: "Projects", color: "#0891b2", bg: "bg-cyan-500/15", text: "text-cyan-700 dark:text-cyan-300", ring: "ring-cyan-400/40", bar: "bg-cyan-500" },
  { id: "places", label: "Places", color: "#16a34a", bg: "bg-green-500/15", text: "text-green-700 dark:text-green-300", ring: "ring-green-400/40", bar: "bg-green-500" },
  { id: "ideas", label: "Ideas", color: "#ca8a04", bg: "bg-yellow-500/15", text: "text-yellow-800 dark:text-yellow-300", ring: "ring-yellow-400/40", bar: "bg-yellow-500" },
  { id: "other", label: "Other", color: "#6b7280", bg: "bg-gray-500/15", text: "text-gray-700 dark:text-gray-300", ring: "ring-gray-400/40", bar: "bg-gray-500" },
];

export function getJourneyCategory(id) {
  return (
    JOURNEY_CATEGORIES.find((c) => c.id === id) ||
    JOURNEY_CATEGORIES.find((c) => c.id === "general")
  );
}
