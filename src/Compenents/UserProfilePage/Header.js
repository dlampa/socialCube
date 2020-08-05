import React from "react";
import SiteNav from "./SiteNav";

class Header extends React.Component {
   
    render() {
        return (
            <header class="SiteNav">
                <form onSubmit={/*this.______???*/}></form> 
                <input
                    type="text"
                    name="search"
                    id="search"
                    required
                    value={/*this.state._____????*/}/>
                <button type="submit" value="_______???"/>
                </form>
               <img class="logo" id="logo" src="img/_______???" alt="App Logo"/>
               
            </header>
        );
    }
}
export default Header;