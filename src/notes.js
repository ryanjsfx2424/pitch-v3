import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

import contractABI from './json/TraitBasedNFT.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [contractInstance, setContractInstance] = useState(null)

  const [supplyA, setSupplyA] = useState(0)
  const [supplyB, setSupplyB] = useState(0)
  const [supplyC, setSupplyC] = useState(0)
  const [supplyD, setSupplyD] = useState(0)

  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    switch (quantity) {
      case 1:
        setPrice(ethers.utils.parseEther('0.01'))
        break
      case 2:
      case 3:
        setPrice(ethers.utils.parseEther('0.02'))
        break
      default:
        setPrice(ethers.utils.parseEther('0.03'))
        break
    }
  }, [quantity])

  async function initialize() {
    const ethereumProvider = await detectEthereumProvider()
    if (ethereumProvider) {
      setProvider(new ethers.providers.Web3Provider(ethereumProvider))
      await ethereumProvider.request({ method: 'eth_requestAccounts' })
      const instance = new ethers.Contract(
        '0xe23107323dd5c705598330d77cd19423ea6da0d1',
        contractABI,
        provider.getSigner(),
      )
      setContractInstance(instance)
      updateSupply()
    } else {
      console.log('Please install MetaMask!')
    }
  }

  async function updateSupply() {
    if (contractInstance) {
      setSupplyA((await contractInstance.traitToTokenIds('red')).length)
      setSupplyB((await contractInstance.traitToTokenIds('blue')).length)
      setSupplyC((await contractInstance.traitToTokenIds('green')).length)
      setSupplyD((await contractInstance.traitToTokenIds('purple')).length)
    }
  }

  async function mint(trait, proof) {
    try {
      let tx
      const userMintCount = await contractInstance.userMintCount(
        provider.getSigner().getAddress(),
      )

      if (userMintCount == 1 && quantity == 1) {
        tx = await contractInstance.mintWithTraitOG(trait, quantity, proof, {
          value: ethers.constants.Zero,
        })
      } else {
        tx = await contractInstance.mintWithTraitOG(trait, quantity, proof, {
          value: price,
        })
      }

      await tx.wait()
      updateSupply()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <p>Red Trait Supply: {supplyA}</p>
      <p>Blue Trait Supply: {supplyB}</p>
      <p>Green Trait Supply: {supplyC}</p>
      <p>Purple Trait Supply: {supplyD}</p>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={3}>3</option>
        <option value={6}>6</option>
      </select>

      <button onClick={() => mint('red', [])}>Mint Red Trait</button>
      <button onClick={() => mint('blue', [])}>Mint Blue Trait</button>
      <button onClick={() => mint('green', [])}>Mint Green Trait</button>
      <button onClick={() => mint('purple', [])}>Mint Purple Trait</button>
    </div>

    
  )
}

export default App



  //test images---------------------------------------------------
  // const [selectedPicture, setSelectedPicture] = useState('')

  // const pictures = {
  //   pic1: a,
  //   pic2: b,
  //   pic3: c,
  //   pic4: d,
  //   pic5: e,
  //   pic6: f,
  // }

  // const handleChange = (event) => {
  //   setSelectedPicture(event.target.value)
  // }
  // -------------------------------------------------------------

{/* <Flex
direction="column-reverse"
justify="center"
align="center"
className="selectPic"
>
{/* <select
  value={selectedPicture}
  onChange={handleChange}
  className="selectPicture"
>
  <option value="">Teams</option>
  <option value="pic1">Picture 1</option>
  <option value="pic2">Picture 2</option>
  <option value="pic3">Picture 3</option>
  <option value="pic4">Picture 4</option>
  <option value="pic5">Picture 5</option>
  <option value="pic6">Picture 6</option>
  <option value="pic1">Picture 7</option>
  <option value="pic2">Picture 8</option>
  <option value="pic3">Picture 9</option>
  <option value="pic4">Picture 10</option>
  <option value="pic5">Picture 11</option>
  <option value="pic6">Picture 12</option>
  <option value="pic1">Picture 13</option>
  <option value="pic2">Picture 14</option>
</select>
<div className="imageContainer">
  {selectedPicture && (
    <img src={pictures[selectedPicture]} alt="Selected Picture" />
  )}
</div> */}
</Flex> */}


