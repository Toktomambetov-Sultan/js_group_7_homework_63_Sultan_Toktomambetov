const { default: Axios } = require("axios");

const axiosOrders= Axios.create({
    baseURL: "https://quickstart-1598216036127.firebaseio.com"
}) ;
export default axiosOrders;