---
author: michael
created: 2026-05-19
updated: 2026-05-19
---

# Rules Verification

Fill in each answer below. When done, return the file and I will process it.

Answer format:

- `yes` — this is correct
- `no` — wrong; describe what should happen instead
- `unsure` — describe what you expect and I will verify

---

## Hover styling

### 1. Contact cards

Hovering a contact card (email, LinkedIn, GitHub, Thoughtworks) changes its visual style. Moving away resets it.

> answer: correct

### 2. Nav links

Hovering a nav link changes its visual style. Moving away resets it. Each link is independent.

> answer: correct

### 3. Theme toggle

Hovering the sun/moon button changes its visual style. Moving away resets it.

> answer: correct

### 4. Close button on detail card

Hovering the × button changes its visual style. Moving away resets it.

> answer: correct

---

## Diagram — desktop interactions

### 5. Node hover

Hovering a node opens the detail card for that node. Moving the cursor away closes it.

> answer: correct

### 6. Node click (pin)

Clicking a node locks the detail card open (it stays visible even when the cursor moves away). Clicking the same node again closes it. Clicking a different node while one is pinned moves the pin to the new node.

> answer: correct

### 7. Outside click

Clicking anywhere outside the detail card and outside any node closes the detail card.

> answer: correct

### 8. Arrow hover

Hovering an arrow highlights it. Moving away removes the highlight.

> answer: yes

---

## Diagram — mobile interactions

### 9. Node tap

Tapping a node opens the detail card. Tapping outside closes it. There is no hover on mobile.

> answer: correct

### 10. Arrow interaction

Arrows on mobile cannot be tapped or interacted with.

> answer: correct

---

## Diagram — reveal animation

### 11. Reveal order

As you scroll down into the diagram, nodes and shapes appear one by one in a fixed sequence. Arrows appear only after both nodes they connect have already appeared. The outer boundary rectangle appears first.

> answer: correct

### 12. Progress label

A label shows build progress as a percentage (e.g. `apply 42%`). It counts both nodes and arrows toward 100%.

> answer: correct

### 13. Node status badges

Each node shows a loading status when it first appears, then after a short delay it flips to a ready status.

> answer: correct

### 14. Reduced motion

When the OS reduced-motion setting is on, all nodes and arrows appear at once with no animation. Status badges still flip after a short delay.

> answer: correct

---

## Theme

### 15. Default theme

When a visitor has never been to the site and has no system dark-mode preference set, what theme should load?

> answer: (light / dark) light

### 16. Persistence

The chosen theme persists when the user closes and reopens the tab.

> answer: true

### 17. System preference

If the visitor's OS is set to dark mode and they have not previously chosen a theme, the site loads in dark mode.

> answer: true

---

## Header

### 18. Scroll behaviour

After scrolling down slightly, the header changes appearance (background/shadow becomes visible). At the very top of the page it looks different (more transparent / no shadow).

> answer: is this the current setting? i don't notice this. all i notice is that a line appears below the header menu and the header menu stays in place while the rest of the page scrolls. I'm happy with the current behavior.

---

## Tab switching

### 19. Returning to tab

When you switch away from the portfolio and come back, hover states (highlighted links, buttons, etc.) correctly reset so nothing is stuck in a highlighted state.

> answer: is this happening now. i'm seeing the hover state "stick". i would like the hover state to reset when switching away.

---

## Detail card

### 20. Position

The detail card appears next to (not overlapping) the node that triggered it. On desktop it appears to the right of the node. On mobile it appears below.

> answer: i approve of the card appearing next to the node in desktop. on mobile it does not seem to be appearing below, it seems to be appearing over the node. i would prefer if it appeared below.

---

## Accessibility

### 21. Keyboard and screen reader requirements

List any keyboard navigation or accessibility requirements (e.g. tab order, escape to close, aria labels, focus management). Write `none` if not applicable.

> answer: choose best practices.

---

## Page load animations

### 22. Hero loading sequence

On page load, the hero text reveals word by word (a loading animation). Under reduced motion this animation should be skipped and the text should appear immediately.

> answer: i am not seing th hero text show up word for word. i see it load all at once. please make the behaviour word by word and under reduced motion all at once.

### 23. Contact section boot text

The contact/footer section shows a `verifying...` status that transitions to `all systems running` when it scrolls into view.

> answer: correct

---

## Other

### 24. Anything else?

Any other expected behaviour, visual rule, or interaction not covered above?

> answer: For all items i said i was not seeing the behavior, i'm viewing /Users/michaellongerich/Documents/1.Projects/Code/lifeOS/projects/active/job-search/portfolio/rules-verification.md is this the file i should be looking at?
> i think we covered desktop view and mobile view, but i don't think we covered mobile view on desktop. the difference being is that even though we are using the vertical layout similiar to mobile view, it has mouse inputs which mobile/tablet view do not have. do you have any questions about this view? please add them to this document so i can answer them.

---

## Narrow viewport with mouse ("mobile layout on a desktop browser")

This is when the browser window is narrow enough to trigger the mobile/vertical layout, but the user has a mouse (not touch). The layout looks like mobile but cursor hover is available.

### 25. Node hover in narrow layout

When hovering a node in the narrow (mobile) layout on a desktop browser — should hovering show the detail card, or should it require a click?

> answer: it should show detail card.

### 26. Arrow hover in narrow layout

In the narrow (mobile) layout on a desktop browser — should hovering an arrow highlight it?

> answer: no.

### 27. Detail card position in narrow layout with mouse

If hover/click works in narrow layout, where should the detail card appear — to the right of the node (desktop style) or below the node (mobile style)?

> answer: mobile style.
