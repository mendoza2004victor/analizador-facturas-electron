# Analizador de Facturas FEL (Electron)

Este proyecto es una aplicación de escritorio desarrollada con **Electron y JavaScript** que permite analizar facturas FEL de la SAT en formato **XML o PDF**, filtrarlas por rango de fechas y calcular el total acumulado.

La aplicación permite al usuario seleccionar la carpeta donde se encuentran las facturas y obtener automáticamente:

* Cantidad de facturas encontradas
* Total acumulado de las facturas dentro del rango de fechas seleccionado

---

# Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías:

* **HTML5** → Estructura de la interfaz
* **JavaScript (ES6+)** → Lógica del programa
* **CSS** → Estilos de la interfaz
* **Electron** → Creación de aplicación de escritorio
* **Node.js** → Entorno de ejecución

Librerías utilizadas:

* **xml2js** → Lectura y procesamiento de archivos XML
* **pdf-parse** → Lectura de facturas en PDF

---

# Requisitos Previos

Antes de ejecutar el proyecto debes tener instalado:

* Node.js
* Git

---

# Instalación

Clonar el repositorio:

```
git clone https://github.com/mendoza2004victor/analizador-facturas-electron.git
```

Entrar al directorio del proyecto:

```
cd analizador-facturas-electron
```

Instalar las dependencias:

```
npm install
```

---

# Ejecutar el proyecto

Para iniciar la aplicación en modo desarrollo:

```
npm start
```

Esto abrirá la aplicación de escritorio.

---

# Flujo de trabajo con Git

Este proyecto implementa un flujo de trabajo basado en ramas para organizar el desarrollo.

Ramas utilizadas:

* **main**
  Contiene la versión principal del proyecto.

* **develop**
  Rama utilizada para integrar nuevas funcionalidades antes de pasar a producción.

* **feature/html**
  Rama utilizada para el desarrollo de la estructura visual de la aplicación.

* **feature/logicjs**
  Rama utilizada para implementar la lógica de procesamiento de facturas.

Flujo de trabajo utilizado:

```
main
   │
   └── develop
         │
         ├── feature/html
         │
         └── feature/logicjs
```

---

# Funcionalidades del sistema

La aplicación permite:

* Seleccionar una carpeta con facturas
* Leer archivos XML de facturas FEL
* Filtrar facturas por rango de fechas
* Calcular el total acumulado
* Mostrar la cantidad de facturas encontradas

---

#  Autor

**Víctor Mendoza**
