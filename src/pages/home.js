import './home.css';
import Header from '../components/header'
import Footer from '../components/footer'
import { Row, Col, Container, Accordion } from 'react-bootstrap';
import { MdArrowBackIos, MdOutlinePlayArrow } from 'react-icons/md';
import MintImg from '../assets/images/mintimg.png'
import Roll from '../assets/images/roll.png'
import PicBlue from '../assets/images/picblue.png'
import PicYellow from '../assets/images/picyellow.png'
import PicRed from '../assets/images/picred.png'
import PicGreen from '../assets/images/picgreen.png'
import PicGray from '../assets/images/picgray.png'
import PicPurple from '../assets/images/picpurple.png'
import RarityImg from '../assets/images/rarityimg.png'
import { Slide, Zoom } from "react-awesome-reveal";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { fetchBalance } from "../redux/balance/balanceActions";

const Home = () => {
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

    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
        .mint(mintAmount)
        .send({
            gasLimit: String(totalGasLimit),
            to: CONFIG.CONTRACT_ADDRESS,
            from: blockchain.account,
            value: totalCostWei,
        })
        .once("error", (err) => {
            console.log(err);
            setFeedback("Sorry, something went wrong please try again later.");
            setClaimingNft(false);
        })
        .then((receipt) => {
            console.log(receipt);
            setFeedback(
            `You have successfully minted your ${CONFIG.NFT_NAME} NFT(s)!.`
            );
            setClaimingNft(false);
            dispatch(fetchData(blockchain.account));
            dispatch(fetchBalance(blockchain.account));
        });
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

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
        newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 20) {
        newMintAmount = 20;
        }
        setMintAmount(newMintAmount);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div className='home-container'>
            <div className='background-main-img'>
                <div className='background-main-img-img'>
                    <Header />
                </div>
                <MdArrowBackIos className="down-arrow-2" />
                <MdArrowBackIos className="down-arrow" />
            </div>
            <Container className='welcome-text-with-images'>
                <Row className='justify-content-around img-six-text'>
                    <Col lg={5}>
                        <Slide direction="up" duration={200} >
                            <h1 className='welcome-header'>Welcome to Wolf of AVAX </h1>
                        </Slide>
                        <Slide direction='left' duration={200}>

                            <p className='welcome-text'>
                            Deeply entrenched in the Avalanche ecosystem and seeking to provide humans with a vehicle to have fun and store capital that returns value through a highly-interactive ecosystem that extends throughout a suite of gaming and blockchain-powered financialization dApps a.k.a. GameFi dApps with considerable benefits for our pack and the broad Avalanche ecosystem.
                            </p>
                        </Slide>
                    </Col>
                    <Col md={8} lg={6}>
                        <Row className="justify-content-around mt-3 mb-2">

                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='down' duration={200} >
                                    <img className='img-six' src={PicBlue} alt="" />
                                </Slide>

                            </Col>
                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='down' duration={200} delay={50} >
                                    <img className='img-six' src={PicRed} alt="" />
                                </Slide>

                            </Col>
                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='down' duration={200} delay={100} >
                                    <img className='img-six' src={PicGreen} alt="" />
                                </Slide>

                            </Col>
                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='up' duration={200} delay={50} >
                                    <img className='img-six' src={PicGray} alt="" />
                                </Slide>

                            </Col>
                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='up' duration={200} >
                                    <img className='img-six' src={PicYellow} alt="" />
                                </Slide>

                            </Col>
                            <Col xs={6} sm={5} md={4}>
                                <Slide direction='up' duration={200} delay={100}  >
                                    <img className='img-six' src={PicPurple} alt="" />
                                </Slide>

                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
            <div className='mint-page-container'>
                <Container>
                    <Slide direction='up' cascade duration={100} >

                        <h3 className='mt-4 dont-miss-text' >
                            You don’t want to miss out, join our ventures.
                        </h3>

                        {/* <h3 className='mt-4 dont-miss-text-small' >
                            8888 / 8888 <span>ALREADY JOINED</span>
                        </h3> */}
                        <div className='sell-container'>
                            <button onClick={decrementMintAmount}>-</button><span className="value-sell">{mintAmount}</span>  <button onClick={incrementMintAmount}>+</button>
                            {blockchain.account === "" || blockchain.smartContract === null ? (
                                <span className='sell-btn' onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(connect());
                                    getData();
                                }}>Connect</span>
                            ) : (
                                <span className='sell-btn'
                                    disabled={claimingNft ? 1 : 0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        claimNFTs();
                                        getData();
                                }}>{claimingNft ? "MINTING" : "MINT NOW"}</span>
                            )}
                        </div>
                    </Slide>
                    <div className='mint-img'>
                        <Zoom duration={200} >
                            <img src={MintImg} alt='' />
                        </Zoom>
                    </div>

                </Container>
            </div>
            <div className='mint-page-container'>
                <Container className='mb-50'>
       
                    <Row className='justify-content-between'>
                        <Col md={6}>
                        <Slide direction="up" duration={200}  >

                <h1 className='rarity-header'>RARITY RANKING </h1>
                </Slide>
                <Slide direction='left' duration={200}  >

                <p className='rarity-text'>On our journey, everyone is welcome; as long as you have your key. No dress code, style your Wolves however you want; we used a 5-tier scale to rank our Wolves. There are a variety of furs, colors, clothing and a plethora of accessories with certain in-game boosters in a near future.</p>
                </Slide>
                <Slide direction='left' cascade duration={200}  >

                <p className='rarity-text'>Tiers:</p>
                <h4 className='green'>1. Common</h4>
                <h4 className='blue'>2. Rare</h4>
                <h4 className='red'>3. Ledendary</h4>
                <h4 className='purple'>4. Super Rare</h4>
                <h4 className='yellow'>5. Iconic</h4>
                </Slide>

                        </Col>
                        <Col md={5} className='rarity-img'>
                            <img src={RarityImg} alt='' />
                        </Col>

                    </Row>
                </Container>
            </div>
            <div className=' roadmap-container'>
                <Container>
                <Slide direction="up" duration={200}  >