import React from 'react'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import Web3EthContract from 'web3-eth-contract'
import { ethers } from 'ethers'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'
import {
  Flex,
  Image,
  Text,
  ChakraProvider,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Navbar from './Navbar'
import wlt from './json/TEAM.json'
import wlw from './json/WL.json'
import nft3 from './images/PITCH_OGPASS_Brrrr_02_1.mp4'
import nft2 from './images/PITCH_OGPASS_MatchDay_03_1.mp4'
import nft1 from './images/PITCH_OGPASS_StreetPitch_03_1.mp4'
import nft4 from './images/OGPass_1.mp4'
import bkg1 from './images/PITCH_OGPASS_Streetpitch.jpg'
import bkg2 from './images/PITCH_OGPASS_Matchday.jpg'
import bkg3 from './images/PITCH_OGPASS_Brrrr.jpg'
import contractABI from './json/TraitBasedNFT.json'

import Rockets from './images/Shirt_Thumbs/01_RocketsRedWhite.png'
import Black from './images/Shirt_Thumbs/02_BlackWhiteDynamite.png'
import Blue from './images/Shirt_Thumbs/03_BlueThunder.png'
import Victoria from './images/Shirt_Thumbs/04_VictoriaBlaugrana.png'
import Cielo from './images/Shirt_Thumbs/05_CieloAzzurro.png'
import Diamon from './images/Shirt_Thumbs/06_DiamondWhites.png'
import Dynamiet from './images/Shirt_Thumbs/07_DynamietRoodWit.png'
import Estrellas from './images/Shirt_Thumbs/08_EstrellasBrancoVerde.png'
import Fortuna from './images/Shirt_Thumbs/09_FortunaKoenigsrot.png'
import Groen from './images/Shirt_Thumbs/10_FCGroenWit.png'
import Unione from './images/Shirt_Thumbs/11_FCUnione.png'
import Force from './images/Shirt_Thumbs/12_ForceBleue.png'
import Grey from './images/Shirt_Thumbs/13_GreyShirt.png'
import Tank from './images/Shirt_Thumbs/14_GreyTankTop.png'
import Zip from './images/Shirt_Thumbs/15_GreyZipShirt.png'
import Luke from './images/Shirt_Thumbs/16_LukesLegendary.png'
import Pale from './images/Shirt_Thumbs/17_PaleGreyShirt.png'
import Rayos from './images/Shirt_Thumbs/18_RayosBlancos.png'
import Dragons from './images/Shirt_Thumbs/19_RedDragons.png'
import Fury from './images/Shirt_Thumbs/20_RedFury.png'
import Royals from './images/Shirt_Thumbs/21_RedRoyals.png'
import RedTank from './images/Shirt_Thumbs/22_RedTankTop.png'
import Fulmine from './images/Shirt_Thumbs/23_SCFulmine.png'
import Skyblue from './images/Shirt_Thumbs/24_SkyblueCity.png'
import SV from './images/Shirt_Thumbs/25_SVGelbSchwarz.png'
import Yellow from './images/Shirt_Thumbs/26_YellowZipShirt.png'
import Blank from './images/Shirt_Thumbs/27_NoShirt.png'

import { fetchJson } from 'ethers/lib/utils'

const NUM_TOKENS = 3
const tokenIds = [11, 22, 33] //[69,420,333]
const maxSupply = 640
const OS_LINK = 'https://opensea.io/collection/pitch-og-pass'
const WL_WALLET = '0x470de8e36eeffc9601d09044a4b6fdd81d900ccf' //"0xADda176020629A666Ed5012266a7F9D04096D40b"

// const CHAIN_ID = 5
// const CHAIN_NAME = "GOERLI"
// const CONTRACT_ADDRESS = "0x0e5d6e724C17dD6299D143B26C921F4BD48Cb86c"
// const CHAIN_ID = 1
// const CHAIN_NAME = 'ETH'
// const CONTRACT_ADDRESS = '0x2a81E1Cf399f3E15716c6A07755FC94cC5AB06d6'

const CHAIN_ID = 5
const CHAIN_NAME = 'GOERLI'
const CONTRACT_ADDRESS = '0x6Ce95F6ad2451213c35909d4B651034D4Dc71f41'

const bkgSrcs = [bkg1, bkg2, bkg3]
const vidSrcs = [nft1, nft2, nft3]

const Mint = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isCorrectChain, setIsCorrectChain] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [totalSupply, setTotalSupply] = useState('???/640')
  const [tokenIndex, setTokenIndex] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [connectError, setConnectError] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  function mod(n, m) {
    return ((n % m) + m) % m
  }

  const onLoadedData = () => {
    setIsVideoLoaded(true)
  }

  const handleConnectWallet = async () => {
    setIsButtonDisabled(true)
    await connectWallet()
    setIsButtonDisabled(false)
  }

  const handleSetTotalSupply = async (SmartContractObj) => {
    let localTotalSupply = 0
    for (var ii = 0; ii < tokenIds.length; ii++) {
      localTotalSupply += Number(
        await SmartContractObj.methods.totalSupply(tokenIds[ii]).call(),
      )
    }
    console.log('localTs: ', localTotalSupply)
    localTotalSupply = Number(localTotalSupply)
    console.log('localTs: ', localTotalSupply)
    let val
    if (String(localTotalSupply).length === 1) {
      val = ' ' + ' ' + String(localTotalSupply)
    } else if (String(localTotalSupply).length === 2) {
      val = ' ' + String(localTotalSupply)
    } else {
      val = String(localTotalSupply)
    }
    setTotalSupply(val + '/' + String(maxSupply))
  }

  const handleMint = async () => {
    setIsButtonDisabled(true)

    const newDiv = document.createElement('div')
    newDiv.style.setProperty('background-color', 'white')
    newDiv.style.setProperty('opacity', '25%')
    newDiv.style.setProperty('width', '100vw')
    newDiv.style.setProperty('height', '100vh')
    newDiv.style.setProperty('position', 'absolute')
    newDiv.style.setProperty('z-index', '100')

    const currentDiv = document.getElementById('MintTopFlex')
    console.log('currentDiv: ', currentDiv)
    // document.body.insertBefore(newDiv, currentDiv);
    currentDiv.parentNode.insertBefore(newDiv, currentDiv)
    console.log('129')

    const SmartContractObj = await mint()
    await handleSetTotalSupply(SmartContractObj)

    newDiv.remove()
    setIsButtonDisabled(false)
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      console.log('has window ethereum')

      Web3EthContract.setProvider(window.ethereum)
      const web3 = new Web3(window.ethereum)
      const SmartContractObj = new Web3EthContract(
        contractABI,
        CONTRACT_ADDRESS,
      )

      await handleSetTotalSupply(SmartContractObj)

      var account
      try {
        // account = await window.ethereum.request({method: 'eth_accounts'})
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log('accounts: ', accounts)
        account = accounts[0]
        console.log('got account: ', account)
      } catch {
        setErrMessage('err get account')
        alert('error grabbing account')
        setConnectError(true)
        console.log('error grabbing account')
        account = ''
        return { success: false }
      }

      if (account.length > 0) {
        var chainId
        try {
          chainId = await window.ethereum.request({ method: 'net_version' })
        } catch {
          setErrMessage('account err')
          alert('error grabbing account')
          setConnectError(true)
          console.log('err get account')
          chainId = -1
          return { success: false }
        }

        setIsWalletConnected(true)

        if (Number(chainId) === CHAIN_ID) {
          setIsCorrectChain(true)
          return { success: true }
        } else {
          setIsCorrectChain(false)
          alert('Change chain to ' + CHAIN_NAME)
          setErrMessage('Not on ' + CHAIN_NAME)
          setConnectError(true)
          return { success: false }
        }
      } else {
        setIsWalletConnected(false)
        setIsCorrectChain(false)
        alert('Could not get account - have you logged into metamask?')
        setErrMessage('No web3(?)')
        setConnectError(true)
        return { success: false }
      }
    } else {
      alert('install metamask or coinbase wallet extension!!')
      setErrMessage('No web3')
      setConnectError(true)
      return { success: false }
    }
  }

  function hashAccount(userAddress) {
    return Buffer.from(
      ethers.utils.solidityKeccak256(['address'], [userAddress]).slice(2),
      'hex',
    )
  }

  const postRequestMerkle = async (wallet) => {
    let merkleTreeTeam = new MerkleTree(wlt.map(hashAccount), keccak256, {
      sortPairs: true,
    })
    let merkleTreeWL = new MerkleTree(wlw.map(hashAccount), keccak256, {
      sortPairs: true,
    })
    let merkleProofTeam = merkleTreeTeam.getHexProof(hashAccount(wallet))
    let merkleProofWL = merkleTreeWL.getHexProof(hashAccount(wallet))

    console.log('merkleProofTeam: ', merkleProofTeam)
    console.log('keccak256 wallet: ', keccak256(wallet))
    console.log('wallet prm: ', wallet)
    console.log('team hex root: ', merkleTreeTeam.getHexRoot())
    console.log('wl hex root: ', merkleTreeWL.getHexRoot())

    if (
      merkleTreeTeam.verify(
        merkleProofTeam,
        keccak256(wallet),
        merkleTreeTeam.getHexRoot(),
      )
    ) {
      return [merkleProofTeam, 'team']
    } else if (
      merkleTreeWL.verify(
        merkleProofWL,
        keccak256(wallet),
        merkleTreeWL.getHexRoot(),
      )
    ) {
      return [merkleProofWL, 'wl']
    } else {
      return [-1, -1]
    }
  }

  const mint = async () => {
    Web3EthContract.setProvider(window.ethereum)
    const web3 = new Web3(window.ethereum)

    console.log('contractABI: ', contractABI)
    console.log('CONTRACT_ADDRESS: ', CONTRACT_ADDRESS)
    const SmartContractObj = new Web3EthContract(contractABI, CONTRACT_ADDRESS)

    // do merkle check first
    const values = await postRequestMerkle(window.ethereum.selectedAddress)
    console.log('values: ', values)
    const mintType = values[1]
    const merkleProof = values[0]

    let tokenId = tokenIds[tokenIndex]
    let gasLimitEstimate
    let gasPriceEstimate
    let receipt
    console.log('tokenId: ', tokenId)
    if (mintType === 'team') {
      try {
        gasLimitEstimate = await SmartContractObj.methods
          .mintTeam(mintAmount, tokenId, merkleProof)
          .estimateGas({
            from: window.ethereum.selectedAddress,
          })
      } catch (err) {
        console.log('116 team mint err: ', err)
        alert('Team Mint: error estimating gas')
        return SmartContractObj
      }

      gasPriceEstimate = await web3.eth.getGasPrice()
      console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
      console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

      try {
        receipt = await SmartContractObj.methods
          .mintTeam(mintAmount, tokenId, merkleProof)
          .send({
            gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
            gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
            to: CONTRACT_ADDRESS,
            from: window.ethereum.selectedAddress,
          })
        console.log('132 WL mint receipt: ', receipt)
        alert(
          'Team Mint: Successfully minted your Pitch NFTs! View them at ' +
            OS_LINK,
        )
        return SmartContractObj
      } catch (err) {
        console.log('135 WL mint err', err)
        alert('Team Mint: error minting your NFT(s).')
        return SmartContractObj
      }
    } else {
      let localSaleState = await SmartContractObj.methods.saleState().call()
      localSaleState = Number(localSaleState)
      if (localSaleState === 0) {
        alert('Error: sale is not active (WL).')
        return SmartContractObj
        //            } else if (localSaleState === 2 && mintType !== "wl") { // public
      } else if (localSaleState === 2 && mintType !== 'wl') {
        // public
        console.log('253')
        console.log(
          'window.ethereum.selectedAddress: ',
          window.ethereum.selectedAddress,
        )
        console.log(
          'window.ethereum.selectedAddress !== 0xAD: ',
          window.ethereum.selectedAddress !==
            '0xADda176020629A666Ed5012266a7F9D04096D40b',
        )
        let totalCostWei = await SmartContractObj.methods
          .tokenCostPublic()
          .call()
        totalCostWei = String(totalCostWei * mintAmount)
        console.log('totalCostWei public: ', totalCostWei)
        try {
          gasLimitEstimate = await SmartContractObj.methods
            .mintPublic_A$5(mintAmount, tokenId)
            .estimateGas({
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
        } catch (err) {
          console.log('151 mint err: ', err)
          alert('Mint: error estimating gas')
          return SmartContractObj
        }

        gasPriceEstimate = await web3.eth.getGasPrice()
        console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
        console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

        try {
          receipt = await SmartContractObj.methods
            .mintPublic_A$5(mintAmount, tokenId)
            .send({
              gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
              gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
              to: CONTRACT_ADDRESS,
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
          console.log('165 mint receipt: ', receipt)
          alert('Successfully minted your Pitch NFTs! View them at ' + OS_LINK)
          return SmartContractObj
        } catch (err) {
          console.log('135 WL mint err', err)
          alert('Team Mint: error minting your NFT(s).')
          return SmartContractObj
        }
      } else {
        console.log('290')
        if (mintType !== 'wl') {
          alert(
            "Error: public sale is not yet active and this wallet is not WL'd.",
          )
          return SmartContractObj
        }
        let totalCostWei = await SmartContractObj.methods.tokenCostWl().call()
        totalCostWei = String(totalCostWei * mintAmount)
        console.log('totalCostWei public: ', totalCostWei)

        try {
          gasLimitEstimate = await SmartContractObj.methods
            .mintWl_6a2f45d7c6df(mintAmount, tokenId, merkleProof)
            .estimateGas({
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
        } catch (err) {
          console.log('182 WL mint err: ', err)
          alert('WL Mint: error estimating gas')
          return SmartContractObj
        }

        gasPriceEstimate = await web3.eth.getGasPrice()
        console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
        console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

        try {
          receipt = await SmartContractObj.methods
            .mintWl_6a2f45d7c6df(mintAmount, tokenId, merkleProof)
            .send({
              gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
              gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
              to: CONTRACT_ADDRESS,
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
          console.log('196 WL mint receipt: ', receipt)
          alert(
            'WL Mint: Successfully minted your Pitch NFTs! View them at ' +
              OS_LINK,
          )
          return SmartContractObj
        } catch (err) {
          console.log('200 WL mint err', err)
          alert('WL Mint: error minting your NFT(s).')
          return SmartContractObj
        }
      }
    }
  }

  const handlePlusButton = async () => {
    setIsButtonDisabled(true)

    if (!isWalletConnected) {
      alert('Must Connect Wallet Before Incrementing Mint Amount.')
    } else {
      Web3EthContract.setProvider(window.ethereum)
      const web3 = new Web3(window.ethereum)
      const SmartContractObj = new Web3EthContract(
        contractABI,
        CONTRACT_ADDRESS,
      )
      await handleSetTotalSupply(SmartContractObj)

      let localSaleState = await SmartContractObj.methods.saleState().call()
      localSaleState = Number(localSaleState)
      console.log('localSaleState: ', localSaleState)

      let maxPerWalletTotal
      let totalMinted
      if (localSaleState === 0) {
        const values = await postRequestMerkle(window.ethereum.selectedAddress)
        // const values = await postRequestMerkle("0x470de8e36eeffc9601d09044a4b6fdd81d900ccf");
        const mintType = values[1]
        console.log('values: ', values)
        console.log('mintType: ', mintType)

        if (mintType !== 'team') {
          alert('Mint is inactive')
          maxPerWalletTotal = 0
          totalMinted = 0
        } else {
          console.log('maxPerWalletTeam')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalTeam()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedTeam(window.ethereum.selectedAddress)
            .call()
        }
      } else {
        if (localSaleState === 1) {
          // wl
          console.log('maxPerWalletWl')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalWl()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedWl(window.ethereum.selectedAddress)
            .call()
        } else if (localSaleState === 2) {
          // public
          console.log('maxPerWalletPublic')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalPublic()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedPublic(window.ethereum.selectedAddress)
            .call()
        }
      }
      const values = await postRequestMerkle(window.ethereum.selectedAddress)
      // const values = await postRequestMerkle("0x470de8e36eeffc9601d09044a4b6fdd81d900ccf");
      console.log('values: ', values)
      maxPerWalletTotal = Number(maxPerWalletTotal)
      totalMinted = Number(totalMinted)

      console.log(
        'mintAmount, maxPerWalletTotal, totalMinted: ',
        mintAmount,
        maxPerWalletTotal,
        totalMinted,
      )
      let localMintAmount = Math.min(
        mintAmount + 1,
        maxPerWalletTotal - totalMinted,
      )
      localMintAmount = Math.max(localMintAmount, 0)
      setMintAmount(localMintAmount)
    }

    setIsButtonDisabled(false)
  }

  const handleMinusButton = () => {
    setIsButtonDisabled(true)

    let localMintAmount = Math.max(0, mintAmount - 1)
    setMintAmount(localMintAmount)

    setIsButtonDisabled(false)
  }

  const decrementTokenIndex = async () => {
    setIsButtonDisabled(true)
    let localTokenIndex = mod(tokenIndex - 1, NUM_TOKENS)
    setTokenIndex(localTokenIndex)
    setIsButtonDisabled(false)
  }

  const incrementTokenIndex = async () => {
    setIsButtonDisabled(true)
    let localTokenIndex = (tokenIndex + 1) % NUM_TOKENS
    setTokenIndex(localTokenIndex)
    setIsButtonDisabled(false)
  }

  return (
    <ChakraProvider>
      <Flex
        id="MintTopFlex"
        direction="column"
        w="100vw"
        height="100vh"
        className="greenPitchBkg"
        fontFamily="PoppinsMedium"
        color="white"
      >
        {/* <Flex minHeight="60vh" w="100%" direction="column" bg="#1D8E65" color="white" fontFamily="PoppinsMedium"> */}
        <Navbar />
        <Flex
          w={['100%', '50%']}
          height={['70%']}
          mt={['0', '12']}
          bg="rgba(255,255,255,0.05)"
          borderRadius="8px"
          ml={[0, '25%']}
          padding={['4%', '1%']}
          direction="column"
          align="center"
        >
          <h1
            className="mintHeader"
            fontFamily="PoppinsExtraBold"
            fontSize="24px"
          >
            Pitch
          </h1>

          {window.ethereum && window.ethereum.selectedAddress ? (
            <Text marginBottom="12px">
              Wallet Address: 0x...
              {String(window.ethereum.selectedAddress).substring(
                String(window.ethereum.selectedAddress.length - 4),
              )}
            </Text>
          ) : (
            <Text marginBottom="12px">Wallet Address: 0x...????</Text>
          )}
          {!isWalletConnected && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          )}
          {isWalletConnected && !isButtonDisabled && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleMint}
            >
              Mint
            </button>
          )}
          {isWalletConnected && isButtonDisabled && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleMint}
            >
              Busy
            </button>
          )}
          {connectError && (
            <button
              className="ConnectMintButton"
              disabled={connectError}
              onClick={handleConnectWallet}
            >
              {errMessage}
            </button>
          )}

          <Flex marginTop="24px" marginBottom="12px" direction="row">
            <button
              className="pmButton"
              disabled={isButtonDisabled}
              onClick={handleMinusButton}
            >
              -
            </button>
            <Text w="12px" fontSize="24px">
              {mintAmount}
            </Text>
            <button
              className="pmButton"
              disabled={isButtonDisabled}
              onClick={handlePlusButton}
            >
              +
            </button>
          </Flex>

          <Text fontSize="24px" marginBottom="12px">
            Select Your Team:
          </Text>

          <Grid templateColumns="repeat(9, 1fr)" gap={6} fontSize="10px">
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Rockets} className="selectPicture" />
              <Text>A.F.C. Rockets</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Black} className="selectPicture" />
              <Text>Black and White Dynamite</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Blue} className="selectPicture" />
              <Text>Blue Thunder FC</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Victoria} className="selectPicture" />
              <Text>CF Victoria Blau-Grana</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Cielo} className="selectPicture" />
              <Text>Cielo Azzurro F.C.</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Diamon} className="selectPicture" />
              <Text>Diamond Whites</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Dynamiet} className="selectPicture" />
              <Text>Dynamiet Rood-Wit</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Estrellas} className="selectPicture" />
              <Text>Estrelas Branco-Verde S.C.</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Fortuna} className="selectPicture" />
              <Text>FC Fortuna KÃ¶nigsrot</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Groen} className="selectPicture" />
              <Text>FC Groen-Wit Kracht</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Unione} className="selectPicture" />
              <Text>FC Unione Blu e Nera</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Force} className="selectPicture" />
              <Text>Force Bleue FC</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Grey} className="selectPicture" />
              <Text>Grey Shirt</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Tank} className="selectPicture" />
              <Text>Grey Tank Top</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Zip} className="selectPicture" />
              <Text>Grey Zip Shirt</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Luke} className="selectPicture" />
              <Text>Luke's Legendary</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Pale} className="selectPicture" />
              <Text>Pale Grey Shirt</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Rayos} className="selectPicture" />
              <Text>Rayos Blancos CF</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Dragons} className="selectPicture" />
              <Text>Red Dragons FC</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Fury} className="selectPicture" />
              <Text>Red Fury FC</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Royals} className="selectPicture" />
              <Text>Red Royals United</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={RedTank} className="selectPicture" />
              <Text>Red Tank Top</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Fulmine} className="selectPicture" />
              <Text>S.C. Fulmine Nero-Bianco</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Skyblue} className="selectPicture" />
              <Text>Skyblue City Stars</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={SV} className="selectPicture" />
              <Text>SV Gelb-Schwarz</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Yellow} className="selectPicture" />
              <Text>Yellow Zip Shirt</Text>
              <Text>{totalSupply}</Text>
            </Flex>
            <Flex direction="column" align="centre" textAlign="center" gap={1}>
              <Image src={Blank} className="selectPicture" />
              <Text>No Shirt</Text>
              <Text>{totalSupply}</Text>
            </Flex>
          </Grid>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Mint


