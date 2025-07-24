# CELF Mobile App - TODO List

## 🚧 Features to Implement

### 📱 Wallet Features
- [ ] **Request Specific Amount** (Receive Tokens Screen)
  - Amount input field for payment requests
  - Optional message field for payment requests
  - Generate payment request functionality
  - QR code generation with embedded amount and message
  - Share payment request with specific amount

### 🔧 Technical Improvements
- [ ] **QR Code Generation**
  - Implement actual QR code generation library
  - Generate QR codes for wallet addresses
  - Generate QR codes for payment requests with amounts
  - QR code scanning functionality

### 📄 Missing Screens
- [ ] **Transaction Details Screen**
  - Detailed transaction information
  - Transaction ID, block explorer links
  - Receipt sharing functionality
  - Transaction status tracking

- [ ] **Account Settings Screen**
  - Email change functionality
  - Phone number change
  - Password change
  - Two-factor authentication setup
  - Privacy settings
  - Account deletion

- [ ] **App Settings Screen**
  - Notification preferences
  - Language selection
  - Theme selection (Dark/Light mode)
  - Auto-mining settings
  - Data usage settings
  - Cache management

### 🎮 Gamification Screens
- [ ] **Achievements Screen**
  - Achievement categories
  - Progress tracking
  - Completed achievements display
  - Upcoming achievements preview
  - Reward history

- [ ] **Daily Challenges Screen**
  - Today's challenges
  - Challenge progress tracking
  - Rewards display
  - Challenge history
  - Bonus challenges

### 🔗 Navigation & Integration
- [x] **Update the wallet screen to link to the new Send/Receive screens**
  - ✅ Connect Send/Receive buttons to respective screens
  - ✅ Add navigation to Transaction History
  - ✅ Integrate with existing navigation system

- [x] **Header Component Updates**
  - ✅ Fix leftAction and rightAction props
  - ✅ Ensure consistent navigation patterns
  - ✅ Add proper back button functionality

- [x] **Transaction History → Transaction Details Navigation**
  - ✅ Link transaction items to details screen with ID passing

- [x] **Profile → Edit Profile Navigation**
  - ✅ Connect edit button to edit profile screen
  - ✅ Add Account Settings navigation

### 🎨 UI/UX Improvements
- [ ] **Loading States**
  - Add loading indicators for async operations
  - Skeleton screens for data loading
  - Error state handling

- [ ] **Form Validation**
  - Input validation for send tokens
  - Email/phone validation in profile editing
  - Real-time validation feedback

### 🔐 Security Features
- [ ] **Biometric Authentication**
  - Fingerprint/Face ID for transactions
  - Secure transaction confirmation
  - App lock functionality

### 📊 Data Management
- [ ] **Real API Integration**
  - Replace mock data with actual API calls
  - Implement proper state management
  - Add offline data caching

### 🧪 Testing
- [ ] **Unit Tests**
  - Component testing
  - Utility function testing
  - Navigation testing

- [ ] **Integration Tests**
  - Screen flow testing
  - API integration testing
  - User journey testing

## 📝 Notes
- Features marked with 🚧 are partially implemented
- Features marked with ❌ are removed/postponed
- Features marked with ✅ are completed

## 🎯 Priority Levels
- **High**: Core functionality needed for MVP
- **Medium**: Important features for user experience
- **Low**: Nice-to-have features for future releases

---
*Last Updated: January 17, 2025*
