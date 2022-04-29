import React, { useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import Rating from "@mui/material/Rating";
import ReviewModal from "../_modals/ReviewModal/ReviewModal";
import { getLang } from "../../redux/lang/langSelector";
import { langOptionsSummary } from "../../assets/langOptionsSummary";
import { getTheme } from "../../redux/theme/themeSelector";
import s from "./Summary.module.scss";

const Summary = ({ bookId, rating, feedback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useSelector(getTheme);
  const lang = useSelector(getLang);
  const { resume, ratingI } = langOptionsSummary;

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={s.summary}>
      <MediaQuery maxWidth={767}>
        <div className={s.ratingWrepper}>
          <p className={s.ratingText}>{ratingI[lang]} : </p>
          <Rating
            name="half-rating-read"
            size="small"
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
      </MediaQuery>
      <button onClick={toggleModal} className={s.reviewBtn}>
        {resume[lang]}
      </button>
      {isModalOpen && (
        <ReviewModal
          bookRating={rating}
          bookId={bookId}
          isModalOpen={isModalOpen}
          onModalClose={toggleModal}
          coment={feedback}
        />
      )}
    </div>
  );
};

export default Summary;
