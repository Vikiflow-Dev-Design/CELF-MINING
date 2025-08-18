// Debug route registration
const express = require('express');

console.log('🔍 Debugging Route Registration\n');

try {
  // Test importing routes individually
  console.log('1️⃣ Testing individual route imports...');
  
  const authRoutes = require('./src/routes/authRoutes');
  console.log('✅ authRoutes imported successfully');
  
  const routes = require('./src/routes/index');
  console.log('✅ main routes index imported successfully');
  
  // Test creating a simple express app with routes
  console.log('\n2️⃣ Testing route registration...');
  const app = express();
  
  // Add middleware
  app.use(express.json());
  
  // Add routes
  app.use('/api', routes);
  
  // List all registered routes
  console.log('\n3️⃣ Registered routes:');
  
  function listRoutes(app) {
    const routes = [];
    
    app._router.stack.forEach(function(middleware) {
      if (middleware.route) {
        // Single route
        routes.push({
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          path: middleware.route.path
        });
      } else if (middleware.name === 'router') {
        // Router middleware
        middleware.handle.stack.forEach(function(handler) {
          if (handler.route) {
            const method = Object.keys(handler.route.methods)[0].toUpperCase();
            const path = middleware.regexp.source
              .replace('\\', '')
              .replace('(?=\\/|$)', '')
              .replace('^', '')
              .replace('$', '');
            
            routes.push({
              method: method,
              path: path + handler.route.path
            });
          }
        });
      }
    });
    
    return routes;
  }
  
  // Start a temporary server to test
  const server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`🚀 Test server started on port ${port}`);
    
    // Test the route
    const http = require('http');
    
    const options = {
      hostname: 'localhost',
      port: port,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request(options, (res) => {
      console.log(`\n4️⃣ Route test result:`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('Response:', data);
        server.close();
        
        if (res.statusCode === 404) {
          console.log('\n❌ Route not found - there\'s an issue with route registration');
        } else {
          console.log('\n✅ Route found - the issue might be elsewhere');
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`❌ Request error: ${e.message}`);
      server.close();
    });
    
    // Send empty body for login test
    req.write('{}');
    req.end();
  });
  
} catch (error) {
  console.error('❌ Error during route debugging:', error);
  console.error('Stack:', error.stack);
}
