const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton(){
    navList.classList.toggle('show')

}

hamburgerButton.addEventListener('click', toggleButton)

const cards = document.querySelectorAll('.card');
const popupContainer = document.querySelector('.popup-container');
const popup = document.querySelector('.popup');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // set popup image and text based on clicked card
    const cardImage = card.querySelector('img').src;
    const cardTitle = card.querySelector('h3').textContent;
    const cardDescription = card.querySelector('p').textContent;
    popup.querySelector('img').src = cardImage;
    popup.querySelector('h3').textContent = cardTitle;
    popup.querySelector('p').textContent = cardDescription;

    // grab hyperlinks from card and insert them into popup
    const cardLinks = card.querySelectorAll('a');
    const popupLinks = Array.from(cardLinks).map(cardLink => {
      const popupLink = document.createElement('a');
      popupLink.href = cardLink.href;
      popupLink.textContent = cardLink.textContent;
      popupLink.style.color = 'coral';
      return popupLink;
    });

    // create hr and insert it after the p element
    const hr = document.createElement('hr');
    popup.querySelector('p').appendChild(hr);

    // insert the first popup link after the first hr element
    if (popupLinks.length > 0) {
      popup.querySelector('p').appendChild(popupLinks[0]);
    }

    // create hr and insert it after each popup link except the last one
    popupLinks.slice(1).forEach((popupLink, index) => {
      const hr = document.createElement('hr');
      popup.querySelector('p').appendChild(hr);
      popup.querySelector('p').appendChild(popupLink);
    });

    // show popup
    popupContainer.classList.add('show');
  });
});

popupContainer.addEventListener('click', e => {
  // hide popup when clicking outside of it
  if (e.target === popupContainer) {
    popupContainer.classList.remove('show');
  }
});


