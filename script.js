$(window).on('load', hidePreloader);

function hidePreloader() {
  $('.preloader').removeClass('d-flex').addClass('d-none');
}

/*====================
 for featured
======================*/
const CreateCars = (() => {
  const cars = [];
  class Car {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }

  // car creation func
  function makeCar(
    make,
    country,
    img = './img/cars/pexels-mat-brown-952338.jpg',
    special = true,
    model = 'new model',
    price = 10000,
    type = 'sedan',
    trans = 'automatic',
    gas = 50
  ) {
    const car = new Car(
      make,
      country,
      img,
      special,
      model,
      price,
      type,
      trans,
      gas
    );

    cars.push(car);
  }

  // produce cars
  function produceCars() {
    makeCar('audi', 'german', './img/cars/pexels-mike-1035108.jpg', false);
    makeCar(
      'chevy',
      'american',
      './img/cars/pexels-garvin-st-villier-3972755.jpg',
      false
    );
    makeCar(
      'mercedes',
      'german',
      './img/cars/pexels-maria-geller-2127039.jpg',
      true
    );
    makeCar(
      'alpone',
      'german',
      './img/cars/pexels-alexgtacar-1592384.jpg',
      false
    );
    makeCar(
      'rumble',
      'german',
      './img/cars/pexels-kelson-downes-1149137.jpg',
      false
    );
    makeCar('horse', 'german', './img/cars/pexels-pixabay-210019.jpg', false);
    makeCar(
      'luxuri',
      'american',
      './img/cars/pexels-yurii-hlei-1545743.jpg',
      false
    );
    makeCar('mercedes', 'german', './img/cars/pexels-mike-1035108.jpg');
    makeCar(
      'bmw',
      'german',
      './img/cars/pexels-mike-2365572.jpg',
      undefined,
      'other model'
    );
    makeCar(
      'kawasaki',
      'japan',
      './img/cars/pexels-erik-mclean-5214413.jpg',
      true
    );
    makeCar(
      'toyota',
      'japan',
      './img/cars/pexels-albin-berlin-905554.jpg',
      true
    );
  }
  produceCars();
  // filter the special cars
  const specialCars = cars.filter((car) => car.special === true);

  return {
    cars,
    specialCars,
  };
})();

const DisplaySpecialCars = ((createCarsFunc) => {
  const specialCars = createCarsFunc.specialCars;

  let data = '';
  specialCars.forEach((car) => {
    data += `<!-- item -->
            <div
              class="
                featured-item
                my-3
                d-flex
                p-2
                text-capitalize
                align-items-baseline
                flex-wrap
              "
            >
              <span data-img="${car.img}" class="featured-icon mr-2">
                <i class="fa fa-car"></i>
              </span>
              <h5 class="font-weight-bold mx-1">${car.make}</h5>
              <h5 class="mx-1">${car.model}</h5>
            </div>`;
  });
  $('.featured-info').html(data);
})(CreateCars);

// chaging the img
$('.featured-item').click(changingImg);
function changingImg(e) {
  const img = $(e.currentTarget).children().first().data('img');
  $('.featured-photo').attr('src', img);
}

/*====================
  inventory
======================*/
// display inventory
const DisplayInventory = ((CreateCarsFunc) => {
  let { cars } = CreateCarsFunc;
  cars = cars.filter((car) => car.special === false);

  let tags = cars.reduce((acc, car) => {
    return acc.add(car.country);
  }, new Set().add('all'));

  // display filter buttons
  let filterBtnContent = '';
  tags.forEach((item) => {
    filterBtnContent += `<button class="btn btn-outline-secondary text-uppercase mx-1" data-country="${item}">
              ${item}
            </button>`;
  });
  $('.filter-buttons').html(filterBtnContent);

  // add event to filter buttons
  $('.filter-buttons button').click(function () {
    let country = $(this).data('country');
    let filteredCars = cars;
    if (country !== 'all') {
      filteredCars = cars.filter((car) => car.country === country);
    }
    displayCars(filteredCars);
  });

  // display cars
  function displayCars(cars) {
    displayCarsContent = '';
    cars.forEach((car) => {
      displayCarsContent += `<!-- item -->
          <div class="col-10 my-3 col-md-6 col-lg-4 ${car.country}">
            <div class="card my-3">
              <img
                src="${car.img}"
                alt="car"
                class="card-img-top mw-100"
              />
              <div class="card-body">
                <div class="card-info d-flex justify-content-between">
                  <div class="car-text text-uppercase">
                    <h6 class="font-weight-bold">${car.make}</h6>
                    <h6>${car.model}</h6>
                  </div>
                  <h5 class="car-value align-self-center py-2 px-3 bg-warning">
                    $<span>${car.price}</span>
                  </h5>
                </div>
              </div>
              <div
                class="
                  card-footer
                  text-capitalize
                  d-flex
                  justify-content-between
                "
              >
                <p>
                  <span><i class="fas fa-car"></i></span>${car.type}
                </p>
                <p>
                  <span><i class="fas fa-cogs"></i></span>${car.trans}
                </p>
                <p>
                  <span><i class="fas fa-gas-pump"></i></span>${car.gas}
                </p>
              </div>
            </div>
          </div>`;

      $('div.displayCars').html(displayCarsContent);
    });
  }

  displayCars(cars);
})(CreateCars);
