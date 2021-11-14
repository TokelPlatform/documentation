# Wallet

The following RPC calls interact with the Tokel blockchain daemon, and are made available through the `tokel-cli` software.

The Tokel blockchain inherits all Komodo smartchain RPC's, but not all RPC's are enabled. For simplicity, our documentation only shows those commands that are enabled and available for use.

## addmultisigaddress

**addmultisigaddress nrequired [ "key", ... ] \( "account" )**

The `addmultisigaddress` method adds a multi-signature address to the wallet, where `nrequired` indicates the number of keys (out of the total provided) required to execute a transaction.

The keys function as signatures, allowing multiple parties or entities to manage an account. Each key in the array can be an address or a hex-encoded public key.

::: tip
DEPRECATED: If <b>account</b> is specified, the method assigns the multi-signature address to that account.
:::

### Arguments

| Name | Type | Description | 
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nrequired    | (numeric, required) | the number of required keys (out of the `n` submitted)                                                                                                   |
| "keysobject" | (string, required)  | a json array of addresses or hex-encoded public keys                                                                                                     |
| "address"    | (string)            | the address or hex-encoded public key                                                                                                                    |
| "account"    | (string, optional)  | DEPRECATED: if provided, "account" MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |

### Response

| Name | Type | Description | 
| --------- | -------- | ----------------------------------- |
| "address" | (string) | an address associated with the keys |

#### :pushpin: Examples

Add a multisig address from 2 addresses:

Command:

```bash
./tokel-cli addmultisigaddress 2 '["RSWwtqsNr9mW21UXRm6Lz4AzQnj4pVzzkp","RW8d8EChHTooVbwF3reqHYgkzWCnJFLXgh"]'
```


<collapse-text hidden title="Response">


```bash
bLz2YZ7Mm8MgPc9mPNiFqhjFPbFZU4WUD5
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, ["RL4CuA2MSAbBiqJKQEr2TKnKT2fSwK99mG","RBYVFCxpJdLgvUixhguxzuH1TJpoNLYCJ6"]] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "bNdB9fAt9HmQD8CmBjkY6QwmrNSBrbzsgA",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## backupwallet

**backupwallet "destination"**

The `backupwallet` method safely copies the `wallet.dat` file to the indicated destination. The `destination` input accepts only alphanumeric characters.

::: tip
This method requires that the coin daemon have the <b>exportdir</b> runtime parameter enabled.
:::

### Arguments

| Name | Type | Description | 
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "destination" | (string, required) | the destination filename, saved in the directory set by the [exportdir](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#exportdir) runtime parameter |

### Response

| Name | Type | Description | 
| --------- | -------- | ------------------------------------- |
| "path"    | (string) | the full path of the destination file |

#### :pushpin: Examples

```bash
./tokel-cli backupwallet "mybackupdata"

/home/myusername/myexportdir/mybackupdata
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backupdata"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "/home/myusername/Desktop/backupdata",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## dumpprivkey

**dumpprivkey "address"**

The `dumpprivkey` method reveals the private key corresponding to the indicated `address`.

::: tip
See also <b>importprivkey</b>.
:::

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------------------- |
| "address" | (string, required) | the address for the private key |

### Response

| Name | Type | Description | 
| --------- | -------- | --------------- |
| "data"    | (string) | the private key |

#### :pushpin: Examples

Command:

```bash
./tokel-cli dumpprivkey "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"
```


<collapse-text hidden title="Response">


```bash
DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## dumpwallet

**dumpwallet "filename"**

The `dumpwallet` method dumps all transparent-address wallet keys into a file, using a human-readable format.

Overwriting an existing file is not permitted. The `destination` parameter accepts only alphanumeric characters.

::: tip
This method requires that the coin daemon have the [exportdir](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#exportdir) runtime parameter enabled.
:::

### Arguments

| Name | Type | Description | 
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| "filename" | (string, required) | the filename, saved in the folder set by the [exportdir](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#exportdir) runtime parameter |

### Response

| Name | Type | Description | 
| --------- | -------- | ------------------------------------- |
| "path"    | (string) | the full path of the destination file |

#### :pushpin: Examples

Command:

```bash
./tokel-cli dumpwallet "test"
```


<collapse-text hidden title="Response">


```bash
/home/myusername/myexportdir/test
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "/home/myusername/myexportdir/test",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## encryptwallet

**encryptwallet "passphrase"**

::: warning
Using the `encryptwallet` method will shutdown the Komodo daemon (`komodod`).
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `encryptwallet` method encrypts the wallet with the indicated `passphrase`.

