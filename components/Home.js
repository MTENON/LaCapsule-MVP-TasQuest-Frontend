import styles from "../styles/Home.module.css";
import { useState } from "react";

import SideMenu from "./molecules/SideMenu";
import AtomLink from "./atoms/AtomLink";

function Home() {
    return (
        <div>
            <SideMenu></SideMenu>
        </div>
    );
}

export default Home;
