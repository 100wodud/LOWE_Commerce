import { Component } from "react";
import store from "../data/Store";
import "./Store.css"
import ModalPhone from "../Sign/ModalPhone";
import TagManager from "react-gtm-module";

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: "",
            modalcomment: "",
        };
    }

    componentDidMount = () => {
        let data = this.props.data;
        if (data) {
            for (let i = 0; i < store.length; i++) {
                if (store[i].store.indexOf(data) !== -1) {
                    this.setState({ store: store[i] })
                }
            }
        }
    }

    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };



    clickAddress = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_adress_copy'
            },
        };
        TagManager.dataLayer(tagManagerArgs);
        navigator.clipboard.writeText(this.state.store.address)
            .then(() => {
                this.openmodalPhone(`로위 ${this.state.store.store} 주소가 복사되었습니다`)
            })
    }
    
    onClickShowMap = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_map_view'
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        return (
            <>
                {
                    this.state.store ?
                        <div style={{ margin: "0 12px" }}>
                            <div>
                                <div style={{marginBottom: "4px",lineHeight: "21px"}}><span className="store_address">{this.state.store.address}</span><span className="store_address_copy" onClick={this.clickAddress}>복사</span></div>
                                <div className="store_location">{this.state.store.location[0]} 거리</div>
                            </div>
                            <img className="store_map" onClick={this.clickAddress} src={process.env.PUBLIC_URL + this.state.store.map} alt={`로위 ${this.state.store.store} 지도`} />
                            <div style={{ width: "100%" }}>
                                <a href={this.state.store.mapurl} onClick={this.onClickShowMap}>
                                    <div style={{ lineHeight: "54px" }} className="store_box">지도 보기</div>
                                </a>
                            </div>
                        </div> : null
                }
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Store;