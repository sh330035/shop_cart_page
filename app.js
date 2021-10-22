// Data
const shoppingCart = [
  {
    id: 1,
    name: '破壞補釘修身牛仔褲',
    unitPrice: 3999,
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    count: 1
  },
  {
    id: 2,
    name: '刷色直筒牛仔褲',
    unitPrice: 1299,
    image:
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    count: 1
  },
  {
    id: 3,
    name: '修身窄管牛仔褲',
    unitPrice: 1399,
    image:
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=386&q=80',
    count: 1
  }
]

const deliveryMethod = [
  {
    id: 'standard-method',
    method: 'standardMethod',
    fee: 0,
    showed: '免費'
  },
  {
    id: 'DHL-method',
    method: 'DHLMethod',
    fee: 500,
    showed: '$500'
  }
]

// variable setting
// nav-bar
const navbarToggler = document.querySelector('.hamburger')
const navbar = document.querySelector('.nav')
// page switch
const stepper = document.querySelectorAll('.step')
const formPart = document.querySelectorAll('.part')
// cart
const cartContent = document.querySelector('.cart-items')
const deliveryFee = document.querySelector('.delivery-fee')
const totalCost = document.querySelector('.total-cost')
// delivery
const deliveryBoxes = document.querySelector('.delivery-boxes')
// button
const btnControl = document.getElementById('btn-control')
const btnNext = document.querySelector('.btn-next')
const btnPre = document.querySelector('.btn-previous')
const btnSumit = document.querySelector('.btn-submit')
const darkModeButton = document.querySelector('.icon-darkmode')

let step = 0
let fee = 0

// 購物籃資料渲染畫面
renderCartContent(shoppingCart)
function renderCartContent(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="item-card">
                  <div class="item-image">
                    <img
                      src=${item.image}
                    />
                  </div>
                  <div class="item-content">
                    <div class="item-title">${item.name}</div>
                    <div class="item-count" data-id="${item.id}">
                      <div class="minus">-</div>
                      <div class="count">${item.count}</div>
                      <div class="add">+</div>
                    </div>
                    <div class="item-unit-price">$${item.unitPrice}</div>
                  </div>
                </div>`
  })
  cartContent.innerHTML = rawHTML
  calculateSubtotal()
}
// nav-bar toggle
function navbarEventHandler(e) {
  if (e.target.matches('.hamburger') || e.target.matches('.ham')) {
    navbar.classList.toggle('d-none')
  }
}

// 表單分頁轉換
function btnClickEventHandler(e) {
  e.preventDefault()

  if (e.target.matches('.btn-next')) {
    stepper[step].classList.toggle('checked')
    formPart[step].classList.toggle('d-none')
    btnControl.classList.remove(`button-page-${step + 1}`)
    step++
    stepper[step].classList.toggle('active')
    formPart[step].classList.toggle('d-none')
    btnControl.classList.add(`button-page-${step + 1}`)
  } else if (e.target.matches('.btn-previous')) {
    stepper[step].classList.toggle('active')
    formPart[step].classList.toggle('d-none')
    btnControl.classList.remove(`button-page-${step + 1}`)
    step--
    stepper[step].classList.toggle('checked')
    formPart[step].classList.toggle('d-none')
    btnControl.classList.add(`button-page-${step + 1}`)
  }
}

// 購物籃數量加減
function countEventHandler(e) {
  const targetId = e.target.parentElement.dataset.id
  const targetItem = shoppingCart.find((element) => element.id == targetId)

  if (e.target.matches('.add')) {
    targetItem.count++
  } else if (e.target.matches('.minus') && targetItem.count > 1) {
    targetItem.count--
  }

  renderCartContent(shoppingCart)
  calculateSubtotal()
}

// delivery fee change
function deliveryChangeHandler(e) {
  const target = e.target
  const targetMethod = deliveryMethod.find((element) => element.id == target.id)
  const feeShowed = targetMethod.showed

  deliveryFee.innerHTML = feeShowed
  fee = targetMethod.fee

  calculateSubtotal()
  return fee
}

// total cost change
function calculateSubtotal() {
  let itemSubtotal = 0
  for (let i = 0; i < shoppingCart.length; i++) {
    itemSubtotal += shoppingCart[i].unitPrice * shoppingCart[i].count
  }
  let subTotal = itemSubtotal + fee
  totalCost.innerHTML = `$${subTotal}`
}

// dark-mode function
function darkModeChange() {
  document.documentElement.classList.toggle('theme-light')
  document.documentElement.classList.toggle('theme-dark')
}

// Event Listener
btnControl.addEventListener('click', btnClickEventHandler)
cartContent.addEventListener('click', countEventHandler)
deliveryBoxes.addEventListener('change', deliveryChangeHandler)
navbarToggler.addEventListener('click', navbarEventHandler)
darkModeButton.addEventListener('click', darkModeChange)

// 信用卡卡號、日期，限制數字；自動跳格 -> jquery 應用
$('input.input-seperate').on('keydown', function (e) {
  // 48~57為數字鍵之範圍；8為backspace；9為tab
  // 96~105為鍵盤右側數字鍵之編號，限制非數字者無法輸入
  if (
    (e.which >= 48 && e.which <= 57) ||
    (e.which >= 96 && e.which <= 105) ||
    e.which == 8 ||
    e.which == 9
  ) {
    // 輸入處若刪除至無數字(length=0)，則游標往前一格
    if (e.target.value.length == 0 && e.which == 8) {
      $(this).prev().focus()
    }
  } else {
    e.preventDefault()
  }
})

$('input.input-seperate').on('keyup', function (e) {
  // \D 代表非數字字元，g 代表全域尋找
  let str = e.target.value.replace(/\D/g, '')
  // 取得當下input之size
  let inputSize = $(this)[0].size
  // 當輸入字數等於input size時，游標往下一格
  if (str.length == inputSize) {
    $(this).next().focus()
  }
})
