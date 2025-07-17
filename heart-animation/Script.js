document.addEventListener('DOMContentLoaded', () => {
  const heartBtn = document.getElementById('heartBtn');
  const animationArea = document.getElementById('animationArea');
  const sceneContainer = document.querySelector('.scene-container');
  
  // Create SVG elements
  createSceneElements();
  
  heartBtn.addEventListener('click', startAnimation);
  
  function createSceneElements() {
    // Left person (blue)
    const leftPerson = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leftPerson.setAttribute('class', 'person left');
    leftPerson.setAttribute('viewBox', '0 0 100 150');
    
    // Right person (red)
    const rightPerson = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    rightPerson.setAttribute('class', 'person right');
    rightPerson.setAttribute('viewBox', '0 0 100 150');
    
    // Heart
    const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heart.setAttribute('class', 'heart');
    heart.setAttribute('viewBox', '0 0 100 100');
    
    // Tears
    const tears = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tears.setAttribute('class', 'tears');
    tears.setAttribute('viewBox', '0 0 40 20');
    tears.setAttribute('width', '40');
    tears.setAttribute('height', '20');
    
    // Glue
    const glue = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    glue.setAttribute('class', 'glue');
    glue.setAttribute('viewBox', '0 0 100 100');
    
    // Add elements to container
    sceneContainer.appendChild(leftPerson);
    sceneContainer.appendChild(rightPerson);
    sceneContainer.appendChild(heart);
    sceneContainer.appendChild(tears);
    sceneContainer.appendChild(glue);
    
    // Draw left person
    drawPerson(leftPerson, '#4a86e8', '#2d4573');
    
    // Draw right person
    drawPerson(rightPerson, '#e84a5f', '#8c2d3b');
    
    // Draw initial heart
    drawHeart(heart);
    
    // Draw tears
    tears.innerHTML = `
      <circle cx="10" cy="10" r="5" fill="#4fc3f7" />
      <circle cx="30" cy="10" r="5" fill="#4fc3f7" />
    `;
    
    // Draw glue
    glue.innerHTML = `
      <path d="M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 Z" fill="#ffffff" />
      <path d="M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 Z" fill="none" stroke="#cccccc" stroke-width="3" />
      <text x="50" y="55" font-family="Vazirmatn" font-size="30" text-anchor="middle" fill="#333">چسب</text>
    `;
  }
  
  function drawPerson(svg, shirtColor, pantsColor) {
    svg.innerHTML = `
      <!-- Head -->
      <circle cx="50" cy="30" r="20" fill="#f5d0b0" />
      
      <!-- Body -->
      <rect x="40" y="50" width="20" height="50" fill="${shirtColor}" />
      
      <!-- Arms -->
      <rect x="20" y="55" width="40" height="10" fill="${shirtColor}" rx="5" />
      
      <!-- Legs -->
      <rect x="40" y="100" width="8" height="30" fill="${pantsColor}" />
      <rect x="52" y="100" width="8" height="30" fill="${pantsColor}" />
      
      <!-- Hands -->
      <circle cx="20" cy="60" r="5" fill="#f5d0b0" />
      <circle cx="80" cy="60" r="5" fill="#f5d0b0" />
      
      <!-- Sad face when crying -->
      <path class="mouth" cx="50" cy="40" d="M35,45 Q50,55 65,45" fill="none" stroke="#333" stroke-width="2" />
      <circle class="eye" cx="40" cy="25" r="3" fill="#333" />
      <circle class="eye" cx="60" cy="25" r="3" fill="#333" />
    `;
  }
  
  function drawHeart(svg, broken = false) {
    if (broken) {
      svg.innerHTML = `
        <path d="M30,30 L50,50 L70,30 C75,25,80,30,70,40 L50,60 L30,40 C20,30,25,25,30,30 Z" fill="#ff0040" />
        <path d="M30,70 L50,50 L70,70 C75,75,80,70,70,60 L50,40 L30,60 C20,70,25,75,30,70 Z" fill="#ff0040" />
      `;
    } else {
      svg.innerHTML = `
        <path d="M50,30 L60,20 C70,10,80,15,80,25 C80,35,70,45,50,65 C30,45,20,35,20,25 C20,15,30,10,40,20 Z" fill="#ff0040" />
      `;
    }
  }
  
  function startAnimation() {
    const leftPerson = document.querySelector(".person.left");
    const rightPerson = document.querySelector(".person.right");
    const heart = document.querySelector(".heart");
    const tears = document.querySelector(".tears");
    const glue = document.querySelector(".glue");
    const finalMessage = document.querySelector(".final-message");
    
    // Reset animations
    animationArea.classList.add('active');
    finalMessage.style.animation = 'none';
    void finalMessage.offsetWidth; // Trigger reflow
    
    // Animation sequence
    setTimeout(() => {
      // Pulling the heart
      leftPerson.style.animation = "pull 1s ease-out forwards";
      rightPerson.style.animation = "pull-right 1s ease-out forwards";
      heart.style.animation = "break-heart 1s ease-out forwards";
    }, 500);
    
    setTimeout(() => {
      // Heart breaks
      drawHeart(heart, true);
      
      // Change faces to sad
      document.querySelectorAll('.person').forEach(person => {
        const mouth = person.querySelector('.mouth');
        const eyes = person.querySelectorAll('.eye');
        
        if (mouth) mouth.setAttribute('d', 'M35,50 Q50,40 65,50');
        eyes.forEach(eye => {
          eye.innerHTML = '';
          eye.innerHTML = '<path d="M40,25 Q45,30 40,35" fill="none" stroke="#333" stroke-width="2" />';
        });
      });
      
      // Show tears
      tears.style.animation = "show-tears 1s ease-out forwards";
    }, 1500);
    
    setTimeout(() => {
      // Show glue
      glue.style.opacity = "1";
    }, 3000);
    
    setTimeout(() => {
      // Fix heart
      glue.style.opacity = "0";
      drawHeart(heart, false);
      heart.style.animation = "fix-heart 1s ease-out forwards";
      
      // People come back together
      leftPerson.style.animation = "none";
      rightPerson.style.animation = "none";
      leftPerson.style.transform = "translateX(-50%)";
      rightPerson.style.transform = "translateX(50%)";
      
      // Change faces back to normal
      document.querySelectorAll('.person').forEach(person => {
        const mouth = person.querySelector('.mouth');
        const eyes = person.querySelectorAll('.eye');
        
        if (mouth) mouth.setAttribute('d', 'M35,45 Q50,55 65,45');
        eyes.forEach(eye => {
          eye.innerHTML = '';
          eye.innerHTML = '<circle cx="40" cy="25" r="3" fill="#333" />';
        });
      });
      
      // Hide tears
      tears.style.opacity = "0";
      
      // Show final message
      finalMessage.style.animation = "fadeIn 2s ease-in forwards";
    }, 4000);
  }
});
