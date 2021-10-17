import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../interfaces/user";
import {
  FUM_CONFIG_DOCUMENT,
  FUM_USERS_COLLECTION,
  MEMORY,
  REGIONS,
} from "../constants";
import { ProjectConfig } from "../interfaces/project-config";

export const authUserCreated = functions
  .region(...REGIONS)
  .runWith({ memory: MEMORY })
  .auth.user()
  .onCreate(async (u: any, c: any) => {
    const user: User = {
      email: u.email ?? "",
      id: u.uid,
      name: u.displayName ?? u.email ?? "",
      permissions: u.customClaims?.permissions ?? [],
      roles: u.customClaims?.roles ?? [],
      organizationsIds: u.customClaims?.organizationsIds ?? [],
      teamsIds: u.customClaims?.teamsIds ?? [],
    };

    const config = (
      await admin.firestore().doc(FUM_CONFIG_DOCUMENT).get()
    ).data() as ProjectConfig;

    if (!config?.auth?.registerEnabled) return admin.auth().deleteUser(u.uid);

    return admin.firestore().doc(`${FUM_USERS_COLLECTION}/${u.uid}`).set(user);
  });
