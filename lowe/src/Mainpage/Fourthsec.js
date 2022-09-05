import { Component } from "react";
import "./Fourthsec.css";
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll'

class Fourthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            category: "신촌",
            style: "컷",
            styledata: [],
        };
    }

    componentDidMount = () => {
        axios.post("https://server.lowehair.kr/getDesigner", {
            isRank: true, store: "신촌", isHashtag: true
        }).then((res) => {
            this.setState({ data: res.data.slice(0, 3) })
        })

        axios.post("https://server.lowehair.kr/getPortfolio", {
            hashtag: "컷"
        }).then((res) => {
            this.setState({ styledata: res.data.portfolio.slice(0,9) })
        })
    }

    onClickfilter = (e) => () => {
        this.setState({ category: e })

        axios.post("https://server.lowehair.kr/getDesigner", {
            isRank: true, store: e, isHashtag: true
        }).then((res) => {
            this.setState({ data: res.data.slice(0, 3) })
        })
    }


    onClickstylefilter = (e) => () => {
        this.setState({ style: e })

        axios.post("https://server.lowehair.kr/getPortfolio", {
            hashtag: e
        }).then((res) => {
            this.setState({ styledata: res.data.portfolio.slice(0, 9) })
        })
    }





    render() {
        const category = [{ id: 0, category: "신촌" }, { id: 1, category: "합정" }, { id: 2, category: "홍대입구역" }, { id: 3, category: "L7홍대" }, { id: 5, category: "강남" }, { id: 6, category: "이수역" }];
        const category2 = [{ id: 0, category: "컷" }, { id: 1, category: "발레아쥬" }, { id: 2, category: "히피펌" }, { id: 4, category: "고데기펌" }, { id: 5, category: "맨즈헤어" }, { id: 5, category: "단발" }];
        return (
            <section className="Mainpage_fourth_section">
                <div className="Mainpage_fourth_recommand" >
                    <div><strong>지점별 인기 디자이너 ✨</strong></div>
                    <div>
                        <a href="/designers" >
                            <span>
                                <span>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </a>
                    </div>
                </div>
                <div>

                    <ScrollContainer className="filter_category" style={{width: "initial", marginBottom: "12px"}}>
                        {category.map((e, i) => (
                            <span key={e.category} className={(this.state.category === e.category ? "category_select" : "category_nonselect")} onClick={this.onClickfilter(e.category)}  style={this.state.category === e.category ? {padding: "4px 16px 5px"}: null}>{e.category}</span>
                        ))
                        }
                    </ScrollContainer>
                </div>
                <div className="Mainpage_fourth_designer">
                    {this.state.data.map((e) => (
                        <div key={e.id}>
                            <a href={`/designer/${e.id}`}>
                                <div>
                                    <img className="Mainpage_fourth_designer_img" src={e.img} alt="디자이너" />
                                </div>
                                <div>
                                    <div className="Mainpage_fourth_designer_name">{e.name} {e.rank}</div>
                                    <div className="Mainpage_fourth_designer_hash">#{e.Hashtags[0].content}</div>
                                    <div className="Mainpage_fourth_designer_hash">#{e.Hashtags[1].content}</div>
                                </div>
                            </a>
                        </div>
                    ))
                    }
                </div>
                <div className="Mainpage_fourth_recommand" >
                    <div><strong>#스타일</strong></div>
                    <div>
                        <a href={`/styles/${this.state.style}`} >
                            <span>
                                <span>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </a>
                    </div>
                </div>
                <div>
                    <ScrollContainer className="filter_category" style={{width: "initial"}}>
                        {category2.map((e, i) => (
                            <span key={e.category} className={(this.state.style === e.category ? "category_select" : "Portfolio_title_content")} onClick={this.onClickstylefilter(e.category)} style={{padding: "5px 12px", fontSize: "13px"}}>#{e.category}</span>
                        ))
                        }
                    </ScrollContainer>
                </div>

                <div className="DMain_allmenu_style" style={{marginTop: "8px"}}>
                        {
                            this.state.styledata.length ?
                                this.state.styledata.map((e) => (
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
                                ))
                                : null
                        }
                    </div>

            </section>
        )
    }
}

export default Fourthsec;
