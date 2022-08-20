import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const packAddress = await sdk.deployer.deployPack({
    name: "Treasure Chests",
    primary_sale_recipient: "0x1aeEe7da29CAcBF16ae1469f7DD727015fc58B0B",
  });

  console.log(`Pack address: ${packAddress}`);
})();
