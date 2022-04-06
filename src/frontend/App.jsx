import {
    BasePage,
    AuthPage,
    FeedPage,
    RecordingPage,
    ProfilePage,
    ErrorPage,
} from "./pages";
import { Routes, Route } from "react-router-dom";

import "./styles.css";

export default function App() {
    return (
      <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route element={<BasePage />}>
              <Route path='/feed' element={<FeedPage />} />
              <Route path='/recording'>
                  <Route index element={<RecordingPage />} />
                  <Route
                      path=':parentPID/:parentUID'
                      element={<RecordingPage />}
                  />
              </Route>
              <Route path='/profile'>
                  <Route index element={<ProfilePage />} />
                  <Route path=':username' element={<ProfilePage />} />
              </Route>
              <Route index element={<FeedPage />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
      </Routes>
    );
}
