import * as functions from "firebase-functions";
import { FUM_USERS_COLLECTION } from "../constants";
import * as admin from "firebase-admin";

export default functions.firestore
  .document(`${FUM_USERS_COLLECTION}/{userId}`)
  .onDelete((change, ctx) =>
    admin
      .auth()
      .deleteUser(ctx.params.userId)
      .catch(() => {})
  );
