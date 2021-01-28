import { ethers } from "ethers";
import { KmsProvider } from "aws-kms-provider";

async function main(): Promise<void> {
  const region = "us-east-1";
  const keyId = "e9005048-475f-4767-9f2d-0d1fb0c89caf";
  const endpoint =
    "https://ropsten.infura.io/v3/bd35010d62134981a9e82dff4708728b";
  const to = "0xa802b07c1B5dd0e0E57911c3fB7911a7BCff6622";

  const provider = new ethers.providers.Web3Provider(
    new KmsProvider(endpoint, { region, keyIds: [keyId] })
  );
  const signer = provider.getSigner();
  console.log(await signer.getAddress());

  const tx = await signer.sendTransaction({
    to,
    value: ethers.utils.parseEther("0.00001"),
  });

  console.log(tx);
  console.log(await tx.wait());
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
