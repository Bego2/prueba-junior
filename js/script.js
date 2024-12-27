 
// ____________________________________
//            Variables
// ____________________________________
const tabsInfo = [
  {
    id: "page1",
    author: "Michael W. Dreeben",
    product: "Shell Dining Chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est aperiam quos totam blanditiis sapiente sit, quasi non excepturi architecto dolorem?",
    file: "silla_negra.png",
    alt: "Shell Dining Chair in black",
  },
  {
    id: "page2",
    author: "Jeaper K. Thomas",
    product: "Dunes Anthrazite Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est aperiam quos totam blanditiis sapiente sit, quasi non excepturi architecto dolorem?",
    file: "mesa_negra.png",
    alt: "Dunes Anthrazite table in black",
  },
];
const main = document.querySelector(".Main");
const list_btns = document.querySelectorAll(".Tabs-h2");

 const btns_tab = document.querySelectorAll(".Tabs-button");

// Menu
const body = document.querySelector("body");
const menuIcon = document.getElementById("openMenu");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");

// ____________________________________
//        Bucles y Funciones
// ____________________________________

// TABSINFO es un bucle que recorre cada elemento y muestra su contenido gracias a createElement,
tabsInfo.forEach((tab, index) => {
  const tabContent = document.createElement("div");
  tabContent.classList.add("Tabs-content");

  if (index === 0) tabContent.classList.add("u-visible");
  tabContent.setAttribute("id", tab.id);

  // [DIV: TEXTOS]
  const textContainer = document.createElement("div");
  textContainer.classList.add("Main-texts");

  // creamos el autor <h4>
  const h4 = document.createElement("h4");
  h4.classList.add("H4");
  h4.textContent = tab.author;

  // creamos el titulo del producto <h2>
  const h2 = document.createElement("h2");
  h2.classList.add("H2");
  h2.textContent = tab.product;

  //creamos el parrafo de la descripcion <p>
  const txt = document.createElement("p");
  txt.classList.add("Main-description");
  txt.textContent = tab.description;

  // [DIV: IMAGEN]

  //creamos un contenedor para la img <div>
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("Img-container");

  //creamos etiqueta <img>
  const img = document.createElement("img");
  img.classList.add("Main-img");
  img.src = `img/${tab.file}`;
  img.alt = tab.alt;

  // TextContainer es el contenedor padre de los txts del producto
  imgContainer.appendChild(img);
  textContainer.appendChild(h4);
  textContainer.appendChild(h2);
  textContainer.appendChild(txt);

  // TabContent el contenedor padre de la caja de txts y de la imagen
  tabContent.appendChild(imgContainer);
  tabContent.appendChild(textContainer);
  // Main el el contenedor padre tabContent
  main.appendChild(tabContent);
});


 // ACTIVAR LA TAB CORRESPONDIENTE CON CLICK
const list_pages = document.querySelectorAll(".Tabs-content");

btns_tab.forEach((btns, index) => {
  btns.addEventListener("click", () => {
    console.log(`Tab clickeada: ${index}`);
    activarTab(index);
  });
});

// ACTIVAR LA TAB CORRESPONDIENTE CON SCROLL
function activarTab(index) {

  list_btns.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add("u-active");
    } else {
      btn.classList.remove("u-active");
    }
  });

  
  list_pages.forEach((page, idx) => {
    if (idx === index) {
      page.classList.add("u-visible");
      console.log(`Mostrando página: ${page.id}`);
    } else {
      page.classList.remove("u-visible");
    }
  });
}

// DETECTA LA SECCION VISIBLE Y ACTIVA LA PAGINA CORRESPONDIENTE

/** (1) page.getBoundingClientRect es un metodo aplicado a page, devuelve las dimensiones de page en relación con el viewport 
 * 
 *  (2) Hay que tener en cuenta que si Rect.top es negativo la pagina estaria arriba y fuera del viewport
 * Si Rect.top es un numero positivo esta en la parte superior y dentro del viewport
 * Si Rect.top es mayor que window.innerHeight la pagina estaria abajo y fuera del viewport
 * 
 *  (3) En la condicion lo que hacemos es averiguar si:
- rect.top >= 0  la parte superior de la page esta visible y dentro del viewport (número positivo)
-rect.top < window.innerHeight / 2 la parte superior del elemento esta en la mitad superior de la pantalla */
function detectarSeccion() {
  list_pages.forEach((page, index) => {
    const rect = page.getBoundingClientRect();

    // Si la sección está visible (en la mitad de la pantalla), activarla 
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      page.classList.add("u-visible"); // Pone visible la pagina correspondiente
      activarTab(index); // Cambiar tab activa
    } else {
      page.classList.remove("u-visible"); 
    }
  });
}

// ____________________________________
//               OTROS
// ____________________________________

// ABRIR & CERRAR EL MENU OCULTO (HIDDEN MENU)
menuIcon.addEventListener("click", () => {
  body.classList.add("is-menuOpen");
  menu.classList.add("u-menuOpen");
});

closeMenu.addEventListener("click", () => {
  body.classList.remove("is-menuOpen");
  menu.classList.remove("u-menuOpen");
});

// DEL MENU ANTERIOR AL CLICKAR SU ENLACE PRINCIPAL -> MOSTRAR EL SUBMENU 
const menuItems = document.querySelectorAll(".Menu-item");

menuItems.forEach((item) => {
  const link = item.querySelector(".Menu-li"); // El enlace principal
  const submenu = item.querySelector(".Submenu"); // El submenu

  if (submenu) {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evitar comportamiento por defecto

      submenu.classList.toggle("is-submenuOpen");
    });
  }
});


// MOSTRAR/OCULTAR la IMAGEN SOFA (contenida en el primer enlace del submenu)
document.addEventListener("DOMContentLoaded", () => {
  const furnitureLink = document.getElementById("furniture-link");
  const furnitureImgContainer = document.getElementById(
    "furniture-imgContainer"
  );

  // Yo quería hacer que en mobile no aparezca la img y que en desktop si, por tanto la siguiente condicion se aplicaria a pantallas iguales mayores de 1024px
  if (window.innerWidth >= 1024) {
    furnitureLink.addEventListener("mouseenter", () => {
      furnitureImgContainer.style.display = "block";
    });

    furnitureLink.addEventListener("mouseleave", () => {
      furnitureImgContainer.style.display = "none";
    });
  }
});


// ____________________________________
//       Inicializar programas
// ____________________________________

// Detectar scroll en el main
main.addEventListener("scroll", detectarSeccion);

// Inicializar la primera tab
activarTab(0);
 