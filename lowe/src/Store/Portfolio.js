import { Component } from "react";
import "./Portfolio.css";

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
                                    <a href={`/portfolios/${this.props.data.content}/${this.props.data.Manager_Hashtag.ManagerId}${funnel}`} style={{ font: "500 14px Noto Sans", marginRight: "2px" }}>전체보기</a>
                                </span>
                                <span>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                                </span>
                            </div>
                        </div>
                        <div className="Portfolio_images_div">
                        </div>
                    </> :
                    null
                }
            </section>
        )
    }
}

export default Portfolio;