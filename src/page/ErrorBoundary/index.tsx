
import React from "react";

// const fundebug = require("fundebug-javascript");

// fundebug.apikey = "af6f0cc5d362757b68e3f32469faf456cc4eb3d7f3b79cf86e9776d9faf1c901";

import styles from "./index.less"
export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }
    componentDidCatch(error: Error, info: any) {
        this.setState({ hasError: true });
        // 将报错发送到Fundebug
        if (process.env.NODE_ENV === "production") {
            // fundebug.notifyError(error, {
            //     metaData: {
            //         info: info
            //     }
            // });
        }

    }

    render() {
        if (this.state.hasError) {
            // 也可以在出错的component处展示出错信息
            // return (<h1>出错了!</h1>);
            return <div className={styles.errPage}>
                <h1>页面出错！</h1>
            </div>;
        }
        return this.props.children;
    }
}

