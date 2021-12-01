

Firebase rule for only authenticated users can write (edit, delete, create)
```js
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.auth.uid != null && request.resource.metadata.uid == request.auth.uid;
    }
  }
}
```


Delete an entire folder in firebase
```js
const bucket = admin.storage().bucket();
await bucket.deleteFiles({
   prefix: `${folderName}/`
});

```


Delete one file by its filename
```js
  const fileName = firebaseUrl.slice(firebaseUrl.indexOf('%2F') + 3, firebaseUrl.indexOf('?alt'))

```

