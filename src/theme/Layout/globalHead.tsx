import Head from '@docusaurus/Head';

export default function GlobalHead() {
    return (
      <Head>
        <script>{`
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(["setDoNotTrack", true]);
          _paq.push(["disableCookies"]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://analytics.apache.org/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '75']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}</script>
      </Head>
    );
}
