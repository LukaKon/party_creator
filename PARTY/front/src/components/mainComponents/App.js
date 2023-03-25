import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NotFound } from "./NotFound";
import { HomePage } from "./HomePage";
import { SignIn } from "../accountSettings/SignIn";
import { SignUp } from "../accountSettings/SignUp";
import { ProfileSettings } from "../accountSettings/ProfileSettings";
import { Profile } from "../Profile";
import { FormAnnouncement } from "../announcement/forms/FormAnnouncement";
import { AnnouncementDetails } from "../announcement/AnnouncementDetails";
import { Categories } from "../Categories";
import { AnnouncementsByCategory } from "../announcement/AnnouncementsByCategory";
import { ResetPassword } from "../accountSettings/ResetPassword";
import { ResetPasswordConfirm } from "../accountSettings/ResetPasswordConfirm";
import { ChangePassword } from "../accountSettings/ChangePassword";
import { MyAnnouncements } from "../announcement/MyAnnouncements";
import { MyFavourites } from "../MyFavourites";
import { SearchAnnouncement } from "../SearchAnnouncement";
import { ActivateAccount } from "../accountSettings/ActivateAccount";
import { ActivateNewEmail } from "../accountSettings/ActivateNewEmail";
import { Chat } from "../chat/Chat";
import { loged } from "../../utils/loged";
import { Logout } from "../Logout";
import {MyConversations} from "../chat/MyConversations";


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
          {/* {isAuthenticatedFunction("addannouncement", <AddAnnouncement />)}
          {isAuthenticatedFunction(
            "editannouncement/:slug",
            <EditAnnouncement />
          )} */}
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
