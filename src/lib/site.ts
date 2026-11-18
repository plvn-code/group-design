/** Studio facts — source: Instagram @group_design_ (bio, captions). Change contacts only here. */
export const site = {
  name: "Group Design",
  author: "Олена Якубець",
  tagline: "Дизайн інтерʼєру та ремонт під ключ · Київ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3021",
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  phone: "+380989801532",
  phoneLabel: "098 980 15 32",
  city: "Київ",
  instagram: "https://www.instagram.com/group_design_/",
  instagramHandle: "@group_design_",
  direct: "https://ig.me/m/group_design_",
  viber: "viber://chat?number=%2B380989801532",
};

export const tel = `tel:${site.phone}`;

export const nav = [
  { href: "/projects", label: "Проєкти" },
  { href: "/services", label: "Послуги" },
  { href: "/about", label: "Про студію" },
  { href: "/contacts", label: "Контакти" },
];
