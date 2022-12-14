import { Component } from "react";
import "./Firstsec.css"
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TagManager from "react-gtm-module";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeSlide: 0
        };
    }

    componentDidMount = () => {
        axios.post("https://server.lowehair.kr/getAllBanner", {})
        .then((res)=>{
            let arr = [];
            if(res.data.length){
                for(let i =0; i < res.data.length; i++){
                    if(res.data[i].type === 1){
                        arr.push(res.data[i]);
                    }
                }
                this.setState({data: arr})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    onChangeNumber =(key) =>() => {
        this.setState({count: key})
    }

    onClickbanner = (e)=> async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_main_top_banner',
                title: e
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }


    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplaySpeed: 10000,
            pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            touchMove: true,
            draggable: true,
            beforeChange: (current, next) =>
              this.setState({ activeSlide: next })
        };
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let count = 0;
        return (
            <section className="Mainpage_first_section" id="Mainpage_first_section">
            <div className="Mainpage_first_number">{this.state.activeSlide+1}<span> / {this.state.data.length}</span></div>
                <Slider {...settings}>
                    {
                        this.state.data ?
                        this.state.data.map((e)=>{
                            count = count + 1;
                        return (
                            <a href={e.url+funnel}  key={e.id} className="banner_img" onClick={this.onClickbanner(e.title)}>
                                <img src={e.img} alt="?????? ??????" />
                            </a>
                        )}) :
                        <></>
                    }
                </Slider>
            </section>
        )
    }
}

export default Firstsec;