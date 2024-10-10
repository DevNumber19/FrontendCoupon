import React, { Component } from 'react';
import router, { withRouter } from 'next/router';
// import { Container, Button, Spinner, Navbar, Modal } from 'react-bootstrap';
import { Spinner, Navbar } from 'react-bootstrap';
import Header from '../src/components/header';
// import Detail from '../src/components/detail';
import Reward from '../src/components/detail';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../src/service/endpoint'
import Swal from 'sweetalert2'
import { Container, Typography, Card, CardContent, CardActions, Button, Box, CardMedia, Modal, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider } from '@mui/material';
import { parseISO, format } from 'date-fns';
import { th } from 'date-fns/locale';

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

            if (this.props.data != null) {
                checkDomain = true;
                company_id = this.props.data.data.id;
            }

        }
        await load();

        if (checkDomain) {

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

                        if (couponId)
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
        console.log('Redeem ---- ')
        await axios.post(API_URL + "/redeemCoupon", { uid: this.state.token })
            .then(response => {
                console.log('response ', response)
                this.setState({ show: true })
                console.log('show ', this.state.show)
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


    formatDate = (dateString) => {
        const date = parseISO(dateString); // แปลง string ISO 8601 เป็นวันที่ JavaScript
        const buddhistEraYear = date.getFullYear() + 543; // เพิ่ม 543 เพื่อได้ปีพุทธศักราช
        return format(date, `dd/MM/${buddhistEraYear}`, { locale: th }); // จัดรูปแบบวันที่เป็นวัน/เดือน/พ.ศ.
    };

    render() {
        const { isVaild, isLoadding, campaign } = this.state

        return (
            <>
                {/* <Header /> */}
                {isLoadding === true ?
                    <>
                        {isVaild === true ?
                            <>
                                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Card sx={{ maxWidth: 550, marginTop: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={campaign.coupon_image}
                                            alt="Placeholder"
                                            sx={{
                                                width: '100%', // Take full width of the card
                                                height: 'auto', // Automatically adjust height to maintain aspect ratio
                                                objectFit: 'cover', // Ensure the image covers the area
                                            }}
                                            onClick={this.handleShow}
                                        />
                                        <Box display={'flex'} sx={{ marginLeft: 2, marginBottom: 1 }} >
                                            <Box width={30} display={'flex'} alignItems={'center'}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 6.5C1 7.28793 1.15519 8.06815 1.45672 8.7961C1.75825 9.52405 2.20021 10.1855 2.75736 10.7426C3.31451 11.2998 3.97595 11.7417 4.7039 12.0433C5.43185 12.3448 6.21207 12.5 7 12.5C7.78793 12.5 8.56815 12.3448 9.2961 12.0433C10.0241 11.7417 10.6855 11.2998 11.2426 10.7426C11.7998 10.1855 12.2417 9.52405 12.5433 8.7961C12.8448 8.06815 13 7.28793 13 6.5C13 4.9087 12.3679 3.38258 11.2426 2.25736C10.1174 1.13214 8.5913 0.5 7 0.5C5.4087 0.5 3.88258 1.13214 2.75736 2.25736C1.63214 3.38258 1 4.9087 1 6.5Z" stroke="#999BA0" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M7 3.16667V6.5L9 8.5" stroke="#999BA0" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </Box>
                                            <Box>
                                                <Typography fontSize={'16px'} sx={{ color: '#999BA0' }}>
                                                    {this.formatDate(campaign.expired_at)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                    <CardContent sx={{maxWidth: 550}}>
                                        <Typography variant="" component="div">
                                            <div dangerouslySetInnerHTML={{ __html: campaign.coupon_detail }} />
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary">
                                        This card has an auto-responsive image.
                                        </Typography> */}
                                    </CardContent>

                                    {/* <div className="mt-3">
                                        <a onClick={this.handleShow}  >
                                            <img variant="top"
                                                className="rounded-lg mx-auto d-block img-fluid img-privilege"                                                
                                                src={campaign.coupon_image}
                                             />
                                        </a>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: campaign.coupon_detail }} /> */}

                                </Container>

                                <CardActions style={{ position: 'sticky', bottom: '0', backgroundColor: 'white', boxShadow: '0 4px 24px 3px rgba(0,0,0,.14)', margin: 'auto' }}
                                    sx={{
                                        maxWidth: 550, // Set max width
                                        width: '100%',
                                    }} >
                                    <Box margin="auto">
                                        <div onClick={() => this.handleShow}>
                                            <Button
                                                sx={{
                                                    backgroundColor: 'black',
                                                    borderRadius: '1.5em',
                                                    color: 'white',
                                                    padding: '0.75rem 2rem',
                                                    border: '1px solid transparent',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                        border: '1px solid black',
                                                    }
                                                }}
                                                onClick={this.handleShow}
                                            >
                                                Redeem
                                            </Button>
                                        </div>
                                    </Box>
                                </CardActions>
                                
                                
                                {/* <div className="warpper"></div>
                                <div className="footer">
                                    <Button variant="light" onClick={this.handleShow} >ดูคูปอง</Button>
                                </div> */}

                                {/* <Modal
                                    show={this.state.show}
                                    onHide={this.handleClose}
                                    keyboard={false}
                                >
                                    <Modal.Body className="modal-content-me">
                                        <Detail barcode={this.state.data} campaign={this.state.campaign} openCoupon={this.handleOpenCoupon} />
                                        <p className="qr-footer-title nopadding pt-1">สำหรับใช้สแกนรับสิทธิ์ที่หน้าร้าน โปรดแสดงคูปองนี้ก่อนใช้งาน</p>
                                        <p className={"qr-footer-title nopadding p-1 " + (this.state.amount_coupon > 1 ? '' : 'd-none')}>ลูกค้าสามารถทยอยใช้คูปองได้ หากคูปองถูกคลิ๊กแล้วตัวเลขจะเป็นสีเทา</p>
                                        <div className='text-center pt-2'>
                                            <Button variant="light" onClick={this.handleClose}>ปิด</Button>
                                        </div>
                                    </Modal.Body>
                                </Modal> */}

                                <Modal
                                    open={this.state.show}
                                    onClose={this.handleClose}
                                    aria-labelledby="title"
                                    aria-describedby="description"
                                >
                                    <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 400,
                                            bgcolor: 'background.paper',
                                            // border: '2px solid #000',
                                            boxShadow: 24,
                                            p: 4,
                                            borderRadius: 3,
                                            padding: '32px 32px 10px 32px !important'
                                        }}>
                                         <Reward barcode={this.state.data} campaign={this.state.campaign} openCoupon={this.handleOpenCoupon} />
                                         <CardActions style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
                                    sx={{
                                        maxWidth: 550, // Set max width
                                        width: '100%',
                                    }} >
                                        <Button
                                                sx={{
                                                    backgroundColor: 'white !important',
                                                    borderRadius: '1.5em !important',
                                                    color: 'black !important',
                                                    // padding: '0.75rem 1rem !important',
                                                    border: '1px solid black !important',
                                                    '&:hover': {
                                                        backgroundColor: '#ff1515 !important',
                                                        color: 'white !important',
                                                        border: '1px solid white !important',
                                                    },
                                                    mt: 2, marginTop: 2
                                                }}
                                             onClick={this.handleClose}>
                                            Close
                                        </Button>
                                        </CardActions>
                                    </Box>
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
    hostname = 'lemon8-coupon';
    data = API_URL + "/host/" + hostname
    console.log('hostname', API_URL + "/host/" + hostname);
    await axios.get(API_URL + "/host/" + hostname)
        .then(response => {
            data = response.data
        })
        .catch(err => {
            console.error(err)
            data = null
        })

    return { props: { data } }
}

export default withRouter(Index)