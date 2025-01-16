// import wallet from "../../../../devnet.json"
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
// import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
// import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
// import fs from "fs";
// import path from "path";


// // // Create a devnet connection
// const umi = createUmi('https://api.devnet.solana.com');
// umi = umi.use(signerIdentity(signer));


// let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
// const signer = createSignerFromKeypair(umi, keypair);



// // umi.use(irysUploader({ address: "https://devnet.irys.xyz/" }));
// umi.use(irysUploader());
// umi.use(signerIdentity(signer));

// (async () => {
//     try {
//         //1. Load image
//         const imageFile = fs.readFileSync(
//             path.join(__dirname, '../../generug.png')
//         )

//         //2. Convert image to generic file.
//         const umiImageFile = createGenericFile(imageFile, "generug.png",
//             { contentType: "image/png" }
//         )
//         // 3. Upload image

//         // const image = "../../generug.png",

//         const [myUri] = await umi.uploader.upload([umiImageFile]).catch((err) => { throw new Error(err) })
//         console.log("Your image URI: ", myUri);
//     }
//     catch (error) {
//         console.log("Oops.. Something went wrong", error);
//     }
// })();



import wallet from "../../../../devnet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const imageFile = await readFile("../generug.png");
        //2. Convert image to generic file.
        const image = createGenericFile(imageFile, "generug.png", { contentType: "image/png" });
        //3. Upload image

        // const image = ???

        const [myUri] = await umi.uploader.upload([image]).catch((err) => { throw new Error(err) });
        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

