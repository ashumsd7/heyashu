import React from "react";
import NoteCard from "@/components/garden/NoteCard";
import { ImBooks } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import Button from "@/components/base/Button";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import { NOTES_CARD_DATA } from "@/data/note/allNotes";
function AllNotesPage() {
  return (
    <>
      <CommonHeadTags />

      <ClassicPageLayout
        data={NOTES_CARD_DATA}
        showSwitcher={true}
        labelKey={'title'}
        heading={
          <div className="flex gap-2 items-center ">
            <ImBooks className="text-green-800" />Digital Notes
          </div>
        }
        desc="   Get tech notes, interview tips, experiences, snippets, blogs and more."
        rightCTA={
          <Button
            onClick={() => {
              window.open(ADMIN_LINK, "_blank");
            }}
            className="mt-4 px-6 py-3 bg-transparent   text-gray-900  md:text-xl text-base border-black  font-medium rounded-md   transition duration-200"
          >
            <FaPlus />
            <span className="hidden md:flex">Add Notes</span>
          </Button>
        }
      >
        {NOTES_CARD_DATA?.map((item) => {
          if(item.isComingSoon)
          return
          return <NoteCard data={item} />;
        })}
      </ClassicPageLayout>
    </>
  );
}

export default AllNotesPage;
