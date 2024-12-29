var table = document.querySelector("table")

document.addEventListener("DOMContentLoaded", async () => {
    const storage = await chrome.storage.local.get(null)
    const keys = Object.keys(storage)
    keys.forEach(key => {
        var row = table.insertRow();

        var nameCell = row.insertCell(0);
        var deleteCell = row.insertCell(1);

        nameCell.textContent = key;
        deleteCell.innerHTML = '<button class="delete-btn"><i class="fas fa-trash-alt"></i></button>';
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeCommunity(button);
        });
    });

    const addButton = document.querySelector('#add-comm');
    addButton.addEventListener('click', () => {
        addCommunity(addButton)
    })
});

async function addCommunity(button) {
    const textarea = button.closest('div').querySelector('textarea')
    const name = textarea.value

    await chrome.storage.local.set({[name]: "1"}, () => {
        var row = table.insertRow();

        var nameCell = row.insertCell(0);
        var deleteCell = row.insertCell(1);

        nameCell.textContent = name;
        deleteCell.innerHTML = '<button class="delete-btn"><i class="fas fa-trash-alt"></i></button>';

        textarea.value = "";

        // Gotta reload here so the DOMContentLoaded event can trigger and add the click events to the delete buttons.
        // Better approaches are appreciated.
        location.reload();
    });
}

async function removeCommunity(button) {
    const row = button.closest('tr')
    const name = row.getElementsByTagName("td")[0].textContent

    await chrome.storage.local.remove(name, () => {
        table.deleteRow(row.rowIndex);
    });
}