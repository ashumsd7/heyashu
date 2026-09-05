/**
 * Shared helpers for notes chapter pages (sidebar list from markdown front matter).
 */

export function noteSeasonNumber(noteOrItem) {
  const raw =
    noteOrItem?.frontMatter?.seasonNumber ?? noteOrItem?.seasonNumber;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/** Build sidebar lesson list from getStaticProps `notes` array. */
export function buildNotesSidebarList(notes = []) {
  const list = (notes || []).map((item, index) => ({
    id: item.frontMatter?.episode ?? index,
    episode: item.frontMatter?.episode,
    seasonNumber: noteSeasonNumber(item),
    title: item.frontMatter?.title || item.frontMatter?.name,
    profilePic: item.frontMatter?.profilePic,
    followLink: item.frontMatter?.followLink,
    author: item.frontMatter?.author,
    tags: item.frontMatter?.tags,
    name: item.frontMatter?.name,
    episodeTitle: item.frontMatter?.episodeTitle,
    updatedOn: item.frontMatter?.updatedOn,
    thumbnail: item.frontMatter?.thumbnail,
    publishedOn: item.frontMatter?.publishedOn || "Seeding Soon",
    slug: item.slug,
  }));

  return list.sort((a, b) => (Number(a.episode) || 0) - (Number(b.episode) || 0));
}

/**
 * Group sidebar lessons into season accordions.
 * `seasons` is the manageable list of { seasonNumber, title }.
 */
export function buildSeasonSidebarSections(notes = [], seasons = []) {
  const list = buildNotesSidebarList(notes);
  const config =
    seasons.length > 0
      ? seasons
      : [...new Set(list.map((item) => item.seasonNumber))]
          .sort((a, b) => a - b)
          .map((n) => ({ seasonNumber: n, title: `Season ${n}` }));

  return config.map((s) => ({
    title: s.title,
    seasonNumber: s.seasonNumber,
    lessons: list.filter((item) => item.seasonNumber === s.seasonNumber),
  }));
}
