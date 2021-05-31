import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Instagram, Youtube } from 'react-bootstrap-icons'

function Footer() {
    return (
        <footer style={{backgroundColor:"#000"}}>
            <Container>
                    <Row style={{padding:"50px 0"}}>
                        <Col md={4} sm={12}>
                            <h2 style={{color:"#fff", }}>Info</h2>
                            <Link style={{color:"#fff", fontSize:24, display:"block", fontWeight:200}}>Our Team</Link>
                            <Link style={{color:"#fff", fontSize:24, display:"block", fontWeight:200}}>About us</Link>
                        </Col>
                        <Col md={4} sm={12}>
                            <h2 style={{color:"#fff"}}>Contact us</h2>
                            <a href="https://www.instagram.com">
                                <Instagram style={{color:"#fff", fontSize:36, display:"block", fontWeight:200, marginBottom: 24}}/>
                            </a>
                            <a href="https://www.youtube.com">
                                <Youtube style={{color:"#fff", fontSize:36, display:"block", fontWeight:200}}/>
                            </a>
                        </Col>
                        <Col md={4} sm={12} style={{display:"flex"}} className="align-items-center">
                            <h3 style={{color:"#fff"}}>We wish you happy a learning!</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-center py-3">&copy; SmartTeens 2021</Col>
                    </Row>
            </Container>
        </footer>
    )
}

export default Footer
