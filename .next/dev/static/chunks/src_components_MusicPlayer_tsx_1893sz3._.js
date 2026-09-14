(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/MusicPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
// Generate Christmas melody using Web Audio API
const createChristmasMelody = (audioCtx)=>{
    const sampleRate = audioCtx.sampleRate;
    const duration = 8;
    const buffer = audioCtx.createBuffer(2, sampleRate * duration, sampleRate);
    const notes = [
        {
            freq: 329.63,
            start: 0,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 0.35,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 0.7,
            dur: 0.6
        },
        {
            freq: 329.63,
            start: 1.35,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 1.7,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 2.05,
            dur: 0.6
        },
        {
            freq: 329.63,
            start: 2.7,
            dur: 0.3
        },
        {
            freq: 392.0,
            start: 3.05,
            dur: 0.3
        },
        {
            freq: 261.63,
            start: 3.4,
            dur: 0.3
        },
        {
            freq: 293.66,
            start: 3.75,
            dur: 0.15
        },
        {
            freq: 329.63,
            start: 3.95,
            dur: 0.9
        },
        {
            freq: 349.23,
            start: 4.9,
            dur: 0.3
        },
        {
            freq: 349.23,
            start: 5.25,
            dur: 0.3
        },
        {
            freq: 349.23,
            start: 5.6,
            dur: 0.45
        },
        {
            freq: 349.23,
            start: 6.1,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 6.45,
            dur: 0.3
        },
        {
            freq: 329.63,
            start: 6.8,
            dur: 0.3
        },
        {
            freq: 293.66,
            start: 7.15,
            dur: 0.3
        },
        {
            freq: 293.66,
            start: 7.5,
            dur: 0.15
        },
        {
            freq: 329.63,
            start: 7.7,
            dur: 0.2
        }
    ];
    for(let channel = 0; channel < 2; channel++){
        const channelData = buffer.getChannelData(channel);
        notes.forEach(({ freq, start, dur })=>{
            const startSample = Math.floor(start * sampleRate);
            const endSample = Math.floor((start + dur) * sampleRate);
            for(let i = startSample; i < endSample && i < channelData.length; i++){
                const t = (i - startSample) / sampleRate;
                const envelope = Math.min(t * 10, 1) * Math.min((dur - t) * 10, 1);
                channelData[i] += 0.12 * envelope * (Math.sin(2 * Math.PI * freq * t) + 0.5 * Math.sin(2 * Math.PI * freq * 2 * t) + 0.25 * Math.sin(2 * Math.PI * freq * 3 * t));
            }
        });
        const chordFreqs = [
            261.63,
            329.63,
            392.0
        ];
        chordFreqs.forEach((freq)=>{
            for(let i = 0; i < channelData.length; i++){
                const t = i / sampleRate;
                const envelope = 0.03 + 0.02 * Math.sin(2 * Math.PI * 0.5 * t);
                channelData[i] += envelope * Math.sin(2 * Math.PI * freq * t * 0.5);
            }
        });
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
};
const MusicPlayer = ()=>{
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [volume, setVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0.4);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoplayBlocked, setAutoplayBlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gainNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const stopAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MusicPlayer.useCallback[stopAudio]": ()=>{
            if (sourceRef.current) {
                try {
                    sourceRef.current.stop();
                } catch  {}
                sourceRef.current = null;
            }
        }
    }["MusicPlayer.useCallback[stopAudio]"], []);
    const startAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MusicPlayer.useCallback[startAudio]": async ()=>{
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
                gainNodeRef.current = audioCtxRef.current.createGain();
                gainNodeRef.current.connect(audioCtxRef.current.destination);
                gainNodeRef.current.gain.value = volume;
            }
            if (audioCtxRef.current.state === 'suspended') {
                await audioCtxRef.current.resume();
            }
            if (!sourceRef.current) {
                const source = createChristmasMelody(audioCtxRef.current);
                source.connect(gainNodeRef.current);
                source.start();
                sourceRef.current = source;
            }
        }
    }["MusicPlayer.useCallback[startAudio]"], [
        volume
    ]);
    // Autoplay on mount — try immediately, fallback to first user interaction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MusicPlayer.useEffect": ()=>{
            const tryAutoplay = {
                "MusicPlayer.useEffect.tryAutoplay": async ()=>{
                    try {
                        await startAudio();
                        setIsPlaying(true);
                        hasStartedRef.current = true;
                    } catch  {
                        // Autoplay blocked by browser policy
                        setAutoplayBlocked(true);
                    }
                }
            }["MusicPlayer.useEffect.tryAutoplay"];
            // Small delay to let the page settle
            const timer = setTimeout({
                "MusicPlayer.useEffect.timer": ()=>{
                    tryAutoplay();
                }
            }["MusicPlayer.useEffect.timer"], 800);
            return ({
                "MusicPlayer.useEffect": ()=>clearTimeout(timer)
            })["MusicPlayer.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MusicPlayer.useEffect"], []);
    // Fallback: start on first user click anywhere on the page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MusicPlayer.useEffect": ()=>{
            if (!autoplayBlocked) return;
            const handleFirstInteraction = {
                "MusicPlayer.useEffect.handleFirstInteraction": async ()=>{
                    if (hasStartedRef.current) return;
                    try {
                        await startAudio();
                        setIsPlaying(true);
                        hasStartedRef.current = true;
                        setAutoplayBlocked(false);
                    } catch  {}
                    document.removeEventListener('click', handleFirstInteraction);
                    document.removeEventListener('keydown', handleFirstInteraction);
                }
            }["MusicPlayer.useEffect.handleFirstInteraction"];
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('keydown', handleFirstInteraction);
            return ({
                "MusicPlayer.useEffect": ()=>{
                    document.removeEventListener('click', handleFirstInteraction);
                    document.removeEventListener('keydown', handleFirstInteraction);
                }
            })["MusicPlayer.useEffect"];
        }
    }["MusicPlayer.useEffect"], [
        autoplayBlocked,
        startAudio
    ]);
    const togglePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MusicPlayer.useCallback[togglePlay]": async ()=>{
            if (isPlaying) {
                stopAudio();
                if (audioCtxRef.current) await audioCtxRef.current.suspend();
                setIsPlaying(false);
            } else {
                if (audioCtxRef.current?.state === 'suspended') {
                    await audioCtxRef.current.resume();
                } else {
                    await startAudio();
                }
                setIsPlaying(true);
            }
        }
    }["MusicPlayer.useCallback[togglePlay]"], [
        isPlaying,
        startAudio,
        stopAudio
    ]);
    const handleVolumeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MusicPlayer.useCallback[handleVolumeChange]": (e)=>{
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            if (gainNodeRef.current && audioCtxRef.current) {
                gainNodeRef.current.gain.setTargetAtTime(newVolume, audioCtxRef.current.currentTime, 0.01);
            }
        }
    }["MusicPlayer.useCallback[handleVolumeChange]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MusicPlayer.useEffect": ()=>{
            return ({
                "MusicPlayer.useEffect": ()=>{
                    stopAudio();
                    try {
                        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                            audioCtxRef.current.close();
                        }
                    } catch  {
                    // Already closed — safe to ignore
                    }
                }
            })["MusicPlayer.useEffect"];
        }
    }["MusicPlayer.useEffect"], [
        stopAudio
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3",
        children: [
            autoplayBlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card-dark px-4 py-2 text-xs text-yellow-300 flex items-center gap-2",
                style: {
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    maxWidth: '200px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "🔔"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Klik di mana saja untuk mulai musik"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MusicPlayer.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card-dark p-4 w-64 sm:w-72",
                style: {
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "🎵"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white text-xs font-semibold truncate",
                                        children: "Jingle Bells"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-xs",
                                        children: "Melodi Natal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "music-wave flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            height: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 210,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            height: '8px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            height: '12px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            height: '8px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 213,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            height: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MusicPlayer.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: "🔉"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "1",
                                step: "0.05",
                                value: volume,
                                onChange: handleVolumeChange,
                                className: "flex-1 h-1 rounded-full appearance-none cursor-pointer",
                                style: {
                                    background: `linear-gradient(to right, #FFD700 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                                },
                                "aria-label": "Volume control"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400 w-8 text-right",
                                children: [
                                    Math.round(volume * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MusicPlayer.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-xs mt-3 text-center",
                        children: "🎄 Autoplay Aktif"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MusicPlayer.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsExpanded(!isExpanded),
                        className: "glass-card-dark px-3 py-2 text-xs text-gray-300 hover:text-white transition-colors rounded-full",
                        style: {
                            border: '1px solid rgba(255, 215, 0, 0.2)'
                        },
                        "aria-label": "Toggle music settings",
                        children: isExpanded ? '✕' : '🎶 Musik'
                    }, void 0, false, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: togglePlay,
                        className: "music-player w-14 h-14 flex items-center justify-center rounded-full text-2xl transition-all duration-300 hover:scale-110 active:scale-95",
                        style: {
                            boxShadow: isPlaying ? '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(196, 30, 58, 0.3)' : '0 4px 20px rgba(196, 30, 58, 0.3)'
                        },
                        "aria-label": isPlaying ? 'Pause music' : 'Play Christmas music',
                        children: isPlaying ? '⏸️' : '▶️'
                    }, void 0, false, {
                        fileName: "[project]/src/components/MusicPlayer.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MusicPlayer.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MusicPlayer.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MusicPlayer, "giIw/4o7MsTRAdGePVbBHYhO4ZE=");
_c = MusicPlayer;
const __TURBOPACK__default__export__ = MusicPlayer;
var _c;
__turbopack_context__.k.register(_c, "MusicPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MusicPlayer.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/MusicPlayer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_MusicPlayer_tsx_1893sz3._.js.map