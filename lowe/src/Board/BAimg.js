import { Component } from "react";
import "./BAimg.css"

class BAimg extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.data)
        return (
            <>
                <div className="BAimg_div">
                    <img className="BAimg_img" src={this.props.data.beforeimg} alt="메인이미지" />
                    <img className="BAimg_img" src={this.props.data.afterimg} alt="메인이미지" />
                </div>
                <div className="BAimg_main">{this.props.data.main}</div>
            </>
        )
    }
}

export default BAimg;