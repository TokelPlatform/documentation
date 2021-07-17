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

For every token created, you are required to spend one satoshi (.00000001) of the Tokel coin (TKL). For example, 1 TKL creates a maximum 100000000 tokens. As each TKL satoshi is used to create a coloured coin, once the TKL has been spent to create the token, it is effectively burnt and no longer in the circulating supply of TKL. This method is used to create all types (NFT & Fixed supply) of tokens on the Tokel blockchain. The data you input into the token on creation is non editable. Once it is created, you cannot change it, so be dilligent and ensure you haven't made any errors! If you would like to write external data to your token, consider using the OraclesCC methods.

The token data field is optional and is broken down into a URL (we suggest using IPFS for storing images/audio/video/other), ID (used to identify sets of NFTs), a royalty amount (x/1000), and an arbitrary data field that is input as hex.

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

#### :pushpin: Examples

#### New JSON input examples need to be added

Command:

```bash
./komodo-cli -ac_name=TKLTEST5 tokenv2createtokel NewT0912ken 0.00000001 "Just a random token. 12$%^&*()_+-={}][" "{\"url\":\"https://tokel.io/roadmap\", \"id\":69, \"royalty\":100, \"arbitrary\":\"54686973206973206120746573742068657820737472696e6720746f20696e636f72706f726174652061726269747261727920646174612e\"}"
```

Check the NFT:

<collapse-text hidden title="Response">
  
```bash
./komodo-cli -ac_name=TKLTEST5 tokenv2infotokel f3ef3ed5a9a26245ab09e7d0e6ade2e5bd053c27315be0184ee17fc58c3ab083
```

</collapse-text>

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "f3ef3ed5a9a26245ab09e7d0e6ade2e5bd053c27315be0184ee17fc58c3ab083",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "NewT0912ken",
  "supply": 1,
  "description": "Just a random token. 12$%^&*()_+-={}][",
  "data": "f701",
  "dataAsJson": {
    "id": 69,
    "url": "https://tokel.io/roadmap",
    "royalty": 100,
    "arbitrary": "54686973206973206120746573742068657820737472696e6720746f20696e636f72706f726174652061726269747261727920646174612e"
  },
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

#### NFT Creation Example 1

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2create NFTDataTest 0.00000001 "Testing the new NFT data field. How good!" f7010133021168747470733a2f2f746f6b656c2e696f2f0364041168747470733a2f2f746f6b656c2e696f2f
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f89012bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe010000004847304402207165ee0ed662ef4044873c05a13ff590382e4c49ba97900f7c3466a4265a3cd302206e1bc95bb18095a7f4a759c0cd9f3095d126199a297761864b6d26ad671be7db01ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc5fd0264810000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000000000008b6a4c88f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465444617461546573742954657374696e6720746865206e6577204e46542064617461206669656c642e20486f7720676f6f64212cf7010133021168747470733a2f2f746f6b656c2e696f2f0364041168747470733a2f2f746f6b656c2e696f2f00000000ecb700000000000000000000000000"
}
```

</collapse-text>

Step 2: Broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89012bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe010000004847304402207165ee0ed662ef4044873c05a13ff590382e4c49ba97900f7c3466a4265a3cd302206e1bc95bb18095a7f4a759c0cd9f3095d126199a297761864b6d26ad671be7db01ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc5fd0264810000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac00000000000000008b6a4c88f563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0b4e465444617461546573742954657374696e6720746865206e6577204e46542064617461206669656c642e20486f7720676f6f64212cf7010133021168747470733a2f2f746f6b656c2e696f2f0364041168747470733a2f2f746f6b656c2e696f2f00000000ecb700000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
fe2486f3cc81f4000c22b2583a4665624e79d877e6f80f107e3d49e3d032049a
```

</collapse-text>

Check the NFT:

<collapse-text hidden title="Response">
  
```bash
komodo-cli -ac_name=TKLTEST tokenv2info fe2486f3cc81f4000c22b2583a4665624e79d877e6f80f107e3d49e3d032049a
```

</collapse-text>

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "fe2486f3cc81f4000c22b2583a4665624e79d877e6f80f107e3d49e3d032049a",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "NFTDataTest",
  "supply": 1,
  "description": "Testing the new NFT data field. How good!",
  "data": "f7010133021168747470733a2f2f746f6b656c2e696f2f0364041168747470733a2f2f746f6b656c2e696f2f",
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

Check the data field using a decoder:

<collapse-text hidden title="Response">
  
```
To be added. Use application TS1 decoder.
```

</collapse-text>

