function nav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


function auth () {  
  const loginForm = document.getElementById("login");
  const loginButton = document.getElementById("log");
  const loginErrorMsg = document.getElementById("message");
  // When the login button is clicked, the following code is executed
  //loginButton.addEventListener("click", (e) => {
      // Prevent the default submission of the form
     // e.preventDefault();
      // Get the values input by the user in the form fields
      const username = loginForm.Uname.value;
      const password = loginForm.Pass.value;
  
      if (username === "brainesiac" && password === "brainesiac1234") {
        location.assign("./loggedin.html");
      } else {
          // Otherwise, make the login error message show (change its oppacity)
          loginErrorMsg.textContent  = "Login Failed" ;
      }
}



function giftCheck() {
  loc = "giftList!A1:D10"
  //base = "https://sheets.googleapis.com/v4/spreadsheets/1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk/values/"
  //key = "?key=AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU"
  //url = base+loc+key
  /*var list = fetch(url)
  .then((response) => response.json())
  .then((json) => {console.log(json)} )
  .catch(error => console.log(error));*/
  var pl = [];
  var list = getData(loc)
  const goodlist = async () => {
    const glist = await list;
    console.log(glist);
    var ulist = document.createElement('ul');
    var plist = document.createElement('ul');
    var keys = glist.values.shift();
    console.log(keys)
    for (g in glist.values){
      var item = document.createElement('li')
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.value = g;
      checkbox.name = glist.values[g][0];
      checkbox.id = glist.values[g][0];
      checkbox.onclick = function(){execute();};
      item.appendChild(checkbox);
      var a = document.createElement('a');
      var link = document.createTextNode(glist.values[g][0]+" "+glist.values[g][2])
      a.appendChild(link)
      a.title = glist.values[g][0]
      a.href = glist.values[g][1]
      item.appendChild(a);
      if(glist.values[g][3]=='FALSE'){
      ulist.appendChild(item); 
    }else{
      plist.appendChild(item);
      pl.push(glist.values[g][0])
    }
    document.getElementById("giftList").appendChild(ulist);
    document.getElementById("pList").appendChild(plist);
    }
    for (p in pl){
      console.log(pl[p])
      document.getElementById(pl[p]).checked = true;
    };
  }
  goodlist()
}

function changeVal(value,id){
  adjloc = +value+2;
  console.log(id)
  state = document.getElementById(id).checked;
  loc = "giftList!D"+adjloc
  setData(loc,state)
}

function getData(loc){
  base = "https://sheets.googleapis.com/v4/spreadsheets/1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk/values/"
  key = "?key=AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU"
  url = base +loc+key

  console.log(url)
  let headersList = {
    "Accept": "*/*",
    "method" : "GET"
   }
   var sheet = fetch(url)
   .then((response) => response.json())
   .then((json) => {return json} )
   .catch(error => console.log(error));

  const retdata = async () => {
  const data = await sheet;
  return data
  }
return retdata()
}

function setData(loc,val){
  console.log("message 1")
  base = "https://sheets.googleapis.com/v4/spreadsheets/1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk/values/"
  key = "?key=AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU"
  url = base +loc+key
  let headersList = {
    "Accept": "*/*"
   }
   console.log(url)
  var valBody = {
    "range": loc,
    "majorDimension": "ROWS",
    "values": "["+val+"]"
  };
  /*var params = { "spreadsheetId" : "1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk",
              "range" : loc,
              "valueInputOption" : "USER_ENTERED",
              "valueRangeBody"  : valBody
            };
  */     
  
  console.log(url,{ "method" : "POST" , valBody})

  var sheet = fetch(url,{ "method" : "PUT" , valBody})
  .then((response) => response.json())
  .then((json) => {return json} )
  .catch(error => console.log(error));

  const retdata = async () => {
    const data = await sheet;
    return data
    }
  return retdata()
}



function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU");
  return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.sheets.spreadsheets.values.update({
    "spreadsheetId": "1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk",
    "range": "giftList!D6",
    "valueInputOption": "USER_ENTERED",
    "resource": {
      "range": "giftList!D6",
      "majorDimension": "ROWS",
      "values": [
        [
          "FALSE"
        ]
      ]
    }
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

function loadgapi() {
  gapi.load("client:auth2", function() {gapi.auth2.init({client_id: "192901857564-ed80v40tkh842ir2sp2rbn7i971d2vhj.apps.googleusercontent.com"});
});
}
