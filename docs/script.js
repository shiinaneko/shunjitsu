// 花びらの生成
function createPetals() {
    const container = document.querySelector('.container');
    const petalCount = 30;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('flower-petal');
        
        // ランダムな位置と遅延
        const randomX = Math.random() * 100;
        const randomY = Math.random() * -100;
        const randomDelay = Math.random() * 10;
        const randomDuration = 5 + Math.random() * 10;
        const randomRotation = Math.random() * 360;
        const randomSize = 10 + Math.random() * 10;
        
        petal.style.left = `${randomX}%`;
        petal.style.top = `${randomY}px`;
        petal.style.width = `${randomSize}px`;
        petal.style.height = `${randomSize}px`;
        petal.style.animationDelay = `${randomDelay}s`;
        petal.style.animationDuration = `${randomDuration}s`;
        petal.style.transform = `rotate(${randomRotation}deg)`;
        petal.style.setProperty('--random-x', Math.random() * 2 - 1);
        petal.style.setProperty('--random-r', Math.random());
        
        // 色のバリエーション
        const hue = 350 + Math.random() * 40; // 淡いピンク系
        const lightness = 85 + Math.random() * 10;
        petal.style.backgroundColor = `hsl(${hue}, 70%, ${lightness}%)`;
        
        container.appendChild(petal);
    }
}

// 時間帯表示の作成
function createTimeIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('time-indicator');
    indicator.textContent = '朝';
    document.body.appendChild(indicator);
    return indicator;
}

// 明朝体のフォントリスト
const minchoFonts = [
    'mincho', 
    'noto-mincho', 
    'old-mincho', 
    'kaisei', 
    'hina-mincho', 
    'biz-mincho', 
    'biz-p-mincho', 
    'sawarabi-mincho', 
    'yuji-boku', 
    'yuji-mai', 
    'klee-one'
];

// 非明朝体のフォントリスト（より少なく使う）
const nonMinchoFonts = [
    'gothic', 
    'maru-gothic', 
    'handwriting', 
    'yusei', 
    'kosugi-maru'
];

// フォントをランダムに選択
function getRandomFont(preferMincho = true) {
    // 80%の確率で明朝体、20%の確率で他のフォント
    if (preferMincho && Math.random() < 0.8) {
        return minchoFonts[Math.floor(Math.random() * minchoFonts.length)];
    } else {
        return nonMinchoFonts[Math.floor(Math.random() * nonMinchoFonts.length)];
    }
}

// 文字にランダムフォントを適用
function applyRandomFonts() {
    const words = document.querySelectorAll('.line span');
    words.forEach(word => {
        // 既存のクラスから、フォント関連のクラスを削除
        const allFonts = [...minchoFonts, ...nonMinchoFonts];
        allFonts.forEach(font => {
            word.classList.remove(font);
        });
        
        // 新しいフォントを追加
        word.classList.add(getRandomFont());
    });
}

// スクロールに合わせてアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const verses = document.querySelectorAll('.verse');
    const body = document.body;
    const timeIndicator = createTimeIndicator();
    
    // スクロール位置に応じた時間帯の更新
    function updateTimeOfDay() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = Math.max(
            document.body.scrollHeight, 
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ) - window.innerHeight;
        
        const scrollPercentage = (scrollTop / docHeight) * 100;
        
        // スクロール位置に応じて背景を変更
        if (scrollPercentage < 60) {
            // 朝
            body.classList.remove('sunset', 'night');
            body.classList.add('daytime');
            timeIndicator.textContent = '朝';
        } else if (scrollPercentage < 80) {
            // 夕方
            body.classList.remove('daytime', 'night');
            body.classList.add('sunset');
            timeIndicator.textContent = '夕方';
        } else {
            // 夜
            body.classList.remove('daytime', 'sunset');
            body.classList.add('night');
            timeIndicator.textContent = '夜';
        }
    }
    
    function checkVisibility() {
        verses.forEach(verse => {
            const rect = verse.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                verse.classList.add('visible');
            }
        });
        
        // 時間帯の更新
        updateTimeOfDay();
    }
    
    // 散る要素に乱数を設定
    document.querySelectorAll('.scatter').forEach(el => {
        if (!el.style.getPropertyValue('--random-x')) {
            el.style.setProperty('--random-x', Math.random() * 2 - 1);
            el.style.setProperty('--random-y', Math.random() * 2 - 1);
            el.style.setProperty('--random-r', Math.random());
        }
    });
    
    // 明朝体中心のランダムフォントを適用
    applyRandomFonts();
    
    // 初期チェック
    checkVisibility();
    
    // 花びらの生成
    createPetals();
    
    // スクロールイベント
    window.addEventListener('scroll', checkVisibility);
    
    // 狂った効果を追加（ランダムな時間間隔でテキストを揺らす）
    setInterval(function() {
        const allTexts = document.querySelectorAll('.line span');
        const randomIndex = Math.floor(Math.random() * allTexts.length);
        const randomElement = allTexts[randomIndex];
        
        // 既存のクラスを保存
        const originalClasses = randomElement.className;
        
        // ランダムな効果を追加
        const effects = ['shake-text', 'pulsate', 'float-text', 'vibrate', 'wavy'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        randomElement.classList.add(randomEffect);
        
        // 短時間後に元に戻す
        setTimeout(function() {
            randomElement.className = originalClasses;
        }, 3000);
    }, 8000);
    
    // 「ゴム風船」と「花嫁御寮」の特別効果
    const balloon = document.querySelector('.balloon.stick');
    const hanayome = document.querySelectorAll('.float-text.fade-in-out.reggae, .float-text.fade-in-out.blur-in-out.rampart');
    
    if (balloon) {
        balloon.addEventListener('mouseover', function() {
            this.style.animationDuration = '3s';
        });
        
        balloon.addEventListener('mouseout', function() {
            this.style.animationDuration = '12s';
        });
    }
    
    hanayome.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('spin-slow');
            setTimeout(() => {
                this.classList.remove('spin-slow');
            }, 4000);
        });
    });
});
