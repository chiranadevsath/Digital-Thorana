import React, { useState, useEffect } from "react";

// ============================================================
//  DIGITAL THORANA - JATAKA STORIES WITH ROTATING COLORS
//  Dynamic color cycling rings, animated glow, and particle effects
// ============================================================

// Image configuration - Replace with your actual image URLs
const IMAGES = {
    scene1:  "/5.jpg",
    scene2:  "/6.jpg",
    scene3:  "/3.jpg",
    scene4:  "/4.jpg",
    scene5:  "/7.jpeg",
    scene6:  "/8.jpg",
    scene7:  "/2.jpg",
    scene8:  "/1.jpg",
    center: "/buddha.png",
};

// Color cycling palettes
const COLOR_PALETTES = {
    gold: ["#e6b84e", "#ffdf9c", "#b87a1a", "#d4a843", "#f0c060"],
    crimson: ["#c43a2a", "#e07050", "#8b2a1a", "#d45040", "#f06040"],
    sapphire: ["#2a6bc0", "#4a8ae0", "#1a4a8a", "#3a7ac0", "#5a9ae0"],
    emerald: ["#2a8a4a", "#4aaa6a", "#1a6a2a", "#3a9a5a", "#5aba7a"],
    amber: ["#d4882a", "#f0a840", "#b06818", "#e09830", "#f8b850"],
    ruby: ["#d42a3a", "#f04a5a", "#a41a2a", "#e03a4a", "#f85a6a"],
};

const currentGoldDark = "#8b5a12";

// Scene positions
const SCENES = [
    { id: 1, key: "scene1", cx: 340, cy: 168, label: "සිව් තෙරුවන්" },
    { id: 2, key: "scene2", cx: 190, cy: 295, label: "මහා දානය" },
    { id: 3, key: "scene3", cx: 228, cy: 445, label: "සත්‍ය කථාව" },
    { id: 4, key: "scene4", cx: 358, cy: 430, label: "මෛත්‍රී බලය" },
    { id: 5, key: "scene5", cx: 560, cy: 168, label: "ධර්ම දේශනා" },
    { id: 6, key: "scene6", cx: 710, cy: 295, label: "අනුකම්පාව" },
    { id: 7, key: "scene7", cx: 672, cy: 445, label: "ප්‍රඥාව" },
    { id: 8, key: "scene8", cx: 542, cy: 430, label: "නිවන් මඟ" },
];

