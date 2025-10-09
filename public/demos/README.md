# Product Demo GIFs

Place your animated product demo GIFs in this directory.

## Recommended Specs

- **Format**: GIF or MP4 (GIFs auto-play, MP4s need video component)
- **Dimensions**: 800x600 px or 1200x900 px (4:3 ratio works best)
- **File Size**: Keep under 5MB for optimal loading
- **FPS**: 10-15 fps (smooth enough, not too large)
- **Duration**: 5-15 seconds (loop automatically)

## File Names

Use descriptive names:
- `team-charter-demo.gif` - Shows charter creation process
- `growth-tracking-demo.gif` - Shows goal setting and tracking
- `peer-feedback-demo.gif` - Shows feedback submission flow
- `dashboard-demo.gif` - Shows instructor analytics dashboard

## Tools to Create GIFs

### Screen Recording → GIF
1. **LICEcap** (Free, Mac/Windows) - Simple screen to GIF
2. **Kap** (Free, Mac) - Beautiful screen recorder with GIF export
3. **ScreenToGif** (Free, Windows) - Powerful with editing tools

### Video → GIF
1. **Ezgif.com** - Free online converter
2. **CloudConvert** - Supports many formats
3. **FFmpeg** (Command line) - For advanced users

### Tips for Quality GIFs
- Record at native resolution, scale down later
- Use 10-15 fps (smoother than 5, smaller than 30)
- Crop to relevant area only
- Remove unnecessary frames
- Optimize with tools like Gifsicle or ImageOptim

## Usage in Code

Once you have a GIF, use it in the DemoPlaceholder component:

```tsx
<DemoPlaceholder
  title="Team Charter Demo"
  gifPath="/demos/team-charter-demo.gif"
  description="See how students create collaborative team agreements"
/>
```

The GIF will display in a 800x600 container and loop automatically!
