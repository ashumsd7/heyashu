/**
 * Shared helpers for notes chapter pages (sidebar list from markdown front matter).
 */

/** Build sidebar lesson list from getStaticProps `notes` array. */
export function buildNotesSidebarList(notes = []) {
  const list = (notes || []).map((item, index) => ({
    id: item.frontMatter?.episode ?? index,
    episode: item.frontMatter?.episode,
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
