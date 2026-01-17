<?php

// Group routes with an API key validation middleware
Route::middleware('api_key.check')->group(function () {
    Route::get('/', 'APIsController@api')->name('apiURL');
    // general
    Route::get('/website/status', 'APIsController@website_status');
    Route::get('/website/info/{lang?}', 'APIsController@website_info');
    Route::get('/website/contacts/{lang?}', 'APIsController@website_contacts');
    Route::get('/website/style/{lang?}', 'APIsController@website_style');
    Route::get('/website/social', 'APIsController@website_social');
    Route::get('/website/settings', 'APIsController@website_settings');
    Route::get('/menu/{menu_id}/{lang?}', 'APIsController@menu');
    Route::get('/banners/{group_id}/{lang?}', 'APIsController@banners');
    // section & topics
    Route::get('/section/{section_id}/{lang?}', 'APIsController@section');
    Route::get('/categories/{section_id}/{lang?}', 'APIsController@categories');
    Route::get('/topics/{section_id}/page/{page_number?}/count/{topics_count?}/{lang?}', 'APIsController@topics');
    Route::get('/category/{cat_id}/page/{page_number?}/count/{topics_count?}/{lang?}', 'APIsController@category');
    // topic sub details
    Route::get('/topic/fields/{topic_id}/{lang?}', 'APIsController@topic_fields');
    Route::get('/topic/photos/{topic_id}/{lang?}', 'APIsController@topic_photos');
    Route::get('/topic/photo/{photo_id}/{lang?}', 'APIsController@topic_photo');
    Route::get('/topic/maps/{topic_id}/{lang?}', 'APIsController@topic_maps');
    Route::get('/topic/map/{map_id}/{lang?}', 'APIsController@topic_map');
    Route::get('/topic/files/{topic_id}/{lang?}', 'APIsController@topic_files');
    Route::get('/topic/file/{file_id}/{lang?}', 'APIsController@topic_file');
    Route::get('/topic/comments/{topic_id}/{lang?}', 'APIsController@topic_comments');
    Route::get('/topic/comment/{comment_id}/{lang?}', 'APIsController@topic_comment');
    Route::get('/topic/related/{topic_id}/{lang?}', 'APIsController@topic_related');
    // topic page
    Route::get('/topic/{topic_id}/{lang?}', 'APIsController@topic');
    // user topics
    Route::get('/user/{user_id}/topics/page/{page_number?}/count/{topics_count?}/{lang?}', 'APIsController@user_topics');
    // Forms Submit
    Route::post('/subscribe', 'APIsController@subscribeSubmit');
    Route::post('/comment', 'APIsController@commentSubmit');
    Route::post('/order', 'APIsController@orderSubmit');
    Route::post('/contact', 'APIsController@ContactPageSubmit');


    //Custom Route
    Route::get('/home/{lang?}', 'HomeController@index');

    Route::get('/info/{lang?}', 'HomeController@info');

    Route::get('/tourism-areas/page/{topic_id}/{lang?}', 'HomeController@tourism_area');
    Route::get('/tourism-areas/{page_number?}/{lang?}', 'HomeController@tourism_areas');

    Route::get('/news/page/{topic_id}/{lang?}', 'HomeController@new');
    Route::get('/news/category/{cat_id}/{page_number?}/{lang?}', 'HomeController@news_category');
    Route::get('/news/{page_number?}/{lang?}', 'HomeController@news');

    Route::get('/scholarships/page/{topic_id}/{lang?}', 'HomeController@scholarship');
    Route::get('/scholarships/category/{cat_id}/{page_number?}/{lang?}', 'HomeController@scholarships_category');
    Route::get('/scholarships/{page_number?}/{lang?}', 'HomeController@scholarships');

    Route::get('/jobs/page/{topic_id}/{lang?}', 'HomeController@job');
    Route::get('/jobs/{page_number?}/{lang?}', 'HomeController@jobs');

    Route::get('/one-window-services/page/{topic_id}/{lang?}', 'HomeController@one_window_service');
    Route::get('/one-window-services/{page_number?}/{lang?}', 'HomeController@one_window_services');

    Route::get('/legal-documents/page/{topic_id}/{lang?}', 'HomeController@legal_document');
    Route::get('/legal-documents/category/{cat_id}/{page_number?}/{lang?}', 'HomeController@legal_documents_category');
    Route::get('/legal-documents/{page_number?}/{lang?}', 'HomeController@legal_documents');

    // get about route
    Route::get('/owso/{page_number?}/{lang?}', 'HomeController@owso');
    //get search data
    Route::get('/search', 'HomeController@search');

    //get contact-us
    Route::get('/contact-us/{lang?}', 'HomeController@contact_us');

    // get page route
    Route::get('/page/{topic_id}/{lang?}', 'HomeController@page');

    // get about route
    Route::get('/about/{lang?}', 'HomeController@about');

    // track visitor
    Route::post('/track', 'HomeController@track');


    Route::fallback(function () {
        return Response::json([
            'code' => '-1',
            'msg' => 'Authentication failed'
        ], 500);
    });
});
