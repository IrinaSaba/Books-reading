import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import BookInfoList from "../components/BookInfoList/BookInfoList";
import { useDispatch, useSelector } from "react-redux";
import { getBooksGoingToReadState } from "../redux/books/booksSelectors";
import { getIsLoggedIn } from "../redux/auth/authSelectors";
import { getBooks } from "../redux/books/booksOperations";
import MyPurposeToRead from "../components/MyPurposeToRead/MyPurposeToRead";
import s from "./TrainingPage.module.scss";
import MyTrainingPlaining from "../components/MyTrainingPlaining/MyTrainingPlaining";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// import second from './'

export const options = {
  backgroundColor: "#FF6B08",
  cubicInterpolationMode: "monotone",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      display: true,
      labels: {
        color: "rgb(255, 99, 132)",
      },
    },
    title: {
      display: false,
      text: "Кількість сторінок за день",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "plan",
      data: [0, 3, 5, 6, 9, 10, 11],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(0, 0, 0)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    {
      label: "fact",
      data: [1, 2, 3, 5, 8, 10, 12],

      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#FF6B08",
      backgroundColor: "#FF6B08",
    },
  ],
};

const TrainingPage = () => {
  const loggedIn = useSelector(getIsLoggedIn);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const booksLibrary = useSelector(getBooksGoingToReadState);

  const dispatch = useDispatch();

  loggedIn &&
    useEffect(() => {
      dispatch(getBooks());
    }, []);

  return (
    <div className={s.TrainingPage}>
      <MyTrainingPlaining />
      <h2>Моє тренування</h2>
      {/* <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      /> */}
      <select>
        {booksLibrary.map((book) => (
          <option key={book._id} value={book.title}>
            {book.title}
          </option>
        ))}
      </select>
      <button>Додати</button>
      <MyPurposeToRead
        booksLibrary={booksLibrary}
             />
      <Line options={options} data={data} />
    </div>
  );
};

export default TrainingPage;
