import { Component } from "react";
import "./Firstsec.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            activeSlide: 0
        };
    }

    componentDidMount = () => {
        this.setState({ data: this.props.data })
    }

    onChangeNumber = (key) => () => {
        this.setState({ count: key })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            touchMove: true,
            draggable: true,
            beforeChange: (current, next) =>
                this.setState({ activeSlide: next })
        };
        let count = 0;
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <section className="Ddesigner_first_section">
                {
                    this.state.data ?
                        <>
                            <Slider {...settings}>
                                {
                                    this.state.data.private.map((e) => {
                                        count = count + 1;
                                        return (
                                            <div className="Ddesigner_first_img_div"  key={e.id}>
                                                <a href={e.url+funnel} className="Ddesigner_first_img" onChange={this.onChangeNumber(count)}>
                                                    <img src={process.env.PUBLIC_URL + e.img} alt="로위 배너" />
                                                    <div className="Ddesigner_first_img_text" id="header_trigger2"><pre>{e.content ? e.content : null}</pre></div>
                                                </a>
                                            </div>)
                                    })
                                }
                            </Slider>
                            <div className="Ddesigner_first_number">{this.state.activeSlide + 1}<span> / {this.state.data.private.length}</span></div>

                        </> :
                        null
                }
            </section>
        )
    }
}

export default Firstsec;