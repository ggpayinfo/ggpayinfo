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
        console.log(data);
    }).always(function(xhr,status){
        console.log(xhr);
        console.log(status);
    });
  }  