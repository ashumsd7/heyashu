import React from "react";
import { useRouter } from "next/router";
import CommonHeadTags from "@/components/seo/CommonHeadTags";

const LandingPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(
      "/digital-garden/notes/namaste-ai-notes/welcome-to-namaste-ai-notes"
    );
  }, [router]);

  return (
    <CommonHeadTags
      title="Namaste AI Notes"
      url="https://www.heyashu.in/digital-garden/notes/namaste-ai-notes"
    />
  );
};

export default LandingPage;
