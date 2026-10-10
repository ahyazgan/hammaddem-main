export interface CaseStudy {
  id: string;
  status: "draft" | "published";
  title: string;
  service: "silobas" | "hafriyat" | "hammadde";
  city: string;
  completedMonth: string; // YYYY-MM, no customer address
  work: string;
  outcome: string; // Verified result; omit invented savings and delivery times.
  photo: { src: string; alt: string; permissionConfirmed: boolean; isRealSitePhoto: boolean };
  publicationApproved: boolean;
}

// Add approved real jobs here. An empty collection deliberately renders nothing.
// Never put customer contacts, private evidence or permission documents in this bundle.
export const caseStudies: CaseStudy[] = [];

export function publishedCaseStudies(items: CaseStudy[] = caseStudies) {
  return items.filter(item => item.status === "published" && item.publicationApproved
    && item.photo.permissionConfirmed && item.photo.isRealSitePhoto
    && item.photo.src.startsWith("/images/references/") && item.photo.alt.trim()
    && item.title.trim() && item.city.trim() && /^\d{4}-(0[1-9]|1[0-2])$/.test(item.completedMonth)
    && item.work.trim() && item.outcome.trim());
}
