import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SideMenu, SidebarLink, SideBtn, SideBtnLink, SideBtnLinkInv} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SideMenu>
                    <SidebarLink href="/aisearch/" onClick={toggle}>
                        AI Search
                    </SidebarLink>
                    <SidebarLink href="/search/" onClick={toggle}>
                        Recipe
                    </SidebarLink>
                    <SidebarLink href="/allfoodlist/" onClick={toggle}>
                        Food Sharing
                    </SidebarLink>
                    <SidebarLink href="/inventory/" onClick={toggle}>
                        Inventory
                    </SidebarLink>
                </SideMenu>
                <SideBtn>
                    <SideBtnLink href="/sign-in" onClick={toggle}>Sign In</SideBtnLink>
                    <SideBtnLink href="/sign-up" onClick={toggle}>Sign Up</SideBtnLink>
                </SideBtn>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
