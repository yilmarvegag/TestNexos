# TestNexos
>Technical Test Nexos

Prueba de Conocimiento Desarrollador .Net
Prueba Técnica para Ingeniero Desarrollador .Net
Lenguaje: C#, JavaScript y/o TypeScript
Base de datos: Sql Server
Back-End: ASP NET CORE ó NET 5
Front-End: Angular 6 o mayor
ORM: Entity Framework 2.2.x

Proyecto 1:
Se requiere un API RESTFul en .NET Core o NET 5 que permita:
> Registrar los datos de un libro: Titulo, Año, Genero, Número de páginas, Editorial, Autor.
> Registrar los datos de los autores: Nombre completo, Fecha de nacimiento, Ciudad de procedencia, Correo electrónico.
> Registrar los datos de las editoriales: Nombre, Dirección de Correspondencia, Teléfono, Correo electrónico, Máximo de libros registrados.

Reglas de negocio:
> Todos los datos marcados con asterisco son obligatorios.
> Se debe garantizar la integridad de la información.
> Las editoriales pueden tener un máximo de libros registrados, en caso de no existir límite, se indica -1.
> Si al intentar registrar un libro se supera el máximo permitido, debe generarse una excepción y responder con el mensaje: “No es posible registrar el libro, se alcanzó el máximo permitido.”.

> Si al intentar registrar un libro y no existe:
> > Autor: Responder con el mensaje: “El autor no está registrado”.
> > Editorial: Responder con el mensaje: “La editorial no está registrada”.

Aspectos Técnicos:
> Tener en cuenta la estructura de paquetes
> > Entidades.
> > DTOs.
> > Interfaces.
> > Servicios (implementación).
> > Controladores.
> > Excepciones.

> Inyección de dependencias, uso de modelos, código legible son aspectos que serán tomados en cuenta.
> Todas las buenas prácticas de desarrollo serán tomadas en cuenta.
> Prueba de Conocimiento Desarrollador .Net

Proyecto 2:
> Se requiere un frontend en Angular para buscar los libros registrados en el sistema.
> El sistema debe permitir buscar por palabras clave como el autor, titulo, año.
> Aspectos Técnicos:
> > Usar Angular 6 o mayor versión.
> > Usar componentes, servicios, observadores, bootstrap (o cualquier librería UI). <br>
> > Una buena organización y estructura del proyecto serán tomadas en cuenta.
> > Una buena maquetación de templates serán tomadas en cuenta.

