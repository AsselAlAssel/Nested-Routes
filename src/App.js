import { useState } from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./styles.css";

const ProtectedRoute = (props) => {
  if (!props.user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const NavBar = () => {
  return (
    <div>
      <Link to="/">landing</Link>
      <Link to="/admin">admin</Link>
      <Link to="/user">user</Link>
      <Link to="/home">Home</Link>
      <Link to="/dashpord">dashpord</Link>
    </div>
  );
};

const Landing = () => <h2>landing page</h2>;
const Admin = () => <h2>admin page</h2>;
const User = () => <h2>user page</h2>;
const Home = () => <h2>home page</h2>;
const Profile = () => <h1>hello from profile</h1>;
const Account = () => <h1>hello from Account</h1>;
const DashPord = () => {
  return (
    <div>
      <div>hello to dashpord</div>
      <Link to="account">acount</Link>
      <Link to="profile">profile</Link>

      <Outlet />
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const handelLogin = () => {
    setUser({
      id: 1,
      name: "aseel",
      roles: ["admin"],
      permissions: ["analyze"]
    });
  };
  const handelLogout = () => {
    setUser(null);
  };
  return (
    <div className="App">
      <h1>React router</h1>
      <NavBar />
      {user ? (
        <button onClick={handelLogout}>logout</button>
      ) : (
        <button onClick={handelLogin}>login</button>
      )}
      <Routes>
        <Route path="" index element={<Landing />} />
        <Route path="admin" element={<Admin />} />
        <Route path="user" element={<User />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashpord" element={<DashPord />}>
            <Route path="account" index element={<Account />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}
