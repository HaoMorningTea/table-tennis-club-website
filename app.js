//for animation object
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
      else{
        entry.target.classList.remove('show');
      }
    });
  });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


function adjustParentHeight() {
  // Get the parent element and all its child elements
  const parent = document.querySelector('.parent');
  const children = parent.children;

  // Find the tallest child element
  let tallestChildHeight = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i].offsetHeight > tallestChildHeight) {
      tallestChildHeight = children[i].offsetHeight;
    }
  }

  // Set the parent element height to match the tallest child element and set its position to absolute
  parent.style.height = `${tallestChildHeight}px`;
  parent.style.position = 'relative';
}

adjustParentHeight();

// Listen for window resize events and adjust the parent's height accordingly
window.addEventListener('resize', adjustParentHeight);