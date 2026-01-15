import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/Index/IndexPage";
import ProjectPage from "./pages/Project/ProjectPage";
import BlogsPage from "./pages/Blogs/BlogsPage";
import BlogPostPage from "./pages/BlogPost/BlogPostPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Navbar from "./layout/Navbar/Navbar";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import { Particles } from "./layout/Particles/Particles";
import ContactPage from "./pages/Contact/ContactPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="fixed z-10 size-full overflow-hidden">
                <Particles quantity={60} className="size-full opacity-40" />
            </div>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
