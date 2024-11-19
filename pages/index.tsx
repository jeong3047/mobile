// pages/player.tsx
import { useEffect } from 'react';
import Router from 'next/router';

const detectPlatform = (): 'iOS' | 'Android' | null => {
  if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1) {
    return 'iOS';
  } else if (/Android/i.test(navigator.userAgent)) {
    return 'Android';
  }
  return null;
};

const startPlayer = async () => {
  const mtype = detectPlatform();
  if (!mtype) {
    alert('Unsupported platform');
    return;
  }

  try {
    const response = await fetch(`/api/player?mtype=${mtype}`);
    const data: { redirectUrl?: string; error?: string } = await response.json();

    if (response.ok && data.redirectUrl) {
      if (mtype === 'iOS') {
        checkInstall(data.redirectUrl);
      } else {
        Router.push(data.redirectUrl);
      }
    } else {
      console.error('Error:', data.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error starting player:', error);
  }
};

const checkInstall = (iosUrl: string) => {
  let heartbeat: number; // 브라우저 환경에서는 number 반환
  let timer: number;

  const clearTimers = () => {
    clearInterval(heartbeat); // number를 인수로 받음
    clearTimeout(timer);
  };

  const intervalHeartbeat = () => {
    if (document.hidden) {
      clearTimers();
    }
  };

  // window.setInterval과 window.setTimeout을 사용해 브라우저 반환 타입 명시
  heartbeat = window.setInterval(intervalHeartbeat, 200);

  timer = window.setTimeout(() => {
    window.location.href = 'https://itunes.apple.com/kr/app/aquanmanager/id1048325731';
  }, 3000);

  window.location.href = iosUrl;
};

const PlayerPage: React.FC = () => {
  return (
    <div>
      <h3>AquaNManager Sample</h3>
      <hr />
      <ul>
        <li>
          <button onClick={startPlayer}>Play</button>
        </li>
      </ul>
    </div>
  );
};

export default PlayerPage;
