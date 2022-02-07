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
        let  img= [];
        if(this.props.data){
            let images = this.props.data.board.Images
            for(let i=0; i < images.length; i++){
                if(images[i].imgType === 0){
                    for(let j=0; j < images[i].Urls.length; j++){
                        img.push(images[i].Urls[j].url)
                    }
                }
            }
        }
        this.setState({data: img})
    }

    onChangeNumber =(key) =>() => {
        this.setState({count: key})
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
        return (
            <section className="Board_first_section">
                <Slider {...settings}>
                    {
                        this.state.data ?
                        this.state.data.map((e)=>{
                            count = count + 1;
                        return (<div key={e} className="Board_first_img" onChange={this.onChangeNumber(count)}>
                                <img src={e} alt="로위 배너" />
                            </div>)
                         }) :
                        <></>
                    }
                </Slider>
                        <div className="Board_first_number">{this.state.activeSlide+1}<span> / {this.state.data.length}</span></div>
            </section>
        )
    }
}

export default Firstsec;