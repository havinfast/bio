const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var btnSwitchMode = $(".switch-mode");
var checkDarkMode = false;
var body = $("body");

const app = {
    getLocalStorage: function () {
        var darkChecked = JSON.parse(localStorage.getItem("checked"));
        if (!darkChecked) {
            body.classList.remove("dark-mode");
            btnSwitchMode.setAttribute("title", "switch to dark mode");
            checkDarkMode = false;
        } else {
            body.classList.add("dark-mode");
            btnSwitchMode.setAttribute("title", "switch to light mode");
            checkDarkMode = true;
        }
    },
    handleEvents: function () {
        btnSwitchMode.onclick = () => {
            if (checkDarkMode) {
                body.classList.remove("dark-mode");
                btnSwitchMode.setAttribute("title", "switch to dark mode");
                localStorage.setItem("checked", false);
                checkDarkMode = false;
            } else {
                body.classList.add("dark-mode");
                btnSwitchMode.setAttribute("title", "switch to light mode");
                localStorage.setItem("checked", true);
                checkDarkMode = true;
            }
        };
    },
    start: function () {
        this.getLocalStorage();
        this.handleEvents();
    },
};
app.start();

const Uname = $(".text .name.txt p");
const quote = $(".quote i");
const address = $(".address .ad");
const contact = $(".contact");
const avatarBg = $(".avatar-img-bg");
const avatar = $(".avatar-img");

fetch("https://raw.githubusercontent.com/havinfast/bio/refs/heads/main/data.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        avatar.src = data.Avatar;
        avatarBg.src = data.AnhBia;
        Uname.innerHTML = data.Ten;
        quote.innerHTML = data.TieuDe;
        address.innerHTML = data.DiaChi;

        const contactList = data.LienHe.map((item) => {
            let link = item.Link;
            let LinkHienThi = item.Link;
            if (LinkHienThi.includes("https://www.")) {
                LinkHienThi = LinkHienThi.replace("https://www.", "https://");
            }
            if (LinkHienThi.includes("https://")) {
                LinkHienThi = LinkHienThi.replace("https://", "");
            }
            if (LinkHienThi.includes("www.")) {
                LinkHienThi = LinkHienThi.replace("www.", "");
            }
            if (/^\d+$/.test(link)) {
                link = "https://zalo.me/" + link;
            }

            console.log(link);
            return `<a href="${link}"  class="card-contact">
                                <div class="card-contact-img">
                                    <img
                                        src="${item.iconLink}"
                                        alt="logo"
                                    />
                                </div>
                                <div class="card-contact-text">
                                    <div class="card-contact-name">${item.TenHienThi}</div>
                                    <div class="card-contact-title">${LinkHienThi}</div>
                                </div>
                            </a>`;
        });
        contact.innerHTML = contactList.join("");
    })
    .catch((error) => console.error("Lỗi:", error));
