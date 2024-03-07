interface User {
  name: string;
  email: string;
}

function saveUserToDatabase(user: User) {
  console.log(user);
  console.log('Branch develop');
}

saveUserToDatabase({
  name: 'Daniel Lucas',
  email: 'daniel@exemple.com',
});
