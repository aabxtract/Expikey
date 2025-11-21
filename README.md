🌈 Emotion-to-Token Converter

Mint your feelings into generative on-chain art.

🧠 Overview

Emotion-to-Token Converter is a Web3 dApp that transforms human emotion into a unique generative NFT.
Users select or type an emotion, and the system converts it into:

A dynamic visual pattern

A color palette derived from the emotion

A “Mood Signature Hash”

Optional ambient sound tone

A mintable on-chain NFT

This dApp blends art, psychology, and cryptography—allowing people to immortalize their emotions on the blockchain.

✨ Core Features
🎨 1. Emotion Capture

Users can:

Choose from preset emotions (happy, grateful, overwhelmed, calm, etc.)

Or type a custom emotion

View a live generative preview based on their input

Each emotion becomes a distinct art piece shaped by:

Emotion hash

Color mapping

Pattern type

Time of creation

🪙 2. Mint Emotional Tokens

Once satisfied with the generated art, users can mint their unique emotional signature as an NFT called EmotiKey.

Metadata includes:

Emotion

Mood Signature Hash

Color palette

Pattern attributes

Creation timestamp

🖼️ 3. Emotional Gallery

A grid-style display of all minted emotional tokens showing:

Animated art

Emotion label

Mint date

Wallet address

Color swatch

The gallery serves as a collective archive of human emotions.

🔥 4. Emotional Streak Tracker

Tracks how consistently a user logs their emotions.

Shows current streak

Shows highest streak

Resets if more than 24 hours pass without submission

🗺️ 5. Global Emotion Map

A real-time visualization where:

Each bubble represents an emotion

Color = emotion tone

Size = number of users who minted that emotion today

It becomes a living emotional heatmap of the community.

🧬 How It Works
🔐 Emotion → Hash

Every emotion string is hashed using keccak256.
This hash determines:

Color palette

Pattern style

Animation behavior

🎨 Generative Art Engine

Art is generated using:

Canvas / WebGL / SVG

Noise-based patterns

Gradient flows

Particle rings

Blob morphing

Each emotional token is visually different.

🪙 Minting

When minted:

Emotion + metadata → IPFS (or mock)

NFT minted via smart contract

Event emitted: EmotionMinted

🧠 Streak Logic

If user mints an emotion within 24 hours of last: streak++

Else: streak = 1

🛠 Tech Stack
Frontend

Next.js / Vite

Tailwind CSS

Framer Motion for animations

Wagmi + Viem for wallet connection

Smart Contract

Solidity

ERC721 NFT (EmotiKey)

Supports metadata storage

Optional Integrations

IPFS (Pinata / Web3.Storage)

Lottie for animations

Sound generation engine

📁 Project Structure
/src
  /components
    EmotionInput
    EmotionArtPreview
    MintButton
    GalleryGrid
    EmotionStreakCard
    GlobalEmotionMap
  /contracts
    EmotiKey.sol
  /hooks
    useEmotionGenerator.js
  /pages
    index.js
    mint.js
    gallery.js
    map.js
    profile.js

🚀 Getting Started
Install
npm install

Run Dev Server
npm run dev

Compile Contract
npx hardhat compile

Deploy Contract
npx hardhat run scripts/deploy.js --network testnet

📌 Future Upgrades

Add emotional soundscapes

Share emotions to social media directly

Build emotional journals with unlocked achievements

Add rare “legendary emotional states”

Integrate AI emotion suggestions

Enable trading of emotional NFTs

🫶 Vision

The goal is to create a safe, artistic, and expressive way for people to record their feelings—not in journals or apps—but on-chain, forever.

Emotion becomes art.
Art becomes memory.
Memory becomes immutable.