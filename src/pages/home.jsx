import React from 'react';
import Nav from "../components/nav.jsx";
import Footer from "../components/footer.jsx";
import Menu from "../components/menu.jsx";
import Typing from "../components/typing.jsx"

function Home() {
    return (
        <div>
            <Nav/>
            <Menu/>
            <Typing/>
            <Footer/>
        </div>
    );
}

export default Home;