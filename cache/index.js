import { createClient } from "redis";

const Cache_Server = () => {
  const client = createClient();

  client.on("error", () => {
    console.log("Encountered error");
  });

  client.on("connect", () => {
    console.log("Client connected start query");
  });
};

export default Cache_Server;
