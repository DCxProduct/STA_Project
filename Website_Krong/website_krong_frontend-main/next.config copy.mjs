import createNextIntlPlugin from "next-intl/plugin";
// const withNextIntl = createNextIntlPlugin("./src/app/i18n.js");
const withNextIntl = createNextIntlPlugin("./src/i18n.js");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-ncdd.analyticalx.org",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
// const withNextIntl = nextIntl("./i18n.ts");

export default withNextIntl(nextConfig);

// module.exports = withNextIntl(nextConfig);
