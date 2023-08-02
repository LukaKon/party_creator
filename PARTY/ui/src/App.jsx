import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from './components/mainComponents/Footer'
import { Header } from "./components/mainComponents/Header";
import { NotFound } from "./components/mainComponents/NotFound";
import { HomePage } from "./components/mainComponents/HomePage";
import { SignIn } from "./components/accountSettings/SignIn";
import { SignUp } from "./components/accountSettings/SignUp";
import { Logout } from "./components/Logout";
import { ResetPassword } from "./components/accountSettings/ResetPassword";
import { ResetPasswordConfirm } from "./components/accountSettings/ResetPasswordConfirm";
import { ChangePassword } from "./components/accountSettings/ChangePassword";
import { Profile } from "./components/Profile";
import { ProfileSettings } from "./components/accountSettings/ProfileSettings";
import { Categories } from "./components/Categories";
import { FormAnnouncement } from "./components/announcement/forms/FormAnnouncement";
import { AnnouncementDetails } from "./components/announcement/details/AnnouncementDetails";
import { AnnouncementsByCategory } from "./components/announcement/AnnouncementsByCategory";
import { MyAnnouncements } from './components/announcement/MyAnnouncements'
import { MyFavourites } from "./components/MyFavourites";
import { SearchAnnouncement } from "./components/SearchAnnouncement";
import { ActivateAccount } from './components/accountSettings/ActivateAccount'
import { ActivateNewEmail } from "./components/accountSettings/ActivateNewEmail";
import { Chat } from "./components/chat/Chat";
import { MyConversations } from "./components/chat/MyConversations";
import { loged } from './utils/loged'

export const App = () => {
  const isAuthenticatedFunction = (path, component) => {
    if (loged) {
      return <Route path={path} element={component} />;
    } else {
      return <Route path={path} element={<SignIn />} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="" element={<HomePage />} />
          <Route path="announcement/:slug" element={<AnnouncementDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryName" element={<AnnouncementsByCategory />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="resetpassword/:token" element={<ResetPasswordConfirm />} />
          <Route path="activate/:uid/:token" element={<ActivateAccount />} />
          <Route path="changeemail/:uid/:newEmail/:token" element={<ActivateNewEmail />} />
          <Route path="search" element={<SearchAnnouncement />} />
          {/* in working */}
          <Route path="chat" element={<Chat />} />
          {/*/!*Views only for logged users*!/*/}
          {isAuthenticatedFunction("myconversations", <MyConversations />)}
          {isAuthenticatedFunction("profile", <Profile />)}
          {isAuthenticatedFunction("settings", <ProfileSettings />)}
          {isAuthenticatedFunction("addannouncement", <FormAnnouncement />)}
          {isAuthenticatedFunction("editannouncement/:slug", <FormAnnouncement />)}
          {isAuthenticatedFunction("changepassword", <ChangePassword />)}
          {isAuthenticatedFunction("myannouncements", <MyAnnouncements />)}
          {isAuthenticatedFunction("myfavourites", <MyFavourites />)}
          {isAuthenticatedFunction("signout", <Logout />)}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
