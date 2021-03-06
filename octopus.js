// Model
const model = {
  currentCat: null,
  cats: [
    { name: 'cat1', imgSrc: 'https://i.pinimg.com/736x/e1/84/eb/e184ebbea68514d94d68647ba258176b--cute-cat-quotes-cat-people.jpg', clickCount: 0 },
    { name: 'cat2', imgSrc: 'https://lh3.ggpht.com/NL3c3-0gvBSLGHPHIbW6L2PF2kZZ4jg4WihUoWSxnh_fSiJEqKzAjJibQeflOaTaVwA=h310', clickCount: 0 },
    { name: 'cat3', imgSrc: 'https://i.pinimg.com/originals/b7/57/e8/b757e8effe1de883a41295eb844d1838.jpg', clickCount: 0 },
    { name: 'cat4', imgSrc: 'https://3.bp.blogspot.com/-b1hUmywfdgo/T8-gv3QVSCI/AAAAAAAACuc/ELY64mK5ooA/s1600/katched.jpg', clickCount: 0 }
  ]
};

// Octopus
const octopus = {
  init() {
    // Set current cat to first one in the list
    model.currentCat = model.cats[0];
    // initialize views
    catView.init();
    catListView.init();
    adminView.init();
  },

  // getter for model.cats
    get cats() {
        return model.cats;
    },
  // getter for model.currentCat
    get currentCat() {
        return model.currentCat;
    },
  // setter for currentCat
    set currentCat(cat) {
        model.currentCat = cat;
    },
  // increment counter then render
    incrementCounter() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

// View(s)
const catView = {
  init() {
    // store pointers to DOM elements for later access
    this.catEl = document.querySelector('.cat');
    this.catNameEl = document.querySelector('.cat-name');
    this.catImgEl = document.querySelector('.cat-img');
    this.countEl = document.querySelector('.cat-count');
    // on click, increment cat's counter
    this.catImgEl.addEventListener('click', () => octopus.incrementCounter());
    // render this view (update DOM elements)
    this.render();
  },
  render() {
    // update DOM elements with values from current cat
    const currentCat = octopus.currentCat;
    this.catNameEl.innerText = currentCat.name;
    this.catImgEl.src = currentCat.imgSrc;
    this.countEl.innerText = currentCat.clickCount;
  }
};

const catListView = {
  init() {
    // store DOM elements for later access
    this.catListEl = document.getElementById('cat-list');
    // get the cats from the octopus
    this.cats = octopus.cats;
    
    // set initial option to current cat
    this.catListEl.innerHTML = octopus.currentCat.name;

    // loop over cats
    // for (const cat of cats) {
    //   // make new option, set values
    //   const option = document.createElement('option');
    //   option.value = cat.name;
    //   option.innerText = cat.name;
    //   this.catListEl.appendChild(option);
    // }
    // add listener on select to chnge current cat and render
    this.catListEl.addEventListener('change', e => {
        const cat = this.cats.find(cat => cat.name === e.target.value);
        
        octopus.currentCat = cat;
        catView.render();
    });
    // render this view (update DOM elements)
    this.render();
  },

  render() {
    this.catListEl.innerHTML = '';
    for (const cat of this.cats) {
      // make new option, set values
      const option = document.createElement('option');
      option.value = cat.name;
      option.innerText = cat.name;
      this.catListEl.appendChild(option);
    }

  }
};

// premium pro version only!
const adminView = {
  init() {
    // store DOM elements for later access
    this.adminBtn = document.querySelector('.admin-button');
    this.adminArea = document.querySelector('.admin');
    this.saveBtn = document.querySelector('.save');
    this.cancelBtn = document.querySelector('.cancel');
    this.adminName = document.querySelector('#name');
    this.adminImg = document.querySelector('#imgUrl');
    this.adminCount = document.querySelector('#clicks');

    // admin click listener to toggle visibility
    this.adminBtn.addEventListener('click', () => {
      this.adminArea.classList.toggle('hidden');
    });

    // cancel button hides admin area
    this.cancelBtn.addEventListener('click', () =>
      this.adminArea.classList.add('hidden')
    );

    // save button grabs values, sets current cat with new data
    this.saveBtn.addEventListener('click', () => {
      // grab values of new data
      const newCat = {
        name: this.adminName.value,
        imgSrc: this.adminImg.value,
        clickCount: this.adminCount.value
      };

      // get current index of cat
      const currentCatIndex = octopus.cats.findIndex(
        cat => octopus.currentCat === cat
      );

      // set cat with new data, set new currentCat
      octopus.cats[currentCatIndex] = newCat;
      octopus.currentCat = octopus.cats[currentCatIndex];

      // update catView and catListView
      catView.render();
      catListView.render();
    });

    this.render();
  },
  render() {
    const currentCat = octopus.currentCat;
    this.adminName.value = currentCat.name;
    this.adminImg.value = currentCat.imgSrc;
    this.adminCount.value = currentCat.clickCount;
  }
};

octopus.init();
