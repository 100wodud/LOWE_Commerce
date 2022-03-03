import React from "react";
import Id from "./Id";
import Pw from "./Pw";
import SignHeader from "../Sign/SignHeader";
import "./Find.css"
import Idresult from "./Idresult";
import Pwresult from "./Pwresult";

class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 1,
            data: "",
            result: "",
        };
    }
    onclickList = (e) => () => {
        this.setState({ list: e })
    }

    onchangeId = (data) => (e) => {
        this.setState({ result: "id", data: e })
    }

    onclickListPw = (data) => (e) => {
        this.setState({ list: 2, result: "" })
    }
    onchangePw = (data) => (e) => {
        this.setState({ result: "pw", data: e })
    }

    render() {
        return (
            <>
                {this.state.result === "" ?
                    <>
                        <SignHeader header={(this.state.list === 1 ? "아이디 찾기" : '비밀번호 찾기')} />
                        <section className="Find_section">
                            <div className="Find-filter">
                                <p className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>아이디 찾기</p>
                                <p className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>비밀번호 찾기</p>
                            </div>
                            {
                                this.state.list === 1 ?
                                    <Id onchangeId={this.onchangeId()} /> :
                                    <Pw onchangePw={this.onchangePw()} data={this.state.data} />
                            }
                        </section>
                    </> :
                    this.state.result === "id" ?
                        <>
                            <SignHeader header="아이디 찾기 결과" />
                            <Idresult data={this.state.data} onclickListPw={this.onclickListPw()} />
                        </> :
                        this.state.result === "pw" ?
                            <>
                                <SignHeader header="비밀번호 재설정" />
                                <Pwresult data={this.state.data} />
                            </> : null
                }
            </>
        );
    }
}

export default Find;