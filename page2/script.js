document.addEventListener("DOMContentLoaded", async function () {
    const challengePopup = document.getElementById("challenge-popup");
    const challengeText1 = document.getElementById("challenge-text-1");
    const challengeText2 = document.getElementById("challenge-text-2");
    const checkmark1 = document.getElementById("checkmark-1");
    const checkmark2 = document.getElementById("checkmark-2");
    const crossmark1 = document.getElementById("crossmark-1");
    const crossmark2 = document.getElementById("crossmark-2");
  
    const acceptChallenge = document.getElementById("accept-challenge");
    const acceptChallenge2 = document.getElementById("accept-challenge-2");
    const declineChallenge = document.getElementById("decline-challenge");
    const declineChallenge2 = document.getElementById("decline-challenge-2");
  
    const floatingMessage = document.getElementById("floating-message");
    const floatingMessageText = document.getElementById("floating-message-text");
    const floatingCheck = document.getElementById("floating-check");
    const floatingCross = document.getElementById("floating-cross");
  
    const acceptMusic = document.getElementById("accept-music");
    const declineMusic = document.getElementById("decline-music");
  
    // رابط التحديات
    const SHEET_URL = "https://script.google.com/macros/s/AKfycbyEg96YO6H56kKPwDKfSSA5VaCdIC_j8VaEpNRt9Hpv6cM_pHT2AfnGgJTL2TN1ESw1/exec";
  
    // متغيرات لتخزين التحديات الحالية
    let currentChallenge1 = "";
    let currentChallenge2 = "";
  
    // متغير لتخزين بيانات البطاقة التي تم النقر عليها (لتحديد نوع الإجراء المطلوب)
    // النوع يكون "accept" أو "decline"
    let currentAction = null;
  
    // تحميل التحديات من جوجل شيت
    async function loadChallenges() {
      try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
  
        if (data.challenges && data.challenges.length >= 1) {
          const challenge1 = data.challenges[1][0] || "لا يوجد تحدي";
          const challenge2 = data.challenges[1][1] || "لا يوجد تحدي";
  
          // التحقق من تغيير التحديات وإعادة تعيين الحالة إن لزم الأمر
          if (challenge1 !== currentChallenge1 || challenge2 !== currentChallenge2) {
            resetActivity();
            currentChallenge1 = challenge1;
            currentChallenge2 = challenge2;
          }
  
          challengeText1.textContent = challenge1;
          challengeText2.textContent = challenge2;
          challengePopup.style.display = "flex";
  
          // استرجاع الحالة من الجلسات السابقة (إذا كانت موجودة)
          if (localStorage.getItem('acceptedChallenge1') === 'true') {
            checkmark1.style.display = 'inline';
            challengeText1.style.visibility = "visible";
          }
          if (localStorage.getItem('acceptedChallenge2') === 'true') {
            checkmark2.style.display = 'inline';
            challengeText2.style.visibility = "visible";
          }
          if (localStorage.getItem('declinedChallenge1') === 'true') {
            crossmark1.style.display = 'inline';
            challengeText1.style.visibility = "visible";
          }
          if (localStorage.getItem('declinedChallenge2') === 'true') {
            crossmark2.style.display = 'inline';
            challengeText2.style.visibility = "visible";
          }
        } else {
          challengeText1.textContent = "لم يتم العثور على تحديات!";
          challengeText2.textContent = "";
        }
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل التحديات:", error);
        challengeText1.textContent = "لم نتمكن من تحميل التحديات. حاول لاحقًا!";
        challengeText2.textContent = "";
      }
    }
  
    // إعادة تعيين الحالة عند ظهور تحديات جديدة
    function resetActivity() {
      localStorage.removeItem('acceptedChallenge1');
      localStorage.removeItem('acceptedChallenge2');
      localStorage.removeItem('declinedChallenge1');
      localStorage.removeItem('declinedChallenge2');
      checkmark1.style.display = 'none';
      checkmark2.style.display = 'none';
      crossmark1.style.display = 'none';
      crossmark2.style.display = 'none';
      challengeText1.style.visibility = "hidden";
      challengeText2.style.visibility = "hidden";
    }
  
    // عند الضغط على "قد التحدي" (القبول)
    function acceptChallengeHandler(challengeText, indicator, storageKey) {
      alert("لقد ضغطت لقبول التحدي!");
      // تخزين الإجراء المطلوب مع نوعه "accept"
      currentAction = { challengeText, indicator, storageKey, type: 'accept' };
      floatingMessageText.textContent = challengeText.textContent;
      floatingMessage.style.display = "block";
      acceptMusic.play();
    }
  
    // عند الضغط على "مش قد التحدي" (الرفض)
    function declineChallengeHandler(challengeText, indicator, storageKey) {
      alert("لقد ضغطت لرفض التحدي!");
      // تخزين الإجراء المطلوب مع نوعه "decline"
      currentAction = { challengeText, indicator, storageKey, type: 'decline' };
      floatingMessageText.textContent = challengeText.textContent;
      floatingMessage.style.display = "block";
      declineMusic.play();
    }
  
    // أحداث أزرار البطاقات
    acceptChallenge.addEventListener("click", function () {
      acceptChallengeHandler(challengeText1, checkmark1, 'acceptedChallenge1');
    });
    acceptChallenge2.addEventListener("click", function () {
      acceptChallengeHandler(challengeText2, checkmark2, 'acceptedChallenge2');
    });
    declineChallenge.addEventListener("click", function () {
      declineChallengeHandler(challengeText1, crossmark1, 'declinedChallenge1');
    });
    declineChallenge2.addEventListener("click", function () {
      declineChallengeHandler(challengeText2, crossmark2, 'declinedChallenge2');
    });
  
    /* عند الضغط على الزر العائم:
       - إذا ضغط المستخدم على علامة "✔" (floatingCheck) فيجب اعتبار النتيجة قبول
       - إذا ضغط المستخدم على علامة "✘" (floatingCross) فيجب اعتبار النتيجة رفض
       بغض النظر عن الإجراء الأصلي المُختار،
       سيتم عرض علامة واحدة فقط (✔ أو ✘) على البطاقة */
    floatingCheck.addEventListener("click", function () {
      if (currentAction) {
        if (currentAction.type === 'accept') {
          // التأكيد الصحيح لقبول التحدي
          currentAction.indicator.style.display = 'inline';
          localStorage.setItem(currentAction.storageKey, 'true');
          floatingMessageText.textContent = "تم قبول التحدي بنجاح!";
        } else {
          // المستخدم اختار رفض التحدي سابقاً ولكنه ضغط على ✔ → نعرض علامة الرفض بدلاً من ذلك
          if (currentAction.challengeText === challengeText1) {
            crossmark1.style.display = 'inline';
            localStorage.setItem('declinedChallenge1', 'true');
          } else {
            crossmark2.style.display = 'inline';
            localStorage.setItem('declinedChallenge2', 'true');
          }
          floatingMessageText.textContent = "خطأ: لم يتم قبول التحدي!";
        }
        currentAction.challengeText.style.visibility = "visible";
      }
      floatingMessage.style.display = "none";
      currentAction = null;
    });
  
    floatingCross.addEventListener("click", function () {
      if (currentAction) {
        if (currentAction.type === 'decline') {
          // التأكيد الصحيح لرفض التحدي
          currentAction.indicator.style.display = 'inline';
          localStorage.setItem(currentAction.storageKey, 'true');
          floatingMessageText.textContent = "تم رفض التحدي!";
        } else {
          // المستخدم اختار قبول التحدي سابقاً ولكنه ضغط على ✘ → نعرض علامة القبول بدلاً من ذلك
          if (currentAction.challengeText === challengeText1) {
            checkmark1.style.display = 'inline';
            localStorage.setItem('acceptedChallenge1', 'true');
          } else {
            checkmark2.style.display = 'inline';
            localStorage.setItem('acceptedChallenge2', 'true');
          }
          floatingMessageText.textContent = "خطأ: لم يتم رفض التحدي!";
        }
        currentAction.challengeText.style.visibility = "visible";
      }
      floatingMessage.style.display = "none";
      currentAction = null;
    });
  
    // تحميل التحديات عند بدء تشغيل الصفحة وتحديثها كل دقيقة
    loadChallenges();
    setInterval(loadChallenges, 60000);
  });
  
  // دوال القائمة الجانبية
  function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuIcon.innerHTML = "☰";
    } else {
      sidebar.classList.add("open");
      menuIcon.innerHTML = "✖";
    }
  }
  document.addEventListener("click", function (event) {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
      sidebar.classList.remove("open");
      menuIcon.innerHTML = "☰";
    }
  });
  