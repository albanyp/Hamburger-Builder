import axios from "axios";

const Instance = axios.create({
  baseURL: "https://hamburger-builder-f0972.firebaseio.com/",
});

export default Instance;
