import { defineField, defineType } from "sanity";

export const communityItem = defineType({
  name: "communityItem",
  title: "Community Item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", type: "string" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "videoUrl", type: "url" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", media: "thumbnail", subtitle: "tag" } },
});
