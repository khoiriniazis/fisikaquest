import Link from "next/link";

type BrandLogoProps = { href: string; className?: string };

export function BrandLogo({ href, className = "" }: BrandLogoProps) {
  return <Link className={`brand ${className}`.trim()} href={href} aria-label="FisikaQuest, beranda">
    <span className="brand-mark" aria-hidden="true">⚛</span>
    <span>Fisika<span className="brand-blue">Quest</span></span>
  </Link>;
}
