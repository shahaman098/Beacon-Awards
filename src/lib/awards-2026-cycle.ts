/** Public copy and phase flags for the 2026 Beacon Mosque Awards cycle. */

export const AWARDS_2026_FINALISTS_ANNOUNCE_LABEL = "23 October 2026";

export const AWARDS_2026_FINALISTS_ANNOUNCE_DATE =
  "Thursday 23 October 2026";

export const AWARDS_2026_FINALIST_DISCLOSURE_WATERMARK = `Will be disclosed on ${AWARDS_2026_FINALISTS_ANNOUNCE_LABEL}`;

/**
 * In-page anchor for the Awards 2026 hub hero (and category finalist blocks).
 * Hub: top of `/awards/beacon-mosque-awards-2026/`.
 * Category pages: finalists grid.
 */
export const AWARDS_2026_PREPARE_TO_VOTE_SECTION_ID = "prepare-to-vote";

export const awards2026PrepareToVoteSectionHref = `#${AWARDS_2026_PREPARE_TO_VOTE_SECTION_ID}`;

/** Nominations closed; site is in prepare-to-vote mode until finalists publish. */
export const awards2026NominationsClosed = true;

export function finalistsPublishedFor2026(now = new Date()): boolean {
  if (process.env.NEXT_PUBLIC_AWARDS_2026_FINALISTS_LIVE === "true") {
    return true;
  }
  const announceAt = new Date("2026-10-23T09:00:00+01:00");
  return now >= announceAt;
}

/** Show finalist grid layout for stakeholder review (placeholder slots). */
export function showFinalistStructurePreview(): boolean {
  return process.env.NEXT_PUBLIC_AWARDS_2026_FINALIST_PREVIEW !== "false";
}

export const awards2026PrepareToVoteHeadline = "Prepare to vote";

/** Shown beneath the category grid heading on the 2026 awards hub. */
export const awards2026CategoriesSectionLead =
  `Nominations are closed. Finalists are named on ${AWARDS_2026_FINALISTS_ANNOUNCE_LABEL}. Open a category, hold your place, and come back ready when voting opens.`;

export function isAwards2026CategoryCardsSection(
  currentPath?: string,
  sectionTitle?: string,
) {
  const title = sectionTitle ?? "";
  if (!title) {
    return false;
  }
  const on2026Hub = currentPath === "/awards/beacon-mosque-awards-2026/";
  const onAwardsIndex =
    currentPath === "/awards/" &&
    (title === "Prepare to vote 2026" ||
      title === "Nominate 2026" ||
      title === "2026 award categories" ||
      title === awards2026PrepareToVoteHeadline);
  const matchesTitle =
    title === awards2026PrepareToVoteHeadline ||
    title === "Ten award categories for 2026" ||
    title === "2026 award categories" ||
    title === "Nominate Across Our 10 Award Categories for 2026" ||
    /^Prepare to vote/i.test(title) ||
    /^Finalists announced/i.test(title) ||
    /^Award categories/i.test(title) ||
    /^2026 award categories/i.test(title);

  return (on2026Hub && matchesTitle) || onAwardsIndex;
}

export const awards2026NominationsClosedIntro =
  `Nominations for the 9th Beacon Mosque Awards 2026 are now closed. Finalists will be announced on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE} on this page and on each category page. When voting opens, you will be able to read finalist profiles and cast your vote.`;

export const awards2026HeroIntro =
  `Nominations for the 9th Annual Beacon Mosque Awards 2026 are closed. Finalists will be announced on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE} on this page before public voting opens.`;

export const awards2026CategoryAnnouncementParagraph =
  `Finalists for this category will be announced on ${AWARDS_2026_FINALISTS_ANNOUNCE_DATE}.`;
