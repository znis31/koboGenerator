
// 단어장
const wordList = [
    '뭉수', '꺽지', '숭미', '탬', '둠', '두면', '도희', '숭면', '꺽재', '강재', '갱',
    '게이', '루이', '루이비통', '롱초', '초롱', '숙주', '석주', '개준', '꺽주',
    '꺽접', '습지', '숩게', '숩기', '습기', '숭매', '숭팔', '꽁매', '와흘', '석접','걱접',
    '와글', '뭉글', '맹글', '면', '꾹', '명',
    '뭉지', '석지', '싹싹', '톡톡', '좆좆', '막좋', '코보'
];

const prefixList = [
    '왕', '똥' , '똥좆', '병산', '좆', '꺽','왕','씹','좆좆','막막','나막','맹글', '뭉글', '뭉지', '숙'
];

const affixList = [
    '면', '면면', '뭉수', '꺽지', '명명', '년'
];

//html에서 input 가져옴
const numBox = document.getElementById("inputBox1");
const lengthBox = document.getElementById('inputBox2');
const rateBox = document.getElementById('inputBox3');
const inputBtn = document.getElementById("inputBtn");
let outputDivs = document.querySelectorAll(".addedDiv");

//버튼 클릭
inputBtn.onclick = function(){
    removeDiv();
    //숫자 10 이하
    const wordNums = numBox.innerText <= 10 ? numBox.innerText : 1 ;
    const wordLeng = lengthBox.innerText;
    //단어 생성및 div 추가
    for (var i = 0; i < wordNums; i++) {
        addDiv(randMani(makeWord(getRand(0,1),getRand(1, Number.isInteger(parseInt(wordLeng)) ? wordLeng : 5),getRand(0,1)), parseInt(rateBox.innerText)));
    }
    outputDivs = document.querySelectorAll(".addedDiv");
    //클릭시 복사
    for (i = 0; i < outputDivs.length; i++) {
        outputDivs[i].addEventListener('click', function() {
          navigator.clipboard.writeText(this.innerText);
          Toastify({
            text: `'${this.innerText}' 복사됨!` ,
            style: {
                background: '#dbbb46',
                fontFamily: 'Nanum Gothic',
                fontSize: '1rem'
            }
        
          }).showToast();
        });
    }
};

//난수 생성
function getRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//단어 생성 함수
const makeWord = (l,m,n) => {
    let resultText = '';
    for (let i = 0; i < l; i++) {
        resultText += prefixList[Math.floor(Math.random() * prefixList.length)];
    };
    for (let i = 0; i < m; i++) {
        resultText += wordList[Math.floor(Math.random() * wordList.length)];
    };
    for (let i = 0; i < n; i++) {
        resultText += affixList[Math.floor(Math.random() * affixList.length)];
    };

    return resultText;
};

//div 생성 함수
function addDiv(content, id) {
    const p = document.createElement("div");
    p.innerHTML = content;
    p.setAttribute('class', 'addedDiv');
    p.setAttribute('title', '클릭해서 복사');
    document.getElementById("pp").appendChild(p);
};

//div 삭제 함수
function removeDiv() {
    const rp = document.querySelectorAll(".addedDiv");
    for (let i = 0; i < rp.length; i++) {
        rp[i].remove();
    }
};

//한글 랜덤화 함수
function randMani(text, changeRate) {
    const dis = Hangul.d(text);
    
    for (let i = 0; i < dis.length; i++) {
        if (getRand(0, changeRate >= 1 ? changeRate : 50 ) == 1) { //확률에 따라
            if (Hangul.isConsonant(dis[i]) || Hangul.isVowel(dis[i])) { //한글이면
                    if (!isJongsung(dis[i-1],dis[i+1])) { //종성이 아니면
                        switch (dis[i]) { //글자를 바꾼다
                            case 'ㄲ':
                            case 'ㅋ':
                                dis[i] = 'ㄱ'
                                break;
                            case 'ㄱ':
                                dis[i] = 'ㄲ'
                                break;
                            case 'ㅂ':
                                dis[i] = "ㅃ"
                                break;
                            case 'ㅌ':
                                dis[i] = 'ㄷ'
                                break;
                            case 'ㄷ':
                                dis[i] = 'ㄸ'
                                break;
                            case 'ㅅ':
                                dis[i] = 'ㅆ'
                                break;
                            case 'ㅗ':
                                dis[i] = 'ㅜ'
                                break;
                            case 'ㅐ':
                                dis[i] = 'ㅔ'
                                break;
                            case 'ㅔ':
                                dis[i] = 'ㅐ'
                                break;
                            case 'ㅙ':
                                dis[i] = 'ㅚ'
                                break;
                            case 'ㅆ':
                                dis[i] = 'ㅅ'
                                break;
                            case 'ㅜ':
                                dis[i] = 'ㅗ'
                                break;
                            case 'ㅣ':
                                dis[i] = 'ㅐ'
                                break; 
                            case 'ㅈ':
                                dis[i] = 'ㅉ'
                                break;
                    }
                }
            }
        }
    }
    return Hangul.a(dis);
}

//종성 찾기
function isJongsung(a,c) {
    // 모음 - (종성) - 자음
    if (Hangul.isVowel(a) && Hangul.isConsonant(c)) {
        return true;
    } else {
        return false;
    }
}
