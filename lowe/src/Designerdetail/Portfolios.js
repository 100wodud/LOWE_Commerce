import { Component } from "react";
import Portfolio from "./Portfolio";
import "./Portfolios.css"

class Portfolios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showdata: {

            }
        };
    }

    render() {
        return (
            <div>
                <div className="Portfolio_style_title">#Style Tag</div>
                {this.props.data.Hashtags.length ?
                    this.props.data.Hashtags.map((v, i) => (
                        <>
                            {
                                v.Manager_Hashtag.open ?
                                <Portfolio data={v} portfolio={this.props.data.Portfolios} designer={this.props.data.id} key={v.id} />:null
                            }
                        </>
                    )) : null
                }
            </div>
        )
    }
}

export default Portfolios;