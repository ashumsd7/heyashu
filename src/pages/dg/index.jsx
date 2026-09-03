import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RedirectToDigitalGarden() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/digital-garden");
  }, [router]);

  return null;
}