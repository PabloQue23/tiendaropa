document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    const carritoContador = document.querySelector('.header-icons span:last-child');
    const btnPromo = document.querySelector('.promo-popup button');
    let totalItems = 0;

    // 2. Lógica del Carrito
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Evitar comportamiento por defecto
            e.preventDefault();
            
            // Obtener datos del producto (opcional para lógica extendida)
            const card = boton.closest('.card-producto');
            const nombreProducto = card.querySelector('h4').innerText;

            // Incrementar contador
            totalItems++;
            actualizarInterfazCarrito();

            // Pequeño feedback visual en el botón
            const textoOriginal = boton.innerText;
            boton.innerText = "¡Añadido!";
            boton.style.backgroundColor = "#27ae60";
            
            setTimeout(() => {
                boton.innerText = textoOriginal;
                boton.style.backgroundColor = "";
            }, 1000);
        });
    });

    // 3. Función para actualizar el texto del carrito
    function actualizarInterfazCarrito() {
        carritoContador.innerText = `Carrito (${totalItems})`;
    }

    // 4. Simulación de Compra (Al hacer clic en el carrito o en la promo)
    // Vamos a hacer que al hacer clic en "Carrito (X)" se procese la compra
    carritoContador.parentElement.addEventListener('click', (e) => {
        if (totalItems > 0) {
            finalizarCompra();
        } else {
            alert("El carrito está vacío. ¡Añade algunos pantalones primero!");
        }
    });

    // 5. Botón de la promoción
    if (btnPromo) {
        btnPromo.addEventListener('click', () => {
            alert("Cupón REBAJAS50 aplicado automáticamente a tu próxima compra.");
        });
    }

    // 6. Alerta de Compra Personalizada
    function finalizarCompra() {
        // Creamos un overlay para la alerta personalizada
        const overlay = document.createElement('div');
        overlay.style = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex; justify-content: center; align-items: center;
            z-index: 1000; font-family: 'Inter', sans-serif;
        `;

        const modal = document.createElement('div');
        modal.style = `
            background: white; padding: 40px; border-radius: 8px;
            text-align: center; max-width: 400px; width: 90%;
        `;

        modal.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px;">📦</div>
            <h2 style="margin-bottom: 10px; color: #1a1a1a;">¡Pedido Realizado!</h2>
            <p style="color: #666; margin-bottom: 25px;">
                Gracias por confiar en <strong>CLOTHING STUDIO</strong>. 
                Has adquirido ${totalItems} artículo(s) con éxito.
            </p>
            <button id="close-modal" style="
                background: #1a1a1a; color: white; border: none;
                padding: 12px 30px; cursor: pointer; font-weight: 600;
                text-transform: uppercase; letter-spacing: 1px;">
                CERRAR
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Resetear carrito tras la compra
        document.getElementById('close-modal').addEventListener('click', () => {
            totalItems = 0;
            actualizarInterfazCarrito();
            document.body.removeChild(overlay);
        });
    }
});