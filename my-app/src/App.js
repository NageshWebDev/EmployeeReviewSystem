import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import { RemoveEmp } from './components/adminPage/Employee/removeEmp';
import { UpdateEmp } from './components/adminPage/Employee/updateEmp';
import { ViewEmp } from './components/adminPage/Employee/ViewEmp';
import { AddPerformance } from './components/adminPage/Performance/addPerformance';
import { AssignPerformance } from './components/adminPage/Performance/assignPerformance';
import { RemovePerformance } from './components/adminPage/Performance/removePerformance';
import { SubmittedPerformance } from './components/adminPage/Performance/submittedPerformance';
import { ViewPerformance } from './components/adminPage/Performance/viewPerformance';
import { EmployeePage } from './components/employeePage/employeePage';
import ViewReviews from './components/employeePage/viewReviews';
import FormSubmitAnimation from './components/formSubmitAnimation/formSubmitAnimation';
import HomePage from './components/homepage/homePage';
import Login from "./components/login/login";
import LoginAs from './components/login/loginAs';
import LoginAsAdmin from './components/login/loginAsAdmin';
import LoginAsEmp from './components/login/loginAsEmp';
import SignUpAsEmp from './components/signUp/SignUpAsEmp';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomePage />}>
        <Route index element={<Login />} />
        <Route path='loginAs' element={<LoginAs />} />
        <Route path='loginAsAdmin' element={<LoginAsAdmin />} />
        <Route path='loginAsEmployee' element={<LoginAsEmp />} />
      </Route>

      {/* Admin Page */}
      <Route path='adminPage/:adminName' element={<AdminPage />}>
        {/* Employee related route */}
        <Route path='signupEmployee' element={<SignUpAsEmp />} />
        <Route path='viewEmp' element={<ViewEmp />} />
        <Route path='updateEmp' element={<UpdateEmp />} />
        <Route path='removeEmp' element={<RemoveEmp />} />

        {/* Performance related route */}
        <Route path='addPerformance' element={<AddPerformance />} />
        <Route path='viewPerformance' element={<ViewPerformance />} />
        <Route path='updatePerformance' element={<SubmittedPerformance />} />
        <Route path='removePerformance' element={<RemovePerformance />} />
        <Route path='assignPerformance' element={<AssignPerformance />} />
      </Route>

      {/* Employee Page */}
      <Route path='employeePage/:employeeName' element={<EmployeePage />}>
        <Route path='viewReviews' element={<ViewReviews />} />
      </Route>

      {/* Form Submitted animation */}
      <Route path='/formSubmitted' element={<FormSubmitAnimation />} />

    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;