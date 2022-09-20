import { Component } from 'react';
import "./Point.css";
import SignHeader from '../Sign/SignHeader';
import axios from "axios";
// import moment from 'moment';
import PointModal from './PointModal';


class Point extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            user: "",
            modalopen: false
        }
    }

    onClinkModalOpen = () => {
        this.setState({modalopen: true})
    }
    onClinkModalClose = () => {
        this.setState({modalopen: false})
    }
    
    componentDidMount = () => {
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: id,
            })
                .then((res) => {
                    this.setState({ user: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })

            axios.post("https://server.lowehair.kr/getpoint", {
                UserId: id
            }).then((res) => {
                this.setState({ data: res.data })
            })
        } else {
            window.location.href = "/signin"
        }
    }

    render() {
        return (
            <>
                <SignHeader header="포인트" />
                <div className='Point_mypoint'  style={this.state.data.length ? null: {borderBottom: "none"}}>
                    <div style={{ font: "400 14px 'Noto Sans", marginBottom: "2px" }}>보유 포인트</div>
                    <div className='Point_mypoint_check'>
                        <div style={{marginBottom: "20px"}}>
                            <img style={{ marginRight: "4px", marginBottom: "-2px" }} src={process.env.PUBLIC_URL + "/image/nav/mypage_point.svg"} alt="로위 쿠폰" />
                            <span className='Point_mypoint_left'>{this.state.user ? this.state.user.point.comma() : null}P</span>
                        </div>
                        <div style={{ lineHeight: "17px", marginBottom: "4px" }}>
                            <img style={{ marginRight: "4px", width: "12px", marginBottom: "-1px" }} src={process.env.PUBLIC_URL + "/image/nav/point_infomation.svg"} alt="로위 쿠폰" />
                            <span onClick={this.onClinkModalOpen} className='Point_mypoint_info'>로위몰 포인트 안내</span>
                        </div>
                        <div>
                            <span className='Point_mypoint_infodetail'>포인트는 시술 완료 다음날 오전 11시에 적립됩니다.</span>
                        </div>
                    </div>
                </div>
                <div style={{padding: "0 12px 80px 12px"}}>
                    {
                        this.state.data ?
                            this.state.data.map((e) => (
                                <div style={{display: "flex", justifyContent: "space-between", marginBottom:"35px"}}>
                                    <div style={{display: "flex"}}>
                                        <div className={e.isSaved ? "Point_cicle_plus" : "Point_cicle_minus"}>{e.isSaved ? "+ 적립" : "- 사용"}</div>
                                        <div>
                                            <div className='Point_mypoint_date'>{e.createdAt.slice(0, 10).replaceAll("-", ".")}</div>
                                            <div className='Point_mypoint_type'>{e.type}</div>
                                            <div className='Point_mypoint_goods'>{e.goods? e.goods : " "}</div>
                                        </div>
                                    </div>
                                    <div>
                                            <div className='Point_mypoint_pointuse'>{e.isSaved ? "+":"-"}{e.point.comma()}P</div>
                                            {/* <div className='Point_mypoint_expired'>~{new Date(moment(e.createdAt).add(2, 'years')).toISOString().slice(0, 10).replaceAll("-", ".")}</div> */}
                                    </div>
                                </div>
                            )) : null
                    }
                </div>
                { this.state.modalopen ?
                <PointModal close={this.onClinkModalClose} /> : null
                }
            </>
        );
    }
}
export default Point;