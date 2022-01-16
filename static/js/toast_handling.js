export function toastHandling() {
    const toast = document.querySelector(".toast")
    if (toast != null) {
        new ToastHandling(toast);
    }
}

class ToastHandling {
    constructor(toast) {
        this.toast = toast
        this.init()
    }

    init() {
        this.overwrite()
    }

    overwrite() {
        // let title = this.toast.querySelector("strong");
        let time = this.toast.querySelector("small");
        // let description = this.toast.querySelector(".toast-body");
        const currentDate = new Date()
        time.innerText = currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds();
        new bootstrap.Toast(this.toast).show();
    }
}