<h1 className='rarity-header roadmap'>MINT-MAP </h1>
</Slide>
                    <img className='movie-style-bg' src={Roll} alt='' />
                </Container>

                <Container className='mt-3' >
                    
                    <Slide direction='down' cascade duration={200}  >

                        <ul className=' justify-content-around roadmap-img'>
                            <li >
                                <img src="https://cdn.discordapp.com/attachments/891822051382407198/912374301376794654/unknown.png" alt='' />
                            </li>
                            <li >
                                <img src="https://cdn.discordapp.com/attachments/891822051382407198/912403255508746310/Airdroppe.jpg" alt='' />
                            </li>

                            <li >
                                <img src="https://cdn.discordapp.com/attachments/891822051382407198/912403254812504165/RAFFLE.jpg" alt='' />
                            </li>
                            <li >
                                <img src="https://cdn.discordapp.com/attachments/891822051382407198/912400344892457000/unknown.png" alt='' />
                            </li>
                        </ul>
                    </Slide>
                    <Slide direction='down' duration={300}  >

                        <ul className='roadmap-text '>
                            <li >
                                <p>25% Wolf of AVAX mint has begun, and to celebrate we will airdrop 2 Wolves to our pack.</p>
                            </li>
                            <li >
                                <p>5 Wolves will be randomly airdropped to minters along with 5 $AVAX. </p>

                            </li>

                            <li >
                                <p>75%  10 Wolves will be raffled along with 10 $AVAX to our pack.</p>

                            </li>
                            <li >
                                <p>100% Mint is complete and the fun begins!</p>

                            </li>
                        </ul>
                    </Slide>
                </Container>

            </div>
            <div className='t-and-r' >
                <Container>

                    <Slide direction="up" duration={200}  >

                        <h1 className='rarity-header'>Minting & Hodler rewards </h1>
                    </Slide>
                    <Slide direction='left' duration={200}  >
                        <p className='rarity-text'>
                            <br />

                            To reward hodlers and give early minters an advantage, we have decided to go with a relatively high percentage in Royalties (100%) & Reflections (20%). 
                            <br />
                            <br />
                            100% Royalties go to all hodlers and minters. Minters of the project will receive 15% of all royalties collected for the lifetime of the protocol: hodler or not, 85% of royalties will go towards you.
                        </p>
                    </Slide>
                </Container>
            </div>

            <div>
                <Container className='pb-5 faq-container'>
                    <Slide direction="up" duration={200}  >

                        <h1 className='rarity-header mb-5'>FAQ</h1>
                    </Slide>
                    <Slide direction="up" cascade duration={200}  >

                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><MdOutlinePlayArrow className='arrow-faq' />Is there a limit on minting?</Accordion.Header>
                                <Accordion.Body>
                                    We will limit people to 20 WOA per mint.
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <Accordion >
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><MdOutlinePlayArrow className='arrow-faq' />What are the advantages in minting a Wolf?</Accordion.Header>
                                <Accordion.Body>
                                    The people who mint an original Wolf will forever be rewarded with 15% of all royalties collected from secondary-market sales and get access into the Wolf’s Lair.
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <Accordion >
                            <Accordion.Item eventKey="3">
                                <Accordion.Header><MdOutlinePlayArrow className='arrow-faq' />Is reflection only available on WOA marketplace? </Accordion.Header>
                                <Accordion.Body>
                                    For now it will be only available on Wolf of AVAX marketplace.  We will be adding secondary market places in the near future where you will be able to receive your reflection from there too.
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        <Accordion >
                            <Accordion.Item eventKey="4">
                                <Accordion.Header><MdOutlinePlayArrow className='arrow-faq' />Who created Wolf of AVAX? </Accordion.Header>
                                <Accordion.Body>
                                    Halo Labs 
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Slide>
                </Container>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
