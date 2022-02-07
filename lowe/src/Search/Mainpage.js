import { Component } from "react";
import axios from "axios";
import "./Mainpage.css"
import SHeader from "./SHeader";
import NonSearch from "./NonSearch";
import Footer from "../Nav/Footer";
import Goodslist from '../Home/Goodslist';
import FilterModal from "../Home/FilterModal";

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            result: false,
            data: "",
            name: [],
            filter: false,
            status: "최신순"
        };
    }


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value, result: false });
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/search", {
            keyword: e.target.value
        })
            .then((res) => {
                let arr =[];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].open === '1'){
                        arr.push(res.data[i])
                    }
                }
                this.setState({ name: arr })
            })
            .catch(err => {
                console.log("에러")
            })
    };

    handleInputSearch = () => {
        let keyword = this.state.search
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/search", {
            keyword: keyword
        })
            .then((res) => {
                let arr =[];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].open === '1'){
                        arr.push(res.data[i])
                    }
                }
                this.setState({ data: arr, result: true })
            })
            .catch(err => {
                console.log("에러")
            })
    }


    handleInputRecommand = (key) => () => {
        let keyword = key
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/search", {
            keyword: keyword
        })
            .then((res) => {
                let arr =[];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].open === '1'){
                        arr.push(res.data[i])
                    }
                }
                this.setState({ data: arr, result: true })
            })
            .catch(err => {
                console.log("에러")
            })
    }


    onClickFilter = () => {
        this.setState({ filter: true })
    }
    onClickclose = () => {
        this.setState({ filter: false })
    }

    onclickdataFilter = (e) => async () => {
        this.setState({ filter: false, status: e })
        let arr = this.state.data;
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
            }
        }
        this.setState({ data: arr })
    }


    onclickRecently = (e) => async () => {
        var recently = JSON.parse(localStorage.getItem("recent"));
        if (recently == null) recently = [];
        var id = e;
        let index = recently.indexOf(id)
        localStorage.setItem("entry", JSON.stringify(id));
        if (index === -1) {
            recently.unshift(id);
        } else {
            recently.splice(index, 1);
            recently.unshift(id);
        }
        localStorage.setItem("recent", JSON.stringify(recently));
    }

    render() {
        return (
            <>
                <SHeader handleInputValue={this.handleInputValue} handleInputSearch={this.handleInputSearch} />
                {
                    this.state.result === false ?
                        <NonSearch handleInputRecommand={this.handleInputRecommand} /> :
                        !this.state.data.length ?
                            <div className="cannot_search">
                                <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                <div>
                                    <div style={{ fontWeight: "700", fontSize: "18px" }}>검색 결과가 없습니다</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="search_filter_recent">
                                    <div>
                                        <img src={process.env.PUBLIC_URL + "/image/nav/filter.svg"} alt="로위 필터" />
                                    </div>
                                    <div onClick={this.onClickFilter}>
                                        <span>{this.state.status}</span>
                                        <img style={{ verticalAlign: "middle" }} src={process.env.PUBLIC_URL + "/image/nav/filter_updown.svg"} alt="로위 필터" />

                                    </div>
                                </div>
                                <div className="can_search">
                                    {
                                        this.state.data.length ?
                                            this.state.data.map((e) => (
                                                <Goodslist e={e} key={e.id} />
                                            ))
                                            :
                                            <div>
                                                결과가없습니다
                                            </div>
                                    }
                                </div>
                            </>
                }
                {
                    this.state.search.length && this.state.result === false ?
                        <div className="search_name">
                            {
                                this.state.name.length ?
                                    this.state.name.map((e) => (
                                        <a href={"/board/" + e.id} className="search_board_name" onClick={this.onclickRecently(e.id)} key={e.id}>{e.name}</a>
                                    )) :

                                    <div className="no_search">
                                        <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                        <div>
                                            <div style={{ fontWeight: "700", fontSize: "18px" }}>검색 결과가 없습니다</div>
                                            <div style={{ fontWeight: "500", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
                                        </div>
                                    </div>
                            }
                        </div> : null
                }

                {
                    this.state.filter ?
                        <FilterModal status={this.state.status} close={this.onClickclose} onclickdataFilter={this.onclickdataFilter} /> : null
                }
                <Footer />
            </>
        )
    }
}

export default Mainpage;
