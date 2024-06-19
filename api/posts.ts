import { getDatabase, ref, child, get } from "firebase/database";

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
    const results = snapshot.val() || [];
    const transformedData = results.map(
      ({ likes = {}, comments = {}, ...restPost }) => ({
        ...restPost,
        likesCount: Object.keys(likes).length,
        commentsCount: Object.keys(comments).length,
      })
    );
    return transformedData;
  } else {
    return [];
  }
}
