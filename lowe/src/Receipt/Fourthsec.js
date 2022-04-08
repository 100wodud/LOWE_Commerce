import { Component } from "react";
import "./Fourthsec.css";

class Fourthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            store: null
        };
    }


    render() {
        console.log(this.state)
        return (
            <>
                {this.props.manager ?
                    <section className="Receipt_Fourth_section">
                        <div>
                            <div className="Receipt_first_title">정보</div>
                            <div id="rstore">
                                <div>
                                    <dl className="dl">
                                        <dt className="dt">위치</dt>
                                        <dd className="dd">
                                            {
                                                this.props.store ?
                                                    <>
                                                        <div><strong>로위 {this.props.store.store}</strong></div>
                                                        <div style={{ marginTop: "12px" }}>{this.props.store.address}</div>
                                                        {
                                                            this.props.store.location.map((e, i) => (
                                                                <div key={i} style={{ marginTop: "12px" }}>{e}</div>
                                                            ))
                                                        }
                                                        <div className="store-map">
                                                            <a href={this.props.store.mapurl}>지도에서 매장 확인하기</a>
                                                        </div>
                                                    </> :
                                                    <>
                                                        <div>{this.props.manager.address}</div>
                                                        {/* <div className="store_map">
                                                    <a href={`https://map.kakao.com/?urlLevel=1&itemId=25540042&q=${this.props.manager.address.replaceAll(" ", "%20")}`}>지도에서 매장 확인하기</a>
                                                </div> */}
                                                    </>
                                            }
                                        </dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">매장번호</dt>
                                        <dd className="dd">
                                            <strong>
                                                {
                                                    this.props.store ?
                                                        <a href={`tel:${this.props.store.phone}`}>
                                                            {this.props.store.phone}
                                                        </a> :
                                                        <a href={`tel:${this.props.manager.login_id}`}>
                                                            {this.props.manager.login_id}
                                                        </a>

                                                }
                                            </strong>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </section>
                    : null}
            </>
        )
    }
}

export default Fourthsec;