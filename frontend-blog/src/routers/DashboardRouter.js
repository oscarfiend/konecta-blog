import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import BlogScreen from '../components/blog/BlogScreen'
import UsersScreen from '../components/blog/users/UsersScreen'
import Navbar from '../components/ui/Navbar'
import CategoriesScreen from '../components/blog/categories/CategoriesScreen'
import ArticlesScreen from '../components/blog/articles/ArticlesScreen'
import NewArticleScreen from '../components/blog/articles/NewArticleScreen'
import { useSelector } from 'react-redux'
import AdminRoutes from './AdminRoutes'
import Article from '../components/blog/articles/ArticleSelectedScreen'



const DashboardRoutes = () => {

    const role = useSelector(state => state.user.user?.role)
    return (
        <div>
            <Navbar/>
            <div>
                <Switch>
                    <Route exact path="/home" component={BlogScreen}/>  
                    <AdminRoutes role={role} exact path="/users" component={UsersScreen}/>   
                    <AdminRoutes role={role} exact path="/categories" component={CategoriesScreen}/> 
                    <AdminRoutes role={role} exact path="/new-article" component={NewArticleScreen}/>                    
                    <AdminRoutes role={role} exact path="/articles" component={ArticlesScreen}/>
                    <Route exact path="/articles/:slug" component={Article}/> 
                </Switch>
            </div>
        </div>
    )
}

export default DashboardRoutes
