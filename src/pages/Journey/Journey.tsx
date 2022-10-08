import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row, Modal } from "react-bootstrap"
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
  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()

  const [nftTokens, setNftTokens] = useState<Array<NFTTokenType>>([])
  const [modalShow, setModalShow] = useState<boolean>(false)

  const handleModalClose = () => setModalShow(false)
  const handleModalShow = () => setModalShow(true)

  const nftContract = useContract<NFTContract>({
    addressOrName: config.nftContractAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: NFTContractABI,
  })

  const stakingContract = useContract<ERC721Staking>({
    addressOrName: config.stakingContractAddress,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: ERC721StakingABI,
  })

  useEffect(() => {
    if (!nftContract.signer) return
    nftContract.signer
      .getAddress()
      .then((_address) => {
        nftContract.balanceOf(_address).then((_balance) => {
          const promises: Array<Promise<NFTTokenType>> = []
          for (let index = ethers.BigNumber.from(0); index.lt(_balance); index = index.add(1))
            promises.push(
              new Promise<NFTTokenType>(async (resolve, reject) => {
                const _tokenId = await nftContract.tokenOfOwnerByIndex(_address, index)
                const _approvedAddress = await nftContract.getApproved(_tokenId)
                resolve({ id: _tokenId, approved: _approvedAddress === config.stakingContractAddress })
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
      .catch(console.error)
  }, [nftContract])

  return (
    <div className="journey-container">
      <Header />
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Staking Status Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your NFT staked Successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
                        .then(() => {
                          setNftTokens(nftTokens.filter((item) => _nftToken.id !== item.id))
                          handleModalShow()
                        })
                        .catch(console.error)
                    else
                      nftContract
                        .approve(config.stakingContractAddress, _nftToken.id)
                        .then(() => {
                          setNftTokens(
                            nftTokens.map((item) => (_nftToken.id === item.id ? { ...item, approved: true } : item))
                          )
                        })
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
