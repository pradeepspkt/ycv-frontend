import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {AuthPage} from '../modules/auth'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'

export function PublicRoutes() {
  return (
    <Switch>
      <Route path='/dashboard' component={DashboardWrapper} />
      <Route path='/auth' component={AuthPage} />
      <Redirect to='/auth' />
    </Switch>
  )
}
