
import { useRouter } from "next/router";
import React, { useEffect } from "react";



function BlogsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/blog");
    return () => {};
  }, []);

  return <></>;
}

export default BlogsPage;
