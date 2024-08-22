import React from "react";
import Markdown from "./Markdown";
import BlogMetaInfo from "../tech/notes-layout/BlogMetaInfo";
import Image from "next/image";
import Head from "next/head";

function BlogsMainPage({ blogInfo }) {
  return (
    <>
      <Head>
        <title>
          {" "}
          {blogInfo?.title} by {blogInfo?.name}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {blogInfo?.metaInfo?.map((info) => {
          return (
            <meta key={info.name} name={info.name} content={info.content} />
          );
        })}
      </Head>

      <div className="flex flex-col gap-2 px-4 max-w-screen-lg m-auto">
        {/* Blog Title */}
        {blogInfo?.title && (
          <h2 className="text-black lg:text-6xl text-3xl font-bold  mb-2   mr-14   ">
            {blogInfo?.title}
          </h2>
        )}

        {/* Blog Hero Image */}
        {/* {blogInfo?.heroImage && (
          <Image alt={blogInfo?.title} src={blogInfo?.heroImage} width='300' height={'300'} />
        )} */}
        {/* Blog Meta Info */}
        <div className="mb-4">
          <BlogMetaInfo data={blogInfo} />
        </div>
        {/* Main Blog Content */}
        <Markdown content={blogInfo?.markdown} />
      </div>
    </>
  );
}

export default BlogsMainPage;
