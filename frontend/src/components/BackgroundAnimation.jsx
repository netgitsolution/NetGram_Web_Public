import React, { useRef, useEffect } from "react";

const services = [
    "Web Development",
    "Content Marketing",
    "Media Creation",
    "WordPress",
    "Shopify",
];

// Different fonts (15+)
const fonts = [
    "Arial Black",
    "Courier New",
    "Georgia",
    "Verdana",
    "Impact",
    "Lucida Console",
    "Trebuchet MS",
    "Times New Roman",
    "Comic Sans MS",
    "Tahoma",
    "Gill Sans",
    "Franklin Gothic Medium",
    "Palatino Linotype",
    "Candara",
    "Segoe UI",
];

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles = [];

        // Offscreen canvas
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        offCanvas.width = width;
        offCanvas.height = height;

        // Get text pixel positions
        const getTextPositions = (text, font) => {
            const fontSize = Math.min(width, height) / 8;
            offCtx.clearRect(0, 0, width, height);
            offCtx.font = `${fontSize}px ${font}`;
            offCtx.textAlign = "center";
            offCtx.textBaseline = "middle";
            offCtx.fillStyle = "white";
            offCtx.fillText(text, width / 2, height / 3.2);

            const imageData = offCtx.getImageData(0, 0, width, height).data;
            const points = [];
            for (let y = 0; y < height; y += 6) {
                for (let x = 0; x < width; x += 6) {
                    const alpha = imageData[(y * width + x) * 4 + 3];
                    if (alpha > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        let targetPoints = [];
        let currentServiceIndex = 0;
        let currentFont = fonts[Math.floor(Math.random() * fonts.length)];

        const setTargetPoints = (text) => {
            targetPoints = getTextPositions(text, currentFont);
            while (particles.length < targetPoints.length) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: 0,
                    vy: 0,
                    r: 1.3,
                });
            }
        };

        setTargetPoints(services[currentServiceIndex]);

        // Main animation loop
        let animationId;
        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);

            // Update particles to form text
            particles.forEach((p, i) => {
                const target = targetPoints[i % targetPoints.length];
                const dx = target.x - p.x;
                const dy = target.y - p.y;

                p.vx += dx * 0.01;
                p.vy += dy * 0.01;

                p.vx *= 0.85;
                p.vy *= 0.85;

                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0,255,200,0.8)"; // neon green
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        // Change service text every 5s with new random font
        const interval = setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % services.length;
            currentFont = fonts[Math.floor(Math.random() * fonts.length)];
            setTargetPoints(services[currentServiceIndex]);
        }, 5000);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            offCanvas.width = width;
            offCanvas.height = height;
            setTargetPoints(services[currentServiceIndex]);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default BackgroundAnimation;