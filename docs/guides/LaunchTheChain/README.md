## Introduction

Tokel is a completely independent blockchain created using Komodo smart chain technologies. In order to run the Tokel blockchain, you must build the Tokel daemon and launch the Tokel blockchain through that. You do **not** have to run the Komodo blockchain in order to run or use the Tokel blockchain.

You must ensure you are running the chain from the `tokel` [branch of this repository](https://github.com/TokelPlatform/tokel/tree/tokel)

## What's new in daemon tokeld

### Release 0.3.1
New consensus features and fixes (activated on 24 June 2022):
- Support for R-address as destinations for tokenv2transfer transactions
- fixed burn pubkey (added a valid one)
- fixed assets cc (token DEX) royalty calculation for more than 50%
- added websockets support for nspv nodes

## Preparing your environment

### Build the Tokel Daemon

#### Dependencies

```shell
#The following packages are needed:
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git zlib1g-dev wget curl bsdmainutils automake cmake clang ntp ntpdate nano -y
```

#### Linux
```shell
git clone https://github.com/TokelPlatform/tokel --branch tokel --single-branch
cd tokel
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
# Clone the Tokel repo
git clone https://github.com/TokelPlatform/tokel --branch tokel --single-branch
cd tokel
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

git clone https://github.com/TokelPlatform/tokel --branch tokel --single-branch
cd tokel
./zcutil/fetch-params.sh
./zcutil/build-win.sh -j$(expr $(nproc) - 1)
#This can take some time.
```

To reset the Tokel blockchain change into the *~/.komodo/TOKEL* data directory and delete the corresponding files by running `rm -rf blocks chainstate debug.log komodostate db.log`

## Launch the Tokel blockchain

Change to the Tokel src directory:

```
cd ~/tokel/src
```

Launch the Tokel chain command:
```
./tokeld &
```

The smart chain parameters are listed below if you are curious. The `tokeld` command will launch the blockchain correctly without the need to use the full command below.

```
komodod -ac_name=TOKEL -ac_supply=100000000 -ac_eras=2 -ac_cbmaturity=1 -ac_reward=100000000,4250000000 -ac_end=80640,0 -ac_decay=0,77700000 -ac_halving=0,525600 -ac_cc=555 -ac_ccenable=236,245,246,247 -ac_adaptivepow=6 -addnode=135.125.204.169 -addnode=192.99.71.125 -addnode=144.76.140.197 -addnode=135.181.92.123 &
```
or just
```
./tokeld &
```

Now wait for the chain to finish syncing. This might take while depending on your machine and internet connection. You can check check sync progress by using tail -f on the debug.log file in the coin data directory. Double check the number of blocks you've downloaded with an explorer to verify you're up to the latest block.

```
tail -f ~/.komodo/TOKEL/debug.log
```

Tokel uses CryptoConditions that require launching the blockchain with the `-pubkey` parameter to work correctly. Once you have completed block download, you will need to create a new address or import your current address. After you have done that, you will need to stop the blockchain and launch it with the `-pubkey` parameter.

To use tokel daemon RPC you should run the command line interface executable:<br> 
`./komodo-cli -ac_name=TOKEL commmand params` or just `./tokel-cli commmand params` (`komodo-cli.exe` or `tokel-cli.exe` on Windows).

You can use the RPC below to create a new address or import a privkey you currently have. 

```
./tokel-cli getnewaddress
```
```
./tokel-cli importprivkey
```

Once you have completed this, use the `validateaddress` RPC to find your associated pubkey.

```
./tokel-cli validateaddress *INSERTYOURADDRESSHERE*
```

Once you have written down your pubkey, stop the Tokel blockchain.

```
cd ~/tokel/src
./tokel-cli stop
```

Wait a minute or so for the blockchain to stop, then relaunch the Tokel blockchain with the command below. Please remove the ** and replace them with the pubkey of the address you imported.

```
cd ~/tokel/src
./tokeld -pubkey=**YOURPUBKEYHERE** &
```

You are now ready to use the Tokel blockchain to its fullest extent.

### Build and run nSPV node with websockets support

If you need to run a Tokel nSPV node with websockets support for providing web apps access to the blockchain you should build the daemon with --enable-websockets parameter.

Building for Linux:<br>
`./zcutil/build.sh --enable-websockets $(nproc)`

Building for Mac:<br>
`./zcutil/build-mac.sh --enable-websockets $(nproc)`

Building cross-compiled executable for Windows:<br>
`./zcutil/build-win.sh --enable-websockets $(nproc)`

The default websockets port is 8192. You could change it with -wsport parameter of daemon:
`./tokeld -wsport=your-port`

Do not forget to enable incoming TCP access to this port on the firewall.

License
-------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
