# Tokel Tokens RPCs

## Introduction

This documentation was taken and updated from the [Komodo platform developer documentation](https://developers.komodoplatform.com/basic-docs/antara/antara-api/tokens.html).

The Tokens Module enables support for the on-chain creation of colored coins, also called tokens. The created tokens are used with another module that supports operations on tokens. For example, the [Assets Module](https://developers.komodoplatform.com/basic-docs/antara/antara-api/assets.html) provides buy/sell (tokenDEX) operations for `tokens`. Please refer to the Assets API documentation for further information on Assets.

The `tokens` module requires locking a proportional amount of Tokel (TKL) coins. Each satoshi (0.00000001) of TKL is equal to one token within the total supply. For example, if you wanted to create a token with a supply of 100 million, this would require locking 1 TKL. Once the coins are locked, they are effectively unusable, or burnt; tokens now take the place of the native coin.

## TokensV2 RPC

- `tokenv2address [pubkey]`
- `tokenv2balance tokenid [pubkey]`
- `tokenv2create name supply [description] [tokens data]`
- `tokenv2createtokel name supply [description] [tokens data]`
- `tokenv2info tokenid`
- `tokenv2infotokel tokenid`
- `tokenv2list [begin-height] [end-height]`
- `tokenv2transfer tokenid destpubkey amount`
- `tokenv2transfermany tokenid1 tokenid2 ... destpubkey amount`

## tokenv2address

**tokenv2address [pubkey]**

The `tokenv2address` method returns information about a token address according to a specific `pubkey`. If no `pubkey` is provided, the `pubkey` used to launch the daemon is used by default.

### Arguments

| Name   | Type               | Description                                                                                                          |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| pubkey | (string, optional) | the pubkey of the desired address; if no pubkey is provided, the pubkey used to launch the daemon is used by default |

### Response

| Name            | Type     | Description                                                                                                                                                                |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result          | (string) | whether the command executed successfully                                                                                                                                  |
| TokensCCaddress | (string) | taking the token contract's EVAL code as a modifier, this is the public address that corresponds to the token contract's privkey, also known as Tokens CC's global address |
| myCCaddress     | (string) | taking the token contract's EVAL code as a modifier, this is the Tokens Antara address from the pubkey of the user                                                         |
| myaddress       | (string) | the normal public address of the pubkey used to launch the chain                                                                                                           |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2address 02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "GlobalPk Tokensv2 CC Address": "RSc4RycihBEWQP2GDvSYS46MvFJsTKaNVU",
  "GlobalPk Tokensv2 CC Balance": 0.0,
  "GlobalPk Tokensv2 Normal Address": "RDVU97zvJamGmVBSUyTm7RcYZtxjriNGkj",
  "GlobalPk Tokensv2 Normal Balance": 0.0,
  "pubkey Tokensv2 CC Address": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
  "pubkey Tokensv2 CC Balance": 0.0,
  "mypk Tokensv2 CC Address": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
  "mypk Tokensv2 CC Balance": 0.0,
  "mypk Normal Address": "RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh",
  "mypk Normal Balance": 9999899.9999
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenaddressv2", "params":["02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "GlobalPk Tokensv2 CC Address": "RSc4RycihBEWQP2GDvSYS46MvFJsTKaNVU",
  "GlobalPk Tokensv2 CC Balance": 0.00000000,
  "GlobalPk Tokensv2 Normal Address": "RDVU97zvJamGmVBSUyTm7RcYZtxjriNGkj",
  "GlobalPk Tokensv2 Normal Balance": 0.00000000,
  "pubkey Tokensv2 CC Address": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
  "pubkey Tokensv2 CC Balance": 0.00000000,
  "mypk Tokensv2 CC Address": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
  "mypk Tokensv2 CC Balance": 0.00000000,
  "mypk Normal Address": "RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh",
  "mypk Normal Balance": 9999899.99990000
},
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2balance

**tokenv2balance tokenid [pubkey]**

The `tokenv2balance` method checks the token balance for the provided `pubkey`. If no `pubkey` is provided, the `pubkey` used to launch the daemon is used by default.

### Arguments

| Name    | Type     | Description                                                                                                                    |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| tokenid | (string) | the txid that identifies the token                                                                                             |
| pubkey  | (string) | the pubkey for which to examine the balance; if no pubkey is provided, the pubkey used to launch the daemon is used by default |

### Response

| Name      | Type     | Description                                                                                             |
| --------- | -------- | ------------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command executed succesfully                                                                |
| CCaddress | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user |
| tokenid   | (string) | the txid that identifies the token                                                                      |
| balance   | (number) | the balance of the address that corresponds to the pubkey                                               |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2balance a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "CCaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
  "tokenid": "a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705",
  "balance": 1
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenbalancev2", "params":["a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "CCaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
    "tokenid": "a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705",
    "balance": 1
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Check the token balance of a specific pubkey

```bash
./komodo-cli -ac_name=TKLTEST tokenv2balance 8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc 0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "CCaddress": "RUBJvgvsnWMuzWZ9BBhrXhZY8JKZQ52oUX",
  "tokenid": "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc",
  "balance": 100000000
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenbalancev2", "params":["8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc" ,"0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "CCaddress": "RUBJvgvsnWMuzWZ9BBhrXhZY8JKZQ52oUX",
    "tokenid": "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc",
    "balance": 100000000
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

<!-- ## tokenv2createtokel 

### Tokel Standard validation code: f7 (01-02-03-04)

```
'f701' - NFT data evalcode (f7) and version (01)
'01' - Code of field 'ID'
'33' - Value of field 'ID' (51) in compact size format, 65535 (example of a big value) (format is here https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer)
'02' - Code of URL field
'11' - URL length in hex (17 in decimal)
'68747470733a2f2f746f6b656c2e696f2f' - url value in hex (https://tokel.io/)
'03' - Code of Royalty % field
'64' - 100 in hex (Value is represented as integer fraction of 1000, acceptable values are from 0 (no royalty) to 999 (max royalty of 0,999))
'04' - Code of arbitrary data field
'11' - Arbitrary data length in hex (17 in decimal)
'68747470733a2f2f746f6b656c2e696f2f' - Arbitrary data value in hex (https://tokel.io/)
```

### Arbitrary data validation code: 00

```
'00' - Arbitrary data evalcode
'XXX' - Data field (any format converted to hex)
```
-->

## tokenv2createtokel

**tokenv2createtokel name supply description [token data]**

The `tokenv2createtokel` method creates a new fixed supply or non-fungible token that incorporates the Tokel Standard token data format.

For every token created, you are required to spend one satoshi (0.00000001) of the Tokel coin (TKL). For example, 1 TKL creates a maximum 100000000 tokens. As each TKL satoshi is used to create a coloured coin, once the TKL has been spent to create the token, it is effectively burnt and no longer in the circulating supply of TKL. This method is used to create all types (NFT & Fixed supply) of tokens on the Tokel blockchain. The data you input into the token on creation is non editable. Once it is created, you cannot change it, so be dilligent and ensure you haven't made any errors! If you would like to write external data to your token, consider using the OraclesCC methods.

The token data field is optional and is broken down into a URL (we suggest using IPFS for storing images/audio/video/other), ID (used to identify sets of NFTs), a royalty amount (x/1000), and an arbitrary data field that is input as hex.

For creators/developers that require more flexibility (or do not want to follow the Tokel Standard) for the data format they input onto the token, you can use the `tokenv2create` RPC. Data from this RPC may not show within the Tokel Application.

#### Non-Fungible Tokens

To create a non-fungible token, simply set the `supply` field of the RPC to `0.00000001`. This will use 1 satoshi of TKL to create a single token. As the name suggests, non-fungible tokens are not fungible with anything else. As each NFT is individual and unique, it should only ever have a supply of 1. NFT's are perfect to signify the ownership of digital or physical assets.

If you would like to divide the ownership of a single asset into many allocations, you should set the supply to however many allocations you want. These coins are not considered NFT's as they are then all fungible with one another. 

#### Fixed Supply Tokens

All tokens created on Tokel are of a fixed supply, meaning that nobody can create additional supply of any specific token on chain, once the token has been created. Although this is the case, users can burn tokens. Creators/projects can incentivise users burning tokens to permanently reduce the supply of their token. 

#### Fractional Tokens

In order to create a token that can be divided and transferred in fractional amounts, it must be handled on the application side of development.

For example, to create a token that is divisible to one decimal place, have your application consider 10 tokens as a single unit. In this case, sending one token is the equivalent of sending one decimal point of the actual token.

### Arguments

The method returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

`sendrawtransaction` then returns a `txid`, which is your `tokenid`.

| Name        | Type     | Description                                                                                                                                                          |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | (string) | the name of the token (max length, 32)                                                                                                                                                |
| supply      | (number) | the amount of TKL coins used to create the tokens, NOT the amount/supply of tokens you want in existence; 1 satoshi creates 1 token. 1 TKL creates 100000000 tokens. |
| description | (string) | the description of the token (max length, 4096)                                                                                                                                         |
| token data    | (json, optional)    | Additional token data using the Tokel Standard data format                                                                                                                        |

### Response

| Name   | Type     | Description                                                                                          |
| ------ | -------- | ---------------------------------------------------------------------------------------------------- |
| result | (string) | whether the command succeeded                                                                        |
| hex    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### Tokel Standard data format

Tokel standard data allows creators to add predefined properties to their token, whilst giving creators flexibility through the arbitrary data field. All fields are optional, but the format must be followed when creating your token. 

URL: The URL field can be used to show users where the digital asset is stored. We recommend using IPFS (The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system.) for file storing.

ID: The ID field allows for creators to uniquely identify their tokens through allocating them a specific number, and can be used however the creator wants. An example of how a creator could use the ID fields is if they wanted to create a set of 10 NFT's in a specific collection, they would simply set the same ID number for all of those NFT's, and not use it for any other creations. With this logic, a creator may set the ID of 1 for their first collection of NFT's, then set 2 for their next collection. Another use may be to identify different ranks of NFT's. Say your game created NFT's with levels associated, the ID field could be used to identify the level of the NFT. I.E. An ID of 1 may represent a level 1 NFT, an ID of 10 may represent a level 10 NFT, so on and so fourth.


Royalty: The royalty field allows the creator to take royalties from future sales of their token. The number in this field is x/1000 of the value of the sale. Say the royalty was 500 (500/1000), then for each sale of the token, using assetsCC RPCs, 50% of the value would be automatically transferred to the creators address. If the royalty value was 10 (10/1000), 1% of every sale would be transferred to the creators address. This feature gives the creator the ability to generate revenue from future sales of their token. This can significantly disrupt and help creators innovate the way they generate revenue from their creations, as their revenue potential is not limited to the original sale value. For example, a project could use tokens as a key to unlock access to their educational courseware. A person would buy the token from the project, then be able to onsell it once they have completed the course. The project would reap the benefits of the original sale, but also generate revenue from the onselling of the tokens in the future. The user would also benefit as they would be able to onsell the course key (token) once they have finished the course and no longer need it. There are endless possibilties of how to change incentive structures and generate revenue with this on-cahin feature.

Arbitrary: This field gives creators the flexibility of adding extra properties, or application specific data to their token. The arbitrary data field is kept as hex on chain, so once the creator has the required data format, they will need to convert it to hex, and input it into this field. An example of a creator using this field to add extra properties to their token is by adding a json that holds the extra data. See the "NFT Creation Example" for an example where we store the properties of size, color, weapon and number as a json, converted to hex, within the arbitrary data field.

See below for an example of the Tokel Standard data format.

<collapse-text hidden title="Response">

```json
"{"url":"X", "id":X, "royalty":X, "arbitrary":"X"}"
```

</collapse-text>

#### :pushpin: Examples

#### NFT Creation Example

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2createtokel NFTShowcase 0.00000001 "This NFT creation example showcases using a single satoshi in the supply field to create 1 token. It also shows how I can add the image into the URL, and use the arbitrary data field to add additional properties to my NFT. 50% of the value of all trades conducted via assets RPCs will be sent to the creators address." "{\"url\":\"https://raw.githubusercontent.com/TokelPlatform/tokel_app/development/brand_package/assets/tokelx3.png\", \"id\":1, \"royalty\":500, \"arbitrary\":\"7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d\"}"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f89010053c31a8c74b875040db6808f95a70af35ff895b534d973332e861270815223000000004847304402206e624bc5ae94124c817db37592d49e6094d7d265c94fb497167489246fe4023f02206b38f5211da0f958bf3834e6684e5b6ee5cc0450665ff007d07ad783d547b21001ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc01000000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75df92f50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd25026a4d2102f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465453686f7763617365fd3d0154686973204e4654206372656174696f6e206578616d706c652073686f776361736573207573696e6720612073696e676c65207361746f73686920696e2074686520737570706c79206669656c6420746f20637265617465203120746f6b656e2e20497420616c736f2073686f777320686f7720492063616e206164642074686520696d61676520696e746f207468652055524c2c20616e642075736520746865206172626974726172792064617461206669656c6420746f20616464206164646974696f6e616c2070726f7065727469657320746f206d79204e46542e20353025206f66207468652076616c7565206f6620616c6c2074726164657320636f6e647563746564207669612061737365747320525043732077696c6c2062652073656e7420746f207468652063726561746f727320616464726573732eaff701026668747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f6b656c506c6174666f726d2f746f6b656c5f6170702f646576656c6f706d656e742f6272616e645f7061636b6167652f6173736574732f746f6b656c78332e706e67010103fdf401043d7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d00000000b83f00000000000000000000000000"
}
```

</collapse-text>

Step 2: Broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89010053c31a8c74b875040db6808f95a70af35ff895b534d973332e861270815223000000004847304402206e624bc5ae94124c817db37592d49e6094d7d265c94fb497167489246fe4023f02206b38f5211da0f958bf3834e6684e5b6ee5cc0450665ff007d07ad783d547b21001ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc01000000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75df92f50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd25026a4d2102f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465453686f7763617365fd3d0154686973204e4654206372656174696f6e206578616d706c652073686f776361736573207573696e6720612073696e676c65207361746f73686920696e2074686520737570706c79206669656c6420746f20637265617465203120746f6b656e2e20497420616c736f2073686f777320686f7720492063616e206164642074686520696d61676520696e746f207468652055524c2c20616e642075736520746865206172626974726172792064617461206669656c6420746f20616464206164646974696f6e616c2070726f7065727469657320746f206d79204e46542e20353025206f66207468652076616c7565206f6620616c6c2074726164657320636f6e647563746564207669612061737365747320525043732077696c6c2062652073656e7420746f207468652063726561746f727320616464726573732eaff701026668747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f6b656c506c6174666f726d2f746f6b656c5f6170702f646576656c6f706d656e742f6272616e645f7061636b6167652f6173736574732f746f6b656c78332e706e67010103fdf401043d7b2273697a65223a203130302c22636f6c6f72223a2022676f6c64222c22776561706f6e223a2022776f726473222c226e756d626572223a203132337d00000000b83f00000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e
```

</collapse-text>

Step 3 (Optional): Check your NFT data

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

Step 4 (Optional): Parse the HEX code from the arbitrary data field (in your application or using something like this http://www.unit-conversion.info/texttools/hexadecimal/) to see the further NFT properties

<collapse-text hidden title="Response">

```
{"size": 100,"color": "gold","weapon": "words","number": 123}
```

</collapse-text>

#### Fixed Supply Token Creation Example

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2createtokel FixedSUPPLY 0.00001 "This token showcases a token that has a set supply of 1000 tokens. Each token is fungible with one another, meaning they hold exactly the same value and can be traded 1:1. This token also has a royalty amount of 1%." "{\"url\":\"https://tokel.io/\", \"id\":2, \"royalty\":10, \"arbitrary\":\"\"}"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f89010055ad600b446e61ddf411cdf33a77062b9759a9134620ede112464b7ee2fb0700000000484730440220429764402a4915e0c80d2fbefd8a9f81ac476498919f229aeafe82b4ee28676802201bfa9517a995b68a746b2c8a527e1dabb2779cb620f118aa7f9874be8ea9c99501ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cce8030000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75f88ef50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd29016a4d2501f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4669786564535550504c59d75468697320746f6b656e2073686f776361736573206120746f6b656e20746861742068617320612073657420737570706c79206f66203130303020746f6b656e732e204561636820746f6b656e2069732066756e6769626c652077697468206f6e6520616e6f746865722c206d65616e696e67207468657920686f6c642065786163746c79207468652073616d652076616c756520616e642063616e2062652074726164656420313a312e205468697320746f6b656e20616c736f20686173206120726f79616c747920616d6f756e74206f662031252e1bf701021168747470733a2f2f746f6b656c2e696f2f0102030a040000000000c13f00000000000000000000000000"
}
```

</collapse-text>

Step 2: Broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89010055ad600b446e61ddf411cdf33a77062b9759a9134620ede112464b7ee2fb0700000000484730440220429764402a4915e0c80d2fbefd8a9f81ac476498919f229aeafe82b4ee28676802201bfa9517a995b68a746b2c8a527e1dabb2779cb620f118aa7f9874be8ea9c99501ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cce8030000000000006e434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc270402f701012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee75f88ef50500000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000fd29016a4d2501f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4669786564535550504c59d75468697320746f6b656e2073686f776361736573206120746f6b656e20746861742068617320612073657420737570706c79206f66203130303020746f6b656e732e204561636820746f6b656e2069732066756e6769626c652077697468206f6e6520616e6f746865722c206d65616e696e67207468657920686f6c642065786163746c79207468652073616d652076616c756520616e642063616e2062652074726164656420313a312e205468697320746f6b656e20616c736f20686173206120726f79616c747920616d6f756e74206f662031252e1bf701021168747470733a2f2f746f6b656c2e696f2f0102030a040000000000c13f00000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
5da2731e5b1b21a0d446fb7b64203e5f57134b662bda9d30ab9ac54abf2cc37b
```

</collapse-text>

Step 3 (Optional): Check your token data

```bash
./komodo-cli -ac_name=TKLTEST5 tokenv2infotokel 5da2731e5b1b21a0d446fb7b64203e5f57134b662bda9d30ab9ac54abf2cc37b
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "5da2731e5b1b21a0d446fb7b64203e5f57134b662bda9d30ab9ac54abf2cc37b",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "FixedSUPPLY",
  "supply": 1000,
  "description": "This token showcases a token that has a set supply of 1000 tokens. Each token is fungible with one another, meaning they hold exactly the same value and can be traded 1:1. This token also has a royalty amount of 1%.",
  "data": "f701021168747470733a2f2f746f6b656c2e696f2f0102030a0400",
  "dataAsJson": {
    "id": 2,
    "url": "https://tokel.io/",
    "royalty": 10,
    "arbitrary": ""
  },
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

## tokenv2infotokel

**tokenv2infotokel tokenid**

The `tokeninfotokel` method reveals information about any token and outputs the `data` hex code as an easy to read json. Token data must follow the Tokel Standard for this RPC to output the data as json. If your token does not follow the Tokel Standard, use the `tokenv2info` RPC to have your data output as hex only. 

### Arguments

| Name    | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| tokenid | (string) | the unique txid that identifies the token |

### Response

| Name          | Type              | Description                                                                  |
| ------------- | ----------------- | ---------------------------------------------------------------------------- |
| result        | (string)          | whether the command executed successfully                                    |
| tokenid       | (string)          | the identifying txid for the token id                                        |
| owner         | (string)          | the identifying pubkey of the token creator                                  |
| name          | (string)          | the name of the token                                                        |
| supply        | (number)          | the total supply of the token                                                |
| description   | (string)          | the token description provided by the creator at token creation              |
| data          | (string,optional) | the data related to the token, in hex                                        |
| dataAsJson    | (string,optional) | the hex data output converted to a json                                      |
| id            | (number,optional) | the id of the token                                                          |
| url           | (string,optional) | the url associated with the token                                            |
| royalty       | (number,optional) | the royalty amount (x/1000)                                                  |
| arbitrary     | (string,optional) | the arbitrary data of the token as hex                                       |
| version       | (number)          | indicates the opreturn token data structure version                          |
| IsMixed       | (boolean)         | indicates whether the token is using cryptocondition v2                      |

#### :pushpin: Examples

#### Token with data example - using `tokenv2infotokel`

Note the Tokel Standard data output in the dataAsJson field.

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2info 8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e
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

#### Token with data example - using `tokenv2info`

Note the absence of the dataAsJson field for the same token, but the different RPC. You will need to manually decode the hex format output if you do not use the `tokenv2infotokel` RPC.

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2info 8d091fa784c304ba1974057f958253e4cd3c36847853645efeb201db65926f5e
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
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

#### No data example

Note the absence of any data output.

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2info 3a027eff750bb69d918390f592005b36a0dbd368166ee28b46663bd84e88b0f8
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "3a027eff750bb69d918390f592005b36a0dbd368166ee28b46663bd84e88b0f8",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "nodatatest",
  "supply": 100000000,
  "description": "This token does not have any data",
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>


</collapse-text>

## tokenv2list

**tokenv2list [begin-height][end-height]**

The `tokenv2list` method lists all available tokens on Tokel. Enter an optional begin and end block height number to search for tokens created between specific block numbers.

### Arguments

| Name         | Type               | Description                          |
| ------------ | ------------------ | ------------------------------------ |
| begin-height | (number, optional) | Block number to start searching from |
| end-height   | (number, optional) | Block number to end searching from   |

### Response

| Name    | Type               | Description                           |
| ------- | ------------------ | ------------------------------------- |
| tokenid | (array of strings) | the identifying txid for the token id |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2list 2000 2200
```

<collapse-text hidden title="Response">

```bash
[
  "a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705",
  "0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242",
  "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc"
]
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2list", "params":[]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": [
    "a283693b37b3bd94edd91ba31345310a9b47946c626cb14189d67931a0cde705",
    "0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242",
    "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc"
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2transfer

**tokenv2transfer tokenid destpubkey amount**

The `tokenv2transfer` method transfers tokens from one Antara Address to another.

It is similar to the [sendmany](../komodo-api/wallet.html#sendmany) method used to send coins on the parent chain.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

::: tip
The source `txid/vout` needs to be specified as it is critical to match outputs with inputs.
:::

::: tip
A token may be burned by using `tokentransfer` to send to a burn address.
:::

### Arguments

| Name       | Type               | Description                                |
| ---------- | ------------------ | ------------------------------------------ |
| tokenid    | (string, optional) | the identifying txid for the token id      |
| destpubkey | (string)           | the pubkey where the tokens should be sent |
| amount     | (number)           | the number of tokens to send               |

### Response

| Name   | Type     | Description                                                                                          |
| ------ | -------- | ---------------------------------------------------------------------------------------------------- |
| result | (string) | whether the command succeeded                                                                        |
| hex    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the rawtransaction

```bash
./komodo-cli -ac_name=TKLTEST tokenv2transfer 8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc 0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4 100
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f8902cc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d020000004847304402200ac4ec79ed4c60307d4eb66bece4dca4e347ce8f016100ce83ed5113cc86211902203dda7eb751f7016e600a62c102fa4eaeb2c83c1336667657ab139e8d8e75924301ffffffffcc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d3a7e35af97ab89719ffd8fd529ab5eb077be6906ee20957981f42b34c6d9e3c0277f560742064011e128bdcb0037b303a11c984236ea27fed6789387abbba31a100af038001f5a10001ffffffff046400000000000000403e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc9ce0f50500000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc01ec44a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000256a23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc000000001e0400000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2transfer", "params":["8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc" ,"0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4" ,"100"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "0400008085202f8902cc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d020000004847304402200ac4ec79ed4c60307d4eb66bece4dca4e347ce8f016100ce83ed5113cc86211902203dda7eb751f7016e600a62c102fa4eaeb2c83c1336667657ab139e8d8e75924301ffffffffcc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d3a7e35af97ab89719ffd8fd529ab5eb077be6906ee20957981f42b34c6d9e3c0277f560742064011e128bdcb0037b303a11c984236ea27fed6789387abbba31a100af038001f5a10001ffffffff046400000000000000403e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc9ce0f50500000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc01ec44a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000256a23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc000000001e0400000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f8902cc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d020000004847304402200ac4ec79ed4c60307d4eb66bece4dca4e347ce8f016100ce83ed5113cc86211902203dda7eb751f7016e600a62c102fa4eaeb2c83c1336667657ab139e8d8e75924301ffffffffcc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d3a7e35af97ab89719ffd8fd529ab5eb077be6906ee20957981f42b34c6d9e3c0277f560742064011e128bdcb0037b303a11c984236ea27fed6789387abbba31a100af038001f5a10001ffffffff046400000000000000403e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc9ce0f50500000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc01ec44a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000256a23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc000000001e0400000000000000000000000000
```

**_update_**

<collapse-text hidden title="Response">

```bash
ProcessAssets
AssetValidate (t)
vin1 1000000000, vout0 100, vout1 999999900, transfer validated 10.00000000 -> 10.00000000
AssetValidate.(t) passed
32924a5a9343041fea31b167553b13237ecf6c5fd398ea0e87346e82c06b0be5
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f8902cc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d020000004847304402200ac4ec79ed4c60307d4eb66bece4dca4e347ce8f016100ce83ed5113cc86211902203dda7eb751f7016e600a62c102fa4eaeb2c83c1336667657ab139e8d8e75924301ffffffffcc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d3a7e35af97ab89719ffd8fd529ab5eb077be6906ee20957981f42b34c6d9e3c0277f560742064011e128bdcb0037b303a11c984236ea27fed6789387abbba31a100af038001f5a10001ffffffff046400000000000000403e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc9ce0f50500000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc01ec44a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000256a23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc000000001e0400000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "32924a5a9343041fea31b167553b13237ecf6c5fd398ea0e87346e82c06b0be5",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 3: Decode the raw transaction and check against the following if the data is sane

```bash
./komodo-cli -ac_name=TKLTEST decoderawtransaction 0400008085202f8902cc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d020000004847304402200ac4ec79ed4c60307d4eb66bece4dca4e347ce8f016100ce83ed5113cc86211902203dda7eb751f7016e600a62c102fa4eaeb2c83c1336667657ab139e8d8e75924301ffffffffcc9c0dd602fe8f947a7d48d1033e2c555447567cec8bffc0d81c9719de22738d010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d3a7e35af97ab89719ffd8fd529ab5eb077be6906ee20957981f42b34c6d9e3c0277f560742064011e128bdcb0037b303a11c984236ea27fed6789387abbba31a100af038001f5a10001ffffffff046400000000000000403e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc9ce0f50500000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc01ec44a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000256a23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc000000001e0400000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "88ac2d4d27654e9d8ac195d5ab482ee9895303902eaacfbb687b1e736bb06fb4",
  "size": 524,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "a18dbc96d42b4eed5115978e074a4941d0acfa11dad8526b53dfcee34ce4613b",
      "vout": 0,
      "scriptSig": {
        "asm": "30440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f601 03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc",
        "hex": "4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc"
      },
      "sequence": 4294967295
    },
    {
      "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001",
        "hex": "4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.005,
      "valueSat": 500000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RLB1YWh4N115NFh8tbArCBGaTQ3F43Yg1F"]
      }
    },
    {
      "value": 9.995,
      "valueSat": 999500000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 744335.99945,
      "valueSat": 74433599945000,
      "n": 2,
      "scriptPubKey": {
        "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
        "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
        "hex": "6a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"decoderawtransaction", "params":["01000000023b61e44ce3cedf536b52d8da11faacd041494a078e971551ed4e2bd496bc8da1000000006a4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff66cc65f38d7e878d312386777c4f049f738b8894353c30108f7fe4ca515489e4000000007b4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001ffffffff0420a1070000000000302ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cce028933b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc28b9486cb2430000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc6600000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "txid": "88ac2d4d27654e9d8ac195d5ab482ee9895303902eaacfbb687b1e736bb06fb4",
    "overwintered": false,
    "version": 1,
    "locktime": 0,
    "vin": [
      {
        "txid": "a18dbc96d42b4eed5115978e074a4941d0acfa11dad8526b53dfcee34ce4613b",
        "vout": 0,
        "scriptSig": {
          "asm": "30440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6[ALL] 03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc",
          "hex": "4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc"
        },
        "sequence": 4294967295
      },
      {
        "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
        "vout": 0,
        "scriptSig": {
          "asm": "a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001",
          "hex": "4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001"
        },
        "sequence": 4294967295
      }
    ],
    "vout": [
      {
        "value": 0.005,
        "valueZat": 500000,
        "n": 0,
        "scriptPubKey": {
          "asm": "a22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
          "hex": "2ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cc",
          "reqSigs": 1,
          "type": "cryptocondition",
          "addresses": ["RLB1YWh4N115NFh8tbArCBGaTQ3F43Yg1F"]
        }
      },
      {
        "value": 9.995,
        "valueZat": 999500000,
        "n": 1,
        "scriptPubKey": {
          "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
          "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
          "reqSigs": 1,
          "type": "cryptocondition",
          "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
        }
      },
      {
        "value": 744335.99945,
        "valueZat": 74433599945000,
        "n": 2,
        "scriptPubKey": {
          "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
          "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
        }
      },
      {
        "value": 0.0,
        "valueZat": 0,
        "n": 3,
        "scriptPubKey": {
          "asm": "OP_RETURN e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
          "hex": "6a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
          "type": "nulldata"
        }
      }
    ],
    "vjoinsplit": []
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2transfermany

**tokenv2transfermany tokenid1 tokenid2 ... destpubkey amount**

The `tokenv2transfermany` method transfers multiple tokens from one Antara Address to another. There is no limit on how many different tokens can be sent to the one address, simply keep adding more tokenid's one after another, prior to the `destpubkey` and `amount`.

It is similar to the [sendmany](../komodo-api/wallet.html#sendmany) method used to send coins on the parent chain.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

::: tip
The source `txid/vout` needs to be specified as it is critical to match outputs with inputs.
:::

::: tip
A token may be burned by using `tokentransfer` to send to a burn address.
:::

### Arguments

| Name       | Type               | Description                                |
| ---------- | ------------------ | ------------------------------------------ |
| tokenid1   | (string)           | the identifying txid for first token id    |
| tokenid2   | (string, optional) | the identifying txid for another token id  |
| destpubkey | (string)           | the pubkey where the tokens should be sent |
| amount     | (number)           | the number of tokens to send               |

### Response

| Name   | Type     | Description                                                                                          |
| ------ | -------- | ---------------------------------------------------------------------------------------------------- |
| result | (string) | whether the command succeeded                                                                        |
| hex    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the rawtransaction

```bash
./komodo-cli -ac_name=TKLTEST tokenv2transfermany "0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242" "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc" 0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4 50
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f890305e7cda03179d68941b16c626c94479b0a314513a31bd9ed94bdb3373b6983a20200000049483045022100e6091d6a95173e9644c47989c777583dfb8221e9ffc9c4c05278f63f856e815202202fa05629cd16f96c68f0acbcdc64a6efc3882962b2aef4c9e073ac95182ca97201ffffffff42c21f0d3bc13a799c4c8f138594da9cdae29f0e4610dc8ccd546c9a1b63d70c010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140ce42ad2400f4ebd60d324431ca7ecf16ef2ed5e528f042c783fd380b825f6ff918079488a6a95c18218d30868b219419efdf87aafa359aa3bd1f327c1fb58577a100af038001f5a10001ffffffffe50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140f0b23b17e0dfefc18b9ce41ac14c22cd8495adfa96b7ecefa656d66a7dfa79f205bc62094490c7dc89f49b43edf5d253501e61ea861cc083868f694fefef57b9a100af038001f5a10001ffffffff053200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc24275de26000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242753200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc756ae0f50500000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc755f34c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000430400000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2transfermany", "params":["0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242" ,"8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc" "0338f5315f9a60f669871848864aa39c182689c9892894b8c18500b3b830f280f4","50"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "hex": "0400008085202f890305e7cda03179d68941b16c626c94479b0a314513a31bd9ed94bdb3373b6983a20200000049483045022100e6091d6a95173e9644c47989c777583dfb8221e9ffc9c4c05278f63f856e815202202fa05629cd16f96c68f0acbcdc64a6efc3882962b2aef4c9e073ac95182ca97201ffffffff42c21f0d3bc13a799c4c8f138594da9cdae29f0e4610dc8ccd546c9a1b63d70c010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140ce42ad2400f4ebd60d324431ca7ecf16ef2ed5e528f042c783fd380b825f6ff918079488a6a95c18218d30868b219419efdf87aafa359aa3bd1f327c1fb58577a100af038001f5a10001ffffffffe50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140f0b23b17e0dfefc18b9ce41ac14c22cd8495adfa96b7ecefa656d66a7dfa79f205bc62094490c7dc89f49b43edf5d253501e61ea861cc083868f694fefef57b9a100af038001f5a10001ffffffff053200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc24275de26000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242753200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc756ae0f50500000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc755f34c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000430400000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f890305e7cda03179d68941b16c626c94479b0a314513a31bd9ed94bdb3373b6983a20200000049483045022100e6091d6a95173e9644c47989c777583dfb8221e9ffc9c4c05278f63f856e815202202fa05629cd16f96c68f0acbcdc64a6efc3882962b2aef4c9e073ac95182ca97201ffffffff42c21f0d3bc13a799c4c8f138594da9cdae29f0e4610dc8ccd546c9a1b63d70c010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140ce42ad2400f4ebd60d324431ca7ecf16ef2ed5e528f042c783fd380b825f6ff918079488a6a95c18218d30868b219419efdf87aafa359aa3bd1f327c1fb58577a100af038001f5a10001ffffffffe50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140f0b23b17e0dfefc18b9ce41ac14c22cd8495adfa96b7ecefa656d66a7dfa79f205bc62094490c7dc89f49b43edf5d253501e61ea861cc083868f694fefef57b9a100af038001f5a10001ffffffff053200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc24275de26000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242753200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc756ae0f50500000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc755f34c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000430400000000000000000000000000
```

**_update_**

<collapse-text hidden title="Response">

```bash
fc0c7149d367acd92b530bb2a075bf206156122757cf148ee72cc2dd1ca78f4c
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f890305e7cda03179d68941b16c626c94479b0a314513a31bd9ed94bdb3373b6983a20200000049483045022100e6091d6a95173e9644c47989c777583dfb8221e9ffc9c4c05278f63f856e815202202fa05629cd16f96c68f0acbcdc64a6efc3882962b2aef4c9e073ac95182ca97201ffffffff42c21f0d3bc13a799c4c8f138594da9cdae29f0e4610dc8ccd546c9a1b63d70c010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140ce42ad2400f4ebd60d324431ca7ecf16ef2ed5e528f042c783fd380b825f6ff918079488a6a95c18218d30868b219419efdf87aafa359aa3bd1f327c1fb58577a100af038001f5a10001ffffffffe50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140f0b23b17e0dfefc18b9ce41ac14c22cd8495adfa96b7ecefa656d66a7dfa79f205bc62094490c7dc89f49b43edf5d253501e61ea861cc083868f694fefef57b9a100af038001f5a10001ffffffff053200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc24275de26000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574010cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242753200000000000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc756ae0f50500000000653e4da23ba00aa003800102af038001f5a12da22b8020bd7d036361bcc894a9704512e386909c5b141541ebbf99b564b6e792b188bee8810302040082020204cc23f574018d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc755f34c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000430400000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "fc0c7149d367acd92b530bb2a075bf206156122757cf148ee72cc2dd1ca78f4c",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>
