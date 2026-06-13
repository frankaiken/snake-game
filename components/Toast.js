const Toast = {
    show(message, type = "success") {
        const container = document.getElementById("toastContainer");
        
        // 1. Create a new div element
        const toast = document.createElement("div");
        toast.classList.add("toast");
        
        // 2. Apply a special class if it's a Game Over toast
        if (type === "error") {
            toast.classList.add("game-over");
        }
        
        // 3. Set the text
        toast.innerText = message;
        
        // 4. Inject it into the container
        container.appendChild(toast);
        
        // 5. Automatically remove it after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};