// import React, { useState } from 'react'
// import { ethers } from 'ethers'
// import TraitBasedNFT from './json/TraitBasedNFT.json'

// const CONTRACT_ADDRESS = '0x6Ce95F6ad2451213c35909d4B651034D4Dc71f41'
// const ABI = TraitBasedNFT.abi

// const Mint = () => {
//   const [connected, setConnected] = useState(false)
//   const [quantity, setQuantity] = useState(0)
//   const [remainingSupply, setRemainingSupply] = useState(0) // Ideally this should be fetched from your contract
//   const [error, setError] = useState(null)
//   const [provider, setProvider] = useState(null)
//   const [signer, setSigner] = useState(null)

//   const decrement = () => {
//     setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
//   }

//   const increment = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1)
//   }

//   const onConnectButtonClick = async () => {
//     if (typeof window.ethereum !== 'undefined') {
//       await window.ethereum.request({ method: 'eth_requestAccounts' })
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const signer = provider.getSigner()
//       setProvider(provider)
//       setSigner(signer)
//       setConnected(true)
//     } else {
//       setError('Please install MetaMask!')
//     }
//   }

//   const onMintButtonClick = async () => {
//     if (!provider || !signer) {
//       setError('You need to connect your wallet first.')
//       return
//     }
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

//     try {
//       const transaction = await contract.mintWithTraitPublic(1, quantity) // Modify accordingly to the right function and parameters you need to call for minting
//       setError(null)
//       await transaction.wait()
//       // Optionally you can update the remaining supply here by calling the respective function from your contract.
//     } catch (err) {
//       setError(err.message)
//     }
//   }

