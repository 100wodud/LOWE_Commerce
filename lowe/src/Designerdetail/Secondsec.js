import { Component } from "react";
import ReviewList from "../Board/ReviewList";
import Goodslist from "../Home/Goodslist";
import Store from "../data/Store";
import "./Secondsec.css"

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainimg: [],
            review: [],
            imgreview: [],
            store: null
        };
    }
    componentDidMount = () => {
        let data = this.props.data;
        if (data.store) {
            for (let i = 0; i < Store.length; i++) {
                if (Store[i].store.indexOf(data.store) !== -1) {
                    this.setState({ store: Store[i] })
                }
            }
        }
    }

    render() {
        return (
            <section className="Ddetail">
                {
                    this.props.list === 1 ?
                        <div className="goods_list">
                            {
                                this.props.data.Boards.length ?
                                    this.props.data.Boards.map((e, i) => (
                                        <div key={e.id}>
                                            <Goodslist e={e} />
                                        </div>
                                    )) :
                                    <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%" }}>
                                        곧 새로운 스타일을 보여드릴게요 :)
                                    </div>
                            }
                        </div> :
                        this.props.list === 2 ?
                            this.props.data.Surgeries.length ?
                                <div className="Ddetail_surgery">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="Ddetail_surgery_title_first">시술</th>
                                                <th className="Ddetail_surgery_title_second">금액</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.data.Surgeries.map((e) => (
                                                <tr key={e.id}>
                                                    <td className="Ddetail_surgery_content_first">{e.content}</td>
                                                    <td className="Ddetail_surgery_content_second">{e.price.comma()}원</td>
                                                    <td className="Ddetail_surgery_content_third">{
                                                        e.url ?
                                                            <div className="Ddetail_orange">
                                                                <a href={e.url}>
                                                                    상품보기
                                                                </a>
                                                            </div> :
                                                            <div onClick={this.props.openmodalPhone("준비중인 페이지입니다")} style={{ cursor: "pointer" }}>
                                                                결제하기
                                                            </div>
                                                    }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div> :
                                <div style={{ marginTop: "20px", textAlign: "center" }}>
                                    상품이 없습니다
                                </div> :
                            this.props.list === 3 ?
                                <div style={{ marginTop: "24px", padding: "0 12px" }}>
                                    <ReviewList data={this.props.review} imgdata={this.props.imgreview} />

                                </div> :
                                this.props.list === 4 ?
                                    <div style={{ marginTop: "20px" }}>
                                        <div style={{ float: "left", padding: "12px", paddingBottom: "80px" }}>
                                            <div id="store">
                                                <div>
                                                    <dl className="dl">
                                                        <dt className="dt">Instagram</dt>
                                                        <dd className="dd"><a href={this.props.data.sns}><strong>{this.props.data.sns.split('/')[3]}</strong></a></dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">위치</dt>
                                                        <dd className="dd">
                                                            {
                                                                this.state.store ?
                                                                    <>
                                                                        <div><strong>로위 {this.state.store.store}</strong></div>
                                                                        <div style={{ marginTop: "12px" }}>{this.state.store.address}</div>
                                                                        {
                                                                            this.state.store.location.map((e) => (
                                                                                <div style={{ marginTop: "12px" }}>{e}</div>
                                                                            ))
                                                                        }
                                                                        <div className="store-map">
                                                                            <a href={this.state.store.mapurl}>지도에서 매장 확인하기</a>
                                                                        </div>
                                                                    </> :
                                                                    <>
                                                                        <div>{this.props.data.address}</div>
                                                                        {/* <div className="store_map">
                                                                            <a href={`https://map.kakao.com/?urlLevel=1&itemId=25540042&q=${this.props.data.address.replaceAll(" ", "%20")}`}>지도에서 매장 확인하기</a>
                                                                        </div> */}
                                                                    </>
                                                            }
                                                        </dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">운영시간</dt>
                                                        <dd className="dd"><div style={{ marginBottom: "12px" }}><strong>{this.props.data.operating_time}</strong></div><div>{this.props.data.home}</div></dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">매장번호</dt>
                                                        <dd className="dd">
                                                            <strong>
                                                                {
                                                                    this.state.store ?
                                                                        <a href={`tel:${this.state.store.phone}`}>
                                                                            {this.state.store.phone}
                                                                        </a> :
                                                                        <a href={`tel:${this.props.data.login_id}`}>
                                                                            {this.props.data.login_id}
                                                                        </a>

                                                                }
                                                            </strong>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                }
            </section>
        )
    }
}

export default Secondsec;