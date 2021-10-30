# How to find your token address (pubkey).

This step-by-step how-to guide will show you how you can find your token address. To receive tokens & NFTs on the Tokel platform, you must give the token sender your token address, otherwise known as your pubkey. This address is different to your TKL coin address (i.e R4GNVd4zmTAlOtWrpXeb8GeGCEdkA9YZxj), as you cannot send tokens to this address.

#### Definitions
- Coin = TKL, the native blockchain currency.
- Token = A token created on the Tokel blockchain.
- NFT (non-fungible token) = A token created on the Tokel blockchain that has a supply of 1. This token is unique and is not fungible with any other token or coin.

There are no differences between NFTs or normal tokens on the Tokel platform other than the amount in existence (supply). Both have exactly the same features and usability.

Pubkey = 'Public Key' - This is the key you need to use to receive tokens on the Tokel blockchain. We call it your 'token address'

#### Examples
- Coin address = `RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5`
- Token (NFT or normal token) address = `02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26`

There are two methods to finding your pubkey. The recommended (and easiest) option is to use the Tokel decentralized application. The second is to use command line interface and run a full blockchain node (more technical).

### Recommended Option

#### Step 1:
Download the newest Tokel Dapp release from our github

![https://github.com/TokelPlatform/tokel_dapp/releases](https://github.com/TokelPlatform/tokel_dapp/releases)

#### Step 2:
Log in to your wallet using your private key

![picture](https://raw.githubusercontent.com/TokelPlatform/tokel_brand/main/Random/Login.png)

#### Step 3:
Click on the area that says 'No tokens yet'.

![picture](https://raw.githubusercontent.com/TokelPlatform/tokel_brand/main/Random/ClickHere.png)

#### Step 4:
Copy the token address listed.
![picture](https://raw.githubusercontent.com/TokelPlatform/tokel_brand/main/Random/TokenAddress.png)

#### Alternate step 4: If you have tokens already
Click on any token

#### Step 5:
Click on the 'Receive' button and it will display your token address.

This will show you your token address (pubkey). You can copy this address directly from here and give it to somebody in order to receive any token on the Tokel blockchain.

### Command-live interface option

#### Step 1:
Use this guide to setup and run the Tokel blockchain (if you haven't already).

![https://docs.tokel.io/guides/LaunchTheChain/](https://docs.tokel.io/guides/LaunchTheChain/)

#### Step 2:
Get the pubkey (token address) using `validateaddress` RPC

Command:
```
./tokel-cli validateaddress RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

Output:
```
{
  "isvalid": true,
  "address": "RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5",
  "scriptPubKey": "76a91431a8cbc716e21238079729d46cb655ae7fadc9e388ac",
  "segid": 37,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26",
  "iscompressed": true,
  "account": ""
}
```
