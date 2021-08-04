import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import Orders from "../components/Orders/Orders";
import AllServices from "../components/Services/AllServices";

//Services
import Services from "../components/Services/Services";

const HomePage = () => {
    return (
        <main>
            <Switch>
                <Route path="/home" exact>
                    <Services />
                    <Orders />
                </Route>
                <Route path="/home/all" exact>
                    <AllServices />
                </Route>
            </Switch>
        </main>
    );
}

export default HomePage;