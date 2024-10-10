import React, { useEffect, useState } from 'react';
// import { Card, Row, Form, Button } from 'react-bootstrap';
import QRCode from 'qrcode';
import Paper from '@mui/material/Paper'; // ปรับให้ใช้ MUI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Barcode from 'react-barcode';
import axios from 'axios'; // ตรวจสอบให้แน่ใจว่ามีการนำเข้า axios
import moment from 'moment'; // ตรวจสอบให้แน่ใจว่ามีการนำเข้า moment
import { Container, Typography, Card, CardContent, CardActions, Button, Box, FormControl, CardMedia, Modal, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider } from '@mui/material';


const opts = {
    errorCorrectionLevel: 'L',
    type: 'image/jpeg',
    quality: 1,
    margin: 1,
    width: 600,
    color: {
        dark: "#000000ff",
        light: "#ffffffff"
    }
};

const Reward = ({ voucher, campaign, openCoupon }) => {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [hoverCode, setHoverCode] = useState("");
    const [page, setPage] = useState(0);
    const [timer, setTimer] = useState(60); // การตั้งค่า timer ตัวอย่าง
    const [value, setValue] = useState(0);

    useEffect(() => {

        console.log('prop : ', voucher, campaign, openCoupon)

        const fetchQRCode = async () => {
            if (voucher.length > 0) {
                const imageUrl = await QRCode.toDataURL(voucher[0].coupon_code, opts);
                setUrl(imageUrl);
                setCode(voucher[0].coupon_code_text);
                openCoupon(voucher[0].id);
                voucher[0].opened_at = Date.now(); // อัปเดต opened_at ถ้าจำเป็น
            }
        };
        fetchQRCode();
    }, [voucher, openCoupon]);

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    useEffect(() => {
        const fetchCouponDetail = async () => {
            try {
                const response = await axios.get(`${baseURL}coupon/detail/${voucher.coupon_id}`);
                // จัดการกับการตอบกลับที่นี่
            } catch (error) {
                console.error('เกิดข้อผิดพลาดระหว่างการตรวจสอบ', error);
            }
        };

        fetchCouponDetail();

        let countdownTimer;
        if (timer > 0) {
            countdownTimer = setTimeout(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => clearTimeout(countdownTimer);
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const formatThaiDate = (date) => {
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
            'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
            'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const dateMoment = moment(date);
        const day = dateMoment.format('DD');
        const month = thaiMonths[dateMoment.month()];
        const year = dateMoment.add(543, 'year').format('YYYY');
        const time = dateMoment.format('HH:mm');

        return `${day} ${month} ${year} ${time}`;
    };

    const newState1 = this.props.barcode || [];
    this.props.barcode.map((code, idx) => {
        newState1.push(code)
    })

    return (
    <div>
        <Box>
            <Card variant="outlined" sx={{ m: 1 }}>
                <Box sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="center" mb={3}>
                        {campaign && (
                            <img
                                width="86px"
                                height="58px"
                                alt="58x86"
                                src={campaign.coupon_banner_image}
                            />
                        )}
                    </Box>
                    <Paper square>
                        <Tabs
                            value={page}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            centered
                        >
                            <Tab label="QRCODE" />
                            <Tab label="BARCODE" />
                        </Tabs>
                    </Paper>

                    <Box display="flex" justifyContent="center" mt={1}>
                        {page === 0 ? (
                            <>
                                <img
                                    width="100px"
                                    height="100px"
                                    alt="QR Code"
                                    src={url}
                                    className='img-qr'
                                />
                                <Typography variant="h6" align="center" className="qr-code-text">
                                    {hoverCode}
                                </Typography>
                            </>
                        ) : (
                            <Barcode value={hoverCode} />
                        )}
                    </Box>

                    <Typography variant="h5" mt={3} align="center" className="qr-code-text">
                        {code}
                    </Typography>

                    <FormControl fullWidth className="mt-3">
                        {newState1.length > 1 ? (
                            <FormGroup className="justify-content-center text-center">
                                {newState1.map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <Button 
                                            variant={hilightBtn(item)} 
                                            onClick={() => onClickChangeImage(item)} 
                                            sx={{ m: 1 }}
                                        >
                                            {idx + 1}
                                        </Button>
                                        {(idx + 1) % 5 === 0 && <br />}
                                    </React.Fragment>
                                ))}
                            </FormGroup>
                        ) : null}
                    </FormControl>
                </Box>
            </Card>
        </Box>
    </div>

        // <div>
        //     <Container sx={{ backgroundColor: '#F4F4F4', py: 5, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
        //         <Box sx={{ backgroundColor: '#FFF', borderRadius: '20px', position: 'relative', width: '100%', p: 4, paddingTop: '50px' }}>
        //             <Box textAlign={'center'}>
        //                 <img loading="lazy" alt="" src={campaign.coupon_banner_image} style={{ borderRadius: '10px', width: '175px' }} />
        //                 <Typography style={{ fontFamily: 'Sukumvit bold', fontSize: '20px' }}>
        //                     {campaign.coupon_name}
        //                 </Typography>
        //                 <Typography style={{ fontFamily: 'Sukumvit', fontSize: '14px' }} color={'#999999'} className='color-two'>
        //                     {formatThaiDate(new Date(campaign.created_at))}

        //                 </Typography>
        //             </Box>
        //             <Box sx={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', my: '50px' }}>
        //                 {value === 0 && (
        //                     <Box sx={{ flex: 1, borderRadius: '10px', p: 1, mx: 2, textAlign: 'center' }}>
        //                         <Typography fontSize={'40px'} fontWeight={500}>
        //                             {voucher.coupon_code}
        //                         </Typography>
        //                         <Box
        //                             sx={{
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                                 height: '48px',

        //                             }}
        //                         >
        //                             <Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }} color={'#F42E45'}>
        //                                 {formatTime(timer)}
        //                             </Typography>
        //                         </Box>
        //                     </Box>

        //                 )}
        //                 {value === 1 && (
        //                     <Box
        //                         sx={{
        //                             display: 'flex',
        //                             flexDirection: 'column', // นี้จะทำให้ลูกๆของ Box นี้แสดงผลทีละบรรทัด
        //                             justifyContent: 'center',
        //                             alignItems: 'center'
        //                         }}
        //                     >
        //                         <Barcode value={voucher.coupon_code} width={1.5} height={90} displayValue={false} />
        //                         <Box
        //                             sx={{
        //                                 height: '48px',
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                             }}
        //                         >
        //                             <Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }} color={'#F42E45'}>
        //                                 {formatTime(timer)}
        //                             </Typography>
        //                         </Box>
        //                     </Box>
        //                 )}
        //                 {value === 2 && (
        //                     <Box
        //                         sx={{
        //                             display: 'flex',
        //                             flexDirection: 'column', // นี้จะทำให้ลูกๆของ Box นี้แสดงผลทีละบรรทัด
        //                             justifyContent: 'center',
        //                             alignItems: 'center'
        //                         }}
        //                     >
        //                         <QRCode value={voucher.coupon_code} size={150} />
        //                         <Box
        //                             sx={{
        //                                 height: '48px',
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                             }}
        //                         >
        //                             <Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }} color={'#F42E45'}>
        //                                 {formatTime(timer)}
        //                             </Typography>
        //                         </Box>
        //                     </Box>

        //                 )}
        //             </Box>
        //             <Box>
        //                 <Tabs
        //                     value={value}
        //                     onChange={handleChange}
        //                     centered
        //                     TabIndicatorProps={{ style: { background: 'none' } }}
        //                     style={{ padding: '5px', backgroundColor: 'translation', borderRadius: '40px', border: '1px solid #DADADA' }}
        //                 >
        //                     <Tab
        //                         label={<Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }} >รหัสโค๊ด</Typography>}
        //                         style={{

        //                             backgroundColor: value === 0 ? '#211F1F' : '#fff',
        //                             color: value === 0 ? '#FFF' : '#211F1F',
        //                             transition: 'background 0.3s, color 0.3s',
        //                             borderRadius: '40px',
        //                             flex: '1',
        //                             padding: '0'
        //                         }}
        //                     />
        //                     <Tab
        //                         label={<Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }} >บาร์โค้ด</Typography>}
        //                         style={{
        //                             backgroundColor: value === 1 ? '#211F1F' : '#fff',
        //                             color: value === 1 ? '#FFF' : '#211F1F',
        //                             transition: 'background 0.3s, color 0.3s',
        //                             borderRadius: '40px',
        //                             flex: '1',
        //                             padding: '0'
        //                         }}
        //                     />
        //                     <Tab
        //                         label={<Typography style={{ fontFamily: 'Sukumvit', fontSize: '16px' }}>คิวอาร์โค้ด</Typography>}
        //                         style={{
        //                             backgroundColor: value === 2 ? '#211F1F' : '#fff',
        //                             color: value === 2 ? '#FFF' : '#211F1F',
        //                             transition: 'background 0.3s, color 0.3s',
        //                             borderRadius: '40px',
        //                             flex: '1',
        //                             padding: '0'
        //                         }}
        //                     />
        //                 </Tabs>
        //             </Box>

        //             <Box sx={{ mt: 6, mb: 2 }} textAlign={'center'}>
        //                 <Typography style={{ fontFamily: 'Sukumvit', fontSize: '14px', color: '#6E6E6E', backgroundColor: '#F3F3F3', padding: '5px' }}>
        //                     Check the information at the redeemed
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ position: 'absolute', top: '0', right: '0' }}>
        //                 <IconButton aria-label="close" size="large" onClick={handleClick}>
        //                     <CloseRoundedIcon fontSize="inherit" />
        //                 </IconButton>
        //             </Box>
        //         </Box>
        //     </Container>
        // </div>
    );
};

export default Reward;
