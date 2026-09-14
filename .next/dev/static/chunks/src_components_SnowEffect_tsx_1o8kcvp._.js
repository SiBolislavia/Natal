(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/SnowEffect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const SnowEffect = ()=>{
    _s();
    const [snowflakes, setSnowflakes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnowEffect.useEffect": ()=>{
            const count = window.innerWidth < 640 ? 40 : 80;
            const flakes = Array.from({
                length: count
            }, {
                "SnowEffect.useEffect.flakes": (_, i)=>({
                        id: i,
                        x: Math.random() * 100,
                        size: Math.random() * 5 + 2,
                        duration: Math.random() * 8 + 6,
                        delay: Math.random() * 10,
                        opacity: Math.random() * 0.6 + 0.3,
                        blur: Math.random() * 1.5
                    })
            }["SnowEffect.useEffect.flakes"]);
            setSnowflakes(flakes);
        }
    }["SnowEffect.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "snow-container",
        "aria-hidden": "true",
        children: snowflakes.map((flake)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "snowflake",
                style: {
                    left: `${flake.x}%`,
                    width: `${flake.size}px`,
                    height: `${flake.size}px`,
                    animationDuration: `${flake.duration}s`,
                    animationDelay: `${flake.delay}s`,
                    opacity: flake.opacity,
                    filter: `blur(${flake.blur}px)`,
                    boxShadow: `0 0 ${flake.size * 2}px rgba(200, 220, 255, 0.8)`
                }
            }, flake.id, false, {
                fileName: "[project]/src/components/SnowEffect.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/SnowEffect.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SnowEffect, "ahnEB9NHBZwKf8+2uD8Jh1r10j4=");
_c = SnowEffect;
const __TURBOPACK__default__export__ = SnowEffect;
var _c;
__turbopack_context__.k.register(_c, "SnowEffect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SnowEffect.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/SnowEffect.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_SnowEffect_tsx_1o8kcvp._.js.map