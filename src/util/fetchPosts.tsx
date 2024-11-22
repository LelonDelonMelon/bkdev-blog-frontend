import axios from "axios";
import PostData from "../types/Post";

const fetchPosts = async (): Promise<PostData[]> => {
  try {
    const response = await axios.get("http://localhost:3000/post");
    // console.log("Res", response);
    const posts = response.data as PostData[];
    return posts;
  } catch (e) {
    console.log("Error occurred", e);
    throw e;
  }
};
export default fetchPosts;
