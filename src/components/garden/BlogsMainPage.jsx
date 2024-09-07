import React from "react";
import Markdown from "../base/Markdown";
import BlogMetaInfo from "../tech/notes-layout/BlogMetaInfo";
import Head from "next/head";

function BlogsMainPage({ blogInfo, large }) {
  return (
    <>
      <Head>
        <title>
          {" "}
          {blogInfo?.title} by {blogInfo?.name}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/digigarden.ico" />
        {blogInfo?.metaInfo?.map((info) => {
          return (
            <meta key={info.name} name={info.name} content={info.content} />
          );
        })}
      </Head>

      <div
        className={`flex flex-col gap-2  max-w-screen-[1000px] m-auto ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >

       {/* Blog Hero Image */}
        {/* {blogInfo?.heroImage && (
          <Image alt={blogInfo?.title} src={blogInfo?.heroImage} width='300' height={'300'} />
        )} */}



        {/* Blog Title */}
        {blogInfo?.title && (
          <h2 className="text-black lg:text-[42px] text-2xl font-bold  md:text-center text-justify  mb-2 mt-10 md:mt-0    ">
            {blogInfo?.title}
          </h2>
        )}

       
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
