
function selectCard(element) {
    element.classList.add('selected');
}

function deselectCard(element) {
    element.classList.remove('selected');
}


function showForm() {
    document.getElementById("myForm").style.display = "block";
}


function showModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}