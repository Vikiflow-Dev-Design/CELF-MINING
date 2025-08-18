// Minimal test server
const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Test route directly
app.post('/api/auth/login', (req, res) => {
  console.log('🎯 Direct route hit!');
  console.log('Body:', req.body);
  res.json({
    success: true,
    message: 'Direct route working',
    body: req.body
  });
});

// Test if the issue is with the main routes
try {
  console.log('Loading main routes...');
  const routes = require('./src/routes/index');
  app.use('/api', routes);
  console.log('✅ Main routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading main routes:', error.message);
}

// Start server
const PORT = 5001; // Different port to avoid conflict
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`Test direct route: http://localhost:${PORT}/api/auth/login`);
  console.log(`Test main routes: http://localhost:${PORT}/api/auth/login`);
});

// List all routes
setTimeout(() => {
  console.log('\n📋 Registered routes:');
  app._router.stack.forEach((middleware, index) => {
    if (middleware.route) {
      console.log(`${index}: ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      console.log(`${index}: Router middleware`);
      if (middleware.handle && middleware.handle.stack) {
        middleware.handle.stack.forEach((handler, subIndex) => {
          if (handler.route) {
            console.log(`  ${subIndex}: ${Object.keys(handler.route.methods)} ${handler.route.path}`);
          }
        });
      }
    } else {
      console.log(`${index}: ${middleware.name || 'Anonymous'} middleware`);
    }
  });
}, 1000);
