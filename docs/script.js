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

// スクロールに合わせた時間の変化（より自然な色の遷移）
function updateTimeBasedStyles() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    ) - window.innerHeight;
    
    const scrollPercentage = (scrollTop / docHeight) * 100;
    const timeIndicator = document.querySelector('.time-indicator');
    
    // 背景色の計算
    const getBgColor = (startPercentage) => {
        // 朝の色（薄い青みがかった白）
        const morningColor = { r: 249, g: 249, b: 245 };
        
        // 夕方の色（暖色系）
        const sunsetColor = { r: 255, g: 241, b: 230 };
        
        // 夜の色（暗い青）
        const nightColor = { r: 26, g: 26, b: 46 };
        
        // スクロール位置に応じた色の計算
        let r, g, b;
        
        if (scrollPercentage < 50) {
            // 朝から夕方への遷移
            const transitionPercentage = scrollPercentage / 50; // 0-1の範囲に正規化
            r = morningColor.r + (sunsetColor.r - morningColor.r) * transitionPercentage;
            g = morningColor.g + (sunsetColor.g - morningColor.g) * transitionPercentage;
            b = morningColor.b + (sunsetColor.b - morningColor.b) * transitionPercentage;
            
            // 時間帯表示の更新
            if (scrollPercentage < 25) {
                timeIndicator.textContent = '朝';
            } else {
                timeIndicator.textContent = '昼';
            }
        } else if (scrollPercentage < 75) {
            // 夕方から夜への遷移
            const transitionPercentage = (scrollPercentage - 50) / 25; // 0-1の範囲に正規化
            r = sunsetColor.r + (nightColor.r - sunsetColor.r) * transitionPercentage;
            g = sunsetColor.g + (nightColor.g - sunsetColor.g) * transitionPercentage;
            b = sunsetColor.b + (nightColor.b - sunsetColor.b) * transitionPercentage;
            
            // 時間帯表示の更新
            timeIndicator.textContent = '夕方';
        } else {
            // 完全な夜
            r = nightColor.r;
            g = nightColor.g;
            b = nightColor.b;
            
            // 時間帯表示の更新
            timeIndicator.textContent = '夜';
        }
        
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };
    
    // テキスト色の計算
    const getTextColor = () => {
        if (scrollPercentage < 50) {
            // 朝から夕方への遷移
            return `rgb(51, 51, 51)`;
        } else if (scrollPercentage < 75) {
            // 夕方から夜への遷移
            const transitionPercentage = (scrollPercentage - 50) / 25; // 0-1の範囲に正規化
            const r = 51 + (230 - 51) * transitionPercentage;
            const g = 51 + (230 - 51) * transitionPercentage;
            const b = 51 + (230 - 51) * transitionPercentage;
            return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        } else {
            // 完全な夜
            return `rgb(230, 230, 230)`;
        }
    };
    
    // 背景色とテキスト色を設定
    document.body.style.backgroundColor = getBgColor(scrollPercentage);
    document.body.style.color = getTextColor();
    
    // タイトルの色を調整
    const h1 = document.querySelector('h1');
    if (scrollPercentage < 50) {
        h1.style.color = '#1a1a1a';
    } else if (scrollPercentage < 75) {
        const transitionPercentage = (scrollPercentage - 50) / 25;
        const r = 26 + (230 - 26) * transitionPercentage;
        const g = 26 + (230 - 26) * transitionPercentage;
        const b = 26 + (230 - 26) * transitionPercentage;
        h1.style.color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    } else {
        h1.style.color = '#e6e6e6';
    }
    
    // 時間帯表示の背景色を調整
    if (scrollPercentage < 50) {
        timeIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        timeIndicator.style.color = '#333';
    } else if (scrollPercentage < 75) {
        timeIndicator.style.backgroundColor = 'rgba(255, 241, 230, 0.7)';
        timeIndicator.style.color = '#553344';
    } else {
        timeIndicator.style.backgroundColor = 'rgba(30, 30, 60, 0.7)';
        timeIndicator.style.color = '#e6e6e6';
    }
    
    // その他の要素にも同様に色の変化を適用（必要に応じて）
    adjustSpecialElements(scrollPercentage);
}

