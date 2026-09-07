export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

/**
 * Encapsulated theme hydration script to prevent flash of unstyled content (FOUC).
 * Synchronizes client documentElement class with localStorage or system dark mode preference
 * before first paint, without leaking raw browser script strings into the root layout.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: THEME_INIT_SCRIPT,
      }}
    />
  );
}

export default ThemeScript;
