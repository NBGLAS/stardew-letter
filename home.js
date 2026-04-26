document.addEventListener('DOMContentLoaded', () => {
    // 元素引用
    const btnEnter = document.getElementById('btn-enter');
    const entryPage = document.getElementById('entry-page');
    const mainPage = document.getElementById('main-page');
    const bgmAudio = document.getElementById('bgm-audio');
    const btnMusic = document.getElementById('btn-music');
    const btnMainLogo = document.getElementById('btn-main-logo');
    const seasonChips = document.querySelectorAll('.season-chip');
    
    const dialogBox = document.getElementById('dialog-box');
    const dialogText = document.getElementById('dialog-text');
    const dialogExtra = document.getElementById('dialog-extra');
    const btnNextDialog = document.getElementById('btn-next-dialog');
    const btnCloseDialog = document.getElementById('btn-close-dialog');
    const dialogAudio = new Audio('yinxiao/星露谷对话3.mp3');

    const playlist = [
        'bgm/02. Cloud Country.mp3',
        'bgm/07. Spring (Wild Horseradish Jam).mp3',
        'bgm/08. Pelican Town.mp3',
        'bgm/09. Flower Dance.mp3',
        'bgm/11. Distant Banjo.mp3'
    ];

    const seasonThemes = {
        spring: {
            background: 'images/背景（春）.webp',
            track: "bgm/05. Spring (It's A Big World Outside).mp3"
        },
        summer: {
            background: 'images/背景（夏）.webp',
            track: "bgm/13. Summer (Nature's Crescendo).mp3"
        },
        fall: {
            background: 'images/背景（秋）.webp',
            track: "bgm/20. Fall (The Smell Of Mushroom).mp3"
        },
        winter: {
            background: 'images/背景（冬）.webp',
            track: "bgm/27. Winter (Nocturne Of Ice).mp3"
        }
    };

    // 状态管理
    const state = {
        isMusicPlaying: false,
        currentTrackIndex: 0,
        currentSeasonKey: null,
        dialogTypeTimer: null,
        dialogTypingIndex: 0,
        characterTalks: {
            jas: 0,
            leo: 0,
            sebastian: 0,
            vincent: 0,
            sandy: 0,
            lewis: 0
        }
    };
    const MUSIC_HOLD_DURATION = 420;

    bgmAudio.loop = false;
    bgmAudio.preload = 'auto';
    dialogAudio.preload = 'auto';

    function unlockAudioElement(audio) {
        if (!audio) {
            return;
        }

        const wasMuted = audio.muted;
        audio.muted = true;

        const resetAudio = () => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = wasMuted;
        };

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(resetAudio).catch(() => {
                audio.muted = wasMuted;
            });
            return;
        }

        resetAudio();
    }

    function setupAudioUnlock() {
        const unlockAudio = () => {
            unlockAudioElement(bgmAudio);
        };

        window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
        window.addEventListener('keydown', unlockAudio, { once: true });
    }

    function getActiveTrack() {
        if (state.currentSeasonKey && seasonThemes[state.currentSeasonKey]) {
            return seasonThemes[state.currentSeasonKey].track;
        }

        return playlist[state.currentTrackIndex];
    }

    function prefetchResource(url, as) {
        if (!url || document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = as;
        link.href = url;
        document.head.appendChild(link);
    }

    function loadCurrentTrack() {
        const nextTrack = getActiveTrack();
        if (!nextTrack) {
            return;
        }

        if (bgmAudio.dataset.activeTrack !== nextTrack) {
            bgmAudio.src = nextTrack;
            bgmAudio.dataset.activeTrack = nextTrack;
        }
    }

    function setSeasonChipState(activeSeason) {
        seasonChips.forEach((chip) => {
            const isActive = chip.dataset.season === activeSeason;
            chip.classList.toggle('is-active', isActive);
            chip.setAttribute('aria-pressed', String(isActive));
        });
    }

    function applySeasonTheme(seasonKey, shouldPlay = true) {
        const theme = seasonThemes[seasonKey];
        if (!theme || !mainPage) {
            return;
        }

        state.currentSeasonKey = seasonKey;
        mainPage.style.backgroundImage = `url('${theme.background}')`;
        loadCurrentTrack();
        setSeasonChipState(seasonKey);

        if (shouldPlay) {
            playCurrentTrack();
        }
    }

    function playCurrentTrack() {
        loadCurrentTrack();
        return bgmAudio.play().then(() => {
            state.isMusicPlaying = true;
        }).catch(err => {
            console.log('Audio play failed:', err);
        });
    }

    function nextTrack() {
        state.currentSeasonKey = null;
        setSeasonChipState(null);
        state.currentTrackIndex = (state.currentTrackIndex + 1) % playlist.length;
        return playCurrentTrack();
    }

    function toggleMusicPlayback() {
        if (state.isMusicPlaying) {
            bgmAudio.pause();
            state.isMusicPlaying = false;
            return;
        }

        playCurrentTrack();
    }

    function playUiSound(audio, blockedMessage) {
        audio.currentTime = 0;
        audio.play().catch(err => {
            console.log(blockedMessage, err);
        });
    }

    function triggerCharacterBounce(element) {
        if (!element) {
            return;
        }

        element.classList.remove('is-bouncing');
        void element.offsetWidth;
        element.classList.add('is-bouncing');
    }

    function triggerLogoSwitch() {
        if (!btnMainLogo) {
            return;
        }

        const currentLogoSrc = btnMainLogo.getAttribute('src') || '';
        const isChineseLogo = currentLogoSrc === 'images/星露谷logo（中文）.png';
        btnMainLogo.classList.remove('is-switching');
        void btnMainLogo.offsetWidth;
        btnMainLogo.classList.add('is-switching');

        if (isChineseLogo) {
            btnMainLogo.src = 'images/星露谷 logo （英文）.png';
            btnMainLogo.alt = 'Stardew Valley';
            btnMainLogo.setAttribute('aria-label', '切换为中文星露谷标志');
            return;
        }

        btnMainLogo.src = 'images/星露谷logo（中文）.png';
        btnMainLogo.alt = '星露谷';
        btnMainLogo.setAttribute('aria-label', '切换为英文星露谷标志');
    }

    function appendDialogCharacter(char) {
        if (char === '\n') {
            dialogText.appendChild(document.createElement('br'));
            return;
        }

        dialogText.appendChild(document.createTextNode(char));
    }

    function runDialogTypewriter(message) {
        if (state.dialogTypingIndex < message.length) {
            appendDialogCharacter(message.charAt(state.dialogTypingIndex));
            state.dialogTypingIndex += 1;
            state.dialogTypeTimer = window.setTimeout(runDialogTypewriter, 28, message);
            return;
        }

        state.dialogTypeTimer = null;
        dialogExtra.classList.remove('is-hidden');
    }

    function showDialog(dialogData) {
        window.clearTimeout(state.dialogTypeTimer);
        state.dialogTypingIndex = 0;
        dialogText.textContent = '';
        dialogExtra.innerHTML = dialogData.extra;
        dialogExtra.classList.toggle('is-hidden', Boolean(dialogData.extra));
        dialogBox.classList.remove('hidden');
        runDialogTypewriter(dialogData.text);
    }

    bgmAudio.addEventListener('ended', () => {
        if (state.currentSeasonKey) {
            applySeasonTheme(state.currentSeasonKey);
            return;
        }

        state.currentTrackIndex = (state.currentTrackIndex + 1) % playlist.length;
        loadCurrentTrack();
        if (state.isMusicPlaying) {
            playCurrentTrack();
        }
    });

    setupAudioUnlock();

    function preloadImages(sources) {
        sources.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }

    function prefetchDocument(url) {
        if (!url || document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'document';
        link.href = url;
        document.head.appendChild(link);
    }

    function scheduleDeferredPreload() {
        const deferredImages = [
            'images/泪晶.png',
            'images/思绪飘乱.png',
            'images/惊讶.gif',
            'images/无话可说.png',
            'images/背景（春）.webp',
            'images/背景（夏）.webp',
            'images/背景（秋）.webp',
            'images/背景（冬）.webp'
        ];
        const deferredAudio = [
            'bgm/05. Spring (It\'s A Big World Outside).mp3',
            'bgm/13. Summer (Nature\'s Crescendo).mp3',
            'bgm/20. Fall (The Smell Of Mushroom).mp3',
            'bgm/27. Winter (Nocturne Of Ice).mp3'
        ];

        const runPreload = () => {
            preloadImages(deferredImages);
            deferredAudio.forEach((src) => prefetchResource(src, 'audio'));
        };
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(runPreload, { timeout: 1800 });
        } else {
            window.setTimeout(runPreload, 1200);
        }

        prefetchDocument('index.html');
    }

    if (btnMainLogo) {
        btnMainLogo.addEventListener('animationend', () => {
            btnMainLogo.classList.remove('is-switching');
        });

        btnMainLogo.addEventListener('click', () => {
            triggerLogoSwitch();
        });

        btnMainLogo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerLogoSwitch();
            }
        });
    }

    seasonChips.forEach((chip) => {
        const warmSeasonTheme = () => {
            const seasonKey = chip.dataset.season;
            const theme = seasonThemes[seasonKey];
            if (!theme) {
                return;
            }

            preloadImages([theme.background]);
            prefetchResource(theme.track, 'audio');
        };

        chip.addEventListener('click', () => {
            const seasonKey = chip.dataset.season;
            applySeasonTheme(seasonKey);
        });

        chip.addEventListener('pointerenter', warmSeasonTheme, { passive: true });
        chip.addEventListener('focus', warmSeasonTheme);
        chip.addEventListener('touchstart', warmSeasonTheme, { passive: true });
    });

    // 引导页点击进入
    btnEnter.addEventListener('click', () => {
        // 播放音乐
        loadCurrentTrack();
        playCurrentTrack();

        // 像素溶解转场（CSS opacity 控制）
        entryPage.classList.remove('active');
        entryPage.classList.add('hidden');
        
        setTimeout(() => {
            mainPage.classList.remove('hidden');
            mainPage.classList.add('active');
            scheduleDeferredPreload();
        }, 1500); // 等待淡出
    });

    // 音乐开关：单击暂停/继续，长按切换到下一首
    if (btnMusic) {
        let musicHoldTimer = null;
        let didLongPress = false;

        const clearMusicHold = () => {
            if (musicHoldTimer) {
                window.clearTimeout(musicHoldTimer);
                musicHoldTimer = null;
            }
        };

        btnMusic.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }

            didLongPress = false;
            clearMusicHold();
            musicHoldTimer = window.setTimeout(() => {
                didLongPress = true;
                nextTrack();
            }, MUSIC_HOLD_DURATION);
        });

        btnMusic.addEventListener('pointerup', clearMusicHold);
        btnMusic.addEventListener('pointerleave', clearMusicHold);
        btnMusic.addEventListener('pointercancel', () => {
            clearMusicHold();
            didLongPress = false;
        });

        btnMusic.addEventListener('click', (event) => {
            if (didLongPress) {
                event.preventDefault();
                didLongPress = false;
                return;
            }

            toggleMusicPlayback();
        });

        btnMusic.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMusicPlayback();
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                nextTrack();
            }
        });
    }

    // 角色对话数据
    const dialogues = {
        jas: [
            { text: "你好，我是贾斯，我喜欢粉红蛋糕，你喜欢吗？", extra: "" },
            { text: "听说HFKK给你写了一封信，是关于什么的呢....", extra: "" }
        ],
        leo: [
            { text: "你好，我是雷欧，谢谢你关心我，我会鹦语...咕咕嘎嘎噶", extra: "" },
            { text: "HFKK最近在我的房子旁边转悠，时不时有敲打的声音，是给你布置惊喜嘛", extra: "" }
        ],
        sebastian: [
            { text: "HI~，美丽的Oukeou小姐，其实从看见你的第一天起我就爱上了你，一直没有机会向你表达我的心意，送给你这个\n\n【提示：恭喜你获得泪晶！】", extra: "<img src='images/泪晶.png' class='pixel-img'>" },
            { text: "他又偷偷一个人下矿了嘛，真是太坏了！你当初是怎么看上他的", extra: "<img src='images/思绪飘乱.png' class='pixel-img'>" }
        ],
        vincent: [
            { text: "你好，我是文森特，Oukeou姐姐你今天真美", extra: "<img src='images/惊讶.gif' class='pixel-img'>" },
            { text: "HFKK给你写了一封信，我猜是关于....", extra: "" }
        ],
        sandy: [
            { text: "许久没来了呢，最近怎么样？", extra: "" },
            { text: "你有一封信，HFKK给你的，是不是情书呢", extra: "<img src='images/无话可说.png' class='pixel-img'>" }
        ],
        lewis: [
            { text: "今天可是个好日子，你应该听听大家怎么说。", extra: "" },
            { text: "赶快去看看你的信吧", extra: "" }
        ]
    };

    // 检查是否所有其他人都已完成两次对话
    function checkAllTalked() {
        const others = ['jas', 'leo', 'sebastian', 'vincent', 'sandy'];
        // 严格判断所有其他人必须完成第2次对话
        return others.every(id => state.characterTalks[id] >= 2);
    }

    // 角色点击事件
    const characters = document.querySelectorAll('.character-wrapper');
    characters.forEach(char => {
        char.addEventListener('click', (e) => {
            const id = char.getAttribute('data-id');
            let talkCount = state.characterTalks[id];
            let dialogData;

            triggerCharacterBounce(char.querySelector('.character'));
            playUiSound(dialogAudio, 'Dialogue sound playback was blocked by the browser.');

            if (id === 'lewis') {
                if (checkAllTalked()) {
                    dialogData = dialogues.lewis[1]; // 第二次对话
                    state.characterTalks.lewis = 2;
                    btnNextDialog.classList.remove('hidden'); // 显示出发按钮
                    btnCloseDialog.classList.add('hidden'); // 隐藏关闭按钮
                } else {
                    dialogData = dialogues.lewis[0]; // 初次对话
                    state.characterTalks.lewis = Math.max(state.characterTalks.lewis, 1);
                    btnNextDialog.classList.add('hidden');
                    btnCloseDialog.classList.remove('hidden');
                }
            } else {
                // 其他角色
                if (talkCount === 0) {
                    dialogData = dialogues[id][0];
                    state.characterTalks[id] = 1;
                } else {
                    dialogData = dialogues[id][1];
                    state.characterTalks[id] = 2; // 保持在2
                }
                // 确保其他角色只显示关闭按钮，不显示出发按钮
                btnNextDialog.classList.add('hidden');
                btnCloseDialog.classList.remove('hidden');
            }

            showDialog(dialogData);
        });
    });

    // 关闭对话框
    btnCloseDialog.addEventListener('click', () => {
        window.clearTimeout(state.dialogTypeTimer);
        dialogExtra.classList.remove('is-hidden');
        dialogBox.classList.add('hidden');
    });

    // 出发按钮（跳转到 index.html 信封页）
    btnNextDialog.addEventListener('click', () => {
        // 跳转到信封页
        window.location.href = 'index.html';
    });
});
