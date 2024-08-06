import './App.css';
import { Suspense, lazy, Fragment } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Suspense fallback={"loading..."}><Signin /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={"loading..."}><Signup /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
