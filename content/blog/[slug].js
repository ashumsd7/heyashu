import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { getMDXRemote } from 'next-mdx-remote/rsc';

export default function BlogPost({ source, frontMatter }) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('src/pages/content/blog'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('content/blog', `${slug}.mdx`), 'utf-8');
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const source = await getMDXRemote(content);

  return {
    props: {
      source,
      frontMatter,
    },
  };
}
