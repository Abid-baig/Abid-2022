const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());

let storedHashedPassword = null;
let storedPublicKey = null;

// Set password via command line argument
const password = process.argv[2];
if (!password) {
  console.error("Please provide a password as an argument.");
  process.exit(1);
}

// Hash the password for secure storage
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  storedHashedPassword = hash;
});

// Route to store the public key
app.post('/store-key', async (req, res) => {
  const { password, publicKey } = req.body;

  // Check if password matches
  const match = await bcrypt.compare(password, storedHashedPassword);
  if (!match) {
    return res.status(401).send("Unauthorized");
  }

  storedPublicKey = publicKey;
  res.send("Public key stored successfully.");
});

// Route to verify a signed message
app.post('/verify', (req, res) => {
  const { message, signature } = req.body;

  if (!storedPublicKey) {
    return res.status(400).send("No public key stored.");
  }

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(message);
  const isValid = verifier.verify(storedPublicKey, signature, 'hex');

  if (isValid) {
    res.send("Valid signature.");
  } else {
    res.send("Invalid signature.");
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
