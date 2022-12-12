IUPS = "https://prod-27.ukwest.logic.azure.com:443/workflows/ccb7cbc44b1c48849f8dfa011c93a8a1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uAAlRYnK3eOBbfojGMCROjTr_G_rkyd0f4rg8Shk9Qo";
RAI = "https://prod-11.ukwest.logic.azure.com:443/workflows/622f72f19d6843fcb184e5dd3d5b6a87/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fkjvCVBzS2ZKnVc1DHO_rai6ZJu_aEeLzvvDkVYBYtQ";
SIGNIN = "https://prod-27.ukwest.logic.azure.com:443/workflows/ed03de6146d747da9f037fa127d26e48/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0qyxzkvaqIjOjfl89V9UJb_62OeCeoD9rcYNizBkUk4";
SIGNUP = "https://prod-01.ukwest.logic.azure.com:443/workflows/7ad7d4f361294be8b43f15017d8f9cd1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KOTcR6HGxS7T7TrB8Zsp41V3OnmEznbkuHfv68jUxNY";
DELETEV = "https://prod-13.ukwest.logic.azure.com:443/workflows/60acbb946f2a4dbf9716b79e80cbf840/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vV9nhjRp9cSoNvpNlYigdRGe8ssd4RoZb3KYhnlF0V0";
BLOB_ACCOUNT = "https://blobforcna.blob.core.windows.net";



$(document).ready(function () {
    getvideo();

});


function getvideo() {

    //Replace the current HTML in that div with a loading message
    $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    $.getJSON(RAI, function (data) {
        //Create an array to hold all the retrieved assets
        var items = [];

        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each(data, function (key, val) {
            items.push("<hr />");
            // items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />")
            items.push("<video width='720'  controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video> <br />");
            items.push("File : " + val["fileName"] + "<br />");
            items.push("description: " + val["description"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + "<br />");

            items.push("<button type = 'button' class='btn btn-primary' onclick='delete_video(" + '"' + val["id"] + '"' + ")' > Delete</button>");
            items.push("<hr />");
        });
        //Clear the assetlist div
        $('#VideoList').empty();
        //Append the contents of the items array to the ImageList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#VideoList");
    });
}

function delete_video(id) {

    submitData = new FormData();
    submitData.append('id', id);
    $.ajax({
        url: DELETEV,
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