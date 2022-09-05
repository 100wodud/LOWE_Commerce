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
        axios.post("https://server.lowehair.kr/getBoardDetail", {
            id: id,
        }).then((res) => {
            this.setState({ data: res.data });
            axios.post("https://server.lowehair.kr/getDesigner", {
                id: res.data.board.ManagerId, isHashtag: true, isFavorite: true
            }).then((res) => {
                this.setState({ designer: res.data[0] });
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
                <Header header="clear"  scroll={true}  />
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
