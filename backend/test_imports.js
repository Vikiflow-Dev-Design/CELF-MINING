// Test all imports
console.log('🔍 Testing all imports...\n');

try {
  console.log('1️⃣ Testing config...');
  const config = require('./src/config/config');
  console.log('✅ Config loaded');

  console.log('2️⃣ Testing database...');
  const database = require('./src/config/database');
  console.log('✅ Database loaded');

  console.log('3️⃣ Testing supabaseService...');
  const supabaseService = require('./src/services/supabaseService');
  console.log('✅ SupabaseService loaded');

  console.log('4️⃣ Testing authController...');
  const authController = require('./src/controllers/authController');
  console.log('✅ AuthController loaded');

  console.log('5️⃣ Testing validation middleware...');
  const { validateRequest } = require('./src/middleware/validationMiddleware');
  console.log('✅ Validation middleware loaded');

  console.log('6️⃣ Testing auth middleware...');
  const { authenticate } = require('./src/middleware/authMiddleware');
  console.log('✅ Auth middleware loaded');

  console.log('7️⃣ Testing authRoutes...');
  const authRoutes = require('./src/routes/authRoutes');
  console.log('✅ AuthRoutes loaded');
  console.log('AuthRoutes type:', typeof authRoutes);

  console.log('8️⃣ Testing main routes...');
  const routes = require('./src/routes/index');
  console.log('✅ Main routes loaded');
  console.log('Routes type:', typeof routes);

  console.log('\n🎉 All imports successful!');

} catch (error) {
  console.error('❌ Import error:', error.message);
  console.error('Stack:', error.stack);
}
