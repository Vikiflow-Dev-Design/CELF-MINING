import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useRef } from 'react';

// Design tokens
const Colors = {
  primary: {
    blue: '#1E40AF',
    light: '#3B82F6',
  },
  secondary: {
    warning: '#F59E0B',
    success: '#10B981',
    info: '#06B6D4',
  },
  text: {
    inverse: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
  },
};

const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '6xl': 64,
};

const BorderRadius = {
  xl: 16,
  '2xl': 24,
  full: 9999,
};

const Animation = {
  duration: {
    medium: 250,
  },
};

const Gradients = {
  primary: ['#1E40AF', '#3B82F6'] as const,
};

export default function UpdateScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Update schedule - using more realistic times
  const updateStartTime = new Date();
  updateStartTime.setHours(3, 0, 0, 0); // 3:00 AM today
  const updateEndTime = new Date();
  updateEndTime.setHours(5, 0, 0, 0); // 5:00 AM today

  useEffect(() => {
    // Entrance animation with CELF timing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: Animation.duration.medium,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for the gear icon
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // Pulse animation for status indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const now = currentTime.getTime();
    const end = updateEndTime.getTime();
    const remaining = end - now;

    if (remaining > 0) {
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      setTimeRemaining('Update completed');
    }
  }, [currentTime, updateEndTime]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={Gradients.primary}
        style={styles.backgroundGradient}
      />

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternCircle, styles.circle1]} />
        <View style={[styles.patternCircle, styles.circle2]} />
        <View style={[styles.patternCircle, styles.circle3]} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.mainCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
          {/* App Icon with Animation */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={[Colors.primary.light, Colors.primary.blue]}
                style={styles.iconGradient}
              >
                <Animated.View
                  style={{
                    transform: [{ rotate: spin }]
                  }}
                >
                  <Ionicons name="construct" size={32} color={Colors.text.inverse} />
                </Animated.View>
              </LinearGradient>

              {/* Status Badge */}
              <Animated.View
                style={[
                  styles.statusBadge,
                  {
                    transform: [{ scale: pulseAnim }]
                  }
                ]}
              >
                <View style={styles.statusDot} />
              </Animated.View>
            </View>
          </View>

          {/* Title and Description */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              App Update in Progress
            </Text>
            <Text style={styles.description}>
              We're currently updating CELF to bring you new features and improvements. Please wait while we complete the update.
            </Text>
          </View>

          {/* Time Information Card */}
          <View style={styles.timeCard}>
            <View style={styles.timeHeader}>
              <View style={styles.timeIconContainer}>
                <Ionicons name="time" size={24} color={Colors.secondary.warning} />
              </View>
              <Text style={styles.sectionTitle}>
                Time Remaining
              </Text>
            </View>

            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>
                {timeRemaining}
              </Text>
              <Text style={styles.timeSubtext}>
                Estimated time remaining
              </Text>
            </View>
          </View>

          


          {/* Notification Card */}
          <View style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              <View style={styles.notificationIconContainer}>
                <Ionicons name="notifications" size={24} color={Colors.secondary.info} />
              </View>
              <Text style={styles.notificationTitle}>
                We'll Notify You
              </Text>
            </View>
            <Text style={styles.notificationText}>
              You'll receive a push notification when the update is complete and the app is ready to use again.
            </Text>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusCard}>
            <Animated.View
              style={[
                styles.statusIndicator,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              <View style={styles.statusDotLarge} />
            </Animated.View>
            <Text style={styles.statusText}>
              Update in progress...
            </Text>
          </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xl, // Extra padding for small screens
  },

  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },

  patternCircle: {
    position: 'absolute',
    backgroundColor: Colors.text.inverse,
    borderRadius: BorderRadius.full,
  },

  circle1: {
    width: 120,
    height: 120,
    top: 80,
    left: -20,
    opacity: 0.3,
  },

  circle2: {
    width: 80,
    height: 80,
    top: 200,
    right: -10,
    opacity: 0.2,
  },

  circle3: {
    width: 100,
    height: 100,
    bottom: 150,
    left: 20,
    opacity: 0.15,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl, // Reduced for small screens
    paddingBottom: Spacing.lg,
    minHeight: '100%',
    justifyContent: 'flex-start', // Changed to flex-start for scrollable content
  },

  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    marginTop: Spacing.lg, // Add top margin for better spacing when scrolling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  iconWrapper: {
    position: 'relative',
  },

  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  statusBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 20,
    height: 20,
    backgroundColor: Colors.secondary.warning,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.text.inverse,
  },

  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.text.inverse,
    borderRadius: BorderRadius.full,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  description: {
    fontSize: 16,
    color: Colors.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: Spacing.md,
  },

  timeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  timeIconContainer: {
    marginRight: Spacing.sm,
  },

  timeDisplay: {
    alignItems: 'center',
  },

  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  timeSubtext: {
    fontSize: 16,
    color: Colors.text.inverse,
    textAlign: 'center',
    opacity: 0.8,
  },

  scheduleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  scheduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  scheduleList: {
    gap: Spacing.md,
  },

  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },

  scheduleDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: Spacing.xs,
  },

  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },

  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  notificationIconContainer: {
    marginRight: Spacing.sm,
  },

  notificationText: {
    fontSize: 16,
    color: Colors.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: Spacing.sm,
  },

  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusIndicator: {
    marginRight: Spacing.sm,
  },

  statusDotLarge: {
    width: 12,
    height: 12,
    backgroundColor: Colors.secondary.success,
    borderRadius: BorderRadius.full,
  },

  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },

  footerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  footerText: {
    opacity: 0.9,
    color: Colors.text.inverse,
    fontSize: 16,
    textAlign: 'center',
  },

  // Additional Text Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.inverse,
    textAlign: 'center',
  },

  scheduleLabel: {
    fontSize: 16,
    color: Colors.text.inverse,
    opacity: 0.9,
  },

  scheduleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.inverse,
  },

  notificationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.inverse,
    textAlign: 'center',
  },

  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.inverse,
  },
});
