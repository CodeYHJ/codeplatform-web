import { UserProvider } from "./user/userContext";
import { TaskProvider } from "./task/taskContext";

import React from "react";

type ProviderList = React.SFC[];
const providers: ProviderList = [UserProvider, TaskProvider];

const Providers = (props: any) => {
    return providers.reduceRight((children, Parent) => {
        return <Parent>{children}</Parent>;
    }, props.children);
};
export default Providers;