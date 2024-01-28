const fs = require('fs');
const crypto = require('crypto');

const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const envFilePath = '.env';

if (!fs.existsSync(envFilePath)) {
  const envContent = `JWT_SECRET=${generateJWTSecret()}\n`;

  fs.writeFileSync(envFilePath, envContent);
  console.log('.env file created with JWT_SECRET.');
} else {
  const existingEnvContent = fs.readFileSync(envFilePath, 'utf-8');
  
  if (!existingEnvContent.includes('JWT_SECRET')) {
    const updatedEnvContent = `${existingEnvContent.trim()}\nJWT_SECRET=${generateJWTSecret()}\n`;

    fs.writeFileSync(envFilePath, updatedEnvContent);
    console.log('Added JWT_SECRET to existing .env file.');
  } else {
    console.log('JWT_SECRET already exists in the .env file.');
  }
}
