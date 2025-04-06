import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ParticleContainer = styled.div`
  position: relative;
  height: 120px;
  margin-bottom: 2rem;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HiddenText = styled.h2`
  visibility: hidden;
  position: absolute;
  font-size: 2rem;
  width: 100%;
  text-align: left;
  margin: 0;
`;

const ParticleText = ({ text, color }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current || !textRef.current) return;

        const container = containerRef.current;

        let scene, camera, renderer, particles, geometry, material;
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        const particlePoints = [];

        const init = () => {
            // Create scene
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 100;

            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                alpha: true,
                antialias: true
            });
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);

            // Create text texture
            const textElement = textRef.current;
            const { width, height } = container.getBoundingClientRect();

            // Create canvas to draw text
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // Sample text from DOM element
            const computedStyle = window.getComputedStyle(textElement);
            ctx.font = computedStyle.font;
            ctx.fillStyle = color || '#ffffff';
            ctx.textBaseline = 'top';
            ctx.fillText(text, 0, 0);

            // Get pixel data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            // Sample pixels to create particles
            for (let y = 0; y < canvas.height; y += 3) {
                for (let x = 0; x < canvas.width; x += 3) {
                    const index = (y * canvas.width + x) * 4;
                    const alpha = pixels[index + 3];

                    if (alpha > 0) {
                        // Convert from canvas coordinates to 3D coordinates
                        const normalizedX = (x / canvas.width) * 2 - 1;
                        const normalizedY = -(y / canvas.height) * 2 + 1;

                        particlePoints.push(new THREE.Vector3(normalizedX * 50, normalizedY * 25, 0));
                    }
                }
            }

            // Create particles
            geometry = new THREE.BufferGeometry().setFromPoints(particlePoints);
            material = new THREE.PointsMaterial({
                color: color || 0xffffff,
                size: 1,
                opacity: 0.8,
                transparent: true
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            document.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);

            // Initial animation
            animateIn();
        };

        const onMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.05;
            mouseY = (event.clientY - windowHalfY) * 0.05;
        };

        const onWindowResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        };

        // Fix: Use a different animation approach that doesn't create thousands of tweens
        const animateIn = () => {
            // Create a temporary array to hold initial random z positions
            const tempPositions = [];
            const positions = geometry.attributes.position.array;

            // Initialize with random z positions
            for (let i = 0; i < positions.length; i += 3) {
                tempPositions.push({
                    x: positions[i],
                    y: positions[i + 1],
                    z: Math.random() * 100 - 50
                });
            }

            // Update geometry with starting positions
            for (let i = 0; i < tempPositions.length; i++) {
                positions[i * 3] = tempPositions[i].x;
                positions[i * 3 + 1] = tempPositions[i].y;
                positions[i * 3 + 2] = tempPositions[i].z;
            }
            geometry.attributes.position.needsUpdate = true;

            // Animation progress object - single tween instead of thousands
            const animProgress = { value: 0 };

            gsap.to(animProgress, {
                value: 1,
                duration: 1.5,
                ease: "power3.out",
                onUpdate: function () {
                    // Interpolate all particles based on progress
                    const progress = this.targets()[0].value;

                    for (let i = 0; i < tempPositions.length; i++) {
                        const particle = tempPositions[i];
                        // Linear interpolation from random z to 0
                        positions[i * 3 + 2] = particle.z * (1 - progress);
                    }

                    geometry.attributes.position.needsUpdate = true;
                }
            });
        };

        const animateOut = () => {
            const positions = geometry.attributes.position.array;

            // Animation progress object - single tween
            const animProgress = { value: 0 };
            const targetPositions = [];

            // Store current positions and generate random targets
            for (let i = 0; i < positions.length; i += 3) {
                targetPositions.push({
                    startX: positions[i],
                    startY: positions[i + 1],
                    startZ: positions[i + 2],
                    endX: positions[i] + (Math.random() * 100 - 50),
                    endY: positions[i + 1] + (Math.random() * 100 - 50),
                    endZ: Math.random() * 100 - 50
                });
            }

            gsap.to(animProgress, {
                value: 1,
                duration: 1.5,
                ease: "power3.in",
                onUpdate: function () {
                    const progress = this.targets()[0].value;

                    for (let i = 0; i < targetPositions.length; i++) {
                        const target = targetPositions[i];
                        positions[i * 3] = target.startX + (target.endX - target.startX) * progress;
                        positions[i * 3 + 1] = target.startY + (target.endY - target.startY) * progress;
                        positions[i * 3 + 2] = target.startZ + (target.endZ - target.startZ) * progress;
                    }

                    geometry.attributes.position.needsUpdate = true;
                },
                onComplete: () => {
                    setTimeout(animateIn, 1000);
                }
            });
        };

        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.0003;
            particles.rotation.y += 0.0005;

            // Subtle movement based on mouse position
            if (particles) {
                particles.rotation.x += (mouseY - particles.rotation.x) * 0.01;
                particles.rotation.y += (mouseX - particles.rotation.y) * 0.01;
            }

            renderer.render(scene, camera);
        };

        init();
        animate();

        // Interactive explosion effect on hover
        container.addEventListener('mouseenter', () => {
            animateOut();
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            container?.removeEventListener('mouseenter', animateOut);
            scene.remove(particles);
            geometry.dispose();
            material.dispose();
        };
    }, [text, color]);

    return (
        <ParticleContainer ref={containerRef}>
            <HiddenText ref={textRef}>{text}</HiddenText>
            <CanvasContainer>
                <canvas ref={canvasRef}></canvas>
            </CanvasContainer>
        </ParticleContainer>
    );
};

export default ParticleText;
