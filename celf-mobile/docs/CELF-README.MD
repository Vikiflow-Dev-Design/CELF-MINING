CELF Mobile App Architecture
Screen Navigation Structure
CELF Mining App

1. Pre-Authentication Screens
   1.1 App Launch Screens
   Screen 1: Splash Screen

App logo animation
Loading indicator
Version check
Auto-redirect after 2-3 seconds

Screen 2: App Update Screen (if needed)

Update required message
New features preview
Update button
Skip option (for optional updates)

Screen 3: Maintenance Screen (if needed)

Maintenance notification
Estimated time
Contact support option

2. Authentication Screens
   2.1 Welcome & Sign Up Flow
   Screen 4: Welcome Screen

Welcome slides carousel (3 slides)
Skip button
Next/Previous navigation
Get Started button

Screen 5: Sign Up Options Screen

Email & Password option
Phone number option
Social media login buttons:

Google Sign-in
Apple ID
Facebook Login

Terms & Conditions link (Links to website)
Privacy Policy link (Links to website)
Already have account? Login link

Screen 6: Email Registration Screen

Email input field
Password input field
Confirm password field
Username input field
Country selection dropdown
Create Account button
Back button

Screen 7: Phone Registration Screen

Phone number input
Country code selector
SMS verification notice
Send Code button
Back button

Screen 8: OTP Verification Screen

6-digit OTP input
Resend code button
Timer countdown
Verify button
Change phone number link

Screen 9: Social Login Processing Screen

Loading animation
"Connecting to [Platform]" message
Cancel button

2.2 Login Flow
Screen 10: Login Screen

Email/Username input
Password input
Remember me checkbox
Login button
Forgot password link
Create account link
Social login options

Screen 11: Forgot Password Screen

Email input field
Send reset link button
Back to login link
Instructions text

Screen 12: Reset Password Screen

New password input
Confirm password input
Reset button
Requirements checklist

3. Onboarding Screens
   3.1 Initial Setup
   Screen 13: Profile Setup Screen

Profile picture upload
Username input (with availability check)
Bio input (optional)
Country confirmation
Continue button

Screen 14: Notification Permission Screen

Notification benefits explanation
Allow notifications button
Skip for now button
Settings preview

Screen 15: Welcome Bonus Screen

Congratulations message
Welcome bonus amount (10 CELF)
Claim bonus button
Continue to app button

Screen 16: Tutorial Overlay Screens (5 screens)

Tutorial 1: Mining button explanation
Tutorial 2: Balance display
Tutorial 3: Referral system
Tutorial 4: Navigation tabs
Tutorial 5: Settings access

4. Main App Screens
   4.1 Bottom Navigation Screens
   Screen 17: Home/Mining Dashboard

Mining button (main feature)
Current balance display
Mining rate display
Session timer
Today's earnings
Quick stats cards
News ticker
Navigation tabs

Screen 18: Wallet Screen

Total balance
Recent transactions list
Send/Receive buttons
Transaction history button

Screen 19: Referrals Screen

Referral code/link sharing
Active referrals list
Inactive referrals list
Referral earnings
Invite friends button
Referral leaderboard

Screen 20: Profile Screen

Profile picture and info
Mining statistics
Achievement badges
Settings access
Account level

Screen 21: Socials Screen (NEW)

Social Media Feed Integration

Facebook posts display
Twitter/X feed
Instagram gallery
LinkedIn updates
YouTube videos
TikTok content

Post Interaction Features

Like/React buttons
Share functionality
Comment preview
Click-to-redirect (automatically opens social media platform)

Social Navigation

Platform filtering
Content categories
Search functionality
Refresh feed

4.2 Mining Related Screens
Screen 22: Mining Active Screen

Large mining button (active state)
Real-time counter
Mining rate breakdown
Session progress bar
Pause/Stop options

5. Profile & Settings Screens
   5.1 Profile Management
   Screen 23: Edit Profile Screen

Profile picture change
Username edit
Bio edit
Contact information
Save changes button
Cancel button

Screen 24: Account Settings Screen

Email change
Phone number change
Password change
Two-factor authentication
Privacy settings
Account deletion

Screen 25: App Settings Screen

Notification preferences
Language selection
Theme selection (Dark/Light)
Auto-mining settings
Data usage settings
Cache management

