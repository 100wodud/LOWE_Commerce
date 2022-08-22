import axios from 'axios';
import { Component } from "react";
import Goodslist from './Goodslist';
import Filter from "./Filter";
import "./Secondsec.css";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Allgoods: [],
            Showgoods: [],
            promotion: "",
            category: 0,
            filter: false,
            status: "최신순",
            banner: '',
            number: 10,
            location: "전체",
            gender: 0,
            length: 0,
            modal: false
        };
    }

    componentDidMount = () => {
        this.setState({ Allgoods: [], Showgoods: [], category: 0, number: 0 });
        if (window.location.pathname.split('/')[2] === "tag") {
            if (window.location.pathname.split('/')[3] === "event") {

                axios.post("http://54.180.117.244:5000/getBoard", {
                    event_type: true, open: "1", isWish: true, isReview: true
                })
                    .then((res) => {
                        this.setState({ Allgoods: res.data, Showgoods: res.data, category: 0, number: 10 });
                    })
            } else {
                axios.post("http://54.180.117.244:5000/getBoard", {
                    category: window.location.pathname.split('/')[3], open: "1", isWish: true, isReview: true
                })
                    .then((res) => {
                        this.setState({ Allgoods: res.data, Showgoods: res.data, category: 0, number: 10 });
                    })

            }
        } else if (window.location.pathname.split('/')[2] === "store") {
            if (window.location.pathname.split('/')[3] === "all") {
                axios.post("http://54.180.117.244:5000/getBoard", {
                    open: "1", isWish: true, isReview: true
                })
                    .then((res) => {
                        this.setState({ Allgoods: res.data, Showgoods: res.data, category: 0, number: 10 });
                    })
            } else {
                axios.post("http://54.180.117.244:5000/getBoard", {
                    store: decodeURI(window.location.pathname.split('/')[3]), open: "1", isWish: true, isReview: true
                })
                    .then((res) => {
                        this.setState({ Allgoods: res.data, Showgoods: res.data, category: 0, number: 10 });
                    })
            }
        }

        axios.post("http://54.180.117.244:5000/getAllBanner", {})
            .then((res) => {
                if (res.data.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 4) {
                            this.setState({ banner: res.data[i] })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })

        window.addEventListener('scroll', this.onScroll);



    }

    onScroll = (e) => {
        // 스크롤 할때마다 state에 scroll한 만큼 scrollTop 값 증가하므로 이를 업데이트해줌, 
        //따라서 스크롤 시점에 따라 특정액션을 추후에 state를 활용하여 구현 가능
        var infinity_scroll = window.pageYOffset + document.getElementById("infinity_scroll").getBoundingClientRect().top;
        const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
        this.setState({ scroll: scrollTop, infinity_scroll: infinity_scroll });
        if (this.state.infinity_scroll > 1000 && this.state.infinity_scroll < this.state.scroll + 900) {
            this.setState({ number: this.state.number + 10 });
        }
    };

    onclickCategory = (e) => () => {
        console.log(e)
        this.setState({ category: e.id })
    }



    onClickFilter = () => {
        this.setState({ filter: true })
    }
    onClickclose = () => {
        this.setState({ filter: false })
    }

    onclickdataFilter = (e) => async () => {
        this.setState({ filter: false, status: e })
        let arr = this.state.Showgoods;
        if (arr.length) {
            if (e === "최신순") {
                arr.sort(await (function (a, b) {
                    if (a.id > b.id) {
                        return -1;
                    }
                    if (a.id < b.id) {
                        return 1;
                    }
                    return 0;
                }))
                this.setState({ Showgoods: arr, number: 10 })
            }
            if (e === "인기순") {
                arr.sort(await function (a, b) {
                    let alike = 0;
                    let blike = 0;
                    for (let i = 0; i < a.Wishes.length; i++) {
                        if (a.Wishes[i].heart === 1) {
                            alike = alike + 1;
                        }
                    }
                    for (let j = 0; j < b.Wishes.length; j++) {
                        if (b.Wishes[j].heart === 1) {
                            blike = blike + 1;
                        }
                    }
                    if (alike > blike) {
                        return -1;
                    }
                    if (alike < blike) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ Showgoods: arr, number: 10 })
            }

            if (e === "리뷰 많은 순") {
                arr.sort(await function (a, b) {
                    if (a.Reviews.length > b.Reviews.length) {
                        return -1;
                    }
                    if (a.id < b.id) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ Showgoods: arr, number: 10 })
            }
        }
    }


    onClickCloses = () => {
        this.setState({ modal: false })
    }

    onClickOpens = () => {
        this.setState({ modal: true })
    }

    onclicklength = (e) => () => {
        this.setState({ length: e })
    }
    onclickgender = (e) => () => {
        this.setState({ gender: e })
    }


    onclicklocation = (e) => () => {
        this.setState({ location: e })
    }

    onclickReset = () => {
        let data = this.state.Allgoods
        this.setState({
            Showgoods: data,
            modal: false,
            location: "전체",
            gender: 0,
            length: 0,
            status: "최신순",
            promotion: "",
            category: "",
        })
    }

    onclicksearching = () => {
        let data = this.state.Allgoods;
        let arr = [];
        let gender = this.state.gender;
        let length = this.state.length;
        let location = this.state.location;
        let promotion = this.state.promotion
        let category = this.state.category

        for (let i = 0; i < data.length; i++) {
            if (data[i].store.indexOf(location) !== -1 || this.state.location === "전체") {

                if (data[i].gender === Number(gender) - 1 || this.state.gender === Number(0)) {
                    if (data[i].length === Number(length) || this.state.length === Number(0)) {
                        if (data[i].category === category || this.state.category === 0) {
                            if (promotion) {
                                if (data[i].eventPrice) {
                                    arr.push(data[i])
                                }
                            } else {
                                arr.push(data[i])
                            }
                        }
                    }
                }
            }
        }
        this.setState({ Showgoods: arr, modal: false, status: "최신순" })
    }


    render() {
        return (
            <>
                <section className="Home_second_section">
                    <Filter
                        onClickFilter={this.onClickFilter}
                        onClickclose={this.onClickclose}
                        filter={this.state.filter}
                        status={this.state.status}
                        onclickdataFilter={this.onclickdataFilter}
                        onclickCategory={this.onclickCategory}
                        onClickCloses={this.onClickCloses}
                        onClickOpens={this.onClickOpens}
                        onclicklength={this.onclicklength}
                        onclickgender={this.onclickgender}
                        onclicklocation={this.onclicklocation}
                        length={this.state.length}
                        category={this.state.category}
                        gender={this.state.gender}
                        location={this.state.location}
                        onclickReset={this.onclickReset}
                        onclicksearching={this.onclicksearching}
                        modal={this.state.modal} />
                    <div className="goods_list">
                        {
                            this.state.Showgoods.length ?
                                this.state.Showgoods.slice(0, this.state.number).map((e, i) => (
                                    <>
                                        <div key={e.content}>
                                            <Goodslist e={e} />
                                        </div>
                                        {
                                            (i + 1) % 10 === 0 ?
                                                <a href={this.state.banner.url} className="middle_banner" >
                                                    <img src={this.state.banner.img} alt="띠 배너" />
                                                </a> : null
                                        }
                                    </>
                                )) :
                                <div style={{ height: "100px", textAlign: "center", lineHeight: "100px", width: "100%" }}>
                                    곧 새로운 스타일을 보여드릴게요 :)
                                </div>
                        }
                        <div onClick={this.check} id="infinity_scroll"></div>
                    </div>
                </section>
            </>
        )
    }
}

export default Secondsec;