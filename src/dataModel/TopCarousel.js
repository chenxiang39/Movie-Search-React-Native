
export const tvTopCarousel = function(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let cur = {
            id:null,
            title:null,
            poster_path:null,
            backdrop_path:null,
            type:null,
        }
        cur.id = !dataArr[i].id ? null:dataArr[i].id;
        cur.title = !dataArr[i].name ? null:dataArr[i].name;
        cur.poster_path = !dataArr[i].poster_path ? "https://cinemaone.net/images/movie_placeholder.png":"https://image.tmdb.org/t/p/w500" + dataArr[i].poster_path;
        cur.backdrop_path = !dataArr[i].backdrop_path ? "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg":"https://image.tmdb.org/t/p/w500" + dataArr[i].backdrop_path;
        cur.type = "tv";
        res.push(cur);
    }
    return res;
}

export const movieTopCarousel = function(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let cur = {
            id:null,
            title:null,
            poster_path:null,
            backdrop_path:null,
            type:null,
        }
        cur.id = !dataArr[i].id ? null:dataArr[i].id;
        cur.title = !dataArr[i].title ? null:dataArr[i].title;
        cur.poster_path = !dataArr[i].poster_path ? "https://cinemaone.net/images/movie_placeholder.png":"https://image.tmdb.org/t/p/w500" + dataArr[i].poster_path;
        cur.backdrop_path = !dataArr[i].backdrop_path ? "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg":"https://image.tmdb.org/t/p/w500" + dataArr[i].backdrop_path;
        cur.type = "movie";
        res.push(cur);
    }
    return res;
}