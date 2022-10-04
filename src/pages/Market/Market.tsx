import React, { useState } from "react";
import { Row, Col, Container, Form, Dropdown } from 'react-bootstrap';
import { Slide, Zoom } from "react-awesome-reveal";
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { MyVerticallyCenteredModal } from '../../components/MarketModal';
import './Market.css';
import PicBlue from '../../assets/images/picblue.png';
import PicPurple from '../../assets/images/picpurple.png';
import AvaxIcon from "../../assets/images/avax_icon.svg";

export const Market: React.FC = () => {

	const Rarity = ["common", "rare", "super rare", "legendary", "iconic"];
	const Base = ["silver", "brown", "dark gray", "gold"];
	const Background = ["yellow", "yellow orange", "red brown", "purple", "pink", "pink purple", "light blue", " grey", " green", "black white"];
	const Accessory = ["none", "silver chain", "gold chain"];
	const Body = ["yellow suspenders", "yellow soccer jeeb", " yellow shirt", " yellow purple robe", " yellow purple jacket", "white suspenders", "white black soccer jeeb", "tan suspenders", "sky blue shirt", "sky blue suspender", "silver suit camouflage", "silver robe", "silver black suit", "royal blue suspenders", "red white tux", "red tie checkered suit", "red suspenders", "red skeleton", "red gold robe", "red gold emperor", "red blue suit", "red blue emperor", "red black samurai", "red black basketball jersey", "red basketball jersey", "purple yellow emperor", "purple suspenders", "purple blue shirt", "pink tan robe", "pink robe", "none", "light grey robot", "light blue suit", "lavender shirt", "grey suspenders", "grey suit camouflage", "grey red emperor", "grey jacket", "grey blue suit", "grey black samurai", "gray purple robe", "dark gray shirt", "dark blue tux", "checkered suit", "brown red samurai", "brown red jacket", "brown jacket", "brown grey suit", "blue tux", "blue soccer jeeb", "blue skeleton", "blue robe", "blue red suit", "blue jacket", "blue grey suspenders", "blue grey samurai", "blue gold robot", "blue gold emperor", "blue dark blue emperor", "black yellow samurai", "black white tux", "black white tux", "black white soccer jeeb", "black suspenders", "black skeleton", "black gold robe"];
	const Eyes = ["yellow black frame eyeglasses", "tan sunglasses", "sunglasses yellow", "red sunglasses", "red eyeglasses", "none", "eyepatch", "blue sunglasses", "blue eyeglasses", "black yellow ski", "black yellow frame eyeglasses", "black white ski", "black sunglasses", "black ski", "black red ski", "black rainbow ski", "black purple ski", "black green ski", "black eyeglasses", "black blue ski"];
	const Earing = ["white diamond", "silver hoop", "red hoop", "purple diamond", "none", "light green diamond", "green diamond", "gold hoop", "blue hue diamond", "blue hoop", "black hoop"];
	const Hand = ["skull", "scepter", "red spear", "rabbit", "none", "microphone", "liquor", "gun, cigar", "champagne, cash", "blue spear "];
	const Head = ["viking", "tan golf visor", "silver camouflage golf visor", "silver camouflage baseball cap", "red golf visor", "orange golf visor", "none", "light gray golf visor", "green golf visor", "green camouflage golf visor", "green camouflage baseball cap", "gold golf visor", "crown", "brown baseball cap", "blue golf visor", "blue camouflage baseball cap", "blue baseball cap", "black yellow baseball cap", "black golf visor"];
	const Wing = ["White", "silver", "none", "gold"];
	const MarketData = [
		{
			name: "Apax",
			id: "123",
			rarity: "common",
			base: "silver",
			background: "purple",
			accessory: "silver chain",
			body: "yellow suspenders",
			eyes: "tan sunglasses",
			earings: "red hoop",
			hand: "red spear",
			head: "brown baseball cap",
			wing: "none",
			value: "2.31",
			price: 200,
			url: PicPurple
		},
		{
			name: "Bpax",
			id: "242",
			rarity: "rare",
			base: "silver",
			background: "blue",
			accessory: "none",
			body: "blue tux",
			eyes: "black yellow frame eyeglasses",
			earings: "silver diamond",
			hand: "gun",
			head: "none",
			wing: "silver",
			value: "2.31",
			price: 100,
			url: PicBlue
		}
	]
	const [modalShow, setModalShow] = useState(false);
	const [currentWoa, setCurrentWoa] = useState({});
	const [filterDisplay, setFilterDisplay] = useState(false);
	const [dataSort, setDataSort] = useState(MarketData);

	const sortPriceHigh = () => {
		const sorted = MarketData.sort((a, b) => a.price - b.price)
		setDataSort(sorted);
	}
	const sortPriceLow = () => {
		const sorted = MarketData.sort((a, b) => b.price - a.price)
		setDataSort(sorted);
	}

	const sortRarityHigh = () => {
		const sorted = MarketData.sort((a: any, b: any): number => a.rarity - b.rarity)
		setDataSort(sorted);
	}
	const sortRarityLow = () => {
		const sorted = MarketData.sort((a: any, b: any): number => b.rarity - a.rarity)
		setDataSort(sorted);
	}

	return (
		<div className='mywoas-container'>
			<Header />
			<Container>
				<Slide duration={200} direction='up' cascade >
					<Row className='justify-content-center my-woa-row mt-5'>
						<Col xs={5} md={2}>
							<h5>Total Volume</h5>
							<p className='value-total'>44249.3446</p>
						</Col>
						<Col xs={5} md={2}>
							<h5>Total Sales</h5>
							<p className='value-total'>44249.3446</p>
						</Col>
						<Col xs={5} md={2}>
							<h5>Highest Sale Price  </h5>
							<p className='value-total'>44249.3446</p>
						</Col>
						<Col xs={5} md={2}>
							<h5>Total Sales</h5>
							<p className='value-total'>44249.3446</p>
						</Col>
					</Row>
				</Slide>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					Woa={currentWoa}
				/>
				<Zoom duration={200} direction='up' >
					<h4 className='floor-price  mt-5'>Floor Price</h4>
					<Row className='justify-content-center my-woa-row  mt-3 floor'>
						<Col xs={5} md={2} lg={1}>
							<h6 className='green'>Common</h6>
							<p className='value-total-small'>2.3  <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></p>
						</Col>
						<Col xs={5} md={2} lg={1}>
							<h6 className='blue'>Rare</h6>
							<p className='value-total-small'>3.5  <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></p>
						</Col>
						<Col xs={5} md={2} lg={1}>
							<h6 className='red'>Ledendary</h6>
							<p className='value-total-small'>6  <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></p>
						</Col>
						<Col xs={5} md={2} lg={1}>
							<h6 className='purple'>Super Rare </h6>
							<p className='value-total-small'>18 <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></p>
						</Col>
						<Col xs={5} md={2} lg={1}>
							<h6 className='yellow'>Iconic</h6>
							<p className='value-total-small'>1000 <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></p>
						</Col>
					</Row>
				</Zoom>
				<Zoom duration={200} direction='up' >
					<Row className={filterDisplay ? 'justify-content-center filter-dropdown' : 'no-display'}>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Rarity</option>
								{Rarity.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Base</option>
								{Base.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Background</option>
								{Background.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Accessory</option>
								{Accessory.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Body</option>
								{Body.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Eyes</option>
								{Eyes.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Earings</option>
								{Earing.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Hand</option>
								{Hand.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Head</option>
								{Head.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>
									)
								})}
							</Form.Select>
						</Col>
						<Col className='mt-3 mb-3' xs={10} sm={6} md={4} lg={2}>
							<Form.Select aria-label="Default select example">
								<option>Select Wing</option>
								{Wing.map((inputVal, index) => {
									return (
										<option key={index} value={inputVal}>{inputVal}</option>

									)
								})}
							</Form.Select>
						</Col>
					</Row>
					<p style={{ float: "right", paddingRight: "9%", cursor: "pointer" }} onClick={() => setFilterDisplay(!filterDisplay)}>{filterDisplay ? 'Hide Filters' : "Show Filters"}</p>
					<Row className='justify-content-between mt-5'>
						<Col xs={6}>
							<div className='my-woas-header-small-market'  >WoA: 8888/8888</div>
						</Col>
						<Col xs={4} md={3} lg={2} className='filter-dropdown' >
							<Dropdown>
								<Dropdown.Toggle variant="" className='drop-down' id="dropdown-basic">
									Sorting
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={sortPriceLow}>Highest Price</Dropdown.Item>
									<Dropdown.Item onClick={sortPriceHigh}>Lowest Price</Dropdown.Item>
									<Dropdown.Item onClick={sortRarityHigh}>Highest Rarity</Dropdown.Item>
									<Dropdown.Item onClick={sortRarityLow}>Lowest Rarity</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>
				</Zoom>
				<Row className='justify-content-start my-woa-row-purchased'>
					{dataSort.map((woa, index) => {
						return (
							<Col key={index} lg={2} md={4} sm={6} xs={6} className='mt-4 mb-2'>
								<Slide duration={200} direction='up' cascade>
									<div onClick={() => { setModalShow(true); setCurrentWoa(woa) }} className="container-img">
										<img src={woa.url} alt="Avatar" className="image" />
										<div className="overlay">
											<div className="text">
												<h6 className='common'>{woa.rarity}</h6>
												<h6 className='buy'>2.39  <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /> Buy</span></h6>
												<h5 className='view-more'>View More</h5>
											</div>
										</div>
										<p className='common woa-common'>{woa.rarity}</p>
										<h6 className=' number-woa'>{woa.value} <span><img width="17px" src={AvaxIcon} alt='AVAX SVG' /></span></h6>
									</div>
								</Slide>
							</Col>
						)
					})}
				</Row>
			</Container>
			<Footer />
		</div >
	)
}