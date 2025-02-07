document.querySelector('.inz').addEventListener('click', (event) => {
    event.stopPropagation(); // Żeby nie uruchamiało się wszędzie
    console.log("dupa");
    document.querySelector('.inz')?.classList.replace('inz', 'inz-clicked');
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            createFirework(event.clientX, event.clientY);
          }, i * 30 + Math.random() * i*4); // Małe losowe opóźnienie

    }
});

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    
    // Ustaw pozycję startową
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
  
    // Losowe kierunki rozproszenia
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 50; // Odległość rozproszenia
    firework.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    firework.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
  
    document.body.appendChild(firework);
  
    // Usunięcie po zakończeniu animacji
    setTimeout(() => firework.remove(), 600);
  }