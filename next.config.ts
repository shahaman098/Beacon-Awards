import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "beaconmosque.com" },
      { protocol: "https", hostname: "www.beaconmosque.com" },
      { protocol: "https", hostname: "almustafacentre.org" },
      { protocol: "https", hostname: "faithassociates.co.uk" },
      { protocol: "https", hostname: "www.faithassociates.co.uk" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "img.evbuc.com" },
      { protocol: "https", hostname: "i2-prod.birminghammail.co.uk" },
      { protocol: "https", hostname: "i2-prod.getsurrey.co.uk" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "scontent-lhr8-1.xx.fbcdn.net" },
      { protocol: "https", hostname: "thelogicalindian.com" },
      { protocol: "https", hostname: "www.edp24.co.uk" },
      { protocol: "https", hostname: "www.elystandard.co.uk" },
      { protocol: "https", hostname: "www.malaysiandigest.com" },
      { protocol: "https", hostname: "www.oldham-chronicle.co.uk" },
      { protocol: "https", hostname: "vumbnail.com" },
      { protocol: "http", hostname: "faithassociates.co.uk" },
      { protocol: "http", hostname: "www.faithassociates.co.uk" },
      { protocol: "http", hostname: "thelogicalindian.com" },
      { protocol: "http", hostname: "www.edp24.co.uk" },
      { protocol: "http", hostname: "www.elystandard.co.uk" },
      { protocol: "http", hostname: "www.malaysiandigest.com" },
      { protocol: "http", hostname: "www.oldham-chronicle.co.uk" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
