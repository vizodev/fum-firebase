import * as functions from "firebase-functions";
import { FUM_USERS_COLLECTION, MEMORY, REGIONS } from "../constants";
import { AuthUser } from "../interfaces/auth-user";
import { User } from "../interfaces/user";
import * as admin from "firebase-admin";

export const authUserUpdated = functions
  .region(...REGIONS)
  .runWith({ memory: MEMORY })
  .firestore.document(`${FUM_USERS_COLLECTION}/{userId}`)
  .onUpdate((change: any, ctx: any) => {
    const data = change.after.data() as User;

    const authUser: AuthUser = {
      email: data.email,
      id: change.after.id,
      permissions: data.permissions ?? [],
      roles: data.roles ?? [],
      organizationsIds: data.organizationsIds ?? [],
      teamsIds: data.teamsIds ?? [],
    };

    return admin
      .auth()
      .updateUser(authUser.id, { displayName: data.name })
      .then(() => admin.auth().setCustomUserClaims(data.id, authUser));
  });
