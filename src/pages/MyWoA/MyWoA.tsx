import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { Slide, Zoom } from "react-awesome-reveal";
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { MyVerticallyCenteredModal } from '../../components/MarketModal';
import './MyWoA.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AvaxIcon from "../../assets/images/avax_icon.svg";

export const MyWoA: React.FC = () => {

	const [modalShow, setModalShow] = useState(false);
	const [currentWoa, setCurrentWoa] = useState({});

	return (
		<div className='mywoas-container'>
			<Header />
			<Container>
				<Row className='justify-content-between my-woa-row'>
					<Col md={6}>
						<Slide direction='left' duration={200} cascade >
							<h1 className='my-woas-header'>My Woas</h1>
							<button type='button' className='user-transection' >VIEW USER TRANSACTIONS</button>
						</Slide>
					</Col>
					<Col className='my-woa-buttons' md={6}>
						<Slide direction='right' duration={200} delay={300} cascade >
							<div className='mb-3'>
								<h6 className='woa-btn-header'>Avax Validator Reward</h6>
								<div className='woa-btn'>
									--
									<span><img width="20px" src={AvaxIcon} alt='AvaxIcon' /></span>
									<button type="button" className='claim-btn'>Claim</button><span></span>
								</div>
							</div>
						</Slide>
					</Col>
				</Row>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					Woa={currentWoa}
				/>
				<Zoom duration={200} direction='up' >
					<div className='my-woas-header-small '>Purchased Woas</div>
				</Zoom>
				<Row className='my-woa-row-purchased'>

				</Row>
			</Container>
			<Footer />
		</div>
	)
}