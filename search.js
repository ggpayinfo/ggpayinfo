const GG_Key = "49a924a2211244a6ba764449d0ac9ff1";
const Kakao_REST_Key = "8ba123e4bb2f158bef8a06ce6d096318";

function Search(LocationName, StoreName, callback) {

    $.ajax({
        url: "https://openapi.gg.go.kr/RegionMnyFacltStus",
        data: {
            Key: GG_Key,
            Type: "json",
            pIndex: 1,
            pSize: 1000,
            CMPNM_NM: StoreName,
            REFINE_ROADNM_ADDR: LocationName,
        },
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        callback(data);
    });
}

function SearchCategory(keyword, callback){
    $.ajax({
        url: "https://dapi.kakao.com/v2/local/search/keyword.json",
        data: {
            query: keyword,
        },
        headers: { 'Authorization': `KakaoAK ${Kakao_REST_Key}`}, 
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        callback(data);
    }).always(function (xhr, status) {
        console.log(xhr);
        console.log(status);
    });
}


