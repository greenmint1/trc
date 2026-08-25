import type { ImpactPillar, PackageTier, TimelineBlock } from "@src/types/app";
import type { TFunction } from "i18next";

export const GOOGLE_FORM_URL =
  import.meta.env.VITE_GOOGLE_FORM_URL ||
  "https://docs.google.com/forms/d/e/1FAIpQLScks8ZT_XnWK4WpFt3qK-eIogC3Mb7S7Pt1SEJvgNyASGpzPQ/viewform?usp=dialog";

type HomeTranslator = TFunction<"home">;
type PlansTranslator = TFunction<"plans">;

export function getTimelineBlocks(t: HomeTranslator): TimelineBlock[] {
  return [
    {
      headline: t(($) => $.timeline.blocks.block1.headline),
      videos: [
        {
          src: "/assets/animations/El_Jaleo_John_Singer_Sargent.mp4",
          watermark: t(($) => $.timeline.blocks.block1.watermark1),
        },
      ],
    },
    {
      headline: t(($) => $.timeline.blocks.block2.headline),
      split: true,
      videos: [
        {
          src: "/assets/animations/Las_Meninas_Diego_Velazquez.mp4",
          watermark: t(($) => $.timeline.blocks.block2.watermark1),
          audioGroup: "split-row-1",
          audioPriority: 0,
        },
        {
          src: "/assets/animations/Anxiety_Edvard_Munch.mp4",
          watermark: t(($) => $.timeline.blocks.block2.watermark2),
          audioGroup: "split-row-1",
          audioPriority: 1,
        },
      ],
    },
    {
      headline: t(($) => $.timeline.blocks.block3.headline),
      videos: [
        {
          src: "/assets/animations/Bal_du_moulin_de_la_Galette_Pierre_Auguste_Renoir.mp4",
          watermark: t(($) => $.timeline.blocks.block3.watermark1),
        },
      ],
    },
    {
      headline: t(($) => $.timeline.blocks.block4.headline),
      videos: [
        {
          src: "/assets/animations/Breezing Up (A Fair Wind) by Winslow Homer copy.mp4",
          watermark: t(($) => $.timeline.blocks.block4.watermark1),
        },
      ],
    },
    {
      headline: t(($) => $.timeline.blocks.block5.headline),
      split: true,
      videos: [
        {
          src: "/assets/animations/The Piano Player by Thomas Eakins.mp4",
          watermark: t(($) => $.timeline.blocks.block5.watermark1),
          audioGroup: "split-row-2",
          audioPriority: 0,
        },
        {
          src: "/assets/animations/Woman with a Parasol - Madame Monet and Her Son by Claude Monet.mp4",
          watermark: t(($) => $.timeline.blocks.block5.watermark2),
          audioGroup: "split-row-2",
          audioPriority: 1,
        },
      ],
    },
    {
      headline: t(($) => $.timeline.blocks.block6.headline),
      videos: [
        {
          src: "/assets/animations/Waves Breaking on a Lee Shore by J.M.W. Turner.mp4",
          watermark: t(($) => $.timeline.blocks.block6.watermark1),
        },
      ],
    },
  ];
}

export function getImpactPillars(t: PlansTranslator): ImpactPillar[] {
  return [
    {
      title: t(($) => $.impact.pillar1.title),
      body: t(($) => $.impact.pillar1.body),
    },
    {
      title: t(($) => $.impact.pillar2.title),
      body: t(($) => $.impact.pillar2.body),
    },
    {
      title: t(($) => $.impact.pillar3.title),
      body: t(($) => $.impact.pillar3.body),
    },
    {
      title: t(($) => $.impact.pillar4.title),
      body: t(($) => $.impact.pillar4.body),
    },
  ];
}

export function getPackages(t: PlansTranslator): PackageTier[] {
  return [
    {
      name: t(($) => $.packages.one.name),
      price: t(($) => $.packages.one.price),
      summary: t(($) => $.packages.one.summary),
      features: [
        t(($) => $.packages.one.feature1),
        t(($) => $.packages.one.feature2),
      ],
      bestFor: t(($) => $.packages.one.bestFor),
      cta: t(($) => $.packages.one.cta),
      popular: false,
    },
    {
      name: t(($) => $.packages.two.name),
      price: t(($) => $.packages.two.price),
      summary: t(($) => $.packages.two.summary),
      features: [
        t(($) => $.packages.two.feature1),
        t(($) => $.packages.two.feature2),
        t(($) => $.packages.two.feature3),
        t(($) => $.packages.two.feature4),
      ],
      bestFor: t(($) => $.packages.two.bestFor),
      cta: t(($) => $.packages.two.cta),
      popular: true,
    },
    {
      name: t(($) => $.packages.three.name),
      price: t(($) => $.packages.three.price),
      summary: t(($) => $.packages.three.summary),
      features: [
        t(($) => $.packages.three.feature1),
        t(($) => $.packages.three.feature2),
        t(($) => $.packages.three.feature3),
        t(($) => $.packages.three.feature4),
        t(($) => $.packages.three.feature5),
      ],
      bestFor: t(($) => $.packages.three.bestFor),
      cta: t(($) => $.packages.three.cta),
      popular: false,
    },
  ];
}
