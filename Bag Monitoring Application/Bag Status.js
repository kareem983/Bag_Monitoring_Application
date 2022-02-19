const query = window.location.search;
const urlParams = new URLSearchParams(query);
const bag_id = urlParams.get('bag_id');

if (bag_id == null) {
  alert("Please You want to log in first!!");
  window.location.replace("https://learning.masterofthings.com/rte.html?project=4803&page=13");
} else {
  //alert("The Bag_ID: " + bag_id);

  set_bag_statue(bag_id);
}



function set_bag_statue(bag_id) {

  var history_query = "SELECT `TimeStamp`, `lng` as `Lng`,`lat` as `Lat`,`lux` FROM `GROUP_" + bag_id + "` WHERE `TimeStamp` = (SELECT MAX(`TimeStamp`) FROM `GROUP_" + bag_id + "`)";


  ExecuteQueryModified(history_query, Map_1_callbackFunc, 'Map 1');

  function Map_1_callbackFunc(error, xhr) {
    if (xhr.response) {
      Map_1DataArr = JSON.parse(xhr.response);
      console.log("response", Map_1DataArr);
      var lux_value = Map_1DataArr[0].lux;
      if (lux_value >= 0 && lux_value <= 20) {
        SetPluginParameterValue('Map 1', 'Marker URL', 'https://cdn.pixabay.com/photo/2019/12/31/08/04/flat-design-4731429_1280.png');
        DrawPlugin('Map 1');
      } else {
        SetPluginParameterValue('Map 1', 'Marker URL', 'https://iconarchive.com/download/i51985/robinweatherall/library/bag.ico');
        DrawPlugin('Map 1');
      }


      SetPluginParameterValue('Map 1', 'SQL query statement', Map_1DataArr);
      DrawPlugin('Map 1');

    }
  }


}