import { useEffect, useState } from "react";
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
  const apiUrl = "https://jsonplaceholder.typicode.com/comments";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/${randomCommentId}`);
        const userData = await response.json();
        console.log("Random Data:", userData);
        setData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [randomCommentId]);

  return (
    <>
      <button onClick={() => setRandomCommentId((prev) => prev + 1)}>
        Fetch Data {randomCommentId}
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
