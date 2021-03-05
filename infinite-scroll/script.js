const imagesContainer = document.querySelector('.images-container')

const count = 5
const apiKey = 'dMdOCFmzbscrG-TLkvWhEB5rRTFJJ4cU6yumdTrxNeE'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Fetch photos from API using count query params
async function getRandomImage() {
  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

function getPhotos() {
  getRandomImage().then(photos => {
    photos.forEach(photo => {
      const img = document.createElement('img')
      img.setAttribute('src', photo.urls.regular)
      img.setAttribute('alt', photo.alt_description)
      imagesContainer.appendChild(img)
    })
  })
}

// Infinite Scroll Logic
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos()
  }
})

// On load
getPhotos()
