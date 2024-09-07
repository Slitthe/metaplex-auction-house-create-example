import { keypairIdentity, Metaplex } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import {decode} from "bs58";

let authoritySecretKey = decode(
    'SECRET_KEY_EXPORTED_FROM_PHANTOM_GOES_IN_HERE',
);
const RPC_URL = 'https://api.devnet.solana.com/';

const SOLANA_CONNECTION = new Connection(RPC_URL);

const metaplex = Metaplex.make(SOLANA_CONNECTION).use(
    keypairIdentity(Keypair.fromSecretKey(authoritySecretKey)),
);

async function main() {
    const auctionHouseSettings = await metaplex.auctionHouse().create({
        // feeWithdrawalDestination: new PublicKey("feeWithdrawalDestination public key"),
        // treasuryWithdrawalDestinationOwner: new PublicKey("treasuryWithdrawalDestinationOwner public key"),
        sellerFeeBasisPoints: 2000, // auction house cut %
        // authority --> authority automatically set to be the authoritySecretKey
        canChangeSalePrice: true,
        requiresSignOff: true
        // requiresSignOff: true,
    });

    console.log(`
        Auction house details:
        
        ${JSON.stringify(auctionHouseSettings)}
    `);

}

main()