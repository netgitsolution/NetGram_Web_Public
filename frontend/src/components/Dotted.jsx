import React, { useRef, useEffect } from "react";

const Dotted = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Create nodes (particles) representing services or digital elements
        const nodes = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1.5,
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
        }));

        function drawConnections() {
            nodes.forEach((p1, idx) => {
                for (let j = idx + 1; j < nodes.length; j++) {
                    const p2 = nodes[j];
                    const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 200, 255, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });
        }

        function drawNodes() {
            nodes.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0,255,200,0.8)";
                ctx.shadowColor = "rgba(0,255,200,0.4)";
                ctx.shadowBlur = 6;
                ctx.fill();
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Background gradient for tech/modern look
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "#0f172a"); // dark-blue
            gradient.addColorStop(1, "#1e293b"); // slightly lighter
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Move nodes
            nodes.forEach((p) => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > width) p.dx *= -1;
                if (p.y < 0 || p.y > height) p.dy *= -1;
            });

            drawConnections();
            drawNodes();
            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default Dotted;