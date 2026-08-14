/**
 * Barrel for Digital Garden static data + helpers.
 * Dynamic blog/notes bodies still load from markdown under src/content.
 */
export * from "./constants";
export * from "./khakiMarquee";
export * from "./testimonials";
export * from "./stats";
export * from "./aiFeatures";
export * from "./support";
export * from "./utils";
// loadBlogs uses Node `fs` — import from `@/data/garden/loadBlogs` only in getStaticProps
