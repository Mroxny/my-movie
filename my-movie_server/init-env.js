const fs = require('fs');
const crypto = require('crypto');

const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};


const valueDictionary = {
  JWT_SECRET: generateJWTSecret(),
  PORT: 3003
};

const envFilePath = '.env';

if (!fs.existsSync(envFilePath)) {
  
  let envContent = '';
  for (key in valueDictionary) {
    if (Object.hasOwnProperty.call(valueDictionary, key)) {
      value = valueDictionary[key];
      envContent += `${key}=${value}\n`;
    }
  }

  fs.writeFileSync(envFilePath, envContent);
  console.log(`Created new ${envFilePath} file.`);
} else {
  console.log(`File ${envFilePath} already exists`);
}
