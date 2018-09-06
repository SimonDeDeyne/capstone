function _display_loader(msg) {
    $(".expt-pop-outer h3").text(msg);
    $(".expt-pop-outer").fadeIn("slow");
}

function _hide_loader() {
    $(".expt-pop-outer").fadeOut("slow");
}

var _ustart_time_local = new Date();
var ua = navigator.userAgent;
var click_event_type = (ua.match(/iPad/i)) ? "touchstart" : "click";
var _record_task_complete = false;

var _send_task_data = function(expt_data) {
    // Finish task and sent data back to server
    //$(".expt-pop-outer").fadeIn("slow");
    _display_loader("Saving experiment data...");
    var _uid = UUID();
    var _uend_time_local = new Date();
    var _failed_ajax = "Sorry an error has occurred, and your task has not been recorded. Please inform the researcher."

    if (typeof(expt_data) !== 'string') {
        expt_data = JSON.stringify(expt_data);
    }

    var responses = {
        responses: expt_data,
        uid: _uid,
        start_date_local: _ustart_time_local.toISOString(),
        end_date_local: _uend_time_local.toISOString(),
        date_offset: _uend_time_local.getTimezoneOffset(),
    };


    $.ajax({
        type: 'POST',
        url: 'saveData',
        data: responses,
        dataType: 'json',
        //async: false,
        success: function(data) {
            if (data['msg'] == 'success') {
                console.log('Data saved');
                //alert("Your record has been updated");
            } else {
                alert(failed_ajax + ": 1");
            }
            _record_task_complete = true;
            //$(".expt-pop-outer").fadeOut("slow");
            _hide_loader();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            alert(_failed_ajax + ": 2");
            _record_task_complete = true;
            //$(".expt-pop-outer").fadeOut("slow");
            _hide_loader();
        }
    });

}


/** Generates UUID v4
 *
 * @node There is a bug in Chrome's Math.random() according to http://devoluk.com/google-chrome-math-random-issue.html
 *       For that reason we use Date.now() as well.
 */
function UUID() {
    function s(n) { return h((Math.random() * (1<<(n<<2)))^Date.now()).slice(-n); }
    function h(n) { return (n|0).toString(16); }
    return  [
        s(4) + s(4), s(4),
        '4' + s(3),                    // UUID version 4
        h(8|(Math.random()*4)) + s(3), // {8|9|A|B}xxx
        // s(4) + s(4) + s(4),
        Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
    ].join('-');
}

$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
});