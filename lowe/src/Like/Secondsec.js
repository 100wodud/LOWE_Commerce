import { Component } from "react";
import axios from "axios";
import DesignerList from "../Designer/DesignerList";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {

        let user_id = Number(window.localStorage.getItem("id"));
        if (user_id) {
            axios.post(`https://server.lowehair.kr/getFavorite`, {
                user_id: user_id
            })
                .then((res) => {
                    this.setState({ data: res.data })
                }).catch((err) => {
                    console.log(err)
                });
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
            <section style={{ paddingBottom: "80px" }}>
                {this.state.data.length ?
                    this.state.data.map((e) => (
                        <DesignerList data={e.Manager} rank={true} event="click_wish_designer" />
                    ))
                    :
                    <div style={{ marginTop: "132px" }} className="mypage_nolike" >
                        <img src={process.env.PUBLIC_URL + "/image/nav/like_nolike.svg"} alt="등록한 리뷰가 없습니다"></img>
                        <div>
                            <div>찜한 디자이너가 없습니다</div>
                        </div>
                        <div className="nolike_button" style={{ lineHeight: "34px", marginTop: "20px", width: "132px" }} >
                            <a href={`/designers${funnel}`}>디자이너 보러가기</a>
                        </div>
                    </div>
                }
            </section>
        )
    }
}

export default Secondsec;
