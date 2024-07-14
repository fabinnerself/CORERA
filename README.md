# CRUD Aplicacion sobre Producto con rest api y React-EasyUI - CORERA -
## Operaciones: Adicion, modificacion, eliminacion y busqueda

### Descripcion

Este proyecto implementa operaciones CRUD completas (Crear, Leer, Actualizar y Eliminar), junto con filtrado y paginación en un grid. A continuación, se describen las funcionalidades principales:

*Operaciones CRUD y Filtrado: Todas las operaciones de CRUD y filtrado son completamente funcionales.

*Grid con Filtros: El grid permite filtrar datos por todos los campos.

*Ajuste de Columnas: Es posible cambiar el ancho de las columnas en el grid.

*Paginación: El grid incluye paginación y permite seleccionar el número de elementos por página (10, 20, etc.).

*Función de Limpiar Filtros: Actualmente, la función para limpiar campos de filtro no está operativa.

*Función formato numerico: Actualmente, el formato numerico en la columna (price) del grid no está operativa.

### Requisitos del Sistema

- **Sistema Operativo**: Ubuntu 20.04.6 LTS (Focal Fossa) /  Ubuntu 22.04.4 LTS 
- **Kernel**: Version 6.2.16-3-pve
- **EasyUI**: Version 1.10.19 (react-easyui-1.10.19)
- **NodeJS**: Version v20.15.0
- **npm/npx**: 10.8.1
- **react**: 18.3.1

Sistemas Alternativos Probados
El proyecto también ha sido probado en el siguiente entorno alternativo:

- **Sistema Operativo**: Windows 10 Pro 1803
- **EasyUI**: Version 1.10.19 (react-easyui-1.10.19)
- **NodeJS**: Version 18.3.1 (package.json)
- **npm/npx**: 10.8.1
- **react**: 18.3.1

## notas de instalacion
1. Crear la React App.

    npm install -g create-react-app

    npm i axios

    create-react-app my-app

    cd my-app

2.  Instalar  EasyUI para React.

    npm install rc-easyui --save

3. Importar los archivos theme .

    @import '~rc-easyui/dist/themes/default/easyui.css';

    @import '~rc-easyui/dist/themes/icon.css';

    @import '~rc-easyui/dist/themes/react.css';

4. En el archivo donde se ejecutaran los componentes Easyi-UI incluir las librerias que correspondan

    import { DataGrid, GridColumn } from 'rc-easyui';

5. Para ejecutar app react 

    npm run start

extraido de https://www.jeasyui.com/download/rc.php

## Comandos utiles

lsb_release -a && uname -r

node -v && nvm -v && npm -v && npx -v 

(C) 2024 Favian Medina Gemio
