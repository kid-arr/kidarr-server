export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Kidarr",
  description: "Radar for your kids",
  mainNav: [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "Children",
      href: "/children",
    },
  ],
  links: {
    twitter: "https://twitter.com/podnoms",
    github: "https://github.com/kid-arr",
  },
};
