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
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel=window.location.href.split("?")[1];
        } else{
            funnel='/'
        }
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getBoardDetail", {
            id: id,
        }).then((res) => {
            this.setState({ data: res.data });
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/getDesignerDetail", {
                id: res.data.board.ManagerId,
            })
                .then((res) => {
                    this.setState({ designer: res.data });
                });

        }).catch((err) => {
            console.log(err)
        });

        if (!this.state.click) {
            this.setState({ click: true })
            if (userid) {
                axios.post("https://d205rw3p3b6ysa.cloudfront.net/click", {
                    type: 2,
                    BoardId: id,
                    UserId: userid,
                    funnel: funnel
                })
                    .then((res) => {
                    }).catch((err) => {
                    });
            } else {
                axios.post("https://d205rw3p3b6ysa.cloudfront.net/click", {
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
                <Header header="clear" />
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
                <Footer data={this.state.data} designer={this.state.designer} />
            </>
        )
    }
}

export default Board;
