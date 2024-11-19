import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { mtype } = req.query;

  const OLD_NURSE_ENC = "jxxiGvFkip86J7pxfiiiLqpUXjs+s88Zvw1res07YI3QYUrOkJf6+ocza2pclMDl+n+b4XDuAq3+q5pL1JA/fbhf+iny1fmEsLhHH1+zAgFnViTSwDFPlKU9t7141yaUyG+uhXfJjTX7vzqXeBPY/XZtssUiPweJ93aE46ulzYU1Ip2gSuVK3euWCpImNENR4Mid/IME2HHE88cPH82HmW1O4nTE+Lu5WRm5UEP6whboKo52CWd43dyYYxxZoIUu1Ewu8Ovqku3tYLF+SBdBk4boIEtRFZag39RbrDjvXetPoRcwS9vOsyFEOUFm+gwLasggg03CjFD0tVsL0Ex3egzPdnsgyc9X+XvhzIDOlIMmNH5gvgE5TkpQ1Ua/HWbLu0bRTDyy0IH7zZ8R0kerDz2DxrdP59tjzruwQQQHCaDqB/8rUA19r13R8bW4QLx2B4OqiH5Fw/v57bLH+31Sg+ZQbi7eNLIIX70yro+iXbXFx7tGADBoj0ZTMkeh/11VrryIz0Lnx6kbfVy/lEkaJd5d/jhqgvoLReIIw6XR9zi+TjImn4hB9DketVGdw5UzMDI0cGcvMDEubTR2"
  const iosUrl = `cdnmp://cddr_dnp/webstream?param=${OLD_NURSE_ENC}`;
  const androidUrl = `intent://cddr_dnp/webstream?param=${OLD_NURSE_ENC}#Intent;scheme=cdnmp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.cdn.aquanmanager;end`;
  
  if (mtype === "iOS") {
    res.json({ redirectUrl: iosUrl });
  } else {
    res.json({ redirectUrl: androidUrl });
  }
  
}
