import { useEffect, useRef } from 'react';
import './UnityGame.css';

interface UnityGameProps {
  loaderUrl?: string;
  dataUrl?: string;
  frameworkUrl?: string;
  codeUrl?: string;
  gameTitle?: string;
}

const UnityGame = ({
  loaderUrl = '',
  dataUrl = '',
  frameworkUrl = '',
  codeUrl = '',
  gameTitle = 'Unity Game'
}: UnityGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const unityInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Check if Unity loader script exists
    const unityLoaderScript = document.querySelector('script#unity-loader');
    
    if (!unityLoaderScript && window.location.hostname !== 'localhost') {
      // This is a placeholder. In production, you would load your actual Unity WebGL build
      console.log('Unity WebGL build not found. This is a placeholder.');
      
      // Display placeholder message in canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#282c34';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.font = '24px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('Unity Game Placeholder', canvas.width / 2, canvas.height / 2 - 50);
          
          ctx.font = '16px Arial';
          ctx.fillText('Replace with your actual Unity WebGL build', canvas.width / 2, canvas.height / 2);
          ctx.fillText('See instructions in the README.md file', canvas.width / 2, canvas.height / 2 + 30);
        }
      }
      return;
    }

    // In a real implementation, you would load your Unity WebGL build here
    // This is just a placeholder for demonstration purposes
    if (window.location.hostname === 'localhost') {
      // Simulate loading progress for demonstration
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          if (loadingBarRef.current) {
            loadingBarRef.current.style.display = 'none';
          }
          
          // Display placeholder message in canvas after "loading"
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#282c34';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              ctx.font = '24px Arial';
              ctx.fillStyle = 'white';
              ctx.textAlign = 'center';
              ctx.fillText('Unity Game Would Load Here', canvas.width / 2, canvas.height / 2 - 50);
              
              ctx.font = '16px Arial';
              ctx.fillText('This is a placeholder for your Unity WebGL build', canvas.width / 2, canvas.height / 2);
              ctx.fillText('Follow the instructions to integrate your actual game', canvas.width / 2, canvas.height / 2 + 30);
            }
          }
        }
      }, 100);
    }

    return () => {
      // Cleanup function
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit();
      }
    };
  }, [loaderUrl, dataUrl, frameworkUrl, codeUrl]);

  return (
    <div className="unity-container">
      <div className="unity-header">
        <h2>{gameTitle}</h2>
      </div>
      <div className="unity-game">
        <canvas ref={canvasRef} width="960" height="600" />
        <div ref={loadingBarRef} className="unity-loading-bar">
          <div className="unity-progress-bar">
            <div ref={progressRef} className="unity-progress"></div>
          </div>
          <div className="unity-progress-text">Loading...</div>
        </div>
      </div>
      <div className="unity-footer">
        <div className="unity-fullscreen-button" onClick={() => {
          if (unityInstanceRef.current) {
            unityInstanceRef.current.SetFullscreen(1);
          } else {
            const canvas = canvasRef.current;
            if (canvas && canvas.requestFullscreen) {
              canvas.requestFullscreen();
            }
          }
        }}>
          Fullscreen
        </div>
      </div>
    </div>
  );
};

export default UnityGame;
