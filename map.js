
function ClearMarkers(currentMarkers) {
    if (currentMarkers != null) {
        currentMarkers.forEach(function (marker, index, array) {
            marker.setMap(null);
        });
    }
}

function SetMarkers(map, markers) {

    let maxLat = 0.0;
    let minLat = 999999.0
    let maxLogt = 0.0
    let minLogt = 999999.0;
    

    markers.forEach(function (marker, index, array) {

        
        let lat = parseFloat(marker.getPosition().getLat());
        let Logt = parseFloat(marker.getPosition().getLng());
        if(lat >= maxLat){maxLat = lat};
        if(lat <= minLat){minLat = lat};

        if(Logt >= maxLogt){maxLogt = Logt};
        if(Logt <= minLogt){minLogt = Logt};        
        marker.setMap(map);
    });
    return {
        SW : new kakao.maps.LatLng(minLat, minLogt),
        NE : new kakao.maps.LatLng(maxLat, maxLogt)
    };
}
function SetCenter(map, boundary){
    let sw = boundary.SW;
    let ne = boundary.NE;
    let bounds = new kakao.maps.LatLngBounds(sw, ne);  
    map.setBounds(bounds);  
}

function GetMarker(map,store){
    const markerPosition = new kakao.maps.LatLng(store.REFINE_WGS84_LAT, store.REFINE_WGS84_LOGT);
    let marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true
    });
    var iwContent = `<div style="padding:5px;">${store.CMPNM_NM}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
    });
    return marker;
}