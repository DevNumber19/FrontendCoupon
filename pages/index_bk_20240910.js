import React, { Component } from 'react';
import router, { withRouter } from 'next/router';
import { Container, Button, Spinner, Navbar, Modal } from 'react-bootstrap';
import Header from '../src/components/header';
import Detail from '../src/components/detail';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../src/service/endpoint'
import Swal from 'sweetalert2'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadding: false,
            isVaild: false,
            isCurrentStep: 0,
            token: "",
            show: false,
            campaign: null,
            amount_coupon: 0,
        };
    }
    async componentDidMount() {
        
        let checkDomain = false;
        let company_id = 0;
        const load = async () => {
        console.log(this.props.data)

            if(this.props.data != null){
                checkDomain = true;
                company_id = this.props.data.data.id;
            }

        }
        await load();

        if(checkDomain){

            const url = window.location.href
            const splittedstring = url.split('/');
            var coupon = splittedstring[3];
            if (coupon != '') {
                const ids = coupon.split('?');
                if (ids.length >= 2) {
                    var uid = ids[1].split('ref=')[1]
                    if (!uid) { return this.setState({ isLoadding: true, isVaild: false, token: "" }) }
                    var newState = []
                    await axios.get(API_URL + "/landing/" + uid)
                        .then(response => {
                            var data = response.data.data;
                            let comp_id = data.company_id;

                            if (data && comp_id == company_id) {
                                newState.push({ name: data.firstname + " " + data.lastname })
                                this.setState({ campaign: data })
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })

                    if (newState.length > 0) {
                        let couponId = null
                        await axios.get(API_URL + "/coupon/" + uid)
                            .then(response => {
                                var data = response.data.data;
                                this.setState({ amount_coupon: data.length })
                                if (data) {
                                    if (data.length > 0) {
                                        this.setState({ isLoadding: true, isVaild: true, token: uid, data })
                                        // console.log('coupon', data[0].id)
                                        couponId = data[0].id
                                    }
                                }
                            })
                            .catch(err => {
                                console.error(err)
                            })
                        
                            if(couponId)
                            //stamp opentAt
                                await axios.put(API_URL + "/openCoupon/" + couponId).catch(err => {
                                    // Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
                            })
                    }
                    else {
                        this.setState({ isLoadding: true, isVaild: false, token: "" })
                    }
    
                }
                else {
                    this.setState({ isLoadding: true, isVaild: false, token: "" })
                }
            }
            else {
                this.setState({ isLoadding: true, isVaild: false, token: "" })
            }
        }

    }
    handleClose = () => this.setState({ show: false });
    handleShow = async () => {
        await axios.post(API_URL + "/redeemCoupon", { uid: this.state.token })
            .then(response => {
                this.setState({ show: true })
            })
            .catch(err => {
                Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
            })
    };
    handleOpenCoupon = async (couponId) => {
        // await axios.put(API_URL + "/openCoupon/" + couponId).catch(err => {
        //     Swal.fire('ผิดพลาด!', 'กรุณาลองใหม่อีกครั้ง', 'error')
        // })
    };

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    render() {
        const { isVaild, isLoadding, campaign } = this.state
        return (
            <>
                <Header />
                {isLoadding === true ?
                    <>
                        {isVaild === true ?
                            <>
                                <Container>
                                    <div className="mt-3">
                                        <a onClick={this.handleShow}  >
                                            <img variant="top"
                                                className="rounded-lg mx-auto d-block img-fluid img-privilege"                                                
                                                src={campaign.coupon_image}
                                             />
                                        </a>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: campaign.coupon_detail }} />

                                </Container>
                                <div className="warpper"></div>
                                <div className="footer">
                                    <Button variant="light" onClick={this.handleShow} >ดูคูปอง</Button>
                                </div>

                                <Modal
                                    show={this.state.show}
                                    onHide={this.handleClose}
                                    keyboard={false}
                                >
                                    <Modal.Body className="modal-content-me">
                                        <Detail barcode={this.state.data} campaign={this.state.campaign} openCoupon={this.handleOpenCoupon} />
                                        <p className="qr-footer-title nopadding pt-1">สำหรับใช้สแกนรับสิทธิ์ที่หน้าร้าน โปรดแสดงคูปองนี้ก่อนใช้งาน</p>
                                        {/* <p className="qr-footer-title nopadding p-1">ลูกค้าสามารถทยอยใช้คูปองได้ หากคูปองถูกคลิ๊กแล้วตัวเลขจะเป็นสีเทา</p> */}
                                        <p className={"qr-footer-title nopadding p-1 " + (this.state.amount_coupon > 1 ? '' : 'd-none')}>ลูกค้าสามารถทยอยใช้คูปองได้ หากคูปองถูกคลิ๊กแล้วตัวเลขจะเป็นสีเทา</p>
                                        <div className='text-center pt-2'>
                                            <Button variant="light" onClick={this.handleClose}>ปิด</Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </>
                            : <p className="text-center mt-4 mb-4">กรุณาติดต่อกลับเพื่อตรวจสอบ </p>
                        }
                    </>
                    :
                    <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
                        <Spinner animation="grow" />
                    </div>
                }
            </>
        )
    }
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    // const data = await res.json()

    // Pass data to the page via props
    let data = 0;
    req.headers.host.split(':')
    let hostname = req.headers.host.split('.')[0];
    // hostname = 'lemon8-coupon';
    data = API_URL + "/host/" + hostname
    console.log('hostname', API_URL + "/host/" + hostname);
    await axios.get(API_URL + "/host/" + 'lemon8-coupon')
        .then(response => {
            data=response.data
        })
        .catch(err => {
            console.error(err)
            data = null
        })

    // if (req.headers.host.split('.')[0] === "extracampaign") {
    //     data = 61
    // } else if (req.headers.host.split('.')[0] == "amazingthailand" || req.headers.host === "localhost:3000") {
    //     data = 60
    // } else {
    //     return {
    //         redirect: {
    //             destination: '/error',
    //             permanent: false,
    //         },
    //     }
    // }
    // console.log(req.headers.host.split('.')[0])
    return { props: { data } }
}

export default withRouter(Index)