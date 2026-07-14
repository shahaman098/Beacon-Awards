import type { AnchorHTMLAttributes, ComponentProps } from "react";
import NextLink from "next/link";

type AppLinkProps = ComponentProps<typeof NextLink>;

export function AppLink({ href, prefetch = false, ...props }: AppLinkProps) {
  if (typeof href === "string") {
    return (
      <a
        href={href}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return <NextLink href={href} prefetch={prefetch} {...props} />;
}

export default AppLink;
