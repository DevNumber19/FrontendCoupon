import React , { Component } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { API_URL } from '../../src/service/endpoint'

class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: "e-Coupon",
        }
    }
    async componentDidMount() {
        const load = async () => {
            const hostname = window.location.hostname;
            hostname = hostname.split('.')[0];
            // let hostname = url.split('.')[0];
            // hostname = 'lemon8-coupon';
            await axios.get(API_URL + "/host/" + hostname)
                .then(response => {
                    //console.log(response.data.data);
                    this.setState({ title: response.data.data.title })
                })
                .catch(err => {
                    console.error(err)
                })


        }
        await load();
    }
    render(){
        return (
            <>
                <Head>
                    <title>{ this.state.title }</title>
                    {/* <title>Lemon8 Coupon</title> */}
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </>
        )
    }
}

export default Header