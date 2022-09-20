import { Component } from "react";
import "./Mainimg.css"
import TagManager from "react-gtm-module";

class Mainimg extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onClickstyleAll = async() =>{
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_style_all'
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        return (
            <>
                <img className="Mainimg_img" src={this.props.data[0].Urls[0].url} alt="메인이미지" />
                <div className="Mainimg_img_contents">
                    <div className="Mainimg_img_contents_title">{this.props.board.introTitle}</div>
                    <div className="Mainimg_img_contents_title">{this.props.board.name}</div>
                    <div className="Mainimg_img_contents_content">{this.props.board.introduction}</div>
                    <a href={`/boardstyles/${this.props.board.id}`} onClick={this.onClickstyleAll}>
                        <div className="Mainimg_img_contents_portfolio">
                            <span className="Mainimg_img_contents_portfolio_title">스타일 전체보기</span>
                            <span className="Mainimg_img_contents_portfolio_arrow">
                                <img src={process.env.PUBLIC_URL + "/image/nav/boarddetail_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </a>
                </div>
                {this.props.sub[0] ?
                    <div>
                        <img key={this.props.sub[0].Urls[0].id} className="Mainimg_img" src={this.props.sub[0].Urls[0].url} alt="메인이미지" />
                        {this.props.sub[0].Urls[1] ?
                            <img key={this.props.sub[0].Urls[1].id} style={{ marginTop: "80px" }} className="Mainimg_img" src={this.props.sub[0].Urls[1].url} alt="메인이미지" /> : null
                        }
                    </div> : null
                }
                <div style={{ marginTop: "40px", marginBottom: "24px" }}>
                    <span className="Mainimg_img_tips">LOWE’s TIP</span>
                    <span>
                        <img className="Mainimg_img_tips_line" src={process.env.PUBLIC_URL + "/image/nav/board_line.svg"} alt="라인" />
                    </span>
                </div>
                <div>
                    <div>
                        <span><img src={process.env.PUBLIC_URL + "/image/nav/board_check.svg"} alt="상품 체크" /></span>
                        <span className="Mainimg_img_tips_recommand_title">이런 분들께 추천해요!</span>
                    </div>
                    <div className="Mainimg_img_tips_recommand">
                        {this.props.board.recommendation}
                    </div>
                </div>
                {this.props.board.counsel ?
                    <div style={{ marginTop: "20px", marginBottom: "80px" }}>
                        <div>
                            <span><img src={process.env.PUBLIC_URL + "/image/nav/board_check.svg"} alt="상품 체크" /></span>
                            <span className="Mainimg_img_tips_recommand_title">상담이 필요해요!</span>
                        </div>
                        <div className="Mainimg_img_tips_recommand">
                            {this.props.board.counsel}
                        </div>
                    </div> :
                    <div style={{ marginBottom: "80px" }}>
                    </div>
                }
                {
                    this.props.sub[1] ?
                        <div>
                            <img key={this.props.sub[1].Urls[0].id} className="Mainimg_img" src={this.props.sub[1].Urls[0].url} alt="메인이미지" />
                            {this.props.sub[1].Urls[1] ?
                                <img style={{ marginTop: "80px" }} key={this.props.sub[1].Urls[1].id} className="Mainimg_img" src={this.props.sub[1].Urls[1].url} alt="메인이미지" /> : null
                            }
                        </div> : null
                }
            </>
        )
    }
}

export default Mainimg;