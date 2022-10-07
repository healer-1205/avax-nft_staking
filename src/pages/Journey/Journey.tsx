import React, { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import "./Journey.css"
import { BigNumber, ethers } from "ethers"
import { useAccount, useConnect, useContract, useNetwork, useProvider, useSigner, useSwitchNetwork } from "wagmi"
import config from "../../config"
import { NFTContract } from "../../contracts"
import NFTContractABI from "../../abis/NFTContract.json"

export const Journey: React.FC = () => {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const [rewards, setRewards] = useState<ethers.BigNumber>()

  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()

  const nftContract = useContract<NFTContract>({
    addressOrName: config.nftContractAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: NFTContractABI,
  })

  useEffect(() => {
    if (!nftContract.signer) return
    nftContract.signer.getAddress().then((_address) => {
      nftContract.balanceOf(_address).then((_balance) => {
        const promises: Array<Promise<ethers.BigNumber>> = []
        for (let index = ethers.BigNumber.from(0); index.lt(_balance); index = index.add(1))
          promises.push(nftContract.tokenOfOwnerByIndex(_address, index))
        Promise.allSettled(promises).then((_tokenIdResults) => {
          const tokenIds = _tokenIdResults.flatMap((_tokenIdResult) => {
            if (_tokenIdResult.status === "fulfilled")
              return [(_tokenIdResult as PromiseFulfilledResult<ethers.BigNumber>).value.toString()]
            else return []
          })
          console.log(tokenIds)
        })
      })
    })
  }, [nftContract])

  return (
    <div className="journey-container">
      <Header />
      <div></div>
      <Footer />
    </div>
  )
}