// Animated Ring with color cycling
const ColorCyclingRing = ({ cx, cy, radius, strokeWidth, dashArray, duration, direction = "clockwise", colorPalette, delay = 0 }) => {
    const rotateTo = direction === "clockwise" ? "360" : "-360";

    return (
        <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={colorPalette[0]}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            opacity="0.7"
            filter="url(#glowF)"
        >
            <animate
                attributeName="stroke"
                values={colorPalette.join(";")}
                dur="8s"
                begin={`${delay}s`}
                repeatCount="indefinite"
            />
            <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${cx} ${cy}`}
                to={`${rotateTo} ${cx} ${cy}`}
                dur={duration}
                repeatCount="indefinite"
            />
            <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur="3s"
                repeatCount="indefinite"
            />
        </circle>
    );
};

// Pulsing Ring with color cycling
const PulsingColorRing = ({ cx, cy, maxRadius, minRadius, strokeWidth, duration, colorPalette }) => {
    return (
        <circle
            cx={cx}
            cy={cy}
            r={minRadius}
            fill="none"
            stroke={colorPalette[0]}
            strokeWidth={strokeWidth}
            opacity="0.5"
        >
            <animate
                attributeName="stroke"
                values={colorPalette.join(";")}
                dur="6s"
                repeatCount="indefinite"
            />
            <animate
                attributeName="r"
                values={`${minRadius};${maxRadius};${minRadius}`}
                dur={duration}
                repeatCount="indefinite"
            />
            <animate
                attributeName="opacity"
                values="0.6;0.1;0.6"
                dur={duration}
                repeatCount="indefinite"
            />
        </circle>
    );
};

// Rainbow Rotating Dots
const RainbowDotsRing = ({ cx, cy, radius, count = 24, duration = 15 }) => {
    const rainbowColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0088ff", "#8800ff", "#ff00ff"];

    return (
        <g>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={`${duration}s`} repeatCount="indefinite" />
            {[...Array(count)].map((_, i) => {
                const angle = (i * (360 / count)) * Math.PI / 180;
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                return (
                    <circle key={i} cx={x} cy={y} r="2.5" fill={rainbowColors[i % rainbowColors.length]} opacity="0.7">
                        <animate
                            attributeName="fill"
                            values={rainbowColors.join(";")}
                            dur="4s"
                            begin={`${i * 0.1}s`}
                            repeatCount="indefinite"
                        />
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                        <animate attributeName="r" values="2;3.5;2" dur="2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                    </circle>
                );
            })}
        </g>
    );
};

// Floating Particle with color cycling
const ColorCycleParticle = ({ cx, cy, delay, radius = 2 }) => {
    const colors = ["#ffcc66", "#ff8866", "#ff6666", "#ffaa66", "#ffdd88"];

    return (
        <circle cx={cx} cy={cy} r={radius} fill="#ffcc66" filter="url(#glowF)">
            <animate
                attributeName="fill"
                values={colors.join(";")}
                dur="3s"
                begin={`${delay}s`}
                repeatCount="indefinite"
            />
            <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="4s"
                begin={`${delay}s`}
                repeatCount="indefinite"
            />
            <animate
                attributeName="cy"
                values={`${cy};${cy - 50};${cy}`}
                dur="4s"
                begin={`${delay}s`}
                repeatCount="indefinite"
            />
            <animate
                attributeName="cx"
                values={`${cx};${cx + 20};${cx - 20};${cx}`}
                dur="4s"
                begin={`${delay}s`}
                repeatCount="indefinite"
            />
        </circle>
    );
};

// Oil lamp with animated flame and color cycling glow
const AnimatedOilLamp = ({ cx, cy, r = 18, index = 0 }) => {
    const glowColors = ["#ffdd88", "#ffaa55", "#ff8844", "#ffaa66", "#ffcc88"];

    return (
        <g>
            <defs>
                <radialGradient id={`flame-${cx}-${cy}`} cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#fff8d0" stopOpacity="1" />
                    <stop offset="25%" stopColor="#ffdd66" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#ffaa33" stopOpacity="0.7" />
                    <stop offset="85%" stopColor="#ff6622" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
                </radialGradient>
            </defs>
            {/* Outer glow with color cycle */}
            <circle cx={cx} cy={cy} r={r * 1.8} fill={`url(#flame-${cx}-${cy})`} opacity="0.3">
                <animate attributeName="fill" values={glowColors.join(";")} dur="4s" begin={`${index * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${r * 1.5};${r * 2.0};${r * 1.5}`} dur="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Main flame */}
            <ellipse cx={cx} cy={cy - r * 0.3} rx={r * 0.28} ry={r * 0.48} fill="#ffea80" filter="url(#glowF)">
                <animate attributeName="ry" values={`${r * 0.44};${r * 0.54};${r * 0.44}`} dur="0.6s" repeatCount="indefinite" />
            </ellipse>
            {/* Inner flame */}
            <ellipse cx={cx} cy={cy - r * 0.35} rx={r * 0.14} ry={r * 0.3} fill="#fff8d0" />
            {/* Lamp body */}
            <ellipse cx={cx} cy={cy + r * 0.35} rx={r * 0.55} ry={r * 0.3} fill="#b87a1a" opacity="0.9" />
            <ellipse cx={cx} cy={cy + r * 0.25} rx={r * 0.45} ry={r * 0.22} fill="#e6b84e" />
            <ellipse cx={cx} cy={cy + r * 0.15} rx={r * 0.35} ry={r * 0.15} fill="#ffdf9c" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
        </g>
    );
};

// Scene circle component with color cycling border
const ThoranaSceneCircle = ({ cx, cy, id, imgSrc, label, hueOffset = 0 }) => {
    const R = 66;
    const clipId = `clip-scene-${id}`;
    const [isHovered, setIsHovered] = useState(false);
    const borderColors = ["#e6b84e", "#ffdf9c", "#c43a2a", "#e07050", "#2a6bc0", "#4a8ae0", "#2a8a4a", "#4aaa6a", "#d4882a", "#f0a840"];

    return (
        <g
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <defs>
                <clipPath id={clipId}>
                    <circle cx={cx} cy={cy} r={R - 8} />
                </clipPath>
                <radialGradient id={`sceneGlow-${id}`} cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ffdf9c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#b87a1a" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Animated outer ring with color cycling */}
            <circle cx={cx} cy={cy} r={R + 6} fill="none" stroke={borderColors[0]} strokeWidth="2" opacity="0.6" filter="url(#glowF)">
                <animate attributeName="stroke" values={borderColors.join(";")} dur="6s" begin={`${id * 0.5}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="8s" repeatCount="indefinite" />
            </circle>

            {/* Main circle frame with color cycling */}
            <circle cx={cx} cy={cy} r={R + 2} fill="none" stroke={borderColors[0]} strokeWidth="2.5" filter="url(#glowF)">
                <animate attributeName="stroke" values={borderColors.join(";")} dur="5s" begin={`${id * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r={R} fill="#0d0a04" stroke="#ffdf9c" strokeWidth="2" />

            {/* Rotating decorative dots with color cycling */}
            <g>
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`} dur="12s" repeatCount="indefinite" />
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * Math.PI / 180;
                    const dotX = cx + (R + 10) * Math.cos(angle);
                    const dotY = cy + (R + 10) * Math.sin(angle);
                    return (
                        <circle key={i} cx={dotX} cy={dotY} r="2.5" fill={borderColors[i % borderColors.length]} opacity="0.8">
                            <animate attributeName="fill" values={borderColors.join(";")} dur="4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                        </circle>
                    );
                })}
            </g>

            {/* Image or placeholder */}
            {imgSrc ? (
                <image
                    href={imgSrc}
                    x={cx - (R - 8)}
                    y={cy - (R - 8)}
                    width={(R - 8) * 2}
                    height={(R - 8) * 2}
                    clipPath={`url(#${clipId})`}
                    preserveAspectRatio="xMidYMid slice"
                    opacity={isHovered ? 1 : 0.9}
                />
            ) : (
                <>
                    <rect x={cx - 32} y={cy - 32} width="64" height="64" rx="32" fill="#1c150b" opacity="0.9" />
                    <text x={cx} y={cy - 4} textAnchor="middle" fontSize="24" fill="#e6b84e" fontFamily="Georgia,serif">✦</text>
                    <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="#ffdf9c" fontFamily="Georgia,serif">
                        Scene {id}
                    </text>
                </>
            )}

            {/* Hover glow effect */}
            {isHovered && (
                <>
                    <circle cx={cx} cy={cy} r={R + 12} fill={`url(#sceneGlow-${id})`} />
                    <circle cx={cx} cy={cy} r={R + 4} fill="none" stroke="#ffdf9c" strokeWidth="3" filter="url(#strongGlow)" opacity="0.8">
                        <animate attributeName="stroke" values={borderColors.join(";")} dur="1s" repeatCount="indefinite" />
                    </circle>
                </>
            )}

            {/* Number badge with color cycling */}
            <g>
                <circle cx={cx + R - 14} cy={cy - R + 14} r="12" fill="#8b2a1a" stroke="#e6b84e" strokeWidth="1.5">
                    <animate attributeName="stroke" values={borderColors.join(";")} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="r" values="11;13;11" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x={cx + R - 14} y={cy - R + 18} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Georgia,serif">
                    {id}
                </text>
            </g>

            {/* Label */}
            <text x={cx} y={cy + R + 12} textAnchor="middle" fontSize="8" fill="#e6b84e" fontFamily="Georgia,serif" opacity="0.8">
                {label}
            </text>
        </g>
    );
};

// Main Component
export default function DigitalThorana() {
    const [imgs] = useState(IMAGES);
    const [colorIndex, setColorIndex] = useState(0);

    // Rotate color palette index over time
    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex(prev => (prev + 1) % 6);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Get current color palettes based on index
    const currentGold = COLOR_PALETTES.gold[colorIndex % COLOR_PALETTES.gold.length];
    const currentCrimson = COLOR_PALETTES.crimson[colorIndex % COLOR_PALETTES.crimson.length];
    const currentSapphire = COLOR_PALETTES.sapphire[colorIndex % COLOR_PALETTES.sapphire.length];
    const currentEmerald = COLOR_PALETTES.emerald[colorIndex % COLOR_PALETTES.emerald.length];

    return (
        <div style={{
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            background: `radial-gradient(circle at 30% 20%, #0d0a04, #030101)`,
            borderRadius: 32,
            padding: "20px 16px 28px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,215,0,0.08)",
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${currentGold}`,
        }}>
            {/* Animated particle background */}
            <div style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage: `radial-gradient(circle at 20% 40%, ${currentGold}08 1px, transparent 1px)`,
                backgroundSize: "35px 35px",
            }} />

            {/* Header with color cycling */}
            <div style={{ textAlign: "center", marginBottom: 12, position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
                    <div style={{ height: 2, width: 60, background: `linear-gradient(to right, transparent, ${currentGold})` }} />
                    <div style={{
                        background: `linear-gradient(135deg, #b87a1a, ${currentGold})`,
                        padding: "8px 28px",
                        borderRadius: 40,
                        boxShadow: `0 0 30px ${currentGold}66, inset 0 1px 2px rgba(255,255,200,0.3)`,
                    }}>
                        <h1 style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#1a1206",
                            margin: 0,
                            letterSpacing: 5,
                            fontFamily: "Georgia,serif",
                            textShadow: "0 2px 4px rgba(255,215,0,0.4)",
                        }}>
                            ෴ ජාතක කතා ෴
                        </h1>
                    </div>
                    <div style={{ height: 2, width: 60, background: `linear-gradient(to left, transparent, ${currentGold})` }} />
                </div>
                <p style={{
                    fontSize: 13,
                    color: currentGold,
                    margin: "10px 0 0",
                    letterSpacing: 3,
                    fontFamily: "Georgia,serif",
                    textTransform: "uppercase",
                }}>
                    Digital Thorana — Jataka Illumination Mandala
                </p>
            </div>

            {/* Main SVG Canvas */}
            <svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
                <defs>
                    {/* Glow filters */}
                    <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feComponentTransfer in="blur" result="boost">
                            <feFuncA type="linear" slope="1.8" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="boost" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="2" />
                    </filter>

                    {/* Background gradient */}
                    <radialGradient id="bgMandala" cx="50%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="#1a1408" />
                        <stop offset="40%" stopColor="#0f0a04" />
                        <stop offset="100%" stopColor="#030201" />
                    </radialGradient>

                    {/* Divine center glow with color cycle */}
                    <radialGradient id="divineCenter" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={currentGold} stopOpacity="0.35" />
                        <stop offset="40%" stopColor="#ffaa44" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Background */}
                <rect width="900" height="620" fill="url(#bgMandala)" rx="20" />

                {/* Decorative border with color cycling */}
                <rect x="10" y="6" width="880" height="608" rx="16" fill="none" stroke={currentGold} strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5">
                    <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
                </rect>

                {/* Center ambient glow with color cycle */}
                <circle cx="450" cy="260" r="250" fill="url(#divineCenter)" pointerEvents="none" />

                {/* ===== COLOR CYCLING RINGS ===== */}

                <ColorCyclingRing cx={450} cy={245} radius={175} strokeWidth="1.5" dashArray="4 12" duration="25s" direction="clockwise" colorPalette={COLOR_PALETTES.gold} delay={0} />
                <ColorCyclingRing cx={450} cy={245} radius={155} strokeWidth="1.2" dashArray="3 10" duration="20s" direction="counter-clockwise" colorPalette={COLOR_PALETTES.crimson} delay={1} />
                <ColorCyclingRing cx={450} cy={245} radius={135} strokeWidth="1" dashArray="2 8" duration="18s" direction="clockwise" colorPalette={COLOR_PALETTES.sapphire} delay={2} />
                <ColorCyclingRing cx={450} cy={245} radius={115} strokeWidth="1.5" dashArray="6 10" duration="15s" direction="counter-clockwise" colorPalette={COLOR_PALETTES.emerald} delay={3} />
                <ColorCyclingRing cx={450} cy={245} radius={95} strokeWidth="1.2" dashArray="4 8" duration="12s" direction="clockwise" colorPalette={COLOR_PALETTES.amber} delay={4} />

                {/* Pulsing color rings */}
                <PulsingColorRing cx={450} cy={245} maxRadius={195} minRadius={180} strokeWidth="1" duration="7s" colorPalette={COLOR_PALETTES.gold} />
                <PulsingColorRing cx={450} cy={245} maxRadius={145} minRadius={130} strokeWidth="1.2" duration="5s" colorPalette={COLOR_PALETTES.crimson} />
                <PulsingColorRing cx={450} cy={245} maxRadius={105} minRadius={92} strokeWidth="1.5" duration="4s" colorPalette={COLOR_PALETTES.sapphire} />

                {/* Rainbow rotating dots ring */}
                <RainbowDotsRing cx={450} cy={245} radius={165} count={32} duration={20} />

                {/* Another dotted ring in opposite direction */}
                <g>
                    <animateTransform attributeName="transform" type="rotate" from="360 450 245" to="0 450 245" dur="25s" repeatCount="indefinite" />
                    {[...Array(36)].map((_, i) => {
                        const angle = (i * 10) * Math.PI / 180;
                        const x = 450 + 125 * Math.cos(angle);
                        const y = 245 + 125 * Math.sin(angle);
                        return (
                            <circle key={i} cx={x} cy={y} r="2" fill="#d4882a" opacity="0.5">
                                <animate attributeName="fill" values={`${COLOR_PALETTES.amber.join(";")}`} dur="5s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                            </circle>
                        );
                    })}
                </g>

                {/* Thorana Lotus Petals with color cycling strokes */}
                <g filter="url(#glowF)">
                    <ellipse cx={450} cy={195} rx={105} ry={148} fill="#2a1f12" stroke={currentGold} strokeWidth="1.8" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="6s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={280} cy={220} rx={92} ry={130} fill="#2a1a0a" stroke={currentCrimson} strokeWidth="1.5" transform="rotate(-38,280,220)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.crimson.join(";")}`} dur="5s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={620} cy={220} rx={92} ry={130} fill="#2a1a0a" stroke={currentCrimson} strokeWidth="1.5" transform="rotate(38,620,220)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.crimson.join(";")}`} dur="5s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={180} cy={350} rx={125} ry={85} fill="#1a1a2a" stroke={currentSapphire} strokeWidth="1.5" transform="rotate(-12,180,350)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.sapphire.join(";")}`} dur="7s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={720} cy={350} rx={125} ry={85} fill="#1a1a2a" stroke={currentSapphire} strokeWidth="1.5" transform="rotate(12,720,350)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.sapphire.join(";")}`} dur="7s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={245} cy={470} rx={105} ry={85} fill="#2a1f12" stroke={currentEmerald} strokeWidth="1.5" transform="rotate(-55,245,470)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.emerald.join(";")}`} dur="6s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={655} cy={470} rx={105} ry={85} fill="#2a1f12" stroke={currentEmerald} strokeWidth="1.5" transform="rotate(55,655,470)" opacity="0.85">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.emerald.join(";")}`} dur="6s" repeatCount="indefinite" />
                    </ellipse>
                </g>

                {/* Inner lotus platform */}
                <ellipse cx="450" cy="355" rx="140" ry="115" fill="#120e06" stroke={currentGold} strokeWidth="2" opacity="0.9">
                    <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="450" cy="355" rx="130" ry="105" fill="none" stroke="#ffdf9c" strokeWidth="1" strokeDasharray="6 5" opacity="0.6" />

                {/* Color cycling floating particles */}
                <ColorCycleParticle cx="200" cy="150" delay={0} radius={2.5} />
                <ColorCycleParticle cx="700" cy="130" delay={1} radius={2} />
                <ColorCycleParticle cx="150" cy="400" delay={0.5} radius={2} />
                <ColorCycleParticle cx="750" cy="420" delay={1.5} radius={3} />
                <ColorCycleParticle cx="300" cy="500" delay={0.8} radius={2} />
                <ColorCycleParticle cx="600" cy="510" delay={2} radius={2.5} />
                <ColorCycleParticle cx="450" cy="90" delay={0.3} radius={2} />
                <ColorCycleParticle cx="80" cy="250" delay={1.2} radius={1.8} />
                <ColorCycleParticle cx="820" cy="260" delay={1.8} radius={2} />
                <ColorCycleParticle cx="350" cy="80" delay={2.2} radius={1.5} />
                <ColorCycleParticle cx="550" cy="70" delay={2.5} radius={1.8} />

                {/* Oil Lamps with color cycling */}
                <AnimatedOilLamp cx={450} cy={45} r={22} index={0} />
                <AnimatedOilLamp cx={265} cy={105} r={18} index={1} />
                <AnimatedOilLamp cx={635} cy={105} r={18} index={2} />
                <AnimatedOilLamp cx={95} cy={345} r={18} index={3} />
                <AnimatedOilLamp cx={805} cy={345} r={18} index={4} />
                <AnimatedOilLamp cx={165} cy={515} r={16} index={5} />
                <AnimatedOilLamp cx={735} cy={515} r={16} index={6} />
                <AnimatedOilLamp cx={55} cy={135} r={14} index={7} />
                <AnimatedOilLamp cx={845} cy={135} r={14} index={8} />

                {/* Eight Scene Circles */}
                {SCENES.map(scene => (
                    <ThoranaSceneCircle
                        key={scene.id}
                        cx={scene.cx}
                        cy={scene.cy}
                        id={scene.id}
                        imgSrc={imgs[scene.key]}
                        label={scene.label}
                        hueOffset={scene.id * 45}
                    />
                ))}

                {/* ===== CENTRAL BUDDHA FIGURE WITH COLOR CYCLING RINGS ===== */}
                <g>
                    {/* Rotating divine rings with color cycle */}
                    <circle cx="450" cy="245" r="100" fill="none" stroke={currentGold} strokeWidth="1.5" opacity="0.5">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="4s" repeatCount="indefinite" />
                        <animateTransform attributeName="transform" type="rotate" from="0 450 245" to="360 450 245" dur="12s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="450" cy="245" r="90" fill="none" stroke={currentCrimson} strokeWidth="1.2" strokeDasharray="4 8" opacity="0.5">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.crimson.join(";")}`} dur="5s" repeatCount="indefinite" />
                        <animateTransform attributeName="transform" type="rotate" from="360 450 245" to="0 450 245" dur="10s" repeatCount="indefinite" />
                    </circle>

                    {/* Divine aura rings */}
                    <circle cx="450" cy="245" r="82" fill="none" stroke={currentGold} strokeWidth="2.5" filter="url(#strongGlow)">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="450" cy="245" r="74" fill="none" stroke="#ffdf9c" strokeWidth="1" strokeDasharray="6 4">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.amber.join(";")}`} dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="450" cy="245" r="68" fill="#0d0a04" stroke={currentGoldDark} strokeWidth="2">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="3s" repeatCount="indefinite" />
                    </circle>

                    <PulsingColorRing cx={450} cy={245} maxRadius={86} minRadius={76} strokeWidth="1.5" duration="3.5s" colorPalette={COLOR_PALETTES.gold} />
                    <PulsingColorRing cx={450} cy={245} maxRadius={66} minRadius={58} strokeWidth="1.2" duration="2.5s" colorPalette={COLOR_PALETTES.crimson} />

                    {/* Radiant rays with color cycling */}
                    {[...Array(16)].map((_, i) => {
                        const angle = (i * 22.5) * Math.PI / 180;
                        const x1 = 450 + 70 * Math.cos(angle);
                        const y1 = 245 + 70 * Math.sin(angle);
                        const x2 = 450 + 98 * Math.cos(angle);
                        const y2 = 245 + 98 * Math.sin(angle);
                        return (
                            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={currentGold} strokeWidth="1.2" opacity="0.6">
                                <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="3s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                                <animate attributeName="strokeWidth" values="1;2;1" dur="2s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                            </line>
                        );
                    })}

                    {/* Center Buddha Image */}
                    <clipPath id="clip-center">
                        <circle cx="450" cy="245" r="62" />
                    </clipPath>
                    {imgs.center ? (
                        <>
                            <circle
                                cx="450"
                                cy="245"
                                r="64"
                                fill="none"
                                stroke="#ffdf9c"
                                strokeWidth="3"
                                filter="url(#strongGlow)"
                                opacity="0.7"
                            />

                            <image
                                href={imgs.center}
                                x="388"
                                y="183"
                                width="124"
                                height="124"
                                clipPath="url(#clip-center)"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </>
                    ) : (
                        <text x="450" y="252" textAnchor="middle" fontSize="32" fill={currentGold} fontFamily="Georgia,serif">☸</text>
                    )}

                    {/* Lotus seat with pulsing color */}
                    <ellipse cx="450" cy="300" rx="40" ry="11" fill="#8b2a1a" opacity="0.85" filter="url(#glowF)">
                        <animate attributeName="fill" values="#8b2a1a;#c43a2a;#8b2a1a" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="450" cy="297" rx="46" ry="8" fill="#c43a2a" opacity="0.6">
                        <animate attributeName="fill" values="#c43a2a;#e07050;#c43a2a" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="450" cy="295" rx="52" ry="6" fill="none" stroke={currentGold} strokeWidth="1" opacity="0.5">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="2.5s" repeatCount="indefinite" />
                    </ellipse>
                </g>

                {/* Center Label Card with color cycling border */}
                <g>
                    <rect x="365" y="328" width="170" height="58" rx="10" fill="#0d0a04" stroke={currentGold} strokeWidth="1.5" filter="url(#glowF)">
                        <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="450" y="350" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffdf9c" fontFamily="Georgia,serif">✦ මධ්‍යම බුද්ධ රූපය ✦</text>
                    <text x="450" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill={currentGold} fontFamily="Georgia,serif">සම්මා සම්බුද්ධ</text>
                    <text x="450" y="382" textAnchor="middle" fontSize="9" fill="#b87a1a" fontFamily="Georgia,serif">The Enlightened One</text>
                </g>

                {/* Side decorative swirls with color cycling */}
                <path d="M80,180 Q60,200 80,220 Q100,240 80,260" fill="none" stroke={currentGold} strokeWidth="1.2" opacity="0.6">
                    <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="4s" repeatCount="indefinite" />
                </path>
                <path d="M820,180 Q840,200 820,220 Q800,240 820,260" fill="none" stroke={currentGold} strokeWidth="1.2" opacity="0.6">
                    <animate attributeName="stroke" values={`${COLOR_PALETTES.gold.join(";")}`} dur="4s" repeatCount="indefinite" />
                </path>

                {/* Bottom sacred text with color cycle */}
                <text x="450" y="590" textAnchor="middle" fontSize="9" fill="#b87a1a" fontFamily="Georgia,serif" opacity="0.7" letterSpacing="2">
                    <animate attributeName="fill" values={`${COLOR_PALETTES.gold.join(";")}`} dur="8s" repeatCount="indefinite" />
                    ༄ ජාතක කතා චිත්‍ර මණ්ඩලය — Digital Thorana ༄
                </text>
            </svg>

            {/* Interactive hint */}
            <div style={{
                position: "absolute",
                bottom: 12,
                left: 20,
                fontSize: 10,
                color: "#b87a1a",
                fontFamily: "monospace",
                opacity: 0.5,
            }}>
                ✦ hover over scenes to illuminate | colors rotate magically ✦
            </div>
        </div>
    );
}