For more information, please see these instructions: [Encrypt Komodo's wallet.dat File](https://docs.komodoplatform.com/komodo/encrypt-wallet.html)

This method is for first-time encryption only. After the first encryption, any calls that interact with private keys will require the passphrase via [walletpassphrase](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#walletpassphrase) prior to calling the corresponding method. This includes methods that create a transaction, dump a private key for an address, sign a transaction, etc.

### Arguments

| Name | Type | Description | 
| ---------- | -------- | ----------------------------------------------------------------------------------------------------- |
| passphrase | (string) | the passphrase for wallet encryption; the passphrase must be at least 1 character, but should be many |

### Response

| Text Response                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup. |

#### :pushpin: Examples

##### Encrypt your wallet

Command:

```bash
./tokel-cli encryptwallet "mypassphrase"
```


<collapse-text hidden title="Response">


```bash
wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup.
```

</collapse-text>


##### Unlock the wallet for 60 seconds

Command:

```bash
./tokel-cli walletpassphrase "mypassphrase" 60
```


<collapse-text hidden title="Response">


```bash
(disabled)
```

</collapse-text>


##### Lock the wallet again by removing the passphrase

Command:

```bash
./tokel-cli walletlock
```


<collapse-text hidden title="Response">


```bash
(No response)
```

</collapse-text>


As a json rpc call:

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["mypassphrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```bash
{
    "result":"wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup.",
    "error":null,
    "id":"curltest"
}
```

</collapse-text>


## getbalance

**getbalance ( "account" minconf includeWatchonly )**

The `getbalance` method returns the server's total available balance.

::: tip
The <b>account</b> input is deprecated.
:::

### Arguments

| Name | Type | Description | 
| ---------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| "account"        | (string, optional)              | DEPRECATED if provided, it MUST be set to the empty string `""` or to the string `"*"` |
| minconf          | (numeric, optional, default=1)  | only include transactions confirmed at least this many times                           |
| includeWatchonly | (bool, optional, default=false) | also include balance in watchonly addresses (see `importaddress`)                      |

### Response

| Name | Type | Description | 
| --------- | --------- | ---------------- |
| amount    | (numeric) | the total amount |

#### :pushpin: Examples

The total amount in the wallet:

Command:

```bash
./tokel-cli getbalance

```


<collapse-text hidden title="Response">


```bash
10.05000000
```

</collapse-text>


The total amount in the wallet where at least five blocks are confirmed:

Command:

```bash
./tokel-cli getbalance "*" 5
```


<collapse-text hidden title="Response">


```bash
10.05000000
```

</collapse-text>


As a json rpc call:

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": 10.09234883,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getnewaddress

**getnewaddress ( "account" )**

The `getnewaddress` method returns a new address for receiving payments.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "account" | (string, optional) | DEPRECATED: If provided, the account MUST be set to the empty string `""` to represent the default account; passing any other string will result in an error |

### Response

| Name | Type | Description | 
| --------- | -------- | --------------- |
| "address" | (string) | the new address |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getnewaddress
```


<collapse-text hidden title="Response">


```bash
"RYDuQ2oQCCz1PQNxUQTDAaRinWKiCoT2E6"
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "R9iQRG6J9eY8SwaCcYZ65QJxg5UhgLC5Rx",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getrawchangeaddress

**getrawchangeaddress**

The `getrawchangeaddress` returns a new address that can be used to receive change.

::: tip
This is for use with raw transactions, NOT normal use.
:::

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------- | -------- | ----------- |
| "address" | (string) | the address |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getrawchangeaddress
```


<collapse-text hidden title="Response">


```bash
RS8oqzbjShKhftmuk2RpRmHH2hTAukp6yP
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getreceivedbyaddress

**getreceivedbyaddress "address" ( minconf )**

The `getreceivedbyaddress` method returns the total amount received by the given `address` in transactions with at least `minconf` confirmations.

### Arguments

| Name | Type | Description | 
| --------- | ------------------------------ | ------------------------------------------------------------ |
| "address" | (string, required)             | the address for transactions                                 |
| minconf   | (numeric, optional, default=1) | only include transactions confirmed at least this many times |

### Response

| Name | Type | Description | 
| --------- | --------- | -------------------------------------------------------------- |
| amount    | (numeric) | the total amount of the relevant coin received at this address |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"
```


<collapse-text hidden title="Response">


```bash
10.0500000
```

</collapse-text>


Command:

```bash
./tokel-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 0
```


<collapse-text hidden title="Response">


```bash
10.0500000
```

</collapse-text>


Command:

```bash
./tokel-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 6
```


<collapse-text hidden title="Response">


```bash
10.0500000
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": 0,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## gettransaction

**gettransaction "txid" ( includeWatchonly )**

The `gettransaction` method queries detailed information about transaction `txid`. This command applies only to `txid`'s that are in the user's local wallet.

### Arguments

| Name | Type | Description | 
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| "txid"             | (string, required)              | the transaction id                                                                                                |
| "includeWatchonly" | (bool, optional, default=false) | whether to include watchonly addresses in the returned balance calculation and in the `details[]` returned values |

### Response

| Name | Type | Description | 
| ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "amount"                | (numeric)               | the transaction amount                                                                                                            |
| "confirmations"         | (numeric)               | a confirmation number that is aware of the dPoW security service |
| "rawconfirmations"      | (numeric)               | the raw confirmations (number of blocks on top of this transaction's block)                                                       |
| "blockhash"             | (string)                | the block hash                                                                                                                    |
| "blockindex"            | (numeric)               | the block index                                                                                                                   |
| "blocktime"             | (numeric)               | the time in seconds since epoch (1 Jan 1970 GMT)                                                                                  |
| "txid"                  | (string)                | the transaction id                                                                                                                |
| "time"                  | (numeric)               | the transaction time in seconds since epoch (1 Jan 1970 GMT)                                                                      |
| "timereceived"          | (numeric)               | the time received in seconds since epoch (1 Jan 1970 GMT)                                                                         |
| "details" : [ ... ]     | (array)                 |
| "account"               | (string)                | DEPRECATED the account name involved in the transaction; can be "" for the default account                                        |
| "address"               | (string)                | the address involved in the transaction                                                                                           |
| "category"              | (string)                | the category - either `send` or `receive`                                                                                         |
| "amount"                | (numeric)               | the amount                                                                                                                        |
| "vout"                  | (numeric)               | the vout value                                                                                                                    |
| "vjoinsplit" : [ ... ]  | (array of json objects) |
| "anchor"                | (string)                | merkle root of note commitment tree                                                                                               |
| "nullifiers" : [ ... ]  | (array of strings)      | <!--Need these? If not, let's leave a comment here saying why they're not needed, so that next time we don't forget. -->
| "hex"                   | (string)                |
| "commitments" : [ ... ] | (array of strings)      |
| "hex"                   | (string)                |
| "macs" : [ ... ]        | (array of strings)      |
| "hex"                   | (string)                |
| "vpub_old"              | (numeric)               | the amount removed from the transparent value pool                                                                                |
| "vpub_new"              | (numeric)               | the amount added to the transparent value pool                                                                                    |
| "hex"                   | (string)                | transaction data translated into hex                                                                                                          |

#### :pushpin: Examples

Command:

```bash
./tokel-cli gettransaction "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
```


<collapse-text hidden title="Response">


```json
{
  "amount": 0.000001,
  "rawconfirmations": 14,
  "confirmations": 1,
  "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
  "blockindex": 1,
  "blocktime": 1552585479,
  "expiryheight": 1268793,
  "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
  "walletconflicts": [],
  "time": 1552585444,
  "timereceived": 1552585444,
  "vjoinsplit": [],
  "details": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "size": 254
    }
  ],
  "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
}
```

</collapse-text>


Command:

```bash
./tokel-cli gettransaction "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a" true
```


<collapse-text hidden title="Response">


```json
{
  "amount": 0.000001,
  "rawconfirmations": 14,
  "confirmations": 1,
  "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
  "blockindex": 1,
  "blocktime": 1552585479,
  "expiryheight": 1268793,
  "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
  "walletconflicts": [],
  "time": 1552585444,
  "timereceived": 1552585444,
  "vjoinsplit": [],
  "details": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "size": 254
    }
  ],
  "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "amount": 0.000001,
    "rawconfirmations": 19,
    "confirmations": 1,
    "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
    "blockindex": 1,
    "blocktime": 1552585479,
    "expiryheight": 1268793,
    "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
    "walletconflicts": [],
    "time": 1552585444,
    "timereceived": 1552585444,
    "vjoinsplit": [],
    "details": [
      {
        "account": "",
        "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
        "category": "receive",
        "amount": 0.000001,
        "vout": 1,
        "size": 254
      }
    ],
    "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getunconfirmedbalance

