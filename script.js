// Script to handle form validation and success message
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const errorEl = document.getElementById('error');
const successScreen = document.getElementById('success-screen');
const successCard = document.querySelector('.success-card');
const successEmail = document.getElementById('success-email');
let dismissBtn = document.getElementById('dismiss');

function validateEmail(value){
  // email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim());
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const value = emailInput.value.trim();
  if(value === ''){
    showError("Valid email required!");
    return;
  }
  if(!validateEmail(value)){
    showError("Please provide a valid e-mail address");
    return;
  }

  // success - show success screen
  clearError();
  successEmail.textContent = value;

  // hide main content
  document.querySelector('main.container').classList.add('hidden');

  // reveal success screen
  successScreen.classList.remove('hidden');
  successScreen.setAttribute('aria-hidden','false');
  successCard.classList.add('animate');

  // re-query dismiss (in case it didn't exist before)
  dismissBtn = document.getElementById('dismiss');
  // focus the dismiss after animation
  setTimeout(()=> dismissBtn.focus(), 360);
});

document.addEventListener('click', (e)=>{
  // Delegate the dismiss button 
  if(!e.target) return;
  const target = e.target;
  if(target.id === 'dismiss'){
    
    // Reset to initial state
    successCard.classList.remove('animate');
    successScreen.classList.add('hidden');
    successScreen.setAttribute('aria-hidden','true');
    document.querySelector('main.container').classList.remove('hidden');
    form.reset();
    emailInput.focus();
  }
});

function showError(message){
  errorEl.textContent = message;
  emailInput.classList.add('input-invalid');
  emailInput.setAttribute('aria-invalid','true');
}
function clearError(){
  errorEl.textContent = '';
  emailInput.classList.remove('input-invalid');
  emailInput.removeAttribute('aria-invalid');
}

// Clear error as user types
emailInput.addEventListener('input', ()=>{
  if(emailInput.classList.contains('input-invalid')){
    clearError();
  }
});
