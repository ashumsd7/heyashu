import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  HiOutlineChevronDown,
  HiChevronLeft,
  HiOutlineBookOpen,
  HiOutlineRectangleStack,
  HiOutlineArrowTrendingUp,
  HiOutlineDocumentText,
} from "react-icons/hi2";

function lessonLabel(item, eachCardPrefix) {
  if (item?.episode === -1) return "Prerequisite";
  if (eachCardPrefix && item?.episode != null) {
    return `${eachCardPrefix}${item.episode}`.replace(/-$/, "");
  }
  return null;
}

function LessonRow({
  item,
  index,
  selectedSection,
  storedValues,
  eachCardPrefix,
  onSectionClick,
}) {
  const title = item?.name || item?.title || "Untitled";
  const isSelected =
    selectedSection?.title === item?.title ||
    selectedSection?.name === item?.name ||
    selectedSection?.title === item?.name;
  const isDone = !!(storedValues && (storedValues[item?.name] || storedValues[title]));
  const prefix = lessonLabel(item, eachCardPrefix);
  const locked = !item?.publishedOn;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => !locked && onSectionClick(item)}
      className={`group flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition ${
        locked ? "cursor-not-allowed opacity-45" : "cursor-pointer"
      } ${
        isSelected
          ? "bg-[var(--nr-active)] text-[var(--nr-accent)] shadow-sm"
          : "text-[var(--nr-text)] hover:bg-[var(--nr-hover)]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
          isSelected
            ? "bg-[var(--nr-accent)] text-white"
            : "bg-[var(--nr-border)] text-[var(--nr-muted)]"
        }`}
      >
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        {prefix ? (
          <span className="mb-0.5 block text-[10px] font-medium uppercase tracking-wide text-[var(--nr-muted)]">
            {prefix}
          </span>
        ) : null}
        <span
          className={`block truncate text-[13px] leading-snug ${
            isSelected ? "font-semibold" : "font-medium"
          }`}
        >
          {title}
        </span>
      </span>
      {isDone ? (
        <IoIosCheckmarkCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-500" />
      ) : (
        <IoIosCheckmarkCircleOutline className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--nr-border)] opacity-70" />
      )}
    </button>
  );
}

function SectionBlock({
  title,
  lessons,
  open,
  onToggle,
  selectedSection,
  storedValues,
  eachCardPrefix,
  onSectionClick,
  startIndex = 0,
  icon: Icon = HiOutlineBookOpen,
}) {
  return (
    <div className="mx-2 mb-2 overflow-hidden rounded-xl border border-[var(--nr-border)]/80 bg-[var(--nr-surface)]/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
      >
        <span className="flex min-w-0 items-center gap-2.5 font-fraunces text-[13px] font-semibold text-[var(--nr-text)]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-text)]">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">{title}</span>
        </span>
        <HiOutlineChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--nr-muted)] transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="space-y-0.5 px-1.5 pb-2.5">
          {lessons?.length ? (
            lessons.map((item, idx) => (
              <LessonRow
                key={`${item?.title || item?.name}-${idx}`}
                item={item}
                index={startIndex + idx}
                selectedSection={selectedSection}
                storedValues={storedValues}
                eachCardPrefix={eachCardPrefix}
                onSectionClick={onSectionClick}
              />
            ))
          ) : (
            <p className="px-2.5 py-3 text-center text-[12px] text-[var(--nr-muted)]">
              Coming soon
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function NotesReaderSidebar({
  courseName = "",
  contentListTitle = "Course Content",
  contentListTitle2 = "Season 2",
  data = [],
  season2Data = [],
  show2ndSection = false,
  progress = 0,
  completedCount = 0,
  totalCount = 0,
  selectedSection,
  storedValues,
  eachCardPrefix,
  onSectionClick,
  onMarkComplete,
  isCurrentComplete,
  onCollapse,
}) {
  const [sec1Open, setSec1Open] = useState(true);
  const [sec2Open, setSec2Open] = useState(!!show2ndSection);
  const pct = Math.min(100, Math.max(0, Number(progress) || 0));
  const displayCourse = (courseName || contentListTitle || "Digital Notes").trim();

  return (
    <aside
      className="flex h-full flex-col border-r border-[var(--nr-border)]"
      style={{
        background:
          "linear-gradient(180deg, var(--nr-sidebar-from) 0%, var(--nr-sidebar-to) 100%)",
      }}
    >
      <div className="border-b border-[var(--nr-border)] px-4 py-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h2 className="min-w-0 flex-1 font-fraunces text-[19px] font-bold leading-snug text-[var(--nr-heading)]">
            {displayCourse}
          </h2>
          {onCollapse ? (
            <button
              type="button"
              onClick={onCollapse}
              title="Hide course content"
              aria-label="Hide course content"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition hover:text-[var(--nr-text)]"
            >
              <HiChevronLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--nr-muted)]">
              <span className="grid h-5 w-5 place-items-center rounded border border-[var(--nr-border)] bg-[var(--nr-surface)]">
                <HiOutlineArrowTrendingUp className="h-3 w-3" />
              </span>
              Progress
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--nr-text)]">
              <HiOutlineDocumentText className="h-3 w-3 text-[var(--nr-muted)]" />
              {completedCount} / {totalCount} ({Math.round(pct)}%)
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--nr-border)]">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain py-2">
        <SectionBlock
          title={show2ndSection ? contentListTitle : "Chapters"}
          icon={HiOutlineBookOpen}
          lessons={data}
          open={sec1Open}
          onToggle={() => setSec1Open((v) => !v)}
          selectedSection={selectedSection}
          storedValues={storedValues}
          eachCardPrefix={eachCardPrefix}
          onSectionClick={onSectionClick}
        />
        {show2ndSection ? (
          <SectionBlock
            title={contentListTitle2}
            icon={HiOutlineRectangleStack}
            lessons={season2Data}
            open={sec2Open}
            onToggle={() => setSec2Open((v) => !v)}
            selectedSection={selectedSection}
            storedValues={storedValues}
            eachCardPrefix={eachCardPrefix}
            onSectionClick={onSectionClick}
            startIndex={data?.length || 0}
          />
        ) : null}
      </div>

      <div className="border-t border-[var(--nr-border)] p-3">
        <button
          type="button"
          onClick={onMarkComplete}
          className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[12px] font-semibold transition ${
            isCurrentComplete
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
              : "border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-text)] hover:border-emerald-500/50 hover:text-emerald-600"
          }`}
        >
          <IoIosCheckmarkCircle className="h-4 w-4" />
          {isCurrentComplete ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </aside>
  );
}
