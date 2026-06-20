import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Body';
import {Provider} from 'react-redux';
import appStore from '../utils/appStore';
import Login from './Login';
import Feed from './Feed';
import Profile from './Profile';
import Connections from './Connections';
import Requests from './Requests';

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
