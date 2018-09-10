import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({
                        component: cmp.default
                    });
                });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
};

export default asyncComponent;

// In App.js, instead of:
// import NewPost from './NewPost/NewPost';
//
// use this:
// import asyncComponent from "../../hoc/asyncComponent";
// const asyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });
//
// and then instead of:
// <Route path="/new-post" component={NewPost} />
//
// use this:
// <Route path="/new-post" component={AsyncNewPost} />
