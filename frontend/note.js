var db = null;
    //var baseUrl = "http://localhost:8080";

   var baseUrl= "http://18.219.97.196:8080";
connectToDB = function () {
  db = window.openDatabase('Cmpe280', '1.0', 'Health Camp Database', 3 * 1024 * 1024);
};

createTable = function () {
  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS health (Name TEXT, Age INTEGER, Gender TEXT, Photo VARBINARY, Medics TEXT, Notes TEXT)", [],
      function () { alert('Health database created successfully!'); },
      function (tx, error) { alert(error.message); });
  });
};

saveDemo = function (Name, Age, Gender, img) {
  localStorage.setItem('Name', Name);
  localStorage.setItem('Age', Age);
  localStorage.setItem('Gender', Gender);
  bannerImage = document.getElementById('canvas');
  imgData = getBase64Image(bannerImage);
  console.log(imgData)
  localStorage.setItem("image", imgData);

};

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

saveVitals = function (Medics, Notes) {
  var Name = localStorage.getItem('Name');
  var Age = localStorage.getItem('Age');
  var Gender = localStorage.getItem('Gender');

  var img = localStorage.getItem('image');
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO health (Name, Age, Gender, Photo, Medics, Notes) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, Age, Gender, img, Medics, Notes],
      function () {
      },
      function (tx, error) { alert(error.message); }
    );
  });
  const data = {
    name: Name,
    age: Age,
    gender: Gender,
    image: img, 
    medics: Medics,
    notes: Notes
  }
  console.log(data)

  axios.defaults.withCredentials = true;
  console.log("in frontend before axios");
  axios.post(baseUrl+'/users/adduser', data)

  // axios.post('http://localhost:8080/users/adduser', data)
    .then(response => {
      console.log("in frontend after response");
      console.log("response" + response.data.result)
      if (response.data.result) {
        // alert("data inserted")
      } else if (response.data.error) {
        alert("error" + response.data.error)
      }
    })

};

fetchData = function () {
  db.transaction(function (tr) {
    tr.executeSql("SELECT Name,Age,Gender,Photo,Medics,Notes FROM health", [],
      function (trans, data) {
      },
      function (tx, error) { alert(error.message); });
  });

  axios.defaults.withCredentials = true;
  console.log("in frontend before axios");
  axios.get(baseUrl+'/users')

  // axios.get('http://localhost:8080/users')
    .then(response => {
      console.log("in frontend after response");
      console.log(response.data.result)
      if (response.data.result) {
        for (var i = 0; i < response.data.result.length; i++) {
          $(`#myTableRow${i}`).remove();
        }
        for (var i = 0; i < response.data.result.length; i++) {
          var row = response.data.result[i];
          var Name = row['name'];
          var Age = row['age'];
          var image = row['image'];
          var Gender = row['gender'];
          var Medics = row['medics'];
          var Notes = row['notes'];
          $('#table_details').append(`<tr id="myTableRow${i}"><td>${Name}</td>
                              <td>${Age}</td>
                              <td>${Gender}</td>
                              <td><center><img src=data:image/png;base64,${image} style="width:120px; height:90px"></center></td>                              <td>${Medics}</td>
                              <td>${Notes}</td></tr>`);
        }
        // alert("data retrieved")
      } else if (response.data.error) {
        alert("error" + response.data.error)
      }
    })
};

$(function () {
  connectToDB();
  createTable();


  $("#vit").click(function () {
    var Medics = $('#Medics').val();
    var Notes = $('#Notes').val();
    saveVitals(Medics, Notes);

  });

  $("#save").click(function () {
    var Name = $('#Fname').val();
    var Age = $('#Age').val();
    var Gender = $('#Gender').find(':selected').val();
    var img = $('#photo').attr('src');
    saveDemo(Name, Age, Gender, img);
  });
});
