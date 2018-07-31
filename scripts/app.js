// MODEL
class Cat {
  constructor(name, image, clicks) {
    this.name = name;
    this.image = image;
    this.clicks = clicks;
  }
}

const model = {    
  cats: [
    new Cat('Murzik', './img/cat-1.jpg', 0),
    new Cat('Filya', './img/cat-2.jpg', 0),
    new Cat('Barsik', './img/cat-3.jpg', 0),
    new Cat('Timka', './img/cat-4.jpg', 0),
    new Cat('Vasya', './img/cat-5.jpg', 0)
  ],
  // selected cat
  currentCat: null
};

// OCTOPUS
const octopus = {
  // initialize the view - load list of cats and div with cats details (it will be empty until a cat is selected)
  init: () => {
    catsListView.init();
    catView.init();
  },

  getCurrentCat: () => {
    return model.currentCat;
  },

  getCats: () => {
    return model.cats;
  },

  // aet the current cat to the object passed in
  setCurrentCat: (cat) => {
    model.currentCat = cat;
  },

  // increment number of clicks for currently selected cat
  incrementClicks: () => {
    model.currentCat.clicks++;
    catView.render();
  },

  openForm: () => {
    const catForm = document.getElementById('cat-form');
    catForm.classList.remove('hide');
    catForm.classList.add('open');
  },

  hideForm: () => {
    const catForm = document.getElementById('cat-form');
    catForm.classList.remove('open');
    catForm.classList.add('hide');
  },

  updateData: () => {
    const name = document.getElementById('name');
    const pic = document.getElementById('img');
    const clicks = document.getElementById('clicks');
    if (name.value) {
      model.currentCat.name = name.value;
    }
    if (pic.value) {
      model.currentCat.image = pic.value;
    }
    if (clicks.value) {
      model.currentCat.clicks = clicks.value;
    }
    catView.render();
    document.getElementById('cats-list').innerHTML = '';
    catsListView.init();
  }
};

// VIEW
const catsListView = {
  init: () => {
    catsListView.catsList = document.getElementById('cats-list');
    catsListView.render();
  },

  render: () => {
    model.cats.forEach(cat => {
      const listItem = document.createElement('LI');
      const textnode = document.createTextNode(cat.name);
      listItem.appendChild(textnode);
      // on click, setCurrentCat and render the catView
      // (this uses closure-in-a-loop trick to connect the value of the cat variable to the click event function),
      // now it doesn't matter that cat changes later, I stored cat in catCopy, which will never change   
      listItem.addEventListener('click', ((catCopy) => {
        return () => {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));
      catsListView.catsList.appendChild(listItem);
    });
  },

  update: () => {
    model.cats.forEach(cat => {
      octopus.setCurrentCat(cat);
    });
  }
};

const catView = {
  init: () => {
    // if it is not arrow function, instead of 'catView' should be written 'this'
    // store DOM elements (name, img, clicks) in variables for easy access
    catView.catName = document.getElementById('cat-name');
    catView.catClicks = document.getElementById('cat-clicks');
    catView.catImg = document.getElementById('cat-img');
    // increment number of clicks when click on image
    catView.catImg.addEventListener('click', () => {
      octopus.incrementClicks();
    });
    octopus.hideForm();
    catView.admin = document.getElementById('admin-btn');
    catView.admin.addEventListener('click', () => {
      octopus.openForm();
    });
    catView.cancel = document.getElementById('cancel');
    catView.cancel.addEventListener('click', () => {
      octopus.hideForm();
    });
  },

  render: () => {
    catView.admin = document.getElementById('admin-btn');
    catView.admin.classList.remove('hide');
    catView.admin.classList.add('open');
    const currentCat = octopus.getCurrentCat();
    catView.update = document.getElementById('update');
    catView.update.addEventListener('click', () => {
      octopus.updateData();
    });
    catView.catName.textContent = currentCat.name;
    catView.catClicks.textContent = currentCat.clicks;
    catView.catImg.src = currentCat.image;
  }
};

octopus.init();
