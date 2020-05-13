function Search(LocationName, StoreName, callback){

    $.ajax( {
        url : "https://openapi.gg.go.kr/RegionMnyFacltStus", 
        data : {
        Key : "49a924a2211244a6ba764449d0ac9ff1",	
        Type : "json",
        pIndex : 1,
        pSize : 1000,
        CMPNM_NM : StoreName,
        REFINE_LOTNO_ADDR : LocationName,        
        },
        method:"GET",
        dataType:"json"
    }).done(function(data){
        callback(data);
    }).always(function(xhr,status){
        console.log(xhr);
        console.log(status);
    });
  }  
  function ClearMarkers(currentMarkers){
    currentMarkers.forEach(function(marker,index,array){
        marker.setMap(null);
    });      
  }
  function SetMarkers(map, stores, currentMarkers){
    ClearMarkers(currentMarkers);
    currentMarkers = new Array();
    let latAvg = 0.0;
    let logtAvg = 0.0

    stores.forEach(function(store,index,array){
        
        const markerPosition  = new kakao.maps.LatLng(store.REFINE_WGS84_LAT, store.REFINE_WGS84_LOGT); 
        latAvg += parseFloat(store.REFINE_WGS84_LAT);
        logtAvg += parseFloat(store.REFINE_WGS84_LOGT);
        let marker = new kakao.maps.Marker({
            position: markerPosition,
            clickable: true
        });
        marker.setMap(map);
        currentMarkers.push(marker);
        var iwContent = `<div style="padding:5px;">${store.CMPNM_NM}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);  
        });        
      });      
      latAvg /= stores.length;
      logtAvg /= stores.length;
      return {Lat : latAvg, Logt : logtAvg}
  }