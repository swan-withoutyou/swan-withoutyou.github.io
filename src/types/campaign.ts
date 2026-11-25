export type Platform = "youtube" | "spotify";

export type MetricSnapshot = {
  /** ISO timestamp with offset, recorded in Asia/Ho_Chi_Minh. */
  recordedAt: string;
  value: number;
  source?: string;
};

export type Milestone = {
  id: string;
  target: number;
  /** Hours after the campaign start. */
  withinHours: number;
  label: string;
};

export type PlatformCampaign = {
  platform: Platform;
  label: string;
  unit: string;
  target: number;
  windowDays: number;
  milestones: Milestone[];
  history: MetricSnapshot[];
  ctaKey:   "thieuNangMV";
};

export type Campaign = {
  id: string;
  title: string;
  /** ISO start time. null until the official release time is confirmed. */
  startsAt: string | null;
  platforms: PlatformCampaign[];
};
