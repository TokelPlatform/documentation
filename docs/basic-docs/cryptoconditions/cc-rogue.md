# Contract Module: Rogue

## Introduction

The Rogue CryptoConditions (CC) contract module serves as a proof-of-concept to demonstrate CryptoCondition's capabilities as a blockchain-based gaming technology. 

Rogue CC is based on the classic [Rogue](http://www.livingroguelike.com/rl-games/the-original-rogue-information-and-how-to-play-online/) game. As such, it can be categorized as a [Roguelike.](http://www.livingroguelike.com/roguelike-info-discussions/what-is-a-roguelike/)

The core aspects of Rogue gameplay occur on the blockchain. Core aspects include such data as character health points, items, movement, attacks, and other relevant game states. This data is hashed and pushed into the protection of Bitcoin via Komodo. 

The Rogue implementation makes use of the classic on-screen visual representation of gameplay. This interface relies on ASCII characters to represent characters, items, and other in-game objects and actions.

The procedures to launch and finish a game require the execution of various methods (rpcs). To make the game more easy to start and finish for players who are not comfortable with the terminal, the Komodo team has created a Terminal User Interface (TUI).  

The following installation and walkthrough tutorials can assist the reader in testing Rogue. For more information, please reach out to our community on [Discord](https://komodoplatform.com/discord). The #cc-rogue channel is available for questions and assistance.

## Installation

### Requirements

Rogue is currently playable on modern MacOS and Linux machines. 

Windows is not yet available. Please ask on our #cc-rogue channel on [Discord](https://komodoplatform.com/discord) for updates. 

### Install Dependencies

#### Linux

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

#### macOS (OSX)

Use the terminal to ensure the MacOS XCode tools are installed: 

```
xcode-select --install
```

Ensure the latest version of `brew` is installed. If necessary, execute the following command:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once `brew` is installed, execute each of the following commands:

```
brew update
brew upgrade
brew tap discoteq/discoteq; brew install flock
brew install autoconf autogen automake
brew install gcc@6
brew install binutils
brew install protobuf
brew install coreutils
brew install wget
```

### Clone & Compile Komodo

#### Linux

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

#### MacOS

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build-mac.sh -j8
```

::: tip
Change the `8` in the `-j8` portion of the last command to any number of processor threads desired and/or appropriate for your machine. 
:::

### Update `komodod`

```bash
cd ~/komodo
git checkout jl777
git pull
./zcutil/build.sh -j$(nproc)
```

### Set `pubkey` value

#### Step 1 - Start the chain

Start the ROGUE chain with the following command in a terminal window and wait for the daemon to sync. Keep this terminal open and the daemon running for the duration of your Rogue gameplay. 

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

#### Step 2

Open a new terminal. This terminal can be used to execute all remaining installation and gameplay commands.

```bash
./komodo-cli -ac_name=ROGUE getnewaddress
```

The returned value is a ROGUE address. We need to find the associated pubkey for this address.

#### Step 3

Use the `validateaddress` method with the address.

```bash
./komodo-cli -ac_name=ROGUE validateaddress insert_address_here 
```

The `validateaddress` method will return information similar to the following:

```JSON
{
  "isvalid": true,
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "scriptPubKey": "76a91498b5caa42ffe9868844c51ba6e085e5e7e92fc2588ac",
  "segid": 13,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2",
  "iscompressed": true,
  "account": ""
}
```

Look for the `pubkey` value:

```
"pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2",
```

This is the `pubkey` for our address.

#### Step 4

Set the pubkey for the ROGUE asset chain. 

```bash
./komodo-cli -ac_name=ROGUE setpubkey 02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2
```

Response:

```JSON
{
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "ismine": true,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2"
}
```

The pubkey is now set.

To reuse this pubkey in the future, include the pubkey as a [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter.

<!--
ac_pubkey vs pubkey launch parameter in this section?
-->

For example:

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -pubkey=02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2 -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

### Installing the TUI (Optional)

The Terminal User Interface (TUI) provides automated methods for executing the ROGUE methods (rpcs) that are used to start and finish a game. Use of the TUI is optional, but recommended for most players. 

#### Linux

Open another terminal window. (Do not close or terminal processes on other terminals running ROGUE software.)

Install TUI dependencies:

```bash
sudo apt-get install python3.6 python3-pip libgnutls28-dev
```

Install required python packages:

```bash
pip3 install setuptools wheel slick-bitcoinrpc
```

Clone the repo and copy the required files:

```bash
git clone https://github.com/tonymorony/komodo_cryptoconditions_tui
cd komodo_cryptoconditions_tui
git checkout rogue
cp -r * ~/komodo/src
```

#### MacOS (OSX)

Download the latest portable zip for OSX: 

[Link to Komodo Rogue TUI downloadable zip](https://github.com/tonymorony/komodo_cryptoconditions_tui/releases)

Extract the contents into the `~/komodo/src` directory.

Execute the following commands to launch the TUI software:

```bash
cd  ~/komodo/src
./rogue_tui.py
```

## Manual Walkthrough

The Komodo team provides a [Terminal User Interface (TUI)](../cryptoconditions/cc-rogue.html#installing-the-tui-optional) to allow players to launch and conclude a game without having to interact with the module's api commands. 

For those who would prefer the manual process, the following walkthrough provides detailed step-by-step instructions.

#### Step 1

Open a new terminal and navigate to the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

#### Step 2

Register a new game via the [newgame](../cryptoconditions/cc-rogue.html#newgame) method. For this example, we choose to have a single player with a `0` buy-in requirement. 

Methods for ROGUE require the use of the [cclib](../komodo-api/cclib.html#cclib) method. The Rogue module's required `EVALCODE` for the `cclib` method is `17`.

Command: 

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```

Response:

```JSON
{
  "name": "rogue",
  "method": "newgame",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f89010061c9741f0451fcbec05ff789eef49487f4e50dcfbe05534b3f37167e9be400010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140aa48a0604d4d2eb76efd21639b26897fa3c036edd8dd4ca3d91c1f9cce294ec55071aab6187326ee1b1e80a1a3d22f72dd393fb65f009a619e8cf7fb0632a52ca100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc1027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc0000000000000000106a0e114700000000000000000100000000000000341d00000000000000000000000000",
  "txid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success"
}
```

Broadcast the raw `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction):

```bash
./komodo-cli -ac_name=ROGUE sendrawtransaction 0400008085202f89010061c9741f0451fcbec05ff789eef49487f4e50dcfbe05534b3f37167e9be400010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140aa48a0604d4d2eb76efd21639b26897fa3c036edd8dd4ca3d91c1f9cce294ec55071aab6187326ee1b1e80a1a3d22f72dd393fb65f009a619e8cf7fb0632a52ca100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc1027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc0000000000000000106a0e114700000000000000000100000000000000341d00000000000000000000000000
```

Response:

```JSON
09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The returned transaction id is the `gameplay_txid`. Save this for future use.

#### Step 3

Check the game's state using the [gameinfo](../cryptoconditions/cc-rogue.html#gameinfo) method:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
```

Response:

```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success",
  "height": 7462,
  "start": 7462,
  "starthash": "0006b3ede92cd36bd50f7eca8bfffcb9a32254d1f24193517447752b004b582a",
  "seed": 3767108440867690538,
  "run": "./komodo-cli -ac_name=ROGUE cclib register 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"",
  "alive": 0,
  "numplayers": 0,
  "maxplayers": 1,
  "buyin": 0.00000000,
  "players": [
  ]
}
```

In the returned json object, observe the `run` value. This lists the specific command that must be executed in the terminal to register the game.

#### Step 4

Register the `gameplay_txid` using the [register](../cryptoconditions/cc-rogue.html#register) method:

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
```

Response:

```JSON
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f890170fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d70902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581407c0a8458a64c5653b279bbff6f50d23474819c720330510f80294a7a6789d6a11bbb49efb610c8402b67d7323be456bd0b7e787856882cb16a58409b05e42e6aa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff02301b0f0000000000302ea22c802039784572269885d080d1990f4eea2b3a93b285b10887d66ccc5f63e0026b0be781031210008203000401cc0000000000000000446a42115270fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d709000000000000000000000000000000000000000000000000000000000000000000000000401d00000000000000000000000000",
  "txid": "0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749",
  "result": "success"
}
```

Broadcast the raw `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction):

```bash
./komodo-cli -ac_name=ROGUE sendrawtransaction 0400008085202f890170fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d70902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581407c0a8458a64c5653b279bbff6f50d23474819c720330510f80294a7a6789d6a11bbb49efb610c8402b67d7323be456bd0b7e787856882cb16a58409b05e42e6aa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff02301b0f0000000000302ea22c802039784572269885d080d1990f4eea2b3a93b285b10887d66ccc5f63e0026b0be781031210008203000401cc0000000000000000446a42115270fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d709000000000000000000000000000000000000000000000000000000000000000000000000401d00000000000000000000000000
```

Response:

```JSON
0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749c
```

#### Step 5

Check the game's current state again using the `gameinfo` method. Use the `gameplay_txid` as an argument:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
```

Response:

```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success",
  "height": 7462,
  "start": 7462,
  "starthash": "0006b3ede92cd36bd50f7eca8bfffcb9a32254d1f24193517447752b004b582a",
  "seed": 3767108440867690538,
  "run": "cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "alive": 1,
  "numplayers": 1,
  "maxplayers": 1,
  "buyin": 0.00000000,
  "players": [
    {
      "slot": 0,
      "status": "alive",
      "baton": "0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749",
      "batonaddr": "R9dCYMKsDQRCg5CLpvThRser1gbBTmkEHG",
      "batonvout": 0,
      "batonvalue": 0.00990000,
      "batonht": 7469
    }
  ]
}
```

Note that the `gameinfo` method now returned a `seed` value, as well as player data.

In the above returned json object, find the `run` value. This is the exact command needed to start the game.

#### Step 6 - Play

Execute the above `run` command to start the game:

```bash
cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The game is now running and should be visible on-screen.

#### Step 7 - Play the Game

For instructions on in-game controls and objectives, [read this linked section.](../cryptoconditions/cc-rogue.html#gameplay-documentation)

#### Step 8 - Bailout

When you are satisfied with your store of gold and you would like to convert it into `ROGUE` coins, follow this procedure. (This assumes your player did not die.)

Quit the game by typing `Q` on the keyboard.

Execute the [bailout]() method. For example:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
```

To use this character in a future game, save the transaction id that is returned from the above command and use it when registering for a future game.

#### Step 9: Highlander Victory

If you are the winner of a multi-player game, whether by obtaining the amulet and exiting the dungeon, or by being the last player standing, you may claim an additional prize.

The prize is the collective value of all `ROGUE` coins that were contributed during the buy-in stage.

To obtain this prize, use the [highlander](../cryptoconditions/cc-rogue.html#highlander) method:

```
./komodo-cli -ac_name=ROGUE cclib highlander 17 \"[%224fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a%22]\"
```

To use the character in a future game, save the transaction id that is returned from the above command and use it during the registration phase of a future game.

## Gameplay Documentation

As Komodo's Rogue implementation is based off of the classic Rogue game, the classic manual provides the basic instructions for the game:

[Link to Classic Rogue Manual Here](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf)

After reading the linked manual, there are additional aspects to keep in mind for Komodo's unique implementation. 

:::tip Quick Tip
Some users report that typing the letter `s` on the keyboard does not properly execute the `save game` command. If this is an issue, instead use `SHIFT + Q`.
:::

Komodo's Rogue features two different game modes. There is one mode for single-player gameplay, where the `maxplayer` value is set to `1`, and one mode for multiplayer gameplay, where the `maxplayer` value is greater than `1`. 

#### Single-Player Mode

The single-player mode is more limited in nature. In general, this mode is for practicing or farming purposes. 

There are no time limits. 

The conversion of in-game gold to `ROGUE` coins is halved to a ratio of `1` in-game gold to `0.0005` ROGUE coins. 

As soon as the `gameplay_txid` is confirmed the player may begin to play.

#### Multi-Player Mode

If more than one player is allowed in the game parameters, the game goes into "Highlander" mode. In this mode, there can be only one winner of each game. The winner is the last player standing.

Multiplayer mode also adds a time limit that is based on the frequency of keystrokes. So long as you are frequently entering commands, the time limit will expire in approximately one hour. If players are not frequently entering keystrokes, the time limit can vary. 

There is a waiting period after the `gameplay_txid` is confirmed. This is an arbitrary number of blocks that is determined using blockchain-enforced randomization. This ensures that no player receives an unfair advantage via advanced knowledge of the start time.

If a player uses the `bailout` method, they are allowed to convert all their gold to `ROGUE` coins at a ratio of `1:0.001` each. The conversion is facilitated using globally locked `ROGUE` coins. The funds in this global vault automatically accrue through asset-chain activity. In the event that there are not enough globally locked funds at the time the `bailout` method is executed, the player must simply wait until the funds are generated via automated methods. You can encourage this fund to grow more quickly by encouraging other players and people to transact using ROGUE, as transactions feed the fund.

The most direct way to win the game is to obtain the `amulet` and return from the dungeon. The winner receives all of the buy-in ROGUE coins that were originally contributed, as well as `0.01` ROGUE coin for every in-game gold obtained. 

With each player that survives, whether by winning or by bailing out, the player and all of his obtained items are retained on the blockchain. The character is a non-fungible asset that can be traded. The character's data can be used in any future ROGUE game. To activate this character, when registering for a game specify the transaction id that was returned from the `highlander` method.

## newgame

**cclib newgame 17 \"[maxplayers,buyin]\"**

Creating new game. Buy-in argument using for multiplayer games. It's forming game pot and last player standing or first who do highlander take it. 
In singleplayer mode you'll get 0.0001 ROGUE per gold.

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command for a single-player training game:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```

Response:

```json
{
  "name": "rogue",
  "method": "newgame",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f8901018feb110a6e0d8751a158b3e73dac07383c83766a83908d641f2d4b1db6f704010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581405349ce7a0a3823ca35e3dc30d17c8d8f170bfea89373166f14b8b4f04d36c34a41199ad448074be74b7a6344d0c36b4f68748f976f3f95b7d0c8ec84e54bf773a100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc10270000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac0000000000000000106a0e114700000000000000000100000000000000964c00000000000000000000000000",
  "txid": "b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026",
  "result": "success"
}
```

## gameinfo

**cclib gameinfo 17 \"[%22GAME_TXID%22]\"**

Check info about game

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%22b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026%22]\"
```

Response:

```json
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026",
  "result": "success",
  "gameheight": 19587,
  "height": 19587,
  "start": 19587,
  "starthash": "0003a5ed4715220a742a6c2381daa5d49d29fa56189c7d676985902734e71e2e",
  "seed": 2991956025523248686,
  "run": "./komodo-cli -ac_name=ROGUE cclib register 17 \"[%22b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026%22]\"",
  "alive": 0,
  "numplayers": 0,
  "maxplayers": 1,
  "buyin": 0.00000000,
  "players": [
  ]
}
```

## pending

**cclib pending 17**

Displaying lists of not finished games on chain

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib pending 17
```

Response:

```bash
{
  "result": "success",
  "name": "rogue",
  "method": "pending",
  "pending": [
    "19de2b0f2562ae775ef213d1e396bc741ccc4f32bac32b36e8ee5da25e451801",
    "ff5139cfcb47366674f52c550cfb9c11eb298afa1479ce9924d8bac2a407d701",
    "8f3e6104ee324bc6a60430ef9485c682ee890cdb0660e9a747599531fecea203",
    ...
    ...
    ...
    "ff9d5e111caaa0e84666ce6e0fda66e93e4fb13ca2dd0debbdc82e663b36d9fc"
  ],
  "numpending": 175
}
```
## register

**cclib register 17 \"[%22GAME_TXID%22,%22PLAYER_TXID%22]\"**

Registering you for participation in game. Player txid is optional argument to re-use saved player in game.

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

Registration without player:

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 \"[%22b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026%22]\"
```
Response:

```bash
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f890126504f5edd0fc461e09b4bd6d4439751d8037a927bd8d075eace1d9a3b1cabb901000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140a1f23cbe9d8e7a20306df4c86da47b4ae3b59556742b7fcdf68f6f3549b02d734879b94fd73f5847914d448e4d78e48d415bffe55081a491e242ec6256f02638a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff03301b0f0000000000302ea22c80202ba0b269f75c72a0ce23e03812814b1e76a8fd57b3e75fee8b37bfef2b4ebf3581031210008203000401cc0100000000000000302ea22c80207f0205ad6b02be91baf2a56dcc77381e7b0e19cb9a83dfb9530316958f5b706781032210008203000401cc0000000000000000446a42115226504f5edd0fc461e09b4bd6d4439751d8037a927bd8d075eace1d9a3b1cabb9000000000000000000000000000000000000000000000000000000000000000000000000bd4c00000000000000000000000000",
  "txid": "855802e2e83d0d4632518959e4ff9e840ed9838f51bd6b3a80dc27b8ea7900ba",
  "result": "success"
}
```

## bailout

**cclib bailout 17 \"[%22GAME_TXID%22]\"**

Finishing game, if player is allive he saving after bailout tx is mined. Gold converting to ROGUE

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 \"[%2239b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0%22]\"
```

Response:

```bash
{
  "name": "rogue",
  "method": "bailout",
  "myrogueaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
  "gametxid": "39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0",
  "hex": "0400008085202f8902261b7562e9ce81a3b666a69cd71c1900bece3e8ca9bb85430076f0de51ef9b8700000000a74ca5a281a1a0819ca28194a067a5658021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e858140d2f916906d56a615de2c3a04bf7977df9136a7adc793681917bc44656c61c0ef68038ff1072632d5b546b17c9a0f58d5e057c4794f01e54c90a247460d6bd2afa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001fffffffff0735b78bcdaaa8d317acb90256283c0b6e1d6d8b7f8dab238637fe3125cb63902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140c08bf9ed2c6ddbe3298fcad23f7397fd17bb76cafada4793acb7a6a4c08908731bdf90ace865fa8111a827d874fbd8f447fecca5982654685365577f1b5e7d36a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff0300a60e0000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc30750000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac00000000000000005f6a4c5c1151f0735b78bcdaaa8d317acb90256283c0b6e1d6d8b7f8dab238637fe3125cb63905524f4755450c4c6542726f6e204a616d65730000000021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e850000000000c04c00000000000000000000000000",
  "txid": "194fe36a878fdac853e05c9b48b771a69a9a980c22c803b2ec5c2ceecb719329",
  "result": "success"
}
```

## highlander

**cclib highlander 17 \"[%22MULTIPLAYER_GAME_TXID%22]\"**

Multilplayers game call: If you won your game before anybody else did or if you are the last one left who didnt bailout, you can claim the prize.

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib highlander 17 \"[%22b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301%22]\"
```

Response:

```bash
{
  "name": "rogue",
  "method": "highlander",
  "myrogueaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
  "gametxid": "b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301",
  "result": "success"
  "hex": hex
  "txid": txid
}
```

## playerinfo

**cclib playerinfo 17 \"[%22PLAYER_TXID%22]\"**

Displaying information about player

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib playerinfo 17 \"[%22cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab%22]\"
```

Response:

```bash
"{
  "result": "success",
  "name": "rogue",
  "method": "playerinfo",
  "player": {
    "playertxid": "cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab",
    "tokenid": "929ff2101e974111499f37f2af86280f403f9e704c070a9225398aa5ce83c1cf",
    "data": "580000000c0000001000000001000000070000000700000001000000000000003a0000000000000003000000000000000000000000000000000000001000000000000000000000000000000000000000000000005d00000000000000010000000100000000000000000000000600000012000000000000000000000000000000000000000000000029000000ffffffff010000000000000001000000010000000000000012000000000000003278340000000000317833000000000029000000ffffffff0100000002000000010000000000000000000000120000000000000031783100000000003178310000000000290000000200000026000000030000000000000000000000000000001e00000000000000317831000000000032783300000000002100000000000000010000000a00000000000000000000000b0000001000000000000000307830000000000030783000000000002100000000000000010000000200000000000000000000000b000000100000000000000030783000000000003078300000000000",
    "pack": [
      "3 rations of food",
      "+1 ring mail [protection 4]",
      "A +1,+1 mace",
      "A +1,+0 short bow",
      "38 +0,+0 arrows",
      "A potion of haste self(topaz)",
      "A potion of poison(amber)"
    ],
    "packsize": 7,
    "hitpoints": 12,
    "strength": 16,
    "level": 1,
    "experience": 7,
    "dungeonlevel": 1,
    "chain": "ROGUE",
    "pname": "fred"
  }
}"
```

## players

**cclib players 17**

Diplaying list of your players

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib players 17
```

Response:

```bash
{
  "name": "rogue",
  "method": "players",
  "playerdata": [
    "cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab",
    "1a705d1e900ac760afd5bb24e0d6c40ce6bf10f42d3344559ad18ddfa6ee08bc",
    "5ebd33eb9d62d977bf8d600d84fec1a6a6046a7a171bff64fa9548f05c8caddd"
  ],
  "numplayerdata": 3
}
```

## games

**cclib games 17**

Displaying list of your finished and unfinished games

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
 ./komodo-cli -ac_name=ROGUE cclib games 17
```

Response:

```bash
{
  "name": "rogue",
  "method": "games",
  "pastgames": [
    "2d1010473c9675a3e04e84fe191404926761f324e4053a0f859d4806f68bbf25",
    "39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0",
    "790b94addb0c19399a7afedbb7580268f4fc8a3d91a600af6729c4d73fdb6498",
    "bbdecbb3b037e299dd5b303a11e4839e5625c94ce4e36acd3b7b549fec342ad3",
    ...
    ...
    ...
    "43244d4be57564ef441fe8790bb08e23787244f533c9591ab3adb9cf755e9eed",
    "0199a50d45e56060ded6aa30e3ce4ae8ed090c0033c78e3e024aef403277a207",
    "a3833e860ff02d178f431032952f947f7e0c485690d9dd7e6e8133813f253a34",
  ],
  "games": [
    "b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301",
    "3443ad3112908b31cab74ec7094c294d337aad5253e4e1af35eaac1f31ed7ab3",
     ...
     ...
     ...
    "dd859a7a9c980e7a5018913de98e48515a96b1ac54b39515e2cca3efed9659eb"
  ],
  "numgames": 140
}
```

## setname

**cclib setname 17 \"[%22NAME%22]\"**

Setting name which be given for unnamed players

#### Arguments:

#### Response:

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib setname 17 \"[%22SuperMegaWarrior%22]\"
```

Response:

```bash
{
  "name": "rogue",
  "method": "setname",
  "result": "success",
  "pname": "SuperMegaWarrior"
}
```