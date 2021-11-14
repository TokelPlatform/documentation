# Control

The following RPC calls interact with the Tokel blockchain daemon, and are made available through the `tokel-cli` software.

The Tokel blockchain inherits all Komodo smartchain RPC's, but not all RPC's are enabled. For simplicity, our documentation only shows those commands that are enabled and available for use.

## getinfo

**getinfo**

The `getinfo` method returns an object containing various state info.

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |

### Response

| Name              | Type               | Description                                                                                                                            |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| "version"         | (numeric)          | the server version                                                                                                                     |
| "protocolversion" | (numeric)          | the protocol version                                                                                                                   |
| "walletversion"   | (numeric)          | the wallet version                                                                                                                     |
| "balance"         | (numeric)          | the total balance of the wallet                                                                                                        |
| "blocks"          | (numeric)          | the current number of blocks processed in the server                                                                                   |
| "timeoffset"      | (numeric)          | the time offset                                                                                                                        |
| "connections"     | (numeric)          | the number of connections                                                                                                              |
| "proxy"           | (string, optional) | the proxy used by the server                                                                                                           |
| "difficulty"      | (numeric)          | the current difficulty                                                                                                                 |
| "testnet"         | (boolean)          | if the server is using testnet or not                                                                                                  |
| "keypoololdest"   | (numeric)          | the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool                                                |
| "keypoolsize"     | (numeric)          | how many new keys are pre-generated                                                                                                    |
| "unlocked_until"  | (numeric)          | the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked |
| "paytxfee"        | (numeric)          | the transaction fee set in COIN/kB                                                                                                     |
| "relayfee"        | (numeric)          | minimum relay fee for non-free transactions in COIN/kB                                                                                 |
| "errors"          | (string)           | any error messages                                                                                                                     |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getinfo
```

<collapse-text hidden title="Response">

```json
{
  "version": 3000000,
  "protocolversion": 170009,
  "KMDversion": "0.6.1",
  "synced": true,
  "notarized": 140182,
  "prevMoMheight": 140182,
  "notarizedhash": "00000003725dab6ed025087560b75e16310154d2e6e888e28a95609c15711863",
  "notarizedtxid": "8a55349e71eabc81374724f90bd7ad748b6404434522966cf05e1b2a23ac133b",
  "notarizedtxid_height": "mempool",
  "KMDnotarized_height": 0,
  "notarized_confirms": 0,
  "walletversion": 60000,
  "balance": 0.00000000,
  "blocks": 140201,
  "longestchain": 140201,
  "tiptime": 1636853252,
  "difficulty": 76306781.07289016,
  "keypoololdest": 1636524661,
  "keypoolsize": 101,
  "paytxfee": 0.00000000,
  "sapling": 61,
  "timeoffset": 0,
  "connections": 7,
  "proxy": "",
  "testnet": false,
  "relayfee": 0.00000100,
  "errors": "",
  "CCid": 555,
  "name": "TOKEL",
  "p2pport": 29404,
  "rpcport": 29405,
  "magic": -2034041392,
  "premine": 100000000,
  "eras": 2,
  "reward": "100000000,4250000000",
  "halving": "0,525600",
  "decay": "0,77700000",
  "endsubsidy": "80640,0",
  "notarypay": "0,0"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
  "version": 3000000,
  "protocolversion": 170009,
  "KMDversion": "0.6.1",
  "synced": true,
  "notarized": 140182,
  "prevMoMheight": 140182,
  "notarizedhash": "00000003725dab6ed025087560b75e16310154d2e6e888e28a95609c15711863",
  "notarizedtxid": "8a55349e71eabc81374724f90bd7ad748b6404434522966cf05e1b2a23ac133b",
  "notarizedtxid_height": "mempool",
  "KMDnotarized_height": 0,
  "notarized_confirms": 0,
  "walletversion": 60000,
  "balance": 0.00000000,
  "blocks": 140201,
  "longestchain": 140201,
  "tiptime": 1636853252,
  "difficulty": 76306781.07289016,
  "keypoololdest": 1636524661,
  "keypoolsize": 101,
  "paytxfee": 0.00000000,
  "sapling": 61,
  "timeoffset": 0,
  "connections": 7,
  "proxy": "",
  "testnet": false,
  "relayfee": 0.00000100,
  "errors": "",
  "CCid": 555,
  "name": "TOKEL",
  "p2pport": 29404,
  "rpcport": 29405,
  "magic": -2034041392,
  "premine": 100000000,
  "eras": 2,
  "reward": "100000000,4250000000",
  "halving": "0,525600",
  "decay": "0,77700000",
  "endsubsidy": "80640,0",
  "notarypay": "0,0"
},
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## help

**help ( "command" )**

The `help` method lists all commands, or all information for a specified command.

### Arguments

| Name      | Type               | Description                      |
| --------- | ------------------ | -------------------------------- |
| "command" | (string, optional) | the command requiring assistance |

### Response

| Name      | Type               | Description                      |
| --------- | ------------------ | -------------------------------- |
| "command" | (string, optional) | the command requiring assistance |

#### :pushpin: Examples

Command:

```bash
./tokel-cli help
```

<collapse-text hidden title="Response">

```bash
== Addressindex ==
getaddressbalance
getaddressdeltas
getaddressmempool
getaddresstxids
getaddressutxos
getsnapshot

== Auction ==
auctionaddress [pubkey]

== Blockchain ==
coinsupply <height>
getbestblockhash
getblock "hash|height" ( verbose )
getblockchaininfo
getblockcount

getblockhash index
getblockhashes timestamp
getblockheader "hash" ( verbose )
getchaintips
getdifficulty

........ (other responses omitted for brevity)
```

</collapse-text>

Command:

```bash
./tokel-cli help getaddressbalance
```

<collapse-text hidden title="Response">

```bash
Returns the balance for an address(es) (requires addressindex to be enabled).

Arguments:
{
  "addresses"
    [
      "address"  (string) The base58check encoded address
      ,...
    ]
}

Result:
{
  "balance"  (string) The current balance in satoshis
  "received"  (string) The total number of satoshis received (including change)
}

Examples:
> tokel-cli getaddressbalance '{"addresses": ["RY5LccmGiX9bUHYGtSWQouNy1yFhc5rM87"]}'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressbalance", "params": [{"addresses": ["RY5LccmGiX9bUHYGtSWQouNy1yFhc5rM87"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:7771/
```

</collapse-text>

## stop

**stop**

The `stop` method instructs the coin daemon to shut down.

The amount of time it takes to shut down the chain will vary depending on the chain's current state.

::: warning
Forcefully stopping the chain should be avoided, as it may corrupt the local database. In the event of a corrupted database, the user will need to <b>resync</b>.
:::

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |

### Response

| Name                          | Type | Description |
| ----------------------------- | ---- | ----------- |
| Tokel server stopping        |      |


#### :pushpin: Examples

Command:

```bash
./tokel-cli stop
```

<collapse-text hidden title="Response">

```bash
"Tokel server stopping"
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "stop", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{ "result": "Tokel server stopping", "error": null, "id": "curltest" }
```

</collapse-text>