//   return (
//     <div>
//       <h1>Trait Based NFT</h1>
//       <p>Remaining supply for trait 1: {remainingSupply}</p>
//       <p>Quantity: {quantity}</p>
//       <button onClick={decrement}>-</button>
//       <button onClick={increment}>+</button>
//       {!connected && <button onClick={onConnectButtonClick}>Connect</button>}
//       {connected && <button onClick={onMintButtonClick}>Mint NFT</button>}
//       {error && <p>Error: {error}</p>}
//     </div>
//   )
// }

// export default Mint

import React from 'react'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import Web3EthContract from 'web3-eth-contract'
import { ethers } from 'ethers'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'
import { Flex, Image, Text, ChakraProvider } from '@chakra-ui/react'
import Navbar from './Navbar'
import wlt from './json/TEAM.json'
import wlw from './json/WL.json'
import nft3 from './images/PITCH_OGPASS_Brrrr_02_1.mp4'
import nft2 from './images/PITCH_OGPASS_MatchDay_03_1.mp4'
import nft1 from './images/PITCH_OGPASS_StreetPitch_03_1.mp4'
import nft4 from './images/OGPass_1.mp4'
import bkg1 from './images/PITCH_OGPASS_Streetpitch.jpg'
import bkg2 from './images/PITCH_OGPASS_Matchday.jpg'
import bkg3 from './images/PITCH_OGPASS_Brrrr.jpg'
import contractABI from './json/TraitBasedNFT.json'

