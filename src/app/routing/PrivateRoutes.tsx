import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {BlogNews} from '../pages/Blog-news'
import {EducationalContent} from '../pages/EducationalContent'
import {ContentDetail} from '../pages/ContentDetail'
import {AllCoins} from '../pages/AllCoins'
import {PromotedCoinsList} from '../pages/PromotedCoinsList'
import {CoinDetails} from '../pages/CoinDetails'
import {Contact} from '../pages/Contact'
import {TermsConditions} from '../pages/TermsConditions'
import {Giveaway} from '../pages/Giveaway'
import {Roadmap} from '../pages/Roadmap'

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Route path='/blog-news' component={BlogNews} />
        <Route path='/giveaway' component={Giveaway} />
        <Route path='/contact' component={Contact} />
        <Route path='/roadmap' component={Roadmap} />
        <Route path='/terms-conditions' component={TermsConditions} />
        <Route path='/educational-content' component={EducationalContent} />
        <Route path='/details/:id' component={ContentDetail} />
        <Route path='/all-coins' component={AllCoins} />
        <Route path='/coin-details/:id' component={CoinDetails} />
        <Route path='/promoted-coins' component={PromotedCoinsList} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
