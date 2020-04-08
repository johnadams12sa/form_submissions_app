function validateForm(){
  var x = document.forms["simple_form"]["user_name"].value;
  if (x === ""){
    alert("Name is a required field");
    return false;
  }
}
