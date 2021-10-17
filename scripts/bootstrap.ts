import {
  FUM_USERS_COLLECTION,
  FUM_CONFIG_DOCUMENT,
  FUM_PERMISSIONS_DOCUMENT,
  FUM_ROLES_DOCUMENT,
} from "../functions/src/constants";

import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(require("./key.json")),
});

async function writeData() {
  const { permissions, roles, config } = require("./data.json");

  console.log(permissions, roles, config);

  await admin.firestore().doc(`${FUM_ROLES_DOCUMENT}`).set({ roles });

  await admin.firestore().doc(`${FUM_CONFIG_DOCUMENT}`).set({ ...config });

  await admin
    .firestore()
    .doc(`${FUM_PERMISSIONS_DOCUMENT}`)
    .set({ permissions });

  await createSuperAdmin("a@a.com", "123456");
}

function createSuperAdmin(email: string, password: string) {
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
          .update({ roles: ["superadmin"] });
        res(true);
      }, 3000);
    } catch (error) {
      rej(error);
    }
  });
}

//writeData();


function getUser(email: string) {
    return admin.auth().getUserByEmail(email).then(console.log)
}

//getUser('a@a.com');