document.addEventListener('DOMContentLoaded', () => {

  const login = (socket, token) => {
    socket.emit('login', token)
  }

  const getCookie = (cname) => {
    const name = cname + '='
    const ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  const genUserHtml = (user) => {
    let {
      username = 'Guest',
      status = 'online',
      bio = 'online',
      avatar = '/images/unknown-user.png'
    } = user || {}
    return `
      <li class="user-box ${status}">
        <img src="${avatar}" class="avatar"/>
        <div class="info">
          <div class="nameLabel">${username}</div>
          <i class="bio">${bio}</i>
        </div>
      </li>
    `
  }

  const renderUsers = (users, target) => {
    let html = ''
    users.forEach(user => {
      html += genUserHtml(user)
    })
    target.innerHTML = html
  }

  const socket = io()
  const token = getCookie('token')

  // siderbar controls
  let menuOpen = true
  btnMenu.addEventListener('click', () => {
    if (menuOpen) {
      navbar.className = ''
      sidebar.className = ''
    } else {
      navbar.className = 'open'
      sidebar.className = 'open'
    }
    menuOpen = !menuOpen
  })

  // socket listener
  socket.on('update users', (users) => {
    console.log(users)
    renderUsers(users, usersBox)
  })

  // BOOTS
  login(socket, token)

})
