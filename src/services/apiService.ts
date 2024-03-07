import { Dispatch, SetStateAction } from "react";
import { CommentsData } from "../components/Comments";

const apiUrl = "https://jsonplaceholder.typicode.com/comments";

export const fetchCommentsData = async (
  randomCommentId: number,
  setData: Dispatch<SetStateAction<CommentsData | null>>,
  setRandomCommentId: Dispatch<SetStateAction<number>>,
  setIsPending: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    setIsPending(true);
    const response = await fetch(`${apiUrl}/${randomCommentId}`);
    const userData = await response.json();

    if (setData) {
      setTimeout(() => {
        setData(userData);
        setIsPending(false);
        setRandomCommentId((prev) => prev + 1);
      }, 2000);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsPending(false);
  }
};
