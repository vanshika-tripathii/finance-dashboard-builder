(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardProvider",
    ()=>DashboardProvider,
    "useDashboard",
    ()=>useDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const DashboardContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const STORAGE_KEY = "finboard-dashboard";
const DEFAULT_STATE = {
    widgets: [],
    theme: "dark"
};
function DashboardProvider({ children }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_STATE);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardProvider.useEffect": ()=>{
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setState(parsed);
                } catch (e) {
                    console.error("Failed to parse stored dashboard state:", e);
                }
            }
            setHydrated(true);
        }
    }["DashboardProvider.useEffect"], []);
    // Save to localStorage whenever state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardProvider.useEffect": ()=>{
            if (hydrated) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
        }
    }["DashboardProvider.useEffect"], [
        state,
        hydrated
    ]);
    const addWidget = (widget)=>{
        const id = Date.now().toString();
        setState((prev)=>({
                ...prev,
                widgets: [
                    ...prev.widgets,
                    {
                        ...widget,
                        id,
                        data: null,
                        loading: false,
                        error: null,
                        lastUpdated: 0
                    }
                ]
            }));
    };
    const removeWidget = (id)=>{
        setState((prev)=>({
                ...prev,
                widgets: prev.widgets.filter((w)=>w.id !== id)
            }));
    };
    const updateWidget = (id, updates)=>{
        setState((prev)=>({
                ...prev,
                widgets: prev.widgets.map((w)=>w.id === id ? {
                        ...w,
                        ...updates
                    } : w)
            }));
    };
    const reorderWidgets = (fromIndex, toIndex)=>{
        setState((prev)=>{
            const newWidgets = [
                ...prev.widgets
            ];
            const [removed] = newWidgets.splice(fromIndex, 1);
            newWidgets.splice(toIndex, 0, removed);
            return {
                ...prev,
                widgets: newWidgets
            };
        });
    };
    const toggleTheme = ()=>{
        setState((prev)=>({
                ...prev,
                theme: prev.theme === "light" ? "dark" : "light"
            }));
    };
    const fetchWidgetData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardProvider.useCallback[fetchWidgetData]": async (id)=>{
            const widget = state.widgets.find({
                "DashboardProvider.useCallback[fetchWidgetData].widget": (w)=>w.id === id
            }["DashboardProvider.useCallback[fetchWidgetData].widget"]);
            if (!widget) return;
            updateWidget(id, {
                loading: true,
                error: null
            });
            try {
                const response = await fetch(widget.apiUrl, {
                    headers: {
                        Accept: "application/json"
                    }
                });
                if (!response.ok) throw new Error(`API error: ${response.status}`);
                const data = await response.json();
                updateWidget(id, {
                    data,
                    apiResponse: data,
                    loading: false,
                    lastUpdated: Date.now(),
                    error: null
                });
            } catch (error) {
                updateWidget(id, {
                    loading: false,
                    error: error instanceof Error ? error.message : "Unknown error"
                });
            }
        }
    }["DashboardProvider.useCallback[fetchWidgetData]"], [
        state
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardContext.Provider, {
        value: {
            state,
            addWidget,
            removeWidget,
            updateWidget,
            reorderWidgets,
            toggleTheme,
            fetchWidgetData
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(DashboardProvider, "NCejA5kFiWz08XZmGERIdm0QkSw=");
_c = DashboardProvider;
function useDashboard() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
}
_s1(useDashboard, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "DashboardProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/lib/services/storage-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Dashboard configuration backup and export/import functionality
__turbopack_context__.s([
    "createRestoreFile",
    ()=>createRestoreFile,
    "downloadDashboardBackup",
    ()=>downloadDashboardBackup,
    "exportDashboard",
    ()=>exportDashboard,
    "importDashboard",
    ()=>importDashboard
]);
function exportDashboard(state) {
    const backup = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        widgets: state.widgets,
        theme: state.theme
    };
    return JSON.stringify(backup, null, 2);
}
function importDashboard(jsonString) {
    try {
        const backup = JSON.parse(jsonString);
        if (!backup.version || !backup.widgets) {
            throw new Error("Invalid backup format");
        }
        return backup;
    } catch (error) {
        console.error("Import failed:", error);
        return null;
    }
}
function downloadDashboardBackup(state) {
    const data = exportDashboard(state);
    const blob = new Blob([
        data
    ], {
        type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finboard-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function createRestoreFile(callback) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        const backup = importDashboard(text);
        if (backup) {
            callback(backup);
        } else {
            alert("Failed to import backup. Please check the file format.");
        }
    };
    input.click();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/services/storage-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Header({ widgetCount, onAddClick }) {
    _s();
    const { toggleTheme, state, updateWidget, addWidget } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    const [showMenu, setShowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleExport = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadDashboardBackup"])(state);
        setShowMenu(false);
    };
    const handleImport = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$services$2f$storage$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRestoreFile"])((backup)=>{
            // Clear existing widgets
            state.widgets.forEach((w)=>{
            // We'll handle this in the import logic
            });
            // Add imported widgets
            backup.widgets.forEach((widget)=>{
                const { id, ...widgetData } = widget;
                addWidget(widgetData);
            });
            setShowMenu(false);
        });
    };
    const handleClearDashboard = ()=>{
        if (confirm("Are you sure you want to clear all widgets? This action cannot be undone.")) {
            localStorage.removeItem("finboard-dashboard");
            window.location.reload();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-white",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 7h8m0 0v8m0-8L5.257 19.879A2 2 0 005 16.972V5a2 2 0 012-2h12a2 2 0 012 2z"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-white",
                                    children: "Finance Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400",
                                    children: [
                                        widgetCount,
                                        " active widget",
                                        widgetCount !== 1 ? "s" : "",
                                        " • Real-time data"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: ()=>setShowMenu(!showMenu),
                                    className: "border-slate-700 hover:bg-slate-800",
                                    children: "⋮"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                showMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleExport,
                                            className: "w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-2 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this),
                                                "Export Dashboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleImport,
                                            className: "w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-2 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this),
                                                "Import Dashboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-slate-700 my-2"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClearDashboard,
                                            className: "w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 19
                                                }, this),
                                                "Clear Dashboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            onClick: toggleTheme,
                            className: "border-slate-700 hover:bg-slate-800 bg-transparent",
                            children: state.theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                lineNumber: 119,
                                columnNumber: 39
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                lineNumber: 119,
                                columnNumber: 69
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onAddClick,
                            className: "bg-red-600 hover:bg-red-700 text-white gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                "Add Widget"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(Header, "sh4UJQ09SvIzf54EDuXDVHMlv7k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StockWidget",
    ()=>StockWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
"use client";
;
;
function StockWidget({ widget }) {
    if (widget.loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    if (widget.error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-400/80 text-sm p-4 bg-red-500/10 rounded",
            children: widget.error
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    const data = widget.apiResponse || {};
    // Extract common stock data patterns
    let price = 0;
    let change = 0;
    let changePercent = 0;
    let symbol = "N/A";
    // Try different common API response formats
    if (data["Global Quote"]) {
        const q = data["Global Quote"];
        price = Number.parseFloat(q["05. price"]) || 0;
        change = Number.parseFloat(q["09. change"]) || 0;
        changePercent = Number.parseFloat(q["10. change percent"]) || 0;
        symbol = q["01. symbol"] || "N/A";
    } else if (data.c) {
        price = data.c;
        change = data.d || 0;
        changePercent = data.dp || 0;
        symbol = data.t || "N/A";
    } else if (typeof data === "object") {
        // Generic fallback
        price = Number.parseFloat(data.price || data.last || 0);
        change = Number.parseFloat(data.change || 0);
    }
    const isPositive = change >= 0;
    const arrowColor = isPositive ? "text-green-400" : "text-red-400";
    const bgColor = isPositive ? "bg-green-500/10" : "bg-red-500/10";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 rounded-lg ${bgColor}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400 text-sm",
                        children: "Symbol"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold text-lg",
                        children: symbol
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-white text-3xl font-bold",
                        children: [
                            "$",
                            price.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-1 mt-1 ${arrowColor}`,
                        children: [
                            isPositive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                                lineNumber: 63,
                                columnNumber: 62
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    isPositive ? "+" : "",
                                    change.toFixed(2),
                                    " (",
                                    changePercent.toFixed(2),
                                    "%)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = StockWidget;
var _c;
__turbopack_context__.k.register(_c, "StockWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CryptoWidget",
    ()=>CryptoWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
"use client";
;
;
function CryptoWidget({ widget }) {
    if (widget.loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    if (widget.error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-400/80 text-sm p-4 bg-red-500/10 rounded",
            children: widget.error
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    const data = widget.apiResponse || {};
    let price = 0;
    let change24h = 0;
    let symbol = "N/A";
    // Handle CoinGecko format
    if (data.bitcoin) {
        price = data.bitcoin.usd || 0;
        symbol = "BTC";
    } else if (data.ethereum) {
        price = data.ethereum.usd || 0;
        symbol = "ETH";
    } else if (data.price) {
        price = data.price;
        change24h = data.change24h || 0;
        symbol = data.symbol || "N/A";
    }
    const isPositive = change24h >= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 rounded-lg ${isPositive ? "bg-green-500/10" : "bg-red-500/10"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400 text-sm",
                        children: "Cryptocurrency"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold text-lg",
                        children: symbol
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-white text-3xl font-bold",
                        children: [
                            "$",
                            price.toLocaleString("en-US", {
                                maximumFractionDigits: 2
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    change24h !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-1 mt-1 ${isPositive ? "text-green-400" : "text-red-400"}`,
                        children: [
                            isPositive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                                lineNumber: 57,
                                columnNumber: 27
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                                lineNumber: 57,
                                columnNumber: 64
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    isPositive ? "+" : "",
                                    change24h.toFixed(2),
                                    "% (24h)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = CryptoWidget;
var _c;
__turbopack_context__.k.register(_c, "CryptoWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartWidget",
    ()=>ChartWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
"use client";
;
;
function ChartWidget({ widget }) {
    if (widget.loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-blue-500"
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    if (widget.error || !widget.apiResponse) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-slate-400 text-sm p-4 h-64 flex items-center justify-center",
            children: "Unable to load chart data"
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    const data = Array.isArray(widget.apiResponse) ? widget.apiResponse : widget.apiResponse["Time Series (Daily)"] ? Object.entries(widget.apiResponse["Time Series (Daily)"]).slice(0, 30).reverse().map(([date, values])=>({
            date: new Date(date).toLocaleDateString(),
            price: Number.parseFloat(values["4. close"])
        })) : [];
    if (!Array.isArray(data) || data.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-slate-400 text-sm p-4 h-64 flex items-center justify-center",
            children: "No chart data available"
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-64 -mx-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
            width: "100%",
            height: "100%",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                data: data,
                margin: {
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                        strokeDasharray: "3 3",
                        stroke: "#334155"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                        dataKey: "date",
                        stroke: "#94a3b8",
                        style: {
                            fontSize: "12px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                        stroke: "#94a3b8",
                        style: {
                            fontSize: "12px"
                        },
                        domain: "dataMin - 5"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                        contentStyle: {
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "6px"
                        },
                        labelStyle: {
                            color: "#e2e8f0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                        type: "monotone",
                        dataKey: "price",
                        stroke: "#10b981",
                        dot: false,
                        strokeWidth: 2,
                        isAnimationActive: false
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = ChartWidget;
var _c;
__turbopack_context__.k.register(_c, "ChartWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableWidget",
    ()=>TableWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TableWidget({ widget }) {
    _s();
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const itemsPerPage = 10;
    if (widget.loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    if (widget.error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-400/80 text-sm p-4 bg-red-500/10 rounded",
            children: widget.error
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
            lineNumber: 23,
            columnNumber: 12
        }, this);
    }
    const data = Array.isArray(widget.apiResponse) ? widget.apiResponse : widget.apiResponse?.results || widget.apiResponse?.data || [];
    if (!Array.isArray(data) || data.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-slate-400 text-sm p-4",
            children: "No data available"
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
            lineNumber: 31,
            columnNumber: 12
        }, this);
    }
    const columns = Object.keys(data[0] || {}).slice(0, 4);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-700",
                                children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left py-2 px-2 text-slate-400 font-medium text-xs uppercase",
                                        children: col
                                    }, col, false, {
                                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: paginatedData.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-slate-800 hover:bg-slate-800/50 transition-colors",
                                    children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-2 px-2 text-white text-xs truncate max-w-[100px]",
                                            children: String(row[col]).slice(0, 50)
                                        }, col, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                            lineNumber: 55,
                                            columnNumber: 19
                                        }, this))
                                }, idx, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400",
                        children: [
                            "Page ",
                            currentPage + 1,
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage(Math.max(0, currentPage - 1)),
                                disabled: currentPage === 0,
                                className: "px-2 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-white",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentPage(Math.min(totalPages - 1, currentPage + 1)),
                                disabled: currentPage === totalPages - 1,
                                className: "px-2 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-white",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(TableWidget, "kF5zyetxw6M8BnbNC3J8pG5ccpI=");
_c = TableWidget;
var _c;
__turbopack_context__.k.register(_c, "TableWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WidgetCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$stock$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/widgets/stock-widget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$crypto$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/widgets/crypto-widget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$chart$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/widgets/chart-widget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$table$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/widgets/table-widget.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function WidgetCard({ widget }) {
    _s();
    const { removeWidget, fetchWidgetData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    const renderWidgetContent = ()=>{
        switch(widget.widgetType){
            case "stock":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$stock$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StockWidget"], {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 20,
                    columnNumber: 16
                }, this);
            case "crypto":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$crypto$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CryptoWidget"], {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 22,
                    columnNumber: 16
                }, this);
            case "chart":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$chart$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartWidget"], {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 24,
                    columnNumber: 16
                }, this);
            case "table":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$widgets$2f$table$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableWidget"], {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenericWidget, {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 28,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all h-full flex flex-col group cursor-grab active:cursor-grabbing",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                        className: "w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-semibold truncate",
                                        children: widget.name
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 mt-1",
                                children: widget.lastUpdated ? `Updated ${new Date(widget.lastUpdated).toLocaleTimeString()}` : "Never updated"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fetchWidgetData(widget.id),
                                disabled: widget.loading,
                                className: "p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-red-400 disabled:opacity-50",
                                title: "Refresh data",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: `w-4 h-4 ${widget.loading ? "animate-spin" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeWidget(widget.id),
                                className: "p-1.5 hover:bg-red-500/20 rounded transition-colors text-slate-400 hover:text-red-400",
                                title: "Remove widget",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 mb-4 min-h-[120px] bg-slate-900/80 rounded p-3 overflow-y-auto",
                children: renderWidgetContent()
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-slate-600 break-all font-mono",
                children: widget.apiUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(WidgetCard, "OnnqUue0j2CrH6+fMcY7clfYaSw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = WidgetCard;
function GenericWidget({ widget }) {
    const formatValue = (value)=>{
        if (typeof value === "string") return value;
        if (typeof value === "number") return `$${value.toFixed(2)}`;
        if (typeof value === "boolean") return value ? "Yes" : "No";
        return JSON.stringify(value);
    };
    const renderData = ()=>{
        if (widget.loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this);
        }
        if (widget.error) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-400/80 text-sm p-3 bg-red-500/10 rounded space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold",
                        children: [
                            "Error: ",
                            widget.error
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-300",
                        children: "Try:"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-xs text-slate-400 space-y-1 list-disc list-inside",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Checking the API URL is correct"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Verifying the API endpoint is accessible"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Using a free API like CoinGecko or Coinbase"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Clicking refresh to retry the request"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this);
        }
        if (!widget.data && !widget.apiResponse) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-400 text-sm",
                children: "No data available"
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 105,
                columnNumber: 14
            }, this);
        }
        const data = widget.apiResponse || widget.data;
        if (typeof data === "object" && data !== null && !Array.isArray(data)) {
            const entries = Object.entries(data).slice(0, 6);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: entries.map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm border-b border-slate-700/50 pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400 capitalize text-xs truncate",
                                children: [
                                    key.replace(/([A-Z])/g, " $1").trim(),
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold ml-2 text-right",
                                children: formatValue(value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white text-lg font-bold",
            children: formatValue(data)
        }, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx",
            lineNumber: 125,
            columnNumber: 12
        }, this);
    };
    return renderData();
}
_c1 = GenericWidget;
var _c, _c1;
__turbopack_context__.k.register(_c, "WidgetCard");
__turbopack_context__.k.register(_c1, "GenericWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-grid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WidgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$widget$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function WidgetGrid() {
    _s();
    const { state, fetchWidgetData, reorderWidgets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    const [draggedId, setDraggedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draggedOverIndex, setDraggedOverIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchedWidgetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const intervalsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WidgetGrid.useEffect": ()=>{
            // Only fetch widgets that haven't been fetched yet
            state.widgets.forEach({
                "WidgetGrid.useEffect": (widget)=>{
                    if (!fetchedWidgetsRef.current.has(widget.id)) {
                        fetchedWidgetsRef.current.add(widget.id);
                        fetchWidgetData(widget.id);
                    }
                }
            }["WidgetGrid.useEffect"]);
            // Clear old intervals
            intervalsRef.current.forEach({
                "WidgetGrid.useEffect": (interval)=>clearInterval(interval)
            }["WidgetGrid.useEffect"]);
            intervalsRef.current = [];
            // Set up refresh intervals for all widgets
            state.widgets.forEach({
                "WidgetGrid.useEffect": (widget)=>{
                    const interval = setInterval({
                        "WidgetGrid.useEffect.interval": ()=>fetchWidgetData(widget.id)
                    }["WidgetGrid.useEffect.interval"], widget.refreshInterval * 1000);
                    intervalsRef.current.push(interval);
                }
            }["WidgetGrid.useEffect"]);
            return ({
                "WidgetGrid.useEffect": ()=>{
                    intervalsRef.current.forEach({
                        "WidgetGrid.useEffect": (interval)=>clearInterval(interval)
                    }["WidgetGrid.useEffect"]);
                }
            })["WidgetGrid.useEffect"];
        }
    }["WidgetGrid.useEffect"], [
        state.widgets.length,
        state.widgets.map({
            "WidgetGrid.useEffect": (w)=>w.id
        }["WidgetGrid.useEffect"]).join(",")
    ]); // Only re-run when widget count/IDs change
    const handleDragStart = (id)=>{
        setDraggedId(id);
    };
    const handleDragOver = (e, index)=>{
        e.preventDefault();
        setDraggedOverIndex(index);
    };
    const handleDrop = (e, targetIndex)=>{
        e.preventDefault();
        if (draggedId) {
            const fromIndex = state.widgets.findIndex((w)=>w.id === draggedId);
            if (fromIndex !== targetIndex) {
                reorderWidgets(fromIndex, targetIndex);
            }
        }
        setDraggedId(null);
        setDraggedOverIndex(null);
    };
    const handleDragEnd = ()=>{
        setDraggedId(null);
        setDraggedOverIndex(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max",
        children: state.widgets.map((widget, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                draggable: true,
                onDragStart: ()=>handleDragStart(widget.id),
                onDragOver: (e)=>handleDragOver(e, index),
                onDrop: (e)=>handleDrop(e, index),
                onDragEnd: handleDragEnd,
                className: `transition-all duration-200 ${draggedId === widget.id ? "opacity-40 scale-95" : draggedOverIndex === index ? "ring-2 ring-red-500/80 scale-105" : ""}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$widget$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    widget: widget
                }, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-grid.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            }, widget.id, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-grid.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-grid.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(WidgetGrid, "FpLEGsA2LTvgAptH8+jRvX2ENGE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = WidgetGrid;
var _c;
__turbopack_context__.k.register(_c, "WidgetGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddWidgetModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AddWidgetModal({ isOpen, onClose }) {
    _s();
    const { addWidget, fetchWidgetData, state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        apiUrl: "",
        refreshInterval: 30,
        widgetType: "generic"
    });
    const [testing, setTesting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [testError, setTestError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [testSuccess, setTestSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleTestApi = async ()=>{
        setTesting(true);
        setTestError(null);
        setTestSuccess(false);
        try {
            const response = await fetch(formData.apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            await response.json();
            setTestSuccess(true);
        } catch (error) {
            setTestError(error instanceof Error ? error.message : "Test failed");
        }
        setTesting(false);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!formData.name || !formData.apiUrl) {
            setTestError("Please fill in all fields");
            return;
        }
        const newWidget = {
            name: formData.name,
            apiUrl: formData.apiUrl,
            refreshInterval: formData.refreshInterval,
            widgetType: formData.widgetType
        };
        addWidget(newWidget);
        setFormData({
            name: "",
            apiUrl: "",
            refreshInterval: 30,
            widgetType: "generic"
        });
        setTestError(null);
        setTestSuccess(false);
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white",
                            children: "Add New Widget"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-slate-400 hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Widget Name"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "e.g., Bitcoin Price Tracker",
                                    value: formData.name,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Widget Type"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: formData.widgetType,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            widgetType: e.target.value
                                        }),
                                    className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "generic",
                                            children: "Generic Data"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "stock",
                                            children: "Stock Quote"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "crypto",
                                            children: "Cryptocurrency"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "chart",
                                            children: "Line Chart"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "table",
                                            children: "Table Data"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "API URL"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "e.g., https://api.example.com/data",
                                            value: formData.apiUrl,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    apiUrl: e.target.value
                                                }),
                                            className: "flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            onClick: handleTestApi,
                                            disabled: !formData.apiUrl || testing,
                                            variant: "outline",
                                            className: "border-slate-700 hover:bg-slate-800 bg-transparent",
                                            children: testing ? "Testing..." : "Test"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                testError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-400 mt-1",
                                    children: testError
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 123,
                                    columnNumber: 27
                                }, this),
                                testSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-green-400 mt-1",
                                    children: "✓ API test successful!"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 124,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-2 bg-slate-800/50 rounded text-xs text-slate-400 space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-slate-300",
                                            children: "Example API URLs:"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFormData({
                                                    ...formData,
                                                    apiUrl: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
                                                }),
                                            className: "block hover:text-red-400 truncate w-full text-left",
                                            children: "• Bitcoin (CoinGecko)"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFormData({
                                                    ...formData,
                                                    apiUrl: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
                                                }),
                                            className: "block hover:text-red-400 truncate w-full text-left",
                                            children: "• Ethereum (CoinGecko)"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFormData({
                                                    ...formData,
                                                    apiUrl: "https://api.coinbase.com/v2/exchange-rates?currency=USD"
                                                }),
                                            className: "block hover:text-red-400 truncate w-full text-left",
                                            children: "• Exchange Rates (Coinbase)"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Refresh Interval (seconds)"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "5",
                                    max: "3600",
                                    value: formData.refreshInterval,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            refreshInterval: Number.parseInt(e.target.value)
                                        }),
                                    className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    onClick: onClose,
                                    variant: "outline",
                                    className: "flex-1 border-slate-700 hover:bg-slate-800 bg-transparent",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    className: "flex-1 bg-red-600 hover:bg-red-700 text-white",
                                    children: "Add Widget"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(AddWidgetModal, "2PZ9qbd/IGULiZmv/SxZzrSfwck=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = AddWidgetModal;
var _c;
__turbopack_context__.k.register(_c, "AddWidgetModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/dashboard/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$widget$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/dashboard/widget-grid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$add$2d$widget$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/dashboard/add-widget-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Dashboard() {
    _s();
    const [isAddModalOpen, setIsAddModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWelcome, setShowWelcome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const hasVisited = localStorage.getItem("finboard-visited");
            if (hasVisited) {
                setShowWelcome(false);
            } else {
                localStorage.setItem("finboard-visited", "true");
            }
            // Apply theme to document root
            const root = document.documentElement;
            if (state.theme === "light") {
                root.classList.remove("dark");
            } else {
                root.classList.add("dark");
            }
        }
    }["Dashboard.useEffect"], [
        state.theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                widgetCount: state.widgets.length,
                onAddClick: ()=>setIsAddModalOpen(true)
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: state.widgets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center py-20 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-red-500",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white mb-2",
                            children: "Build Your Finance Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 mb-4 max-w-md",
                            children: "Create custom widgets by connecting to any financial API. Track stocks, crypto, and more in real-time."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6 max-w-md text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-semibold mb-3",
                                    children: "Getting Started:"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "text-slate-300 text-sm space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400 flex-shrink-0",
                                                    children: "1."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: 'Click "Add Widget" to create a new widget'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400 flex-shrink-0",
                                                    children: "2."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Enter a widget name and API endpoint"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400 flex-shrink-0",
                                                    children: "3."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Test the API and configure refresh rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400 flex-shrink-0",
                                                    children: "4."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Drag widgets to rearrange your layout"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setIsAddModalOpen(true),
                            className: "bg-red-600 hover:bg-red-700 text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                "Add New Widget"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$widget$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$add$2d$widget$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isAddModalOpen,
                onClose: ()=>setIsAddModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "SpcXVwKk/tl3u10EqeM4DSkwXQU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/finance-dashboard-builder/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/components/dashboard/dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/finance-dashboard-builder/lib/context/dashboard-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Home() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setMounted(true);
        }
    }["Home.useEffect"], []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$lib$2f$context$2f$dashboard$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$finance$2d$dashboard$2d$builder$2f$components$2f$dashboard$2f$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/Downloads/finance-dashboard-builder/app/page.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/finance-dashboard-builder/app/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Home, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_finance-dashboard-builder_112da08d._.js.map