export enum AppRoute {
  Home = "/",
  Plans = "/plans",
  About = "/about",
  Contact = "/contact",
  Privacy = "/privacy",
  Terms = "/terms",
}

export type VideoItem = {
  src: string;
  watermark: string;
  audioGroup?: string;
  audioPriority?: number;
};

export type TimelineBlock = {
  headline: string;
  split?: boolean;
  sequence?: boolean;
  videos: VideoItem[];
};

export type ImpactPillar = {
  title: string;
  body: string;
};

export type PackageTier = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  bestFor: string;
  cta: string;
  popular: boolean;
};

export type VideoPanelProps = {
  src: string;
  watermark: string;
  audioGroup?: string;
  audioPriority?: number;
};
