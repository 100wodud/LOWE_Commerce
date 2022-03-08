import { Component } from "react";
import { Route, Switch, withRouter} from "react-router-dom";
import Home from "./Home/Home";
import Signup from "./Sign/Signup";
import Signin from "./Sign/Signin";
import Mypage from "./Mypage/Mypage";
import Search from "./Search/Mainpage"
import Board from "./Board/Board";
import Like from "./Like/Like";
import Recent from "./Recent/Recent";
import Review from "./Review/Review";
import Find from "./Find/Find";
import Withdrawal from "./Sign/Withdrawal";
import EditmyInfo from "./Sign/EditmyInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    return (
      <>
        <span id="header_trigger"></span>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/search' component={Search} />
          <Route path='/board/:id' component={Board} />
          <Route path='/like' component={Like} />
          <Route path='/withdrawal' component={Withdrawal} />
          <Route path='/findmyid' component={Find} />
          <Route path='/recently' component={Recent} />
          <Route path='/editmyinfo' component={EditmyInfo} />
          <Route path='/myreview/edit/:id' component={Review} />
          <Route path='/review/write/:id' component={Review} />
        </Switch>
      </>
    )
  }
}

export default withRouter(App);





