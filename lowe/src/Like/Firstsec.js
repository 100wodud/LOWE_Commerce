import axios from 'axios';
import { Component } from "react";
import "./Firstsec.css";
import ScrollContainer from 'react-indiana-drag-scroll';
import Recommand from '../Board/Recommand';

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Showgoods: "",
        };
    }

    componentDidMount = () => {
        let user = window.localStorage.getItem("id");
        axios.post("https://server.lowehair.kr/getMyWish", { user: user })
            .then((res) => {
                this.setState({ Showgoods: res.data })
            }).catch((err) => {
                console.log(err)
            })

    }

    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <section className="Like_first_section">
                <div className="Recent_total">
                    <div className='Recent_total_title'>찜한 시술</div>
                    <div className='Recent_total_count'>총 {this.state.Showgoods.length}개</div>
                </div>
                {
                    this.state.Showgoods.length ?
                        <div className="Recent_total_list">
                            <ScrollContainer className="recommand_scroll">
                                {
                                    this.state.Showgoods.map((e => (
                                        <Recommand key={e.id} e={e.Board} />
                                    )))

                                }
                            </ScrollContainer>
                        </div> :
                        <div className="mypage_nolike">
                            <img src={process.env.PUBLIC_URL + "/image/nav/no_like.svg"} alt="등록한 리뷰가 없습니다"></img>
                            <div>
                                <div>찜한 시술이 없습니다</div>
                            </div>
                            <div className="nolike_button" style={{ lineHeight: "52px", marginTop: "23px" }} >
                                <a href={`/${funnel}`}>상품 더 보기</a>
                            </div>
                        </div>
                }
            </section>
        )
    }
}

export default Firstsec;