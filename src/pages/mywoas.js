import './mywoas.css';
import React, { useEffect, useState } from "react";
import Header from '../components/header'
import Footer from '../components/footer'
import { Row, Col, Container } from 'react-bootstrap';
import Modal from '../components/modal'
import { Slide, Zoom } from "react-awesome-reveal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../redux/balance/balanceActions";
import { fetchTokens } from '../redux/token/tokenActions';

const MyWoas = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const token = useSelector((state) => state.token);
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
    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchTokens(blockchain.account));
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
        getClaimableBalance(blockchain.account);
        getData();
    }, [blockchain.account]);


    const [modalShow, setModalShow] = useState(false);
    const [currentWoa,setCurrentWoa]=useState({})

    return (
        <div className='mywoas-container'>
            <Header />
            <Container>
            <Row className='justify-content-between my-woa-row'>
            <Col md={6}>
            <Slide direction='left' duration={200}  cascade >

            <h1 className='my-woas-header'>My Woas</h1>
            <button type='button' className='user-transection' >VIEW USER TRANSACTIONS</button>
</Slide>         
            </Col>
            <Col className='my-woa-buttons' md={6}>
                <Slide direction='right' duration={200} delay={300} cascade >
                    <div className='mb-3'>
                    <h6 className='woa-btn-header'>Avax Validator Reward</h6>
                    <div className='woa-btn'>--<span><img width="20px" src='https://partyanimals.xyz/static/media/avax.234db155.svg' alt='' /></span><button type="button" className='claim-btn'>Claim</button><span></span></div>
                    </div>
                </Slide>
            </Col>
             
            </Row>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                woa={currentWoa}
            />
            <Zoom duration={200} direction='up' >

            <div className='my-woas-header-small '>Purchased Woas</div>
            </Zoom>
            <Row className='my-woa-row-purchased'>
                {blockchain.account === "" || blockchain.smartContract === null ? (
                    <Col></Col>
                ) : (
                    token.data.map(d => (
                        <Col key={d.id} lg={2} md={4} sm={4} xs={6} className='mt-4 mb-2'>
                            <Slide duration={200} direction='up' cascade>
                                <img onClick={() => setModalShow(true) || setCurrentWoa(d)} className='purchased-woa' src={'https://ipfs.io/ipfs/' + d.image.replace("ipfs://", "")} alt='' style={{ cursor:"pointer" }} />
                            </Slide>
                        </Col>
                    ))
                )}
            </Row>

            </Container>
            <Footer />
        </div>
    );
}

export default MyWoas;