6. Wallet Screens
   6.1 Wallet Management
   Screen 26: Wallet Details Screen

Detailed balance breakdown
Wallet address display
QR code for receiving
Copy address button
Wallet backup options

   Screen 27: Send Tokens Screen

Recipient selection
Amount input
Fee calculation
Message field (optional)
Send confirmation
Transaction preview

Screen 28: Receive Tokens Screen

QR code display
Wallet address
Amount request field
Share options
Copy address button

Screen 29: Transaction History Screen

Transaction list
Filter options
Search functionality
Transaction details
Export history
Refresh button

Screen 30: Transaction Details Screen

Transaction ID
Amount and fee
Timestamp
Status
Block explorer link
Receipt sharing

7. Achievement & Gamification Screens
   7.1 Achievement System
   Screen 31: Achievements Screen

Achievement categories
Progress tracking
Completed achievements
Upcoming achievements
Reward history

Screen 32: Achievement Details Screen

Achievement description
Progress bar
Reward information
Completion tips
Share achievement

Screen 33: Daily Challenges Screen

Today's challenges
Challenge progress
Rewards display
Challenge history
Bonus challenges

Screen 34: Challenge Details Screen

Challenge description
Progress tracking
Reward information
Start challenge button
Challenge tips

8. Support & Help Screens (Links to Website)
   Screen 35: Help Center Navigation Screen

Quick FAQ links
"Visit Full Help Center" button (Links to website)
Contact support options
Live chat access
Emergency contact info

Screen 36: Contact Support Navigation Screen

"Visit Support Center" button (Links to website)
Emergency contact options
Quick issue reporting
Live chat launcher

9. Administrative Screens (Links to Website)
   Screen 37: App Information Navigation Screen

Current app version
"View Full App Information" button (Links to website)
Update notifications
What's new summary

Screen 38: Terms & Conditions Navigation Screen

Terms summary
"Read Full Terms" button (Links to website)
Last updated date
Quick acceptance options

Screen 39: Privacy Policy Navigation Screen

Privacy summary
"Read Full Privacy Policy" button (Links to website)
Data usage overview
Quick privacy controls

10. Modal & Popup Screens
    10.1 Confirmation Dialogs
    Screen 40: Mining Confirmation Modal

Start mining confirmation
Mining rate display
Confirm/Cancel buttons

Screen 41: Transaction Confirmation Modal

Transaction details
Fee information
Biometric authentication
Confirm/Cancel buttons

Screen 42: Logout Confirmation Modal

Logout warning
Data sync status
Confirm/Cancel buttons

10.2 Information Modals
Screen 43: Mining Rate Info Modal

Rate calculation breakdown
Bonus explanations
Optimization tips
Close button

Screen 44: Achievement Unlocked Modal

Achievement badge
Reward information
Share options
Continue button

Screen 45: Referral Success Modal

Success message
Referral information
Bonus details
Continue button

11. Error & Loading States
    Screen 46: Loading Screen

Loading animation
Progress indicator
Loading message
Cancel option (if applicable)

Screen 47: Error Screen

Error message
Error code
Retry button
Contact support
Go back option

Screen 48: No Internet Screen

No connection message
Retry button
Network troubleshooting

Screen 49: Maintenance Mode Screen

Maintenance message
Estimated completion
Contact information
App updates info

12. Empty States
    Screen 50: Empty Transaction History

No transactions message
Start mining suggestion
Get started button

Screen 51: Empty Referrals

No referrals message
Invite friends suggestion
Share referral button

Screen 52: Empty Social Feed (NEW)

No posts message
Refresh button
Visit social media platforms button

Screen Flow Examples
New User Flow
Splash → Welcome → Sign Up → OTP → Profile Setup → Notification Permission → Welcome Bonus → Tutorial → Mining Dashboard
Daily User Flow
Mining Dashboard → Start Mining → Mining Active → Check Referrals → View Achievements → Profile Settings → Socials Screen
Transaction Flow
Wallet → Send Tokens → Recipient Selection → Amount Input → Confirmation → Biometric Auth → Transaction Complete
Support Flow (NEW)
Profile → Settings → Help → Navigate to Website Support Center

Total Screen Count: 52 Screens
