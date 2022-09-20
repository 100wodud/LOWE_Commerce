import { Component } from "react";
import Header from "./PortHeader";
import axios from "axios";
import "./Portfoliolist.css"
import Footer from "../Nav/Footer";
import Portf from "./Portf";
import TagManager from "react-gtm-module";

class Portfoliolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            designer: "",
            coupon: ""
        };
    }

    componentDidMount = () => {
        let portfolio = decodeURI(window.location.pathname.split("/")[2]);
        let id = Number(window.location.pathname.split("/")[3]);
        let scroll = window.location.href.split("#")[1];
        if (id) {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                ManagerId: id,
                hashtag: portfolio, isDesigner: true
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
            })

            axios.post("https://server.lowehair.kr/getDesigner", {
                id: id, isHashtag: true, isFavorite: true
            }).then((res) => {
                const tagManagerArgs = {
                    dataLayer: {
                        event: 'view_portfoliolist_page',
                        tag: portfolio,
                        branch: res.data[0].store,
                        designer: res.data[0].name
                    },
                };
                TagManager.dataLayer(tagManagerArgs);

                let coupon = ""
                if (res.data[0].coupons) {
                    coupon = JSON.parse(res.data[0].coupons)
                }
                this.setState({ designer: res.data[0], coupon: coupon })
                setTimeout(() => {
                    if( document.getElementById(scroll)){
                        document.getElementById(scroll).scrollIntoView();
                    }
                }, 500);
            }).catch((err) => {
                console.log(err)
            });
        } else {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                hashtag: portfolio, isDesigner: true
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
                setTimeout(() => {
                    if( document.getElementById(scroll)){
                        document.getElementById(scroll).scrollIntoView();
                    }
                }, 500);
            })
        }
    }

    render() {
        let scroll = window.location.href.split("#")[1];
        if( document.getElementById(scroll)){
            document.getElementById(scroll).scrollIntoView();
        }
        return (
            <>
                <Header />
                <section style={{paddingTop: "61px", paddingBottom: "80px" }}>
                    {
                        this.state.data.length ? 
                        this.state.data.map((e, i)=>(
                            <Portf data={e} key={e.id} id={i} />
                        )) : null
                    }
                </section>
                <Footer />
            </>
        )
    }
}

export default Portfoliolist;
