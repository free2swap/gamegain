import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();
// fs
import fs from "fs";

(async () => {
  const packAddress = "0x8c8390Fb2aB527CC23938eF4C306AD17A0Da49D8";
  const tokenAddress = "0xb28c1631BdFA6492cA02eBCd8f63F4eE8BC4B7a5";
  const editionAddress = "0xb28c1631BdFA6492cA02eBCd8f63F4eE8BC4B7a5";

  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const pack = sdk.getPack(packAddress);

  // Set approval for the pack contract to act upon token and edition contracts
  const token = sdk.getToken(tokenAddress);
  await token.setAllowance(packAddress, 100);

  console.log("Set approval for token");

  const edition = sdk.getEdition(editionAddress);
  await edition.setApprovalForAll(packAddress, true);

  console.log("Set Approval for edition");

  // Read in the chest.png as a File using fs
  const chestFile = fs.readFileSync("./scripts/chest.png");

  // Upload the Chest to IPFS
  const ipfsHash = await sdk.storage.upload(chestFile);
  const url = `${ipfsHash.baseUri}`;

  console.log("Uploaded chest asset to IPFS");

  console.log("Creating packs now...");

  const packNfts = await pack.create({
    packMetadata: {
      name: "Treasure Chest",
      description:
        "A chest containing tools and treasure to help you on your voyages.",
      image: url,
    },

    // Gold coin ERC-20 Tokens
    erc20Rewards: [
      {
        contractAddress: tokenAddress,
        quantityPerReward: 5,
        quantity: 100,
        totalRewards: 20,
      },
    ],

    erc1155Rewards: [
      // Compass
      {
        contractAddress: editionAddress,
        tokenId: 0,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Anchor
      {
        contractAddress: editionAddress,
        tokenId: 1,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Sword
      {
        contractAddress: editionAddress,
        tokenId: 2,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Captain's Hat
      {
        contractAddress: editionAddress,
        tokenId: 3,
        quantityPerReward: 1,
        totalRewards: 65,
      },
      // Cannon
      {
        contractAddress: editionAddress,
        tokenId: 4,
        quantityPerReward: 1,
        totalRewards: 50,
      },
      // Hook
      {
        contractAddress: editionAddress,
        tokenId: 5,
        quantityPerReward: 1,
        totalRewards: 50,
      },
      // Rum
      {
        contractAddress: editionAddress,
        tokenId: 6,
        quantityPerReward: 1,
        totalRewards: 10,
      },
      // Gold Key
      {
        contractAddress: editionAddress,
        tokenId: 7,
        quantityPerReward: 1,
        totalRewards: 5,
      },
    ],
    rewardsPerPack: 5,
  });

  console.log(`====== Success: Pack NFTs =====`);

  console.log(packNfts);
})();
