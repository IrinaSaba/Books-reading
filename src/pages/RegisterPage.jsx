import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";
import s from "./RegisterPage.module.scss";
import { regValidationSchema } from "../utils/validation/RegisterValid";

const RegisterPage = () => {
  const dispatch = useDispatch();
  return (
    <div className={s.regForm}>
      <div className={s.LoginRegDiv}>
        <div className={s.regFormFormikGoogle}>
          <div className={s.googleFormDiv}>
            <a
              className={s.googleForm}
              href="https://bookread-backend.goit.global/auth/google"
            >
              Google
            </a>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={regValidationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(register(values));
              resetForm();
              // console.log("values", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label className={s.inputLabel} htmlFor="name">
                  Iм'я <span className={s.spanStar}>*</span>
                  <input
                    className={s.inputEmail}
                    type="name"
                    name="name"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {/* {errors.email && touched.email && errors.email} */}
                  <ErrorMessage
                    component="div"
                    name="name"
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.inputLabel} htmlFor="email">
                  Електронна адреса <span className={s.spanStar}>*</span>
                  <input
                    className={s.inputEmail}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {/* {errors.email && touched.email && errors.email} */}
                  <ErrorMessage
                    component="div"
                    name="email"
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.inputLabel} htmlFor="password">
                  Пароль <span className={s.spanStar}>*</span>
                  <input
                    className={s.inputEmail}
                    type="password"
                    name="password"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {/* {errors.password && touched.password && errors.password} */}
                  <ErrorMessage
                    component="div"
                    name="password"
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.inputLabel} htmlFor="passwordRepeat">
                  Пiдтвердити пароль <span className={s.spanStar}>*</span>
                  <input
                    className={s.inputPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {/* {errors.password && touched.password && errors.password} */}
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className={s.errorMessage}
                  />
                </label>

                <button
                  className={s.btnSubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Зареєструватися
                </button>
                <div className={s.regFormRegistrText}>
                  <p className={s.btnRegisterSmallText}>Вже з нами?</p>
                  <a className={s.btnRegisterLogin} href="/login">
                    Увiйти
                  </a>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={s.textRegist}>
        <div className={s.textRegistDiv}>
          <h2 className={s.regFormTitleMain}>Books Reading</h2>
          <div>
            <div className={s.regFormTitleText}>
              <h3 className={s.regFormTitle}>Допоможе вам</h3>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Швидше сформулювати свою ціль і розпочати читати
                </p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Пропорційно розподілити навантаження на кожний день
                </p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Відстежувати особистий успіх
                </p>
              </div>
            </div>
            <div className={s.regFormTitleText}>
              <h3 className={s.regFormTitle}>Також ви зможете</h3>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Формувати особисту думку незалежну від інших
                </p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Підвищити свої професійні якості опираючись на нові знання
                </p>
              </div>
              <div className={s.regFormSpanText}>
                <span className={s.spanArrow}>&#62;</span>
                <p className={s.textFontRegistr}>
                  Стати цікавим співрозмовником
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
