import * as functions from "firebase-functions";
import { FUM_USERS_COLLECTION } from "../constants";
import * as admin from "firebase-admin";

export default functions.firestore
  .document(`${FUM_USERS_COLLECTION}/{userId}`)
  .onDelete((change: any, context: any) =>
    admin
      .auth()
      .deleteUser(context.params.userId)
      .catch(() => {})
  );
