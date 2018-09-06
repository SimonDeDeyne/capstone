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
    var _uid = "{{uid}}";
    var _uend_time_local = new Date();
    var _failed_ajax = "Sorry an error has occurred, and your task has not been recorded. Please inform the researcher."

    if (typeof(expt_data) !== 'string') {
        expt_data = JSON.stringify(expt_data);
    }

    var _data = {
        results: expt_data,
        uid: _uid,
        start_date_local: _ustart_time_local.toISOString(),
        end_date_local: _uend_time_local.toISOString(),
        date_offset: _uend_time_local.getTimezoneOffset(),
    };


    $.ajax({
        type: 'POST',
        url: 'savedata',
        data: _data,
        dataType: 'json',
        //async: false,
        success: function(data) {
            if (data['status'] == 'success') {
                //alert("Your record has been updated");
            } else {
                alert(failed_ajax + ": 1");
            }
            _record_task_complete = true;
            //$(".expt-pop-outer").fadeOut("slow");
            _hide_loader();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(_failed_ajax + ": 2");
            _record_task_complete = true;
            //$(".expt-pop-outer").fadeOut("slow");
            _hide_loader();
        }
    });

}