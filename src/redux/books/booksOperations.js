import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBookApi,
  getPlanningApi,
  getUserBooksApi,
} from "../../utils/fetchApi";
import { getPlaningTraning } from "../training/trainingOperations";

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.accessToken;
    try {
      const book = await addBookApi(newBook, persistedToken);
      //   console.log(book.newBook);
      return book.newBook;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const books = await getUserBooksApi(accessToken);
      const training = await getPlanningApi(accessToken).catch((error) => {
        if (error.request.status === 403) {
          // console.log(error.request);
          return null; // {planning:{books:[]}};
        } else {
          throw error;
        }
      });
      //   console.log(books);
      books.currentlyReading = training ? training.planning.books : [];
      books.goingToRead = books.goingToRead.filter(
        ({ _id }) => !books.currentlyReading.some((book) => book._id === _id)
      );
      return books;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
