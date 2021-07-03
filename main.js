function success(id) {
    console.log(`Success! id=${id}`)
}

// Dialog must have buttons with "submit" and "cancel" id's
// Submit button must have type == submit
// Cancel button must have type == reset
// Buttons must be enclosed  in <form> tags
// Returns true if the user pressed submit AND the callback function was executed, false otherwise
function handleConfirmDialog(templateID, idToConfirm, callbackOnSuccess=null, callbackOnFailure= null) {

    function fromTemplate(id) {
        const template = document.getElementById(id);
        return template.content.cloneNode(true);
    }

    let trueValue = "true"
    let falseValue = "false"

    // Creat a dialog element
    let dlg = document.createElement("dialog");

    // Call it the active_dialog
    dlg.setAttribute("id", "active_dialog");

    // Append it to the new dialog element
    dlg.append(fromTemplate(templateID))

    // Append the dialog element to the DOM
    document.body.append(dlg);

    // Add event listeners for submit and cancel buttons
    dlg.querySelector("#submit").addEventListener('click', function(){
        dlg.returnValue = trueValue;
    });

    dlg.querySelector("#cancel").addEventListener('click', function(){
        dlg.returnValue = falseValue;
        dlg.close();
    });

    // Add an event listener for the close event. This will call the "callback" function with
    // the "id_to_confirm" as an argument
    dlg.addEventListener('close', function onClose() {
        rv = dlg.returnValue;
        dlg.parentNode.removeChild(dlg);
        if (rv === trueValue) {
            callbackOnSuccess && callbackOnSuccess(idToConfirm);
        }
        else {
            callbackOnFailure && callbackOnFailure();
        }
    });

    dlg.showModal();
}

function run() {
    handleConfirmDialog("confirm", 1, callbackOnSuccess=success, callbackOnFailure= null);
}