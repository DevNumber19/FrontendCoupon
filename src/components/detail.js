import React, { useEffect, useState } from 'react';
// import { Card, Row, Form, Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import QRCode from 'qrcode';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Barcode from 'react-barcode';
import { Container, Typography, Card, CardContent, CardActions, Box, FormControl, CardMedia, Modal, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider } from '@mui/material';


const opts = {
    errorCorrectionLevel: 'L',
    type: 'image/jpeg',
    quality: 1,
    margin: 1,
    width: 600,
    color: {
        dark: "#000000ff",
        light: "#ffffffff",
    },
};

const Reward = ({ barcode, openCoupon, campaign }) => {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [hoverCode, setHoverCode] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        const generateQRCode = async () => {
            if (barcode.length > 0) {
                const imageurl = await QRCode.toDataURL(barcode[0].coupon_code, opts);
                setUrl(imageurl);
                setCode(barcode[0].coupon_code_text);
                onClickChangeImage(barcode[0]);
            }
        };
        generateQRCode();
    }, [barcode]);

    const onClickChangeImage = async (code) => {
        const couponCode = code.coupon_code;
        const couponText = code.coupon_code_text;
        openCoupon(code.id);
        code.opened_at = Date.now();
        const imageurl = await QRCode.toDataURL(couponCode.toString(), opts);
        setHoverCode(couponCode);
        setCode(couponText);
        setUrl(imageurl);
    };

    const highlight = (item) => {
        if (hoverCode === item.coupon_code) {
            return "primary";
        } else if (item.opened_at) {
            return "secondary";
        } else {
            return "light";
        }
    };

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    const newState1 = barcode || [];
    return (
        <Box>
            <Card variant="outlined" className="m-1">
                <Box padding={2}>
                    <Box display="flex" justifyContent="center" marginBottom={3}>
                        {campaign && (
                            <img
                                width="100%"
                                height="100%"
                                alt=""
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

                    <Box display="flex" flexDirection="column" alignItems="center" marginTop={1}>
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

                    <Typography variant="h5" align="center" className="mt-3 qr-code-text">
                        {code}
                    </Typography>

                    <Box className="mt-3" display="flex" justifyContent="center" flexDirection="column">
                        {newState1.length > 1 ? (
                            <Box display="flex" flexWrap="wrap" justifyContent="center">
                                {newState1.map((item, idx) => (
                                    <Box key={idx} margin={0.5}>
                                        <Button
                                            variant={highlight(item)}
                                            onClick={() => onClickChangeImage(item)}
                                        >
                                            {idx + 1}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        ) : null}
                    </Box>
                </Box>
            </Card>
        </Box>
    );
    // return (
    //     <div>
    //         <Card className="m-1">
    //             <Card.Body>
    //                 <Row className="justify-content-center mb-3">
    //                     {campaign && (
    //                         <img
    //                             width="86px"
    //                             height="58px"
    //                             alt="58x86"
    //                             src={campaign.coupon_banner_image}
    //                         />
    //                     )}
    //                 </Row>
    //                 <Paper square>
    //                     <Tabs
    //                         value={page}
    //                         indicatorColor="primary"
    //                         textColor="primary"
    //                         onChange={handleChange}
    //                         centered
    //                     >
    //                         <Tab label="QRCODE" />
    //                         <Tab label="BARCODE" />
    //                     </Tabs>
    //                 </Paper>

    //                 <Row className="justify-content-center mt-1">
    //                     {page === 0 ? (
    //                         <>
    //                             <img
    //                                 width="100px"
    //                                 height="100px"
    //                                 alt="QR Code"
    //                                 src={url}
    //                                 className='img-qr'
    //                             />
    //                             <h6 className="text-center qr-code-text">{hoverCode}</h6>
    //                         </>
    //                     ) : (
    //                         <Barcode value={hoverCode} />
    //                     )}
    //                 </Row>

    //                 <h5 className="mt-3 text-center qr-code-text">{code}</h5>

    //                 <Form className="mt-3">
    //                     {newState1.length > 1 ? (
    //                         <Form.Group className="justify-content-center text-center">
    //                             {newState1.map((item, idx) => (
    //                                 <React.Fragment key={idx}>
    //                                     <Button
    //                                         variant={highlight(item)}
    //                                         onClick={() => onClickChangeImage(item)}
    //                                         className="m-1"
    //                                     >
    //                                         {idx + 1}
    //                                     </Button>
    //                                     {(idx + 1) % 5 === 0 && <br />}
    //                                 </React.Fragment>
    //                             ))}
    //                         </Form.Group>
    //                     ) : null}
    //                 </Form>
    //             </Card.Body>
    //         </Card>
    //     </div>
    // );
};

export default Reward;
