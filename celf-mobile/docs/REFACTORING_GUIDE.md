# File Refactoring Guide for CELF

## 🎯 Current File Sizes (Need Refactoring)

| File | Lines | Status | Priority |
|------|-------|--------|----------|
| `social.tsx` | 876 | 🔴 Critical | High |
| `mining.tsx` | 605 | 🟡 Large | Medium |
| `update.tsx` | 602 | 🟡 Large | Medium |
| `privacy-policy.tsx` | 528 | 🟡 Large | Low |
| `app-information.tsx` | 430 | ✅ **DONE** | - |

## 🛠️ Refactoring Strategy

### **1. Component Extraction Pattern**

**Break large screens into:**
- **Main Screen** (50-100 lines) - Composition only
- **Components** (50-150 lines each) - UI sections
- **Hooks** (30-80 lines each) - Business logic
- **Utils** (20-50 lines each) - Helper functions
- **Types** (10-30 lines) - Type definitions
- **Data** (20-100 lines) - Static data/constants

### **2. File Structure Template**

```
screen-name/
├── index.tsx              # Main screen (composition)
├── types.ts               # TypeScript interfaces
├── data.ts                # Static data/constants
├── utils.ts               # Helper functions
├── hooks/
│   ├── useScreenName.ts   # Main business logic
│   └── useSpecificLogic.ts # Specific functionality
└── components/
    ├── index.ts           # Component exports
    ├── MainSection.tsx    # Primary UI section
    ├── SecondarySection.tsx # Secondary UI section
    └── ActionButtons.tsx  # Action components
```

## 📋 Specific Refactoring Plans

### **🔴 Priority 1: social.tsx (876 lines)**

**Proposed Structure:**
```
social/
├── index.tsx (80 lines)
├── types.ts (40 lines)
├── data.ts (60 lines)
├── utils.ts (50 lines)
├── hooks/
│   ├── useSocialFeed.ts (80 lines)
│   ├── useSocialActions.ts (60 lines)
│   └── useSocialProfile.ts (70 lines)
└── components/
    ├── FeedSection.tsx (120 lines)
    ├── PostCard.tsx (100 lines)
    ├── UserProfile.tsx (90 lines)
    ├── CommentsList.tsx (80 lines)
    └── SocialActions.tsx (60 lines)
```

**Extract:**
- Feed logic → `useSocialFeed` hook
- Post interactions → `useSocialActions` hook
- User profile → `useSocialProfile` hook
- Post rendering → `PostCard` component
- Comments → `CommentsList` component

### **🟡 Priority 2: mining.tsx (605 lines)**

**Proposed Structure:**
```
mining/
├── index.tsx (60 lines)
├── types.ts (20 lines)
├── hooks/
│   ├── useMiningAnimation.ts (80 lines)
│   └── useMiningTimer.ts (60 lines)
└── components/
    ├── MiningButton.tsx (100 lines)
    ├── MiningStats.tsx (120 lines)
    ├── MiningTimer.tsx (80 lines)
    └── QuickActions.tsx (85 lines)
```

**Extract:**
- Animation logic → `useMiningAnimation` hook
- Timer logic → `useMiningTimer` hook
- Mining button → `MiningButton` component
- Statistics display → `MiningStats` component

### **🟡 Priority 3: update.tsx (602 lines)**

**Proposed Structure:**
```
update/
├── index.tsx (70 lines)
├── types.ts (30 lines)
├── data.ts (40 lines)
├── hooks/
│   └── useUpdateCheck.ts (80 lines)
└── components/
    ├── UpdateBanner.tsx (90 lines)
    ├── ChangelogSection.tsx (120 lines)
    ├── UpdateProgress.tsx (100 lines)
    └── UpdateActions.tsx (72 lines)
```

## 🔧 Refactoring Steps

### **Step 1: Analyze the File**
1. Identify distinct UI sections
2. Find reusable logic patterns
3. Locate static data/constants
4. Spot utility functions

### **Step 2: Extract Types & Data**
```typescript
// types.ts
export interface PostData { ... }
export interface UserProfile { ... }

// data.ts
export const mockPosts = [...];
export const defaultSettings = {...};
```

### **Step 3: Extract Utilities**
```typescript
// utils.ts
export const formatDate = (date: Date) => { ... };
export const validateInput = (input: string) => { ... };
```

### **Step 4: Extract Business Logic**
```typescript
// hooks/useFeatureName.ts
export const useFeatureName = () => {
  const [state, setState] = useState();
  
  const handleAction = () => { ... };
  
  return { state, handleAction };
};
```

### **Step 5: Extract UI Components**
```typescript
// components/FeatureSection.tsx
export const FeatureSection = ({ data, onAction }) => {
  return <View>...</View>;
};
```

### **Step 6: Compose Main Screen**
```typescript
// index.tsx
export default function Screen() {
  const { data, actions } = useFeatureName();
  
  return (
    <ScrollView>
      <FeatureSection data={data} onAction={actions.handle} />
    </ScrollView>
  );
}
```

## 📊 Expected Results

### **File Size Reduction:**
- **social.tsx**: 876 → ~80 lines (91% reduction)
- **mining.tsx**: 605 → ~60 lines (90% reduction)
- **update.tsx**: 602 → ~70 lines (88% reduction)

### **Benefits:**
- ✅ **Easier debugging** - Isolated components
- ✅ **Faster development** - Reusable pieces
- ✅ **Better testing** - Testable units
- ✅ **Team collaboration** - Multiple devs can work on different components
- ✅ **Code reuse** - Components used across screens

## 🚀 Implementation Order

1. **Start with app-information** ✅ (Already done)
2. **Refactor social.tsx** (Biggest impact)
3. **Refactor mining.tsx** (Core functionality)
4. **Refactor update.tsx** (User experience)
5. **Refactor remaining files** (Lower priority)

This refactoring will transform your codebase from hard-to-maintain monoliths into clean, modular, and maintainable code! 🎉
