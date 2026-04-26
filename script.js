const PARAGRAPHS = [
    "亲爱的Oukeou，谢谢你给我准备的蛋糕，还有那一封信，读完信件我深受感动，同时更多的是惊喜，没想到你的礼物是如此的用心和有创意，这个必将是我学习生涯那一忘怀的一段深刻记忆。当然，来信就有回信，我思考良久，准备给你带来另一种回信，好让我的心意配得上你的用心。",
    "初次认识你是选英语课代表的时候，那时候的你说话轻声细语的，我想你应该是一个温柔的人，在我心里有了一些印象。后面通过上课的接触，慢慢也相互认识，再到后来，你经常问我关于专业学习的问题，帮着你解决专业软件下载，编程作业，再到电脑软件问题。在问题的解决过程中，我感觉到了你的学习热情，你认真仔细的态度打动了我，从那时候开始，我心里就埋下了一颗萌动的种子。",
    "还记得你第一次跟我打微信语音，跟我诉说你的烦恼，虽然记不清楚内容了（可能是lhm的事情吧），但是我感受到你当时的无力和伤心了，可能是真的无处诉说才想到和我讲吧，我很理解和同情你，我决定以后会帮你解决更多问题，让你在学习的道路上减轻压力。",
    "第一次和你玩的游戏是蛋仔派对，这是我带你入坑的游戏吧，当时我也是随口一说，却让你成为了我的蛋仔导师，和你玩了那么多的地图，我最喜欢的地图有麻将跑酷，寻找伪装蛋系列，还有那个超话难的攀登珠穆朗玛峰，虽然我没有完成这个挑战，但是是我第一次玩如此高难度的地图，这让我印象最深刻了，后面我又玩了蜀道难跑酷，这个相比于珠穆朗玛简单一些，也是在你的带领下，磕磕绊绊吧，完成了登顶，当时我真的好有成就感，哈哈哈\n还有在蛋仔岛上跨年，我们在岛上舞龙，好多人在那个水池边上抓龙头龙尾，可好玩儿了，还有舞狮子，我一直想抓一套白色的狮子，可惜没有完成。",
    "后来我接触了星露物语这个游戏，我第一时间就想和你一起玩这个，当我介绍给你的时候，我们第一次玩这个游戏的时候，你还是什么也不懂的小萌新，不敢乱跑，只会收拾农场，把农场的树木，石头，杂草通通清理干净，我则是早出晚归，带各种资源回家，给你分享游戏的各种小知识，让你渐渐熟悉这个游戏。到了游戏中期，你开启崭露你的装修技能，在你的辛勤劳作下，一间间好看的房间出现在我眼前，不得不说，我自己玩从来没有想过这些东西，那时候我就在心里想：这游戏怎么能跟谁玩都一样呢。如果有人想看我的星露谷物语存档，那我们的存档就是最完美的展示品。我们养了一只小猫，两只小狗和两匹小马，还有好多的猪，牛，羊，鸡，鸭和恐龙。你把家里收拾的仅仅有条，就像这个家庭的女主人一样，我想时机到了，我想你送出花束，代表着我们成为情侣，然后在夏季的第三天我向你送出的象征婚姻的结婚戒指，你在犹豫中选择了接受，夏季的六日我们结婚了，这是我们新的开始！婚后，我们在秋季的4日生下了第一个小孩，是一个男孩儿，我们取名煜仔，寓意他要像水一样温柔包容，内心像火一样闪亮温暖。我们在第二年又生下了一个女孩，他的名字是夏天。因为他是夏季的18日出生的。",
    "回想起来，从初相识到现在，我们认识这么久。经历了这么一些事情，一路走来，值得回忆也很不容易。在这些事情中间，我也犯下的错误，做了一些非常对不起你的行为，当时的我要是懂事就好了，早点和你说一声对不起，兴许你还能好受一些，只怪当年的我太死板固执，让你独自承受本不该属于你的压力。虽然你嘴上说一说无所谓，就这样吧，但是也能想象到每当你回忆起这个事情的时候你是多么的无奈和委屈，你是一个感性的人，这些时间你辛苦了，再次为我的莽撞而道歉。",
    "最后的话，我想说我的大学时光能认识你真的很荣幸，能和你发展到今天也是很幸运的，只能说缘分让我们相遇，我想在大学所剩无几的时间里能够多陪陪你，不管是聊天，玩游戏还是出去玩，我想尽我最大的努力让你感受原本属于你的大学时光。希望我们可以一直玩儿下去，一直快乐呀。嗯…就先说到这里吧~"
];

