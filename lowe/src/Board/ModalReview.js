import React from "react";
import "./ModalReview.css";
import Slider from "react-slick";
import ModalContent from "./ModalContent";
import Header from "../Sign/SignHeader";
import axios from "axios";
import TagManager from "react-gtm-module";

class ModalReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            slider: 1
        };
    }

    componentDidMount = () => {
        let goto = this.slider.slickGoTo
        goto(this.props.slider)
        this.setState({ slider: this.props.slider })
    }

    handleClose = () => {
        this.props.close();
    }
    gotoFront = () => {
        setTimeout(() => {
            if (this.props.data.length > this.state.slider) {
                axios.post("https://server.lowehair.kr/getOneUser", {
                    id: this.props.data[this.state.slider + 1].UserId,
                })
                    .then((res) => {
                        let name = ''
                        if (res.data[0].login_id) {
                            name = res.data[0].login_id
                        } else {
                            name = res.data[0].name
                        }
                        const tagManagerArgs = {
                            dataLayer: {
                                event: 'view_photo_review',
                                name: name,
                                item_id: this.props.data[this.state.slider + 1].BoardId,
                                item_name: this.props.data[this.state.slider + 1].goods
                            },
                        };
                        TagManager.dataLayer(tagManagerArgs);
                    })
                    .catch(err => {
                        console.log("에러")
                    })
                this.setState({ slider: this.state.slider + 1 })
            }
        }, 500);
        this.slider.slickNext()
    }

    gotoBack = () => {
        setTimeout(() => {
            if (this.state.slider > 0) {
                axios.post("https://server.lowehair.kr/getOneUser", {
                    id: this.props.data[this.state.slider - 1].UserId,
                })
                    .then((res) => {
                        let name = ''
                        if (res.data[0].login_id) {
                            name = res.data[0].login_id
                        } else {
                            name = res.data[0].name
                        }
                        const tagManagerArgs = {
                            dataLayer: {
                                event: 'view_photo_review',
                                name: name,
                                item_id: this.props.data[this.state.slider - 1].BoardId,
                                item_name: this.props.data[this.state.slider - 1].goods
                            },
                        };
                        TagManager.dataLayer(tagManagerArgs);
                    })
                    .catch(err => {
                        console.log("에러")
                    })
                this.setState({ slider: this.state.slider - 1 })
            }
        }, 500);
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
                    <img className="gotoback" onClick={this.gotoBack} src={`${process.env.PUBLIC_URL}/image/nav/arrow_back.svg`} alt="뒤로" />
                    <div style={{ marginTop: "85px" }}>
                        <Slider {...setting} ref={slider => (this.slider = slider)}>
                            {
                                this.props.data.map((e, i) => (
                                    <ModalContent key={e.id} data={e} i={i} slider={this.props.slider} mainpage={this.props.mainpage} />
                                ))
                            }
                        </Slider>
                        <img className="gotofront" onClick={this.gotoFront} src={`${process.env.PUBLIC_URL}/image/nav/arrow_front.svg`} alt="앞으로" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalReview;

