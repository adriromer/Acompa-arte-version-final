$(document).ready(function () {

    var table


    function addDoctor(data) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "terapista",
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
            $('.modal.in').modal('hide')
               $.notify("Terapista agregado exitosamente", {"status":"success"});
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getDoctor()
        });

    }

    function deleteDoctor(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "terapista/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

        swal({
            title: "Estas Seguro?",
            text: "No podras recuperar estos datos",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, Borrar!",
            closeOnConfirm: false
        }, function () {
            $.ajax(settings).done(function (response) {
                swal("Borrar!", "Terapista borrado.", "success");
                table.destroy();
                $('#datatable4 tbody').empty(); // empty in case the columns change
                getDoctor()
            });


        });

    }

    function updateDoctor(data, id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "terapista/" + id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
            $.notify("Terapista actualizado", {"status":"success"});
            $('.modal.in').modal('hide')
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getDoctor()
        });


    }

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



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                  "aaSorting": [],
                aoColumns: [
                    {
                        mData: 'ter_nombre'
                    },
                    {
                        mData: 'ter_apellido'
                    },
                    {
                        mData: 'ter_dir'
                    },
                    {
                        mData: 'ter_tel'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
                        }
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
                deleteDoctor(data.ter_id)

            });
            $('.btn-edit').one("click", function (e) {
                var data = table.row($(this).parents('tr')).data();
                $('#myModal').modal().one('shown.bs.modal', function (e) {
                    for (var key in data) {
                        $("[name=" + key + "]").val(data[key])
                    }
                    $("#savethepatient").off("click").on("click", function (e) {
                        var instance = $('#detailform').parsley();
                        instance.validate()
                        console.log(instance.isValid())
                        if (instance.isValid()) {
                            jsondata = $('#detailform').serializeJSON();
                            updateDoctor(jsondata, data.ter_id)
                        }

                    })
                })



            });

        });


    }




    $("#addpatient").click(function () {

        $('#myModal').modal().one('shown.bs.modal', function (e) {


            $("#savethepatient").off("click").on("click", function (e) {
                console.log("inn")
                var instance = $('#detailform').parsley();
                instance.validate()
                if (instance.isValid()) {
                    jsondata = $('#detailform').serializeJSON();
                    addDoctor(jsondata)
                }

            })

        })



    })


    getDoctor()
})