IUPS = "https://prod-27.ukwest.logic.azure.com:443/workflows/ccb7cbc44b1c48849f8dfa011c93a8a1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uAAlRYnK3eOBbfojGMCROjTr_G_rkyd0f4rg8Shk9Qo";
RAI = "https://prod-11.ukwest.logic.azure.com:443/workflows/622f72f19d6843fcb184e5dd3d5b6a87/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fkjvCVBzS2ZKnVc1DHO_rai6ZJu_aEeLzvvDkVYBYtQ";
SIGNIN = "https://prod-27.ukwest.logic.azure.com:443/workflows/ed03de6146d747da9f037fa127d26e48/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0qyxzkvaqIjOjfl89V9UJb_62OeCeoD9rcYNizBkUk4";
SIGNUP = "https://prod-01.ukwest.logic.azure.com:443/workflows/7ad7d4f361294be8b43f15017d8f9cd1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KOTcR6HGxS7T7TrB8Zsp41V3OnmEznbkuHfv68jUxNY";
DELETEV = "https://prod-13.ukwest.logic.azure.com:443/workflows/60acbb946f2a4dbf9716b79e80cbf840/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vV9nhjRp9cSoNvpNlYigdRGe8ssd4RoZb3KYhnlF0V0";
SUBMIT_COMMENT = "https://prod-12.ukwest.logic.azure.com:443/workflows/3445edb1f5084be3b3b0b5530eb5b512/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Sdul9ecKlvl1rvOJ-nmolBldPFRaziD2OTJkA77aGxc";
RETURN_COMMENT = "https://prod-27.ukwest.logic.azure.com:443/workflows/de919817e73842dd8105f25b0b7b676b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ddDZMApDQPkishawhkLF5umcycb5-9RaBAgzZvxzijY";
BLOB_ACCOUNT = "https://blobforcna.blob.core.windows.net";



$(document).ready(function () {
    if (String(sessionStorage.getItem("username")) != "null") {
        $('#username_div').empty();
        $('#username_div').html('<div ><span>' + 'Domo,' + sessionStorage.getItem("username") + '</span>' + '<img src="file/ninja-slayer-ninja.gif" class="figure-img img-fluid rounded" width="100" height="100"><br><button type="button" id="sign out" onclick="sign_out()" class="btn btn-primary">sign out</button>' + '</div>');
    }
    getvideo();
});

var result_from_server;

function sign_out() {
    sessionStorage.clear();
    window.location.href = ("/");
}

function getvideo() {

    //Replace the current HTML in that div with a loading message
    $('#VideoList').html('<div ><img src="file/loading.gif" class="figure-img img-fluid rounded" width="100" height="100"></div>');
    $.getJSON(RAI, function (data) {
        //Create an array to hold all the retrieved assets
        var items = [];
        result_from_server = data;
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each(data, function (key, val) {
            items.push("<hr />");
            items.push("" + val["fileName"] + "<br />");
            //items.push("<video width='720'  controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video> <br />");
            items.push('<img onclick = "show_detail(' + "'" + val['id'] + "'" + ')"' + " src='" + BLOB_ACCOUNT + val["fileCoverPath"] + "' width='400' height='300'  /> <br />");
            //items.push("description: " + val["description"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + "<br />");
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

function subit_commit(id) {

    if (String(sessionStorage.getItem("username")) == "null") {
        alert('please login');
        return;
    }
    if (!($('#commit').val())) {
        alert('check your input');
        return;
    }
    submitData = new FormData();
    submitData.append('id', id);
    submitData.append('username', String(sessionStorage.getItem("username")));
    submitData.append('commit', $('#commit').val());


    $.ajax({
        url: SUBMIT_COMMENT,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (result) {
            //$('#test').empty();
            //$('#test').html('<div ><span>' + 'submit success' + '</span>' + '<img src="file/ninja-slayer-ninja.gif" class="figure-img img-fluid rounded" width="100" height="100">' + '</div>');
            //setTimeout(show_detail(id), 3000);
            show_detail(id);

        }
    });
}

function show_detail(id) {
    submitData = new FormData();
    var items = []
    $.each(result_from_server, function (key, val) {
        if (val['id'] == id) {
            submitData.append('videoid', val['id']);
            items.push("<hr />");
            items.push('<button type="button" id="back" onclick="getvideo()" class="btn btn-primary">back</button></br>');
            items.push("" + val["fileName"] + "<br />");
            items.push("<video width='720'  controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video> <br />");
            items.push("description: " + val["description"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + "<br />");
            items.push('send commit:</br>');
            items.push('<textarea id="commit" rows="5" cols="80"></textarea><br>');
            items.push('<button type="button" id="submit_commit" onclick="subit_commit(' + "'" + val['id'] + "'" + ')" class="btn btn-primary">submit_commit</button></br>');
            items.push('<div id="test"></div>')
        }
    });


    $.ajax({
        url: RETURN_COMMENT,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (result) {
            var items1 = [];
            items1.push("Commits:")
            $.each(result, function (key, val) {
                items1.push("<hr />");
                items1.push(val["username"] + " : " + val["commit"] + "<br />");
                items1.push("<hr />");
            });
            $("<ul/>", {
                "class": "my-new-list",
                html: items1.join("")
            }).appendTo("#VideoList");
        },
        error: function (result) {
            $('#test').empty();
            $('#test').html('<div ><span>' + 'read commit failed' + ' </span></div>');
        },
    });

    items.push("<hr />");
    //Clear the assetlist div
    $('#VideoList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
    }).appendTo("#VideoList");
}

function search_video() {
    $('#VideoList').html('<div ><img src="file/loading.gif" class="figure-img img-fluid rounded" width="100" height="100"></div>');
    $.getJSON(RAI, function (data) {
        //Create an array to hold all the retrieved assets
        var items = [];
        search = false;
        result_from_server = data;
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each(data, function (key, val) {
            if (String(val['fileName']).search(String($('#search').val())) != -1) {
                items.push("<hr />");
                items.push("Uploaded by: " + val["userName"] + "<br />");
                //items.push("<video width='720'  controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video> <br />");
                items.push('<img onclick = "show_detail(' + "'" + val['id'] + "'" + ')"' + " src='" + BLOB_ACCOUNT + val["fileCoverPath"] + "' width='400' height='300'  /> <br />");
                //items.push("description: " + val["description"] + "<br />");

                items.push("" + val["fileName"] + "<br />");
                items.push("<hr />");
                search = true;
            }
        });
        //Clear the assetlist div
        if (search == false) getvideo();
        items = reverse_array(items);
        $('#VideoList').empty();
        //Append the contents of the items array to the ImageList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#VideoList");
    });
}

function reverse_array(array) {
    var smeti = [];
    var i = 0;
    while (i < array.length) {
        smeti.unshift(array[i]);
        i++;
    }
    return smeti;
}