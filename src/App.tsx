import { useState } from "react";
import "./App.css";

interface CommentsData {
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
  const apiUrl = "https://jsonplaceholder.typicode.com/comments";

  // useEffect(() => {
  const fetchData = async () => {
    try {
      setIsPending(true);
      const response = await fetch(`${apiUrl}/${randomCommentId}`);
      const userData = await response.json();

      setTimeout(() => {
        console.log("Random Data:", userData);
        setData(userData);
        setIsPending(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsPending(false);
      // }
    } finally {
      // setIsPending(false);
      setRandomCommentId((prev) => prev + 1);
    }
  };

  // fetchData();
  // }, [randomCommentId]);

  return (
    <>
      {/* <button onClick={() => setRandomCommentId((prev) => prev + 1)}> */}
      <button onClick={fetchData}>
        {isPending ? "pending" : `Fetch Data ${randomCommentId}`}
      </button>
      <p>
        <b>{data?.name}</b>
        <br />
        {data?.body}
      </p>
    </>
  );
}

export default App;
