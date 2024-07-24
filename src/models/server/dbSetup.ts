import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDb() {
  try {
    await databases.get(db);
    console.log(`Database ${db} connected`);
  } catch (error: any) {
    try {
      await databases.create(db, db);
      console.log(`Database ${db} created`);
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log(`Collections created`);
      console.log(`Database ${db} connected`);
    } catch (error: any) {
      console.error("Error creating database:", error);
    }
  }
  return databases;
}
