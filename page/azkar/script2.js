// // عرض وإخفاء القائمة الجانبية
// function toggleMenu() {
//     var sidebar = document.getElementById("sidebar");
//     sidebar.classList.toggle("open");
// }

// // إغلاق القائمة عند النقر خارجها
// document.addEventListener("click", function (event) {
//     var sidebar = document.getElementById("sidebar");
//     var menuIcon = document.querySelector(".menu-icon");

//     if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
//         sidebar.classList.remove("open");
//     }
// });

// // تحميل الأذكار من التخزين المحلي عند فتح الصفحة
// document.addEventListener("DOMContentLoaded", function () {
//     loadAzkar();
    
//     // إضافة حدث النقر على الأذكار
//     document.getElementById('azkar-list').addEventListener('click', function(event) {
//         if (event.target.classList.contains('delete-btn')) return;
        
//         const card = event.target.closest('.azkar-card');
//         if (card) {
//             const text = card.dataset.text;
//             const count = card.dataset.count;
//             localStorage.setItem('selectedDhikrText', text);
//             localStorage.setItem('selectedDhikrCount', count);
//             window.location.href = '../index.html';
//         }
//     });
// });

// // إضافة ذكر جديد
// function addZekr() {
//     let zekrInput = document.getElementById("zekr-input").value.trim();
//     let zekrCount = document.getElementById("zekr-count").value;
//     let azkarList = document.getElementById("azkar-list");

//     if (zekrInput === "" || zekrCount === "" || zekrCount <= 0) {
//         alert("الرجاء إدخال ذكر صحيح وعدد التكرار.");
//         return;
//     }

//     let card = document.createElement("div");
//     card.classList.add("azkar-card");
//     card.dataset.text = zekrInput;
//     card.dataset.count = zekrCount;
//     card.innerHTML = `
//         <span>${zekrInput} - ${zekrCount} مرات</span>
//         <button class="delete-btn" onclick="deleteZekr(this)">حذف</button>
//     `;

//     azkarList.appendChild(card);
//     saveAzkar();

//     // مسح المدخلات بعد الإضافة
//     document.getElementById("zekr-input").value = "";
//     document.getElementById("zekr-count").value = "";
// }

// // حذف الذكر
// function deleteZekr(btn) {
//     btn.parentElement.remove();
//     saveAzkar();
// }

// // حفظ الأذكار في LocalStorage
// function saveAzkar() {
//     let azkarCards = document.querySelectorAll('.azkar-card');
//     let azkarArray = [];
    
//     azkarCards.forEach(card => {
//         azkarArray.push({
//             text: card.dataset.text,
//             count: card.dataset.count
//         });
//     });
    
//     localStorage.setItem("azkarList", JSON.stringify(azkarArray));
// }

// // تحميل الأذكار المحفوظة
// function loadAzkar() {
//     let azkarList = document.getElementById("azkar-list");
//     let storedAzkar = JSON.parse(localStorage.getItem("azkarList")) || [];

//     storedAzkar.forEach(zekr => {
//         let card = document.createElement("div");
//         card.classList.add("azkar-card");
//         card.dataset.text = zekr.text;
//         card.dataset.count = zekr.count;
//         card.innerHTML = `
//             <span>${zekr.text} - ${zekr.count} مرات</span>
//             <button class="delete-btn" onclick="deleteZekr(this)">حذف</button>
//         `;
//         azkarList.appendChild(card);
//     });
// }