// 特殊な要素の色調整
function adjustSpecialElements(scrollPercentage) {
    const specialBackgrounds = document.querySelectorAll('.special-background::before');
    const springThemes = document.querySelectorAll('.spring-theme::before');
    const flowerPetals = document.querySelectorAll('.flower-petal');
    
    // CSSは直接操作できないため、スタイルシートを使用
    let style = document.getElementById('dynamic-styles');
    if (!style) {
        style = document.createElement('style');
        style.id = 'dynamic-styles';
        document.head.appendChild(style);
    }
    
    let css = '';
    
    // スクロール位置に応じたスタイル変更
    if (scrollPercentage < 50) {
        // 朝から夕方への遷移
        const transitionPercentage = scrollPercentage / 50;
        const bgOpacity = 0.8;
        
        const bgR = Math.round(255);
        const bgG = Math.round(255 - (15 * transitionPercentage));
        const bgB = Math.round(255 - (15 * transitionPercentage));
        
        const springBgStart = `rgba(${255 - (15 * transitionPercentage)}, 240, 245, ${bgOpacity})`;
        const springBgEnd = `rgba(240, ${255 - (15 * transitionPercentage)}, 240, ${bgOpacity})`;
        
        const petalR = Math.round(255);
        const petalG = Math.round(230 - (30 * transitionPercentage));
        const petalB = Math.round(240 - (60 * transitionPercentage));
        
        css += `.special-background::before { background-color: rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacity}); }`;
        css += `.spring-theme::before { background: linear-gradient(135deg, ${springBgStart}, ${springBgEnd}); }`;
        css += `.flower-petal { background-color: rgba(${petalR}, ${petalG}, ${petalB}, 0.7); }`;
    } else if (scrollPercentage < 75) {
        // 夕方から夜への遷移
        const transitionPercentage = (scrollPercentage - 50) / 25;
        const bgOpacity = 0.8;
        
        const bgR = Math.round(255 - (225 * transitionPercentage));
        const bgG = Math.round(240 - (210 * transitionPercentage));
        const bgB = Math.round(240 - (180 * transitionPercentage));
        
        const springBgStartR = Math.round(240 - (210 * transitionPercentage));
        const springBgStartG = Math.round(225 - (195 * transitionPercentage));
        const springBgStartB = Math.round(185 - (145 * transitionPercentage));
        
        const springBgEndR = Math.round(240 - (200 * transitionPercentage));
        const springBgEndG = Math.round(240 - (200 * transitionPercentage));
        const springBgEndB = Math.round(225 - (155 * transitionPercentage));
        
        const petalR = Math.round(255 - (105 * transitionPercentage));
        const petalG = Math.round(200 - (50 * transitionPercentage));
        const petalB = Math.round(180 + (20 * transitionPercentage));
        
        const springBgStart = `rgba(${springBgStartR}, ${springBgStartG}, ${springBgStartB}, ${bgOpacity})`;
        const springBgEnd = `rgba(${springBgEndR}, ${springBgEndG}, ${springBgEndB}, ${bgOpacity})`;
        
        css += `.special-background::before { background-color: rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacity}); }`;
        css += `.spring-theme::before { background: linear-gradient(135deg, ${springBgStart}, ${springBgEnd}); }`;
        css += `.flower-petal { background-color: rgba(${petalR}, ${petalG}, ${petalB}, 0.7); }`;
    } else {
        // 完全な夜
        const bgOpacity = 0.8;
        
        css += `.special-background::before { background-color: rgba(30, 30, 60, ${bgOpacity}); }`;
        css += `.spring-theme::before { background: linear-gradient(135deg, rgba(30, 30, 50, ${bgOpacity}), rgba(40, 40, 70, ${bgOpacity})); }`;
        css += `.flower-petal { background-color: rgba(150, 150, 200, 0.3); }`;
    }
    
    style.innerHTML = css;
}

// スクロールに合わせてアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const verses = document.querySelectorAll('.verse');
    const timeIndicator = createTimeIndicator();
    
    function checkVisibility() {
        verses.forEach(verse => {
            const rect = verse.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                verse.classList.add('visible');
            }
        });
        
        // 時間帯に基づくスタイルの更新
        updateTimeBasedStyles();
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
