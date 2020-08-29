import axiosOrders from "./containers/axiosOrders";

export const Server = {
  addNewPost: async ({ title, subject }) => {
    const currentDate = new Date();
    await axiosOrders.post("/postsList.json", {
      title,
      date: currentDate.toJSON(),
      id: currentDate.getTime(),
    });
    await axiosOrders.post("/SubjectsList.json", {
      title,
      subject,
      date: currentDate.toJSON(),
      id: currentDate.getTime(),
    });
  },
  getPosts: async () => {
    return (await axiosOrders.get("/postsList.json")).data;
  },
  getPathById: async id => {
    const params = new URLSearchParams({
      orderBy: '"id"',
      limitToFirst: 1,
      startAt: id,
    });
    const subjectPath = await axiosOrders.get(
      "/SubjectsList.json?" + params.toString()
    );
    const postPath = await axiosOrders.get(
      "/postsList.json?" + params.toString()
    );
    return {
      post: Object.keys(postPath.data)[0],
      subject: Object.keys(subjectPath.data)[0],
    };
  },
  getSubjectById: async function(id) {
    const { subject: path } = await this.getPathById(id);
    return (await axiosOrders.get("/SubjectsList/" + path + ".json")).data;
  },
  deletePostById: async function(id) {
    const { subject: subjectPath, post: postPath } = await this.getPathById(id);
    await axiosOrders.delete("/SubjectsList/" + subjectPath + ".json");
    await axiosOrders.delete("/postsList/" + postPath + ".json");
  },
  updatePostById: async function(id, { title, subject }) {
    const { subject: subjectPath, post: postPath } = await this.getPathById(id);
    const currentDate = new Date();
    console.log(subject);
    await axiosOrders.put("/SubjectsList/" + subjectPath + ".json", {
      title,
      subject,
      date: currentDate.toJSON(),
      id: currentDate.getTime(),
    });
    await axiosOrders.put("/postsList/" + postPath + ".json", {
      title,
      date: currentDate.toJSON(),
      id: currentDate.getTime(),
    });
  },
};
