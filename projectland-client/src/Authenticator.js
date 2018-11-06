import { API } from 'aws-amplify';

showDropdown = async event => {
  //event.preventDefault();

  let names;
  try {
    names = await this.authenticateUser();
  } 
  catch (err) {
    alert(err);
  }

  return names;
}

authenticateUser() {
  return API.get("users", "/profile");
}

