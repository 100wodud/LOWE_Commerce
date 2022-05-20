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
                    this.props.data.Hashtags.map((e, i) => (
                        <>
                            {
                                e.Manager_Hashtag.open ?
                                    <Portfolio data={e} portfolio={this.props.data.Portfolios} key={i} /> : null
                            }
                        </>
                    )) : null
                }
            </div>
        )
    }
}

export default Portfolios;