const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2);
const command = args[0];

// Generate key pair
if (command === 'generate-keys') {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  fs.writeFileSync('public_key.pem', publicKey.export({ type: 'pkcs1', format: 'pem' }));
  fs.writeFileSync('private_key.pem', privateKey.export({ type: 'pkcs1', format: 'pem' }));

  console.log('Keys generated and saved to public_key.pem and private_key.pem');
}

// Submit public key to server
if (command === 'submit-key') {
  const password = args[1];
  const publicKey = fs.readFileSync('public_key.pem', 'utf8');

  axios.post('http://localhost:3000/store-key', { password, publicKey })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error.response.data));
}

// Sign a message
if (command === 'sign') {
  const message = args[1];
  const privateKey = fs.readFileSync('private_key.pem', 'utf8');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  const signature = signer.sign(privateKey, 'hex');

  console.log('Message:', message);
  console.log('Signature:', signature);
}

// Verify a message
if (command === 'verify') {
  const message = args[1];
  const signature = args[2];

  axios.post('http://localhost:3000/verify', { message, signature })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error.response.data));
}
