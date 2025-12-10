import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/Index/IndexPage";
import ProjectPage from "./pages/Project/ProjectPage";
import BlogsPage from "./pages/Blogs/BlogsPage";
import BlogPostPage from "./pages/BlogPost/BlogPostPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Navbar from "./layout/Navbar/Navbar";
import ProjectsPage from "./pages/Projects/ProjectsPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
