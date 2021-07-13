# Assets (tokenDEX)

## Introduction

The Assets Module provides basic decentralised exchange (DEX) functionality for trading `tokens` created using the [Tokens](https://developers.komodoplatform.com/basic-docs/antara/antara-api/tokens.html) module.

The Asset Module allows anyone to buy or sell tokens by using Tokel coins to submit buy/sell orders/bids. This information is referenced from the [Komodo developer documentation](https://developers.komodoplatform.com/basic-docs/antara/antara-api/assets.html)

### Assets Module Flow

#### Seller's Perspective

- A token owner places a new "ask" request with the <b>tokenv2ask</b> method specifying the amount of tokens they want to sell and the price. The assets module then creates a new token ask order and the specified amount of tokens is locked in the module's global address.
- To fulfill the ask, a buyer executes the <b>tokenv2fillask</b> method. The purchased token amount moves from the global address to the buyer's token Antara Address. At the same time, the required amount of coins move from the buyer's address to the seller's address. This process can be repeated so long as tokens remain in the ask order.
- At any time, the creator of an order can cancel it via the <b>tokenv2cancelask</b> method. The remaining tokens will return to their token Antara Address.

#### Buyer's Perspective

- A buyer places a new bid using the <b>tokenv2bid</b> method. The bid specifies the amount of tokens and the price. The Assets Module creates a new token bid order and the specified amount of coins is locked in the module's global address.
- A willing seller executes the <b>tokenv2fillbid</b> method. The token amount sold moves from the seller's token Antara Address to the buyer's token Antara Address. At the same time, the locked coins move from the global address to the seller's address. This process can be repeated so long as tokens remain in the bid order.
- At any time, the creator of an order can cancel it via the <b>tokenv2cancelbid</b> method. The remaining coins will return to their token Antara Address.

To retrieve a current list of all active orders, use the <b>tokenv2orders</b> or <b>mytokenv2orders</b> methods.

## Assets RPCs

- `assetsv2address [pubkey]`
- `mytokenv2orders [evalcode]`
- `tokenv2ask numtokens tokenid price`
- `tokenv2bid numtokens tokenid price`
- `tokenv2cancelask tokenid asktxid`
- `tokenv2cancelbid tokenid bidtxid`
- `tokenv2fillask tokenid asktxid fillunits`
- `tokenv2fillbid tokenid bidtxid fillamount`
- `tokenv2orders [tokenid]`

## assetsv2address

**assetsaddress (pubkey)**

The `assetsv2address` method returns information about a asset address according to a specific `pubkey`. If no `pubkey` is provided, the `pubkey` used to launch the daemon is the default.

### Arguments

| Structure | Type               | Description                       |
| --------- | ------------------ | --------------------------------- |
| pubkey    | (string, optional) | the pubkey of the desired address |

### Response

| Structure           | Type     | Description                                                                                                                      |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| result              | (string) | whether the command executed successfully                                                                                        |
| AssetsCCaddress     | (string) | taking the token contract's EVAL code as a modifier, this is the public address that corresponds to the token contract's privkey |
| AssetsNormalAddress | (string) | the unmodified public address generated from the token contract's privkey                                                        |
| myCCaddress         | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                          |
| myaddress           | (string) | the public address of the pubkey used to launch the chain                                                                        |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST assetsv2address 02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee
```

<collapse-text hidden title="Response">

Response:

```json
{
  "result": "success",
  "GlobalPk Assetsv2 CC Address": "RX99NCswvrLiM6vNE4zmpKKBWMZU9zqwAk",
  "GlobalPk Assetsv2 CC Balance": 0.0,
  "GlobalPk Assetsv2 Normal Address": "RSB4NhRbvEShUFDkZz2KACj5EEBGDtDsV9",
  "GlobalPk Assetsv2 Normal Balance": 0.0,
  "GlobalPk Assetsv2/Tokens CC Address": "RLN5VzzcMmiiGEyjsM66dkKxKdiERbGtCf",
  "pubkey Assetsv2 CC Address": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
  "pubkey Assetsv2 CC Balance": 0.0,
  "mypk Assetsv2 CC Address": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
  "mypk Assetsv2 CC Balance": 0.0002,
  "mypk Normal Address": "RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh",
  "mypk Normal Balance": 1.09844996
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"assetsaddress", "params":["02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "GlobalPk Assetsv2 CC Address": "RX99NCswvrLiM6vNE4zmpKKBWMZU9zqwAk",
    "GlobalPk Assetsv2 CC Balance": 0.0,
    "GlobalPk Assetsv2 Normal Address": "RSB4NhRbvEShUFDkZz2KACj5EEBGDtDsV9",
    "GlobalPk Assetsv2 Normal Balance": 0.0,
    "GlobalPk Assetsv2/Tokens CC Address": "RLN5VzzcMmiiGEyjsM66dkKxKdiERbGtCf",
    "pubkey Assetsv2 CC Address": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "pubkey Assetsv2 CC Balance": 0.0,
    "mypk Assetsv2 CC Address": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "mypk Assetsv2 CC Balance": 0.0002,
    "mypk Normal Address": "RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh",
    "mypk Normal Balance": 1.09844996
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2ask

**tokenv2ask numtokens tokenid price**

The `tokenv2ask` method posts a public ask order.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Structure | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| numtokens | (number) | the number of tokens to request in the order              |
| tokenid   | (string) | the txid that identifies the token                        |
| price     | (number) | the price to pay for each token (units are in Tokel coin) |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2ask 1 f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c57 100
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89022bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe0500000049483045022100a48724fa61b066e88b9bfb85495b9bd986e924949a4577a2076ac426c102fcf5022023918ee7a3696d63d8a7bd050e1aadd11006b8bfced403b261a301bf997ee38901ffffffff576c15d4b12ec74f019e33829e065faed42cf3361d0eef6a4258cd2dc01f12f701000000804c7ea27ba077a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140fcb7aa887e757fc2739492b691b4ef227a48fe8843381ea594d7f7cb5c4ffe747da4b99aa0931a8458c20d24d64af75563cd138627d42ea8331041a5147fdfd0a100af038001f5af038001f7a10001ffffffff0401000000000000004a484da245a014a003800104af038001f5af038001f6af038001f7a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc0d73aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c572df6730100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee000000002ef200000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2ask", "params":["1000" ,"f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c57" ,"100"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "0400008085202f89022bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe0500000049483045022100a48724fa61b066e88b9bfb85495b9bd986e924949a4577a2076ac426c102fcf5022023918ee7a3696d63d8a7bd050e1aadd11006b8bfced403b261a301bf997ee38901ffffffff576c15d4b12ec74f019e33829e065faed42cf3361d0eef6a4258cd2dc01f12f701000000804c7ea27ba077a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140fcb7aa887e757fc2739492b691b4ef227a48fe8843381ea594d7f7cb5c4ffe747da4b99aa0931a8458c20d24d64af75563cd138627d42ea8331041a5147fdfd0a100af038001f5af038001f7a10001ffffffff0401000000000000004a484da245a014a003800104af038001f5af038001f6af038001f7a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc0d73aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c572df6730100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee000000002ef200000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Use sendrawtransaction to broadcast the order

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89022bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe0500000049483045022100a48724fa61b066e88b9bfb85495b9bd986e924949a4577a2076ac426c102fcf5022023918ee7a3696d63d8a7bd050e1aadd11006b8bfced403b261a301bf997ee38901ffffffff576c15d4b12ec74f019e33829e065faed42cf3361d0eef6a4258cd2dc01f12f701000000804c7ea27ba077a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140fcb7aa887e757fc2739492b691b4ef227a48fe8843381ea594d7f7cb5c4ffe747da4b99aa0931a8458c20d24d64af75563cd138627d42ea8331041a5147fdfd0a100af038001f5af038001f7a10001ffffffff0401000000000000004a484da245a014a003800104af038001f5af038001f6af038001f7a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc0d73aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c572df6730100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee000000002ef200000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f89022bb8ca3b9be7b1f4c759399f787621004f4faf4befb828a3b5e41866e865f9fe0500000049483045022100a48724fa61b066e88b9bfb85495b9bd986e924949a4577a2076ac426c102fcf5022023918ee7a3696d63d8a7bd050e1aadd11006b8bfced403b261a301bf997ee38901ffffffff576c15d4b12ec74f019e33829e065faed42cf3361d0eef6a4258cd2dc01f12f701000000804c7ea27ba077a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140fcb7aa887e757fc2739492b691b4ef227a48fe8843381ea594d7f7cb5c4ffe747da4b99aa0931a8458c20d24d64af75563cd138627d42ea8331041a5147fdfd0a100af038001f5af038001f7a10001ffffffff0401000000000000004a484da245a014a003800104af038001f5af038001f6af038001f7a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204ccc0d73aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c572df6730100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee000000002ef200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2bid

**tokenv2bid numtokens tokenid price**

The `tokenv2bid` method posts a public bid order.

To fill the order, the Tokel coin must be used.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

The `sendrawtransaction` method then returns a `txid`, which is the identification method of the bid order, and should be saved for future use.

### Arguments

| Structure | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| numtokens | (number) | the number of tokens to request in the order              |
| tokenid   | (string) | the txid that identifies the token                        |
| price     | (number) | the price to pay for each token (units are in Tokel coin) |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=TKLTEST tokenv2bid 50 118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c 25
```

<collapse-text hidden title="Response">

```bash
{
  "hex": "0400008085202f890155f8939d2385a746f58d31957bd768743400cab780cf6d1604c0778e7b2e1c6f02000000484730440220698cbd92711c23b7ea4318c815040b062d3ff9cc1358f426d8a1cf7ba52eab34022021c692b8cafeb80d33ebc746247ea2975034cd33bc075a614964eaee7927366101ffffffff0400a2941a1d000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc4da0893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c2df6620100f90295000000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0000000034f200000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2bid", "params":["50" ,"118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c" ,"25"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0400008085202f890155f8939d2385a746f58d31957bd768743400cab780cf6d1604c0778e7b2e1c6f02000000484730440220698cbd92711c23b7ea4318c815040b062d3ff9cc1358f426d8a1cf7ba52eab34022021c692b8cafeb80d33ebc746247ea2975034cd33bc075a614964eaee7927366101ffffffff0400a2941a1d000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc4da0893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c2df6620100f90295000000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0000000034f200000000000000000000000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Use `sendrawtransaction` to publish order

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f890155f8939d2385a746f58d31957bd768743400cab780cf6d1604c0778e7b2e1c6f02000000484730440220698cbd92711c23b7ea4318c815040b062d3ff9cc1358f426d8a1cf7ba52eab34022021c692b8cafeb80d33ebc746247ea2975034cd33bc075a614964eaee7927366101ffffffff0400a2941a1d000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc4da0893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c2df6620100f90295000000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0000000034f200000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f890155f8939d2385a746f58d31957bd768743400cab780cf6d1604c0778e7b2e1c6f02000000484730440220698cbd92711c23b7ea4318c815040b062d3ff9cc1358f426d8a1cf7ba52eab34022021c692b8cafeb80d33ebc746247ea2975034cd33bc075a614964eaee7927366101ffffffff0400a2941a1d000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc4da0893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c2df6620100f90295000000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee0000000034f200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

The response is the transaction id.

## tokenv2cancelask

**tokenv2cancelask tokenid asktxid**

The `tokenv2cancelask` method cancels a specific `ask`/`sell` order that you created.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Structure | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| asktxid   | (string) | the txid that identifies the original ask request |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Issue the call and get your raw transaction HEX value

```bash
./komodo-cli -ac_name=TKLTEST tokenv2cancelask f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c57 95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2cancelask", "params":["f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c57" ,"95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
4ee2fadc75fa425ceaf2882f1a3286238960759e74a33c9c12bbae3b34d780dc
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "4ee2fadc75fa425ceaf2882f1a3286238960759e74a33c9c12bbae3b34d780dc",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

The response is the transaction id.

Step 3 (optional): Decode the raw transaction (check if the values are sane)

```bash
./komodo-cli -ac_name=TKLTEST decoderawtransaction 0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "4ee2fadc75fa425ceaf2882f1a3286238960759e74a33c9c12bbae3b34d780dc",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 0,
  "expiryheight": 62006,
  "vin": [
    {
      "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f[ALL]",
        "hex": "483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
      "vout": 0,
      "scriptSig": {
        "asm": "a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001",
        "hex": "4c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001"
      },
      "sequence": 4294967295
    },
    {
      "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
      "vout": 1,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001",
        "hex": "4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.00000001,
      "valueZat": 1,
      "n": 0,
      "scriptPubKey": {
        "asm": "4da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204 OP_CHECKCRYPTOCONDITION",
        "hex": "434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RVCq5bZcRgP5xsDfUacC8cDCMauzzRB1RE"]
      }
    },
    {
      "value": 0.0001,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
        "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
      }
    },
    {
      "value": 499988749.99879997,
      "valueZat": 49998874999879997,
      "n": 2,
      "scriptPubKey": {
        "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
        "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
      }
    },
    {
      "value": 0.0,
      "valueZat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f67801",
        "hex": "6a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f67801",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": [],
  "valueBalance": 0.0,
  "vShieldedSpend": [],
  "vShieldedOutput": []
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"decoderawtransaction", "params":["0400008085202f8903040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c20200000049483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f09500000000864c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001ffffffff7c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001ffffffff04010000000000000045434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac3d79893fb6a1b100232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f678010000000036f200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "txid": "4ee2fadc75fa425ceaf2882f1a3286238960759e74a33c9c12bbae3b34d780dc",
    "overwintered": true,
    "version": 4,
    "versiongroupid": "892f2085",
    "locktime": 0,
    "expiryheight": 62006,
    "vin": [
      {
        "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
        "vout": 2,
        "scriptSig": {
          "asm": "3045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f[ALL]",
          "hex": "483045022100dc58705623cc2ce179c782d705190ee333f5f8917678a162ffbedfec30a6a3c602207a8f616a420e2fea6c8aa57bb796d6e183927a1ec9fb5fdb09305359184be30f01"
        },
        "sequence": 4294967295
      },
      {
        "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
        "vout": 0,
        "scriptSig": {
          "asm": "a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001",
          "hex": "4c84a28180a07ca26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140402b69fdbc80ace0b3ae849dc447e80595c5a0bdec7f9ce0d44d10ddd9e97b434ed9c0b4236b52da63465c2894349ba9360fefb1dafb43eda61f1f8cf80bbbafa100af038001f5af038001f6af038001f7a10001"
        },
        "sequence": 4294967295
      },
      {
        "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
        "vout": 1,
        "scriptSig": {
          "asm": "a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001",
          "hex": "4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140052d62adf7acd487a7eaf3068c1d904604194bb1d43535f59a4b486fc4bdea436391c73e84623fe604e07e4da5107813a0b19db82849806c9c3751fbefd4db0fa100af038001f6a10001"
        },
        "sequence": 4294967295
      }
    ],
    "vout": [
      {
        "value": 0.00000001,
        "valueZat": 1,
        "n": 0,
        "scriptPubKey": {
          "asm": "4da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204 OP_CHECKCRYPTOCONDITION",
          "hex": "434da240a00fa003800103af038001f5af038001f7a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc",
          "reqSigs": 1,
          "type": "cryptocondition",
          "addresses": ["RVCq5bZcRgP5xsDfUacC8cDCMauzzRB1RE"]
        }
      },
      {
        "value": 0.0001,
        "valueZat": 10000,
        "n": 1,
        "scriptPubKey": {
          "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
          "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
        }
      },
      {
        "value": 499988749.99879997,
        "valueZat": 49998874999879997,
        "n": 2,
        "scriptPubKey": {
          "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
          "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
        }
      },
      {
        "value": 0.0,
        "valueZat": 0,
        "n": 3,
        "scriptPubKey": {
          "asm": "OP_RETURN f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f67801",
          "hex": "6a27f57401f7121fc02dcd58426aef0e1d36f32cd4ae5f069e82339e014fc72eb1d4156c5703f67801",
          "type": "nulldata"
        }
      }
    ],
    "vjoinsplit": [],
    "valueBalance": 0.0,
    "vShieldedSpend": [],
    "vShieldedOutput": []
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2cancelbid

**tokenv2cancelbid tokenid bidtxid**

The `tokenv2cancelbid` method cancels a specific `bid`/`buy` order that you created.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Structure | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| bidtxid   | (string) | the txid that identifies the original bid request |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Issue the call and get your raw transaction HEX value

```bash
./komodo-cli -ac_name=TKLTEST tokenv2cancelbid 118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2cancelbid", "params":["118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c" ,"c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Send raw transaction / broadcast the HEX value from above

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
91ba9a1b3f77ac11eabea82c8123ad4f051d7194884b49c8469a254e302b7777
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "91ba9a1b3f77ac11eabea82c8123ad4f051d7194884b49c8469a254e302b7777",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

The response is the transaction id.

Step 3: Decode the raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=TKLTEST decoderawtransaction 0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "91ba9a1b3f77ac11eabea82c8123ad4f051d7194884b49c8469a254e302b7777",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 0,
  "expiryheight": 62019,
  "vin": [
    {
      "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
      "vout": 2,
      "scriptSig": {
        "asm": "304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf[ALL]",
        "hex": "47304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001",
        "hex": "4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001"
      },
      "sequence": 4294967295
    },
    {
      "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
      "vout": 1,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001",
        "hex": "4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 1250.0,
      "valueZat": 125000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
        "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
      }
    },
    {
      "value": 0.0001,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
        "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
      }
    },
    {
      "value": 499.9995,
      "valueZat": 49999950000,
      "n": 2,
      "scriptPubKey": {
        "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
        "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
      }
    },
    {
      "value": 0.0,
      "valueZat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f01",
        "hex": "6a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f01",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": [],
  "valueBalance": 0.0,
  "vShieldedSpend": [],
  "vShieldedOutput": []
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"decoderawtransaction", "params":["0400008085202f89037c1bdda5eb9c85ad0279c7a3e683e338b04f9d689afcd8005707abcc4d33f095020000004847304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001ffffffff040997d566112d6905bcbe490b39a357bdefd26a472ac31fc7c6d5cb46a2b0c2010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001ffffffff0400a2941a1d000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeacb0b03aa40b000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000296a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f010000000043f200000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "txid": "91ba9a1b3f77ac11eabea82c8123ad4f051d7194884b49c8469a254e302b7777",
    "overwintered": true,
    "version": 4,
    "versiongroupid": "892f2085",
    "locktime": 0,
    "expiryheight": 62019,
    "vin": [
      {
        "txid": "95f0334dccab075700d8fc9a689d4fb038e383e6a3c77902ad859ceba5dd1b7c",
        "vout": 2,
        "scriptSig": {
          "asm": "304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf[ALL]",
          "hex": "47304402200a61e18a19f8469fff777b71d6730664395e1138141e193a69a5209c438fa87c022053525d66fe7416a70f9ced8dfca201f217850b96877edc6ba014ba9a16e671bf01"
        },
        "sequence": 4294967295
      },
      {
        "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
        "vout": 0,
        "scriptSig": {
          "asm": "a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001",
          "hex": "4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140ca918feec411b9771f9b2ab43a631fc9b995f8047bc405291b62f08956c168721a55d8345b9f84d9f1b5a538e682691014d1cb19ea8585da75984ff78d3fc2f5a100af038001f6a10001"
        },
        "sequence": 4294967295
      },
      {
        "txid": "c2b0a246cbd5c6c71fc32a476ad2efbd57a3390b49bebc05692d1166d5970904",
        "vout": 1,
        "scriptSig": {
          "asm": "a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001",
          "hex": "4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140b7e675bb9c9d34e8fcf623daf1f67885c9cbf8349edf7dd677bfa54052611c714768fa24a5ac476e0f510ca76d39c965944af5c9eec1979214e74479d1c5d17da100af038001f6a10001"
        },
        "sequence": 4294967295
      }
    ],
    "vout": [
      {
        "value": 1250.0,
        "valueZat": 125000000000,
        "n": 0,
        "scriptPubKey": {
          "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
          "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
        }
      },
      {
        "value": 0.0001,
        "valueZat": 10000,
        "n": 1,
        "scriptPubKey": {
          "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
          "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
        }
      },
      {
        "value": 499.9995,
        "valueZat": 49999950000,
        "n": 2,
        "scriptPubKey": {
          "asm": "02ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee OP_CHECKSIG",
          "hex": "2102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac",
          "reqSigs": 1,
          "type": "pubkey",
          "addresses": ["RN3hmR5oGXPpLW8oyxpVEizoNHN3Equvmh"]
        }
      },
      {
        "value": 0.0,
        "valueZat": 0,
        "n": 3,
        "scriptPubKey": {
          "asm": "OP_RETURN f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f01",
          "hex": "6a27f57401118a95dd6aa92bedc13f223ad5f51a6d6c113313b0f2cc16107e2cac0ccf643c03f66f01",
          "type": "nulldata"
        }
      }
    ],
    "vjoinsplit": [],
    "valueBalance": 0.0,
    "vShieldedSpend": [],
    "vShieldedOutput": []
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## tokenv2fillask

**tokenv2fillask tokenid asktxid fillamount**

The `tokenv2fillask` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Structure  | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| asktxid    | (string) | the txid that identifies the ask order |
| fillamount | (number) | the amount to fill                     |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the raw transaction

```bash
./komodo-cli -ac_name=TKLTEST tokenv2fillask 3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142 eca2bc2960a6660134c94c700c5c9c7f054884b95164499b4b60f0fc267502b8 1
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f890277772b304e259a46c8494b8894711d054fad23812ca8beea11ac773f1b9aba91020000004847304402203d150fde5b65be03af6e3d64eec8e9b31f3ac6cea73ae08033ec97a0e1127b560220571fbc07ad968e08adfe6565cdeed3123576cd847a4cb94d3371dede073245fb01ffffffffb8027526fcf0604b9b496451b98448057f9c5c0c704cc9340166a66029bca2ec00000000804c7ea27ba077a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140e0ca8262db61ef8a31003beaa42e79aab3d8d76d2e7be40f252b2c6dfaef800c0974efbb4b690aeed7392ccaa20bee6361de31e11104bca902fa3d39714ddd7da100af038001f5af038001f6a10001ffffffff06000000000000000045434da240a00fa003800103af038001f5af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc00e40b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc907e2e5009000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6530100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d0f700000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2fillask", "params":["3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142" ,"eca2bc2960a6660134c94c700c5c9c7f054884b95164499b4b60f0fc267502b8" ,"1"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0400008085202f890277772b304e259a46c8494b8894711d054fad23812ca8beea11ac773f1b9aba91020000004847304402203d150fde5b65be03af6e3d64eec8e9b31f3ac6cea73ae08033ec97a0e1127b560220571fbc07ad968e08adfe6565cdeed3123576cd847a4cb94d3371dede073245fb01ffffffffb8027526fcf0604b9b496451b98448057f9c5c0c704cc9340166a66029bca2ec00000000804c7ea27ba077a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140e0ca8262db61ef8a31003beaa42e79aab3d8d76d2e7be40f252b2c6dfaef800c0974efbb4b690aeed7392ccaa20bee6361de31e11104bca902fa3d39714ddd7da100af038001f5af038001f6a10001ffffffff06000000000000000045434da240a00fa003800103af038001f5af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc00e40b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc907e2e5009000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6530100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d0f700000000000000000000000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast the hex using sendrawtransaction

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f890277772b304e259a46c8494b8894711d054fad23812ca8beea11ac773f1b9aba91020000004847304402203d150fde5b65be03af6e3d64eec8e9b31f3ac6cea73ae08033ec97a0e1127b560220571fbc07ad968e08adfe6565cdeed3123576cd847a4cb94d3371dede073245fb01ffffffffb8027526fcf0604b9b496451b98448057f9c5c0c704cc9340166a66029bca2ec00000000804c7ea27ba077a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140e0ca8262db61ef8a31003beaa42e79aab3d8d76d2e7be40f252b2c6dfaef800c0974efbb4b690aeed7392ccaa20bee6361de31e11104bca902fa3d39714ddd7da100af038001f5af038001f6a10001ffffffff06000000000000000045434da240a00fa003800103af038001f5af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc00e40b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc907e2e5009000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6530100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d0f700000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
d96080e3e2ea6d061bb8845469ec5a9a1a015275766fa747c58edde437344031
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f890277772b304e259a46c8494b8894711d054fad23812ca8beea11ac773f1b9aba91020000004847304402203d150fde5b65be03af6e3d64eec8e9b31f3ac6cea73ae08033ec97a0e1127b560220571fbc07ad968e08adfe6565cdeed3123576cd847a4cb94d3371dede073245fb01ffffffffb8027526fcf0604b9b496451b98448057f9c5c0c704cc9340166a66029bca2ec00000000804c7ea27ba077a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140e0ca8262db61ef8a31003beaa42e79aab3d8d76d2e7be40f252b2c6dfaef800c0974efbb4b690aeed7392ccaa20bee6361de31e11104bca902fa3d39714ddd7da100af038001f5af038001f6a10001ffffffff06000000000000000045434da240a00fa003800103af038001f5af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc00e40b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc907e2e5009000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6530100e40b54020000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d0f700000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "d96080e3e2ea6d061bb8845469ec5a9a1a015275766fa747c58edde437344031",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

The response is the transaction id.

Step 3: Wait for the transaction to be confirmed

## tokenv2fillbid

**tokenv2fillbid tokenid bidtxid fillamount**

The `tokenv2fillbid` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Structure  | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| bidtxid    | (string) | the txid that identifies the bid order |
| fillamount | (number) | the amount to fill                     |

### Response

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create raw transaction

```bash
./komodo-cli -ac_name=TKLTEST tokenv2fillbid 3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142 7d81b04574a254185802c61ed52bba16ffaa7b5477c24a19c894c1d4458550f1 1
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f890331403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d902000000484730440220033f014052a029fd5ad4229b48afae6a12528de1383a099ec335763bff05b6f8022013cf0be07a6b799c2452e8223345292abef85bac45e91ffc45d9a568f3d1b32d01fffffffff1508545d4c194c8194ac277547baaff16ba2bd51ec602581854a27445b0817d000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140a2733e0f88a5ec6cb855d26c8f86d2a01bf6da55911130eb108eb564473033f717bbf505061e3a19de422f20eca7455805d1791b53376badf2fcc1716603373da100af038001f6a10001ffffffff31403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d9010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d57f9323abff870873d88a65e25f60dd8bf5e57e68a2d5aef68debf1917854b469a1801d26f704e24328a9d36be7301a6abf9e9708608a0e2e7ab2dbaffabe53a100af038001f5a10001ffffffff060082357a0a000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc00f2052a01000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cce0950b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6420100f2052a010000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d4f700000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2fillbid", "params":["3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142" ,"7d81b04574a254185802c61ed52bba16ffaa7b5477c24a19c894c1d4458550f1" ,"1"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "0400008085202f890331403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d902000000484730440220033f014052a029fd5ad4229b48afae6a12528de1383a099ec335763bff05b6f8022013cf0be07a6b799c2452e8223345292abef85bac45e91ffc45d9a568f3d1b32d01fffffffff1508545d4c194c8194ac277547baaff16ba2bd51ec602581854a27445b0817d000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140a2733e0f88a5ec6cb855d26c8f86d2a01bf6da55911130eb108eb564473033f717bbf505061e3a19de422f20eca7455805d1791b53376badf2fcc1716603373da100af038001f6a10001ffffffff31403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d9010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d57f9323abff870873d88a65e25f60dd8bf5e57e68a2d5aef68debf1917854b469a1801d26f704e24328a9d36be7301a6abf9e9708608a0e2e7ab2dbaffabe53a100af038001f5a10001ffffffff060082357a0a000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc00f2052a01000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cce0950b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6420100f2052a010000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d4f700000000000000000000000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast the hex or sendrawtransaction

```bash
./komodo-cli -ac_name=TKLTEST sendrawtransaction 0400008085202f890331403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d902000000484730440220033f014052a029fd5ad4229b48afae6a12528de1383a099ec335763bff05b6f8022013cf0be07a6b799c2452e8223345292abef85bac45e91ffc45d9a568f3d1b32d01fffffffff1508545d4c194c8194ac277547baaff16ba2bd51ec602581854a27445b0817d000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140a2733e0f88a5ec6cb855d26c8f86d2a01bf6da55911130eb108eb564473033f717bbf505061e3a19de422f20eca7455805d1791b53376badf2fcc1716603373da100af038001f6a10001ffffffff31403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d9010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d57f9323abff870873d88a65e25f60dd8bf5e57e68a2d5aef68debf1917854b469a1801d26f704e24328a9d36be7301a6abf9e9708608a0e2e7ab2dbaffabe53a100af038001f5a10001ffffffff060082357a0a000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc00f2052a01000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cce0950b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6420100f2052a010000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d4f700000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
ca68305ef6fb2ff9db69b85d6832a145fab57ad45d159a486e6e24b1d1a2a071
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["0400008085202f890331403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d902000000484730440220033f014052a029fd5ad4229b48afae6a12528de1383a099ec335763bff05b6f8022013cf0be07a6b799c2452e8223345292abef85bac45e91ffc45d9a568f3d1b32d01fffffffff1508545d4c194c8194ac277547baaff16ba2bd51ec602581854a27445b0817d000000007b4c79a276a072a26ba067a56580210345d2e7ab018619da6ed58ccc0138c5f58a7b754bd8e9a1a9d2b811c5fe72d4678140a2733e0f88a5ec6cb855d26c8f86d2a01bf6da55911130eb108eb564473033f717bbf505061e3a19de422f20eca7455805d1791b53376badf2fcc1716603373da100af038001f6a10001ffffffff31403437e4dd8ec547a76f767552011a9a5aec695484b81b066deae2e38060d9010000007b4c79a276a072a26ba067a565802102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee8140d57f9323abff870873d88a65e25f60dd8bf5e57e68a2d5aef68debf1917854b469a1801d26f704e24328a9d36be7301a6abf9e9708608a0e2e7ab2dbaffabe53a100af038001f5a10001ffffffff060082357a0a000000403e4da23ba00aa003800102af038001f6a12da22b8020372291b16b9c8bab27def01f3d96e96f97f5ab14b1cab090dbe9296b70fd87bb810302040082020204cc00f2052a01000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0100000000000000403e4da23ba00aa003800102af038001f5a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cc1027000000000000403e4da23ba00aa003800102af038001f6a12da22b802049163d1ec6309fc2cbc07fc13a3951bc938fd15263b0eceb4bcea6d164c0fccb810302040082020204cce0950b5402000000232102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6eeac0000000000000000546a4c51f574013e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b1422df6420100f2052a010000002102ed3fcb2ace8a53cd8ed5350dc53c507167ad39238ba70345e51764c6d517e6ee00000000d4f700000000000000000000000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "ca68305ef6fb2ff9db69b85d6832a145fab57ad45d159a486e6e24b1d1a2a071",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

The response is the transaction id.

Step 3: Wait for the transaction to be confirmed

## tokenv2orders

**tokenv2orders (tokenid)**

The `tokenv2orders` method displays all of the public on-chain orderbook orders, or only for a specific token. Add a specific tokenid to check all of the current orders for that token, or leave the RPC blank to see all the orders, on all tokens.

Information about the `funcid` property:

- A lowercase `b` describes an bid offer.

- An uppercase `B` describes a bid order that has been partially filled.

- A lowercase `s` describes an ask offer.

- An uppercase `S` describes an ask order that has been partially filled.

### Arguments

| Structure | Type               | Description                                                                                       |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| tokenid   | (string, optional) | the identifying txid for the token id. Leave this blank to see all of your orders, on all tokens. |

### Response

| Structure           | Type                       | Description                                                                    |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| funcid              | (string)                   | describes either a bid ask `b`, a bid fill `B`, an ask `s`, or an ask fill `S` |
| txid                | (string)                   | the txid of the identifying order or fill                                      |
| vout                | (number)                   | the vout value                                                                 |
| amount              | (number)                   | the amount remaining in the bid/ask request                                    |
| bidamount/askamount | (number)                   | the total amount of the relevant bid or ask request                            |
| origaddress         | (string)                   | the address that made the original bid `b` or ask `s`                          |
| tokenid             | (string)                   | the tokenid for the relevant bid/ask request/fill                              |
| totalrequired       | (number, `b` and `s` only) | the total amount available in the original bid/ask request/fill                |
| price               | (number, `b` and `s` only) | the price per token, units are in TKL                                          |

#### :pushpin: Examples:

Show all available orders for a specific token

```bash
./komodo-cli -ac_name=TKLTEST tokenv2orders ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3
```

<collapse-text hidden title="Response">

```json
[
  {
    "funcid": "b",
    "txid": "0978335381ded3d04747898de1c272b5dbadd9df96b3e2b8f529fe1cb5031da4",
    "vout": 0,
    "amount": "10.00000000",
    "bidamount": "10.00000000",
    "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
    "tokenid": "ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3",
    "totalrequired": 10,
    "price": 1.0
  }
]
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2orders", "params":["ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": [
    {
      "funcid": "b",
      "txid": "0978335381ded3d04747898de1c272b5dbadd9df96b3e2b8f529fe1cb5031da4",
      "vout": 0,
      "amount": "10.00000000",
      "bidamount": "10.00000000",
      "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
      "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
      "tokenid": "ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3",
      "totalrequired": 10,
      "price": 1.0
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Show all available orders

```bash
./komodo-cli -ac_name=TKLTEST tokenv2orders
```

<collapse-text hidden title="Response">

```json
[
  {
    "funcid": "b",
    "txid": "872841eb5abc39436fe21e9828cb1411e2aa178452f74d5e44ccde7975f0f810",
    "vout": 0,
    "amount": "12.00000000",
    "bidamount": "12.00000000",
    "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
    "tokenid": "17aa08ceb43f772c172daa347ea8c24ef7e2ddd517c3b9ede811ff32929a1278",
    "totalrequired": 1,
    "price": 12.0
  },
  {
    "funcid": "B",
    "txid": "ca68305ef6fb2ff9db69b85d6832a145fab57ad45d159a486e6e24b1d1a2a071",
    "vout": 0,
    "amount": "450.00000000",
    "bidamount": "450.00000000",
    "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
    "tokenid": "3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142",
    "totalrequired": 9,
    "price": 50.0
  },
  {
    "funcid": "b",
    "txid": "0978335381ded3d04747898de1c272b5dbadd9df96b3e2b8f529fe1cb5031da4",
    "vout": 0,
    "amount": "10.00000000",
    "bidamount": "10.00000000",
    "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
    "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
    "tokenid": "ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3",
    "totalrequired": 10,
    "price": 1.0
  }
]
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"tokenv2orders", "params":[]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": [
    {
      "funcid": "b",
      "txid": "872841eb5abc39436fe21e9828cb1411e2aa178452f74d5e44ccde7975f0f810",
      "vout": 0,
      "amount": "12.00000000",
      "bidamount": "12.00000000",
      "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
      "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
      "tokenid": "17aa08ceb43f772c172daa347ea8c24ef7e2ddd517c3b9ede811ff32929a1278",
      "totalrequired": 1,
      "price": 12.0
    },
    {
      "funcid": "B",
      "txid": "ca68305ef6fb2ff9db69b85d6832a145fab57ad45d159a486e6e24b1d1a2a071",
      "vout": 0,
      "amount": "450.00000000",
      "bidamount": "450.00000000",
      "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
      "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
      "tokenid": "3e54d1f345949815edb138c29ae81972dc96a47c5499804490b555a8b421b142",
      "totalrequired": 9,
      "price": 50.0
    },
    {
      "funcid": "b",
      "txid": "0978335381ded3d04747898de1c272b5dbadd9df96b3e2b8f529fe1cb5031da4",
      "vout": 0,
      "amount": "10.00000000",
      "bidamount": "10.00000000",
      "origaddress": "RP7Yf1iWAwFFnRehd6Dtcdm2L6ybEmfLNS",
      "origtokenaddress": "RVXdnHvxuAYYuupD2EukpkAwjfaU81jSrz",
      "tokenid": "ffc5d13dffb392509b8470435b610502649af953d813c6841119622b9966ccb3",
      "totalrequired": 10,
      "price": 1.0
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## mytokenv2orders

**mytokenv2orders [evalcode]**

The `mytokenv2orders` method displays the public on-chain orders created by the user's pubkey, which is set in `-pubkey` parameter of komodod.

The additional `evalcode` parameter allows the display of orders for non-fungible tokens bound to this evalcode.

The response from this method is similar to the response from the `tokenv2orders` method.
