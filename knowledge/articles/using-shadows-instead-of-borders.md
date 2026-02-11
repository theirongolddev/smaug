---
title: "Using Shadows Instead of Borders"
type: article
date_added: 2026-02-09
source: "https://jakub.kr/work/shadows"
author: "verse_"
tags: ["CSS", "design", "UI", "shadows", "accessibility"]
via: "Twitter bookmark from @verse_"
---

Using box-shadow instead of CSS borders is a more flexible and depth-rich approach to creating visual boundaries in UI design. Shadows adapt better to diverse backgrounds and color schemes because they use transparency, while solid borders fail when applied over non-white backgrounds. This technique is particularly effective for creating subtle elevation and hover states using multiple layered shadows.

## Key Takeaways
- Shadows provide more visual depth and polish than solid borders
- Multiple layered shadows (typically 3) create sophisticated border-like effects
- Shadows adapt seamlessly to any background color or image
- Shadows enable smoother transitions between states using CSS transitions
- The technique is ideal for modern, subtle UI design

## Full Content

Instead of using a border in light mode I often prefer to use a subtle box-shadow that adds more depth to the element instead.
BorderShadow
The specific shadow in this example is actually comprised of three different shadows.
.border-shadow {
box-shadow:
0px 0px 0px 1px rgba(0, 0, 0, 0.06),
0px 1px 2px -1px rgba(0, 0, 0, 0.06),
0px 2px 4px 0px rgba(0, 0, 0, 0.04);
}
For the hover state, it is the same box-shadow just slightly darker. To transition between the shadows we can add box-shadow to the transition property like this transition-[colors, box-shadow].
.border-shadow {
  box-shadow:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
Using shadows instead of borders also has a benefit when using images or multiple colors as backgrounds. Shadows are versatile and they adapt really well to any kind of background, since they use transparency.

Solid colors on the other hand don't work as well when used on a background other than they are intended to be used on.

MoreIn case you have any questions reach me at jakub@kbo.sk, see more of my work on Twitter or subscribe to my newsletter.NewsletterI share stuff that I'm working on, new posts and resources here.

## Links

- [Article](https://jakub.kr/work/shadows)
- [Original Tweet](https://x.com/verse_/status/1994110984831815746)
