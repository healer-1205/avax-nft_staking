import './header.css';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";
import { HiMenu } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { fetchBalance } from "../redux/balance/balanceActions";

const Header = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const balance = useSelector((state) => state.balance);
    const [claimingNft, setClaimingNft] = useState(false);
    const [claimingRewards, setClaimingRewards] = useState(false);
    const [feedback, setFeedback] = useState(`Click connect to mint your NFT.`);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "",
            SYMBOL: "",
            ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const claimRewards = () => {
        if (parseFloat(balance.claimableBalance) > 0) {
            let gasLimit = String(CONFIG.GAS_LIMIT);
            console.log("Gas limit: ", gasLimit);
            setClaimingRewards(true);
            blockchain.smartContract.methods
                .claimRewards()
                .send({
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                    value: '0',
                })
                .once("error", (err) => {
                    console.log(err);
                    setFeedback("Sorry, something went wrong please try again later.");
                    setClaimingRewards(false);
                })
                .then((receipt) => {
                    console.log(receipt);
                    console.log(`You have successfully claimed your ${balance.claimableBalance} rewards!`);
                    setClaimingRewards(false);
                    dispatch(fetchData(blockchain.account));
                    dispatch(fetchBalance(blockchain.account));
                });
        }
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    const getClaimableBalance = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchBalance(blockchain.account));
        }
    };

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        getData();
        getClaimableBalance(blockchain.account);
    }, [blockchain.account]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navLinks = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "My WoA",
            link: "/mywoa"
        },
        {
            name: "Journey",
            link: "/journey"
        },
        {
            name: "Market",
            link: "/market"
        },
        {
            name: "Docs",
            link: "https://wolf-of-avax.gitbook.io/wolf-of-avax-woa/"
        }
    ]
    const [activeIndex, setActiveIndex] = useState(-1)
    return (
        <div className='header-nav-container'>
            <Offcanvas className="nav-offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeVariant='white' closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <ul className='navbar-li-small'>
                        <li className='mb-5 '>
                            <Link to="/">
                                <img width="150px" src={Logo} alt="" />

                            </Link>
                        </li>

                        {navLinks.map((nav, index) => {
                            return (
                                <li key={index}  >
                                    {
                                        nav.name == 'Docs' ?
                                            <a href={nav.link} target="_blank" alt="noreferrer" className={activeIndex === index ? "cool-link active" : "cool-link"} onClick={() => setActiveIndex(index)} >
                                                {nav.name}
                                            </a>
                                            :
                                            <Link to={nav.link} className={activeIndex === index ? "cool-link active" : "cool-link"} onClick={() => setActiveIndex(index)} >
                                                {nav.name}
                                            </Link>
                                    }
                                </li>

                            )
                        })}

                        <li className='btn-connect small-nav mt-5'>
                            {blockchain.account === "" || blockchain.smartContract === null ? (
                                <Link to="#" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(connect());
                                    getData();
                                }}>Connect</Link>
                            ) : (
                                <Link
                                    to="#"
                                    disabled={claimingRewards ? 1 : 0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        claimRewards();
                                    }}>{claimingRewards ? `Claiming rewards..` : `Claim ${parseFloat(balance.claimableBalance).toFixed(4)} AVAX`}</Link>
                            )}
                        </li>
                    </ul>



                </Offcanvas.Body>
            </Offcanvas>

            <Row className='justify-content-around '>

                <Col xs={3} lg={3}>
                    <img width="150px" src={Logo} alt="" />

                </Col>
                <Col xs={7} md={7} lg={5}>

                    <ul className='navbar-li'>
                        {navLinks.map((nav, index) => {
                            return (
                                <li key={index} >
                                    {
                                        nav.name == 'Docs' ?
                                            <a href={nav.link} target="_blank" alt="noreferrer" className={activeIndex === index ? "cool-link active" : "cool-link"} onClick={() => setActiveIndex(index)} >
                                                {nav.name}
                                            </a>
                                            :
                                            <Link to={nav.link} className={activeIndex == index ? "cool-link active" : "cool-link"} onClick={() => setActiveIndex(index)} href="" >
                                                {nav.name}
                                            </Link>
                                    }
                                </li>

                            )
                        })}

                        <li className='btn-connect'>
                            {blockchain.account === "" || blockchain.smartContract === null ? (
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(connect());
                                        getData();
                                    }}>Connect</Link>
                            ) : (
                                <Link
                                    to="#"
                                    disabled={claimingRewards ? 1 : 0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        claimRewards();
                                    }}>{claimingRewards ? `Claiming rewards..` : `Claim ${parseFloat(balance.claimableBalance).toFixed(4)} AVAX`}</Link>
                            )}
                        </li>
                    </ul>

                </Col>
                <Col xs={1} className='menu-icon'>
                    <div onClick={handleShow}>
                        <HiMenu />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Header;
