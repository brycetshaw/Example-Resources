// JS code goes here

function getInputs() {
    let inputs = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value
    }

    checkIfValid(inputs) ?
        handleValid(inputs) :
        handleInvaid();
}

function checkIfValid(inputs) {
    const {name, mobile, email} = inputs

    //check name
    const nameMaxLength = 20;
    const nameAllowable = "^[a-zA-Z\\s]*$";
    if (
        !(name.match(nameAllowable)) ||
        name.length > nameMaxLength ||
        name.length < 1
    ) {

        console.log(name + 'name invalid');
        return false;
    }

    //check phone number
    const phoneLength = 10;
    const phoneAllowable = "^[0-9]+$";
    if (
        !(mobile.match(phoneAllowable)) ||
        (mobile.length !== phoneLength)
    ) {
        console.log(mobile + 'phone invalid');
        return false;
    }

    //check email address
    const maxEmailLength = 40;
    const emailRegex = "\\S+@\\S+\\.\\S+"; //string@string.string
    if (email.length > maxEmailLength || !(email.match(emailRegex))) {
        console.log('email invalid');
        return false;
    }

    return true;
}

function handleValid(inputs) {
    const {name, mobile, email} = inputs
    document.getElementById("error").classList.add('dn');
    let newEntry = document.getElementById('summaryTable')
        .getElementsByTagName('tbody')[0]
        .insertRow();
    newEntry.innerHTML = (`<td>${name}</td>
    <td>${mobile}</td>
    <td>${email}</td>`)

}
function handleInvaid() {
    document.getElementById("error").classList.remove('dn');
}

document.getElementById('submit').addEventListener("click", getInputs)
