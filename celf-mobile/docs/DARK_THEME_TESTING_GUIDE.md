# Dark Theme Testing Guide

## 🌙 Overview

This guide provides comprehensive testing instructions for the dark theme implementation in the CELF mobile app.

## 🧪 Testing Checklist

### 1. Theme Toggle Functionality

#### Access Settings
- [ ] Open sidebar navigation
- [ ] Tap "Settings" in bottom menu
- [ ] Verify settings screen loads correctly

#### Theme Switch
- [ ] Locate "Dark Theme" toggle switch
- [ ] Verify switch shows current theme state (off = light, on = dark)
- [ ] Toggle switch to dark theme
- [ ] Verify immediate visual change to dark colors
- [ ] Toggle back to light theme
- [ ] Verify return to light colors

### 2. Screen-by-Screen Testing

#### Mining Screen
**Light Theme:**
- [ ] Background: Light gray (#F9FAFB)
- [ ] Cards: White background
- [ ] Text: Dark colors for readability
- [ ] Mining button: Blue (inactive) / Orange (active)
- [ ] Icons: Blue for primary, gray for secondary

**Dark Theme:**
- [ ] Background: Dark slate (#0F172A)
- [ ] Cards: Dark gray background (#1E293B)
- [ ] Text: Light colors for readability
- [ ] Mining button: Blue (inactive) / Orange (active)
- [ ] Icons: Brighter blue for primary, light gray for secondary

#### Wallet Screen
**Light Theme:**
- [ ] Background: Light gray
- [ ] Balance card: Gradient background
- [ ] Text: Dark on light backgrounds
- [ ] Action buttons: Blue primary color

**Dark Theme:**
- [ ] Background: Dark slate
- [ ] Balance card: Same gradient (should remain readable)
- [ ] Text: Light on dark backgrounds
- [ ] Action buttons: Brighter blue for visibility

#### Profile Screen
**Light Theme:**
- [ ] Background: Light gray
- [ ] Profile card: White background
- [ ] Menu items: Gray icons, dark text
- [ ] Borders: Light gray

**Dark Theme:**
- [ ] Background: Dark slate
- [ ] Profile card: Dark gray background
- [ ] Menu items: Light gray icons, light text
- [ ] Borders: Medium gray for visibility

#### Settings Screen
**Light Theme:**
- [ ] Background: Light gray
- [ ] Settings card: White background
- [ ] Icons: Gray colors
- [ ] Toggle switches: Blue accent

**Dark Theme:**
- [ ] Background: Dark slate
- [ ] Settings card: Dark gray background
- [ ] Icons: Light gray colors
- [ ] Toggle switches: Blue accent (same)

### 3. Navigation Testing

#### Sidebar Navigation
**Light Theme:**
- [ ] Background: White
- [ ] Active items: Blue background with blue icons
- [ ] Inactive items: Transparent background with gray icons
- [ ] User avatar: Blue accent background

**Dark Theme:**
- [ ] Background: Dark slate
- [ ] Active items: Blue background with brighter blue icons
- [ ] Inactive items: Transparent background with light gray icons
- [ ] User avatar: Blue accent background (same)

#### Header Component
**Light Theme:**
- [ ] Status bar: Dark content on light background
- [ ] Menu button: Gray background with blue icon
- [ ] Title text: Dark color

**Dark Theme:**
- [ ] Status bar: Light content on dark background
- [ ] Menu button: Dark gray background with bright blue icon
- [ ] Title text: Light color

### 4. Component Testing

#### Buttons
- [ ] Primary buttons: Blue background in both themes
- [ ] Secondary buttons: Transparent with blue border
- [ ] Mining buttons: Orange background when active
- [ ] Text color: White on colored backgrounds

#### Cards
- [ ] Light theme: White background with subtle shadows
- [ ] Dark theme: Dark gray background with shadows
- [ ] Content adapts to background color

#### Typography
- [ ] Primary text: High contrast in both themes
- [ ] Secondary text: Medium contrast
- [ ] Tertiary text: Lower contrast but still readable

#### Icons
- [ ] Primary icons: Blue (brighter in dark theme)
- [ ] Secondary icons: Gray (lighter in dark theme)
- [ ] Tertiary icons: Light gray
- [ ] Accent icons: Orange (same in both themes)

### 5. Persistence Testing

#### Theme Persistence
- [ ] Set theme to dark
- [ ] Close app completely
- [ ] Reopen app
- [ ] Verify dark theme is restored
- [ ] Repeat test with light theme

#### Settings Persistence
- [ ] Change theme multiple times
- [ ] Verify setting is saved each time
- [ ] Test app restart after each change

### 6. Edge Cases

#### Theme Switching During Navigation
- [ ] Navigate to different screens
- [ ] Switch theme while on each screen
- [ ] Verify immediate update without navigation issues

#### Rapid Theme Switching
- [ ] Toggle theme switch rapidly multiple times
- [ ] Verify no visual glitches or performance issues
- [ ] Ensure final state matches switch position

#### Memory and Performance
- [ ] Monitor app performance during theme switches
- [ ] Verify no memory leaks from theme changes
- [ ] Test with multiple theme switches in session

## 🐛 Common Issues to Check

### Visual Issues
- [ ] Text contrast sufficient in both themes
- [ ] No invisible text (same color as background)
- [ ] Icons visible and properly colored
- [ ] Borders visible but not overwhelming

### Functional Issues
- [ ] Theme toggle responds immediately
- [ ] All interactive elements remain functional
- [ ] Navigation works in both themes
- [ ] No crashes during theme switching

### Performance Issues
- [ ] Theme switching is smooth and fast
- [ ] No lag when navigating after theme change
- [ ] App remains responsive during theme transitions

## ✅ Success Criteria

The dark theme implementation is successful when:

1. **Visual Consistency**: All screens look cohesive in both light and dark themes
2. **Accessibility**: Text remains readable with sufficient contrast in both themes
3. **Functionality**: All features work identically in both themes
4. **Persistence**: Theme preference is saved and restored correctly
5. **Performance**: Theme switching is smooth without performance impact
6. **User Experience**: Theme toggle is intuitive and provides immediate feedback

## 🔧 Troubleshooting

### If theme doesn't switch:
1. Check if `ThemeProvider` is properly wrapped around the app
2. Verify `useThemeColors` hook is used in components
3. Ensure theme colors are applied to style properties

### If theme doesn't persist:
1. Check expo-secure-store permissions
2. Verify theme saving logic in ThemeContext
3. Test storage functionality independently

### If colors look wrong:
1. Verify dark theme colors in design-tokens.ts
2. Check component usage of `themeColors` vs hardcoded `Colors`
3. Ensure proper color mapping in useThemeColors hook

---

*Complete this testing checklist before considering the dark theme implementation ready for production.*