// قائمة الأذكار الثابتة
const fixedAzkar = [
    { text: "لا إله إلا الله وحده لا شريك له له الملك وله الحمد يحيي ويميت وهو على كل شيء قدير", count: 100 },
    { text: "سبحان الله وبحمده", count: 100 },
    { text: "لا إله إلا الله", count: 50 },
    { text: "سبحان الله العظيم وبحمده عدد خلقه، سبحان الله رضا نفسه، سبحان الله زنة عرشه، سبحانه الله مداد كلماته", count: 3 },
    { text: "سبحان الله عدد ما خلق في السماء، سبحان الله عدد ما خلق في الأرض، سبحان الله عدد ما خلق بينهما، سبحان الله عدد ما هو خالق، والحمد لله مثل ذلك، ولا إله إلا الله مثل ذلك، والله أكبر مثل ذلك، ولا حول ولا قوة إلا بالله مثل ذلك", count: 3 },
    { text: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ ﴿١﴾ ٱللَّهُ ٱلصَّمَدُ ﴿٢﴾ لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ ﴿٣﴾ وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ ﴿٤﴾ يَجْمَعُ كَفَّيْهِ ثُمَّ يَنْفُثُ فِيهِمَا فَيَقْرَأُ فِيهِمَا:", count: 3 },
    { text: "قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾", count: 3 },
    { text: "قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ ﴿١﴾ مَلِكِ ٱلنَّاسِ ﴿٢﴾ إِلَٰهِ ٱلنَّاسِ ﴿٣﴾ مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ ﴿٤﴾ ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ ﴿٥﴾ مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ ﴿٦﴾", count: 3 },
    { text: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1 },
    { text: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلآئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لاَ نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُواْ سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ* لاَ يُكَلِّفُ اللَّهُ نَفْساً إِلاَّ وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْراً كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَآ أَنتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", count: 1 },
    { text: "قُلۡ يَٰٓأَيُّهَا ٱلۡكَٰفِرُونَ ﴿١﴾ لَآ أَعۡبُدُ مَا تَعۡبُدُونَ ﴿٢﴾ وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ ﴿٣﴾ وَلَآ أَنَا۠ عَابِدٞ مَّا عَبَدتُّمۡ ﴿٤﴾ وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ ﴿٥﴾ لَكُمۡ دِينُكُمۡ وَلِيَ دِينِ ﴿٦﴾", count: 1 },
    { text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.", count: 1 },
    { text: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْياهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ.", count: 1 },
    { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.", count: 1 },
    { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.", count: 1 },
    { text: "سُبْحَانَ اللَّهِ (ثلاثاً وثلاثين) وَالْحَمْدُ لِلَّهِ (ثلاثاً وثلاثين) وَاللَّهُ أَكْبَرُ (ثلاثًا وثلاثين).", count: 33 },
    { text: "اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَرَبَّ الأَرْضِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ، وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ. اللَّهُمَّ أَنْتَ الأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الآخِرُ فَلَيسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ.", count: 1 },
    { text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لاَ كَافِيَ لَهُ وَلاَ مُؤْوِيَ.", count: 1 },
    { text: "اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.", count: 1 },
    { text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ.", count: 1 },
    { text: "اللَّهمَّ إِنِّي أَعُوُذُ بِكَ مِنَ الْبرَصِ، وَالجُنُونِ، والجُذَامِ، وسّيءِ الأَسْقامِ", count: 1 },



    { text: "اللهم صل وسلم على نبينا محمد", count: 100 }
];

// عرض وإخفاء القائمة الجانبية
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", function (event) {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
    }
});

// تحميل الأذكار عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadAzkar();

    // إضافة حدث النقر على الأذكار
    document.getElementById('azkar-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) return;

        const card = event.target.closest('.azkar-card');
        if (card) {
            const text = card.dataset.text;
            const count = card.dataset.count;
            localStorage.setItem('selectedDhikrText', text);
            localStorage.setItem('selectedDhikrCount', count);
            window.location.href = '../index.html';
        }
    });
});

// إضافة ذكر جديد
function addZekr() {
    let zekrInput = document.getElementById("zekr-input").value.trim();
    let zekrCount = document.getElementById("zekr-count").value;
    let azkarList = document.getElementById("azkar-list");

    if (zekrInput === "" || zekrCount === "" || zekrCount <= 0) {
        alert("الرجاء إدخال ذكر صحيح وعدد التكرار.");
        return;
    }

    let card = document.createElement("div");
    card.classList.add("azkar-card");
    card.dataset.text = zekrInput;
    card.dataset.count = zekrCount;
    card.innerHTML = `
        <span>${zekrInput} <br> ${zekrCount} مرات</span>
        
        <button class="delete-btn" onclick="deleteZekr(this)">حذف</button>
    `;

    azkarList.appendChild(card);
    saveAzkar();

    // مسح المدخلات بعد الإضافة
    document.getElementById("zekr-input").value = "";
    document.getElementById("zekr-count").value = "";
}

// حذف الذكر (مع منع حذف الأذكار الثابتة)
function deleteZekr(btn) {
    let card = btn.parentElement;
    let text = card.dataset.text;

    // التحقق مما إذا كان الذكر ثابتًا
    if (fixedAzkar.some(zekr => zekr.text === text)) {
        alert("لا يمكن حذف الأذكار الثابتة.");
        return;
    }

    card.remove();
    saveAzkar();
}

// حفظ الأذكار في LocalStorage
function saveAzkar() {
    let azkarCards = document.querySelectorAll('.azkar-card:not(.fixed)');
    let azkarArray = [];

    azkarCards.forEach(card => {
        azkarArray.push({
            text: card.dataset.text,
            count: card.dataset.count
        });
    });

    localStorage.setItem("azkarList", JSON.stringify(azkarArray));
}

// تحميل الأذكار المحفوظة وإضافة الثابتة
function loadAzkar() {
    let azkarList = document.getElementById("azkar-list");
    azkarList.innerHTML = ""; // تفريغ القائمة قبل التحميل

    let storedAzkar = JSON.parse(localStorage.getItem("azkarList")) || [];

    // دمج الأذكار الثابتة مع المحفوظة
    let allAzkar = [...fixedAzkar, ...storedAzkar];

    allAzkar.forEach(zekr => {
        let card = document.createElement("div");
        card.classList.add("azkar-card");
        card.dataset.text = zekr.text;
        card.dataset.count = zekr.count;
        card.innerHTML = `
            <span>${zekr.text} <br> ${zekr.count} مرات</span>
            ${fixedAzkar.some(fixed => fixed.text === zekr.text) ? "" : `<button class="delete-btn" onclick="deleteZekr(this)">❌</button>`}
        `;

        if (fixedAzkar.some(fixed => fixed.text === zekr.text)) {
            card.classList.add("fixed"); // تمييز الأذكار الثابتة
        }

        azkarList.appendChild(card);
    });
}
