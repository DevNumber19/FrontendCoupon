import React, { Component } from 'react'
import { Card, Row, Form, Button, Col } from 'react-bootstrap';
import QRCode from 'qrcode'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
var Barcode = require('react-barcode');
var opts = {
    errorCorrectionLevel: 'L',
    type: 'image/jpeg',
    quality: 1,
    margin: 1,
    width: 600,
    color: {
        dark: "#000000ff",
        light: "#ffffffff"
    }
}
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            code: "",
            hoverCode: "",
            page: 0
        }
    }
    async componentDidMount() {
        if (this.props.barcode.length > 0) {
            var imageurl = await QRCode.toDataURL(this.props.barcode[0].coupon_code, opts)
            this.setState({ url: imageurl, code: this.props.barcode[0].coupon_code_text, campaign: this.props.campaign })
            this.onClickChangeImage(this.props.barcode[0])
        }
    }
    onClickChangeImage = async (code) => {
        var couponCode = code.coupon_code
        var conponText = code.coupon_code_text
        this.props.openCoupon(code.id)
        code.opened_at = Date.now()
        var imageurl = await QRCode.toDataURL(couponCode.toString(), opts)
        this.setState({ hoverCode: couponCode, code: conponText, url: imageurl })
    }
    hilightBtn = (item) => {
        if (this.state.hoverCode == item.coupon_code) {
            return "primary"
        } else if (item.opened_at) {
            return "secondary"
        } else {
            return "light"
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ page: newValue });
    };

    render() {
        const { url, code, campaign } = this.state
        var newState1 = []
        this.props.barcode.map((code, idx) => {
            newState1.push(code)
        })
        return (
            <div >
                <Card className="m-1">
                    <Card.Body >
                        <Row className="justify-content-center mb-3" >
                            {campaign &&
                                < img
                                    width="86px"
                                    height="58px"
                                    alt="58x86"
                                    src={campaign.coupon_banner_image}
                                />
                            }
                        </Row>
                        <Paper square>
                            <Tabs
                                value={this.state.page}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                                centered
                            >
                                <Tab label="QRCODE" />
                                <Tab label="BARCODE" />
                            </Tabs>
                        </Paper>

                        <Row className="justify-content-center mt-1" >
                            {this.state.page == 0 ?
                                <>
                                    <img
                                        width="100px"
                                        height="100px"
                                        alt="150x150"
                                        src={url}
                                        className='img-qr'
                                    />
                                    <h6 className="text-center qr-code-text">{this.state.hoverCode}</h6>
                                </>
                                : <Barcode value={this.state.hoverCode} />
                            }
                        </Row>


                        <h5 className="mt-3 text-center qr-code-text">{code}</h5>

                        <Form className="mt-3">
                            {newState1.length > 1 ?
                                <Form.Group className="justify-content-center text-center">
                                    {
                                        newState1.map((item, idx) => {
                                            return (
                                                <>
                                                    <Button variant={this.hilightBtn(item)} onClick={(() => this.onClickChangeImage(item))} className="m-1">{idx + 1}</Button>
                                                    {(idx + 1) % 5 == 0 && <br></br>}
                                                </>
                                            )
                                        })
                                    }
                                </Form.Group>
                                : ""
                            }
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Detail