import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import AdminBookings from './pages/AdminBookings';
import Login from './pages/Login';
import UserBookings from './pages/UserBookings';
import BookingCar from './pages/BookingCar';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Register from './pages/Register';

function App() {
  const [user, setUser] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  // Protected Route Component
  const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
    if (!user) {
      return <Redirect to="/login" />;
    }

    return (
      <Route
        {...rest}
        render={props => {
          if (isAdmin && !user.isAdmin) {
            return <Redirect to="/" />;
          }
          if (!isAdmin && user.isAdmin) {
            return <Redirect to="/admin" />;
          }
          return <Component {...props} />;
        }}
      />
    );
  };

  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <Route 
          exact 
          path="/login" 
          render={() => (user ? <Redirect to={user.isAdmin ? "/admin" : "/"} /> : <Login setUser={setUser} />)}
        />
        <Route 
          exact 
          path="/register" 
          render={() => (user ? <Redirect to={user.isAdmin ? "/admin" : "/"} /> : <Register />)}
        />

        {/* Admin Routes */}
        <ProtectedRoute exact path="/admin" component={AdminHome} isAdmin={true} />
        <ProtectedRoute exact path="/admin/bookings" component={AdminBookings} isAdmin={true} />
        <ProtectedRoute exact path="/addcar" component={AddCar} isAdmin={true} />
        <ProtectedRoute exact path="/editcar/:carid" component={EditCar} isAdmin={true} />

        {/* User Routes */}
        <ProtectedRoute exact path="/" component={Home} isAdmin={false} />
        <ProtectedRoute exact path="/userbookings" component={UserBookings} isAdmin={false} />
        <ProtectedRoute exact path="/booking/:carid" component={BookingCar} isAdmin={false} />

        {/* Fallback Route */}
        <Route path="*">
          <Redirect to={user?.isAdmin ? "/admin" : "/"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
