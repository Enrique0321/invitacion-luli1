document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Sobre y Audio
    const envelopeScreen = document.getElementById('envelope-screen');
    const openBtn = document.getElementById('open-btn');
    const invitationContent = document.getElementById('invitation-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicBtnText = document.getElementById('music-btn-text');

    // Botón flotante para pausar/reproducir
    musicToggleBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggleBtn.classList.add('playing');
            if (musicBtnText) musicBtnText.innerText = 'DETENER';
        } else {
            bgMusic.pause();
            musicToggleBtn.classList.remove('playing');
            if (musicBtnText) musicBtnText.innerText = 'REPRODUCIR';
        }
    });

    openBtn.addEventListener('click', () => {
        // Ocultar sobre animado
        envelopeScreen.classList.add('open');

        // Mostrar contenido principal
        invitationContent.classList.remove('hidden');

        // Iniciar audio
        bgMusic.play().then(() => {
            musicToggleBtn.classList.add('playing');
            if (musicBtnText) musicBtnText.innerText = 'DETENER';
        }).catch(error => {
            console.log("Audio autoplay was prevented:", error);
            musicToggleBtn.classList.remove('playing');
            if (musicBtnText) musicBtnText.innerText = 'REPRODUCIR';
        });

        // Trigger animations for elements in view
        setTimeout(handleScrollAnimations, 100);
    });

    // 2. Cuenta Regresiva (18 de Julio de 2026, 12:30 hrs)
    const targetDate = new Date('2026-07-18T02:00:00');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const currentTime = new Date();
        const difference = targetDate - currentTime;

        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const m = Math.floor((difference / 1000 / 60) % 60);
            const s = Math.floor((difference / 1000) % 60);

            daysEl.innerText = d < 10 ? '0' + d : d;
            hoursEl.innerText = h < 10 ? '0' + h : h;
            minutesEl.innerText = m < 10 ? '0' + m : m;
            secondsEl.innerText = s < 10 ? '0' + s : s;
        } else {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial

    // 3. Animaciones al hacer scroll (Fade In)
    const sections = document.querySelectorAll('.section');

    // Add fade-in class to all sections initially
    sections.forEach(sec => sec.classList.add('fade-in'));

    function handleScrollAnimations() {
        const triggerBottom = window.innerHeight / 5 * 4.5;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);

    // 4. Manejo de Confirmación de Pase (WhatsApp)
    const btnConfirmar = document.getElementById('btn-confirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function (e) {
            e.preventDefault();

            const familiaInput = document.getElementById('familia-input');
            const familia = familiaInput ? familiaInput.value.trim() : '';

            if (!familia) {
                alert('Por favor, escribe el nombre de tu familia antes de confirmar.');
                if (familiaInput) familiaInput.focus();
                return;
            }

            // Número de WhatsApp (debe incluir código de país, sin signos ni espacios. Ej: 5219991234567 para México)
            const phone = "529995438658"; // <-- ¡EL USUARIO DEBE CAMBIAR ESTO!

            // Construir el mensaje
            let mensaje = `¡Hola! Confirmo la asistencia de la familia *${familia}* a los XV de Luli.%0A`;
            mensaje += `(Pase reservado de 1 lugares)`;

            const url = `https://wa.me/${phone}?text=${mensaje}`;
            window.open(url, '_blank');
        });
    }

    // 5. Carrusel Automático
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        let isInteracting = false;
        
        // Pausar el autoplay si el usuario interactúa con el carrusel
        gallerySlider.addEventListener('touchstart', () => isInteracting = true);
        gallerySlider.addEventListener('touchend', () => {
            setTimeout(() => isInteracting = false, 3000); // Reanudar después de 3 segundos
        });
        gallerySlider.addEventListener('mouseenter', () => isInteracting = true);
        gallerySlider.addEventListener('mouseleave', () => isInteracting = false);

        setInterval(() => {
            if (isInteracting) return;
            
            const firstImg = gallerySlider.querySelector('.gallery-img');
            if (!firstImg) return;
            
            // Obtener el ancho de desplazamiento (ancho de imagen + gap)
            const scrollAmount = firstImg.clientWidth + 15; 
            
            // Verificar si llegamos al final del scroll
            if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth - 10) {
                // Volver al inicio suavemente
                gallerySlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Avanzar a la siguiente imagen
                gallerySlider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 3000); // Cambia de foto cada 3 segundos
    }
});
