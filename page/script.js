// تهيئة العداد
let count = 0;
const countDisplay = document.getElementById("count");

// تحميل الذكر المحدد
function loadSelectedDhikr() {
    const selectedText = localStorage.getItem('selectedDhikrText') || 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر';
    const selectedCount = localStorage.getItem('selectedDhikrCount') || '33';
    document.getElementById("dhikr-text").textContent = selectedText;
    document.getElementById("dhikr-count").textContent = `عدد التكرار: ${selectedCount}`;
}

// أحداث الأزرار
document.getElementById("increment-btn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

document.getElementById("reset-btn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
});

document.getElementById("open-dhikr-btn").addEventListener("click", () => {
    window.location.href = "azkar/azkar.html";
});

// إدارة القائمة الجانبية
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");

    sidebar.classList.toggle("open");
    menuIcon.innerHTML = sidebar.classList.contains("open") ? "✖" : "☰";
}

document.addEventListener("click", function (event) {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
        menuIcon.innerHTML = "☰";
    }
});

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    loadSelectedDhikr();
});