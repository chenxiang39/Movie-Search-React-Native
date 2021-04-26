import moment from 'moment';
export const review = function(dataArr){
    let res = [];
    for(let i = 0; i < Math.min(dataArr.length,3); i++){
        let cur = {
            author : !dataArr[i].author ? '' : dataArr[i].author,
            content : !dataArr[i].content ? '' : dataArr[i].content,
            created_at : !dataArr[i].created_at ? '' : moment(dataArr[i].created_at).format('LL'),
            url : !dataArr[i].url ? '' : dataArr[i].url,
            rating : !dataArr[i].author_details || !dataArr[i].author_details.rating ? '★ ' + 0 : '★ ' + dataArr[i].author_details.rating,
        }
        res.push(cur);
    }
    return res;
}