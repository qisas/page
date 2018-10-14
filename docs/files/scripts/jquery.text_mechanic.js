function execute_check(tool_name, callback_func) {
    jQuery.ajax({
        url: "/",
        data: {
            action: 'text_mechanic_stats',
            tool: tool_name
        },
        method: 'POST',
        callback_function: callback_func,
        success: function(response) {
            var response = {"uses":1,"status":"OK"};
            console.log(response);
            jQuery('#uses').html('[<strong>Uses: </strong>' + response.uses + ']');
            if (response.status == 'ERROR') {
                jQuery('#access-modal').modal();
                var counter = response.wait_time;
                var counter_interval = setInterval(function() {
                    counter--;
                    var minutes = Math.floor(counter / 60);
                    var seconds = counter - (minutes * 60);
                    jQuery('#countdown').html(str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2));
                    if (counter == 0) {
                        clearInterval(counter_interval);
                    }
                }, 1000);
            } else {
                this.callback_function();
            }
        }
    });
}

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}
jQuery('#layer-search').slideUp();
jQuery('#btn-search').on('click', function() {
    jQuery('#layer-search').slideDown();
    jQuery('#search-field').focus();
});
jQuery('#search-field').on('keyup', function() {
    search_tm_tools();
});
jQuery('#search-field').on('click', function() {
    search_tm_tools();
});
var search_tm_tools = function() {
    if (jQuery('#search-field').val() == '') {
        jQuery('#search-results').hide();
        return;
    }
    var results = Array();
    var toSearch = jQuery('#search-field').val();
    for (var i = 0; i < wp_menu.length; i++) {
        for (key in wp_menu[i]) {
            if (wp_menu[i][key].indexOf(toSearch) != -1) {
                results.push(wp_menu[i]);
            }
        }
    }
    html = '<table class="table table-bordered">';
    for (var i = 0; i < results.length; i++) {
        html = html + '<tr>' +
            '<td><a href="' + results[i].url + '">' + results[i].title + '</a></td>' +
            '</tr>';
    }
    html = html + '</table>';
    jQuery('#search-results').html(html);
    jQuery('#search-results').show();
}
var search_timer;
var hideToolResults = function() {
    jQuery('#search-results').hide();
}
jQuery('#search-field, #search-results').on('mouseleave', function() {
    search_timer = setTimeout(hideToolResults, 10);
});
jQuery('#search-field, #search-results').on('mouseenter', function() {
    clearInterval(search_timer);
});
