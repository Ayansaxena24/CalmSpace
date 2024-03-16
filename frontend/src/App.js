import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
// import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/Login";
import UserDashboard from "./pages/user/userDashboard";
import UserRoute from "./component/userRoute";
import AdminRoute from "./component/adminRoute";
import CreatorRoute from "./component/creatorRoute";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserJobHistory from "./pages/user/userJobsHistory";
import userInfoDashboard from "./pages/user/userInfoDashboard";
import adminDashboard from "./pages/admin/adminDashboard";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import Register from './pages/Register';
import DashCategory from './pages/admin/DashCategory';
import DashCreateJob from './pages/admin/DashCreateJob';
import DashCreateCategory from './pages/admin/DashCreateCategory';
import DashCreateUser from './pages/admin/DashCreateUser';

import { createTheme } from '@mui/material/styles';
import { themeColors } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import About from "./pages/About";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import CreatorDashApplicants from "./pages/creator/CreatorDashApplicants";
import CreatorDashCategory from "./pages/creator/CreatorDashCategory";
import CreatorDashCreateJob from "./pages/creator/CreatorDashCreateJob";
import CreatorDashCreateCategory from "./pages/creator/CreatorDashCreateCategory";
import CreatorDashCreateUser from "./pages/creator/CreatorDashCreateUser";
import CreatorJobsHistory from "./pages/creator/CreatorJobsHistory";
import CreatorSingleJob from "./pages/creator/CreatorSingleJob";
import DashUpdateCategory from "./pages/admin/DashUpdateCategory";


//HOC
const UserDashboardHOC = Layout(UserDashboard); //instead of userdashboard we will see userdashboardHOC
const UserJobHistoryHOC = Layout(UserJobHistory); //instead of userdashboard we will see userdashboardHOC
const UserInfoDashboardHOC = Layout(userInfoDashboard); //instead of userdashboard we will see userdashboardHOC
// ADMIN
const AdminDashboardHOC = Layout(adminDashboard); //instead of userdashboard we will see userdashboardHOC
const DashUsersHOC = Layout(DashUsers); //instead of userdashboard we will see userdashboardHOC
const DashJobsHOC = Layout(DashJobs); 
const DashCategoryHOC = Layout(DashCategory)
const DashCreateJobHOC = Layout(DashCreateJob)
const DashCreateCategoryHOC = Layout(DashCreateCategory)
const DashUpdateCategoryHOC = Layout(DashUpdateCategory)
const DashCreateUserHOC = Layout(DashCreateUser)
// CREATOR
const CreatorDashboardHOC = Layout(CreatorDashboard); //instead of userdashboard we will see userdashboardHOC
const CreatorDashApplicantsHOC = Layout(CreatorDashApplicants); //instead of userdashboard we will see userdashboardHOC
const CreatorJobsHistoryHOC = Layout(CreatorJobsHistory); 
const CreatorDashCategoryHOC = Layout(CreatorDashCategory)
const CreatorDashCreateJobHOC = Layout(CreatorDashCreateJob)
// const CreatorSingleJobHOC = Layout(CreatorSingleJob)
const CreatorDashCreateCategoryHOC = Layout(CreatorDashCreateCategory)
const CreatorDashCreateUserHOC = Layout(CreatorDashCreateUser)

const App = () => {
  const {mode} = useSelector(state => state.mode);
  const theme = useMemo(()=> createTheme(themeColors(mode)), [mode]) 
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ProSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/location/:location" element={<Home />} />
                <Route path="/search/:keyword" element={<Home />} />{" "}
                {/* for extracting keyword during search for  */}
                <Route path="/login" element={<LogIn />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/job/:id" element={<SingleJob />} />
                <Route path="/about" element={<About />} />
                {/* ADMIN */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                <Route path="/admin/jobs" element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                <Route path="/admin/category" element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                <Route path="/admin/job/create" element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                <Route path="/admin/category/create" element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                <Route path="/admin/category/update/:id/:jobTypeName" element={<AdminRoute><DashUpdateCategoryHOC /></AdminRoute>} />
                <Route path="/admin/info"element={<AdminRoute><UserInfoDashboardHOC /></AdminRoute>}/>

                {/* CREATOR */}
                <Route path="/creator/dashboard" element={<CreatorRoute><CreatorDashboardHOC /></CreatorRoute>} />
                <Route path="/creator/applicants" element={<CreatorRoute><CreatorDashApplicantsHOC /></CreatorRoute>} />
                <Route path="/creator/jobs" element={<CreatorRoute><CreatorJobsHistoryHOC /></CreatorRoute>} />
                <Route path="/creator/category" element={<CreatorRoute><CreatorDashCategoryHOC /></CreatorRoute>} />
                <Route path="/creator/jobs/create" element={<CreatorRoute><CreatorDashCreateJobHOC /></CreatorRoute>} />
                <Route path="/creator/job/:id" element={<CreatorRoute><CreatorSingleJob /></CreatorRoute>} />
                <Route path="/creator/category/create" element={<CreatorRoute><CreatorDashCreateCategoryHOC /></CreatorRoute>} />
                <Route path="/creator/user/create" element={<CreatorRoute><CreatorDashCreateUserHOC /></CreatorRoute>} />
                <Route path="/creator/user/create" element={<CreatorRoute><CreatorDashCreateUserHOC /></CreatorRoute>} />
                <Route path="/creator/info"element={<CreatorRoute><UserInfoDashboardHOC /></CreatorRoute>}/>

                {/* USER */}
                <Route path="/user/dashboard"element={<UserRoute><UserDashboardHOC /></UserRoute>}/>
                <Route path="/user/jobs"element={<UserRoute><UserJobHistoryHOC /></UserRoute>}/>
                <Route path="/user/info"element={<UserRoute><UserInfoDashboardHOC /></UserRoute>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProSidebarProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default App;
