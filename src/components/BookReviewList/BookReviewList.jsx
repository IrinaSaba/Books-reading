import React, { useEffect } from "react";
import BookReviewItem from "../BookReviewItem/BookReviewItem";
import s from "./BookReviewList.module.scss";
import MediaQuery from "react-responsive";
import { getBooks } from "../../redux/books/booksOperations";
import { useDispatch, useSelector } from "react-redux";

import { getLang } from "../../redux/lang/langSelector";
import { langOptionsBookReviewList } from "../../assets/langOptionsBookReviewList";
import { getTheme } from "../../redux/theme/themeSelector";

const BookReviewList = ({ booksLibrary, colorIcon, review }) => {
  const dispatch = useDispatch();
  const lang = useSelector(getLang);
  const theme = useSelector(getTheme);
  const {
    done,
    title,
    author,
    publishYear,
    pagesTotal,
    rating,
  } = langOptionsBookReviewList;
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div>
      <div>
        <ul className={s.bookList}>

          <h2 style={{
          color:
            theme === "light" ? "var(--title-text-color)" : "white"
        }}>{done[lang]}</h2>
          <MediaQuery minWidth={768}>
            <div className={s.bookInfo}>
              <p className={s.title}>{title[lang]}</p>

              <p className={s.author}>{author[lang]}</p>
              <p className={s.year}>{publishYear[lang]}</p>
              <p className={s.page}>{pagesTotal[lang]}</p>
              <p className={s.bookInfoText}>{rating[lang]}</p>
            </div>
          </MediaQuery>
          {booksLibrary.map((book) => (
            <BookReviewItem
              key={book._id}
              title={book.title}
              author={book.author}
              publishYear={book.publishYear}
              pagesTotal={book.pagesTotal}
              colorIcon={colorIcon}
              review={review}
              bookId={book._id}
              rating={book.rating}
              feedback={book.feedback}
            />
          ))}

          {/* {Boolean(review)
          ? booksLibrary.map((book) => (
              <BookReviewItem
                key={book._id}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                pagesTotal={book.pagesTotal}
                colorIcon={colorIcon}
                review={review}
                bookId={book._id}
                rating={book.rating}
                feedback={book.feedback}
              />
            ))
          : booksLibrary.map((book) => (
              <BookInfoItem
                key={book._id}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                pagesTotal={book.pagesTotal}
                colorIcon={colorIcon}
                review={review}
                bookId={book._id}
                rating={book.rating}
                feedback={book.feedback}
              />
            ))} */}
        </ul>
      </div>
    </div>
  );
};

export default BookReviewList;
