import React from "react";
import "./ModalReview.css";
import Slider from "react-slick";
import ModalContent from "./ModalContent";
import Header from "../Sign/SignHeader";

class ModalReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    componentDidMount = () =>{

    let goto = this.slider.slickGoTo
    goto(this.props.slider)
    }

    handleClose = () => {
        this.props.close();
    }
    gotoFront = () => {
        this.slider.slickNext()

    }

    gotoBack = () => {
      this.slider.slickPrev()

    }

    render() {
        var setting = {
            dots: false,
            infinite: false,
            autoplaySpeed: 10000,
            pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            Arrows: true,
            touchMove: false,
            draggable: false,
        };
        return (
            <div className="modalBody" >
                <div className="modalclick" onClick={this.handleClose}></div>
                <div className="modalInner" >
                    <Header header="포토리뷰" close={this.handleClose} />
                    <img className="gotoback" onClick={this.gotoBack} src={`${process.env.PUBLIC_URL}/image/nav/arrow_back.svg`} alt="뒤로"/>
                    <div style={{marginTop: "85px"}}>
                            <Slider {...setting} ref={slider => (this.slider = slider)}>
                                {
                                    this.props.data.map((e, i) => (
                                        <ModalContent key={e.id} data={e} mainpage={this.props.mainpage}  />
                                    ))
                                }
                            </Slider>
                    <img className="gotofront" onClick={this.gotoFront} src={`${process.env.PUBLIC_URL}/image/nav/arrow_front.svg`} alt="앞으로"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalReview;

