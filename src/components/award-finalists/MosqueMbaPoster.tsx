import Link from "@/components/AppLink";

export const MOSQUE_MBA_FLYER_SRC = "/assets/home/mosque-mba-programme.png";

const WIDTH = 1536;
const HEIGHT = 768;

type MosqueMbaPosterProps = {
  className?: string;
  linked?: boolean;
};

/** Full poster — no CMS crop/zoom overrides. */
export function MosqueMbaPoster({
  className = "",
  linked = true,
}: MosqueMbaPosterProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Mosque MBA programme poster — Faith Associates Academy"
      className={[
        "mx-auto block h-auto w-full max-w-[1024px]",
        className,
      ].join(" ")}
      decoding="async"
      height={HEIGHT}
      loading="lazy"
      src={MOSQUE_MBA_FLYER_SRC}
      width={WIDTH}
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      href="https://mosque.mba/"
      rel="noreferrer"
      target="_blank"
    >
      {image}
    </Link>
  );
}
