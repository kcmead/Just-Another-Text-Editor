// Get the reference to the install button element
const butInstall = document.getElementById('buttonInstall');

// Logic for handling the PWA installation process
// TODO: Add an event handler to intercept the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser prompt for installation
    event.preventDefault();

    // Make the install button visible
    butInstall.style.visibility = 'visible';

    // Change the install button text
    butInstall.textContent = 'Install!';
});

// TODO: Implement a click event handler for the install button
butInstall.addEventListener('click', async () => {
    // Disable the install button to prevent multiple clicks during installation
    butInstall.setAttribute('disabled', true);

    // Change the install button text to indicate the installation is in progress
    butInstall.textContent = 'Installed!';
});

// TODO: Add an event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // Log a message when the app is successfully installed
    console.log('HUZZAH! App Successfully Installed!', 'appinstalled', event);
});