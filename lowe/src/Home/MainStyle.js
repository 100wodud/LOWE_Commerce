import { Component } from "react";
import Header from "../Portfolio/PortHeader";
import axios from "axios";
import "./MainStyle.css"
import DesignerList from "../Designer/DesignerList";
import ScrollContainer from 'react-indiana-drag-scroll'

class MainStyle extends Component {
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
        let portfolio = decodeURI(window.location.pathname.split("/")[2]);
            if (portfolio === "") {
                axios.post("https://server.lowehair.kr/getPortfolio", {
                }).then((res) => {
                    this.setState({ data: res.data.portfolio })
                })

            } else {
                axios.post("https://server.lowehair.kr/getPortfolio", {
                    hashtag: portfolio
                }).then((res) => {
                    this.setState({ data: res.data.portfolio, style: portfolio })
                })
            }
    }

    onClickstylefilter = (e) => () => {
        this.setState({ style: e })

        axios.post("https://server.lowehair.kr/getPortfolio", {
            hashtag: e
        }).then((res) => {
            this.setState({ data: res.data.portfolio })
        })
    }


    render() {
        const category2 = [{ id: 0, category: "컷" }, { id: 1, category: "발레아쥬" }, { id: 2, category: "히피펌" }, { id: 4, category: "고데기펌" }, { id: 5, category: "맨즈헤어" }, { id: 5, category: "단발" }];
        return (
            <>
                <Header portfolio={true} />
                <div style={{ paddingTop: "61px" }}>
                    {
                        this.state.designer ?
                            <DesignerList data={this.state.designer} /> : null
                    }
                </div>
                <div style={{ padding: "12px 12px 4px 12px" }}>
                    <div className="Portfoliolist_title" style={{marginBottom: "10px"}}>#Style Tag</div>
                <div>

                <ScrollContainer className="filter_category" style={{width: "initial", marginLeft: "0"}}>
                        {category2.map((e, i) => (
                            <span key={e.id} className={(this.state.style === e.category ? "category_select" : "Portfolio_title_content")} onClick={this.onClickstylefilter(e.category)} style={{padding: "5px 12px", fontSize: "13px"}}>#{e.category}</span>
                        ))
                        }
                    </ScrollContainer>
                </div>
                </div>
                <div className="Portfoliolist_images">
                    {
                        this.state.data.length ?
                            this.state.data.map((e, i) => (
                                <div key={e.id}>
                                    <a href={`/portfoliolist${this.state.style ? "/" + this.state.style : ""}#${i}`}>

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

export default MainStyle;
