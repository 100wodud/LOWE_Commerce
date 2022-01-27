import { Component } from "react";
import "./Mainimg.css"

class Mainimg extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className="Mainimg_main">{this.props.data[0].main}</div>
                <div className="Mainimg_sub">{this.props.data[0].sub}</div>
                {
                    this.props.data[0].Urls.map((e) => (
                        <img key={e.id} className="Mainimg_img" src={e.url} alt="메인이미지" />
                    ))
                }
                {
                    this.props.sub.map((e) => (
                        <div key={e.id}>
                            <div className="Mainimg_sub" style={{ fontWeight: "700", marginTop: "100px" }}>{e.main}</div>
                            {
                                e.Urls.map((v) => (
                                    <img key={v.id} className="Mainimg_img" src={v.url} alt="서브이미지" />
                                ))
                            }
                        </div>

                    ))
                }
            </>
        )
    }
}

export default Mainimg;