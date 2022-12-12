//The URIs of the REST endpoint
IUPS = "https://prod-27.ukwest.logic.azure.com:443/workflows/ccb7cbc44b1c48849f8dfa011c93a8a1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uAAlRYnK3eOBbfojGMCROjTr_G_rkyd0f4rg8Shk9Qo";
RAI = "https://prod-11.ukwest.logic.azure.com:443/workflows/622f72f19d6843fcb184e5dd3d5b6a87/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fkjvCVBzS2ZKnVc1DHO_rai6ZJu_aEeLzvvDkVYBYtQ";
SIGNIN = "https://prod-27.ukwest.logic.azure.com:443/workflows/ed03de6146d747da9f037fa127d26e48/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0qyxzkvaqIjOjfl89V9UJb_62OeCeoD9rcYNizBkUk4";
SIGNUP = "https://prod-01.ukwest.logic.azure.com:443/workflows/7ad7d4f361294be8b43f15017d8f9cd1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KOTcR6HGxS7T7TrB8Zsp41V3OnmEznbkuHfv68jUxNY";
BLOB_ACCOUNT = "https://blobforcna.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });

  //Handler for the new asset submission button
  $("#upload").click(function () {

    //Execute the submit new asset function
    upload();

  });
  $("#login").click(function () {

    //Execute the submit new asset function
    login();

  });

  $("#signup").click(function () {

    //Execute the submit new asset function
    signup();

  });

});

function enctypepassword(pass_word) {

}

//A function to submit a new asset to the REST endpoint 
function upload() {
  if (!($('#filename').val()) || !($('#description').val()) || !($("#video")[0].files[0]) || !($("#cover")[0].files[0])) {
    alert('check your input');
    return;
  }
  $('#test').html('<div ><img src="file/loading.gif" class="figure-img img-fluid rounded" width="100" height="100"><span>uploading</span></div>');

  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('filename', $('#filename').val());
  submitData.append('description', $('#description').val());
  submitData.append('username', String(sessionStorage.getItem("username")));
  submitData.append('agerank', $('#agerank').val());
  submitData.append('video', $("#video")[0].files[0]);
  submitData.append('cover', $("#cover")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (result) {
      $('#test').empty();
      $('#test').html('<div ><span>' + result + '</span>' + '<img src="file/ninja-slayer-ninja.gif" class="figure-img img-fluid rounded" width="100" height="100">' + '</div>');

    }
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(RAI, function (data) {
    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      // items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />")
      items.push("<video width='720'  controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video> <br />")
      items.push("File : " + val["fileName"] + "<br />");
      items.push("description: " + val["description"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");
      items.push("<hr />");
    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });
}

function login() {
  if (!($('#username').val()) || !($('#password').val())) {
    alert('check your input');
    return;
  }
  submitData = new FormData();
  submitData.append('username', $('#username').val());
  submitData.append('password', $('#password').val());

  $.ajax({
    url: SIGNIN,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (result) {
      sessionStorage.setItem("username", $('#username').val())
      if (result == 'updater') {
        window.location.href = ("upload_page.html");
      }
      if (result == 'costomer') {
        window.location.href = ("index.html");
      }
      // $('#test').empty();
      // $('#test').html('<div ><span>' + result + 'Domo,' + sessionStorage.getItem("username") + '= SAN, Ninja Slayer desu </span>' + '<img src="file/ninja-slayer-ninja.gif" class="figure-img img-fluid rounded" width="100" height="100">' + '</div>');
    },
    error: function (result) {
      $('#test').empty();
      $('#test').html('<div ><span>' + result + 'You are not Ninja!' + ' </span></div>');
    },
  });

}

function signup() {
  if (!($('#username').val()) || !($('#password').val()) || !($('#repassword').val())) {
    alert('check your input');
    return;
  }
  if (String($('#password').val()).length < 6) {
    $('#test').empty();
    $('#test').html('<div ><span>' + 'check your password lenth' + ' </span></div>');
    return;
  }

  if ($('#password').val() != $('#repassword').val()) {
    $('#test').empty();
    $('#test').html('<div ><span>' + 'The two entered passwords do not match' + ' </span></div>');
    return;
  }

  submitData = new FormData();
  submitData.append('username', $('#username').val());
  submitData.append('password', $('#password').val());

  $.ajax({
    url: SIGNUP,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (result) {
      $('#test').empty();
      $('#test').html('<div ><span>' + result + ' </span>' + '<img src="file/ninja-slayer-ninja.gif" class="figure-img img-fluid rounded" width="100" height="100">' + '</div>');
    },
    error: function (result) {
      $('#test').empty();
      $('#test').html('<div ><span>' + 'You are not Ninja!' + ' </span></div>');
    },
  });
}

function select_age(age) {
  $('#agerank').val(age);
}