const state = {
    typeTimer: null,
    typingIndex: 0,
    currentParagraph: 0,
    isMusicPlaying: false,
    currentTrackIndex: 0,
    musicClickTimer: null,
    collectedStardrops: 0, // 记录获得的星之果实数量
    stardropsByPage: [] // 记录每一页是否已经领取过果实
};

const playlist = [
    "bgm/04. Settling In.mp3",
    "bgm/07. Spring (Wild Horseradish Jam).mp3",
    "bgm/08. Pelican Town.mp3",
    "bgm/09. Flower Dance.mp3",
    "bgm/11. Distant Banjo.mp3"
];

const typewriterElement = document.getElementById("typewriter");
const cursorElement = document.getElementById("cursor");
const letterActions = document.getElementById("letter-actions");
const btnCollectStardrop = document.getElementById("btn-collect-stardrop");
const btnNextPage = document.getElementById("btn-next-page");
const btnPrevPage = document.getElementById("btn-prev-page");
const rewardHint = document.getElementById("reward-hint");
const stardropModal = document.getElementById("stardrop-modal");
const btnCloseStardrop = document.getElementById("btn-close-stardrop");
const stardropContainer = document.getElementById("stardrop-container");
const achievementToast = document.getElementById("achievement-toast");
const bgmAudio = document.getElementById("bgm-audio");
const btnMusicToggle = document.querySelector(".music-toggle");
const customCursor = document.querySelector(".custom-cursor");
const btnPinJunimo = document.getElementById("btn-pin-junimo");
const btnGalleryJunimo = document.getElementById("btn-gallery-junimo");
const familyMembers = document.querySelectorAll(".family-member");
const petFriends = document.querySelectorAll(".pet-friend[data-pet-sound]");
const btnPetHorse = document.getElementById("btn-pet-horse");
const horseWish = document.getElementById("horse-wish");
const petStage = document.getElementById("pet-stage");
const btnDraggableCarrot = document.getElementById("btn-draggable-carrot");
const selectButtonAudio = new Audio("yinxiao/选择按钮.mp3");
const gainItemAudio = new Audio("yinxiao/获得物品.mp3");
const junimoAudio = new Audio("yinxiao/祝尼魔1.mp3");
const achievementAudio = new Audio("yinxiao/新成就.mp3");
const dogAudio = new Audio("yinxiao/dog1b.mp3");
const catAudio = new Audio("yinxiao/cat3b.mp3");
const horseRunAudio = new Audio("yinxiao/马儿奔跑.mp3");
const horseNeighAudio = new Audio("yinxiao/狂野马嘶.mp3");
const pageTurnAudio = new Audio("yinxiao/翻书声.mp3");
const MUSIC_HOLD_DURATION = 420;
const prefersTouchInput = window.matchMedia("(hover: none), (pointer: coarse)").matches;

bgmAudio.preload = "metadata";
selectButtonAudio.preload = "auto";
gainItemAudio.preload = "auto";
junimoAudio.preload = "auto";
achievementAudio.preload = "auto";
dogAudio.preload = "auto";
catAudio.preload = "auto";
horseRunAudio.preload = "auto";
horseNeighAudio.preload = "auto";
pageTurnAudio.preload = "auto";

