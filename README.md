# METACRAFTERES PROJECT-2

## SETUP
to install dependencies
```shell
yarn
```
## Functions of the project
### Connect wallet
Any wallet which is used cryprocurrencies is present in the window object.
that wallet can be fetched to be used in the Dapp.
here is the code of how app is connect to the wallet in the metamask.
```javascript
export default function ConnectWallet() {

    async function connect (){
      if (typeof window.ethereum !== "undefined") {
        
        console.log("I see a metamask")
        await window.ethereum.request({method: 'eth_requestAccounts'})
        document.getElementById('connectWalletBtn').innerHTML="Connected"
        console.log("metamask is now connected")
        
      } else {
        document.getElementById('connectWalletBtn').innerHTML="Install Metamask"
        console.log("No metamask")
      }
    }
    
  
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-5 sm:ml-3 ml-7 p-2 mt-32 rounded-full" onClick={()=>{connect();}} id='connectWalletBtn'>
          Connect to your metacraft wallet
        </button>
    )
  }

```
### Get balance of the contract
any deployed contract has a property called getBalance which is used here to display the balance
```javascript
async function getBal() {
  const d = new Date()
  const day = d.getDay()
  const month = d.getMonth()
  const year = d.getFullYear()
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    

    await provider.getBalance(contractAddress).then((data)=>{
      const bal=data 
      console.log(ethers.utils.formatEther(bal));
      document.getElementById('getBalButton').innerHTML = `Funds raised till ${day}-${month}-${year} is 
      ${ethers.utils.formatEther(bal)}`
    }).catch((err)=>{console.error(err);})
  }
```
### Fund the contract with user provided number of tokens
Here is the most important function in this contract .
Fund() is a function which is defined in the contract itself, this is payable function which is used to send some value to the contract; this value can be sent by anyone who uses this contract. 
This function is actually accessed through the ABI of the contract after its deployment.

Here is the solidity code of fund()
```solidity
function fund() public payable {
        require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
```
And here is its javascript implementation
```javascript
function Fund() {
  let amount = document.getElementById('amt').value
  console.log(`Funding the contract with ${amount}`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(contractAddress, abi, signer)
    console.log(contract);
    try {
      let txRes = {}
      contract.fund({
        value: ethers.utils.parseEther(amount)
      })
      .then((data) => { 
        listenForTransactionMine(data,provider).then((data)=>{console.log(data);}).catch((err)=>{console.log(err);}); })
      .catch((err) => { console.log(err); })

      
      document.getElementById('fund').innerHTML = "Funded"
      console.log("done"); 
    } catch (err) {
      console.error(err); 
    }

    function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`)
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations}confirmations`
      );
      resolve("transaction mined")
    })

  })
}

```
