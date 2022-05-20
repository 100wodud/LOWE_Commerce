import { Component } from "react";
import axios from "axios";
import "./Mainpage.css"
import SHeader from "./SHeader";
import NonSearch from "./NonSearch";
import Footer from "../Nav/Footer";
import Goodslist from '../Home/Goodslist';
import FilterModal from "../Home/FilterModal";
import Recently from "./Reacently";
import ModalFilter from "../Home/ModalFilter";

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            result: false,
            data: "",
            name: [],
            filter: false,
            status: "인기순",
            recent: [],
            location: "전체",
            gender: 0,
            length: 0,
            modal: false,
            showdata: ""
        };
    }
    componentDidMount = () => {
        let recently = JSON.parse(window.localStorage.getItem("recentWord"));
        let set = new Set(recently);
        let recent = [...set];


        let funnel ="";
        if(window.location.href.split("?skeyword=")[1]){
            funnel=decodeURI(window.location.href.split("?skeyword=")[1].split('&')[0]);
            recent.unshift(funnel)
            set = new Set(recent);
            recent = [...set];
            document.getElementById("header_search").value=funnel


            axios.post("https://server.lowehair.kr/search", {
            keyword: funnel
        })
            .then((res) => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].open === '1') {
                        arr.push(res.data[i])
                    }
                }
                let userid = Number(window.localStorage.getItem("id"));
                if (userid) {
                    axios.post("https://server.lowehair.kr/click", {
                        type: 3,
                        UserId: userid,
                        funnel: "skeyword=" + decodeURI(window.location.href.split("?skeyword=")[1])
                    })
                } else {
                    axios.post("https://server.lowehair.kr/click", {
                        type: 3,
                        funnel: "skeyword=" + decodeURI(window.location.href.split("?skeyword=")[1])
                    })
                }
                window.localStorage.setItem("recentWord", JSON.stringify(recent));
                arr.sort( function (a, b) {
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
                this.setState({ data: arr, result: true, recent: recent, showdata: arr })
            })
            .catch(err => {
                console.log("에러")
            })
        }

        if (recent) {
            this.setState({ recent: recent });
        } else {
            this.setState({ recent: [] });
        }

    }


    deleteAllsearch = () => {
        window.localStorage.removeItem("recentWord");
        this.setState({recent: []});
    }

    deleteOnesearch = (i) => ()=> {
        let recent = this.state.recent;
        recent.splice(i, 1);
        this.setState({recent: recent});
        window.localStorage.setItem("recentWord", JSON.stringify(recent));
    }

    handleInputValue = (key) => (e) => {
        let allboard = JSON.parse(localStorage.getItem('allboard'))
        this.setState({ [key]: e.target.value, result: false });
        let arr = [];
        for(let i =0; i< allboard.length; i++){
            if(allboard[i].name.indexOf(e.target.value) !== -1){
                arr.push(allboard[i]);
            }
        }
        this.setState({name: arr})
    };

    handleInputSearch = () => {
        let keyword = this.state.search
        let recently = this.state.recent;
        let set = []
        let recent = []
        if(keyword){
            recently.unshift(keyword)
            set = new Set(recently);
            recent = [...set];
        }

        window.localStorage.setItem("recentWord", JSON.stringify(recent));
        setTimeout(() => {
            window.location.replace(`/search?skeyword=${keyword}`)
        }, 10);
    }

    handleRecentSearch = (keyword) => ()=>{
        let recently = this.state.recent;
        recently.unshift(keyword)
        let set = []
        let recent = []
        if(keyword){
            recently.unshift(keyword)
            set = new Set(recently);
            recent = [...set];
        }

        window.localStorage.setItem("recentWord", JSON.stringify(recent));
        setTimeout(() => {
            window.location.replace(`/search?skeyword=${keyword}`)
        }, 0);
    }

    onclickEnter = (e) => {
        if(e.key === 'Enter') {
            this.handleInputSearch();
        }
    }


    handleInputRecommand = (key) => (e) => {
        e.preventDefault();
        let keyword = key

        setTimeout(() => {
            window.location.replace(`/search?skeyword=${keyword}`)
        }, 0);
    }


    onClickFilter = () => {
        this.setState({ filter: true })
    }
    onClickclose = () => {
        this.setState({ filter: false })
    }

    onclickdataFilter = (e) => async () => {
        this.setState({ filter: false, status: e })
        let arr = this.state.showdata;
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
        this.setState({ showdata: arr })
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
        window.location.reload()
    }

    onclicksearching = () => {
        let data = this.state.data;
        let arr = [];
        let gender = this.state.gender;
        let length = this.state.length;
        let location = this.state.location;

        for (let i = 0; i < data.length; i++) {
            if (data[i].store.indexOf(location) !== -1 || this.state.location === "전체") {
                if (data[i].gender === Number(gender) - 1 || this.state.gender === Number(0)) {
                    if (data[i].length === Number(length) || this.state.length === Number(0)) {
                        arr.push(data[i])
                    }
                }
            }
        }
        this.setState({ showdata: arr, modal: false, status: "인기순" })
    }

    render() {
        var boxAll = document.querySelectorAll('.search_board_name');
        for (var i = 0; i < boxAll.length; i++) {
            var find = this.state.search;
            var regex = new RegExp(find, "g");
            boxAll[i].innerHTML = boxAll[i].innerText.replace(regex, "<span class='highlight'>" + find + "</span>");
        }
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <>
                <SHeader handleInputValue={this.handleInputValue} onclickEnter={this.onclickEnter} handleInputSearch={this.handleInputSearch} />
                {
                    this.state.result === false ?
                        <>
                            <Recently deleteAllsearch={this.deleteAllsearch} deleteOnesearch={this.deleteOnesearch} recent={this.state.recent} handleRecentSearch={this.handleRecentSearch} />
                            <NonSearch handleInputRecommand={this.handleInputRecommand} />
                        </> :
                        !this.state.data.length ?
                            <div className="no_search">
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
                                        <img onClick={this.onClickOpens} src={process.env.PUBLIC_URL + "/image/nav/filter.svg"} alt="로위 필터" />
                                    </div>
                                    <div onClick={this.onClickFilter}>
                                        <span>{this.state.status}</span>
                                        <img style={{ verticalAlign: "middle" }} src={process.env.PUBLIC_URL + "/image/nav/filter_updown.svg"} alt="로위 필터" />

                                    </div>
                                </div>
                                <div className="can_search">
                                    {
                                        this.state.showdata.length ?
                                            this.state.showdata.map((e) => (
                                                <Goodslist e={e} key={e.id} />
                                            ))
                                            :
                                            <div className="no_search">
                                                <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                                <div>
                                                    <div style={{ fontWeight: "700", fontSize: "18px" }}>검색 결과가 없습니다</div>
                                                    <div style={{ fontWeight: "500", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
                                                </div>
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
                                        <a href={"/board/" + e.id+ funnel} className="search_board_name" onClick={this.onclickRecently(e.id)} key={e.id}><pre>{e.name}</pre></a>
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
                {
                this.state.modal ?
                    <ModalFilter
                    close={this.onClickCloses} 
                    open={this.onClickOpens}
                    onclicklength={this.onclicklength} 
                    onclickgender={this.onclickgender}
                    onclicklocation={this.onclicklocation}
                    length={this.state.length} 
                    gender={this.state.gender} 
                    location={this.state.location} 
                    onclickReset={this.onclickReset}
                    onclicksearching={this.onclicksearching} />
                    : null
                }
                <Footer />
            </>
        )
    }
}

export default Mainpage;
