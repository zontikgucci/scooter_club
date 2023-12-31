import * as flsFunction from './modules/function.js'

flsFunction.isWebp()

// Функция, котороя уберает зафиксированную кнопку не протяжении всего скоролла
function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mainLinkButton.style.opacity = "0"
      mainLinkButton.style.pointerEvents = "none"
    } else {
      mainLinkButton.style.opacity = "1"
      mainLinkButton.style.pointerEvents = "auto"
    }
  })
}

const observer = new IntersectionObserver(handleIntersection)

const detailBlock = document.querySelector(".detail")
const mainLinkButton = document.querySelector(".link--main")

observer.observe(detailBlock)


// Убрать defaul поведение ссылок
const links = document.querySelectorAll('a')

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
  })
})


// функция слайдера
function slider(sectionSelector,containerSelector,
  trackSelector, itemSelector,
  prevBtnSelector, nextBtnSelector,
  slideToShow, slideToScroll) {

  const screenWidth = document.querySelector(sectionSelector).clientWidth

  if (screenWidth < 475) {
    const container = document.querySelector(containerSelector)
    const track = document.querySelector(trackSelector)
    const btnPrev = document.querySelector(prevBtnSelector)
    const btnNext = document.querySelector(nextBtnSelector)
    const item = document.querySelector(itemSelector)
    const items = document.querySelectorAll(itemSelector)
    const itemCount = items.length

    const itemWidth = container.clientWidth / slideToShow
    const margin = Number(getComputedStyle(item).marginRight.slice(0, 2))
    const itemMargin = Number.isNaN(margin) ? 0 : margin // Значение margin-right из CSS
    const totalItemWidth = itemWidth + itemMargin // Общая ширина элемента с учетом маргина
    const movePosition = slideToScroll * totalItemWidth

    items.forEach((i) => i.style.minWidth = `${itemWidth}px`)

    let position = 0

    btnNext.addEventListener('click', () => {
      const itemsLeft = itemCount - (Math.abs(position) / totalItemWidth)
      position -= itemsLeft >= slideToScroll ? movePosition : itemsLeft * totalItemWidth

      setPosition()
      checkButton()
    })

    btnPrev.addEventListener('click', () => {
      const itemsLeft = Math.abs(position) / totalItemWidth 
      position += itemsLeft >= slideToScroll ? movePosition : itemsLeft * totalItemWidth

      setPosition()
      checkButton()
    })

    const setPosition = () => {
      track.style.transform = `translateX(${position}px)`
    }

    const checkButton = () => {
      btnPrev.disabled = position === 0
      btnNext.disabled = position <= -(itemCount - slideToShow) * totalItemWidth 
    }

    checkButton()
  }
}

slider(
  '.exclusive',
  '.exclusive__container',
  '.exclusive__track',
  '.exclusive__item',
  '.exclusive__prev',
  '.exclusive__next',
  1,
  1
)




