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

    componentDidMount = () => {
        let user = window.localStorage.getItem("id");
        axios.post("http://3.36.218.192:5000/getMyWish", { user: user })
            .then((res) => {
                this.setState({ Showgoods: res.data })
            }).catch((err) => {
                console.log(err)
            })

    }

    render() {
        console.log(this.state.Showgoods)
        return (
            <section className="Like_first_section">
                {
                    this.state.Showgoods.length ?
                        <div className="Like_total">총 {this.state.Showgoods.length}개</div>
                        : null
                }
                {
                    this.state.Showgoods.length ?
                        <div className="goods_list">
                            {
                                this.state.Showgoods.map((e) => (
                                    <Goodslist e={e.Board} key={e.id} />
                                ))
                            }
                        </div> :
                        <div className="mypage_nolike">
                            <img src={process.env.PUBLIC_URL + "/image/nav/no_like.svg"} alt="등록한 리뷰가 없습니다"></img>
                            <div>
                                <div>찜한 시술이 없습니다</div>
                            </div>
                            <div className="nolike_button" style={{ lineHeight: "52px", marginTop: "43px" }} >
                                <a href="/">상품 더 보기</a>
                            </div>
                        </div>
                }
            </section>
        )
    }
}

export default Firstsec;