import { useState } from "react";
import "./App.css";
import { SpinnerCircular } from "spinners-react";
import { fetchCommentsData } from "./services/apiService";
import _debounce from "lodash/debounce";

export interface CommentsData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const [randomCommentId, setRandomCommentId] = useState(1);
  const [data, setData] = useState<CommentsData | null>(null);
  const [isPending, setIsPending] = useState(false);

  const debouncedFetchData = _debounce(() => {
    fetchCommentsData(
      randomCommentId,
      setData,
      setRandomCommentId,
      setIsPending
    );
  }, 400);

  const handleFetchData = () => {
    debouncedFetchData();
  };

  return (
    <>
      <button
        onClick={handleFetchData}
        className={isPending ? "pending" : "standard"}
      >
        {isPending ? <SpinnerCircular size="20" /> : "Fetch Data"}
      </button>
      {data && (
        <article>
          <b>{data?.name}</b>
          <q>{data?.body}</q>
        </article>
      )}
    </>
  );
}

export default App;
