
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Segment = {
  id: string;
  name: string;
  color: string;
  position: { x: number, y: number, z: number };
  size: number;
};

const segments: Segment[] = [
  { id: 'tech-savvy', name: 'Tech-Savvy', color: '#3391f7', position: { x: 0, y: 0.8, z: 0 }, size: 1 },
  { id: 'conservative', name: 'Conservative', color: '#6b7280', position: { x: 0.7, y: 0.4, z: 0 }, size: 0.9 },
  { id: 'multichannel', name: 'Multichannel', color: '#10b981', position: { x: 0.7, y: -0.4, z: 0 }, size: 0.85 },
  { id: 'value-seekers', name: 'Value Seekers', color: '#f59e0b', position: { x: 0, y: -0.8, z: 0 }, size: 0.95 },
  { id: 'luxury', name: 'Luxury', color: '#8b5cf6', position: { x: -0.7, y: -0.4, z: 0 }, size: 0.8 },
  { id: 'occasional', name: 'Occasional', color: '#f97316', position: { x: -0.7, y: 0.4, z: 0 }, size: 0.75 },
  { id: 'loyal', name: 'Loyal', color: '#ec4899', position: { x: 0, y: 0, z: 0.5 }, size: 1.1 },
  { id: 'at-risk', name: 'At-Risk', color: '#ef4444', position: { x: 0, y: 0, z: -0.5 }, size: 0.7 },
];

const OctagonView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSegmentClick = (segmentId: string) => {
    navigate(`/profiles/${segmentId}`);
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Render function
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw segments
      const sortedSegments = [...segments].sort((a, b) => a.position.z - b.position.z);
      
      sortedSegments.forEach(segment => {
        const x = centerX + segment.position.x * 200 * Math.cos(rotation.y * 0.01);
        const y = centerY + segment.position.y * 200;
        const z = segment.position.z * Math.sin(rotation.y * 0.01);
        
        // Size adjusted for z-position for 3D effect
        const sizeModifier = 1 + z * 0.5;
        const finalSize = segment.size * 80 * sizeModifier;
        
        // Draw segment node
        ctx.beginPath();
        ctx.arc(x, y, finalSize, 0, Math.PI * 2);
        
        // Fill based on hover state
        const isHovered = hoveredSegment === segment.id;
        const alpha = isHovered ? '1' : '0.8';
        ctx.fillStyle = segment.color + alpha;
        ctx.fill();
        
        // Add glow effect on hover
        if (isHovered) {
          ctx.shadowColor = segment.color;
          ctx.shadowBlur = 15;
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'white';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        
        // Draw segment name
        ctx.fillStyle = '#ffffff';
        ctx.font = isHovered ? 'bold 14px Inter' : '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segment.name, x, y);
        
        // Create hit area for hover detection
        const hitArea = new Path2D();
        hitArea.arc(x, y, finalSize, 0, Math.PI * 2);
      });
    };
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update rotation based on mouse position
      setRotation({
        x: rotation.x,
        y: (x - canvas.width / 2) * 0.05
      });
      
      // Hit testing
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      let found = false;
      for (const segment of segments) {
        const segX = centerX + segment.position.x * 200 * Math.cos(rotation.y * 0.01);
        const segY = centerY + segment.position.y * 200;
        const z = segment.position.z * Math.sin(rotation.y * 0.01);
        
        const sizeModifier = 1 + z * 0.5;
        const finalSize = segment.size * 80 * sizeModifier;
        
        const distance = Math.sqrt(Math.pow(x - segX, 2) + Math.pow(y - segY, 2));
        
        if (distance <= finalSize) {
          setHoveredSegment(segment.id);
          canvas.style.cursor = 'pointer';
          found = true;
          break;
        }
      }
      
      if (!found) {
        setHoveredSegment(null);
        canvas.style.cursor = 'default';
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      if (hoveredSegment) {
        handleSegmentClick(hoveredSegment);
      }
    };
    
    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      render();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [rotation, hoveredSegment, navigate]);
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute bottom-6 left-0 right-0 text-center text-white text-opacity-80 text-sm">
        Click on a segment to explore more
      </div>
    </div>
  );
};

export default OctagonView;
