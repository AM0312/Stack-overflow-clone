import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";
import env from "@/app/env";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.project)
  .setKey(env.appwrite.api_key);

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, avatars, databases, storage, users };
