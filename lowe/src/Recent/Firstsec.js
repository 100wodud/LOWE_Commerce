import axios from 'axios';
import { Component } from "react";
import Goodslist from '../Home/Goodslist';
import "./Firstsec.css";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Showgoods: "",
        };
    }

    componentDidMount = async () => {
        let recent = JSON.parse(localStorage.getItem('recent'))
        if (recent) {
            let arr = [];
            for (let i = 0; i < recent.length; i++) {
                await axios.post("https://server.lowehair.kr/getBoard", {
                    id: recent[i],
                })
                    .then((res) => {
                        arr.push(res.data[0])
                    });

            }
            this.setState({ Showgoods: arr })
        }
    }

    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <section className="Recent_first_section">
                <div className="Recent_total">
                    <div className='Recent_total_title'>최근 본 항목</div>
                    {this.state.Showgoods.length ?
                        <div className='Recent_total_count'>총 {this.state.Showgoods.length}개</div> :
                        <div className='Recent_total_count'> </div>
                    }
                </div>
                {
                    this.state.Showgoods.length ?
                        <div className="goods_list">
                            {
                                this.state.Showgoods.map((e) => (
                                    e.open === "1" ?
                                    <Goodslist e={e} key={e.id} /> : null
                                ))
                            }
                        </div> :
                        <div className="mypage_nolike">
                            <img src={process.env.PUBLIC_URL + "/image/nav/like_nolike.svg"} alt="등록한 리뷰가 없습니다"></img>
                            <div>
                                <div>최근 본 시술이 없습니다</div>
                            </div>
                            <div className="nolike_button" style={{ lineHeight: "34px", marginTop: "20px" }} >
                                <a href={`/${funnel}`}>상품 더 보기</a>
                            </div>
                        </div>
                }
            </section>
        )
    }
}

export default Firstsec;