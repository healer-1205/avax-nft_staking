import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { ethers } from "ethers"
import { useAccount, useContract, useProvider, useSigner } from "wagmi"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import "./Journey.css"
import config from "../../config"
import { NFTContract, ERC721Staking } from "../../contracts"
import NFTContractABI from "../../abis/NFTContract.json"
import ERC721StakingABI from "../../abis/ERC721Staking.json"

type NFTTokenType = { id: ethers.BigNumber; approved: boolean }

export const Journey: React.FC = () => {
  const { isConnected } = useAccount()

  const [nftTokens, setNftTokens] = useState<Array<NFTTokenType>>([])

  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()

  const nftContract = useContract<NFTContract>({
    addressOrName: config.nftContractAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: NFTContractABI,
  })

  const stakingContract = useContract<ERC721Staking>({
    addressOrName: config.stakingContractAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: ERC721StakingABI,
  })

  useEffect(() => {
    if (!nftContract.signer) return
    nftContract.signer.getAddress().then((_address) => {
      nftContract.balanceOf(_address).then((_balance) => {
        const promises: Array<Promise<NFTTokenType>> = []
        for (let index = ethers.BigNumber.from(0); index.lt(_balance); index = index.add(1))
          promises.push(
            new Promise<NFTTokenType>(async (resolve, reject) => {
              const _tokenId = await nftContract.tokenOfOwnerByIndex(_address, index)
              const _approvedAddress = await nftContract.getApproved(_tokenId)
              resolve({ id: _tokenId, approved: _approvedAddress === config.stakingContractAddrss })
            })
          )
        Promise.allSettled(promises).then((_tokenIdResults) => {
          const _tokenIds = _tokenIdResults.flatMap((_tokenIdResult) => {
            if (_tokenIdResult.status === "fulfilled")
              return [(_tokenIdResult as PromiseFulfilledResult<NFTTokenType>).value]
            else return []
          })
          setNftTokens(_tokenIds)
        })
      })
    })
  }, [nftContract])

  return (
    <div className="journey-container">
      <Header />
      <Container className="content">
        <Row className="journey-row">
          {nftTokens.map((_nftToken) => {
            return (
              <Col key={_nftToken.id.toString()} xs={12} sm={12} md={3}>
                <p>TokenID: {_nftToken.id.toString()}</p>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    if (!nftContract.signer) return
                    if (_nftToken.approved)
                      stakingContract
                        .stake(_nftToken.id)
                        .then(() => console.log("success"))
                        .catch(console.error)
                    else
                      nftContract
                        .approve(config.stakingContractAddrss, _nftToken.id)
                        .then(() => console.log("success"))
                        .catch(console.error)
                  }}
                >
                  {_nftToken.approved ? "Staking" : "Approve"}
                </Button>
              </Col>
            )
          })}
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
