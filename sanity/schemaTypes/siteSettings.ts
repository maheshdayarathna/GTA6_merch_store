import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "releaseDate", type: "datetime" }),
    defineField({ name: "progressStartDate", type: "datetime" }),
    defineField({ name: "mailingListEmbed", type: "text" }),
    defineField({ name: "shopifyStoreUrl", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
