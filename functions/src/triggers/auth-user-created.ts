import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../interfaces/user";
import { FUM_USERS_COLLECTION } from "../constants";

export default functions.auth.user().onCreate((u, c) => {
  const user: User = {
    email: u.email ?? "",
    id: u.uid,
    name: u.displayName ?? u.email ?? "",
    permissions: [],
    role: u.customClaims?.role,
    organizationsIds: [],
    teamsIds: [],
  };

  return admin.firestore().doc(`${FUM_USERS_COLLECTION}/${u.uid}`).set(user);
});
