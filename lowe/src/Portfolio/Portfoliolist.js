import { Component } from "react";
import Header from "./PortHeader";
import axios from "axios";
import "./Portfoliolist.css"
import Footer from "../Nav/Footer";
import Portf from "./Portf";

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
            axios.post("http://54.180.117.244:5000/getPortfolio", {
                ManagerId: id,
                hashtag: portfolio
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
            })

            axios.post("http://54.180.117.244:5000/getDesigner", {
                id: id, isHashtag: true, isFavorite: true
            }).then((res) => {
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
            axios.post("http://54.180.117.244:5000/getPortfolio", {
                hashtag: portfolio
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
