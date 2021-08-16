## What is TKLTEST?

The TKLTEST chain is an identical version of the main Tokel chain, but is used for testing. Creators, application developers, or blockchain developers can all test their work on the TKLTEST chain before it is submitted to the main chain. You can use TKLTEST to ensure the formatting of your token is correct prior to launching it on the main chain, or enabled your application to work with the TKLTEST chain prior to launch. 

You can expect the TKLTEST blockchain to be hardforked more regularly than the main chain. This will be done on an adhoc basis when new features are being worked on. 

If a large hard fork is required, we will use a numerical nomenclature to restart the test chain. For example, if a large, consensus change is required, we may opt to start another test chain named `TKLTEST1`, or `TKLTEST2`, so on and so fourth. This is opposed to setting block height activated hard forks, which we may use if we would like to test backwards compatibility. All previous test chains will remain available as long as somebody continues to run a full node and mine it, so there is no fear that you need to update to the new test chain unless you decide to. If you would like to run a specific TKLTEST# chain, replace the below commands with the number of the chain you wish to run.

### TKLTEST Updates

This list shows the current TKLTEST chains and what number we are up to, along with the associated updates for each chain.

Although we try to keep this page as up to date as possibly, please join the [Tokel discord](http://discord.tokel.io) and check out the #tokel-test channel for the most up to date information.

### Test Chains

#### TKLTEST - current test chain

The `TKLTEST` chain is the first TKLTEST chain created. It is an identical copy of the original Tokel main chain. This chain is the first testing grounds for the Tokel community. 

Launch Parameters:

<collapse-text hidden title="Response">

```bash
./komodod -ac_name=TKLTEST -ac_supply=1000000000 -ac_cbmaturity=1 -ac_reward=5000000000 -ac_decay=77700000 -ac_halving=525600 -ac_cc=1 -ac_ccenable=228,236,245,246,247 -ac_adaptivepow=2 -addnode=164.132.225.134 -pubkey=**YOURPUBKEYHERE** &
```

</collapse-text>

## Preparing your environment

### Build Komodo (yep, the komodo daemon runs TKLTEST)

TKLTEST is a completely independant blockchain created using Komodo technologies. In order to run the TKLTEST blockchain, you must build the Komodo daemon and launch the TKLTEST blockchain using that. You do **not** have to run the Komodo blockchain in order to run and use the TKLTEST blockchain.

Komodo technology allows anyone to create smartchains which are independent blockchains, such as Tokel.

#### Dependencies

```shell
#The following packages are needed:
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git zlib1g-dev wget curl bsdmainutils automake cmake clang ntp ntpdate nano -y
```

#### Linux
```shell
git clone https://github.com/TokelPlatform/komodo --branch TKLTEST --single-branch
cd komodo
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(expr $(nproc) - 1)
#This can take some time.
```

#### OSX
Ensure you have [brew](https://brew.sh) and Command Line Tools installed.
```shell
# Install brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# Install Xcode, opens a pop-up window to install CLT without installing the entire Xcode package
xcode-select --install 
# Update brew and install dependencies
brew update
brew upgrade
brew tap discoteq/discoteq; brew install flock
brew install autoconf autogen automake
brew update && brew install gcc@8
brew install binutils
brew install protobuf
brew install coreutils
brew install wget
# Clone the Komodo repo
git clone https://github.com/TokelPlatform/komodo --branch TKLTEST --single-branch
# Change master branch to other branch you wish to compile
cd komodo
./zcutil/fetch-params.sh
./zcutil/build-mac.sh -j$(expr $(sysctl -n hw.ncpu) - 1)
# This can take some time.
```

#### Windows
Use a debian cross-compilation setup with mingw for windows and run:
```shell
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git zlib1g-dev wget libcurl4-gnutls-dev bsdmainutils automake curl cmake mingw-w64 libsodium-dev libevent-dev
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup target add x86_64-pc-windows-gnu

sudo update-alternatives --config x86_64-w64-mingw32-gcc
# (configure to use POSIX variant)
sudo update-alternatives --config x86_64-w64-mingw32-g++
# (configure to use POSIX variant)

git clone https://github.com/TokelPlatform/komodo --branch TKLTEST --single-branch
cd komodo
./zcutil/fetch-params.sh
./zcutil/build-win.sh -j$(expr $(nproc) - 1)
#This can take some time.
```

To reset the TKLTEST blockchain change into the *~/.komodo/TKLTEST* data directory and delete the corresponding files by running `rm -rf blocks chainstate debug.log komodostate db.log`

## Launch the TKLTEST blockchain

Change to the Komodo src directory:

```
cd ~/komodo/src
```

Launch the TKLTEST chain command:

```
./komodod -ac_name=TKLTEST -ac_supply=1000000000 -ac_cbmaturity=1 -ac_reward=5000000000 -ac_decay=77700000 -ac_halving=525600 -ac_ccenable=228,236,245,246,247 -ac_adaptivepow=2 -addnode=164.132.225.134 &
```

Now wait for the chain to finish syncing. This might take while depending on your machine and internet connection. You can check check sync progress by using tail -f on the debug.log file in the coin data directory. Double check the number of blocks you've downloaded with an explorer to verify you're up to the latest block.

```
tail -f ~/.komodo/TKLTEST/debug.log
```

TKLTEST uses CryptoConditions that require launching the blockchain with the `-pubkey` parameter to work correctly. Once you have completed block download, you will need to create a new address or import your current address. After you have done that, you will need to stop the blockchain and launch it with the `-pubkey` parameter.

You can use the RPC below to create a new address or import a privkey you currently have.

```
./komodo-cli -ac_name=TKLTEST getnewaddress
```
```
./komodo-cli -ac_name=TKLTEST importprivkey
```

Once you have completed this, use the `validateaddress` RPC to find your associated pubkey.

```
./komodo-cli -ac_name=TKLTEST validateaddress *INSERTYOURADDRESSHERE*
```

Once you have written down your pubkey, stop the TKLTEST blockchain.

```
cd ~/komodo/src
./komodo-cli -ac_name=TKLTEST stop
```

Wait a minute or so for the blockchain to stop, then relaunch the TKLTEST blockchain with the command below. Please remove the ** and replace them with the pubkey of the address you imported.

```
cd ~/komodo/src
./komodod -ac_name=TKLTEST -ac_supply=1000000000 -ac_cbmaturity=1 -ac_reward=5000000000 -ac_decay=77700000 -ac_halving=525600 -ac_cc=1 -ac_ccenable=228,236,245,246,247 -ac_adaptivepow=2 -addnode=164.132.225.134 -pubkey=**YOURPUBKEYHERE** &
```

You are now ready to use the TKLTEST blockchain to its fullest extent.

License
-------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
