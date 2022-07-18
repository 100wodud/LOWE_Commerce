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
        let id = Number(window.location.pathname.split("/")[3])
        if (id) {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                ManagerId: id,
                hashtag: portfolio
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
            })

            axios.post("https://server.lowehair.kr/getDesignerDetail", {
                id: id,
            }).then((res) => {
                let coupon = ""
                if (res.data.coupons) {
                    coupon = JSON.parse(res.data.coupons)
                }
                this.setState({ designer: res.data, coupon: coupon })
            }).catch((err) => {
                console.log(err)
            });
        } else {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                hashtag: portfolio
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
            })
        }

        let scroll = window.location.href.split("#")[1];
        if( document.getElementById(scroll)){
            document.getElementById(scroll).scrollIntoView();
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
