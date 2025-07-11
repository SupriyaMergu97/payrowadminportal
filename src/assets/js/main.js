var currentdate = moment().format("D MMM YYYY");
$('#current_date').html(currentdate);

$('#inputdatepicker').datetimepicker({
    format: 'L'
});

$('#reservation').daterangepicker();
$('#reservation').val('');
$('#reservation').attr("placeholder","SELECT REPORT DATE");

$(document).on("change", "#active_switch", function() {
    if ($("#active_switch").is(':checked')){
        $('#active_switch_label').text('Active');
    } else {
        $('#active_switch_label').text('Inactive');
    }
});

$(document).on("change", "#active_switch1", function() {
    if ($("#active_switch1").is(':checked')){
        $('#active_switch_label1').text('Active');
    } else {
        $('#active_switch_label1').text('Inactive');
    }
});