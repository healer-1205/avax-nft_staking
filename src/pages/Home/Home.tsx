import React from "react";
import { Row, Col, Container, Accordion } from 'react-bootstrap';
import { MdArrowBackIos, MdOutlinePlayArrow } from 'react-icons/md';
import { Slide, Zoom } from "react-awesome-reveal";
import './Home.css';
import { Header } from '../../components/Header'
import MintImg from '../../assets/images/mintimg.png'
import Roll from '../../assets/images/roll.png'
import PicBlue from '../../assets/images/picblue.png'
import PicYellow from '../../assets/images/picyellow.png'
import PicRed from '../../assets/images/picred.png'
import PicGreen from '../../assets/images/picgreen.png'
import PicGray from '../../assets/images/picgray.png'
import PicPurple from '../../assets/images/picpurple.png'
import RarityImg from '../../assets/images/rarityimg.png'
import WolfMember from "../../assets/images/roadmap/wolf_member.png";
import Airdroppe from "../../assets/images/roadmap/Airdroppe.jpg";
import RAFFLE from "../../assets/images/roadmap/RAFFLE.jpg";
import WolfStore from "../../assets/images/roadmap/wolf_store.png";

export const Home: React.FC = () => {
	return (
		<div className="home-container">
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
						<div className='sell-container'>
							<button>-</button><span className="value-sell"></span>  <button>+</button>
							<span className='sell-btn' onClick={(e) => {
								e.preventDefault();
							}}>Connect</span>
						</div>
					</Slide>
					<div className='mint-img'>
						<Zoom duration={200} >
							<img src={MintImg} alt='MintImage' />
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
					<img className='movie-style-bg' src={Roll} alt='Roll' />
				</Container>
				<Container className='mt-3' >
					<Slide direction='down' cascade duration={200}  >
						<ul className=' justify-content-around roadmap-img'>
							<li >
								<img src={WolfMember} alt='WolfMember' />
							</li>
							<li >
								<img src={Airdroppe} alt='Airdroppe' />
							</li>
							<li >
								<img src={RAFFLE} alt='RAFFLE' />
							</li>
							<li >
								<img src={WolfStore} alt='WolfStore' />
							</li>
						</ul>
					</Slide>
					<Slide direction='down' duration={300}  >
						<ul className='roadmap-text'>
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
		</div>
	)
}