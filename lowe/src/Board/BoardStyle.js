import { Component } from "react";
import Header from "../Portfolio/PortHeader";
import axios from "axios";
import "./BoardStyle.css"

class BoardStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            designer: "",
            coupon: "",
            style: "",
        };
    }

    componentDidMount = () => {
        let id = decodeURI(window.location.pathname.split("/")[2]);
        if (id === "") {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                isDesigner: true
            }).then((res) => {
                this.setState({ data: res.data.portfolio })
            })

        } else {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                BoardId: id,isDesigner: true
            }).then((res) => { 
                this.setState({ data: res.data.portfolio, style: id })
            })
        }
    }


    render() {
        return (
            <>
                <Header portfolio={true} />
                <div style={{ paddingTop: "61px" }}>

                    {
                        this.state.data.length ?
                            <a href={`/board/${this.state.data[0].Boards[0].id}`} key={this.state.data[0].Boards[0].id}>
                                <div className="Porf_Board">
                                    <div>
                                        <img src={this.state.data[0].Boards[0].thumbnail} alt={this.state.data[0].Boards[0].content} />
                                    </div>
                                    <div style={{ marginLeft: "12px" }}>
                                        <div className="Porf_Board_designer"><strong>{this.state.data[0].Boards[0].designer_name} {this.state.data[0].Manager.rank}</strong> {this.state.data[0].Boards[0].store}</div>
                                        <div className="Porf_Board_name">{this.state.data[0].Boards[0].name}</div>
                                        <div className="Porf_Board_price">{this.state.data[0].Boards[0].eventType ? <span>{this.state.data[0].Boards[0].eventPrice + "%"}</span> : null}{this.state.data[0].Boards[0].price.comma()}원</div>

                                    </div>
                                </div>
                            </a> : null
                    }

                </div>
                <div style={{ padding: "12px 12px 4px 12px" }}>
                    <div className="Portfoliolist_title" style={{ marginBottom: "10px" }}>#Style Tag</div>
                </div>
                <div className="Portfoliolist_images">
                    {
                        this.state.data.length ?
                            this.state.data.map((e, i) => (
                                <div key={e.id}>
                                    <a href={`/portfolio/${e.id}`}>

                                        {
                                            e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                                <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                                    <source src={e.img + "#t=0.5"} />
                                                </video> :
                                                <img src={e.img} alt="로위 포트폴리오 이미지" />
                                        }
                                    </a>
                                </div>
                            )) : null
                    }
                </div>
            </>
        )
    }
}

export default BoardStyle;
