import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  HiHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFolderPlus,
  HiOutlinePencilSquare,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import BackToGarden from "@/components/garden/BackToGarden";
import { withDigitalGardenLayout } from "@/layouts";
import {
  GARDEN_ADMIN_URL,
  GARDEN_CONNECT_LABEL,
  GARDEN_CONNECT_URL,
  GITHUB_PULLS_URL,
} from "@/data/garden/constants";
import { GITHUB_REPO_LINK } from "@/utils/constant";

const GUIDE_IMAGES = {
  1: "https://i.ibb.co/8DtgDhgC/1.png",
  2: "https://i.ibb.co/Dfs5kZ0K/2.png",
  3: "https://i.ibb.co/QvBm6kVH/3.png",
  4: "https://i.ibb.co/dJr3RkMz/4.png",
  5: "https://i.ibb.co/bMGdv1YF/5.png",
  6: "https://i.ibb.co/v6F9jqp1/6.png",
  7: "https://i.ibb.co/spJkhCm3/7.png",
  8: "https://i.ibb.co/cKks5zTw/8.png",
  9: "https://i.ibb.co/XZJsQMwj/9.png",
};

const TABS = [
  { id: "new", label: "New Blog / Notes", icon: HiOutlinePlusCircle },
  { id: "edit", label: "Edit Blog / Notes", icon: HiOutlinePencilSquare },
  { id: "new-note", label: "New note collection", icon: HiOutlineFolderPlus },
  { id: "testimonial", label: "Testimonial", icon: HiOutlineChatBubbleLeftRight },
];

const LIVE_STEPS = [
  { n: "01", title: "Select", body: "Open admin and pick Blog or a notes collection." },
  { n: "02", title: "Add", body: "Click + Blog or + chapter to open the editor." },
  { n: "03", title: "Write", body: "Add slug, title, thumbnail, and your content." },
  { n: "04", title: "Save", body: "Green toast means a pull request is ready. After merge, it is live." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function ExtLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#143825] underline decoration-[#cfc6b8] underline-offset-2 hover:text-[#9a4f2e] dark:text-[#22c55e] dark:decoration-[#2a4a38]"
    >
      {children}
    </a>
  );
}

function GuideShot({ n, alt, caption }) {
  return (
    <figure className="my-6 overflow-hidden rounded-md border border-[#e6e0d6] bg-white dark:border-[#1e3328] dark:bg-[#121e17]">
      <img
        src={GUIDE_IMAGES[n]}
        alt={alt}
        className="block w-full"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="border-t border-[#ece7de] px-4 py-2.5 text-xs text-[#8a8276] dark:border-[#1e3328] dark:text-[#6d7f74]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Step({ n, children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ece7de] font-ibm-mono text-[11px] font-semibold text-[#143825] dark:bg-[#172a20] dark:text-[#22c55e]">
        {n}
      </span>
      <p className="m-0 text-[0.98rem] leading-relaxed text-[#3f3a34] dark:text-[#c5d4cb]">
        {children}
      </p>
    </li>
  );
}

function HelpFooter() {
  return (
    <p className="mt-8 rounded-md border border-[#e6e0d6] bg-[#f3eee5] px-4 py-3 text-sm leading-relaxed text-[#5f584e] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#92a59a]">
      Stuck? Let's:{" "}
      <ExtLink href={GARDEN_CONNECT_URL}>{GARDEN_CONNECT_LABEL}</ExtLink>
      . I will help, then send you the live URL after the pull request is merged.
    </p>
  );
}

