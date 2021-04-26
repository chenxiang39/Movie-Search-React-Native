export const cast = function(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        if(!!dataArr[i].profile_path){
            let cur = {
                id : !dataArr[i].id ? '' : dataArr[i].id,
                name : !dataArr[i].name ? '' : dataArr[i].name,
                character : !dataArr[i].character ? '' : dataArr[i].character,
                profile_path : 'https://image.tmdb.org/t/p/w500' + dataArr[i].profile_path
            }
            res.push(cur);
        }
    }
    return res;
}