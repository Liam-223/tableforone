function showModal(title, desc, link) {
  document.getElementById('modal-title').textContent = title;
  const descElem = document.getElementById('modal-description');
  descElem.textContent = desc;
  document.getElementById('modal-link').href = link;
  document.getElementById('modal-link').textContent = 'Visit ' + title;
  document.getElementById('modal').style.display = 'flex';
  // Auto-resize the description box to fit content
  setTimeout(() => {
    descElem.style.height = 'auto';
    descElem.style.height = descElem.scrollHeight + 'px';
  }, 10);
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Close when clicking outside
window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    closeModal();
  }
};
