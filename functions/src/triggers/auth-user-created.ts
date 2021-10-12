import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../interfaces/user";
import { FUM_USERS_COLLECTION } from "../constants";

export default functions.auth.user().onCreate((u: any, c: any) => {
  const user: User = {
    email: u.email ?? "",
    id: u.uid,
    name: u.displayName ?? u.email ?? "",
    permissions: u.customClaims?.permissions ?? [],
    roles: u.customClaims?.roles ?? [],
    organizationsIds: u.customClaims?.organizationsIds ?? [],
    teamsIds: u.customClaims?.teamsIds ?? [],
  };

  return admin.firestore().doc(`${FUM_USERS_COLLECTION}/${u.uid}`).set(user);
});
