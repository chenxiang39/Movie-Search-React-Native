const getGenre = function(genreArr){
    let res = '';
    for(let i = 0; i < genreArr.length; i++){
        res += genreArr[i].name;
        if(i != genreArr.length - 1){
            res += ', ';
        }
    }
    return res;
}
const getLanguages = function(languageArr){
    let res = '';
    for(let i = 0; i < languageArr.length; i++){
        res += languageArr[i].english_name;
        if(i != languageArr.length - 1){
            res += ', ';
        }
    }
    return res;
}
const getRuntime = function(time){
    let res = '';
    let hour = Math.floor(time / 60);
    let minute = time - hour * 60;
    if(hour !== 0){
        res += hour + 'hrs ';
    }
    if(minute !== 0){
        res += minute + 'mins';
    }
    return res;
}
export const movieDetail = function(data){
    let res = {
        title: !data.title ? '':data.title,
        genres: !data.genres ? '':getGenre(data.genres),
        spoken_languages: !data.spoken_languages ? '':getLanguages(data.spoken_languages),
        overview: !data.overview ? '':data.overview,
        release_date: !data.release_date ? '':data.release_date.slice(0,4),
        tagline: !data.tagline ? '':data.tagline,
        vote_average : !data.vote_average ? '0.0/5.0':data.vote_average / 2.0 + '/5.0',
        runtime : !data.runtime ? '':getRuntime(data.runtime),
        poster_path : !data.poster_path ? "https://cinemaone.net/images/movie_placeholder.png":"https://image.tmdb.org/t/p/w500" + data.poster_path,
        backdrop_path : !data.backdrop_path ? "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg":"https://image.tmdb.org/t/p/w500" + data.backdrop_path
    };
    return res;
}

export const tvDetail = function(data){
    let res = {
        title: !data.name ? '':data.name,
        genres: !data.genres ? '':getGenre(data.genres),
        spoken_languages: !data.spoken_languages ? '':getLanguages(data.spoken_languages),
        overview: !data.overview ? '':data.overview,
        release_date: !data.first_air_date ? '':data.first_air_date.slice(0,4),
        tagline: !data.tagline ? '':data.tagline,
        vote_average : !data.vote_average ? '0.0/5.0':data.vote_average / 2.0 + '/5.0',
        runtime : !data.episode_run_time ? '':getRuntime(data.episode_run_time),
        poster_path : !data.poster_path ? "https://cinemaone.net/images/movie_placeholder.png":"https://image.tmdb.org/t/p/w500" + data.poster_path,
        backdrop_path : !data.backdrop_path ? "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg":"https://image.tmdb.org/t/p/w500" + data.backdrop_path
    };
    return res;
}