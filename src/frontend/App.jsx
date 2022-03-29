import {
    BasePage,
    AuthPage,
    FeedPage,
    RecordingPage,
    ProfilePage,
    ErrorPage,
} from "./pages";
import "./styles.css";

import { Routes, Route } from "react-router";

export default function App() {
    return (
        <BasePage>
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/recording' element={<RecordingPage />} />
                <Route path='/profile'>
                    <Route index element={<ProfilePage />} />
                    <Route path=':username' element={<ProfilePage />} />
                </Route>
                <Route path='/' element={<FeedPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BasePage>
    );
}
