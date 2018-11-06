exports.authenticateUser = async (event, context, callback) => {

    let names = event.request.userAttributes;//.given_name + " " + event.request.family_name;

    if (names != null)
    {
    	//callback(null, names);
    	callback(new Error("Failure to retrieve user's name and family name "));
    }
    else
    {
      //callback(new Error("Failure to retrieve user's name and family name "));
      callback(null, names);
    } 
}
