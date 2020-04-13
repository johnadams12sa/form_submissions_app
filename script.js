function validateForm(){
  var x, text;
  x = document.forms["simple_form"]["user_name"].value;
  text = "";
  if (x === ""){
    alert("Name is a required field");
  }
  else{
    text = "";
  }
  document.getElementById("name_validator").innerHTML = text;
}
