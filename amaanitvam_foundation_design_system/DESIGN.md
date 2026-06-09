---
name: Amaanitvam Foundation Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#574235'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#8b7263'
  outline-variant: '#dec1af'
  surface-tint: '#964900'
  primary: '#964900'
  on-primary: '#ffffff'
  primary-container: '#f57c00'
  on-primary-container: '#572800'
  inverse-primary: '#ffb786'
  secondary: '#506169'
  on-secondary: '#ffffff'
  secondary-container: '#d1e2ec'
  on-secondary-container: '#55656d'
  tertiary: '#625e59'
  on-tertiary: '#ffffff'
  tertiary-container: '#a29d97'
  on-tertiary-container: '#383530'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc6'
  primary-fixed-dim: '#ffb786'
  on-primary-fixed: '#311300'
  on-primary-fixed-variant: '#723600'
  secondary-fixed: '#d4e5ef'
  secondary-fixed-dim: '#b8c9d3'
  on-secondary-fixed: '#0d1e25'
  on-secondary-fixed-variant: '#394951'
  tertiary-fixed: '#e8e1db'
  tertiary-fixed-dim: '#cbc5bf'
  on-tertiary-fixed: '#1e1b17'
  on-tertiary-fixed-variant: '#4a4641'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 96px
---

## Brand & Style
The design system is anchored in a philosophy of "Empathetic Professionalism." It balances the urgency of NGO work with a premium, polished execution that builds high levels of donor trust. The aesthetic is **Modern/Corporate** with a **Minimalist** lean, prioritizing high-quality human-centric photography and generous whitespace to allow stories of impact to breathe. 

The emotional response should be one of quiet confidence, warmth, and transparency. By avoiding cluttered layouts and aggressive "poverty porn" visuals, the system focuses on dignity, progress, and the tangible results of collective action.

## Colors
The palette is designed to feel energetic yet grounded. 
- **Primary Orange (#F57C00):** Used strategically for calls to action, progress indicators, and key highlights. It represents vitality and the "warmth" of the human spirit.
- **Secondary Charcoal (#37474F):** A soft, deep blue-grey used for primary text and structural elements to ensure readability without the harshness of pure black.
- **Tertiary Cream (#FFF8F1):** A subtle background alternative to pure white, used to soften sections containing long-form storytelling.
- **Surface White (#FFFFFF):** The primary canvas color, ensuring a clean, high-end feel.

## Typography
The typography strategy pairs the soft, approachable curves of **Plus Jakarta Sans** for headlines with the utilitarian clarity of **Inter** for body text. 

Headlines should use tighter letter-spacing to create a "premium editorial" feel. Body text is set with generous line heights to ensure accessibility and ease of reading for diverse audiences. For emotional storytelling sections, use `body-lg` to create a more immersive, narrative experience.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 
- **Rhythm:** All margins and paddings must be multiples of the 8px base unit. 
- **Whitespace:** High "section-gap" values are encouraged to separate distinct stories and impact data, preventing cognitive overload.
- **Max Width:** Content should be capped at 1280px to maintain line-length readability on ultra-wide monitors, centering the layout with auto-margins.

## Elevation & Depth
Depth is handled through **Ambient Shadows** and **Tonal Layering**. 
- **Shadows:** Use extremely soft, diffused shadows with a slight tint of the secondary color (`rgba(55, 71, 79, 0.08)`) rather than pure grey. This makes the UI feel "lifted" and physical rather than flat.
- **Interaction:** On hover, cards should subtly increase their elevation (blur radius increases) to signal interactivity.
- **Backgrounds:** Use the Tertiary Cream to create "recessed" sections that sit physically behind white cards, creating a natural vertical hierarchy.

## Shapes
The shape language is consistently **Rounded**. 
- **Cards and Containers:** Use `rounded-lg` (16px) for main content cards to evoke a friendly, safe, and modern feeling.
- **Buttons:** Use `rounded-xl` (24px) or full pill-shapes for primary CTAs to make them feel inviting to touch.
- **Media:** Photography should always feature rounded corners to match the UI components, avoiding sharp edges that could feel aggressive.

## Components
- **Primary Buttons:** High-contrast Orange background with White text. Bold weight. Minimal 56px height for prominent "Donate" or "Join Us" actions.
- **Impact Cards:** White background, `rounded-lg` corners, and a soft ambient shadow. Include a top-aligned image and a bottom padding area for a progress bar or "Impact Metric."
- **Trust Indicators:** Clean, icon-based stats using thin-stroke icons in the Primary Orange color. Text should be centered and use `headline-md`.
- **Action Hub Grid:** A clean 3-column grid (on desktop) of interactive tiles. Each tile should have a subtle 1px border in a lightened version of the Secondary Neutral to define boundaries without adding visual weight.
- **Navigation Bar:** Fixed position with a backdrop blur (Glassmorphism effect) to maintain context while scrolling. The "Donate" CTA in the nav should be the only filled button to maintain focus.
- **Input Fields:** Soft grey backgrounds with a 2px bottom border that turns Orange on focus, rather than a full box-border, to keep the forms feeling light and "premium."