import { Component } from "react";
import store from "../data/Store";
import "./Store.css"

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: "",
        };
    }

    componentDidMount = () => {
        this.props.data === '신촌점' ?
            this.setState({ store: store[0] }) :
            this.props.data === '홍대입구역점' ?
                this.setState({ store: store[2] }) :
                this.props.data === '합정점' ?
                    this.setState({ store: store[1] }) :
                    this.props.data === '강남점' ?
                        this.setState({ store: store[3] }) :
                        this.setState({ store: store[3] })

    }


    clickAddress = () => {
        navigator.clipboard.writeText(this.state.store.address)
        .then(() => {
            alert(`로위 ${this.state.store.store} 주소가 클립보드에 복사되었습니다`);
        })
    }

    render() {
        return (
             <>
                {
                    this.state.store ?
                    <div>
                        <img className="store_map" src={process.env.PUBLIC_URL + this.state.store.map} alt={`로위 ${this.state.store.store} 지도`} />
                        <div style={{width: "100%", justifyContent: "space-between",display: "flex"}}>
                            <div style={{lineHeight: "54px"}} className="store_box" onClick={this.clickAddress}>주소 복사</div>
                            <div style={{lineHeight: "54px"}} className="store_box"><a href={this.state.store.mapurl}>지도 보기</a></div>
                        </div>
                    </div> : null
                }
             </>
        )
    }
}

export default Store;