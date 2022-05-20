import { Component } from "react";
import axios from "axios";
import "./Fourthsec.css"
import Recommand from "./Recommand";
import Store from "./Store";
import ScrollContainer from 'react-indiana-drag-scroll'

class Fourthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    componentDidMount = () => {
        axios.post("https://server.lowehair.kr/getBoardRelation", {
            category: this.props.data.board.category,
            gender: this.props.data.board.gender,
            length: this.props.data.board.length,
            store: this.props.data.board.store,
            open: this.props.data.board.open,
            limit: 10
        }).then((res) => {
            this.setState({ data: res.data })
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        return (
            <section className="Board_fourth_section" id="location">
                <div style={{ paddingTop: "120px" }}>
                    <div>
                        <div className="store_title">매장 위치</div>
                            <Store data={this.props.data.board.store} />
                    </div>
                    {this.state.data.length > 1 ?
                        <>
                            <div className="store_title" style={{marginTop: "60px"}}>추천시술</div>
                            
                                    <ScrollContainer className="recommand_scroll">
                                    {
                                        this.state.data.map((e => (
                                            <Recommand key={e.id} e={e} />
                                        )))

                                    }
                                    </ScrollContainer>
                            
                        </> : null
                    }
                </div>
            </section>
        )
    }
}

export default Fourthsec;