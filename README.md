# Deployment

## Start your Firebase project

- Create a Firebase project (Blaze billing plan required)
- Create a Firestore instance

## Generate private key

- Open Firebase Console > Project Settings > Service Accounts > Generate new Private key
- Download the file, rename it to `key.json` and place it under /scripts


## Bootstrap

- Run `cd scripts`
- Change the `data.json` file as needed
- Run `npm i`
- Run `npm start`


## Deploy Functions and Firestore

- In the root directory, run `firebase projects:addfirebase <PROJECTID>`
- Run `cd functions`
- Run `npm i`
- Run `cd ..`
- Run `firebase deploy`
