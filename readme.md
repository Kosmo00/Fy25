
Modulos:

1-Modulo de autenticación de usuario basado en roles:
El modulo contendría:
    - Ruta para creacion de usuario (atleta) (debe de tener soporte para creacion por referidos)
    - Ruta para creacion de super_usuario (administrador)
    - Ruta para recuperacion de contraseña
    - Ruta para autenticación de usuario
    - Ruta para cierre de sesion
    - Ruta para modificacion de datos del usuario (Esta ruta debe dar soporte para que el administrador tenga derecho de modificar cualquier campo, 
      el usuario de recepcion podria agregar saldo y agregar visitas a spinning o musculacion)
    - Ruta para visualizar datos del usuario (perfil de usuario)
    - Ruta para información del usuario (Ruta restringida):
      - En esta ruta el usuario podrá ver los registros de sus visitas al gimnasio y la region entrenada en cada visita
      - El entrenador podrá ver quienes asistieron a sus turnos de trabajo en su propio perfil y ver el historial de visitas de cada atleta
      - El administrador podrá ver los registros de todos los roles
      - Los registros en esta ruta deben ser altamente filtrables
      - En esta ruta se guardara ademas informacion referente a los eventos en los que el usuario haya participado y/o se haya inscrito


2-Modulo de eventos:
- Las notificaciones se enviarían por correo, (investigar la posibilidad de dar soporte a Telegram y Whatsapp)
El módulo contendría:
    - Ruta para creación de evento (Valorar agregar sistema de comentarios al evento):
        Al crear un evento se debe:
          - Notificar al usuario via Whatsapp, Telegram y correo si este está de acuerdo con ello
    - Ruta para la modificación de evento
    - Ruta para la eliminación de eventos
    - Ruta para mostrar una lista de eventos


3-Módulo de entrenador:
El modulo contendria:
    - Plataforma de chat en tiempo real para la coordinación del plan de entrenamiento (Pendiente definir bien)

4-Módulo de reservas:
- En este módulo el atleta podrá reservar horarios en la sección de fuerza o alguna bicicleta en la sección de spinning (Definir bien el sistema de reserva)

5-Módulo de registros:
- En este módulo se guardarán registros de todos los usuarios, incluyendo el administrador del sitio. Los datos registrados se añadirán en algunas rutas post
El módulo contendría:
    - Ruta para acceder a los registros

Modelos:

Gimnasio:                 Created: 06/04
id: number
direccion: string
nombre: string
información: string
image: string


Carrusel_Home_Images:     Created: 06/04
id: number
in_carousel: bool
url: string


Rol:                      Created: 06/04        Data restrictions added: 07/04
id: number
nombre: string


Usuario                   Created: 06/04
id : number
nombre : string
apellidos : string
contraseña : string
CI : string
correo : string
teléfono : string
foto_perfil : string
notificaciones_whatsapp : boolean
notificaciones_correo : boolean
rol : Rol

Usuario_admin:            Created: 06/04

Usuario_entrenador:
ganancia_sesion_por_cliente (porciento) : number
monto_ganado : number
monto_cobrado : number
información : string
gimnasio : Gimnasio


Usuario_recepcion:        Created: 06/04
gimnasio : Gimnasio

Usuario_QR:               Created: 06/04
gimnasio : Gimnasio

Usuario_atleta:           Created: 06/04
pago_por_sesion_spinning : number
pago_por_sesion_musculatura : number
dinero_ingresado : number
porciento_rebaja : number
numero_de_usuario : number

Log:                      Created: 06/04
id: number                  
usuario: Usuario
tipo: LogType
fecha : Date
descripcion: string


Prices:
id : number
spinning_price: number,
muscle_price: number



Mapa del sitio web:
(Desde el logo que se encontrará en la barra de navegación se puede ir a Home)

Home
  Login
    Recuperación de contraseña
  Registro
  Spinning
    Reserva (restringida)
  Musculatura
    Reserva (restringida)
  Eventos
  Entrenadores
  Sobre nosotros
  Contacto (Del admin)
  Perfil de usuario (Restringida)
    Registros de usuario (Restringida)
    Modificación de datos de usuario (Restringida, solo tendrá acceso el propio usuario y el admin)
  Buscador de usuarios (Admin tendrá visibilidad de todos los usuarios, entrenador y recepción solo tendrán visibilidad de los atletas)
    Crear Usuario (Admin y recepción)
  Registros globales (Solo Admin)

  



