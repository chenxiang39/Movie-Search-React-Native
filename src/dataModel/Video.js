export const video = function(dataArr){
    let res = {
        site:'',
        type:'',
        name:'',
        key:'tzkWB85ULJY'
    }
    for(let i = 0; i < dataArr.length; i++){
        if(dataArr[i].type === 'Trailer'){
            res.site = !dataArr[i].site? '': dataArr[i].site ;
            res.type = !dataArr[i].type? '': dataArr[i].type ;
            res.name = !dataArr[i].name? '': dataArr[i].name ;
            res.key = !dataArr[i].key? 'tzkWB85ULJY': dataArr[i].key ;
            return res;
        }
        if(dataArr[i].type === 'Teaser'){
            res.site = !dataArr[i].site? '': dataArr[i].site ;
            res.type = !dataArr[i].type? '': dataArr[i].type ;
            res.name = !dataArr[i].name? '': dataArr[i].name ;
            res.key = !dataArr[i].key? 'tzkWB85ULJY': dataArr[i].key ;
        }
    }
    return res;
}