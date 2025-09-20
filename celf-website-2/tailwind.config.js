/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // CELF Brand Colors
        brand: {
          primary: "#9EFF00",
          "primary-dark": "#7ACC00",
          accent: "#00FF94",
        },
        // Background Colors
        background: {
          primary: "#0A0A0A",
          secondary: "#1A1A1A",
          card: "rgba(26, 26, 26, 0.8)",
          "card-hover": "rgba(26, 26, 26, 1)",
          nav: "rgba(10, 10, 10, 0.95)",
        },
        // Text Colors
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          muted: "#808080",
          accent: "#9EFF00",
        },
        // Border Colors
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          accent: "rgba(158, 255, 0, 0.1)",
          "accent-hover": "rgba(158, 255, 0, 0.3)",
          featured: "#9EFF00",
        },
        // Admin Status Colors
        admin: {
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
          "success-bg": "rgba(34, 197, 94, 0.1)",
          "warning-bg": "rgba(245, 158, 11, 0.1)",
          "error-bg": "rgba(239, 68, 68, 0.1)",
          "info-bg": "rgba(59, 130, 246, 0.1)",
        },
      },
      backgroundImage: {
        // CELF Gradients
        "primary-glow":
          "radial-gradient(circle, rgba(158, 255, 0, 0.3) 0%, rgba(158, 255, 0, 0) 70%)",
        "card-glow":
          "radial-gradient(circle at center, rgba(158, 255, 0, 0.1) 0%, transparent 50%)",
        "hero-bg":
          "radial-gradient(ellipse at center, rgba(158, 255, 0, 0.05) 0%, transparent 70%)",
        "device-gradient": "linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 100%)",
        "globe-glow":
          "radial-gradient(circle, rgba(158, 255, 0, 0.3) 0%, rgba(158, 255, 0, 0.1) 50%, transparent 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // Admin-specific gradients
        "admin-bg": "radial-gradient(ellipse at top, rgba(158, 255, 0, 0.03) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(0, 255, 148, 0.02) 0%, transparent 50%)",
        "admin-card": "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.4) 100%)",
        "admin-sidebar": "linear-gradient(180deg, rgba(26, 26, 26, 1) 0%, rgba(10, 10, 10, 1) 100%)",
        "admin-header": "linear-gradient(90deg, rgba(26, 26, 26, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%)",
        "button-primary": "linear-gradient(135deg, #9EFF00 0%, #7ACC00 100%)",
        "button-secondary": "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 100%)",
      },
      boxShadow: {
        // CELF Shadows
        card: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 12px 48px rgba(0, 0, 0, 0.4)",
        device: "0 20px 60px rgba(0, 0, 0, 0.5)",
        glow: "0 0 30px rgba(158, 255, 0, 0.2)",
        "globe-glow": "0 0 100px rgba(158, 255, 0, 0.3)",
        // Admin-specific shadows
        "admin-card": "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(158, 255, 0, 0.1)",
        "admin-card-hover": "0 16px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(158, 255, 0, 0.2)",
        "admin-sidebar": "inset 1px 0 0 rgba(158, 255, 0, 0.1), 4px 0 24px rgba(0, 0, 0, 0.3)",
        "admin-header": "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 -1px 0 rgba(158, 255, 0, 0.1)",
        "admin-button": "0 4px 16px rgba(158, 255, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "admin-button-hover": "0 8px 32px rgba(158, 255, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        "admin-modal": "0 24px 96px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(158, 255, 0, 0.1)",
        "success": "0 4px 16px rgba(34, 197, 94, 0.3)",
        "warning": "0 4px 16px rgba(245, 158, 11, 0.3)",
        "error": "0 4px 16px rgba(239, 68, 68, 0.3)",
        "info": "0 4px 16px rgba(59, 130, 246, 0.3)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // CELF specific radius
        "celf-sm": "8px",
        "celf-md": "12px",
        "celf-lg": "16px",
        "celf-xl": "20px",
      },
      fontSize: {
        // CELF Typography
        hero: "clamp(2.5rem, 8vw, 6rem)",
        "card-title": "1.5rem",
        "card-desc": "1rem",
        stat: "3rem",
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        tight: "1.1",
        relaxed: "1.6",
      },
      spacing: {
        // CELF Spacing
        card: "24px",
        "card-lg": "32px",
        icon: "12px",
      },
      backdropBlur: {
        celf: "10px",
        "celf-strong": "15px",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "300ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        celf: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      animation: {
        glow: "pulse-glow 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
