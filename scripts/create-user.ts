import * as admin from "firebase-admin";
import { FUM_USERS_COLLECTION } from "../functions/src/constants";

export default function createUser(
  email: string,
  password: string,
  claims?: {
    roles?: string[];
    permissions?: string[];
    organizations?: string[];
    teams?: string[];
  }
) {
  return new Promise(async (res, rej) => {
    try {
      const { uid } = await admin.auth().createUser({
        email,
        password,
      });
      setTimeout(async () => {
        await admin
          .firestore()
          .collection(`${FUM_USERS_COLLECTION}`)
          .doc(uid)
          .update({ ...claims });
        res(true);
      }, 3000);
    } catch (error) {
      rej(error);
    }
  });
}
