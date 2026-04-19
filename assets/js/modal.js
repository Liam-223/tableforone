function showModal(title, desc, link) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-description').textContent = desc;
  document.getElementById('modal-link').href = link;
  document.getElementById('modal-link').textContent = 'Visit ' + title;
  document.getElementById('modal').style.display = 'block';
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