#### Non-NFT Creation Example

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2create Second 0.0001 "This is the second test token created on TKLTEST"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f8901e50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232020000004847304402206bfb231a22a73d3ab1b5990cec543d50a864b31829efc430f76b75e2d261328002204f90ad25c3bcf0396b5c189fc787df0fb84ae4bbe9880c440401b7cafe141c1201ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc90a9c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000616a4c5ef563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee065365636f6e64305468697320697320746865207365636f6e64207465737420746f6b656e2063726561746564206f6e20544b4c5445535400000000002e0400000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2create", "params":["Second" ,"0.0001" ,"This is the second test token created on TKLTEST"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "0400008085202f8901e50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232020000004847304402206bfb231a22a73d3ab1b5990cec543d50a864b31829efc430f76b75e2d261328002204f90ad25c3bcf0396b5c189fc787df0fb84ae4bbe9880c440401b7cafe141c1201ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc90a9c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000616a4c5ef563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee065365636f6e64305468697320697320746865207365636f6e64207465737420746f6b656e2063726561746564206f6e20544b4c5445535400000000002e0400000000000000000000000000"
  },
  "error": null,
  "id": null
}
```

</collapse-text>

Step 2: Broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f8901e50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232020000004847304402206bfb231a22a73d3ab1b5990cec543d50a864b31829efc430f76b75e2d261328002204f90ad25c3bcf0396b5c189fc787df0fb84ae4bbe9880c440401b7cafe141c1201ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc90a9c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000616a4c5ef563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee065365636f6e64305468697320697320746865207365636f6e64207465737420746f6b656e2063726561746564206f6e20544b4c5445535400000000002e0400000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command (curl sendrawtransaction):

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f8901e50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232020000004847304402206bfb231a22a73d3ab1b5990cec543d50a864b31829efc430f76b75e2d261328002204f90ad25c3bcf0396b5c189fc787df0fb84ae4bbe9880c440401b7cafe141c1201ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc90a9c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000616a4c5ef563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee065365636f6e64305468697320697320746865207365636f6e64207465737420746f6b656e2063726561746564206f6e20544b4c5445535400000000002e0400000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0cd7631b9a6c54cd8cdc10460e9fe2da9cda9485138f4c9c793ac13b0d1fc242",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 3 (Optional): Use decoderawtransaction to verify the output is sane **_Need to update this_**

```bash
./komodo-cli -ac_name=TKLTEST decoderawtransaction 0400008085202f8901e50b6bc0826e34870eea98d35f6ccf7e23133b5567b131ea1f0443935a4a9232020000004847304402206bfb231a22a73d3ab1b5990cec543d50a864b31829efc430f76b75e2d261328002204f90ad25c3bcf0396b5c189fc787df0fb84ae4bbe9880c440401b7cafe141c1201ffffffff041027000000000000403e4da23ba00aa003800102af038001f5a12da22b802096fec31e85a06720706ef9214c9c8b2df26940aac250e1d80f23a772b18b5a4a810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc90a9c34a7c8d0300232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000616a4c5ef563012102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee065365636f6e64305468697320697320746865207365636f6e64207465737420746f6b656e2063726561746564206f6e20544b4c5445535400000000002e0400000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
  "size": 335,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "307c094bce80205ec56abd43041530b0cd6faf449ea84cd2ae49339cfc3c222c",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01",
        "hex": "483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 10.0,
      "valueSat": 1000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "02adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702 OP_CHECKSIG",
        "hex": "2102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RFYE2yL3KknWdHK6uNhvWacYsCUtwzjY3u"]
      }
    },
    {
      "value": 99889.9996,
      "valueSat": 9988999960000,
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
        "asm": "OP_RETURN e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
        "hex": "6a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
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
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"decoderawtransaction", "params":["01000000012c223cfc9c3349aed24ca89e44af6fcdb030150443bd6ac55e2080ce4b097c300200000049483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01ffffffff0400ca9a3b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702acc055cbbe15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000396a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e00000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
    "overwintered": false,
    "version": 1,
    "locktime": 0,
    "vin": [
      {
        "txid": "307c094bce80205ec56abd43041530b0cd6faf449ea84cd2ae49339cfc3c222c",
        "vout": 2,
        "scriptSig": {
          "asm": "3045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa[ALL]",
          "hex": "483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01"
        },
        "sequence": 4294967295
      }
    ],
    "vout": [
      {
        "value": 10.0,
        "valueZat": 1000000000,
        "n": 0,
        "scriptPubKey": {
          "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
          "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
          "reqSigs": 1,
          "type": "cryptocondition",
          "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
        }
      },
      {
        "value": 0.0001,
        "valueZat": 10000,
        "n": 1,
        "scriptPubKey": {
          "asm": "02adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702 OP_CHECKSIG",
          "hex": "2102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702ac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RFYE2yL3KknWdHK6uNhvWacYsCUtwzjY3u"]
        }
      },
      {
        "value": 99889.9996,
        "valueZat": 9988999960000,
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
          "asm": "OP_RETURN e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
          "hex": "6a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
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

<!-- ## tokenv2infotokel -->

## tokenv2info

**tokenv2info tokenid**

The `tokeninfo` method reveals information about any token.

### Arguments

| Name    | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| tokenid | (string) | the txid that identifies the token |

### Response

| Name          | Type              | Description                                                                  |
| ------------- | ----------------- | ---------------------------------------------------------------------------- |
| result        | (string)          | whether the command executed successfully                                    |
| tokenid       | (string)          | the identifying txid for the token id                                        |
| owner         | (string)          | the identifying pubkey of the token creator                                  |
| name          | (string)          | the name of the token                                                        |
| supply        | (number)          | the total supply of the token                                                |
| description   | (string)          | the token description provided by the creator at token creation              |
| data          | (string,optional) | the data related to the non-fungible token, in hex                           |
| IsImported    | (string,optional) | if 'yes' this token was imported from another chain                          |
| sourceChain   | (string,optional) | the name of the imported token's source chain                                |
| sourceTokenId | (string,optional) | for an imported token, the `tokenid` of the source token on the source chain |

**_ISMIXED?_**

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2info 8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc",
  "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
  "name": "First",
  "supply": 100000000,
  "description": "This is the first test token created on TKLTEST",
  "version": 1,
  "IsMixed": "yes"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2info", "params":["8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "tokenid": "8d7322de19971cd8c0ff8bec7c564754552c3e03d1487d7a948ffe02d60d9ccc",
    "owner": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee",
    "name": "First",
    "supply": 100000000,
    "description": "This is the first test token created on TKLTEST",
    "version": 1,
    "IsMixed": "yes"
  },
  "error": null,
  "id": "curltest"
}
```

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