import a from './images/a.jpg'
import b from './images/b.jpg'
import c from './images/c.jpg'
import d from './images/d.jpg'
import e from './images/e.jpg'
import f from './images/f.jpg'
import { fetchJson } from 'ethers/lib/utils'

const NUM_TOKENS = 3
const tokenIds = [11, 22, 33] //[69,420,333]
const maxSupply = 640
const OS_LINK = 'https://opensea.io/collection/pitch-og-pass'
const WL_WALLET = '0x470de8e36eeffc9601d09044a4b6fdd81d900ccf' //"0xADda176020629A666Ed5012266a7F9D04096D40b"

// const CHAIN_ID = 5
// const CHAIN_NAME = "GOERLI"
// const CONTRACT_ADDRESS = "0x0e5d6e724C17dD6299D143B26C921F4BD48Cb86c"
// const CHAIN_ID = 1
// const CHAIN_NAME = 'ETH'
// const CONTRACT_ADDRESS = '0x2a81E1Cf399f3E15716c6A07755FC94cC5AB06d6'

const CHAIN_ID = 5
const CHAIN_NAME = 'GOERLI'
const CONTRACT_ADDRESS = '0x0e5d6e724C17dD6299D143B26C921F4BD48Cb86c'

const bkgSrcs = [bkg1, bkg2, bkg3]
const vidSrcs = [nft1, nft2, nft3]

