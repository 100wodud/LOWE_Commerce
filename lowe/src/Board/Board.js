import { Component } from "react";
import Footer from "./BFooter";
import Header from "../Nav/Header";
import axios from "axios";
import Firstsec from "./Firstsec";
import Secondsec from "./Secondsec";
import Thirdsec from "./Thirdsec";
import Filter from "./Filter";
import Fourthsec from "./Fourthsec";
import Fifthsec from "./Fifthsec";
import BFooter2 from "./BFooter2";
import TagManager from "react-gtm-module";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            store: null,
            designer: null,
            click: false,
        };
    }

    componentDidMount = (e) => {
        let id = window.location.pathname.split("/")[2];
        let userid = Number(window.localStorage.getItem("id"));
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = '/'
        }

        axios.post("https://server.lowehair.kr/getBoard", {
            id: id, isReview: true, isDesigner: true, isImage: true, isHashtag: true, isReviewImage: true
        }).then((res) => {
            this.setState({ data: {board: res.data[0]} });
            axios.post("https://server.lowehair.kr/getDesigner", {
                id: res.data[0].ManagerId, isHashtag: true, isFavorite: true
            }).then((res) => {
                this.setState({ designer: res.data[0] });
                let cat ='';
                if(this.state.data.board.category ===1){
                    cat = "컷";
                } else if(this.state.data.board.category ===2){
                    cat = "펌"
                } else if(this.state.data.board.category ===3){
                    cat = "염색"
                } else if(this.state.data.board.category ===5){
                    cat = "클리닉"
                }
                let disc = 0;
                if(this.state.data.board.listPrice > 0){
                    disc = this.state.data.board.listPrice - this.state.data.board.price
                }
                const tagManagerArgs = {
                    dataLayer: {
                        event: 'view_item',
                        items: [
                            {
                              item_id: this.state.data.board.id,
                              item_name: this.state.data.board.name,
                              price: this.state.data.board.price,
                              discount: disc,
                              item_brand: this.state.data.board.Manager.store+"점",
                              item_variant: this.state.data.board.designer_name,
                              item_category: cat
                            }
                        ]
                    },
                };
                TagManager.dataLayer(tagManagerArgs);
            });

        }).catch((err) => {
            console.log(err)
        });

        if (!this.state.click) {
            this.setState({ click: true })
            if (userid) {
                axios.post("https://server.lowehair.kr/click", {
                    type: 2,
                    BoardId: id,
                    UserId: userid,
                    funnel: funnel
                })
                    .then((res) => {
                    }).catch((err) => {
                    });
            } else {
                axios.post("https://server.lowehair.kr/click", {
                    type: 2,
                    BoardId: id,
                    funnel: funnel
                })
                    .then((res) => {
                    }).catch((err) => {
                    });
            }
        }

    }

    render() {
        return (
            <>
                <Header header="clear"  scroll={true} event="item" />
                {this.state.data && this.state.designer && this.state.data.board.open === "1" ?
                    <>
                        <Firstsec data={this.state.data} />
                        <Secondsec data={this.state.data} designer={this.state.designer} />
                        <Filter data={this.state.data} />
                        <Thirdsec data={this.state.data} />
                        <Fourthsec data={this.state.data} />
                        <Fifthsec data={this.state.data} />
                    </>
                    : <div style={{ height: "100vh", textAlign: "center", lineHeight: "100vh" }}>
                        잠시만 기다려 주세요 :)
                    </div>
                }
                <BFooter2 />
                <Footer data={this.state.data} designer={this.state.designer} />
            </>
        )
    }
}

export default Board;
