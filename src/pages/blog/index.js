import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function BlogIndex({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.frontMatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content', 'blog'))
  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const markdownWithMeta = fs.readFileSync(path.join('content', 'blog', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    return {
      slug,
      frontMatter
    }
  })
  return {
    props: {
      posts
    }
  }
}