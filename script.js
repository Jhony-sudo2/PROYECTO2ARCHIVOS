
db.createCollection('files');
db.createCollection('folders');
db.createCollection('users');


db.users.insertMany(
    {name:'Jhony',lastname:'Fuentes',phone:'42882130',username:'Jhony19',password:'hola123',type:'administrador',email:'jhony.fuentes19@gmail.com'},
    {name:'Luis',lastname:'Mendez',phone:'45820369',username:'LuisM2',password:'nuevapass',type:'cliente',email:'tonol62581@glalen.com'},
    {name:'Fernando',lastname:'Granados',phone:'09586372',username:'Fer1202',password:'278xd.fer',type:'cliente',email:'zouxeunoimofe-1968@yopmail.com'},
    {name:'Alejandra',lastname:'Lopez',phone:'98702456',username:'AleLo',password:'administrador',type:'cliente',email:'AleLopez_lopez@gmail.com'},
    {name:'Daniela',lastname:'Escobar',phone:'70635048',username:'DanEs',password:'password.00',type:'cliente',email:'Daniela.fuentes19@gmail.com'},
    {name:'Carlos',lastname:'Gomez',phone:'98023678',username:'Car20',password:'Car20.GO',type:'cliente',email:'CarlosGomez29@gmail.com'},
    {name:'Fernando',lastname:'Miranda',phone:'78905640',username:'Fer78',password:'FERm.78',type:'administrador',email:'FerMiranda@hotmail.com'}
)



db.files.insertMany(
    {name:'MENSAJE',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'txt',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'TEXTO',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'EXAMEN',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'txt',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'HORARIO',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'txt',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'TOKEN',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'codigos',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'txt',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'L',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'T',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'Encabezado',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'Tabla modelo',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'txt',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0},
    {name:'Pagina1',content:'HOLA ESTE ES UN MENSAJE',path:'/',user:'Jhony19',extension:'html',fecha:'11/11/2023, 9:07:52 GMT-6',contador:0}
)

db.folders.insertMany(
    {name:'CARPETA1',path:'/',user:'Jhony19',extension:'directorio',fecha:'11/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'quinto',path:'/',user:'Jhony19',extension:'directorio',fecha:'10/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Examenes',path:'/',user:'LuisM2',extension:'directorio',fecha:'10/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Sexto',path:'/',user:'LuisM2',extension:'directorio',fecha:'10/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Trabajos',path:'/',user:'Fer1202',extension:'directorio',fecha:'11/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Proyecto',path:'/',user:'Fer1202',extension:'directorio',fecha:'10/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Archivos',path:'/',user:'AleLo',extension:'directorio',fecha:'09/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Final',path:'/',user:'Car20',extension:'directorio',fecha:'08/11/2023, 10:36:52 GMT-6',contador:0},
    {name:'Telegram',path:'/',user:'Fer78',extension:'directorio',fecha:'13/10/2023, 10:36:52 GMT-6',contador:0},
    {name:'Documentos',path:'/',user:'AleLo',extension:'directorio',fecha:'15/09/2023, 10:36:52 GMT-6',contador:0}
)
