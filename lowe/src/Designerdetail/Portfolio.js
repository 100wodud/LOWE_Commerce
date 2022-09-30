import { Component } from "react";
import "./Portfolio.css";
import TagManager from "react-gtm-module";

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        let port = [];
        if (this.props.data) {
            for (let i = 0; i < this.props.portfolio.length; i++) {
                for (let j = 0; j < this.props.portfolio[i].Hashtags.length; j++) {
                    if (this.props.portfolio[i].Hashtags[j].content === this.props.data.content) {
                        port.push(this.props.portfolio[i])
                    }
                }
            }
            port.sort((a, b)=> a.order - b.order);
            this.setState({ data: port })
        }
    }

    onClickAll = (e)=> async() =>{
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_designer_styletab_view_all',
                tag: e
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }

    onClickPortfolio = (e) => (i)=> async() =>{
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_designer_styletab_image',
                tag: e,
                portfolio_id: i
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }

    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <section className="Portfolio_section">
                {this.state.data.length ?
                    <>
                        <div className="Portfolio_title_div">
                            <div className="Portfolio_title_content">#{this.props.data.content}</div>
                            <div className="Portfolio_title_allview">
                                <span>
                                    <a onClick={this.onClickAll(this.props.data.content)} href={`/portfolios/${this.props.data.content}/${this.props.designer}${funnel}`} style={{ font: "500 14px Noto Sans", marginRight: "2px" }}>전체보기</a>
                                </span>
                                <span>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                                </span>
                            </div>
                        </div>
                        <div className="Portfolio_images_div">
                            <div>
                                <div className="Portfolio_images_first">
                                    {this.state.data[0] ?
                                        <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#0${funnel}`} onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[0].id)}>
                                            {
                                                this.state.data[0].img.slice(this.state.data[0].img.lastIndexOf('.'), this.state.data[0].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[0].img.slice(this.state.data[0].img.lastIndexOf('.'), this.state.data[0].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                    <video preload="metadata" alt="포트폴리오 사진" >
                                                        <source src={this.state.data[0].img + "#t=0.5"} />
                                                    </video> :
                                                    <img src={this.state.data[0].img} alt="포트폴리오 사진" />
                                            }
                                        </a> : null
                                    }
                                </div>
                                <div className="Portfolio_images_second_div">
                                    <div className="Portfolio_images_second">
                                        {this.state.data[1] ?
                                            <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#1${funnel}`}  onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[1].id)}>
                                                {
                                                    this.state.data[1].img.slice(this.state.data[1].img.lastIndexOf('.'), this.state.data[1].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[1].img.slice(this.state.data[1].img.lastIndexOf('.'), this.state.data[1].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                        <video preload="metadata" alt="포트폴리오 사진" >
                                                            <source src={this.state.data[1].img + "#t=0.5"} />
                                                        </video> :
                                                        <img src={this.state.data[1].img} alt="포트폴리오 사진" />
                                                }
                                            </a> : null
                                        }
                                    </div>
                                    <div className="Portfolio_images_third">
                                        {this.state.data[2] ?
                                            <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#2${funnel}`}  onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[2].id)}>
                                                {
                                                    this.state.data[2].img.slice(this.state.data[2].img.lastIndexOf('.'), this.state.data[2].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[2].img.slice(this.state.data[2].img.lastIndexOf('.'), this.state.data[2].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                        <video preload="metadata" alt="포트폴리오 사진" >
                                                            <source src={this.state.data[2].img + "#t=0.5"} />
                                                        </video> :
                                                        <img src={this.state.data[2].img} alt="포트폴리오 사진" />
                                                }
                                            </a> : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="Portfolio_images_third_div">
                                <div>
                                    {this.state.data[3] ?
                                        <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#3${funnel}`}  onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[3].id)}>
                                            {
                                                this.state.data[3].img.slice(this.state.data[3].img.lastIndexOf('.'), this.state.data[3].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[3].img.slice(this.state.data[3].img.lastIndexOf('.'), this.state.data[3].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                    <video preload="metadata" alt="포트폴리오 사진" >
                                                        <source src={this.state.data[3].img + "#t=0.5"} />
                                                    </video> :
                                                    <img src={this.state.data[3].img} alt="포트폴리오 사진" />
                                            }
                                        </a> : null
                                    }
                                </div>
                                <div>
                                    {this.state.data[4] ?
                                        <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#4${funnel}`}  onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[4].id)}>
                                            {
                                                this.state.data[4].img.slice(this.state.data[4].img.lastIndexOf('.'), this.state.data[4].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[4].img.slice(this.state.data[4].img.lastIndexOf('.'), this.state.data[4].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                    <video preload="metadata" alt="포트폴리오 사진" >
                                                        <source src={this.state.data[4].img + "#t=0.5"} />
                                                    </video> :
                                                    <img src={this.state.data[4].img} alt="포트폴리오 사진" />
                                            }
                                        </a> : null
                                    }
                                </div>
                                <div>
                                    {this.state.data[5] ?
                                        <a href={`/portfoliolist/${this.props.data.content}/${this.props.designer}#5${funnel}`}  onClick={this.onClickPortfolio(this.props.data.content)(this.state.data[5].id)}>
                                            {
                                                this.state.data[5].img.slice(this.state.data[5].img.lastIndexOf('.'), this.state.data[5].img.lastIndexOf('.') + 4) === ".avi" || this.state.data[5].img.slice(this.state.data[5].img.lastIndexOf('.'), this.state.data[5].img.lastIndexOf('.') + 4) === ".mp4" ?
                                                    <video preload="metadata" alt="포트폴리오 사진" >
                                                        <source src={this.state.data[5].img + "#t=0.5"} />
                                                    </video> :
                                                    <img src={this.state.data[5].img} alt="포트폴리오 사진" />
                                            }
                                        </a> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </> :
                    null
                }
            </section>
        )
    }
}

export default Portfolio;