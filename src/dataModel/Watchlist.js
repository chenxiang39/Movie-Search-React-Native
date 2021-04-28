export const watchlistDataModel = (dataArr) =>{
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let cur = {
            id : !dataArr[i].id ? '' : dataArr[i].id,
            type : !dataArr[i].type ? '' : dataArr[i].type,
            url : !dataArr[i].poster_path ? '' : dataArr[i].poster_path,
        }
        res.push(cur);
    }
    return res;
}