function preloadImages(sources) {
    sources.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

function prefetchResource(url, as) {
    if (!url || document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
        return;
    }

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = as;
    link.href = url;
    document.head.appendChild(link);
}

function warmAudioElement(audio) {
    if (!audio) {
        return;
    }

    loadCurrentTrack();
    audio.load();
}

function setupAudioUnlock() {
    const warmAudio = () => {
        warmAudioElement(bgmAudio);
    };

    window.addEventListener("pointerdown", warmAudio, { once: true, passive: true });
    window.addEventListener("keydown", warmAudio, { once: true });
}

function loadCurrentTrack() {
    if (!bgmAudio) {
        return;
    }

    const nextTrack = playlist[state.currentTrackIndex];
    if (bgmAudio.dataset.activeTrack !== nextTrack) {
        bgmAudio.src = nextTrack;
        bgmAudio.dataset.activeTrack = nextTrack;
    }
}

function playCurrentTrack() {
    if (!bgmAudio) {
        return Promise.resolve();
    }
    loadCurrentTrack();
    return bgmAudio.play().then(() => {
        state.isMusicPlaying = true;
    }).catch(() => {
        console.log("Auto-play prevented by browser. Please interact with the page first.");
    });
}

function nextTrack() {
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
    audio.play().catch(() => {
        console.log(blockedMessage);
    });
}

function playAchievementSound() {
    playUiSound(achievementAudio, "Achievement sound playback was blocked by the browser.");
}

function triggerJunimoBounce(element) {
    element.classList.remove("is-bouncing");
    void element.offsetWidth;
    element.classList.add("is-bouncing");
}

function bindJunimoSoundTrigger(element) {
    if (!element) {
        return;
    }

    element.addEventListener("animationend", () => {
        element.classList.remove("is-bouncing");
    });

    element.addEventListener("click", () => {
        triggerJunimoBounce(element);
        playUiSound(junimoAudio, "Junimo sound playback was blocked by the browser.");
    });

    element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            triggerJunimoBounce(element);
            playUiSound(junimoAudio, "Junimo sound playback was blocked by the browser.");
        }
    });
}

function triggerFamilyMemberFeedback(element) {
    element.classList.remove("is-bouncing");
    element.classList.remove("show-heart");
    void element.offsetWidth;
    element.classList.add("is-bouncing");
    element.classList.add("show-heart");
}

function bindFamilyMemberTrigger(element) {
    if (!element) {
        return;
    }

    element.addEventListener("animationend", (event) => {
        if (event.animationName === "familyMemberBounce") {
            element.classList.remove("is-bouncing");
        }
        if (event.animationName === "familyHeartPop") {
            element.classList.remove("show-heart");
        }
    });

    element.addEventListener("click", () => {
        triggerFamilyMemberFeedback(element);
    });
}

function triggerPetFriendFeedback(element) {
    element.classList.remove("is-bouncing");
    element.classList.remove("show-heart");
    void element.offsetWidth;
    element.classList.add("is-bouncing");
    element.classList.add("show-heart");
}

function showHorseWishBubble() {
    if (!btnPetHorse) {
        return;
    }

    btnPetHorse.classList.remove("show-bubble");
    void btnPetHorse.offsetWidth;
    btnPetHorse.classList.add("show-bubble");
}

function bindPetFriendTrigger(element) {
    if (!element) {
        return;
    }

    element.addEventListener("animationend", (event) => {
        if (event.animationName === "petFriendBounce") {
            element.classList.remove("is-bouncing");
        }
        if (event.animationName === "petHeartPop") {
            element.classList.remove("show-heart");
        }
        if (event.animationName === "petBubblePop") {
            element.classList.remove("show-bubble");
        }
    });

    element.addEventListener("click", () => {
        triggerPetFriendFeedback(element);

        if (element.dataset.petSound === "dog") {
            playUiSound(dogAudio, "Dog sound playback was blocked by the browser.");
        }
        if (element.dataset.petSound === "cat") {
            playUiSound(catAudio, "Cat sound playback was blocked by the browser.");
        }
    });
}

