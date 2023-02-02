$(function () {
   $('#datepicker1').datetimepicker();
   $('#datepicker1').data("DateTimePicker").date(moment(new Date ).format('DD/MM/YYYY HH:mm'));
});

$(function () {
    $('#datepicker2').datetimepicker();
    $('#datepicker2').data("DateTimePicker").date(moment(new Date ).format('DD/MM/YYYY HH:mm'));
});

