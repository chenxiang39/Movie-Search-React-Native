export const watchlistDataModel = function(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let cur = {
            id : !dataArr[i].id ? '' : dataArr[i].id,
            type : !dataArr[i].type ? '' : dataArr[i].type,
            url : !dataArr[i].url ? '' : dataArr[i].url,
        }
        res.push(cur);
    }
    return res;
}
