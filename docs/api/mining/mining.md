# Mining

The following RPC calls interact with the Tokel blockchain daemon, and are made available through the `tokel-cli` software.

The Tokel blockchain inherits all Komodo smartchain RPC's, but not all RPC's are enabled. For simplicity, our documentation only shows those commands that are enabled and available for use.

## getblocksubsidy

**getblocksubsidy height_number**

The `getblocksubsidy` method returns the block-subsidy reward. The resulting calculation takes into account the mining slow start. This method can be used in conjunction with custom mining rewards designed by the developers of a KMD-based Smart Chain.

### Arguments

| Name   | Type                | Description                                                                                                   |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| height | (numeric, optional) | the block height; if the block height is not provided, the method defaults to the current height of the chain |

### Response

| Name    | Type      | Description              |
| ------- | --------- | ------------------------ |
| "miner" | (numeric) | the mining reward amount |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getblocksubsidy 100
```

<collapse-text hidden title="Response">

```json
{
  "miner": 3.0
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocksubsidy", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "miner": 3.0
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## getblocktemplate

**getblocktemplate ( "jsonrequestobject" )**

::: tip
See <a href="https://en.bitcoin.it/wiki/BIP_0022">the Bitcoin wiki</a> for the full specification.
:::

The `getblocktemplate` method returns data that is necessary to construct a block.

If the request parameters include a `mode` key, it is used to explicitly select between the default 'template' request, a 'proposal' or 'disablecb'.

#### A Note on Unique Mining Circumstances

There are many features in the Komodo Ecosystem that can make a Smart Chain's daemon produce non-standard coinbase transactions. Examples include a Smart Chain parameter that creates new coins for a specific pubkey in every block or a CC module that adds outputs to the coinbase transaction.

This can be dealt using a mode called `disablecb`

Usage:

```bash
./tokel-cli getblocktemplate '{"mode":"disablecb"}'
```

The block template produced using this mode doesn't have the `"coinbasetxn": { ... }` json object but adds the coinbase transaction to the `"transactions":[ ... ]` array, just like a regular transaction.

Now the pool software can use the `"transactions":[ ... ]` array to create a block and take fees in the payment processor.
Team member, `Blackjok3r`, developed a coinbase-override method for this purpose. Please see [this repo](https://github.com/webworker01/knomp/#disable-coinbase-mode) for details.

### Arguments

| Name                          | Type               | Description                                                                                                    |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| "jsonrequestobject" : { ... } | (string, optional) | a json object in the following spec                                                                            |
| "mode"                        | (string, optional) | this must be set to "template" or omitted                                                                      |
| "capabilities": [ ... ]       | (array, optional)  | a list of strings                                                                                              |
| "support"                     | (string)           | client side supported features: "longpoll", "coinbasetxn", "coinbasevalue", "proposal", "serverlist", "workid" |

### Response

| Name                   | Type               | Description                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "version"              | (numeric)          | the block version                                                                                                                                                                                                                                                                                |
| "previousblockhash"    | (string)           | the hash of current highest block                                                                                                                                                                                                                                                                |
| "finalsaplingroothash" | (string)           | the hash of the final sapling root                                                                                                                                                                                                                                                               |
| "transactions":[ ... ] | (array)            | the contents of non-coinbase transactions that should be included in the next block                                                                                                                                                                                                              |
| "data"                 | (string)           | transaction data encoded in hexadecimal (byte-for-byte)                                                                                                                                                                                                                                          |
| "hash"                 | (string)           | the hash/id encoded in little-endian hexadecimal                                                                                                                                                                                                                                                 |
| "depends" : [ ... ]    | (array)            | an array of numbers                                                                                                                                                                                                                                                                              |
| number                 | (numeric)          | the indexes of transactions that must be present in the final block if this transaction is present in the final block; the index of the array of transactions starts with "1"                                                                                                                    |
| "fee"                  | (numeric)          | the difference in value between transaction inputs and outputs in satoshis; for coinbase transactions, this is the negative number of the total collected block fees, not including the block subsidy; if a key is not present, the fee is unknown and clients MUST NOT assume it is not present |
| "sigops"               | (numeric)          | the total number of sigops, as counted for the purposes of block limits; if a key is not present, the sigop count is unknown and clients MUST NOT assume they are not present.                                                                                                                   |
| "required"             | (boolean)          | if provided and true, this transaction must be in the final block                                                                                                                                                                                                                                |
| "coinbasetxn": { ... } | (json object)      | information for the coinbase transaction                                                                                                                                                                                                                                                         |
| "longpollid"           | (string)           | the last seen longpollid when this response was sent by the server                                                                                                                                                                                                                               |
| "data"                 | (string)           | transaction data encoded in hexadecimal (byte-for-byte)                                                                                                                                                                                                                                          |
| "hash"                 | (string)           | the hash/id encoded in little-endian hexadecimal                                                                                                                                                                                                                                                 |
| "depends" : [ ... ]    | (array)            | an array of numbers                                                                                                                                                                                                                                                                              |
| "fee"                  | (numeric)          | the difference in value between transaction inputs and outputs in satoshis; for coinbase transactions, this is the negative number of the total collected block fees, not including the block subsidy; if a key is not present, the fee is unknown and clients MUST NOT assume it is not present |
| "sigops"               | (numeric)          | the total number of sigops, as counted for the purposes of block limits; if a key is not present, the sigop count is unknown and clients MUST NOT assume they are not present.                                                                                                                   |
| "foundersreward"       | (numeric)          | the founder's reward that should be paid out in this block; this key is present only in the blocks that payout the founder's reward; present only in chains with [ac_founders](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-founders) enabled                           |
| "coinbasevalue"        | (numeric)          | the value of the coinbase transaction (in satoshis)                                                                                                                                                                                                                                              |
| "required"             | (boolean)          | if provided and true, this transaction must be in the final block                                                                                                                                                                                                                                |
| "target"               | (string)           | the hash target                                                                                                                                                                                                                                                                                  |
| "mintime"              | (numeric)          | the minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                                                                    |
| "mutable": [ ... ]     | (array of strings) | a list of ways the block template may be changed                                                                                                                                                                                                                                                 |
| "value"                | (string)           | a way the block template may be changed, e.g. "time", "transactions", "prevblock"                                                                                                                                                                                                                |
| "noncerange"           | (string)           | a range of valid nonces                                                                                                                                                                                                                                                                          |
| "sigoplimit"           | (numeric)          | the limit of sigops in blocks                                                                                                                                                                                                                                                                    |
| "sizelimit"            | (numeric)          | the limit of block size                                                                                                                                                                                                                                                                          |
| "curtime"              | (numeric)          | current timestamp in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                                                                                                        |
| "bits"                 | (string)           | the compressed target of the next block                                                                                                                                                                                                                                                          |
| "height"               | (numeric)          | the height of the next block                                                                                                                                                                                                                                                                     |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getblocktemplate '{"mode":"template","capabilities":["workid"]}'
```

<collapse-text hidden title="Response">

```json
{
  "capabilities": [
    "proposal"
  ],
  "version": 4,
  "previousblockhash": "0000000047fb6a9e0e287d156e9f436508d9b951f23547ab4497ea9a40ca0a75",
  "finalsaplingroothash": "3af01de42ae36b10d0204d5be9ff3a0219a5e28e3c8adfbdf8ea92f1e6d383f7",
  "transactions": [
    {
      "data": "0400008085202f8902ee8b7fd894f19dc0672d74a4494c4a45b34dcd13f4b9968ef131540a9d7da3500200000049483045022100a111feeccf2fcd27704771d828a02d91d99eea2ea7281b6f3b1fcad403c2db7a02203b2eac49016412a5605f6c731516e4ef2933937b4b13b501082d5520241141d901feffffff4de7b6e2e92052830f7efd387d50fa377c652006097213c77217a934b2e941c00000000049483045022100f44b9ac3d1b5f62bd7b7860eed973878e936879464f12e4ddf7400655102bd0102203ceb03b4af82ea7766107e57144d1a00809c69868d1f873a8bf3aaff6fde97ac01feffffff05e7f96d06000000001976a91420c653df40f0ca3c55835749c684adfc49d0d86888ac518841d4000000001976a914703468981f5f766499a7993bf79e5281ce5b676788acf170c622000000001976a914cd818f68ceed00225c8f2bd38d911539f03b0e0888acfe09f8000000000023210277e96de3f6c0978285c4dfae0693d35580eada1b048912ca8743043fe69d4f3eac1d598f02000000001976a9141c66bdd25733a4d1c5b246fbb9de9d20924d2ad488ac406790617e2402000000000000000000000000",
      "hash": "d657db0eb58cfab75ce5e021adca4bbe3f5636fb782c0ae04f4056faa341c870",
      "depends": [
      ],
      "fee": 5000,
      "sigops": 5
    }
  ],
  "coinbasetxn": {
    "data": "0400008085202f89010000000000000000000000000000000000000000000000000000000000000000ffffffff0603b623020101ffffffff0108ee51fd00000000232102236bad8eb61b59c3b6d43bf733c78a0df5c3732d3b5bf358650f52e73e88ed03acfd679061000000000000000000000000000000",
    "hash": "766b280f3074677d4988a7e182392c393028979cec53fadde55633d2ad704474",
    "depends": [
    ],
    "fee": -5000,
    "sigops": 1,
    "coinbasevalue": 4250000000,
    "required": true
  },
  "longpollid": "0000000047fb6a9e0e287d156e9f436508d9b951f23547ab4497ea9a40ca0a7526",
  "target": "000000000360f100000000000000000000000000000000000000000000000000",
  "mintime": 1636853569,
  "mutable": [
    "time",
    "transactions",
    "prevblock"
  ],
  "noncerange": "00000000ffffffff",
  "sigoplimit": 60000,
  "sizelimit": 4194304,
  "curtime": 1636853757,
  "bits": "1c0360f1",
  "height": 140214
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
  "capabilities": [
    "proposal"
  ],
  "version": 4,
  "previousblockhash": "0000000047fb6a9e0e287d156e9f436508d9b951f23547ab4497ea9a40ca0a75",
  "finalsaplingroothash": "3af01de42ae36b10d0204d5be9ff3a0219a5e28e3c8adfbdf8ea92f1e6d383f7",
  "transactions": [
    {
      "data": "0400008085202f8902ee8b7fd894f19dc0672d74a4494c4a45b34dcd13f4b9968ef131540a9d7da3500200000049483045022100a111feeccf2fcd27704771d828a02d91d99eea2ea7281b6f3b1fcad403c2db7a02203b2eac49016412a5605f6c731516e4ef2933937b4b13b501082d5520241141d901feffffff4de7b6e2e92052830f7efd387d50fa377c652006097213c77217a934b2e941c00000000049483045022100f44b9ac3d1b5f62bd7b7860eed973878e936879464f12e4ddf7400655102bd0102203ceb03b4af82ea7766107e57144d1a00809c69868d1f873a8bf3aaff6fde97ac01feffffff05e7f96d06000000001976a91420c653df40f0ca3c55835749c684adfc49d0d86888ac518841d4000000001976a914703468981f5f766499a7993bf79e5281ce5b676788acf170c622000000001976a914cd818f68ceed00225c8f2bd38d911539f03b0e0888acfe09f8000000000023210277e96de3f6c0978285c4dfae0693d35580eada1b048912ca8743043fe69d4f3eac1d598f02000000001976a9141c66bdd25733a4d1c5b246fbb9de9d20924d2ad488ac406790617e2402000000000000000000000000",
      "hash": "d657db0eb58cfab75ce5e021adca4bbe3f5636fb782c0ae04f4056faa341c870",
      "depends": [
      ],
      "fee": 5000,
      "sigops": 5
    }
  ],
  "coinbasetxn": {
    "data": "0400008085202f89010000000000000000000000000000000000000000000000000000000000000000ffffffff0603b623020101ffffffff0108ee51fd00000000232102236bad8eb61b59c3b6d43bf733c78a0df5c3732d3b5bf358650f52e73e88ed03acfd679061000000000000000000000000000000",
    "hash": "766b280f3074677d4988a7e182392c393028979cec53fadde55633d2ad704474",
    "depends": [
    ],
    "fee": -5000,
    "sigops": 1,
    "coinbasevalue": 4250000000,
    "required": true
  },
  "longpollid": "0000000047fb6a9e0e287d156e9f436508d9b951f23547ab4497ea9a40ca0a7526",
  "target": "000000000360f100000000000000000000000000000000000000000000000000",
  "mintime": 1636853569,
  "mutable": [
    "time",
    "transactions",
    "prevblock"
  ],
  "noncerange": "00000000ffffffff",
  "sigoplimit": 60000,
  "sizelimit": 4194304,
  "curtime": 1636853757,
  "bits": "1c0360f1",
  "height": 140214
},
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## getlocalsolps

**getlocalsolps**

The `getlocalsolps` method returns the average local solutions per second since this node was started.

::: tip
This is the same information shown on the metrics screen (if enabled).
:::

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |

### Response

| Name   | Type      | Description                      |
| ------ | --------- | -------------------------------- |
| "data" | (numeric) | the solutions-per-second average |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getlocalsolps
```

<collapse-text hidden title="Response">

```bash
0.4141607577247555
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getlocalsolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": 0.4141607577247555,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## getmininginfo

**getmininginfo**

The `getmininginfo` method returns a json object containing mining-related information.

### Arguments

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| (none) | (none) |

### Response

| Name               | Type      | Description                                                                                                                                                                                                                                                  |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "blocks"           | (numeric) | the current block                                                                                                                                                                                                                                            |
| "currentblocksize" | (numeric) | the last block size                                                                                                                                                                                                                                          |
| "currentblocktx"   | (numeric) | the last block transaction                                                                                                                                                                                                                                   |
| "difficulty"       | (numeric) | the current difficulty                                                                                                                                                                                                                                       |
| "errors":          |           |
| "generate"         | (boolean) | if the generation is on or off (see [getgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#getgenerate) or [setgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#setgenerate) calls)                            |
| "genproclimit"     | (numeric) | the processor limit for generation; `-1` if no generation (see [getgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#getgenerate) or [setgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#setgenerate) calls) |
| "localsolps"       | (numeric) | the average local solution rate (solutions per second) since this node was started                                                                                                                                                                           |
| "networksolps"     | (numeric) | the estimated network solution rate (solutions per second)                                                                                                                                                                                                   |
| "pooledtx":        |           |
| "testnet"          | (boolean) | if using testnet or not                                                                                                                                                                                                                                      |
| "chain"            | (string)  | the current network name as defined in BIP70 (main, test, regtest)                                                                                                                                                                                           |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getmininginfo
```

<collapse-text hidden title="Response">

```json
{
  "blocks": 140213,
  "currentblocksize": 1437,
  "currentblocktx": 1,
  "difficulty": 82006055.27537839,
  "errors": "",
  "genproclimit": -1,
  "localsolps": 0,
  "networksolps": 23116169,
  "networkhashps": 23116169,
  "pooledtx": 1,
  "testnet": false,
  "chain": "main",
  "staking": false,
  "generate": false,
  "numthreads": -1
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
  "blocks": 140213,
  "currentblocksize": 1437,
  "currentblocktx": 1,
  "difficulty": 82006055.27537839,
  "errors": "",
  "genproclimit": -1,
  "localsolps": 0,
  "networksolps": 23116169,
  "networkhashps": 23116169,
  "pooledtx": 1,
  "testnet": false,
  "chain": "main",
  "staking": false,
  "generate": false,
  "numthreads": -1
},
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## getnetworksolps

**getnetworksolps ( blocks height )**

The `getnetworksolps` method returns the estimated network solutions per second based on the last `n` blocks.

Pass in `blocks` to override the default number of blocks. Use -1 to calculate according to the relevant difficulty averaging window.
Pass in `height` to estimate the network speed at the time when a certain block was found.

### Arguments

| Name   | Type                             | Description                                                                                       |
| ------ | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| blocks | (numeric, optional, default=120) | the number of blocks; use `-1` to calculate according to the relevant difficulty averaging window |
| height | (numeric, optional, default=-1)  | the block height that corresponds to the requested data                                           |

### Response

| Name | Type      | Description                     |
| ---- | --------- | ------------------------------- |
| data | (numeric) | solutions per second, estimated |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getnetworksolps
```

<collapse-text hidden title="Response">

```bash
17547717
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworksolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": 17547717,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## prioritisetransaction

**prioritisetransaction "transaction_id" priority_delta fee_delta**

The `prioritisetransaction` method instructs the daemon to accept the indicated transaction into mined blocks at a higher (or lower) priority. The transaction selection algorithm considers the transaction as it would have a higher priority.

::: tip
This method is inherited from the original Bitcoin protocol, of which KMD is a fork (via Zcash) and such Komodo smartchains such as Tokel. For more examples regarding this method, please see <a href="https://bitcoincore.org/en/doc/0.16.1/rpc/mining/prioritisetransaction/">the linked documentation</a>.
:::

### Arguments

| Name             | Type                | Description                                                                                                                                                                                                           |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "transaction_id" | (string, required)  | the transaction id                                                                                                                                                                                                    |
| priority_delta   | (numeric, required) | the priority to add or subtract (if negative). The transaction selection algorithm assigns the tx a higher or lower priority. The transaction priority calculation: `coinage * value_in_satoshis / txsize`            |
| fee_delta        | (numeric, required) | the fee value in satoshis to add or subtract (if negative); the fee is not actually paid, only the algorithm for selecting transactions into a block considers the transaction as if it paid a higher (or lower) fee. |

### Response

| Name | Type      | Description  |
| ---- | --------- | ------------ |
| true | (boolean) | returns true |

#### :pushpin: Examples

Command:

```bash
./tokel-cli prioritisetransaction "7dc902b280da27cf2dabe41ed6f4d04c828714f289435db193a49341005607eb" 0.0 10000
```

<collapse-text hidden title="Response">

```bash
true
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["7dc902b280da27cf2dabe41ed6f4d04c828714f289435db193a49341005607eb", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## submitblock

**submitblock "hexdata" ( "jsonparametersobject" )**

The `submitblock` method instructs the daemon to propose a new block to the network.

::: tip
The <b>jsonparametersobject</b> parameter is currently ignored. See <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki">the linked documentation</a> for full specification details.
:::

::: tip
Note: for more information on <b>submitblock</b> parameters and results, see <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki#block-submission">the linked documentation</a>.
:::

### Arguments

| Name                             | Type                         | Description                                                           |
| -------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| "hexdata"                        | (string, required)           | the hex-encoded block data to submit                                  |
| "jsonparametersobject" : { ... } | (string, optional)           | object of optional parameters                                         |
| "workid"                         | (string, sometimes optional) | if the server provides a workid, it MUST be included with submissions |

### Response

| Name                     | Type | Description                                                                          |
| ------------------------ | ---- | ------------------------------------------------------------------------------------ |
| "duplicate"              |      | the node already has a valid copy of the block                                       |
| "duplicate-invalid"      |      | the node already has the block, but it is invalid                                    |
| "duplicate-inconclusive" |      | the node already has the block but has not validated it                              |
| "inconclusive"           |      | the node has not validated the block, it may not be on the node's current best chain |
| "rejected"               |      | the block was rejected as invalid                                                    |

#### :pushpin: Examples

Command:

```bash
./tokel-cli submitblock "0400000029865a4962f43d6f95fdf9ccc89f82377a23d1fdc41eaf943c7881a5ca55c5018973d81f5ce7ab99f027b15c86ca88ec5e4b6f35ad4018bfc2058568bbe7f526000000000000000000000000000000000000000000000000000000000000000097954a5b9e830c1d1600ac305580abea34bda62eb503b02fc4b7872428cfa60bf5824a9b78fc0000fd400500c80d4a8c84cec781a5740d8d3fb18587a850b6380f073cd861c4ce7c4290460c533e0d4dd3b89fe0f0052ccdf9d450a1dfcd7263a39422000378da3eeb621078af689447a5ed0a7265a857463a36d72cdd35910d14de9816a25d631aeb0249ede829aca77f9cce1a2e4a84b75e4bd515845043d52f718638fb41e92d8b18bfe1f49e1c0d23223a285b2850e8469dfbb9782b20c8bebf2a61d7b7d8eea310c7c8d5bfa612bf94fd05562ec8876eacafa0c334a651ef70c941459161b60c20511087d63223878052d4fd1a92298789d7c57609fe3a247489674592e8e34a1728b28e2c2b3165f01d5fefa22e6384f7fe4e566de1741e264f057a0feb1b35d51694647ba52afd71c3bd375b924da95e2b413dbea256a2de9ccddcab88bd2e69cc3acc8a778b4d1db78b41df9fea6d69b071f570f628ad47537d081740a4f2c4fa6666dbb862a6d02ff07b5ae0a9fa24b003fa0355dbde0425d6c14452f0d357f2cfd97960c343ba73789a2d7ba580ea8834ef656a9e79c49fc0f61aa9452a644c8bc06afe31dce2a7ca5d6995adc8ce1f77165a075399e1d006e2bb57c09ffd6e21fcff440645faef599264a3b8c005cf60683371ba1af8847d1992c64e512f13d9d2d364969759233a27c65e1f2f1113cdb665e3e8f7baa2c398c4a2ee85a6ad1bdb095962fafaa01c3d85bc820653544b89b6e75a584d8d04bc77e5284a9ebbcd46c1a6732b841e46c876976805d932a90ac215bcc37801900d49cfb87fe5c809b30ebd8ece38669153c1f1a2438253a56a6507d556cc16b2990f0bd290fea59462d25eebdbfcb78eb403c8080e0c68e8e2ef8f67145121bce83b94dc8f9d0a742752323c5a4b42409ffcc37053c58596deff7981a20e3f412c07c839a341fdc177d5e28f7909696f90c90efff14048f440e7ea3181378f66d35b0697dc02c60154778f438cdd3dba5dc4c2763319498bbb3b8fae17508b073d07d83f5f1dc71bf2dc205f06245872620dfa341dbcdf9c574598c121120e91dd687dfd08451369ab29a11dc73f69d0722992a1c70cf1498ec9b9143fcb0abfd7b1e39189125e8567cb2cc3d71fcdb541a0776a5a665161f98385633153fc9702f079269a1dac0d2c708f5d94e346159858cfd50624ff5a0505358739b5f41adbe739bf75852eebb06eeccd79e030019a5227cd9a19e77b6821ba0794fe09cb074f40ce0b92c081c31cda2d4711d53889fc6f0579839fa74309768ef0a796fa1fa660e150d3ea5c0a369e1297d11177fc284524d6d5e40eb7ee4b400f6dfd6a10402904394e1694de300ddd565622e7ca7ed62970ff5add0b36a513b5d90d2194cf414ecc97e5dcc88698e06405dea09f49503c81cc61518f8aee882da6eeae09b4127a7fcc0c0829fca8fda3502ebf13ece0a90a8dfd05d8e514452247f79472c20683e2b1fde5ec14a2453bf00f9f1cd5a088d229a7fdfdfdc24f176fb9a8a409af70d894998957394d30a46668d71cd16907aa800ee9d96c2b9fc7fb5a7944a9b8d4f76609fc186e3c0a4d80fb9c8c236f76eb00bc24dd9abddef7d653740ece7141ac6175f7e9cab1cb0216e85adde43907b60c0581336b50ccd7682f28f00f7efd663df4d31701141657da989d236d16052c4b59fc46fb41657a26d7074fbc9dee602f7d03b86179e4c12bc0df253f815319dff12353a478d95febd5f902e363734e6e5ef4bf1865eb70750b9238be3382a51ded182569d112f37870d43465615ca9174d41f7f3b9eb780a28c7dba674075bbe04538ad669eef7716d1b7b252d49da3b00993f0c829860a1efafdcdc865d46f2f8aec9893b5bc607db33272e5b9f7cf134595e1ad5e8f34b1b7f93ca181c513afc4d8a531c36929e95cfbb4d268a9d94f80201000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0603860f0e0101ffffffff0188b6e1110000000023210383d0b37f59f4ee5e3e98a47e461c861d49d0d90c80e9e16f7e63686a2dc071f3ac67954a5b01000000010b1561554a46ec535c4972a3a16652b270ee4af847ec3bbfcf6ba663ebcfefcb1a00000049483045022100b9cd7c1c56d69d9b05d695f9ac86c1233427ec26860774a0eb4e6052fe11ca8502207eca5a4eda1ccf92ccdb501ab7d61cf084d0f4431f059e27ee13ce11f9aa159b01ffffffff0188130000000000002321020e46e79a2a8d12b9b5d12c7a91adb4e454edfae43c0a0cb805427d2ac7613fd9ac00000000"
```

<collapse-text hidden title="Response">

```bash
duplicate
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["0400000029865a4962f43d6f95fdf9ccc89f82377a23d1fdc41eaf943c7881a5ca55c5018973d81f5ce7ab99f027b15c86ca88ec5e4b6f35ad4018bfc2058568bbe7f526000000000000000000000000000000000000000000000000000000000000000097954a5b9e830c1d1600ac305580abea34bda62eb503b02fc4b7872428cfa60bf5824a9b78fc0000fd400500c80d4a8c84cec781a5740d8d3fb18587a850b6380f073cd861c4ce7c4290460c533e0d4dd3b89fe0f0052ccdf9d450a1dfcd7263a39422000378da3eeb621078af689447a5ed0a7265a857463a36d72cdd35910d14de9816a25d631aeb0249ede829aca77f9cce1a2e4a84b75e4bd515845043d52f718638fb41e92d8b18bfe1f49e1c0d23223a285b2850e8469dfbb9782b20c8bebf2a61d7b7d8eea310c7c8d5bfa612bf94fd05562ec8876eacafa0c334a651ef70c941459161b60c20511087d63223878052d4fd1a92298789d7c57609fe3a247489674592e8e34a1728b28e2c2b3165f01d5fefa22e6384f7fe4e566de1741e264f057a0feb1b35d51694647ba52afd71c3bd375b924da95e2b413dbea256a2de9ccddcab88bd2e69cc3acc8a778b4d1db78b41df9fea6d69b071f570f628ad47537d081740a4f2c4fa6666dbb862a6d02ff07b5ae0a9fa24b003fa0355dbde0425d6c14452f0d357f2cfd97960c343ba73789a2d7ba580ea8834ef656a9e79c49fc0f61aa9452a644c8bc06afe31dce2a7ca5d6995adc8ce1f77165a075399e1d006e2bb57c09ffd6e21fcff440645faef599264a3b8c005cf60683371ba1af8847d1992c64e512f13d9d2d364969759233a27c65e1f2f1113cdb665e3e8f7baa2c398c4a2ee85a6ad1bdb095962fafaa01c3d85bc820653544b89b6e75a584d8d04bc77e5284a9ebbcd46c1a6732b841e46c876976805d932a90ac215bcc37801900d49cfb87fe5c809b30ebd8ece38669153c1f1a2438253a56a6507d556cc16b2990f0bd290fea59462d25eebdbfcb78eb403c8080e0c68e8e2ef8f67145121bce83b94dc8f9d0a742752323c5a4b42409ffcc37053c58596deff7981a20e3f412c07c839a341fdc177d5e28f7909696f90c90efff14048f440e7ea3181378f66d35b0697dc02c60154778f438cdd3dba5dc4c2763319498bbb3b8fae17508b073d07d83f5f1dc71bf2dc205f06245872620dfa341dbcdf9c574598c121120e91dd687dfd08451369ab29a11dc73f69d0722992a1c70cf1498ec9b9143fcb0abfd7b1e39189125e8567cb2cc3d71fcdb541a0776a5a665161f98385633153fc9702f079269a1dac0d2c708f5d94e346159858cfd50624ff5a0505358739b5f41adbe739bf75852eebb06eeccd79e030019a5227cd9a19e77b6821ba0794fe09cb074f40ce0b92c081c31cda2d4711d53889fc6f0579839fa74309768ef0a796fa1fa660e150d3ea5c0a369e1297d11177fc284524d6d5e40eb7ee4b400f6dfd6a10402904394e1694de300ddd565622e7ca7ed62970ff5add0b36a513b5d90d2194cf414ecc97e5dcc88698e06405dea09f49503c81cc61518f8aee882da6eeae09b4127a7fcc0c0829fca8fda3502ebf13ece0a90a8dfd05d8e514452247f79472c20683e2b1fde5ec14a2453bf00f9f1cd5a088d229a7fdfdfdc24f176fb9a8a409af70d894998957394d30a46668d71cd16907aa800ee9d96c2b9fc7fb5a7944a9b8d4f76609fc186e3c0a4d80fb9c8c236f76eb00bc24dd9abddef7d653740ece7141ac6175f7e9cab1cb0216e85adde43907b60c0581336b50ccd7682f28f00f7efd663df4d31701141657da989d236d16052c4b59fc46fb41657a26d7074fbc9dee602f7d03b86179e4c12bc0df253f815319dff12353a478d95febd5f902e363734e6e5ef4bf1865eb70750b9238be3382a51ded182569d112f37870d43465615ca9174d41f7f3b9eb780a28c7dba674075bbe04538ad669eef7716d1b7b252d49da3b00993f0c829860a1efafdcdc865d46f2f8aec9893b5bc607db33272e5b9f7cf134595e1ad5e8f34b1b7f93ca181c513afc4d8a531c36929e95cfbb4d268a9d94f80201000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0603860f0e0101ffffffff0188b6e1110000000023210383d0b37f59f4ee5e3e98a47e461c861d49d0d90c80e9e16f7e63686a2dc071f3ac67954a5b01000000010b1561554a46ec535c4972a3a16652b270ee4af847ec3bbfcf6ba663ebcfefcb1a00000049483045022100b9cd7c1c56d69d9b05d695f9ac86c1233427ec26860774a0eb4e6052fe11ca8502207eca5a4eda1ccf92ccdb501ab7d61cf084d0f4431f059e27ee13ce11f9aa159b01ffffffff0188130000000000002321020e46e79a2a8d12b9b5d12c7a91adb4e454edfae43c0a0cb805427d2ac7613fd9ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "duplicate",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>
