// Navigation
function showTab(tabName) {
  const tabs = ['Posts','Contacts','Live','Videos','Shorts'];
  tabs.forEach(t => {
    document.getElementById('view'+t).classList.add('hidden');
    document.getElementById('tab'+t).classList.remove('active');
  });
  document.getElementById('view'+tabName).classList.remove('hidden');
  document.getElementById('tab'+tabName).classList.add('active');
}

// Posts
const posts = [];
document.getElementById('postForm').onsubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('postInput');
  if (input.value.trim()) {
    posts.push({
      text: input.value.trim(),
      likes: 0,
      timestamp: new Date().toLocaleTimeString()
    });
    input.value = '';
    renderPosts();
  }
};
function likePost(idx) {
  posts[idx].likes++;
  renderPosts();
}
function renderPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';
  posts.slice().reverse().forEach((post, idx) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <div>${escapeHTML(post.text)}</div>
      <button class="like-btn" onclick="likePost(${posts.length-1-idx})">👍 Like</button>
      <span class="like-count">${post.likes} likes</span>
      <span class="timestamp">${post.timestamp}</span>
    `;
    postsDiv.appendChild(postDiv);
  });
}
window.likePost = likePost;
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m];
  });
}

// Contacts
const contacts = [
  {name: 'Jane Doe', avatar: 'https://randomuser.me/api/portraits/women/44.jpg'},
  {name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg'}
];
function renderContacts() {
  const list = document.getElementById('contactsList');
  list.innerHTML = '';
  contacts.forEach((contact, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img class="contact-avatar" src="${contact.avatar}" alt="avatar" />
      <span>${contact.name}</span>
      <button style="margin-left:auto" onclick="removeContact(${idx})">Remove</button>
    `;
    list.appendChild(li);
  });
}
function removeContact(idx) {
  contacts.splice(idx, 1);
  renderContacts();
}
window.removeContact = removeContact;
document.getElementById('addContactForm').onsubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('contactName');
  if(input.value.trim()) {
    contacts.push({
      name: input.value.trim(),
      avatar: "https://randomuser.me/api/portraits/lego/3.jpg"
    });
    input.value = '';
    renderContacts();
  }
};

// Videos & Shorts (simulated)
const sampleVideos = [
  {title: "My First Vlog", src: "https://www.w3schools.com/html/mov_bbb.mp4"},
  {title: "Dog Playing", src: "https://www.w3schools.com/html/movie.mp4"},
];
const sampleShorts = [
  {title: "Funny Cat", thumb: "https://placekitten.com/200/300"},
  {title: "Dance Clip", thumb: "https://placekitten.com/200/301"},
  {title: "Magic Trick", thumb: "https://placekitten.com/200/302"},
];
function renderVideos() {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';
  sampleVideos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <video controls src="${v.src}" poster="https://placehold.co/400x225?text=Video"></video>
      <div class="video-title">${v.title}</div>
    `;
    grid.appendChild(card);
  });
}
function renderShorts() {
  const grid = document.getElementById('shortsGrid');
  grid.innerHTML = '';
  sampleShorts.forEach(s => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img src="${s.thumb}" alt="Short thumbnail">
      <div class="video-title">${s.title}</div>
    `;
    grid.appendChild(card);
  });
}

// Initial render
renderPosts();
renderContacts();
renderVideos();
renderShorts();
