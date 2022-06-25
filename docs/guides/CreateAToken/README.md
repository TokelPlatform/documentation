
# How to create a token (or NFT)

In this guide, you will learn how to create a token using command line interface (CLI). This guide assumes a basic level of understanding on how to use CLI & interact with blockchain RPCs. For example, we assume that you have already setup and are running the `TKLTEST` blockchain, at a minimum. If you have not gotten that far, we would suggest [reading this guide](https://docs.tokel.io/guides/LaunchTKLTESTchain/#what-is-tkltest) and setting up the `TKLTEST` chain to practice with.

## Suggested reading
In order to create a token, you will need to familiarise yourself with the [tokenv2createtokel](https://docs.tokel.io/api/tokens/#tokenv2createtokel) and [tokenv2infotokel](https://docs.tokel.io/api/tokens/#tokenv2infotokel) RPCs. Please read these beforehand and refer to them as you require.

### Part 1: Decide on your token details
You must decide upon the following details. The first few are required, the later few are optional. 

Required:
- Name
- Supply
- Description

Optional (Tokel Standard data):
- URL
- ID
- Royalty
- Arbitrary Data

If you aren't familiar with what these fields represent, I'll point you to this [documentation](https://docs.tokel.io/api/tokens/#arguments-3).

### Part 2: Create your transaction
Replace the field names in the example below with your token data into the command listed below. Leave the optional string fields blank, or 0's in number fields, if you do not want to input data into those fields. Refer to the examples provided if you are having issues.

```
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "Name" Supply "Description" "{\"url\":\"https://yourURLHere.com\", \"id\":yourIDnumberhere, \"royalty\":yourRoyaltyamountHere, \"arbitrary\":\"yourArbitrarydatainHEXHere\"}"
```

#### :pushpin: Examples
NFT with Tokel Standard data
```
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "MyFirstNFT" 0.00000001 "This is the description field of an NFT." "{\"url\":\"https://myNFTrocks.io\", \"id\":134, \"royalty\":10, \"arbitrary\":\"\"}"
```

NFT with Tokel Standard data with no specific ID, Royalty & arbitrary data.
```
./komodo-cli -ac_name=TKLTEST6 tokenv2createtokel "My First NFT" 0.00000001 "This is the description field of an NFT." "{\"url\":\"https://myNFTrocks.io\", \"id\":0, \"royalty\":0, \"arbitrary\":\"\"}"
```

NFT without Tokel Standard data
```
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "My Second NFT" 0.00000001 "This is the description field of an NFT. This NFT does not have any optional Tokel Standard data."
```

Fixed supply token without Tokel Standard data
```
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "An Awesome Token" 1 "This token has a supply of 100 million and no Tokel Standard data."
```

Fixed supply token with Tokel Standard data
```
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "Awesome Token2" 0.000001 "This token has 1 million in supply and tokel standard data" "{\"url\":\"https://raw.githubusercontent.com/TokelPlatform/tokel_app/development/brand_package/assets/tokelx3.png\", \"id\":1, \"royalty\":500, \"arbitrary\":\"7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d\"}"
```

###  Part 3: Ensure you have set your pubkey
To interact with tokens, you must have set `-pubkey=YOURPUBKEY` on chain launch, or used the `setpubkey YOURPUBKEY` RPC to set your pubkey after the chain has started. An easy way to know whether this is the case, is if you get the error below whilst doing any `tokenv2` command.

```
error code: -1
error message:
to use CC contracts, you need to launch daemon with valid -pubkey= for an address in your wallet
```

Command Option 1 (start the chain with a pubkey set) - preferred method:
```
./komodod -ac_name=TKLTEST -ac_supply=1000000000 -ac_cbmaturity=1 -ac_reward=5000000000 -ac_decay=77700000 -ac_halving=525600 -ac_cc=1 -ac_ccenable=228,236,245,246,247 -ac_adaptivepow=2 -addnode=164.132.225.134 -pubkey=**YOURPUBKEYHERE** &
```

Command Option 2 (set pubkey after the chain is launch) - not recommended as it will need to manually set this every time the chain is launched.
```
./komodo-cli -ac_name=TKLTEST setpubkey YOURPUBKEYHERE
```

### Part 4: Create your token
For every token you create, you will need a corresponding satoshi of the TKL coin. 

1 satoshi = 1 token. 1 TKL = 100million tokens.

The number represented in the 'supply' field is the amount of TKL you are going to use/need, plus the transaction fee (0.0001 by default).

We will now submit the command to create your token using the `tokenv2createtokel`, then send the transaction using `sendrawtransaction` to be mined and officially created. Replace the below commands with your token commands and output hex.

#### :pushpin: Example
Step 1: Change to the `tokel/src` directory and submit your command.

```bash
cd ~/tokel/src
```

```bash
./komodo-cli -ac_name=TKLTEST tokenv2createtokel "NFTShowcase" 0.00000001 "This NFT creation example showcases using a single satoshi in the supply field to create 1 token. It also shows how I can add the image into the URL, and use the arbitrary data field to add additional properties to my NFT. 50% of the value of all trades conducted via assets RPCs will be sent to the creators address." "{\"url\":\"https://raw.githubusercontent.com/TokelPlatform/tokel_app/development/brand_package/assets/tokelx3.png\", \"id\":1, \"royalty\":500, \"arbitrary\":\"7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d\"}"
```

<collapse-text hidden title="Response">

The following will output in your terminal.

```json
{
  "result": "success",
  "hex": "0400008085202f89010053c31a8c74b875040db6808f95a70af35ff895b534d973332e861270815223000000004847304402206e624bc5ae94124c817db37592d49e6094d7d265c94fb497167489246fe4023f02206b38f5211da0f958bf3834e6684e5b6ee5cc0450665ff007d07ad783d547b21001ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc01000000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75df92f50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd25026a4d2102f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465453686f7763617365fd3d0154686973204e4654206372656174696f6e206578616d706c652073686f776361736573207573696e6720612073696e676c65207361746f73686920696e2074686520737570706c79206669656c6420746f20637265617465203120746f6b656e2e20497420616c736f2073686f777320686f7720492063616e206164642074686520696d61676520696e746f207468652055524c2c20616e642075736520746865206172626974726172792064617461206669656c6420746f20616464206164646974696f6e616c2070726f7065727469657320746f206d79204e46542e20353025206f66207468652076616c7565206f6620616c6c2074726164657320636f6e647563746564207669612061737365747320525043732077696c6c2062652073656e7420746f207468652063726561746f727320616464726573732eaff701026668747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f6b656c506c6174666f726d2f746f6b656c5f6170702f646576656c6f706d656e742f6272616e645f7061636b6167652f6173736574732f746f6b656c78332e706e67010103fdf401043d7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d00000000b83f00000000000000000000000000"
}
```

</collapse-text>

Step 2: Broadcast the raw transaction hex that was output previously, using the `sendrawtransaction` RPC

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89010053c31a8c74b875040db6808f95a70af35ff895b534d973332e861270815223000000004847304402206e624bc5ae94124c817db37592d49e6094d7d265c94fb497167489246fe4023f02206b38f5211da0f958bf3834e6684e5b6ee5cc0450665ff007d07ad783d547b21001ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc01000000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75df92f50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd25026a4d2102f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465453686f7763617365fd3d0154686973204e4654206372656174696f6e206578616d706c652073686f776361736573207573696e6720612073696e676c65207361746f73686920696e2074686520737570706c79206669656c6420746f20637265617465203120746f6b656e2e20497420616c736f2073686f777320686f7720492063616e206164642074686520696d61676520696e746f207468652055524c2c20616e642075736520746865206172626974726172792064617461206669656c6420746f20616464206164646974696f6e616c2070726f7065727469657320746f206d79204e46542e20353025206f66207468652076616c7565206f6620616c6c2074726164657320636f6e647563746564207669612061737365747320525043732077696c6c2062652073656e7420746f207468652063726561746f727320616464726573732eaff701026668747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f6b656c506c6174666f726d2f746f6b656c5f6170702f646576656c6f706d656e742f6272616e645f7061636b6167652f6173736574732f746f6b656c78332e706e67010103fdf401043d7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d00000000b83f00000000000000000000000000
```

A transaction id will output in your terminal. This is the associated `tokenid` for your newly created token.

```bash
8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e
```

Step 3 (Optional): Check your token data
You must wait until your transaction has been mined and added into a block before the data will appear here. 

Command:
```
./komodo-cli -ac_name=TKLTEST tokenv2infotokel YOURTOKENIDHERE
```

#### :pushpin: Example
```
./komodo-cli -ac_name=TKLTEST tokenv2infotokel 8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "NFTShowcase",
  "supply": 1,
  "description": "This NFT creation example showcases using a single satoshi in the supply field to create 1 token. It also shows how I can add the image into the URL, and use the arbitrary data field to add additional properties to my NFT. 50% of the value of all trades conducted via assets RPCs will be sent to the creators address.",
  "data": "f701026668747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f6b656c506c6174666f726d2f746f6b656c5f6170702f646576656c6f706d656e742f6272616e645f7061636b6167652f6173736574732f746f6b656c78332e706e67010103fdf401043d7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d",
  "dataAsJson": {
    "id": 1,
    "url": "https://raw.githubusercontent.com/TokelPlatform/tokel_app/development/brand_package/assets/tokelx3.png",
    "royalty": 500,
    "arbitrary": "7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d"
  },
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

If you see the following error, continuing waiting until your token has been mined, then try the `tokenv2infotokel` RPC again.

```
{
  "result": "error",
  "error": "the transaction is still in mempool"
}
```

### Congratulations!
You have created your very first Tokel token! The world of tokens is now at your fingertips. Continue using the TKLTEST chain to enhance your skills or move on to the real deal, the Tokel main chain, to create your token for real and maximize the features that the Tokel Platform brings you.
