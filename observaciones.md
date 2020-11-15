Querida Rosi, 

Hiciste un trabajo increíble. Lo único que lamento es tener tan poquito para corregirte: hay poco que puedo decir cuando cumplis tan a la perfección lo pedido y vas más allá, agregando algunos detalles propios que mejoran la experiencia de usuario y demuestran el enorme compromiso que pusiste a este trabajo. 

Voy comentando punto por punto tu trabajo. 

### Accesibilidad

Tu sitio cumple casi a la perfeccion los requsitos de accesibilidad. Utilizas a la perfeccion las etiquetas semanticas y la informacion meta, por lo que un lector de pantalla puede orientarse facilmente en tu web. Los colores y contrastes son adecuados y utilizas bien las etiquetas aria y el atributo alt. 

La página puede ser navegada con el teclado sin ningun problema, creo que nunca deje de ver el foco visible, ni acceder a elementos ocultos. 

### Filtros y búsqueda

Tus filtros funcionan a la perfeccion. No solo eso, sino que la reutilizacion en responsive es perfecta. Se nota que hiciste un trabajo enorme y que pusiste mucho esfuerzo en que quedaran perfectos. 

Celebro lo bien que resolviste los filtros en responsive, y la excelente reutilizacion de funcionalidades que hiciste aqui. Solo te comento que el overlay a veces se pone por encima de los filtros mobile, por lo que no pueden usarse en esos casos - sacandole el x-index al overlay este problema se soluciona. 

### Carrito

Tu carrito funciona muy bien, esta muy bien maquetado y cumple todos los requerimientos solicitados. 

Quiza la unica mejora que se me ocurra es que la cantidad de productos en el carrito (tanto en el aside del carrito como en la cantidad mostrada en la barra de navegacion) no se modifica cuando elimino o agrego un producto desde el aside. Noto que usas siempre algo como esto:

```js
cantidadItemsCarrito.textContent = `Carrito (${cantidadItems()} items)`
```

Tendrias que hacer lo mismo cuando el usuario interactua con algunos de los inputs para aumentar o reducir la cantidad. Quiza hacer una funcion para todo? De todos modos es un detalle. 

A nivel estetico, creo que podria agregarse algun margin a los botones, que se ven algo pegoteaditos. 

### Checkout

Todo perfecto aqui. Fue un muy lindo detalle que agregaras tu propio diseño a los modales, y mi parte favorita es la validación extra en el formulario sin depender solamente del atributo required en html. Ese mensaje en rojo es claro y demuestra tu interes por hacer una web lo mas amigable posible. 

Ocasionalmente ocurre que las sumas de los totales dan decimales algo extraños. No es culpa de tus calculos, sino de como se comportan los numeros flotantes, tanto en JS como en cualquier otro lenguaje. Por ejemplo si sumamos 0.1 + 0.2 notaras que el total no es 0.3 sino 0.30000000000000004. En tu carrito, si selecciono la playstation 4 y le agrego tarjeta de credito, veo como recargo $5999.900000000001. Algo muy, muy molesto cuando trabajamos con numeros en web. Podes solucionarlo con un toFixed(2) en todos los numeros para que se vean solo 2 decimales.

### Misc 

Tu HTML esta perfecto. Excelente la indentacion, claro, completo, con las etiquetas semanticas adecuadas. Tu CSS tambien esta muy prolijo y bien hecho, reutilizas bien los estilos y los nombres de clases son claros y descriptivos.  El responsive esta hecho a la perfeccion. Noto quiza cierta dependencia de algunas soluciones del codigo de la web modelo para cosas que podrias haber solucionado de manera mas sencilla con lo que sabes; pero entiendo que el maquetado no era la prioridad aqui. 

Tengo que destacar especialmente la calidad del JS. Todos los comentarios que dejas son utiles para el lector. El orden es perfecto. Creo que encontre un solo console log olvidado, lo que es muchisimo para alguien de tu experiencia. 

Tenes muchos y muy buenos commits y un buen readme. Este es un trabajo del que estar muy orgullosa. 

### Nota 

En resumen, hiciste un enorme trabajo, casi ningun problema en el producto entregado y con una enorme atencion al detalle y la calidad. Solo lamento no tener mucho que ofrecerte para que mejores tu trabajo, pero poco podemos hacer los docentes frente a TPs de esta calidad. 

Con respecto a los restantes factores de evaluación: 

✅ Respeta la consigna.
✅ Estructura correcta de documento HTML.
✅ Respeta el diseño dado.
✅ Respeta el funcionamiento.
✅ Responsive funciona correctamente.
✅ Buena estructura de proyecto.
✅ Código bien indentado.
✅ Comentarios que permiten mejorar la legibilidad del código.
✅ Uso correcto de etiquetas semánticas.
✅ Buenos nombres de clases.
✅ Buenos nombres de funciones y variables.
✅ Reutilización de estilos.
✅ Funciones pequeñas.
✅ Commits con mensajes adecuados.
✅  Cumple con las condiciones de accesibilidad avanzada.

NOTA FINAL: 10

