JS Code Challenge
This project demonstrates a simple client-server application built using Node.js. The client generates an asymmetric key pair, stores the public key on the server, and signs messages with the private key. The server verifies the signed messages using the stored public key.

Features
Client:

Generate an asymmetric key pair (RSA).
Submit the public key to the server with password authentication.
Sign a message with the private key.
Verify a signed message with the server.
Server:

Accept a public key submission via an HTTP request with password authentication.
Verify the authenticity of a signed message.
Installation

1. Clone the Repository
   git clone https://github.com/Abid-baig/Abid-2022
   cd Abid-2022
2. Install Dependencies
   Make sure you have Node.js installed. Then, install the required packages:

npm install
Usage

1. Start the Server
   To start the server, run:

node server.js <your-password>
Replace <your-password> with the password you want to use for authentication.

2. Client Commands
   Generate a Key Pair
   To generate an RSA key pair:

node client.js generate-keys
This will create public_key.pem and private_key.pem files in the project directory.

Submit the Public Key to the Server
To submit the public key to the server:

node client.js submit-key <your-password>
Replace <your-password> with the password you used to start the server.

Sign a Message
To sign a message:

node client.js sign "your message"
This will output the message and the corresponding signature.

Verify a Signed Message
To verify a signed message with the server:

node client.js verify "your message" "your-signature"
Replace "your message" with the message you want to verify, and "your-signature" with the signature outputted from the sign command.

Example Workflow
Start the server:

node server.js mypassword
Generate keys:

node client.js generate-keys
Submit the public key:

node client.js submit-key mypassword
Sign a message:

node client.js sign "Hello, World!"
Copy the signature output from the sign command.

Verify the signed message:

node client.js verify "Hello, World!" "<copied-signature>"
Notes
Ensure that the server is running before executing client commands.
The signature must be copied exactly as it appears after signing to ensure correct verification.
Dependencies
express
bcrypt
body-parser
axios
crypto (Node.js built-in module)
License
This project is licensed under the MIT License. See the LICENSE file for details.
