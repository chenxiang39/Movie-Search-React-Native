export const searchDataModel = function (dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        if(dataArr[i].media_type === 'tv'){
            let cur = {
                id : ! dataArr[i].id ? '':dataArr[i].id,
                name : ! dataArr[i].name ? '':dataArr[i].name.slice(0,30),
                backdrop_path : ! dataArr[i].backdrop_path ? 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg': 'https://image.tmdb.org/t/p/w500' + dataArr[i].backdrop_path,
                media_type : ! dataArr[i].media_type ? '': dataArr[i].media_type,
                vote_average : ! dataArr[i].vote_average ? '0.0': (dataArr[i].vote_average / 2).toFixed(1),
                date: ! dataArr[i].first_air_date ? '':(dataArr[i].first_air_date).slice(0,4)
            }
            res.push(cur);
        }
        else if(dataArr[i].media_type === 'movie'){
            let cur = {
                id : ! dataArr[i].id ? '':dataArr[i].id,
                name : ! dataArr[i].title ? '':dataArr[i].title.slice(0,30),
                backdrop_path : ! dataArr[i].backdrop_path ? 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg': 'https://image.tmdb.org/t/p/w500' + dataArr[i].backdrop_path,
                media_type : ! dataArr[i].media_type ? '': dataArr[i].media_type,
                vote_average : ! dataArr[i].vote_average ? '0.0': (dataArr[i].vote_average / 2).toFixed(1),
                date: ! dataArr[i].release_date ? '':(dataArr[i].release_date).slice(0,4)
            }
            res.push(cur);
        }
    }
    return res;
}