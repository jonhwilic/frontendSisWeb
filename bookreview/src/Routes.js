import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ReviewPage from './pages/ReviewPage'
import AddCategoryPage from './pages/AddCategoryPage'
import CategoryPage from './pages/CategoryPage'
import AddReviewPage from './pages/AddReviewPage'

const Routes = () => {
  return (
    <Switch>
      <Route path='/home'>
        <Layout>
          <HomePage />
        </Layout>
      </Route>
      <Route path='/categories'>
        <Layout>
          <CategoryPage />
        </Layout>
      </Route>
      <Route path='/addReview'>
        <Layout>
          <AddReviewPage />
        </Layout>
      </Route>
      <Route path='/review'>
        <Layout>
          <ReviewPage />
        </Layout>
      </Route>
      <Route path='/addCategory'>
        <Layout>
          <AddCategoryPage />
        </Layout>
      </Route>
      <Route exact path='/'>
        <LoginPage />
      </Route>
    </Switch>
  )
}

export default Routes
