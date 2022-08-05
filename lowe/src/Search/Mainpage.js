import { Component } from "react";
import axios from "axios";
import "./Mainpage.css"
import SHeader from "./SHeader";
import NonSearch from "./NonSearch";
import Goodslist from '../Home/Goodslist';
import FilterModal from "../Home/FilterModal";
import Recently from "./Reacently";
import ModalFilter from "../Home/ModalFilter";
import ScrollContainer from 'react-indiana-drag-scroll'
import SearchDesigner from "./SearchDesigner";

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
            showdata: "",
            favorite: [],
        };
    }
    componentDidMount = () => {
        let recently = JSON.parse(window.localStorage.getItem("recentWord"));
        let set = new Set(recently);
        let recent = [...set];
        axios.post("http://54.180.117.244:5000/getBoard", {
            order: "payment", isPayment: true
        }).then((res) => {
            this.setState({ favorite: res.data.slice(0, 8) })
        })

        let funnel = "";
        if (window.location.href.split("?skeyword=")[1]) {
            funnel = decodeURI(window.location.href.split("?skeyword=")[1].split('&')[0]);
            recent.unshift(funnel)
            set = new Set(recent);
            recent = [...set];
            document.getElementById("header_search").value = funnel


            axios.post(`http://54.180.117.244:5000/getSearch`, {
                keyword: decodeURI(window.location.href.split("?skeyword=")[1]),
                isBoard: true,
                isDesigner: true,
                isHashtag: true
            })
                .then((res) => {
                    let arr = [];
                    for (let i = 0; i < res.data.boards.length; i++) {
                        if (res.data.boards[i].open === '1') {
                            arr.push(res.data.boards[i])
                        }
                    }
                    let userid = Number(window.localStorage.getItem("id"));
                    if (userid) {
                        axios.post("http://54.180.117.244:5000/click", {
                            type: 3,
                            UserId: userid,
                            funnel: "skeyword=" + decodeURI(window.location.href.split("?skeyword=")[1])
                        })
                    } else {
                        axios.post("http://54.180.117.244:5000/click", {
                            type: 3,
                            funnel: "skeyword=" + decodeURI(window.location.href.split("?skeyword=")[1])
                        })
                    }
                    window.localStorage.setItem("recentWord", JSON.stringify(recent));
                    arr.sort(function (a, b) {
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
        this.setState({ recent: [] });
    }

    deleteOnesearch = (i) => () => {
        let recent = this.state.recent;
        recent.splice(i, 1);
        this.setState({ recent: recent });
        window.localStorage.setItem("recentWord", JSON.stringify(recent));
    }

    handleInputValue = (key) => async (e) => {
        this.setState({ [key]: e.target.value, result: false });
        await axios.get(`http://54.180.117.244:5000/search?keyword=${e.target.value}&isDesigner=true&isHashtag=true`, {
        }).then((res) => {
            this.setState({ name: res.data })
        })
        var boxAll = document.querySelectorAll('.search_board_name');
        for (var i = 0; i < boxAll.length; i++) {
            var find = this.state.search;
            var regex = new RegExp(find, "g");
            boxAll[i].innerHTML = boxAll[i].innerText.replace(regex, "<span class='highlight'>" + find + "</span>");
        }
    };

    handleInputSearch = () => {
        let keyword = this.state.search
        let recently = this.state.recent;
        let set = []
        let recent = []
        if (keyword) {
            recently.unshift(keyword)
            set = new Set(recently);
            recent = [...set];
        }

        window.localStorage.setItem("recentWord", JSON.stringify(recent));
        setTimeout(() => {
            window.location.href = `/search?skeyword=${keyword}`
        }, 10);
    }

    handleRecentSearch = (keyword) => () => {
        let recently = this.state.recent;
        recently.unshift(keyword)
        let set = []
        let recent = []
        if (keyword) {
            recently.unshift(keyword)
            set = new Set(recently);
            recent = [...set];
        }

        window.localStorage.setItem("recentWord", JSON.stringify(recent));
        setTimeout(() => {
            window.location.href =`/search?skeyword=${keyword}`
        }, 0);
    }

    onclickEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleInputSearch();
        }
    }


    handleInputRecommand = (key) => (e) => {
        e.preventDefault();
        let keyword = key

        setTimeout(() => {
            window.location.href =`/search?skeyword=${keyword}`
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
        let store = ["신촌점", "합정점", "홍대입구역점", "강남점", "L7홍대점"]
        return (
            <>
                <SHeader handleInputValue={this.handleInputValue} onclickEnter={this.onclickEnter} handleInputSearch={this.handleInputSearch} />
                {
                    this.state.result === false && !this.state.search.length ?
                        <>
                            <Recently deleteAllsearch={this.deleteAllsearch} deleteOnesearch={this.deleteOnesearch} recent={this.state.recent} handleRecentSearch={this.handleRecentSearch} />                            <div>
                                <div>
                                    <div className="recentSearch_text_div">
                                        <div className="recentSearch_title">지점별 시술을 검색해보세요</div>
                                    </div>
                                    <div className="Search_main_store">
                                        {
                                            store.map((e) => (
                                                <span onClick={this.handleRecentSearch(e.slice(0, e.length - 1))}>{e}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="recentSearch_text_div">
                                        <div className="recentSearch_title">최근 가장 인기 많은 시술이에요</div>
                                    </div>
                                    <div className="Recent_total_list" id="special_recent_list" style={{marginBottom: "8px"}}>
                                        <ScrollContainer className="Recent_total_slide" style={{ marginTop: "16px", height: "280px" }} >
                                            {
                                                this.state.favorite.map((e) => (
                                                    e.open === "1" ?
                                                        <Goodslist e={e} key={e.id} /> : null
                                                ))
                                            }
                                        </ScrollContainer>
                                    </div>
                                </div>
                            </div>
                            <NonSearch handleInputRecommand={this.handleInputRecommand} />
                        </> :
                        !this.state.data.length ?
                            <>
                                <div className="no_search_board">
                                    <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                    <div>
                                        <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>검색 결과가 없습니다</div>
                                        <div style={{ fontWeight: "400", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="no_search_recommand">추천 시술</div>
                                    <div className="goods_list">
                                        {
                                            this.state.favorite.map((e) => (
                                                e.open === "1" ?
                                                    <Goodslist e={e} key={e.id} /> : null
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
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
                                            <div>
                                                {
                                                    this.state.showdata.map((e) => (
                                                        <Goodslist e={e} key={e.id} />
                                                    ))
                                                }
                                            </div>
                                            :
                                            <div className="no_search_board">
                                                <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                                <div>
                                                    <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>검색 결과가 없습니다</div>
                                                    <div style={{ fontWeight: "400", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
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
                                this.state.name.designers && this.state.name.designers.length ?
                                    <div>
                                        <div className="Search_recommand">추천 디자이너</div>
                                        {
                                            this.state.name.designers.slice(0, 3).map((e) => (
                                                <SearchDesigner data={e} />
                                            ))}
                                    </div> :
                                    <div>

                                    </div>
                            }
                            {
                                this.state.name.hashtags && this.state.name.hashtags.length ?
                                    <div>
                                        <div className="Search_recommand">추천 검색어</div>
                                        {
                                            this.state.name.hashtags.slice(0, 10).map((e) => (
                                                <div className="search_board_name_div">
                                                    <img src={process.env.PUBLIC_URL + "/image/nav/search_recommand_icon.svg"} alt="검색결과 없음" />
                                                    <a href={"/search?skeyword=" + e.content} className="search_board_name" onClick={this.onclickRecently(e.content)} key={e.content} >
                                                        <pre>{e.content}</pre>
                                                    </a>
                                                </div>
                                            ))}
                                    </div> :

                                    <div className="no_search">
                                        <img src={process.env.PUBLIC_URL + "/image/nav/search_non.svg"} alt="검색결과 없음" />
                                        <div>
                                            <div style={{ fontWeight: "700", fontSize: "16px" }}>검색 결과가 없습니다</div>
                                            <div style={{ fontWeight: "400", fontSize: "16px" }}>다른 검색어로 검색해보세요</div>
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
            </>
        )
    }
}

export default Mainpage;
