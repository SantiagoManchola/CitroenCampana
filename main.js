//JqueryValidator
const form = document.getElementById("contact_us")

if(form != null){
    const required_message = "Este campo es requerido"
    const invalidmail_message = "Ingresa un email válido"
    const invalidphone_message = "Ingresa un número de telefono válido"
    const invalididentity_message = "Ingresa un número válido"

    const sendForm = document.getElementById('send')
    const yesCheckbox = document.getElementById('yesCheckbox');
    const noCheckbox = document.getElementById('noCheckbox');
    const textContainer = `<div">
    <h4>Te informamos tus derechos como Titular de Datos Personales y los deberes del Responsable del Tratamiento de tus Datos</h4>
    <p>
        <b>a)</b> Tienes derecho a conocer, actualizar y rectificar tus datos personales, así como a solicitar prueba de la autorización otorgada al responsable del Tratamiento.
    </p>
    <p>
        <b>b)</b> El Responsable del Tratamiento deberá informarte previa recolección de tus Datos el Tratamiento que se le dará y la finalidad del mismo. Recuerda que las finalidades te las informamos en el escrito de autorización que encuentras <b class="highLightText" id="aquiCall">Aquí</b>
    </p>
    <p>
        <b>c)</b> Tienes derecho a revocar la autorización y a solicitar la supresión de tus Datos.
        </p>
    <p>
        <b>d)</b> Ante la Superintendencia de Industria y Comercio podrás presentar quejas por infracciones a la Ley 1581 de 2012 en las que incurra el Responsable.
    </p>
    <p>En caso de que desees revocar tu autorización o tengas alguna consulta o reclamo en materia de datos personales contáctanos al correo electrónico: <a href="mailto:didacol@didacol.com" target="_blank">didacol@didacol.com</a> y <a href="mailto:servicioalcliente@derco.com.co" target="_blank">servicioalcliente@derco.com.co</a>
    </p>
    <p>Puedes consultar nuestra política de tratamiento aquí: <a href="https://www.pracodidacol.com/" target="_blank">www.pracodidacol.com</a>
    </p>
    </div>`
    
    var validate = false

    function toggleCheckbox(checkbox1, checkbox2) {
        if (checkbox1.checked) {
            checkbox2.checked = false;
        }
    }

    yesCheckbox.addEventListener('click', function() {
        toggleCheckbox(yesCheckbox, noCheckbox)
        validate = true
        sendForm.disabled = false
        Swal.fire({
            customClass: {
                container: 'modal_terms',
                htmlContainer: 'container'
            },
            html: textContainer,
            confirmButtonText: 'Acepto terminos y condiciones',
			showCloseButton:true,
        })
    });
    document.addEventListener('click', (event) => {
		const target = event.target;

		// Verificar si el clic se realizó en el enlace que contiene la palabra "aquí" dentro de textContainer
		if (target.id === 'aquiCall') {
			// Realizar la acción deseada
			Swal.fire({
						customClass: {
							container: 'modal_terms',
							htmlContainer: 'container'
						},
						html : '<p class="textPolitics">Con la presente autorización del tratamiento de mis datos personales se me podrá contactar dentro de una misma semana y en más de una ocasión durante el mismo día mediante: <strong><u>sms, whatsapp, correo electrónico, dirección de residencia, llamada telefónica y/o cualquier otro medio de comunicación instantáneo o formal</u></strong> por motivos de: envío de información relacionada con todo el concepto de experiencia de cualquiera de las marcas que hacen parte de “Las Compañías”, ya sea para fines de actualización de datos, invitación a eventos, envío de publicidad, fines estadísticos, envío de información de productos y servicios, ofertas, descuentos, información corporativa, auditorias, seguimientos, promociones, encuestas, llamadas de seguimiento, envío de productos a la dirección de residencia, así como envío de información de campañas técnicas de servicio, seguridad o “recall”, de productos financieros y de seguros para la adquisición de bienes y servicios  de cualquiera de las marcas que hacen parte de “Las Compañías”; de igual forma, esta autorización comprende el mandato expreso para que mi información haga parte de la Base de Datos de cualquiera de “Las Compañías”, así como también pueda ser transferida y/o transmitida a otras compañías externas del Grupo Inchcape con residencia en Colombia o en otros países, incluyendo mas no limitándose a las marcas de los productos que importa, comercializa y distribuyen “Las Compañías” en Colombia.</p>'
					})
				}
			});
    
    noCheckbox.addEventListener('click', function() {
        toggleCheckbox(noCheckbox, yesCheckbox);
        validate = false
        sendForm.disabled = true
        Swal.fire({
            customClass: {
                container: 'modal_terms',
            },
            title: '<strong>Oops...</strong>',
            icon: 'error',
            html: 'Lo sentimos, no podemos enviar el formulario sin aceptar terminos',
            focusConfirm: false,
            confirmButtonText:
            'Ok, entiendo!',
        })
    });

    $("#form-contact").validate({
        rules: {
            names: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            number: {
                required: true,
                number: true
            },
            modelo: {
                required: true,
                number: true
            },
            tiempo: {
                required: true,
            },
            presupuesto: {
                required: true,
                number: true
            },
        },
        messages: {
            names: {
                required: required_message,
            },
            email: {
                required: required_message,
                email: invalidmail_message
            },
            number: {
                required: required_message
            },
            modelo: {
                required: required_message
            },
            tiempo: {
                required: required_message
            },
            presupuesto: {
                required: required_message
            },
        },
        submitHandler: function(form, e) {
            console.log("error1")
            e.preventDefault();
            sendForm.disabled = true
            var formData = new FormData(document.getElementById("form-contact"));
            if(validate === false ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Debe aceptar los terminos!',
                });
            } else {
                $.ajax({
                    url: "mail.php",
                    type: 'POST',
                    data: formData,
                    dataType: "html",
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function(response) {
                    sendForm.disabled = false
                    if (response == 1) {
                        Swal.fire(
                            'Mensaje enviado',
                            'No contactaremos contigo prontamente.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Oops...',
                            'Lo sentimos tenemos problemas para enviar la información.',
                            'error'
                        )
                    }
                }).fail(function(response) {
                    sendForm.disabled = false
                    Swal.fire(
                        'Oops...',
                        'Lo sentimos tenemos problemas para enviar la información.',
                        'error'
                    )
                })
            }
        },
    })
    
}