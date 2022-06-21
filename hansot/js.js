let scTop;
let tbtn;

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {

  const slide = document.querySelector(".slide");
  const indic = document.querySelectorAll(".indic li");
  let setSeq = slide.querySelectorAll("li");
  for (let i = 0; i < setSeq.length; i++) {
    setSeq[i].setAttribute("data-seq", i);
  }
  const abtn = document.querySelectorAll(".abtn");

  // 광클금지
  let prot = 0;
  for (let x of abtn) {
    x.onclick = () => {
      if (prot) return false;
      prot = 1;
      setTimeout(() => prot = 0, 410);
      clearAuto();

      let isR = x.classList.contains("ab2");
      if (isR) {
        goRight();
      } else {
        let lis = slide.querySelectorAll("li");
        slide.insertBefore(
          lis[lis.length - 1], lis[0]);
        slide.style.left = "-100%";
        slide.style.transition = "none";
        setTimeout(() => {
          slide.style.left = "0";
          slide.style.transition =
            "left .4s ease-out";
        }, 10);
        goIndic(0);
      }
      // a요소 기본이동막기
      return false;
    };
  }

  // 블릿
  const goIndic = isR => {
    for (let x of indic)
      x.classList.remove("on");
    let fseq = slide
      .querySelectorAll("li")[isR ? 1 : 0]
      .getAttribute("data-seq");
    indic[fseq].classList.add("on");
  };
  const goRight = () => {
    slide.style.left = "-100%";
    slide.style.transition =
      "left .4s ease-out";
    setTimeout(() => {

      let fli = slide
        .querySelectorAll("li")[0];
      slide.appendChild(fli);
      slide.style.left = "0";
      slide.style.transition = "none";
    }, 400);
    goIndic(1);
  }
  let autoI;
  const autoCall = () =>
    autoI = setInterval(goRight, 4000);
  autoCall();
  let autoT;
  const clearAuto = () => {
    console.log("인터발지움!");
    clearInterval(autoI);
    // 타임아웃지우기(실행쓰나미방지!)
    clearTimeout(autoT);
    autoT = setTimeout(autoCall, 4000);
  };

  // top 버튼
  slimTop = document.querySelector("#top");

  tbtn = document.querySelector(".tbtn");

  let contbx = document.querySelectorAll(".cont>section");
  contbx.forEach((ele, idx) => {
    if (idx !== 0) ele.classList.add("scAct");
  });

  window.addEventListener('scroll', () => {

    // 스크롤 위치표시
    scTop = this.scrollY;

    if (scTop >= 100)
      slimTop.classList.add("on");
    // 100px미만일 경우 클래스 "on" 제거
    else
      slimTop.classList.remove("on");
    if (scTop >= 300)
      tbtn.classList.add("on");
    // 300px미만일 경우 클래스 "on" 제거
    else
      tbtn.classList.remove("on");
  });

}

// 팝업창 닫기
function popupClose() { //팝업창 지우기
  $('.ad_banner').hide();
  PopupBgDisplay();
}

// 하루동안 열지 않기
$(document).ready(function () {
  $(".notToday").click(function () {
      setCookieMobile( "todayCookie", "done" , 1);
      $(".ad_banner").hide();
  });
});

function setCookieMobile ( name, value, expiredays ) {
  var todayDate = new Date();
  todayDate.setDate( todayDate.getDate() + expiredays );
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function getCookieMobile () {
  var cookiedata = document.cookie;
  if ( cookiedata.indexOf("todayCookier=done") < 0 ){
       $(".ad_banner").show();
  }
  else {
      $(".ad_banner").hide();
  }
}
getCookieMobile();

// 햄버거 버튼
function showGnb() {
  let tg = document.querySelector(".top");
  tg.classList.toggle("on");

}

// 하단영역 사업자 정보
function ceo_info() {
  if ($('.m_addr').css('display') == 'block') {
    $('.m_addr').css('display', 'none');
  } else {
    $('.m_addr').css('display', 'block');
  }
}


