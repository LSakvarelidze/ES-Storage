const sButton = document.getElementById('submitToGoogle');
const fetchName = document.getElementById('fetchName');
const loader = document.getElementById('loader');
const errorText = document.querySelector('.errorText').textContent;
sButton.disabled = true
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  $('.alert-success').show();
  $('.alert-success').fadeTo(3000, 0);
  setTimeout(_=> {
    $('.alert-success').fadeTo(0, 100);
    $('.alert-success').hide()
  }, 3000);
}
//Post to google sheets
function fetchData() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwwK9bq7-icY9gFWJwJFwGCeGkHkvhp0oSqVLug_N3zL7t-R56ppdZ6zQhj9bEeGJRs/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        loader.classList.remove('show')
        loader.classList.add('hide')
        window.location.reload();
        sessionStorage.clear();
      }).catch(error => {
        errorText = error.message
        loader.classList.remove('show')
        loader.classList.add('hide')
        $('.alert-danger').show();
        $('.alert-danger').fadeTo(3000, 0);
        setTimeout(_=> {
          $('.alert-danger').fadeTo(0, 100);
          $('.alert-danger').hide()
        }, 3000);
      })
  })
};
//Loader until response
sButton.onclick = async function () {
  loader.classList.remove('hide')
  loader.classList.add('show')
  fetchData()
};

function checkUser(event) {
  let password = document.querySelector('#passwd').value
  $.getJSON("users.json", data => {
      let users = data[0]
      var keys = Object.keys(users);
      keys.forEach(key => {
        if(password === key) {
          sButton.disabled = false
          let userInfo = users[key].name
          fetchName.setAttribute('value', userInfo)
        }
      }) 
  })
}

function sameValue() {
  let trigger = document.getElementById('letTrig');
  let getFields = document.querySelectorAll('.item-count');
  let eachItems = document.querySelectorAll('.eachItem');
  let updateTotalCard = document.querySelector('.total-cart');
  let updateTotal = 0;
  let parseStorage = JSON.parse(sessionStorage.getItem('shoppingCart'));
  if(getFields.length == 0) {
    alert('Basket is empty!')
    trigger.value = ''
  } else {
    getFields.forEach(field => {
      field.defaultValue = trigger.value;
      eachItems.forEach(eachItem => {
        eachItem.textContent = trigger.value
      })
      updateTotal += parseInt(field.defaultValue);
      updateTotalCard.textContent = updateTotal;
    })
    let lastResult = parseStorage.map((elem, index) => ({name: parseStorage[index].name, count: parseInt(trigger.value)}))
    sessionStorage.setItem('shoppingCart', JSON.stringify(lastResult));
    lastResult.forEach(lastres => {
      var name = lastres.name
      var count = lastres.count
      updateVals(name, count);
    })
    function updateVals(name, count) {
      var name = name;
      var count = Number(count);
      shoppingCart.setCountForItem(name, count)
      displayCart();
    }
  }
}


 // sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
 // cart = JSON.parse(sessionStorage.getItem('shoppingCart'));