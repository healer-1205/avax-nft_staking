import React from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import { Slide } from "react-awesome-reveal";

interface IProps {
	show: boolean;
	Woa: any;
	onHide: () => void;
}
export const MyVerticallyCenteredModal = (props: IProps) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className='body-modal'
		>
			<Modal.Body style={{ padding: "0px" }}>
				<Row >
					<Col md={6}>
						<Slide direction='left' duration={600}>
							<img width="100%" src={props.Woa.url} alt='' />
						</Slide>
					</Col>
					<Col md={6}>
						<Slide direction='right' duration={600}>
							<h1 className='modal-name-code'>{props.Woa.name} {props.Woa.id}</h1>
						</Slide>
					</Col>
				</Row>
				<Row className='justify-content-center modal-deta'>
					<Col lg={6}>
						<h6 className='body-label'>Base: <span className='body-value'>{props.Woa.base}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Background: <span className='body-value'>{props.Woa.background}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Accessory: <span className='body-value'>{props.Woa.base}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Body: <span className='body-value'>{props.Woa.body}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Eyes: <span className='body-value'>{props.Woa.eyes}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Earings: <span className='body-value'>{props.Woa.earings}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Hand: <span className='body-value'>{props.Woa.hand}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Head: <span className='body-value'>{props.Woa.head}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Wing: <span className='body-value'>{props.Woa.wing}</span></h6>
					</Col>
					<Col lg={6}>
						<h6 className='body-label'>Price: <span className='body-value'>$ {props.Woa.price}</span></h6>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	)
}