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
import contractABI from './json/contract_abi_v3_eth.json'
const NUM_TOKENS = 3
const tokenIds = [11, 22, 33] //[69,420,333]
const maxSupply = 640
const OS_LINK = 'https://opensea.io/collection/pitch-og-pass'
const WL_WALLET = '0x470de8e36eeffc9601d09044a4b6fdd81d900ccf' //"0xADda176020629A666Ed5012266a7F9D04096D40b"

// const CHAIN_ID = 5
// const CHAIN_NAME = "GOERLI"
// const CONTRACT_ADDRESS = "0x0e5d6e724C17dD6299D143B26C921F4BD48Cb86c"
const CHAIN_ID = 1
const CHAIN_NAME = 'ETH'
const CONTRACT_ADDRESS = '0x2a81E1Cf399f3E15716c6A07755FC94cC5AB06d6'

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
          <h2
            className="mintHeader"
            fontFamily="PoppinsExtraBold"
            fontSize="20px"
          >
            Mint Phase 2 Opens Mid-February (TBA)
          </h2>

          <h1
            className="mintHeader"
            fontFamily="PoppinsExtraBold"
            fontSize="24px"
          >
            Pitch Mint
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
            Token Id: {tokenIds[tokenIndex]}
          </Text>
          <Text fontSize="18px" marginBottom="12px">
            Supply: {totalSupply}
          </Text>
          <Flex direction="row">
            <button
              className="tokenIdPM"
              disabled={isButtonDisabled}
              onClick={decrementTokenIndex}
              fontSize="96px"
            >
              &lt;
            </button>

            {!isVideoLoaded ? (
              <Image width="250px" src={bkgSrcs[tokenIndex]}></Image>
            ) : (
              <video
                controls
                src={vidSrcs[tokenIndex]}
                width="250"
                onLoadedData={onLoadedData}
              ></video>
            )}
            <video
              controls
              src={vidSrcs[tokenIndex]}
              width="0"
              onLoadedData={onLoadedData}
              style={{ opacity: 0 }}
            ></video>

            <button
              className="tokenIdPM"
              disabled={isButtonDisabled}
              onClick={incrementTokenIndex}
            >
              &gt;
            </button>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Mint
