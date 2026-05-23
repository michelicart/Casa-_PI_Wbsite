// Form handler for EmailJS integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init('-Fg5ehgySyZaaTgX8');
    
    // Get the exit form
    const exitForm = document.getElementById('exit-form');
    
    if (exitForm) {
        exitForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = exitForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            const formStatus = document.getElementById('form-status');
            formStatus.style.display = 'block';
            formStatus.textContent = 'Processando seu pedido...';
            formStatus.style.color = '#333';
            
            // Get form data
            const name = document.getElementById('exit-name').value;
            const email = document.getElementById('exit-email').value;
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email
                // Any additional parameters you might need can be added here
            };
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            emailjs.send('service_wjq6atp', 'template_kdw6jj7', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    formStatus.textContent = 'Sucesso! Verifique seu email para acessar o e-book. Lembre-se de verificar sua pasta de spam.';
                    formStatus.style.color = 'green';
                    
                    // Reset form
                    exitForm.reset();
                    
                    // Close popup after delay
                    setTimeout(function() {
                        document.getElementById('exitPopup').style.display = 'none';
                    }, 3000);
                    
                    // Store in localStorage to prevent showing popup again
                    localStorage.setItem('ebookRequested', 'true');
                    
                    // Optional: Redirect to thank you page or PDF directly
                    // window.location.href = 'https://seusite.com/downloads/10-dicas-tijolos-ecologicos.pdf';
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    formStatus.textContent = 'Ocorreu um erro. Por favor, tente novamente.';
                    formStatus.style.color = 'red';
                })
                .finally(function() {
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});