function WriteTab() {
  return (
    <div>
      <p className="mb-5 text-[1.05rem] leading-relaxed text-[#3f3a34] dark:text-[#c5d4cb]">
        Thank you for wanting to write here. This garden is open source — adding a
        blog or a notes chapter is a short, guided flow.
      </p>
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        <Step n="1">
          Go to <ExtLink href={GARDEN_ADMIN_URL}>heyashu.in/admin</ExtLink>.
        </Step>
        <Step n="2">
          Log in with GitHub (recommended) or Google.
        </Step>
        <Step n="3">
          Pick a collection — Blog, or a notes series such as Namaste Node.js or
          Namaste AI Notes.
        </Step>
        <Step n="4">
          Click <strong>+ Blog</strong> (or add a chapter). The same pattern works
          for every notes collection.
        </Step>
      </ol>
      <GuideShot n={1} alt="Admin collections" caption="Select Blog or a notes collection, then click + Blog / add chapter." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={5}>
        <Step n="5">
          Fill slug, title, and date. Use dashes in the slug for SEO
          (example: <code className="rounded bg-[#ece7de] px-1 py-0.5 text-[0.85em] dark:bg-[#172a20]">history-of-nodejs</code>).
        </Step>
        <Step n="6">
          Optional: choose a thumbnail — it becomes the first visual of your post.
        </Step>
      </ol>
      <GuideShot n={2} alt="Editor fields" caption="Slug, title, date, and thumbnail in the editor." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={7}>
        <Step n="7">
          Add your profile photo (upload or paste a URL) and social links.
        </Step>
        <Step n="8">
          Write in the large editor. You can insert images from the rich-text
          toolbar, or paste markdown directly.
        </Step>
      </ol>
      <GuideShot n={3} alt="Writing in the editor" caption="Write in the text area, add images, or paste markdown." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={9}>
        <Step n="9">
          Scroll up and click <strong>Save</strong>. Wait a few seconds for a
          green toast.
        </Step>
      </ol>
      <GuideShot n={4} alt="Green save toast" caption="Green toast = your pull request was created." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={10}>
        <Step n="10">
          I merge the pull request, then your blog or chapter goes live. Track it
          here: <ExtLink href={GITHUB_PULLS_URL}>github.com/ashumsd7/heyashu/pulls</ExtLink>
        </Step>
      </ol>
      <GuideShot n={5} alt="GitHub pull requests" caption="Open pull requests on the heyashu repo." />
      <HelpFooter />
    </div>
  );
}

function EditTab() {
  return (
    <div>
      <p className="mb-5 text-[1.05rem] leading-relaxed text-[#3f3a34] dark:text-[#c5d4cb]">
        Editing is almost the same as adding. Read the New blog /note tab (first tab) first if this is
        your first time — then follow this shorter path.
      </p>
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        <Step n="1">
          Go to <ExtLink href={GARDEN_ADMIN_URL}>heyashu.in/admin</ExtLink> and log in.
        </Step>
        <Step n="2">
          Open the collection (for example Namaste Node.js Notes).
        </Step>
        <Step n="3">
          On the right, pick the chapter you want to change — e.g. History of
          Node.js — and click it.
        </Step>
      </ol>
      <GuideShot n={6} alt="Chapter list in admin" caption="Select an existing chapter from the list on the right." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={4}>
        <Step n="4">
          The same editor opens, already filled. Change any field, then click
          Save.
        </Step>
      </ol>
      <GuideShot n={7} alt="Prefill editor" caption="Edit the filled fields, then save." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={5}>
        <Step n="5">
          Green toast means a pull request is open. I merge it, then the update
          is live. See PRs: <ExtLink href={GITHUB_PULLS_URL}>github.com/ashumsd7/heyashu/pulls</ExtLink>
        </Step>
      </ol>
      <GuideShot n={5} alt="GitHub pull requests" caption="Your edit lands as a pull request." />
      <HelpFooter />
    </div>
  );
}

function NewCollectionTab() {
  return (
    <div>
      <p className="mb-5 text-[1.05rem] leading-relaxed text-[#3f3a34] dark:text-[#c5d4cb]">
        A whole new notes collection takes a little more setup than a single
        chapter. If you code, fork the repo and add it the same way existing
        collections are added. If not, we can plan it together.
      </p>
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        <Step n="1">
          Fork <ExtLink href={GITHUB_REPO_LINK}>github.com/ashumsd7/heyashu</ExtLink>.
        </Step>
        <Step n="2">
          Add your notes collection the same way other series are wired in the
          repo, then open a pull request.
        </Step>
        <Step n="3">
          Prefer a walkthrough? Message me on{" "}
          <ExtLink href={GARDEN_CONNECT_URL}>{GARDEN_CONNECT_LABEL}</ExtLink>{" "}
          — we will figure it out.
        </Step>
      </ol>
      <GuideShot n={8} alt="Fork the heyashu repository" caption="Fork the open-source repo to add a new notes collection." />
      <HelpFooter />
    </div>
  );
}

function TestimonialTab() {
  return (
    <div>
      <p className="mb-5 text-[1.05rem] leading-relaxed text-[#3f3a34] dark:text-[#c5d4cb]">
        Glad you want to leave a testimonial. The Write tab shows the same
        admin flow. We use a real pull request so feedback stays honest — it
        helps authors grow.
      </p>
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        <Step n="1">
          Log in at <ExtLink href={GARDEN_ADMIN_URL}>heyashu.in/admin</ExtLink>.
        </Step>
        <Step n="2">
          Open the Testimonials collection and click <strong>+ Testimonial</strong>.
        </Step>
      </ol>
      <GuideShot n={9} alt="Add a testimonial" caption="Select Testimonials, then click + Testimonial." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={3}>
        <Step n="3">Fill in your details and click Save.</Step>
      </ol>
      <GuideShot n={4} alt="Green save toast" caption="Green toast = pull request created." />
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0" start={4}>
        <Step n="4">
          I merge it, then it appears on the garden. Track PRs:{" "}
          <ExtLink href={GITHUB_PULLS_URL}>github.com/ashumsd7/heyashu/pulls</ExtLink>
        </Step>
      </ol>
      <GuideShot n={5} alt="GitHub pull requests" caption="Your testimonial is reviewed as a pull request." />
      <HelpFooter />
    </div>
  );
}

