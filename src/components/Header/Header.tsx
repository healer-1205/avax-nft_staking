import React, { useState, useEffect } from "react"
import { Row, Col, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi"
import { useAccount, useConnect, useContract, useNetwork, useProvider, useSigner, useSwitchNetwork } from "wagmi"

import Logo from "../../assets/images/logo.png"
import "./Header.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "@restart/ui/esm/Button"
import config from "../../config"
import { NFTContract } from "../../contracts"
import NFTContractABI from "../../abis/NFTContract.json"
import * as ethers from "ethers"

const ClaimButton: React.FC<{ className?: string }> = ({ className }) => {
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
    nftContract.claimableRewards().then((res) => {
      setRewards(res)
    })
  }, [nftContract])

  return isConnected ? (
    config.networkId === chain?.id ? (
      <Button
        className={className}
        onClick={async (event) => {
          event.preventDefault()
          if (!nftContract.signer) return
          nftContract
            .claimRewards()
            .then((res) => {})
            .catch((err) => {
              console.log(err)
            })
        }}
      >
        Claim
      </Button>
    ) : (
      <Button
        className={className}
        onClick={(event) => {
          event.preventDefault()
          switchNetwork?.(config.networkId)
        }}
      >
        SwitchNetwork
      </Button>
    )
  ) : (
    <Button
      className={className}
      onClick={(event) => {
        event.preventDefault()
        const [metamaskConnector] = connectors.filter((_connector) => _connector.id === "injected")
        if (!metamaskConnector) return
        connect({ connector: metamaskConnector })
      }}
    >
      Connect
    </Button>
  )
}

export const Header: React.FC = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [activeIndex, setActiveIndex] = useState(-1)

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My WoA",
      link: "/mywoa",
    },
    {
      name: "Journey",
      link: "/journey",
    },
    {
      name: "Market",
      link: "/market",
    },
    {
      name: "Docs",
      link: "https://wolf-of-avax.gitbook.io/wolf-of-avax-woa/",
    },
  ]

  return (
    <div className="header-nav-container">
      <Offcanvas className="nav-offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeVariant="white" closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-li-small">
            <li className="mb-5 ">
              <Link to="/">
                <img width="150px" src={Logo} alt="" />
              </Link>
            </li>
            {navLinks.map((nav, index) => {
              return (
                <li key={index}>
                  {nav.name === "Docs" ? (
                    <a
                      href={nav.link}
                      target="_blank"
                      rel="noreferrer"
                      className={activeIndex === index ? "cool-link active" : "cool-link"}
                      onClick={() => setActiveIndex(index)}
                    >
                      {nav.name}
                    </a>
                  ) : (
                    <Link
                      to={nav.link}
                      className={activeIndex === index ? "cool-link active" : "cool-link"}
                      onClick={() => setActiveIndex(index)}
                    >
                      {nav.name}
                    </Link>
                  )}
                </li>
              )
            })}
            <ClaimButton className="btn-connect small-nav mt-5" />
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <Row className="justify-content-around ">
        <Col xs={3} lg={3}>
          <img width="150px" src={Logo} alt="" />
        </Col>
        <Col xs={7} md={7} lg={5}>
          <ul className="navbar-li">
            {navLinks.map((nav, index) => {
              return (
                <li key={index}>
                  {nav.name === "Docs" ? (
                    <a
                      href={nav.link}
                      target="_blank"
                      rel="noreferrer"
                      className={activeIndex === index ? "cool-link active" : "cool-link"}
                      onClick={() => setActiveIndex(index)}
                    >
                      {nav.name}
                    </a>
                  ) : (
                    <Link
                      to={nav.link}
                      className={activeIndex === index ? "cool-link active" : "cool-link"}
                      onClick={() => setActiveIndex(index)}
                    >
                      {nav.name}
                    </Link>
                  )}
                </li>
              )
            })}
            <ClaimButton className="btn-connect" />
          </ul>
        </Col>
        <Col xs={1} className="menu-icon">
          <div onClick={handleShow}>
            <HiMenu />
          </div>
        </Col>
      </Row>
    </div>
  )
}
