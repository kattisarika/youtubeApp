var Youtube_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    var query = {
            part: 'snippet',
            key: 'AIzaSyDxKXZPNVFM3BDlshh4H5QTY5PAndhK_Kg',
            q: searchTerm,
            maxResults: 10,
            type: "video"
        }
        //console.log(query);


    $.getJSON(Youtube_BASE_URL, query, callback);

}


function displayYoutubeSearchData(data) {
    console.log(data);

    if (!data || data.pageInfo.totalResults == 0) {
        console.log("No Videos Found");
        $('.js-search-results ul').append("<b>API did not get back with search results </b>");
    } else {
        displaySearchResults(data.items);
    }

}


function displaySearchResults(videosArray) {

    $('.js-search-results ul').empty();
    var htmlOutput = '';
    console.log(videosArray);
    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        console.log(videosArrayValue.snippet.title);
        htmlOutput = '<li>'
        htmlOutput += '<p>' + videosArrayValue.snippet.title + '</p>'
        htmlOutput += '<a href="https://www.youtube.com/watch?v=' + videosArrayValue.id.videoId + '" target="_blank">'
        htmlOutput += '<img src=' + videosArrayValue.snippet.thumbnails.high.url + '>' + '</img></a></li>'
        console.log(videosArrayValue.snippet.thumbnails.high.url);
        $('.js-search-results ul').append(htmlOutput);
    });

}

function watchSubmit() {
    console.log("Am I coming here");
    $('.js-search-form').submit(function (e) {
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        console.log(query);
        if (query.includes("leadership") || query.includes("motivation") || query.includes("coach")) {
            $('.js-search-results ul').empty();
            getDataFromApi(query, displayYoutubeSearchData);
        } else {
            $('.js-search-results ul').empty();
            $('.js-search-results ul').append("<b> You can only search for leadership motivational videos, So please use the right keyword and search again</b>");
        }
        // getResults(query);


    });
}

$(function () {
    watchSubmit();
});
