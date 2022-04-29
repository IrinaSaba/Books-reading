import React from "react";
import Icons from "../../images/symbol-defs.svg";
import s from "./BookReviewItem.module.scss";
import MediaQuery from "react-responsive";
import Summary from "../Summary/Summary";
import { Rating } from "@mui/material";
import { getTheme } from "../../redux/theme/themeSelector";
import { useSelector } from "react-redux";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionReviewItem } from "../../assets/langOptionsReviewItem";

const BookReviewItem = ({
  title,
  author,
  publishYear,
  pagesTotal,
  colorIcon,
  bookId,
  rating,
  feedback,
}) => {
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { authorItem, yearItem, pagesItem } = langOptionReviewItem;

  return (
    <li
      className={s.bookReviewItem}
      style={{
        backgroundColor: theme === "light" ? "white" : "var(--dark-header)",
      }}
    >
      <div className={s.iconTitle}>
        <svg className={s.navIcon} width="22px" height="17px">
          <use xlinkHref={`${Icons}#icon-flat-${colorIcon}`} />
        </svg>
        {/* <a href="#" className="link nav__link-contact"> */}
        <p
          className={s.bookTitle}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {title}
        </p>
        {/* </a> */}
      </div>
      <MediaQuery maxWidth={767}>
        <div className={s.bookInfoWrapper}>
          <p className={s.bookInfoText}>{authorItem[lang]}:</p>
          <p className={s.bookInfoText}>{yearItem[lang]}:</p>
          <p className={s.bookInfoText}>{pagesItem[lang]}:</p>
        </div>
      </MediaQuery>
      <div className={s.bookMoreInfo}>
        <p
          className={s.bookMoreInfoAuthor}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {author}
        </p>
        <p
          className={s.bookMoreInfoYear}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {publishYear}
        </p>
        <p
          className={s.bookMoreInfoPage}
          style={{
            color: theme === "light" ? "#242A37" : "var(--dark-text)",
          }}
        >
          {pagesTotal}
        </p>
      </div>
      <MediaQuery minWidth={1280}>
        <div className={s.ratingStar}>
          <Rating
            name="half-rating-read"
            size="large"
            value={rating ? rating : 0}
            precision={0.5}
            readOnly
            style={
              theme === "light"
                ? { troke: "none", strokeWidth: 0 }
                : { stroke: "#faaf00", strokeWidth: "0.4" }
            }
          />
        </div>
        <Summary bookId={bookId} rating={rating} feedback={feedback} />
      </MediaQuery>

      <MediaQuery minWidth={768} maxWidth={1279}>
        <div className={s.ratingStar}>
          <Rating
            name="half-rating-read"
            size="medium"
            sizeMedium
            value={rating ? rating : 0}
            precision={0.5}
            readOnly
            style={
              theme === "light"
                ? { troke: "none", strokeWidth: 0 }
                : { stroke: "#faaf00", strokeWidth: "0.4" }
            }
          />
        </div>
        <Summary bookId={bookId} rating={rating} feedback={feedback} />
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <Summary bookId={bookId} rating={rating} feedback={feedback} />
      </MediaQuery>
    </li>
  );
};

export default BookReviewItem;
