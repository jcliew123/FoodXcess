import React, { useEffect, useState } from 'react'
import {render} from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home'
import Sidebar from './Sidebar/Sidebar';
import FoodListingList from './FoodListing/FoodListingList';
import CreateFoodListing from './FoodListing/CreateFoodListing';
import FoodListing from './FoodListing/FoodListing';
import SearchPage from './Search/SearchPage';
import SearchResult from './Search/SearchResult';
import Inventory from './Inventory/Inventory'
import SignIn from './Account/SignIn';
import SignUp from './Account/SignUp';
import SignInRequired from './Account/SignInRequired';
import OwnFoodListing from './FoodListing/OwnFoodListing';
import SavedFoodListing from './FoodListing/SavedFoodListing';
import AISearch from './Search/AISearch';
import SearchConfirmation from './Search/SearchConfirmation';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const checkLoggedIn = () => {
        const userToken = localStorage.getItem('username')
        if(userToken !== null){
            setUser(userToken);
        }
    }

    useEffect(checkLoggedIn, [])

    const handleLogOut = () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch("/accounts/sign-out/", {method: 'POST', headers:{"X-CSRFToken": csrftoken}}).then(response => {
            if(response.ok){
                localStorage.removeItem("username");
                alert("Signed out successfully");
                window.location.reload(false);
            }else{
                return response.json();
            }
        }).then(data => console.log(data))
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
            <Router>
                <Sidebar isOpen={isOpen} toggle={toggle}/>
                <Navbar toggle={toggle} user={user} handleLogOut={handleLogOut}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/allfoodlist" render={()=><FoodListingList user={user}/>} />
                    <Route path="/foodlist/:code" component={FoodListing} />
                    <Route path="/create-foodlist" render={() => <CreateFoodListing mode="create"/>} />
                    <Route path="/edit-foodlist/:code" render={() => <CreateFoodListing mode="edit"/>} />
                    <Route path="/search" exact component={SearchPage} />
                    <Route path="/search/:query" component={SearchResult}/>
                    <Route path="/inventory" render={()=>(user?<Inventory/>:<SignInRequired/>)} />
                    <Route path="/sign-in" render={()=>(user?<Redirect to="/"/>:<SignIn/>)}/>
                    <Route path="/sign-up" render={()=>(user?<Redirect to="/"/>:<SignUp/>)}/>
                    <Route path="/own-foodlist" component={OwnFoodListing} />
                    <Route path="/saved-foodlist" exact component={SavedFoodListing} />
                    <Route path="/aisearch" component={AISearch} />
                    <Route path="/search-confirmation" component={SearchConfirmation} />
                </Switch>
            </Router>
        </>
        
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)

export default App