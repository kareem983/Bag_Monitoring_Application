var bag_id = GetPluginParameterValue('InputText 2', 'Text');
var user_password = GetPluginParameterValue('InputText 3', 'Text');

console.log("Bag ID ", bag_id);
console.log("Password: ", user_password);

var login_query = "SELECT  `TimeStamp`,`Bag_Person_Name`,`Bag_ID`,`E_mail`,`Phone`,`Password` FROM `APPLICATION_1341` WHERE `Bag_ID`= ' " + bag_id + "' AND `Password`= '" + user_password + "'";



//************* Start Set Query Parameter Value  For Grid 1 ************ 

ExecuteQueryModified(login_query, Grid_1_callbackFunc, 'Grid 1');

function Grid_1_callbackFunc(error, xhr) {
  if (xhr.response) {
    Grid_1DataArr = JSON.parse(xhr.response);

    if (Grid_1DataArr.length == 1 && Grid_1DataArr[0].Bag_ID == bag_id &&
      Grid_1DataArr[0].Password == user_password) {
      var user_name = Grid_1DataArr[0].Bag_Person_Name;
      console.log("response: ", "Success");
      alert("Welcome Back Deer " + user_name + ", You Loged In Successfully");
      go_to_bag_status();
      save_local_storage(user_name);

    } else {
      console.log("response: ", "Wrong");
      alert("Bag Id Or Password is wrong, Please try Again");
    }


    SetPluginParameterValue('Grid 1', 'SQL query statement', Grid_1DataArr);
    DrawPlugin('Grid 1');

  }
}

//***************** End Set Query Parameter  ************** 


function go_to_bag_status() {

  window.location.replace("https://learning.masterofthings.com/rte.html?project=4803&page=15&bag_id=" + bag_id);

}

function save_local_storage() {
  localStorage.clear();
  localStorage.setItem(bag_id, user_password);

}