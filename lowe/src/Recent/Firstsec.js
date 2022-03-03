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
                await axios.post("http://3.36.218.192:5000/getBoardDetail", {
                    id: recent[i],
                })
                    .then((res) => {
                        arr.push(res.data.board)
                    });

            }
            this.setState({ Showgoods: arr })
        }
    }

    render() {
        return (
            <section className="Recent_first_section">
                <div className="Recent_total">총 {this.state.Showgoods.length}개</div>
                {
                    this.state.Showgoods.length ?
                        <div className="goods_list">
                            {
                                this.state.Showgoods.map((e) => (
                                    <Goodslist e={e} key={e.id} />
                                ))
                            }
                        </div> :

                        <div className="mypage_nolike">
                            <img src={process.env.PUBLIC_URL + "/image/nav/no_like.svg"} alt="등록한 리뷰가 없습니다"></img>
                            <div>
                                <div>최근 본 시술이 없습니다</div>
                            </div>
                            <div className="nolike_button" style={{ lineHeight: "52px", marginTop: "43px" }} >
                                <a href="/">상품 보러가기</a>
                            </div>
                        </div>
                }
            </section>
        )
    }
}

export default Firstsec;