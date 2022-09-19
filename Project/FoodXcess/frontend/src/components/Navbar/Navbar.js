import React from 'react'
import { Logo, Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { FaRegUser, FaRegBookmark } from 'react-icons/fa';

const Navbar = ({toggle, user, handleLogOut}) => {
    const history = useHistory()

    const renderSignInUp = <>
        <NavBtnLink href="/sign-in/">Sign In</NavBtnLink>
        <NavBtnLink href="/sign-up/">Sign Up</NavBtnLink>
    </>

    const renderSignOut = <>
        <IconButton onClick={() => history.push("/own-foodlist")} style={{color: '#e6c7cf', marginRight: 5}}>
            <FaRegUser />
        </IconButton>
        <IconButton onClick={() => history.push("/saved-foodlist")} style={{color: '#e6c7cf', marginRight: 5}}>
            <FaRegBookmark />
        </IconButton>
        <NavBtnLink onClick={handleLogOut}>Sign Out</NavBtnLink>
    </>

    return (
        <Router>
            <Nav>
                <Logo href="/">
                    <h1>FoodXcess</h1>
                </Logo>
                <Bars onClick={toggle}/>
                <NavMenu>
                    <NavLink href="/aisearch/" >
                        AI Search
                    </NavLink>
                    <NavLink href="/search/" >
                        Recipe
                    </NavLink>
                    <NavLink href="/allfoodlist/" >
                        Food Sharing
                    </NavLink>
                    <NavLink href="/inventory/" >
                        Inventory
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    {user? renderSignOut: renderSignInUp}
                </NavBtn>
            </Nav>
        </ Router>
    )
}

export default Navbar