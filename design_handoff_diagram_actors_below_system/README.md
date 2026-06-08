# Handoff: Move external actors below the //system

## What changed

Three files in `src/` were updated to move the external actors
(**Clients & Employers**, **Community**, **Mentees**) from above the
`// system` boundary to below it, and to reroute every arrow and pulse
connected to them.

This change applies to **both** the wide-screen (desktop) and narrow-screen
(mobile) diagrams.

## Files in this bundle

Drop these straight into your repo at the indicated paths — they replace the
existing files exactly:

| File in bundle | Replaces |
|---|---|
| `src/data/diagramData.js` | `src/data/diagramData.js` |
| `src/components/Diagram/DiagramDesktop.jsx` | `src/components/Diagram/DiagramDesktop.jsx` |
| `src/components/Diagram/DiagramMobile.jsx` | `src/components/Diagram/DiagramMobile.jsx` |

After replacing them, your existing build still works:

```bash
npm run dev      # or
npm run build
```

No new dependencies. No CSS changes. No changes to tests.

## Summary of the edits

### 1. `src/data/diagramData.js` — `REVEAL_ORDER`

The three `actor-*` keys were moved from positions 3–5 (right after
`boundary-label`) to the very end of the array. This matters because the
provisioning hook walks `REVEAL_ORDER` in order and `break`s on the first
key whose element isn't yet on-screen. With the actors now at the bottom
of the page, they must be queued last — otherwise the loop would stall on
them and never reveal the namespaces/nodes between.

`ARROW_ENDPOINTS` was left untouched — the endpoint identifiers haven't
changed, only their visual position.

### 2. `src/components/Diagram/DiagramDesktop.jsx`

- `viewBox` changed from `0 0 1440 1320` → `0 130 1440 1270`. This crops
  the now-empty top strip (where the actors used to live) and extends the
  bottom by 80px to make room for them in their new position. The SVG
  scales the same way, so no CSS change is needed.
- The three `external` `<g>` blocks were moved to `y=1310` (rectangle top
  edge), placing them in a row immediately below the system boundary.
- Four arrows were rerouted:

  | Arrow | Old path | New path |
  |---|---|---|
  | `clients-tech` | `M 280 105 L 620 260` (top-left → tech-lead) | `M 240 1310 C 20 1310, 20 290, 560 290` — wraps around the **outside left** of the boundary up to tech-lead |
  | `comm-tech` | `M 720 105 L 720 260` (top-middle → tech-lead) | `M 760 1310 C 1420 1310, 1420 290, 880 290` — wraps around the **outside right** of the boundary up to tech-lead |
  | `comm-ment` | `M 1260 985 C 1410 985, 1410 70, 1260 70` (curved around right side, all the way to top-right actor) | `M 1160 1035 L 1160 1310` — short vertical from community-out down to mentees |
  | `speak-comm` | `M 180 985 C 30 985, 30 70, 620 70` (curved around left side, all the way to top-middle actor) | `M 410 1035 C 480 1140, 600 1220, 720 1310` — short curve from speaking down to community |

- Pulses inherit the new paths via `<mpath href="#arr-…">`, so the data
  pulses automatically follow the rerouted arrows. **No** pulse durations
  or begin offsets were touched.
- Arrow labels for the four rerouted arrows were repositioned:
  - `clients-tech` label → `(28, 770)` text-anchor `start` (sits next to the left curve)
  - `comm-tech` label → `(1412, 770)` text-anchor `end` (sits next to the right curve)
  - `comm-ment` label → `(1175, 1180)` text-anchor `start`
  - `speak-comm` label → `(560, 1200)` (mid-arc)

### 3. `src/components/Diagram/DiagramMobile.jsx`

- `viewBox` extended from `0 0 400 1130` → `0 0 400 1200` (extra 70px at
  bottom for the actor row).
- Actor `<g>` blocks moved from `y=8` (above boundary) to `y=1140` (below
  boundary + footer).
- Same four arrows rerouted (mobile coordinate space):

  | Arrow | Old path | New path |
  |---|---|---|
  | `clients-tech` | `M 70 48 L 140 110` | `M 70 1140 C -30 1140, -30 110, 110 110` (outside-left wrap up to tech-lead) |
  | `comm-tech` | `M 200 48 L 200 110` | `M 200 1140 C 430 1140, 430 110, 290 110` (outside-right wrap up to tech-lead) |
  | `comm-ment` | `M 376 1025 C 432 700, 432 100, 335 48` | `M 330 1064 L 330 1140` (short vertical) |
  | `speak-comm` | `M 24 937 C -32 700, -32 100, 170 48` | `M 50 937 C -20 1020, -20 1100, 170 1140` (wraps left around community-out down to community actor) |

- Pulses inherit the new paths automatically (same as desktop).

## What was deliberately **not** changed

- `globals.css` — no styling adjustments were needed. `svg.diagram` already
  has `overflow: visible`, so the arrows that curve outside the boundary
  render correctly without clipping.
- `useProvisioning.js` — works without modification. It computes
  `--len` per path via `getTotalLength()` after mount, so the new (longer)
  paths animate correctly on reveal.
- `NODE_DATA`, `ARROW_ENDPOINTS`, semantic meaning of any arrow — the
  story the diagram tells is unchanged. Only the visual position of three
  actor boxes (and the routing of the four arrows touching them) moved.
- Tests under `src/**/*.test.*` — no tests directly inspect coordinate
  values for these arrows or actors.

## Sanity check after applying

1. `npm run dev`, scroll to the architecture section.
2. Watch the provisioning animation:
   - Boundary draws first.
   - Namespaces and nodes fill in from top to bottom.
   - Footer fades in.
   - The three external actors fade in last, below the boundary.
   - Each arrow strokes in once both endpoints are revealed.
3. Resize across the 1280px breakpoint — the mobile SVG should swap in
   with the actors still below the system.
4. Hover the new arrows on desktop — labels should appear next to them.