const TAB_CONTENT = {
  new: WriteTab,
  edit: EditTab,
  "new-note": NewCollectionTab,
  testimonial: TestimonialTab,
};

function ContributingGuidePage() {
  const router = useRouter();
  const activeTab = useMemo(() => {
    const type = router.query.type;
    return TABS.some((tab) => tab.id === type) ? type : "new";
  }, [router.query.type]);

  const ActivePanel = TAB_CONTENT[activeTab] || WriteTab;

  const setTab = (id) => {
    router.replace(
      { pathname: "/contributing-guide", query: { type: id } },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  return (
    <div className="bg-[#f7f4ee] dark:bg-[#0b120e]">
      <CommonHeadTags
        title="How to add & edit notes/blogs on heyashu.in — Digital Garden"
        url="https://www.heyashu.in/contributing-guide"
        shortDec="Write a blog, add a notes chapter, or leave a testimonial in about two minutes."
        mainDesc="Open-source contributing guide for heyashu.in — write blogs, edit notes, add a notes collection, or share a testimonial via GitHub pull requests."
        tags="Contributing, Digital Garden, Open Source, Write Blog, Write Notes, heyashu"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-14">
        <BackToGarden />

        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10 max-w-3xl"
        >
          <h1 className="mb-4 flex flex-wrap items-center gap-2.5 font-fraunces text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
            How to add new / edit blog, notes
            <HiHeart className="h-8 w-8 shrink-0 text-[#c4552d] sm:h-10 sm:w-10" aria-hidden="true" />
          </h1>
          <p className="flex flex-wrap items-center gap-2 text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            Your single contribution or addition to this platform makes you an open source contributor
       
            <HiHeart className="h-4 w-4 shrink-0 text-[#c4552d]" aria-hidden="true" />
          </p>
        </motion.header>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <p className="mb-4 font-ibm-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8276] dark:text-[#6d7f74]">
            Go live in about 2 minutes
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_STEPS.map((step) => (
              <article
                key={step.n}
                className="rounded-md border border-[#e6e0d6] bg-white p-5 dark:border-[#1e3328] dark:bg-[#121e17]"
              >
                <span className="mb-3 block font-ibm-mono text-[11px] font-semibold tracking-[0.12em] text-[#9a4f2e] dark:text-[#22c55e]">
                  {step.n}
                </span>
                <h2 className="mb-1.5 font-fraunces text-xl font-semibold text-[#171717] dark:text-[#f0f4ef]">
                  {step.title}
                </h2>
                {step.n === "01" ? (
                  <p className="m-0 text-sm leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
                    <ExtLink href={GARDEN_ADMIN_URL}>Open Admin</ExtLink>
                    <br />
                    <ExtLink href={GARDEN_ADMIN_URL}>heyashu.in/admin</ExtLink>
                  </p>
                ) : (
                  <p className="m-0 text-sm leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
                    {step.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        </motion.div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => setTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#1f2a22] text-white dark:bg-[#22c55e] dark:text-[#0b120e]"
                    : "border border-[#e0d9cd] bg-white text-[#3f3a34] hover:border-[#cfc6b8] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="max-w-3xl">
          <ActivePanel />
        </div>

        <p className="mt-12 max-w-3xl text-sm text-[#8a8276] dark:text-[#6d7f74]">
          Prefer a direct start? Open{" "}
          <ExtLink href={GARDEN_ADMIN_URL}>heyashu.in/admin</ExtLink>
          {" "}· Fork the repo on{" "}
          <ExtLink href={GITHUB_REPO_LINK}>GitHub</ExtLink>
          {" "}· Or{" "}
          <Link
            href="/digital-garden"
            className="font-medium text-[#143825] underline decoration-[#cfc6b8] underline-offset-2 hover:text-[#9a4f2e] dark:text-[#22c55e]"
          >
            back to the garden
          </Link>
          .
        </p>
      </section>

      <DigiGardenFooter />
    </div>
  );
}

export default ContributingGuidePage;

ContributingGuidePage.getLayout = withDigitalGardenLayout;
