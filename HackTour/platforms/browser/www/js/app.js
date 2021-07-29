$(document).ready(function () {

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: window.innerWidth / 3,
        height: window.innerWidth / 3
    });

    // QR Generator
    function makeCode() {
        var elText = document.getElementById("text");

        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }

        qrcode.makeCode(elText.value);
    }

    makeCode();

    $("#text").
        on("keydown", function (e) {
            if (e.keyCode == 13) {
                makeCode();
            }
        });

    const content = document.querySelector(".content");
    let pages = document.querySelectorAll(".nav-page");
    let contentTitle = document.querySelector(".content-title");

    $.ajax({
        type: 'GET',
        url: "https://hack20180303100527.azurewebsites.net/api/values/1",
        dataType: "text",
        success: function (response) {
            console.log(response);
        }
    });

    function changePage(pageName) {
        console.log(pageName);

        $.ajax({
            type: 'GET',
            url: "historial-clinico.html",
            dataType: "text",
            success: function (response) {
                content.innerHTML = response;
            }
        });
    }

    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];

        page.addEventListener("click", function () {
            let value = page.getAttribute("data-page");
            changePage(value);
        });
    }

    $("body").on("click", "#agregarPaciente", function () {
        var usuario = new Object();
        usuario.nombre = $("#form-nombre").val();
        usuario.edad = $("#form-edad").val();

        $.ajax({
            type: 'POST',
            url: "https://hack20180303100527.azurewebsites.net/api/values",
            dataType: "text",
            data: usuario,
            success: function (response) {
                var perfil = new Object();
                perfil.id = response;
                perfil.nombre = $("#form-nombre").val();
                perfil.sexo = $("#form-sexo").val();
                perfil.tipoSangre = $("#form-tipo-sangre").val();
                perfil.domicilio = $("#form-domicilio").val();
                perfil.edad = $("#form-edad").val();
                perfil.contacto = $("#form-nombre-contacto").val();
                perfil.telContacto = $("#form-telefono-contacto").val();
                perfil.medicamentos = $("#form-medicamentos").val();
                perfil.alergias = $("#form-alergias").val();
                perfil.enfermedades = $("#form-enfermedades").val();
                perfil.cirugiaPrevia = $("#form-cirugia").val();
                perfil.nacionalidad = $("#form-nacionalidad").val();
                perfil.alcholistmo = $("#form-alcoholismo").val();
                perfil.tabaco = $("#form-tabaco").val();

                $.ajax({
                    type: 'POST',
                    url: "https://hack20180303100527.azurewebsites.net/api/perfil",
                    dataType: "text",
                    data: perfil,
                    success: function (response) {
                        console.log("Success");
                    }
                });
            }
        });
    });
});