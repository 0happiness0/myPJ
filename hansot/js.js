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
// 화면 시작 시 쿠키 값이 있는지 없는지를 확인
function setCookie(name, value, expiredays){
	var today = new Date();

	console.log(today.getDate())

	today.setDate(today.getDate() + expiredays); // 현재시간에 하루를 더함 

	document.cookie = name + '=' + escape(value) + '; expires=' + today.toGMTString();

}
	
function getCookie(name) {

	var cookie = document.cookie;
	
	if (document.cookie != "") {
		var cookie_array = cookie.split("; ");
		console.log(cookie_array)
		for ( var index in cookie_array) {
			var cookie_name = cookie_array[index].split("=");
			if (cookie_name[0] == "mycookie") {
				return cookie_name[1];
			}
		}
	}
	return;
}
// 쿠키 값이 없으면 모달창 보이고, 있으면 숨김
$(".notToday").click(function() {
	$(".ad_banner").modal("hide");
	setCookie("mycookie", 'popupEnd', 1);
})

var checkCookie = getCookie("mycookie");
	
if(checkCookie == 'popupEnd') {
	$(".ad_banner").modal("hide");
} else {
	$('.ad_banner').modal("show");	
}

// 햄버거 버튼
function showGnb(){
  let tg = document.querySelector(".top");
  tg.classList.toggle("on");

}
