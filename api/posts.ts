import { reverseObject } from "@/utils/common";
import { getDatabase, ref, child, get, update, push } from "firebase/database";

export type RawPostType = {
  author: {
    name: string;
    photo: string;
  };
  likes: Record<number, string>;
  comments: Record<number, string>;
  content: string;
  createdAt: string;
};

export type PostType = {
  author: {
    name: string;
    photo: string;
  };
  likesCount: number;
  commentsCount: number;
  content: string;
  createdAt: string;
};

export async function getPosts(): Promise<PostType[]> {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `posts`));
  if (snapshot.exists()) {
    const results = snapshot.val() || {};
    const transformedData = Object.keys(results).map((key) => {
      const { likes = {}, comments = {}, ...restPost } = results[key];

      return {
        ...restPost,
        likesCount: Object.keys(likes).length,
        commentsCount: Object.keys(comments).length,
      };
    });
    return transformedData;
  } else {
    return [];
  }
}

export async function createPost({ displayName, photoURL, content }) {
  const db = getDatabase();

  const postData: RawPostType = {
    author: {
      name: displayName,
      photo: photoURL,
    },
    content,
    likes: {},
    comments: {},
    createdAt: new Date().toISOString(),
  };

  const newPostKey = await push(child(ref(db), "posts")).key;
  const updates = {};
  updates["/posts/" + newPostKey] = postData;

  return await update(ref(db), updates);
}
