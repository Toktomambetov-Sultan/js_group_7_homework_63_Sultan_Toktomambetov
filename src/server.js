import Axios from "axios";

export const Server = {
  addNewPost: async ({ title, subject }) => {
    const currentDate = new Date();
    await Axios.post(
      "https://quickstart-1598216036127.firebaseio.com/postsList.json",
      { title, date: currentDate.toJSON(), id: currentDate.getTime() }
    );
    await Axios.post(
      "https://quickstart-1598216036127.firebaseio.com/SubjectsList.json",
      {
        title,
        subject,
        date: currentDate.toJSON(),
        id: currentDate.getTime(),
      }
    );
  },
  getPosts: async () => {
    return (await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/postsList.json"
    )).data;
  },
  getPathById: async id => {
    const params = new URLSearchParams({
      orderBy: '"id"',
      limitToFirst: 1,
      startAt: id,
    });
    const subjectPath = await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/SubjectsList.json?" +
        params.toString()
    );
    const postPath = await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/postsList.json?" +
        params.toString()
    );
    return {
      post: Object.keys(postPath.data)[0],
      subject: Object.keys(subjectPath.data)[0],
    };
  },
  getSubjectById: async function(id) {
    const { subject: path } = await this.getPathById(id);
    return (await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/SubjectsList/" +
        path +
        ".json"
    )).data;
  },
  deletePostById: async function(id) {
    const { subject, post } = await this.getPathById(id);

    await Axios.delete(
      "https://quickstart-1598216036127.firebaseio.com/SubjectsList/" +
        subject +
        ".json"
    );
    await Axios.delete(
      "https://quickstart-1598216036127.firebaseio.com/postsList/" +
        post +
        ".json"
    );
  },
};
