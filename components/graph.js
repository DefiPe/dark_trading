// TradingViewWidget.jsx

import styles from '@/styles/graph.module.css'

// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function Graph() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_0b758') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: `BTCUSDT`,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "3",
            locale: "usa",
            enable_publishing: false,
            gridColor: "rgba(255, 255, 255, 0.06)",
            container_id: "tradingview_0b758"
          });
        }
      }
    },
    []
  );
  return (
    <div className={styles.tradingviewContainer}>
     
        <div id='tradingview_0b758' style={{height:"100%", border:"none"}}/>
     

    </div>
  );
}
