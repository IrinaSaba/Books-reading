import "./index.scss";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import AppBar from "./components/_navigation/AppBar";
import PrivateRoute from "./components/_routs/PrivateRoute";
import PublicRoute from "./components/_routs/PublicRoute";
import RedirectNew from "./components/_navigation/RedirectNew";
import Loader from "./components/_shared/Loader/Loader";
import { getTheme } from "./redux/theme/themeSelector";
import { getBooks } from "./redux/books/booksOperations";
import { getError } from "./redux/training/trainingSelectors";
import { getIsError } from "./redux/books/booksSelectors";
import { getIsErrorAuth } from "./redux/auth/authSelectors";
import { logoutUser } from "./redux/auth/authSlice";
import GoogleLogin from "./components/Google/GoogleLogin";
import { getIsLoggedIn } from "./redux/auth/authSelectors";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage.jsx"));
const TrainingPage = lazy(() =>
  import("./pages/TrainingPage/TrainingPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const trainError = useSelector(getError);
  const booksError = useSelector(getIsError);
  const authError = useSelector(getIsErrorAuth);
  const iaAuth = useSelector(getIsLoggedIn);

  GoogleLogin();

  useEffect(() => {
    const errArrAuth = authError && authError.split(" ");
    const Auth = errArrAuth && errArrAuth[errArrAuth.length - 1];
    // console.log("Auth", Auth);

    const errArrTr = trainError && trainError.split(" ");
    const Train = errArrTr && errArrTr[errArrTr.length - 1];
    // console.log("Train", Train);

    const errArrBook = booksError && booksError.split(" ");
    const Book = errArrBook && errArrBook[errArrBook.length - 1];
    // console.log("Book", Book);

    if (Number(Auth) === 401 || Number(Train) === 401 || Number(Book) === 401) {
      dispatch(logoutUser());
    }
  }, [authError, trainError, booksError]);

  useEffect(() => {
    iaAuth && dispatch(getBooks());
  }, []);

  return (
    <div
      style={{
        backgroundColor:
          theme === "light" ? "var(--light-theme)" : "var(--dark-theme)",
        color: theme === "light" ? "black" : "white",
        minHeight: "100vh",
      }}
    >
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/register" redirectTo="/library" restricted>
            <RegisterPage />
          </PublicRoute>
          <PublicRoute path="/login" redirectTo="/library" restricted>
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path="/library" redirectTo="/login">
            <LibraryPage />
          </PrivateRoute>
          <PrivateRoute path="/training" redirectTo="/login">
            <TrainingPage />
          </PrivateRoute>

          <RedirectNew />
        </Switch>
      </Suspense>
    </div>
  );
}
