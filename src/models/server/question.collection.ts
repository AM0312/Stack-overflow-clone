import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "@/models/name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.delete("users"),
    Permission.update("users"),
  ]);
  console.log(`Collection ${questionCollection} created`);

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      1000,
      true
    ),
    databases.createStringAttribute(db, questionCollection, "author", 50, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      100,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      100,
      true
    ),
  ]);
  console.log(`Attributes for ${questionCollection} created`);

  //   await Promise.all([
  //     databases.createIndex(
  //       db,
  //       questionCollection,
  //       "title",
  //       IndexType.Fulltext,
  //       ["title"],
  //       ["asc"]
  //     ),
  //     databases.createIndex(
  //       db,
  //       questionCollection,
  //       "content",
  //       IndexType.Fulltext,
  //       ["content"],
  //       ["asc"]
  //     ),
  //   ]);
}
