
🔐 CryptoVault – A Web3-Based Secure Wallet

"Mere paas khud ka Web3 wallet hai."
– Hum bhi bana lenge. 😎

CryptoVault is a browser-based, fully client-side Web3 wallet built using React + Tailwind CSS, designed for maximum privacy, security, and control.
No centralized server, no cloud storage, no compromises — your wallet lives only on your device.

🚀 Features

🪙 Multi-Chain Support — Manage wallets for Solana, Ethereum, Polygon, and Bitcoin.

🔑 Secure Seed Phrase Generation — Your seed never leaves your device.

🧠 HD Wallets — Hierarchical deterministic wallets with bip32, bip39, and hdnode.

💾 Local Secure Storage — Stored in browser databases (not localStorage) for protection against XSS attacks.

🎨 Modern UI — Built with Tailwind CSS and Framer Motion for smooth animations.

⚡ Pure Frontend Architecture — No backend, no API dependencies.

🧩 Tech Stack

React 19 + Vite

Tailwind CSS

Framer Motion

Web3 Libraries

ethers

bitcoinjs-lib

@solana/web3.js

bip32, bip39

ed25519-hd-key

tweetnacl

🧠 Installation & Run Locally

# Clone the repository
git clone https://github.com/Kaifkhan001/Web3-Wallet.git

# Move into the project folder
cd crypto-vault

# Install dependencies
npm install

# Start the development server
npm run dev
The app will start running at:
👉 https://localhost:5173

🌐 Live Demo

🔗 https://crypto.kaifkhan.site/

🧱 Folder Structure

crypto-vault/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── assets/
│   └── App.jsx
│
├── public/
│   └── favicon.svg
│
└── package.json


📜 License

This project is open-source and free to use.


Built with ❤️ by Kaif Khan.