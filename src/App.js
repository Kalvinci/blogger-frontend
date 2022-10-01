import React, { Component } from 'react';
import NavigationBar from './component/NavigationBar/NavigationBar';
import Stack from 'react-bootstrap/esm/Stack';
import { Route, Routes } from "react-router-dom";
import BlogList from './component/BlogList/BlogList';
import BlogEditor from "./component/BlogEditor/BlogEditor";
import BlogPage from "./component/BlogPage/BlogPage";

class App extends Component {
    render() {
        return (
            <Stack gap={3}>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/compose" element={<BlogEditor />} />
                    <Route path="/blogs/:blogId" element={<BlogPage />} />
                </Routes>
            </Stack >
        );
    }
}

export default App;