**getunconfirmedbalance**

The `getunconfirmedbalance` method returns the server's total unconfirmed balance.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getunconfirmedbalance
```


<collapse-text hidden title="Response">


```bash
10.05000000
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getunconfirmedbalance", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": 10.05,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getwalletinfo

**getwalletinfo**

The `getwalletinfo` method returns an object containing various information about the wallet state.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| "walletversion"       | (numeric) | the wallet version                                                                                                                     |
| "balance"             | (numeric) | the total confirmed balance of the wallet                                                                                              |
| "unconfirmed_balance" | (numeric) | the total unconfirmed balance of the wallet                                                                                            |
| "immature_balance"    | (numeric) | the total immature balance of the wallet                                                                                               |
| "txcount"             | (numeric) | the total number of transactions in the wallet                                                                                         |
| "keypoololdest"       | (numeric) | the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool                                                |
| "keypoolsize"         | (numeric) | how many new keys are pre-generated                                                                                                    |
| "unlocked_until"      | (numeric) | the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked |
| "paytxfee"            | (numeric) | the transaction fee configuration, given as the relevant COIN per KB                                                               |

#### :pushpin: Examples

Command:

```bash
./tokel-cli getwalletinfo
```


<collapse-text hidden title="Response">


```json
{
  "walletversion": 60000,
  "balance": 10.01334496,
  "unconfirmed_balance": 0.0,
  "immature_balance": 0.0001,
  "txcount": 106,
  "keypoololdest": 1536889653,
  "keypoolsize": 101,
  "paytxfee": 0.0
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "walletversion": 60000,
    "balance": 10.01334496,
    "unconfirmed_balance": 0,
    "immature_balance": 0.0001,
    "txcount": 106,
    "keypoololdest": 1536889653,
    "keypoolsize": 101,
    "paytxfee": 0
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## importaddress

**importaddress "address" ( "label" rescan )**

The `importaddress` method adds an address or script (in hex) that can be watched as if it were in your wallet, although it cannot be used to spend.

::: tip
This call can take an increased amount of time to complete if rescan is true.
:::

### Arguments

| Name | Type | Description | 
| --------- | --------------------------------- | ---------------------------------- |
| "address" | (string, required)                | the address to watch               |
| "label"   | (string, optional, default="")    | an optional label                  |
| rescan    | (boolean, optional, default=true) | rescan the wallet for transactions |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Import an address with rescan:

Command:

```bash
./tokel-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


Command:

