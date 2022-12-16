import Head from "next/head";
import React from "react";

export default function HeadMeta({ title, description, url, image }: any) {
  return (
    <Head>
      <title>{title || "원서치"}</title>
      <meta name="description" content={description || "오픈마켓 원서치 검색"} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "원서치"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://search-one.netlify.app/"} />
      {/* <meta property="og:image" content={image} /> */}
      <meta property="og:article:author" content="원서치" />
    </Head>
  );
}
