import type { ImpactPillar } from "@src/types/app";

type ImpactPillarCardProps = {
  pillar: ImpactPillar;
};

export function ImpactPillarCard({ pillar }: ImpactPillarCardProps) {
  return (
    <article className="rounded-sm border border-brand-black/10 bg-white/65 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-brand-darkGray/70">
      <h3 className="brand-heading mb-3 text-2xl text-brand-black dark:text-brand-white">
        {pillar.title}
      </h3>
      <p className="leading-relaxed text-brand-black/80 dark:text-brand-lightGray">
        {pillar.body}
      </p>
    </article>
  );
}