```bash
./tokel-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" "testing" false
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["R9z796AehK5b6NCPeVkGUHSpJnawerf8oP", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## importprivkey

**importkey "komodoprivkey" ( "label" rescan )**

The `importprivkey` method adds a private key to your wallet.

::: tip
This call can take minutes to complete if <b>rescan</b> is true.
:::

::: tip
See also <b>dumpprivkey</b>.
:::

### Arguments

| Name | Type | Description | 
| --------- | --------------------------------- | -------------------------------------------------------------------------- |
| "privkey" | (string, required)                | the private key (see [dumpprivkey](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#dumpprivkey)) |
| "label"   | (string, optional, default="")    | an optional label                                                          |
| rescan    | (boolean, optional, default=true) | rescan the wallet for transactions                                         |
| block     | (integer, optional)               | block height to rescan from                                               |

### Response

| Name | Type | Description | 
| --------- | -------- | ------------------ |
| addresses | (string) | the public address |

#### :pushpin: Examples

Command:

```bash
./tokel-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2"
```


<collapse-text hidden title="Response">


```bash
R9z796AehK5b6NCPeVkGUHSpJnawerf8oP
```

</collapse-text>


Command:

```bash
./tokel-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2" "testing" false
```


<collapse-text hidden title="Response">


```bash
RFtA32tttJm89VWRWPCQtV8bkQ1FvE1MBG
```

</collapse-text>

Command:

```bash
./tokel-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2" "testing" true 1762762
```


<collapse-text hidden title="Response">


```bash
RFtA32tttJm89VWRWPCQtV8bkQ1FvE1MBG
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["UwibHKsYfiM19BXQmcUwAfw331GzGQK8aoPqqYEbyoPrzc2965nE", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "RC5qhqgYRzf3dUXGAst9ah5LcuLjmMgT64",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## importwallet

**importwallet "filename"**

The `importwallet` method imports transparent-address keys from a wallet-dump file (see [dumpwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#dumpwallet)).

### Arguments

| Name | Type | Description | 
| ---------- | ------------------ | --------------- |
| "filename" | (string, required) | the wallet file |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli importwallet "path/to/exportdir/nameofbackup"
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["path/to/exportdir/nameofbackup"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## keypoolrefill

**keypoolrefill ( newsize )**

The `keypoolrefill` method refills the keypool.

### Arguments

| Name | Type | Description | 
| --------- | -------------------------------- | -------------------- |
| newsize   | (numeric, optional, default=100) | the new keypool size |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli keypoolrefill
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


Command:

```bash
./tokel-cli keypoolrefill 100
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>



You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [6] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```bash
(deprecated)
```

</collapse-text>


## listaddressgroupings

**listaddressgroupings**

The `listaddressgroupings` method lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| ---------- | ------------------ | ------------------------ |
| "address", | (string)           | the address              |
| amount,    | (numeric)          | the amount               |
| "account"  | (string, optional) | (DEPRECATED) the account |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listaddressgroupings
```


<collapse-text hidden title="Response">


(note how there are two separate, unique groupings of addresses)

```bash
[
  [
    [
      "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
      9.99304496
    ],
    [
      "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7",
      0.00040000,
      ""
    ],
    [
      "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
      0.01000000
    ]
  ],
  [
    [
      "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      0.00990000,
      ""
    ]
  ]
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    [
      ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 9.99304496],
      ["RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7", 0.0004, ""],
      ["RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN", 0.01]
    ],
    [["RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs", 0.0099, ""]]
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## listlockunspent

**listlockunspent**

The `listlockunspent` method returns a list of temporarily non-spendable outputs.

::: tip
See the <b>lockunspent</b> call to lock and unlock transactions for spending.
:::

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------- | --------- | ------------------------- |
| "txid"    | (string)  | the transaction id locked |
| "vout"    | (numeric) | the vout value            |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listlockunspent
```


<collapse-text hidden title="Response">


```json
[
  {
    "txid": "d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd",
    "vout": 0
  }
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "txid": "d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd",
      "vout": 0
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## listreceivedbyaddress

**listreceivedbyaddress ( minconf includeempty includeWatchonly)**

The `listreceivedbyaddress` method lists balances by receiving address.

### Arguments

| Name | Type | Description | 
| ---------------- | ---------------------------------- | ---------------------------------------------------------------- |
| minconf          | (numeric, optional, default=1)     | the minimum number of confirmations before payments are included |
| includeempty     | (numeric, optional, default=false) | whether to include addresses that haven't received any payments  |
| includeWatchonly | (bool, optional, default=false)    | whether to include watchonly addresses (see 'importaddress')     |

### Response

| Name | Type | Description | 
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "involvesWatchonly" | (bool)    | only returned if imported addresses were involved in transaction                                                                  |
| "address"           | (string)  | the receiving address                                                                                                             |
| "account"           | (string)  | DEPRECATED the account of the receiving address; the default account is ""                                                        |
| "amount"            | (numeric) | the total amount received by the address                                                                                          |
| "confirmations"     | (numeric) | a confirmation number that is aware of the dPoW security service |
| "rawconfirmations"  | (numeric) | the raw confirmations of the most recent transaction included (number of blocks on top of this transaction's block)               |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listreceivedbyaddress
```


<collapse-text hidden title="Response">


```json
[
  {
    "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 40,
    "confirmations": 40,
    "txids": [
      "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
    ]
  }
]
```

</collapse-text>


Command:

```bash
./tokel-cli listreceivedbyaddress 6 true
```


<collapse-text hidden title="Response">


```json
[
  {
    "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 41,
    "confirmations": 41,
    "txids": [
      "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
    ]
  },
  {
    "address": "RSMmyzk2cZ7xJdDx62wAZbvM5dzxH8CPqv",
    "account": "",
    "amount": 0.0,
    "rawconfirmations": 0,
    "confirmations": 0,
    "txids": []
  },
  {
    "address": "RVErfGzpdNSLrg19FVAuet6nXGDaWnqiVc",
    "account": "",
    "amount": 0.0,
    "rawconfirmations": 0,
    "confirmations": 0,
    "txids": []
  }
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "account": "",
      "amount": 0.000001,
      "rawconfirmations": 41,
      "confirmations": 41,
      "txids": [
        "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
      ]
    },
    {
      "address": "RSMmyzk2cZ7xJdDx62wAZbvM5dzxH8CPqv",
      "account": "",
      "amount": 0.0,
      "rawconfirmations": 0,
      "confirmations": 0,
      "txids": []
    },
    {
      "address": "RVErfGzpdNSLrg19FVAuet6nXGDaWnqiVc",
      "account": "",
      "amount": 0.0,
      "rawconfirmations": 0,
      "confirmations": 0,
      "txids": []
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## listsinceblock

**listsinceblock ( "blockhash" target-confirmations includeWatchonly )**

The `listsinceblock` method queries all transactions in blocks since block `blockhash`, or all transactions if `blockhash` is omitted.

### Arguments

| Name | Type | Description | 
| -------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| "blockhash"          | (string, optional)              | the block hash from which to list transactions                         |
| target-confirmations | (numeric, optional)             | the confirmations required (must be 1 or more)                         |
| includeWatchonly     | (bool, optional, default=false) | include transactions to watchonly addresses (see also 'importaddress') |

### Response

| Name | Type | Description | 
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "transactions":    |           |
| "account"          | (string)  | DEPRECATED the account name associated with the transaction; will be "" for the default account                                                                                                                    |
| "address"          | (string)  | the address of the transaction (not present for move transactions -- category = move)                                                                                                                              |
| "category"         | (string)  | the transaction category; `send` has negative amounts, `receive` has positive amounts                                                                                                                              |
| "amount"           | (numeric) | the amount of the relevant currency -- negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category, and for the `move` category for inbound funds. |
| "vout"             | (numeric) | the vout value                                                                                                                                                                                                     |
| "fee"              | (numeric) | the amount of the fee; this value is negative and only available for the `send` category of transactions                                                                                                           |
| "confirmations"    | (numeric) | a confirmation number that is aware of the dPoW security service                                                                                  |
| "rawconfirmations" | (numeric) | the raw confirmations of the transaction; available for `send` and `receive` category of transactions (number of blocks on top of this transaction's block)                                                        |
| "blockhash"        | (string)  | the block hash containing the transaction; available for the `send` and `receive` categories of transactions                                                                                                       |
| "blockindex"       | (numeric) | the block index containing the transaction; available for the `send` and `receive` categories of transactions                                                                                                      |
| "blocktime"        | (numeric) | the block time in seconds since epoch (1 Jan 1970 GMT)                                                                                                                                                             |
| "txid"             | (string)  | the transaction id; available for `send` and `receive` categories of transactions                                                                                                                                  |
| "time"             | (numeric) | the transaction time in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                       |
| "timereceived"     | (numeric) | the time received in seconds since epoch (Jan 1 1970 GMT); available for `send` and `receive` category of transactions                                                                                             |
| "comment"          | (string)  | whether a comment is associated with the transaction                                                                                                                                                               |
| "to"               | (string)  | whether a 'to' comment is associated with the transaction                                                                                                                                                          |
| "lastblock"        | (string)  | the hash of the last block                                                                                                                                                                                         |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listsinceblock
```


<collapse-text hidden title="Response">


```json
{
  "transactions": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "rawconfirmations": 44,
      "confirmations": 44,
      "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
      "blockindex": 1,
      "blocktime": 1552585479,
      "expiryheight": 1268793,
      "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
      "walletconflicts": [],
      "time": 1552585444,
      "timereceived": 1552585444,
      "vjoinsplit": [],
      "size": 254
    }
  ],
  "lastblock": "05686392a3011a180988246b3b0343bc4eec992c101d2e651c6ee786af1b2fb5"
}
```

</collapse-text>


Command:

```bash
./tokel-cli listsinceblock "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327" 6
```


<collapse-text hidden title="Response">


```json
{
  "transactions": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "rawconfirmations": 45,
      "confirmations": 45,
      "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
      "blockindex": 1,
      "blocktime": 1552585479,
      "expiryheight": 1268793,
      "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
      "walletconflicts": [],
      "time": 1552585444,
      "timereceived": 1552585444,
      "vjoinsplit": [],
      "size": 254
    }
  ],
  "lastblock": "08db1a09b32ebb55f026c41d5555281ebeae4c9eb8b36e88db62b6f1d7fd12d1"
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "transactions": [
      {
        "account": "",
        "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
        "category": "receive",
        "amount": 0.000001,
        "vout": 1,
        "rawconfirmations": 46,
        "confirmations": 46,
        "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
        "blockindex": 1,
        "blocktime": 1552585479,
        "expiryheight": 1268793,
        "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
        "walletconflicts": [],
        "time": 1552585444,
        "timereceived": 1552585444,
        "vjoinsplit": [],
        "size": 254
      }
    ],
    "lastblock": "01b4ce6c4659138de1a7a67e8dac354b5acc3a998145effedbfec7ef41a2cec6"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## listtransactions

**listtransactions ( "account" count from includeWatchonly )**

The `listtransactions` method returns up to `count` most recent transactions skipping the first `from` transactions for `account`.

### Arguments

| Name | Type | Description | 
| ---------------- | ------------------------------- | ----------------------------------------------------------------- |
| "account"        | (string, optional)              | DEPRECATED the account name; should be `"*"`                      |
| count            | (numeric, optional, default=10) | the number of transactions to return                              |
| from             | (numeric, optional, default=0)  | the number of transactions to skip                                |
| includeWatchonly | (bool, optional, default=false) | include transactions to watchonly addresses (see `importaddress`) |

### Response

| Name | Type | Description | 
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "account"          | (string)  | DEPRECATED the account name associated with the transaction; it will be "" for the default account                                                                                                   |
| "address"          | (string)  | the address of the transaction; not present for move transactions (category = move)                                                                                                                  |
| "category"         | (string)  | The transaction category. This property can be `send`                                                                                                                                                | `receive` | `move`. `move` is a local (off blockchain) transaction between accounts -- not associated with an address, transaction id, or block. `send` and `receive` transactions are associated with an address, transaction id, and block details. |
| "amount"           | (numeric) | The amount. This value is negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category and for the `move` category for inbound funds. |
| "vout"             | (numeric) | the vout value                                                                                                                                                                                       |
| "fee"              | (numeric) | the amount of the fee; this is negative and only available for the `send` category of transactions                                                                                                   |
| "confirmations"    | (numeric) | a confirmation number that is aware of the dPoW security service                                                                    |
| "rawconfirmations" | (numeric) | the raw confirmations of the transaction; available for `send` and `receive` category of transactions (number of blocks on top of this transaction's block)                                          |
| "blockhash"        | (string)  | the block hash containing the transaction; available for the `send` and `receive` categories of transactions                                                                                         |
| "blockindex"       | (numeric) | the block index containing the transaction; available for the `send` and `receive` categories of transactions                                                                                        |
| "txid"             | (string)  | the transaction id; available for the `send` and `receive` categories of transactions                                                                                                                |
| "time"             | (numeric) | the transaction time in seconds since epoch (midnight Jan 1 1970 GMT)                                                                                                                                |
| "timereceived"     | (numeric) | the time received in seconds since epoch (midnight Jan 1 1970 GMT); available for the `send` and `receive` categories of transactions                                                                |
| "comment"          | (string)  | whether a comment is associated with the transaction                                                                                                                                                 |
| "otheraccount"     | (string)  | for the `move` category of transactions; indicates the account which sent the funds (for receiving funds, positive amounts), or went to (for sending funds, negative amounts)                        |
| "size"             | (numeric) | transaction size in bytes                                                                                                                                                                            |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listtransactions
```


<collapse-text hidden title="Response">


```json
[
  {
    "account": "",
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "category": "generate",
    "amount": 0.00010000,
    "vout": 0,
    "rawconfirmations": 99,
    "confirmations": 99,
    "generated": true,
    "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
    "blockindex": 0,
    "blocktime": 1536976212,
    "expiryheight": 0,
    "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
    "walletconflicts": [
    ],
    "time": 1536976211,
    "timereceived": 1536976211,
    "vjoinsplit": [
    ],
    "size": 99
  }
  , ... (9 responses ommitted from documentation for brevity)
]
```

</collapse-text>


Command:

```bash
./tokel-cli listtransactions "*" 20 100
```


<collapse-text hidden title="Response">


```json
[
  {
    "account": "",
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "category": "generate",
    "amount": 0.00010000,
    "vout": 0,
    "rawconfirmations": 99,
    "confirmations": 99,
    "generated": true,
    "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
    "blockindex": 0,
    "blocktime": 1536976212,
    "expiryheight": 0,
    "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
    "walletconflicts": [
    ],
    "time": 1536976211,
    "timereceived": 1536976211,
    "vjoinsplit": [
    ],
    "size": 99
  }
  , ... (9 responses ommitted from documentation for brevity)
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  [
    {
      "account": "",
      "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      "category": "generate",
      "amount": 0.0001,
      "vout": 0,
      "rawconfirmations": 99,
      "confirmations": 99,
      "generated": true,
      "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
      "blockindex": 0,
      "blocktime": 1536976212,
      "expiryheight": 0,
      "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
      "walletconflicts": [],
      "time": 1536976211,
      "timereceived": 1536976211,
      "vjoinsplit": [],
      "size": 99
    }
    , ... (9 responses ommitted from documentation for brevity)
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## listunspent

**listunspent ( minconf maxconf ["address", ... ] )**

The `listunspent` method returns an array of unspent transaction outputs, with a range between `minconf` and `maxconf` (inclusive) confirmations. The method can, optionally, filter to only include `txouts` paid to specified addresses.

### Arguments

| Name | Type | Description | 
| --------- | ------------------------------------ | ----------------------------------- |
| minconf   | (numeric, optional, default=1)       | the minimum confirmations to filter |
| maxconf   | (numeric, optional, default=9999999) | the maximum confirmations to filter |
| "address" | (string)                             | a series of addresses               |

### Response

| Name | Type | Description | 
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "txid"             | (string)  | the transaction id                                                                                                                |
| "vout"             | (numeric) | the vout value                                                                                                                    |
| "generated"        | (boolean) | true if txout is a coinbase transaction output                                                                                    |
| "address"          | (string)  | the address                                                                                                                       |
| "account"          | (string)  | DEPRECATED the associated account, or "" for the default account                                                                  |
| "scriptPubKey"     | (string)  | the script key                                                                                                                    |
| "amount"           | (numeric) | the transaction amount                                                                                                            |
| "confirmations"    | (numeric) | a confirmation number that is aware of the dPoW security service |
| "rawconfirmations" | (numeric) | the raw confirmations (number of blocks on top of this transaction's block)                                                       |

#### :pushpin: Examples

Command:

```bash
./tokel-cli listunspent
```


<collapse-text hidden title="Response">


```json
[
  {
    "txid": "269b658b9a52e9142c96f3a49c0ad917e5d0c08126baa96713827267137d150f",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.00010000,
    "interest": 0.00000000,
    "rawconfirmations": 6,
    "confirmations": 1,
    "spendable": true
  },
    ...
]
```

</collapse-text>


Command:

```bash
./tokel-cli listunspent 6 9999999 '["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]'
```


<collapse-text hidden title="Response">


```json
[
  {
    "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.0001,
    "interest": 0.0,
    "rawconfirmations": 7,
    "confirmations": 1,
    "spendable": true
  },
  {
    "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
    "vout": 0,
    "generated": false,
    "address": "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
    "scriptPubKey": "76a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac",
    "amount": 9.99304496,
    "interest": 0.0,
    "rawconfirmations": 21,
    "confirmations": 21,
    "spendable": true
  }
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, ["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
      "vout": 0,
      "generated": true,
      "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
      "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
      "amount": 0.0001,
      "interest": 0.0,
      "rawconfirmations": 7,
      "confirmations": 7,
      "spendable": true
    },
    {
      "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
      "vout": 0,
      "generated": false,
      "address": "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
      "scriptPubKey": "76a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac",
      "amount": 9.99304496,
      "interest": 0.0,
      "rawconfirmations": 21,
      "confirmations": 21,
      "spendable": true
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## lockunspent

**lockunspent unlock [{ "txid": "txid", "vout": n }, ... ]**

The `lockunspent` method locks (unlock = `false`) or unlocks (unlock = `true`) specified transaction outputs. A locked transaction output will not be chosen by automatic coin selection, when spending the relevant coin. The locks are stored in memory only; at runtime a node always starts with zero locked outputs, and the locked output list is always cleared when a node stops or fails.

::: tip
See the <b>listunspent</b> and <b>listlockunspent</b> calls to determine local transaction state and info.
:::

### Arguments

| Name | Type | Description | 
| --------- | ------------------- | ------------------------------------------------------------------- |
| unlock    | (boolean, required) | whether to unlock (true) or lock (false) the specified transactions |
| "txid"    | (string)            | the transaction id                                                  |
| "vout"    | (numeric)           | the output number                                                   |

### Response

| Name | Type | Description | 
| ---------- | --------- | ---------------------------------- |
| true/false | (boolean) | whether the command was successful |

#### :pushpin: Examples

Command:

```bash
./tokel-cli lockunspent false '[{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]'
```


<collapse-text hidden title="Response">


```bash
true
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, [{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
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


## resendwallettransactions

**resendwallettransactions**

The `resendwallettransactions` method immediately re-broadcasts unconfirmed wallet transactions to all peers. This method is intended only for testing; the wallet code periodically re-broadcasts automatically.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| ---------------- | -------- | ---------------------------------------------- |
| "transaction_id" | (string) | an array of the rebroadcasted transaction id's |

#### :pushpin: Examples

Command:

```bash
./tokel-cli resendwallettransactions
```


<collapse-text hidden title="Response">


```bash
[
  "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
]
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "resendwallettransactions", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## sendmany

**sendmany "account" { "address": amount, ... } ( minconf "comment" [ "address", ... ] )**

The `sendmany` method can send multiple transactions at once. Amounts are double-precision floating point numbers.

### Arguments

| Name | Type | Description | 
| ----------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "account"                           | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error                                                                                                                                     |
| "amounts" { "address":amount, ... } | ("string":numeric)             | the address (string) and the value (double-precision floating numeric)                                                                                                                                                                                    |
| minconf                             | (numeric, optional, default=1) | only use the balance confirmed at least this many times                                                                                                                                                                                                   |
| "comment"                           | (string, optional)             | a comment                                                                                                                                                                                                                                                 |
| subtractfeefromamount               | (string, optional)             | a json array with addresses. The fee will be equally deducted from the amount of each selected address; the recipients will receive less than you enter in their corresponding amount field. If no addresses are specified here, the sender pays the fee. |
| "address"                           | (string)                       | subtract fee from this address                                                                                                                                                                                                                            |

### Response

| Name | Type | Description | 
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| "transaction_id" | (string) | the transaction id for the send; only 1 transaction is created regardless of the number of addresses |

#### :pushpin: Examples

Command:

```bash
./tokel-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}'
```


<collapse-text hidden title="Response">


```bash
e39b046f0e30bd2a80c64ec78d902107858c8f0d55097d7f2293df1c9a4496ae
```

</collapse-text>


Command:

```bash
./tokel-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 6 "testing"
```


<collapse-text hidden title="Response">


```bash
3829164d8a68d9b7c2c89efe419eca77e37883318b7187b7e000e80e8138a370
```

</collapse-text>


Command:

```bash
./tokel-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 1 "" '["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ","RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu"]'
```


<collapse-text hidden title="Response">


```bash
1813a39247913abf73af10ed51537234fe4e58eb5cfc4f49ac4fbcdecb42b4b4
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", {"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}, 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "fe7db27ed66b9d999c21d3cc9c8c687bd68721d711da6573a0a0ccf75c1cace5",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## sendtoaddress

**sendtoaddress "address" amount ( "comment" "comment-to" subtractfeefromamount "OP_RETURN")**

The `sendtoaddress` method sends an amount to a given address. The amount is real and is rounded to the nearest 0.00000001.

### Arguments

| Name | Type | Description | 
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| "komodoaddress"       | (string, required)                 | the receiving address                                                                                                                            |
| "amount"              | (numeric, required)                | the amount to send (json requires all decimals values less than 1 begin with the characters '0.')                                                |
| "comment"             | (string, optional)                 | a comment used to store what the transaction is for; this is not part of the transaction, just kept in your wallet                               |
| "comment-to"          | (string, optional)                 | a comment to store the name of the person or organization to which you're sending the transaction; this is stored in your local wallet file only |
| subtractfeefromamount | (boolean, optional, default=false) | when `true`, the fee will be deducted from the amount being sent                                                                                 |
| OP_RETURN | (string, optional) | the hexdata to be stored as part of the `OP_RETURN` of the transaction; the number of characters must be even, the user may add a padding `0` at the beginning if necessary; available in `master` branch after the Notary Network Upgrade of 2020                                                                                 |

### Response

| Name | Type | Description | 
| ---------------- | -------- | ------------------ |
| "transaction_id" | (string) | the transaction id |

#### :pushpin: Examples

Command:

```bash
./tokel-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1
```


<collapse-text hidden title="Response">


```bash
cc23924c007adc98b8ea5b9b8b47638e080aa469eb9738b976def487a44f467b
```

</collapse-text>


Command:

```bash
./tokel-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "donation" "seans outpost"
```


<collapse-text hidden title="Response">


```bash
86948c27dc63be415b235c5b3ed807c1e07d9a2cac252f58734add700c55fe18
```

</collapse-text>


Command:

```bash
./tokel-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "" "" true
```


<collapse-text hidden title="Response">


```bash
c5727cafd7d6dfc888d4a0596dc58bfafb24859e29f827e1bf1443037d8461fc
```

</collapse-text>

Command:

```bash
./tokel-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "" "" false "c5727cafd7d6dfc888d4a0596dc58bfafb24859e29f827e1bf1443037d8461fc"
```


<collapse-text hidden title="Response">


```bash
48945fb179a5703b9c6f691e50f9ad1527b426803720bea3efffff092d63fec2
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "6e411f3534af8847d705d87934f6061046e2034abad96b7a1fb1d3996129cb1e",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>



## setpubkey

**setpubkey pubkey**

The `setpubkey` method sets the indicated `pubkey`. This method can be used in place of the [pubkey](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#pubkey) launch parameter, when necessary.

Visit the section [pubkey](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#pubkey) to understand when it is essential to set a pubkey and the consequences of setting it.

::: warning
This method works only once per daemon start. It can't be used to change the pubkey that has already been set.
:::

### Arguments

| Name | Type | Description | 
| --------- | -------- | ------------------ |
| pubkey    | (string) | the desired pubkey |

### Response

| Name | Type | Description | 
| --------- | --------- | ------------------------------------------------- |
| pubkey    | (string)  | the pubkey                                        |
| ismine    | (boolean) | indicates whether the address belongs to the user |
| R-address | (string)  | the public address associated with the pubkey     |

#### :pushpin: Examples

Command:

```bash
./tokel-cli setpubkey 0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f
```


<collapse-text hidden title="Response">


```bash
{
  "address": "RK47DQhSHJEMGFSiRtgki67xG3u1Qsq1Gw",
  "ismine": true,
  "pubkey": "0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f"
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setpubkey", "params": ["02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```bash
{
  "result": {
    "address": "RK47DQhSHJEMGFSiRtgki67xG3u1Qsq1Gw",
    "ismine": true,
    "pubkey": "0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## settxfee

**settxfee amount**

The `settxfee` method sets the transaction fee per kB.

### Arguments

| Name | Type | Description | 
| --------- | ------------------- | ---------------------------------------------------------------- |
| amount    | (numeric, required) | the transaction fee in COIN/kB rounded to the nearest 0.00000001 |

### Response

| Name | Type | Description | 
| ---------- | --------- | -------------------------- |
| true/false | (boolean) | returns true if successful |

#### :pushpin: Examples

Command:

```bash
./tokel-cli settxfee 0.00001
```


<collapse-text hidden title="Response">


```bash
true
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
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


## signmessage

**signmessage "address" "message"**

The `signmessage` method signs a message via the private key of an address.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | -------------------------------------- |
| "address" | (string, required) | the address to use for the private key |
| "message" | (string, required) | the message                            |

### Response

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------- |
| "signature" | (string) | the signature of the message encoded in base 64 |

#### :pushpin: Examples

Create the signature:

Command:

```bash
./tokel-cli signmessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "my message"
```


<collapse-text hidden title="Response">


```bash
H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=
```

</collapse-text>


Verify the signature:

Command:

```bash
./tokel-cli verifymessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=" "my message"
```


<collapse-text hidden title="Response">


```bash
true
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## walletlock

**walletlock**

::: tip
The `walletlock` method is neither active nor visible in the `help` method until the [encryptwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletlock` method re-locks a wallet that has a passphrase enabled via [encryptwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#encryptwallet).

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli walletlock
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


## walletpassphrase

**walletpassphrase "passphrase" (timeout)**

::: tip
The `walletpassphrase` method is neither active nor visible in the `help` method until the [encryptwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletpassphrase` method unlocks the wallet using the passphrase that was set by the [encryptwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#encryptwallet) method.

The `timeout` argument can be included to limit the length of time (in seconds) the wallet will remain unlocked.

### Arguments

| Name | Type | Description | 
| ------------ | ----------------------------- | ---------------------------------------------------------------------- |
| "passphrase" | (string)                      | the passphrase that was set by the `encryptwallet` method              |
| timeout      | (number in seconds, optional) | the amount of time for which the wallet should remember the passphrase |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli walletpassphrase
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


## walletpassphrasechange

**walletpassphrasechange "oldpassphrase" "newpassphrase"**

::: tip
The `walletpassphrasechange` method is neither active nor visible in the `help` method until the [encryptwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletpassphrasechange` method changes `"oldpassphrase"` to `"newpassphrase"`.

### Arguments

| Name | Type | Description | 
| --------------- | -------- | ------------------ |
| "oldpassphrase" | (string) | the old passphrase |
| "newpassphrase" | (string) | the new passphrase |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./tokel-cli walletpassphrasechange "oldpassphrase" "newpassphrase"
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


## z_commands

::: warning
The Tokel blockchain does not have these commands enabled.
:::

The Tokel blockchain inherits all Komodo smartchain RPC's, but not all RPC's are enabled. Tokel does not have Z transactions (private transaction) enabled.