function bindHorseTrigger(element) {
    if (!element) {
        return;
    }

    element.addEventListener("animationend", (event) => {
        if (event.animationName === "petFriendBounce") {
            element.classList.remove("is-bouncing");
        }
        if (event.animationName === "petHeartPop") {
            element.classList.remove("show-heart");
        }
        if (event.animationName === "petBubblePop") {
            element.classList.remove("show-bubble");
        }
    });

    element.addEventListener("click", () => {
        triggerPetFriendFeedback(element);
        showHorseWishBubble();
        if (!btnDraggableCarrot || !btnDraggableCarrot.classList.contains("hidden")) {
            playUiSound(horseRunAudio, "Horse run sound playback was blocked by the browser.");
        }
    });
}

function initDraggableCarrot() {
    if (!btnDraggableCarrot || !petStage || !btnPetHorse) {
        return;
    }

    let isDragging = false;
    let carrotRespawnTimer = null;
    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const respawnCarrot = () => {
        btnDraggableCarrot.classList.remove("hidden");
        btnDraggableCarrot.disabled = false;
        btnDraggableCarrot.style.removeProperty("left");
        btnDraggableCarrot.style.removeProperty("right");
        btnDraggableCarrot.style.removeProperty("top");
        btnDraggableCarrot.style.removeProperty("bottom");
        carrotRespawnTimer = null;
    };

    const updateCarrotPosition = (clientX, clientY) => {
        const stageRect = petStage.getBoundingClientRect();
        const carrotRect = btnDraggableCarrot.getBoundingClientRect();
        const nextLeft = clamp(clientX - stageRect.left - pointerOffsetX, 0, stageRect.width - carrotRect.width);
        const nextTop = clamp(clientY - stageRect.top - pointerOffsetY, 0, stageRect.height - carrotRect.height);

        btnDraggableCarrot.style.left = `${nextLeft}px`;
        btnDraggableCarrot.style.top = `${nextTop}px`;
        btnDraggableCarrot.style.bottom = "auto";
    };

    const checkCarrotFedHorse = () => {
        const carrotRect = btnDraggableCarrot.getBoundingClientRect();
        const horseRect = btnPetHorse.getBoundingClientRect();

        const overlaps = !(
            carrotRect.right < horseRect.left ||
            carrotRect.left > horseRect.right ||
            carrotRect.bottom < horseRect.top ||
            carrotRect.top > horseRect.bottom
        );

        if (overlaps) {
            triggerPetFriendFeedback(btnPetHorse);
            playUiSound(horseNeighAudio, "Horse neigh sound playback was blocked by the browser.");
            btnDraggableCarrot.classList.add("hidden");
            btnDraggableCarrot.disabled = true;
            if (carrotRespawnTimer) {
                window.clearTimeout(carrotRespawnTimer);
            }
            carrotRespawnTimer = window.setTimeout(respawnCarrot, 10000);
        }
    };

    btnDraggableCarrot.addEventListener("pointerdown", (event) => {
        if (btnDraggableCarrot.classList.contains("hidden")) {
            return;
        }

        const carrotRect = btnDraggableCarrot.getBoundingClientRect();
        pointerOffsetX = event.clientX - carrotRect.left;
        pointerOffsetY = event.clientY - carrotRect.top;
        isDragging = true;
        btnDraggableCarrot.classList.add("is-dragging");
        btnDraggableCarrot.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    btnDraggableCarrot.addEventListener("pointermove", (event) => {
        if (!isDragging) {
            return;
        }

        updateCarrotPosition(event.clientX, event.clientY);
    });

    const endDrag = (event) => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        btnDraggableCarrot.classList.remove("is-dragging");
        if (typeof event.pointerId === "number" && btnDraggableCarrot.hasPointerCapture(event.pointerId)) {
            btnDraggableCarrot.releasePointerCapture(event.pointerId);
        }
        checkCarrotFedHorse();
    };

    btnDraggableCarrot.addEventListener("pointerup", endDrag);
    btnDraggableCarrot.addEventListener("pointercancel", endDrag);
}

function getFullMessage() {
    return PARAGRAPHS[state.currentParagraph];
}

function setRewardHintVisible(visible) {
    if (!rewardHint) {
        return;
    }

    rewardHint.classList.toggle("hidden", !visible);
}

function appendCharacter(char) {
    if (char === "\n") {
        typewriterElement.appendChild(document.createElement("br"));
        return;
    }
    typewriterElement.appendChild(document.createTextNode(char));
}

function runTypewriter() {
    const message = getFullMessage();

    if (state.typingIndex < message.length) {
        appendCharacter(message.charAt(state.typingIndex));
        state.typingIndex += 1;
        state.typeTimer = window.setTimeout(runTypewriter, 32 + Math.random() * 38);
        return;
    }

    cursorElement.hidden = true;
    
    // 显示信件操作图标
    if (letterActions) {
        letterActions.classList.remove("hidden");
        // 只有当前页还没领取过星之果实，才显示信封
        if (!state.stardropsByPage[state.currentParagraph]) {
            btnCollectStardrop.classList.remove("hidden");
            btnNextPage.classList.add("hidden");
            if (btnPrevPage) btnPrevPage.classList.add("hidden");
            setRewardHintVisible(true);
        } else {
            // 如果已经领取过，直接显示翻页按钮
            btnCollectStardrop.classList.add("hidden");
            setRewardHintVisible(false);
            if (state.currentParagraph < PARAGRAPHS.length - 1) {
                btnNextPage.classList.remove("hidden");
            } else {
                btnNextPage.classList.add("hidden");
            }
            if (state.currentParagraph > 0) {
                if (btnPrevPage) btnPrevPage.classList.remove("hidden");
            } else {
                if (btnPrevPage) btnPrevPage.classList.add("hidden");
            }
        }
    }
}

function resetTypewriter() {
    if (!typewriterElement || !cursorElement) {
        return;
    }

    window.clearTimeout(state.typeTimer);
    typewriterElement.textContent = "";
    cursorElement.hidden = false;
    state.typingIndex = 0;
    
    if (letterActions) {
        letterActions.classList.add("hidden");
    }
    setRewardHintVisible(false);
    if (btnNextPage) {
        btnNextPage.classList.add("hidden");
    }
    if (btnPrevPage) {
        btnPrevPage.classList.add("hidden");
    }

    runTypewriter();
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("stardew-theme", theme);

    const isDark = theme === "dark";

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeToggleText) {
        themeToggleText.textContent = isDark ? "切换晨光" : "切换夜景";
    }
}

