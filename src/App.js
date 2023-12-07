import {BrowserRouter as Router, redirect, Route, Routes} from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage"
import PrivateRoute from "./components/PrivateRoute";
import SubjectsPage from "./pages/SubjectsPage";
import DiaryPage from "./pages/DiaryPage";
import {useEffect, useState} from "react";
import axios from "axios";
import AdminHomePage from "./pages/AdminHomePage";
import ForbiddenPage from "./pages/ForbiddenPage";
import SubjectPage from "./pages/SubjectPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import DebtsPage from "./pages/DebtsPage";
import StudentInfoPage from "./pages/StudentInfoPage";

const App = () => {


    const login = (JwtToken) => {
        localStorage.setItem("JwtToken", JwtToken);
    };
    const logout = () => {
        localStorage.removeItem("JwtToken");
        window.location.href = "/auth";
    }

    return (
        <Router>
                <Routes>
                    <Route
                        path="/auth"
                        element={
                            <AuthPage login={login}/>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage func_logout={logout}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user-profile"
                        element={
                            <PrivateRoute>
                                <UserProfilePage logout={logout}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/subjects"
                        element={
                            <PrivateRoute>
                                <SubjectsPage func_logout={logout}/>
                            </PrivateRoute>
                    }
                    />
                    <Route
                        path="/diary"
                        element={
                            <PrivateRoute>
                                <DiaryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/subject/:subjectId"
                        element={
                            <PrivateRoute>
                                <SubjectPage func_logout={logout}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/debts/:studentId"
                        element={
                            <PrivateRoute>
                                <DebtsPage func_logout={logout}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/teacher/:teacherId"
                        element={
                            <PrivateRoute>
                                <TeacherProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute roles={["ROLE_ADMIN"]}>
                                <AdminHomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/student-information/confirmation"
                        element={
                            <PrivateRoute>
                                <StudentInfoPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/forbidden" element={
                        <ForbiddenPage/>
                    }/>
                </Routes>
        </Router>
    );
}

export default App;