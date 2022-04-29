import React from "react";
import { useSelector } from "react-redux";
import { langOptionsMyPurposeToRead } from "../../assets/langOptionsMyPurposeToRead";
import { getLang } from "../../redux/lang/langSelector";
import { getDurationPeriod } from "../../redux/training/trainingSelectors";
import { getTheme } from "../../redux/theme/themeSelector";
import s from "./MyPurposeToRead.module.scss";
import { getBooksCurrentlyReadingState } from "../../redux/books/booksSelectors";

const MyPurposeToRead = ({ books, isTrain }) => {
  const duration = useSelector(getDurationPeriod);
  const booksCurrentlyReading = useSelector(getBooksCurrentlyReadingState);
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { goal, booksNum, days, read } = langOptionsMyPurposeToRead;

  let booksToRead = 0;

  for (let i = 0; i < booksCurrentlyReading.length; i += 1) {
    Number(booksCurrentlyReading[i].pagesFinished) !==
      Number(booksCurrentlyReading[i].pagesTotal) && (booksToRead += 1);
  }

  return (
    <div
      className={isTrain ? s.myPurposeToRead_complete : s.myPurposeToRead}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
      }}
    >
      <h2 className={isTrain ? s.title_complete : s.title}>{goal[lang]}</h2>
      <div
        className={isTrain ? s.numbersPurpose_complete : s.numbersPurpose}
        style={{
          color: theme === "light" ? "black" : "black",
        }}
      >
        <div className={isTrain ? s.numbers_complete : s.numbers}>
          <span
            className={isTrain ? s.wrapper_complete : s.wrapper}
            style={{
              backgroundColor:
                theme === "light"
                  ? "var(--third-bg-color)"
                  : "var(--dark-theme)",
              color: theme === "light" ? "black" : "var(--dark-text)",
            }}
          >
            {books.length}
          </span>
          <p className={isTrain ? s.numbers_text_complete : s.numbers_text}>
            {booksNum[lang]}
          </p>
        </div>
        <div className={isTrain ? s.numbers_complete : s.numbers}>
          <span
            className={isTrain ? s.wrapper_complete : s.wrapper}
            style={{
              backgroundColor:
                theme === "light"
                  ? "var(--third-bg-color)"
                  : "var(--dark-theme)",
              color: theme === "light" ? "black" : "var(--dark-text)",
            }}
          >
            {duration}
          </span>
          <p className={isTrain ? s.numbers_text_complete : s.numbers_text}>
            {days[lang]}
          </p>
        </div>

        {isTrain && (
          <div className={s.numbers_complete}>
            <span
              className={s.wrapper_complete_last}
              style={{
                backgroundColor:
                  theme === "light"
                    ? "var(--third-bg-color)"
                    : "var(--dark-theme)",
              }}
            >
              {booksToRead}
            </span>
            <p className={s.numbers_text_complete}>{read[lang]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurposeToRead;
