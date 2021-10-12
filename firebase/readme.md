

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