function toggleTheme() {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(nextTheme);
}

function bindEvents() {
    bindJunimoSoundTrigger(btnPinJunimo);
    bindJunimoSoundTrigger(btnGalleryJunimo);
    familyMembers.forEach(bindFamilyMemberTrigger);
    petFriends.forEach(bindPetFriendTrigger);
    bindHorseTrigger(btnPetHorse);
    initDraggableCarrot();

    if (btnMusicToggle && bgmAudio) {
        bgmAudio.loop = false;

        bgmAudio.addEventListener("ended", () => {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % playlist.length;
            if (state.isMusicPlaying) {
                playCurrentTrack();
            }
        });

        let musicHoldTimer = null;
        let didLongPress = false;

        const clearMusicHold = () => {
            if (musicHoldTimer) {
                window.clearTimeout(musicHoldTimer);
                musicHoldTimer = null;
            }
        };

        btnMusicToggle.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }

            didLongPress = false;
            clearMusicHold();
            musicHoldTimer = window.setTimeout(() => {
                didLongPress = true;
                nextTrack();
            }, MUSIC_HOLD_DURATION);
        });

        btnMusicToggle.addEventListener("pointerup", clearMusicHold);
        btnMusicToggle.addEventListener("pointerleave", clearMusicHold);
        btnMusicToggle.addEventListener("pointercancel", () => {
            clearMusicHold();
            didLongPress = false;
        });

        btnMusicToggle.addEventListener("click", (event) => {
            if (didLongPress) {
                event.preventDefault();
                didLongPress = false;
                return;
            }

            toggleMusicPlayback();
        });

        btnMusicToggle.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMusicPlayback();
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                nextTrack();
            }
        });
    }

    if (btnCollectStardrop && stardropModal) {
        btnCollectStardrop.addEventListener("click", () => {
            playUiSound(selectButtonAudio, "Select button sound playback was blocked by the browser.");
            stardropModal.classList.remove("hidden");
        });
    }

    if (btnCloseStardrop && stardropModal && btnNextPage) {
        btnCloseStardrop.addEventListener("click", () => {
            stardropModal.classList.add("hidden");
            
            // 记录当前页已获取果实
            if (!state.stardropsByPage[state.currentParagraph]) {
                state.stardropsByPage[state.currentParagraph] = true;
                state.collectedStardrops++;
                playUiSound(gainItemAudio, "Gain item sound playback was blocked by the browser.");
                
                // 动态在左上角追加一个星之果实
                if (stardropContainer) {
                    const newStardrop = document.createElement("img");
                    newStardrop.src = "images/星之果实.gif";
                    newStardrop.style.width = "40px";
                    newStardrop.style.height = "40px";
                    newStardrop.style.animation = "floatY 4s ease-in-out infinite";
                    // 给每个果实设置微小的动画延迟，让它们看起来不同步
                    newStardrop.style.animationDelay = `${state.collectedStardrops * 0.5}s`;
                    stardropContainer.appendChild(newStardrop);
                }

                // 检查是否集齐7个果实
                if (state.collectedStardrops === 7 && achievementToast) {
                    // 移除 hidden 类，准备展示
                    achievementToast.classList.remove("hidden");
                    // 强制重绘，确保 transition 生效
                    void achievementToast.offsetWidth;
                    // 添加 show 类，触发滑入动画
                    achievementToast.classList.add("show");
                    playAchievementSound();
                    
                    // 5秒后自动滑出并隐藏
                    setTimeout(() => {
                        achievementToast.classList.remove("show");
                        setTimeout(() => {
                            achievementToast.classList.add("hidden");
                        }, 600); // 等待 CSS transition (0.6s) 完成
                    }, 5000);
                }
            }
            
            // 隐藏信件按钮
            btnCollectStardrop.classList.add("hidden");
            setRewardHintVisible(false);

            // 显示下一页箭头（如果不是最后一段）
            if (state.currentParagraph < PARAGRAPHS.length - 1) {
                btnNextPage.classList.remove("hidden");
            }
            // 显示上一页箭头（如果不是第一段）
            if (state.currentParagraph > 0 && btnPrevPage) {
                btnPrevPage.classList.remove("hidden");
            }
        });
    }

    if (btnNextPage) {
        btnNextPage.addEventListener("click", () => {
            if (state.currentParagraph < PARAGRAPHS.length - 1) {
                playUiSound(pageTurnAudio, "Page turn sound playback was blocked by the browser.");
                state.currentParagraph++;
                resetTypewriter();
            }
        });
    }

    if (btnPrevPage) {
        btnPrevPage.addEventListener("click", () => {
            if (state.currentParagraph > 0) {
                playUiSound(pageTurnAudio, "Page turn sound playback was blocked by the browser.");
                state.currentParagraph--;
                resetTypewriter();
            }
        });
    }
}

function init() {
    setupAudioUnlock();
    bindEvents();
    resetTypewriter();
    loadCurrentTrack();

    const deferredImages = [
        "images/新成就 .png",
        "images/星之果实.gif",
        "images/鬼魂.gif"
    ];

    const warmUpAssets = () => {
        preloadImages(deferredImages);
    };

    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(warmUpAssets, { timeout: 1800 });
    } else {
        window.setTimeout(warmUpAssets, 1200);
    }

    // 尝试自动播放音乐
    if (bgmAudio && !prefersTouchInput) {
        playCurrentTrack();
    }
}

window.addEventListener("DOMContentLoaded", init);
