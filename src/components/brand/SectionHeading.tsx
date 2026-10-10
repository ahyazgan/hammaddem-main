import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, children, centered = false }: {
  eyebrow: string; title: string; children?: ReactNode; centered?: boolean;
}) {
  return (
    <div className={cn("mb-10 md:mb-12", centered && "text-center")}>
      <p className={cn("brand-eyebrow mb-4", centered && "justify-center")}>{eyebrow}</p>
      <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-[-0.035em] leading-[1.15] text-navy">{title}</h2>
      {children && <p className={cn("mt-4 max-w-[580px] text-sm md:text-base leading-relaxed text-txt-2", centered && "mx-auto")}>{children}</p>}
    </div>
  );
}
