# CoStudy Dark Mode Design Specification

## Color Palette

### Background Colors
```
Primary Background:    #0a0a0a  (Very dark gray, not pure black)
Secondary Background:  #121212  (Dark gray for elevated surfaces)
Card Background:       #1a1a1a  (Slightly lighter for cards)
Hover Background:      #242424  (Interactive state)
```

### Text Colors
```
Section Titles:   #E0E7FF  (Soft lavender - harmonious with brand)
  - Add glow: text-shadow: 0 0 20px rgba(224, 231, 255, 0.15)

Body/Subtext:     #A0AEC0  (Muted blue-gray - calm and legible)

Legacy (deprecated):
Primary Text:     #f5f5f5  (High contrast, WCAG AAA - 15.29:1 on #0a0a0a)
Secondary Text:   #b3b3b3  (Medium contrast, WCAG AA - 7.89:1 on #0a0a0a)
Tertiary Text:    #808080  (Lower contrast for less important text)
Muted Text:       #666666  (Very subtle text)
```

### Brand Colors (Desaturated for Dark Mode)
```
Purple Primary:   #a78bfa  (Softer purple)
Purple Secondary: #8b5cf6  (Medium purple)
Blue Primary:     #60a5fa  (Softer blue)
Blue Secondary:   #3b82f6  (Medium blue)
Cyan Primary:     #22d3ee  (Vibrant but not harsh)
Cyan Secondary:   #06b6d4  (Deeper cyan)
Pink Primary:     #f472b6  (Soft pink)
Pink Secondary:   #ec4899  (Medium pink)
```

### Card Tints (Highly Desaturated)
```
Purple Card:      #2d1b4e  (Deep purple with low saturation)
Blue Card:        #1e3a5f  (Deep blue with low saturation)
Cyan Card:        #1a3d4a  (Deep cyan with low saturation)
Pink Card:        #3d1f2f  (Deep pink with low saturation)
Green Card:       #1f3d2f  (Deep green with low saturation)
```

### Border Colors
```
Subtle Border:    #2a2a2a  (Barely visible)
Default Border:   #404040  (Clear but not harsh)
Emphasis Border:  #606060  (Strong boundary)
```

### Shadow & Glow
```
Subtle Shadow:    rgba(0, 0, 0, 0.3)
Medium Shadow:    rgba(0, 0, 0, 0.5)
Glow Effect:      rgba(167, 139, 250, 0.15)  (Purple glow)
```

## WCAG Contrast Requirements

- **Normal text** (< 18pt): Minimum 4.5:1, Target 7:1
- **Large text** (≥ 18pt or 14pt bold): Minimum 3:1, Target 4.5:1
- **Interactive elements**: Minimum 3:1

## Typography Guidelines

### Font Sizes (Dark Mode)
```
Heading 1:  3.5rem (56px)  - font-weight: 800
Heading 2:  2.5rem (40px)  - font-weight: 700
Heading 3:  1.875rem (30px) - font-weight: 600
Body:       1rem (16px)    - font-weight: 400
Small:      0.875rem (14px) - font-weight: 400
```

### Line Heights
```
Headings:   1.2
Body:       1.75
Small:      1.5
```

## Component Patterns

### Cards
```css
Background:     bg-[#1a1a1a]
Border:         border-[#404040]
Hover:          hover:bg-[#242424]
Text:           text-[#f5f5f5]
Secondary Text: text-[#b3b3b3]
```

### Buttons
```css
Primary:
  - bg-gradient-to-r from-purple-600 to-blue-600
  - text-white
  - hover:from-purple-500 hover:to-blue-500

Secondary:
  - bg-[#242424]
  - text-[#f5f5f5]
  - hover:bg-[#2e2e2e]
  - border-[#404040]
```

### Input Fields
```css
Background:     bg-[#1a1a1a]
Border:         border-[#404040]
Focus:          border-purple-500
Text:           text-[#f5f5f5]
Placeholder:    text-[#666666]
```

## Section-Specific Guidelines

### Hero Section
- Background: `dark:bg-[#0a0a0a]`
- Gradient overlay: `dark:from-[#0a0a0a] dark:via-purple-900/10 dark:to-[#0a0a0a]`
- Title: `dark:text-[#f5f5f5]` (WCAG AAA)
- Subtitle: `dark:text-[#b3b3b3]` (WCAG AA)

### Collaboration Challenge Cards (No More Halloween!)
- Card 1 (Purple): `dark:from-[#2d1b4e] dark:to-[#1e1433]`
- Card 2 (Blue): `dark:from-[#1e3a5f] dark:to-[#15293f]`
- Card 3 (Cyan): `dark:from-[#1a3d4a] dark:to-[#0f2832]`
- Card 4 (Pink): `dark:from-[#3d1f2f] dark:to-[#2a1520]`
- Border: `dark:border-[#404040]` (not color-specific)
- Text: `dark:text-[#f5f5f5]`

### Tailored Solutions Cards
- Background: `dark:bg-[#1a1a1a]`
- Border: `dark:border-[#404040]`
- Title: `dark:text-[#f5f5f5]`
- Description: `dark:text-[#b3b3b3]`
- Icon container: `dark:bg-[#242424]`

### Powerful Tools Section
- Background: `dark:bg-[#121212]`
- Card: `dark:bg-[#1a1a1a]`
- Accent: Keep gradient but reduce opacity to 0.1

### Ready to Transform
- Background: `dark:bg-gradient-to-r dark:from-[#2d1b4e] dark:via-[#1e3a5f] dark:to-[#2d1b4e]`
- Title: `dark:text-[#f5f5f5]`
- Button: Standard primary button style

## Testing Checklist

- [ ] All text meets minimum contrast ratio (4.5:1 for normal, 3:1 for large)
- [ ] No pure black (#000000) backgrounds
- [ ] No overly saturated colors in dark mode
- [ ] Cards have subtle borders for depth
- [ ] Hover states are clearly visible
- [ ] Focus states meet accessibility standards
- [ ] Tested on low-brightness displays
- [ ] No Halloween vibes (red/orange combinations)
- [ ] Consistent spacing and rhythm
- [ ] Shadow effects are subtle, not harsh

## Tools for Validation

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: Accessibility audit
- **axe DevTools**: Browser extension for a11y testing

## Implementation Priority

1. **Critical (High visibility)**
   - Home page hero
   - Collaboration Challenge cards
   - Tailored Solutions cards
   - Navigation bar

2. **Important (User-facing)**
   - "For Students/Professors/Administrators" pages
   - Products page
   - Contact page
   - Footer

3. **Lower Priority**
   - About page
   - Resources page
   - Blog page
   - Community page
