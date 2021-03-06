$(document).ready(function () {

    var table


    function addAppointment(data) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "turno",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
         $.notify("Turno agregado exitosamente", {"status":"success"});

            $('.modal.in').modal('hide')
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getAppointment()
        });

    }

    function deleteAppointment(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "turno/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

swal({
    title: "Estas seguro?",
    text: "No podras recuperar estos datos",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Si, Borrar!",
    closeOnConfirm: false
}, function() {
 $.ajax(settings).done(function (response) {
   swal("Borrar!", "Turno Borrado.", "success");
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getAppointment()
        });


});

    }



    function getAppointment() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "turno",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {

        for(i=0;i<response.length;i++){
        response[i].pat_fullname=response[i].pac_nombre+" "+response[i].pac_apellido
        response[i].doc_fullname=response[i].ter_nombre+" "+response[i].ter_apellido
        }



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                   "aaSorting": [],
                aoColumns: [
                    {
                        mData: 'doc_fullname'
                    },
                    {
                        mData: 'pat_fullname'
                    },
                    {
                        mData: 'turno_fecha'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-danger delete-btn" type="button">Borrar</button>';
                        }
                    }
        ]
            });
            $('#datatable4 tbody').on('click', '.delete-btn', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data)
                deleteAppointment(data.turno_id)

            });


        });


    }




    $("#addpatient").click(function () {

        $('#myModal').modal().one('shown.bs.modal', function (e) {

    $("#doctor_select").html(doctorSelect)
     $("#patient_select").html(patientSelect)

      $(".form_datetime").datetimepicker({
         format: 'yyyy-mm-dd hh:ii',
         autoclose: true,
         minuteStep: 60,
         daysOfWeekDisabled: [0, 6],
         hoursDisabled: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23],
         startDate:new Date(),
         initialDate: new Date()
    });
            $("#savethepatient").off("click").on("click", function(e) {


            var instance = $('#detailform').parsley();
            instance.validate()
                    if(instance.isValid()){
                jsondata = $('#detailform').serializeJSON();
                addAppointment(jsondata)
                }

            })

        })



    })


var doctorSelect=""
 function getDoctor() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "terapista",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {

        for(i=0;i<response.length;i++){

        response[i].doc_fullname=response[i].ter_nombre+" "+response[i].ter_apellido
        doctorSelect +="<option value="+response[i].ter_id+">"+response[i].doc_fullname+"</option>"
        }


        })
        }
var patientSelect=""
  function getPatient() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "paciente",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
         for(i=0;i<response.length;i++){
          response[i].pat_fullname=response[i].pac_nombre+" "+response[i].pac_apellido
        patientSelect +="<option value="+response[i].pac_id+">"+response[i].pat_fullname+"</option>"
        }

                })
        }

getDoctor()
getPatient()
getAppointment()
})