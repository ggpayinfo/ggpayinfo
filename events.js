

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

$(document).ready(function () {
    let MarkerInfo = {
      Center: null,
      Markers: null
    };
    function SearchStart() {

      const keyword = $("#keyword").val();
      ClearMarkers(MarkerInfo.Markers);
      MarkerInfo.Markers = new Array();

      SearchCategory(keyword, function (data) {
        stores = data.documents;
        let percentage = 0.0;
        let count = 0;
        
        $("#progress-bar").css("width", `${percentage}%`);
        $("#progress-bar").text(`${percentage}%`);

        stores.forEach(function (value, index, array) {
          let location = value.road_address_name.split(' ');
          location.shift();
          location = location.join(' ');
          const storeName = value.place_name.split(' ')[0];
          Search(location, storeName, function (data) {
            count++;
            if (data.RESULT != undefined) {
              // do nothing
            }else{
                data.RegionMnyFacltStus[1].row.forEach(function (value, index, array) {
                    MarkerInfo.Markers.push(GetMarker(map, value));
                  });
      
            }


            let boundary = SetMarkers(map, MarkerInfo.Markers);
            percentage = (count / (stores.length)) * 100.0;
            percentage = Math.round(percentage*100)/100;
            $("#progress-bar").css("width", `${percentage}%`);
            $("#progress-bar").text(`${percentage}%`);
            if(percentage == 100.0){
                SetCenter(map, boundary);
            }
            

          });


        });
      });
    }
    $("#keyword").keydown(
      function (event) {
        if (event.which == '13') {
          event.preventDefault();
          SearchStart();

          return false;
        }
      });
    $("#search").click(SearchStart);
  });

  