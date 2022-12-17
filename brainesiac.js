  const DD = "https://sheets.googleapis.com/$discovery/rest?version=v4";
  const API_KEY = "AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU";
  const CLIENT_ID = '192901857564-v2nbtq9h4f1sr3q55e1gv8oi3nahu8me.apps.googleusercontent.com';
  var tokenClient;
  var access_token;

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

function rebuildLists(id){
  item = document.getElementById(id);
  par = item.parentElement;
  ul = document.getElementById("ulist");
  pl = document.getElementById("plist");
  state = item.checked;
  if (state == true){
    pl.appendChild(par);
  }else{
    ul.appendChild(par);
  }
}

function addOnClickToElement(checkbox,value,id) {  // Note this is a function
checkbox.onclick = async function(){ await handleAuthClick(value,id); rebuildLists(id) };
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
    var ulist = document.createElement('ul');
    ulist.id = "ulist";
    var plist = document.createElement('ul');
    plist.id = "plist";
    var keys = glist.values.shift();
    for (g in glist.values){
      var item = document.createElement('li')
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "listitem"
      checkbox.value = g;
      checkbox.name = glist.values[g][0];
      checkbox.id = glist.values[g][0];
      checkbox.disabled = "true";
      //checkbox.onclick = function(checkbox) {console.log(checkbox); execute(checkbox.value,checkbox.id);};
      addOnClickToElement(checkbox,g,glist.values[g][0])
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
      document.getElementById(pl[p]).checked = true;
    };
  }
  goodlist();
}

function changeVal(value,id){
  adjloc = +value+2;
  state = document.getElementById(id).checked;
  loc = "giftList!D"+adjloc
  ud = {range : loc,
        st : state};
  return ud
}

function getData(loc){
  base = "https://sheets.googleapis.com/v4/spreadsheets/1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk/values/"
  key = "?key=AIzaSyBBcqHGTovM9CdcugNAzUClafSxKUxxMNU"
  url = base +loc+key
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

function enableboxes(){
 boxes = document.getElementsByClassName("listitem")
  for (i in boxes){
    if (boxes[i].id != null){
    el = document.getElementById(boxes[i].id).disabled = null
    }
  }
}


// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(val,id) {
  console.log()
  updates = changeVal(val,id)
  return gapi.client.sheets.spreadsheets.values.update({
    "spreadsheetId": "1TQyElcS-lS8pyjHbAuRsnPVkOoOUkK4MwVTHxTXp8Rk",
    "range": updates.range,
    "valueInputOption": "USER_ENTERED",
    "resource": {
      "range": updates.range,
      "majorDimension": "ROWS",
      "values": [
        [
          updates.st
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



function decodeJwtResponse(JWtoken) {
  urlString = "https://oauth2.googleapis.com/tokeninfo?id_token="
  url = urlString + JWtoken
  var decodedToken = fetch(url)
  .then((response) => response.json())
  .then((json) => {return json} )
  .catch(error => console.log(error));
return decodedToken
}

function initClientID(){
  tokenClient =  google.accounts.oauth2.initTokenClient({
  client_id: '192901857564-v2nbtq9h4f1sr3q55e1gv8oi3nahu8me.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  callback: (access_token) => { access_token = tokenClient.access_token;  },             
  });
  enableboxes();
}

function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
  enableboxes();
}

async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DD],
  });
  gapiInited = true;
console.log(gapi.client.getToken())
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    callback: '', // defined later
  });
  gisInited = true;
  console.log(tokenClient)
  enableboxes();
}

function handleAuthClick(val,id) {
  console.log(tokenClient)
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }

    await execute(val,id);
  };

  console.log(gapi.client.getToken())
  console.log(tokenClient)

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
    
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.callback;
  }
  return id
}