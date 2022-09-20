import { Component } from "react";
// import "./Secondsec.css";
import axios from 'axios';
import Goodslist from "../Home/Goodslist";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        let arr = [];
        let board = [23,26,62,51,53,69,70,80,78,11]

        for(let i=0; i < board.length; i++){
            axios.post("https://server.lowehair.kr/getBoardDetail", {
                id: board[i],
            })
                .then((res) => {
                    arr.push(res.data.board)
                    this.setState({data: arr})
                });
        }
    }

    render() {
        return (
            <section style={{marginTop: "40px"}}>
               <div className="goods_list">
                    {
                        this.state.data.length ?
                            this.state.data.slice(0, this.state.number).map((e, i) => (
                                <>
                                    <div key={e.id}>
                                        <Goodslist e={e} i={i}/>
                                    </div>
                                </>
                            )) :
                            <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%" }}>
                                곧 새로운 스타일을 보여드릴게요 :)
                            </div>
                    }
                </div>
            </section>
        )
    }
}

export default Secondsec;