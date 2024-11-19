import Router from 'next/router';

const AQUA_APP_URL = 'https://itunes.apple.com/kr/app/aquanmanager/id1048325731';

const detectPlatform = (): 'iOS' | 'Android' | null => {
  const userAgent = navigator.userAgent;
  if (/iPhone|iPad|iPod|Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
    return 'iOS';
  }
  if (/Android/i.test(userAgent)) {
    return 'Android';
  }
  return null;
};

const redirectToUrl = (url: string) => {
  window.location.href = url;
};

const checkInstall = (iosUrl: string) => {
  const heartbeat = window.setInterval(() => {
    if (document.hidden) {
      clearInterval(heartbeat);
    }
  }, 200);

  window.setTimeout(() => {
    redirectToUrl(AQUA_APP_URL);
  }, 3000);

  redirectToUrl(iosUrl);
};

const startPlayer = async () => {
  const platform = detectPlatform();

  if (!platform) {
    alert('Unsupported platform');
    return;
  }

  try {
    const response = await fetch(`/api/player?mtype=${platform}`);
    const { redirectUrl, error }: { redirectUrl?: string; error?: string } = await response.json();

    if (response.ok && redirectUrl) {
      platform === 'iOS' ? checkInstall(redirectUrl) : Router.push(redirectUrl);
    } else {
      console.error('Error:', error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error starting player:', error);
  }
};

const PlayerPage: React.FC = () => (
  <div>
    <h3>AquaNManager Sample</h3>
    <hr />
    <button onClick={startPlayer}>Play</button>
  </div>
);

export default PlayerPage;
