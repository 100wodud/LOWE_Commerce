import React from "react";
import { Route, Switch } from "react-router-dom";

export default (
        <Switch>
          <Route path="/" />
          <Route path='/signin' />
          <Route path='/signup' />
          <Route path='/mypage' />
          <Route path='/search' />
          <Route path='/board/:id' />
          <Route path='/like' />
          <Route path='/recently' />
          <Route path='/myreview/edit/:id' />
          <Route path='/review/write/:id' />
        </Switch>
    )





