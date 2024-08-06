
import { Suspense, lazy, Fragment } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SendMoney = lazy(() => import('./pages/SendMoney'))

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Suspense fallback={"loading..."}><Signin /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={"loading..."}><Signup /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={"loading"}><Dashboard /></Suspense>} />
          <Route path="/sendmoney" element={<Suspense fallback={"loading..."}><SendMoney /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
