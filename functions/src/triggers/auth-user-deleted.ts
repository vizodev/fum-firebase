import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FUM_USERS_COLLECTION } from "../constants";

export default functions.auth.user().onDelete((u: any, c: any) => {
  return admin
    .firestore()
    .doc(`${FUM_USERS_COLLECTION}/${u.uid}`)
    .delete()
    .catch(() => {});
});
