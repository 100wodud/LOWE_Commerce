import { Component } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'
import "./Style.css";
import axios from "axios";
import TagManager from "react-gtm-module";

class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }
    componentDidMount = () => {

        axios.post("https://server.lowehair.kr/getPortfolio", {
            hashtag: this.props.data
        }).then((res)=>{
            this.setState({data: res.data.portfolio})
        })
    }

    onClicktagPort = (e)=>(i) => async() =>{
        const tagManagerArgs = {
            dataLayer: {
                event: "click_designers_style_image",
                index: i,
                tag: this.props.data,
                portfolio_id: e.id
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    onClickAllport = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: "click_designers_style_view_all",
                tag: this.props.data,
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }


    render() {
        let port = [];
        let Portfolios = [];
        if(this.state.data.length){
            port = this.state.data;
            Portfolios = port.sort(() => Math.random() - 0.5).slice(0, 8);
        }
        return (
            <>
            { this.state.data.length ?
            <div className="DesignerList_style_div">
                <div className="DMain_allmenu">
                    <div className="DesignerList_style_title" style={{marginBottom: "16px"}}>#{this.props.data}</div>
                    <div style={{marginBottom: "16px"}}>
                        <a href={`/portfolios/${this.props.data}`} onClick={this.onClickAllport}>
                            <span>
                                <span>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </a>
                    </div>

                </div>
                <ScrollContainer className="DesignerList_port_slide">
                    {
                        Portfolios.map((e, i)=>(
                            <a key={e.id} href={`/portfolio/${e.id}`} onClick={this.onClicktagPort(e)(i)}>
                                {
                                    e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                        <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                            <source src={e.img + "#t=0.5"} />
                                        </video> :
                                        <img src={e.img} alt="로위 포트폴리오 이미지" />
                                }
                            </a>
                        ))
                    }
                </ScrollContainer>
            </div>: null
            }
            </>
        )
    }
}

export default Style;
