import { UserProvider } from "./user/userContext";
import { MicroTaskProvider } from "./microTask/microTaskContext";

import React from "react";

type ProviderList = React.SFC[];
const providers: ProviderList = [UserProvider, MicroTaskProvider];

const Providers = (props: any) => {
    return providers.reduceRight((children, Parent) => {
        return <Parent>{children}</Parent>;
    }, props.children);
};
export default Providers;