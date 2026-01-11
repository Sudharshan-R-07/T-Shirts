var admin = require("firebase-admin");

var serviceAccount = require("../cred/servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("🔥 Firebase initialized");