const Mint = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isCorrectChain, setIsCorrectChain] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [totalSupply, setTotalSupply] = useState('???/640')
  const [tokenIndex, setTokenIndex] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [connectError, setConnectError] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  //test images---------------------------------------------------
  const [selectedPicture, setSelectedPicture] = useState('')

  const pictures = {
    pic1: a,
    pic2: b,
    pic3: c,
    pic4: d,
    pic5: e,
    pic6: f,
  }

  const handleChange = (event) => {
    setSelectedPicture(event.target.value)
  }
  // -------------------------------------------------------------

  function mod(n, m) {
    return ((n % m) + m) % m
  }

  const onLoadedData = () => {
    setIsVideoLoaded(true)
  }

  const handleConnectWallet = async () => {
    setIsButtonDisabled(true)
    await connectWallet()
    setIsButtonDisabled(false)
  }

  const handleSetTotalSupply = async (SmartContractObj) => {
    let localTotalSupply = 0
    for (var ii = 0; ii < tokenIds.length; ii++) {
      localTotalSupply += Number(
        await SmartContractObj.methods.totalSupply(tokenIds[ii]).call(),
      )
    }
    console.log('localTs: ', localTotalSupply)
    localTotalSupply = Number(localTotalSupply)
    console.log('localTs: ', localTotalSupply)
    let val
    if (String(localTotalSupply).length === 1) {
      val = ' ' + ' ' + String(localTotalSupply)
    } else if (String(localTotalSupply).length === 2) {
      val = ' ' + String(localTotalSupply)
    } else {
      val = String(localTotalSupply)
    }
    setTotalSupply(val + '/' + String(maxSupply))
  }

  const handleMint = async () => {
    setIsButtonDisabled(true)

    const newDiv = document.createElement('div')
    newDiv.style.setProperty('background-color', 'white')
    newDiv.style.setProperty('opacity', '25%')
    newDiv.style.setProperty('width', '100vw')
    newDiv.style.setProperty('height', '100vh')
    newDiv.style.setProperty('position', 'absolute')
    newDiv.style.setProperty('z-index', '100')

    const currentDiv = document.getElementById('MintTopFlex')
    console.log('currentDiv: ', currentDiv)
    // document.body.insertBefore(newDiv, currentDiv);
    currentDiv.parentNode.insertBefore(newDiv, currentDiv)
    console.log('129')

    const SmartContractObj = await mint()
    await handleSetTotalSupply(SmartContractObj)

    newDiv.remove()
    setIsButtonDisabled(false)
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      console.log('has window ethereum')

      Web3EthContract.setProvider(window.ethereum)
      const web3 = new Web3(window.ethereum)
      const SmartContractObj = new Web3EthContract(
        contractABI,
        CONTRACT_ADDRESS,
      )

      await handleSetTotalSupply(SmartContractObj)

      var account
      try {
        // account = await window.ethereum.request({method: 'eth_accounts'})
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log('accounts: ', accounts)
        account = accounts[0]
        console.log('got account: ', account)
      } catch {
        setErrMessage('err get account')
        alert('error grabbing account')
        setConnectError(true)
        console.log('error grabbing account')
        account = ''
        return { success: false }
      }

      if (account.length > 0) {
        var chainId
        try {
          chainId = await window.ethereum.request({ method: 'net_version' })
        } catch {
          setErrMessage('account err')
          alert('error grabbing account')
          setConnectError(true)
          console.log('err get account')
          chainId = -1
          return { success: false }
        }

        setIsWalletConnected(true)

        if (Number(chainId) === CHAIN_ID) {
          setIsCorrectChain(true)
          return { success: true }
        } else {
          setIsCorrectChain(false)
          alert('Change chain to ' + CHAIN_NAME)
          setErrMessage('Not on ' + CHAIN_NAME)
          setConnectError(true)
          return { success: false }
        }
      } else {
        setIsWalletConnected(false)
        setIsCorrectChain(false)
        alert('Could not get account - have you logged into metamask?')
        setErrMessage('No web3(?)')
        setConnectError(true)
        return { success: false }
      }
    } else {
      alert('install metamask or coinbase wallet extension!!')
      setErrMessage('No web3')
      setConnectError(true)
      return { success: false }
    }
  }

  function hashAccount(userAddress) {
    return Buffer.from(
      ethers.utils.solidityKeccak256(['address'], [userAddress]).slice(2),
      'hex',
    )
  }

  const postRequestMerkle = async (wallet) => {
    let merkleTreeTeam = new MerkleTree(wlt.map(hashAccount), keccak256, {
      sortPairs: true,
    })
    let merkleTreeWL = new MerkleTree(wlw.map(hashAccount), keccak256, {
      sortPairs: true,
    })
    let merkleProofTeam = merkleTreeTeam.getHexProof(hashAccount(wallet))
    let merkleProofWL = merkleTreeWL.getHexProof(hashAccount(wallet))

    console.log('merkleProofTeam: ', merkleProofTeam)
    console.log('keccak256 wallet: ', keccak256(wallet))
    console.log('wallet prm: ', wallet)
    console.log('team hex root: ', merkleTreeTeam.getHexRoot())
    console.log('wl hex root: ', merkleTreeWL.getHexRoot())

    if (
      merkleTreeTeam.verify(
        merkleProofTeam,
        keccak256(wallet),
        merkleTreeTeam.getHexRoot(),
      )
    ) {
      return [merkleProofTeam, 'team']
    } else if (
      merkleTreeWL.verify(
        merkleProofWL,
        keccak256(wallet),
        merkleTreeWL.getHexRoot(),
      )
    ) {
      return [merkleProofWL, 'wl']
    } else {
      return [-1, -1]
    }
  }

  const mint = async () => {
    Web3EthContract.setProvider(window.ethereum)
    const web3 = new Web3(window.ethereum)

    console.log('contractABI: ', contractABI)
    console.log('CONTRACT_ADDRESS: ', CONTRACT_ADDRESS)
    const SmartContractObj = new Web3EthContract(contractABI, CONTRACT_ADDRESS)

    // do merkle check first
    const values = await postRequestMerkle(window.ethereum.selectedAddress)
    console.log('values: ', values)
    const mintType = values[1]
    const merkleProof = values[0]

    let tokenId = tokenIds[tokenIndex]
    let gasLimitEstimate
    let gasPriceEstimate
    let receipt
    console.log('tokenId: ', tokenId)
    if (mintType === 'team') {
      try {
        gasLimitEstimate = await SmartContractObj.methods
          .mintTeam(mintAmount, tokenId, merkleProof)
          .estimateGas({
            from: window.ethereum.selectedAddress,
          })
      } catch (err) {
        console.log('116 team mint err: ', err)
        alert('Team Mint: error estimating gas')
        return SmartContractObj
      }

      gasPriceEstimate = await web3.eth.getGasPrice()
      console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
      console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

      try {
        receipt = await SmartContractObj.methods
          .mintTeam(mintAmount, tokenId, merkleProof)
          .send({
            gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
            gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
            to: CONTRACT_ADDRESS,
            from: window.ethereum.selectedAddress,
          })
        console.log('132 WL mint receipt: ', receipt)
        alert(
          'Team Mint: Successfully minted your Pitch NFTs! View them at ' +
            OS_LINK,
        )
        return SmartContractObj
      } catch (err) {
        console.log('135 WL mint err', err)
        alert('Team Mint: error minting your NFT(s).')
        return SmartContractObj
      }
    } else {
      let localSaleState = await SmartContractObj.methods.saleState().call()
      localSaleState = Number(localSaleState)
      if (localSaleState === 0) {
        alert('Error: sale is not active (WL).')
        return SmartContractObj
        //            } else if (localSaleState === 2 && mintType !== "wl") { // public
      } else if (localSaleState === 2 && mintType !== 'wl') {
        // public
        console.log('253')
        console.log(
          'window.ethereum.selectedAddress: ',
          window.ethereum.selectedAddress,
        )
        console.log(
          'window.ethereum.selectedAddress !== 0xAD: ',
          window.ethereum.selectedAddress !==
            '0xADda176020629A666Ed5012266a7F9D04096D40b',
        )
        let totalCostWei = await SmartContractObj.methods
          .tokenCostPublic()
          .call()
        totalCostWei = String(totalCostWei * mintAmount)
        console.log('totalCostWei public: ', totalCostWei)
        try {
          gasLimitEstimate = await SmartContractObj.methods
            .mintPublic_A$5(mintAmount, tokenId)
            .estimateGas({
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
        } catch (err) {
          console.log('151 mint err: ', err)
          alert('Mint: error estimating gas')
          return SmartContractObj
        }

        gasPriceEstimate = await web3.eth.getGasPrice()
        console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
        console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

        try {
          receipt = await SmartContractObj.methods
            .mintPublic_A$5(mintAmount, tokenId)
            .send({
              gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
              gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
              to: CONTRACT_ADDRESS,
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
          console.log('165 mint receipt: ', receipt)
          alert('Successfully minted your Pitch NFTs! View them at ' + OS_LINK)
          return SmartContractObj
        } catch (err) {
          console.log('135 WL mint err', err)
          alert('Team Mint: error minting your NFT(s).')
          return SmartContractObj
        }
      } else {
        console.log('290')
        if (mintType !== 'wl') {
          alert(
            "Error: public sale is not yet active and this wallet is not WL'd.",
          )
          return SmartContractObj
        }
        let totalCostWei = await SmartContractObj.methods.tokenCostWl().call()
        totalCostWei = String(totalCostWei * mintAmount)
        console.log('totalCostWei public: ', totalCostWei)

        try {
          gasLimitEstimate = await SmartContractObj.methods
            .mintWl_6a2f45d7c6df(mintAmount, tokenId, merkleProof)
            .estimateGas({
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
        } catch (err) {
          console.log('182 WL mint err: ', err)
          alert('WL Mint: error estimating gas')
          return SmartContractObj
        }

        gasPriceEstimate = await web3.eth.getGasPrice()
        console.log({ resultOfGasLimitEstimate: gasLimitEstimate })
        console.log({ resultOfGasPriceEstimate: gasPriceEstimate })

        try {
          receipt = await SmartContractObj.methods
            .mintWl_6a2f45d7c6df(mintAmount, tokenId, merkleProof)
            .send({
              gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
              gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
              to: CONTRACT_ADDRESS,
              from: window.ethereum.selectedAddress,
              value: totalCostWei,
            })
          console.log('196 WL mint receipt: ', receipt)
          alert(
            'WL Mint: Successfully minted your Pitch NFTs! View them at ' +
              OS_LINK,
          )
          return SmartContractObj
        } catch (err) {
          console.log('200 WL mint err', err)
          alert('WL Mint: error minting your NFT(s).')
          return SmartContractObj
        }
      }
    }
  }

  const handlePlusButton = async () => {
    setIsButtonDisabled(true)

    if (!isWalletConnected) {
      alert('Must Connect Wallet Before Incrementing Mint Amount.')
    } else {
      Web3EthContract.setProvider(window.ethereum)
      const web3 = new Web3(window.ethereum)
      const SmartContractObj = new Web3EthContract(
        contractABI,
        CONTRACT_ADDRESS,
      )
      await handleSetTotalSupply(SmartContractObj)

      let localSaleState = await SmartContractObj.methods.saleState().call()
      localSaleState = Number(localSaleState)
      console.log('localSaleState: ', localSaleState)

      let maxPerWalletTotal
      let totalMinted
      if (localSaleState === 0) {
        const values = await postRequestMerkle(window.ethereum.selectedAddress)
        // const values = await postRequestMerkle("0x470de8e36eeffc9601d09044a4b6fdd81d900ccf");
        const mintType = values[1]
        console.log('values: ', values)
        console.log('mintType: ', mintType)

        if (mintType !== 'team') {
          alert('Mint is inactive')
          maxPerWalletTotal = 0
          totalMinted = 0
        } else {
          console.log('maxPerWalletTeam')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalTeam()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedTeam(window.ethereum.selectedAddress)
            .call()
        }
      } else {
        if (localSaleState === 1) {
          // wl
          console.log('maxPerWalletWl')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalWl()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedWl(window.ethereum.selectedAddress)
            .call()
        } else if (localSaleState === 2) {
          // public
          console.log('maxPerWalletPublic')
          maxPerWalletTotal = await SmartContractObj.methods
            .maxPerWalletTotalPublic()
            .call()
          totalMinted = await SmartContractObj.methods
            .walletTotalMintedPublic(window.ethereum.selectedAddress)
            .call()
        }
      }
      const values = await postRequestMerkle(window.ethereum.selectedAddress)
      // const values = await postRequestMerkle("0x470de8e36eeffc9601d09044a4b6fdd81d900ccf");
      console.log('values: ', values)
      maxPerWalletTotal = Number(maxPerWalletTotal)
      totalMinted = Number(totalMinted)

      console.log(
        'mintAmount, maxPerWalletTotal, totalMinted: ',
        mintAmount,
        maxPerWalletTotal,
        totalMinted,
      )
      let localMintAmount = Math.min(
        mintAmount + 1,
        maxPerWalletTotal - totalMinted,
      )
      localMintAmount = Math.max(localMintAmount, 0)
      setMintAmount(localMintAmount)
    }

    setIsButtonDisabled(false)
  }

  const handleMinusButton = () => {
    setIsButtonDisabled(true)

    let localMintAmount = Math.max(0, mintAmount - 1)
    setMintAmount(localMintAmount)

    setIsButtonDisabled(false)
  }

  const decrementTokenIndex = async () => {
    setIsButtonDisabled(true)
    let localTokenIndex = mod(tokenIndex - 1, NUM_TOKENS)
    setTokenIndex(localTokenIndex)
    setIsButtonDisabled(false)
  }

  const incrementTokenIndex = async () => {
    setIsButtonDisabled(true)
    let localTokenIndex = (tokenIndex + 1) % NUM_TOKENS
    setTokenIndex(localTokenIndex)
    setIsButtonDisabled(false)
  }

  return (
    <ChakraProvider>
      <Flex
        id="MintTopFlex"
        direction="column"
        w="100vw"
        height="100vh"
        className="greenPitchBkg"
        fontFamily="PoppinsMedium"
        color="white"
      >
        {/* <Flex minHeight="60vh" w="100%" direction="column" bg="#1D8E65" color="white" fontFamily="PoppinsMedium"> */}
        <Navbar />
        <Flex
          w={['100%', '50%']}
          height={['70%']}
          mt={['0', '12']}
          bg="rgba(255,255,255,0.05)"
          borderRadius="8px"
          ml={[0, '25%']}
          padding={['4%', '1%']}
          direction="column"
          align="center"
        >
          <h1
            className="mintHeader"
            fontFamily="PoppinsExtraBold"
            fontSize="24px"
          >
            Pitch
          </h1>

          {window.ethereum && window.ethereum.selectedAddress ? (
            <Text marginBottom="12px">
              Wallet Address: 0x...
              {String(window.ethereum.selectedAddress).substring(
                String(window.ethereum.selectedAddress.length - 4),
              )}
            </Text>
          ) : (
            <Text marginBottom="12px">Wallet Address: 0x...????</Text>
          )}
          {!isWalletConnected && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          )}
          {isWalletConnected && !isButtonDisabled && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleMint}
            >
              Mint
            </button>
          )}
          {isWalletConnected && isButtonDisabled && !connectError && (
            <button
              className="ConnectMintButton"
              disabled={isButtonDisabled}
              onClick={handleMint}
            >
              Busy
            </button>
          )}
          {connectError && (
            <button
              className="ConnectMintButton"
              disabled={connectError}
              onClick={handleConnectWallet}
            >
              {errMessage}
            </button>
          )}

          <Flex marginTop="24px" marginBottom="12px" direction="row">
            <button
              className="pmButton"
              disabled={isButtonDisabled}
              onClick={handleMinusButton}
            >
              -
            </button>
            <Text w="12px" fontSize="24px">
              {mintAmount}
            </Text>
            <button
              className="pmButton"
              disabled={isButtonDisabled}
              onClick={handlePlusButton}
            >
              +
            </button>
          </Flex>

          <Text fontSize="24px" marginBottom="0px">
            Select Your Team:
          </Text>
          <Text fontSize="18px" marginBottom="12px">
            Supply: {totalSupply}
          </Text>

          <Flex
            direction="column-reverse"
            justify="center"
            align="center"
            className="selectPic"
          >
            <select
              value={selectedPicture}
              onChange={handleChange}
              className="selectPicture"
            >
              <option value="">Teams</option>
              <option value="pic1">Picture 1</option>
              <option value="pic2">Picture 2</option>
              <option value="pic3">Picture 3</option>
              <option value="pic4">Picture 4</option>
              <option value="pic5">Picture 5</option>
              <option value="pic6">Picture 6</option>
              <option value="pic1">Picture 7</option>
              <option value="pic2">Picture 8</option>
              <option value="pic3">Picture 9</option>
              <option value="pic4">Picture 10</option>
              <option value="pic5">Picture 11</option>
              <option value="pic6">Picture 12</option>
              <option value="pic1">Picture 13</option>
              <option value="pic2">Picture 14</option>
            </select>
            <div className="imageContainer">
              {selectedPicture && (
                <img src={pictures[selectedPicture]} alt="Selected Picture" />
              )}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Mint
