import './footer.css';
import { Row, Col, Container } from 'react-bootstrap';
import Logo from '../assets/images/logo.png'

import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
   
    return (
          <div className='footer-container mt-5'>
                <Container className='pb-4'>
                
                <Row className='justify-content-around footer-row'>
                    <Col xs={6}  >
                        <img width="180px" style={{float:"right"}} src={Logo} alt='' />
                    </Col>
                    <Col xs={5} >
<div style={{float:"right"}}>My Woa © 2021</div>
                    </Col>
                </Row>

                </Container>
            </div>
    );
}

export default Footer;
