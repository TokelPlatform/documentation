## Preparing your environment

### Build Komodo (yep, the komodo daemon runs Tokel)

Tokel is a completely independant blockchain created using Komodo technologies. In order to run the Tokel blockchain, you must build the Komodo daemon and launch the Tokel blockchain using that. You do **not** have to run the Komodo blockchain in order to run and use the Tokel blockchain.

Komodo technology allows anyone to create smartchains which are independent blockchains, such as Tokel.

#### Dependencies

```shell
#The following packages are needed:
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git zlib1g-dev wget curl bsdmainutils automake cmake clang ntp ntpdate nano -y
```

#### Linux
```shell
git clone https://github.com/komodoplatform/komodo --branch tokel --single-branch
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
git clone https://github.com/komodoplatform/komodo --branch tokel --single-branch
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

git clone https://github.com/komodoplatform/komodo --branch tokel --single-branch
cd komodo
./zcutil/fetch-params.sh
./zcutil/build-win.sh -j$(expr $(nproc) - 1)
#This can take some time.
```

To reset the Tokel blockchain change into the *~/.komodo/TOKEL* data directory and delete the corresponding files by running `rm -rf blocks chainstate debug.log komodostate db.log`

### Create tokel.conf

Create a tokel.conf file:

```
mkdir ~/.komodo/tokel
cd ~/.komodo/tokel
touch tokel.conf

#Add the following lines to the tokel.conf file and change the username/password:
rpcuser=**yourrpcusername**
rpcpassword=**yoursecurerpcpassword**
rpcbind=127.0.0.1
txindex=1
addnode=135.125.204.169
addnode=192.99.71.125
addressindex=1
spentindex=1
```

## Launch the Tokel blockchain

Change to the Komodo src directory:

```
cd ~/komodo/src
```

Launch the Tokel chain command:

```
./komodod -ac_name=TOKEL ************** ADD PARAMS
```

Now wait for the chain to finish syncing. This might take while depending on your machine and internet connection. You can check check sync progress by using tail -f on the debug.log file in the coin data directory. Double check the number of blocks you've downloaded with an explorer to verify you're up to the latest block.

```
tail -f ~/.komodo/TOKEL/debug.log
```

Tokel uses CryptoConditions that require launching the blockchain with the `-pubkey` parameter to work correctly. Once you have completed block download, you will need to create a new address or import your current address. After you have done that, you will need to stop the blockchain and launch it with the `-pubkey` parameter.

You can use the RPC below to create a new address or import a privkey you currently have.

```
./komodo-cli -ac_name=TOKEL getnewaddress
```
```
./komodo-cli -ac_name=TOKEL importprivkey
```

Once you have completed this, use the `validateaddress` RPC to find your associated pubkey.

```
./komodo-cli -ac_name=TOKEL validateaddress *INSERTYOURADDRESSHERE*
```

Once you have written down your pubkey, stop the Tokel blockchain.

```
cd ~/komodo/src
./komodo-cli -ac_name=TOKEL stop
```

Wait a minute or so for the blockchain to stop, then relaunch the Tokel blockchain with the command below. Please remove the ** and replace them with the pubkey of the address you imported.

```
cd ~/komodo/src
./komodod -ac_name=TOKEL ****ADD PARAMS***** -pubkey=**YOURPUBKEYHERE** &
```

You are now ready to use the Tokel blockchain to its fullest extent.

License
-------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
