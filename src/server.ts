interface User {
  name: string;
  email: string;
}

function saveUserToDatabase(user: User) {
  console.log(user);
}

saveUserToDatabase({
  name: 'Daniel Lucas',
  email: 'daniel@exemple.com',
});
