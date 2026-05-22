export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;

/* ──────────────────────────────────────────────────────────────
   Translation dictionary
   Namespace convention:  page-area.key
   ────────────────────────────────────────────────────────────── */
export const ui = {
  en: {
    // ── Common ────────────────────────────────────────────────
    'common.siteName': 'I Can See You',
    'common.brand': 'I can see you',
    'common.backToHome': 'Back to Home',
    'common.loading': 'Loading…',
    'common.retry': 'Retry demo',
    'common.share': 'Share',
    'common.shareSharing': 'Sharing…',
    'common.shareShared': 'Shared!',
    'common.shareError': 'Error sharing',
    'common.seconds': 'Seconds',
    'common.stop': 'Stop',
    'common.goBackHome': 'Go back home',
    'common.authorize': 'Authorize now',
    'common.authorizing': 'Requesting…',
    'common.authorized': 'Authorized',
    'common.continue': 'Continue',
    'common.continueAnyway': 'Continue anyway',

    // ── Navigation ──────────────────────────────────────────────
    'nav.main': 'Main navigation',
    'nav.footer': 'Footer navigation',
    'nav.signals': 'Signals',
    'nav.demo': 'Demo',
    'nav.privacy': 'Privacy',
    'nav.manual': 'Manual',
    'nav.githubAria': 'View source on GitHub',
    'nav.switchToLight': 'Let there be light',
    'nav.switchToDark': 'Dim the lights',
    'nav.toggleDark': 'Toggle dark mode',

    // ── Landing ─────────────────────────────────────────────────
    'landing.heroTagline': "60 seconds. That's all it takes. Try not to get distracted.",
    'landing.heroDescription':
      'A free browser activity detector that shows exactly which signals your browser reveals when you lose focus: tab switches, window blur, fullscreen exits, and more. No camera. No server. 100% local.',
    'landing.cta': "Let's try it out!",
    'landing.coverage.detectTitle': 'What I can detect',
    'landing.coverage.detect1': 'Tab visibility changes via the Page Visibility API.',
    'landing.coverage.detect2': 'Window focus loss and recovery events.',
    'landing.coverage.detect3': 'Fullscreen exit: detects when you leave full-screen mode.',
    'landing.coverage.detect4': 'Mouse leave: your cursor leaving the browser viewport.',
    'landing.coverage.detect5': 'Paste events during the detection session.',
    'landing.coverage.detect6': 'DevTools heuristic: best-effort check for open developer tools.',
    'landing.coverage.cannotTitle': "What I can't detect",
    'landing.coverage.cannot1': 'Applications open outside the browser.',
    'landing.coverage.cannot2': 'Exact content of other system windows.',
    'landing.coverage.cannot3': 'Your camera, microphone, or screen recording.',
    'landing.coverage.cannot4': 'What you ate for breakfast this morning.',
    'landing.coverage.cannot5': "Whether you're actually reading this or just scrolling.",
    'landing.coverage.cannot6': "Your excuse for switching tabs. (But I noticed.)",
    'landing.coverage.srHeading': 'Browser signal detection coverage',

    // ── Demo ────────────────────────────────────────────────────
    'demo.title': 'Live Detection Demo | I Can See You',
    'demo.description':
      'Start a 60-second browser distraction detection session. Watch in real time as browser signals catch tab switches, focus loss, fullscreen exits, and mouse leave events.',
    'demo.footerNav': 'Demo links',
    'demo.compiling': 'Compiling results…',
    'demo.sessionStatus': 'Session status',
    'demo.inFocus': 'IN FOCUS',
    'demo.outOfFocus': 'OUT OF FOCUS',
    'demo.eventDetected': 'EVENT DETECTED',
    'demo.incidents': 'Incidents',
    'demo.dialogQuotes': '\u201C{message}\u201D',

    // ── Results ───────────────────────────────────────────────────
    'results.title': 'Detection Results | I Can See You',
    'results.description':
      'Your browser distraction detection results — total incidents, distracted time, and attention score. See exactly which browser signals caught you.',
    'results.noResults': 'No results',
    'results.noResultsBody':
      "It looks like you haven't completed a detection session yet. Let's try again.",
    'results.tryDetection': 'Try detection',
    'results.yourResults': 'Your results',
    'results.subtitle':
      'The sketchbook stopped watching you (for now). Here\'s a summary of your attention during the session.',
    'results.distractionsLabel': 'Distractions',
    'results.distractionsDesc': 'Times you switched tabs or windows.',
    'results.durationLabel': 'Duration',
    'results.durationDesc': 'Total time spent out of focus during the session.',
    'results.scoreLabel': 'Attention Score',
    'results.scoreExcellent': 'Excellent focus. Almost caught you slipping.',
    'results.scoreGood': 'Not bad, but we know you can do better.',
    'results.scoreOkay': 'Hmm... there\'s room for improvement.',
    'results.scorePoor': 'We lost sight of you quite a bit.',
    'results.timelineTitle': 'Session timeline',
    'results.timelineStart': '0:00',
    'results.shareTitle': 'I Can See You — My Attention Score',
    'results.shareText': 'I scored {score}% attention. Can you do better?',
    'results.transparencyTitle': 'Technical transparency',
    'results.transparencyText':
      'This experiment uses native browser signals to determine your attention level, without turning on your camera or invading your actual privacy.',
    'results.transparencyFooter':
      'No behavioral data is stored on our servers. Everything is processed locally on this device and cleared on close.',
    'results.cardHeader': 'I CAN SEE YOU',
    'results.cardSubheader': 'Session Summary',
    'results.cardScoreLabel': 'Attention Score',
    'results.cardDistractions': 'Distractions',
    'results.cardTimeAway': 'Time Away',
    'results.cardSessionTime': 'Session Time',
    'results.cardFooterLeft': 'Browser Signals Detector',
    'results.cardFooterRight': 'icanseeyou.dev',
    'results.cardNoData': 'No session data',
    'results.cardCompleteFirst': 'Complete a detection session first',

    // ── Privacy ───────────────────────────────────────────────────
    'privacy.title': 'Privacy & Transparency | I Can See You',
    'privacy.description':
      'What this browser distraction detector actually detects, what it can\'t, and how your data stays local. Full transparency on Page Visibility API, focus events, and other browser signals.',
    'privacy.keywords':
      'focus browser detector privacy, browser signals transparency, local detection, no camera proctoring, privacy first demo',
    'privacy.heroHeading': 'Privacy (or lack thereof)',
    'privacy.heroSubtitle':
      "Don't worry. I am watching you, but my sketchbook is magically erased when you leave. Everything is temporary, just like my attention.",
    'privacy.trackTitle': 'What I Track',
    'privacy.trackDesc':
      'Your browser tells me more than you think. Here are the signals I actually watch.',
    'privacy.track1': 'Tab switches via the Page Visibility API.',
    'privacy.track2': 'When you lose or regain window focus.',
    'privacy.track3': 'Exiting fullscreen mode.',
    'privacy.track4': 'Your cursor leaving the browser viewport.',
    'privacy.track5': 'Paste events during the session.',
    'privacy.track6': 'Developer tools (best effort heuristic).',
    'privacy.zeroServersTitle': 'Zero Servers',
    'privacy.zeroServersDesc':
      "Everything stays between you and your browser. I don't have a server, a database, or a memory.",
    'privacy.zeroServers1': 'Nothing is sent to any server.',
    'privacy.zeroServers2': 'All detection happens locally in your browser.',
    'privacy.zeroServers3': 'Session data is cleared when you close the tab.',
    'privacy.zeroServers4': 'No tracking cookies whatsoever.',
    'privacy.zeroServers5': "I don't have a server. I don't even have a database.",
    'privacy.dontSeeTitle': "What I Don't See",
    'privacy.dontSeeDesc':
      "I'm not omniscient. There are hard limits to what a web page can observe, and I respect all of them.",
    'privacy.dontSee1': 'Applications running outside your browser.',
    'privacy.dontSee2': 'Content of other windows, tabs, or your clipboard history.',
    'privacy.dontSee3': 'Your camera or microphone — I never ask for permission.',
    'privacy.dontSee4': "Keyboard input when you're typing in another app.",
    'privacy.dontSee5': 'Obviously, I can\'t see you when you are taking a bath.',
    'privacy.dontSee6': "Whether you actually read the terms of service. (Nobody does.)",
    'privacy.dontSee7': 'Your inner monologue. Yet.',
    'privacy.howWorksTitle': 'How It Works',
    'privacy.howWorksDesc':
      'No magic, just standard browser APIs doing their job. Here\'s the technical breakdown.',
    'privacy.howWorks1': 'Page Visibility API — detects when you switch tabs.',
    'privacy.howWorks2': 'Focus Events — registers when the window gains or loses focus.',
    'privacy.howWorks3': 'Fullscreen API — notices when you exit fullscreen.',
    'privacy.howWorks4': 'Mouse Events — tracks when your cursor leaves the viewport.',
    'privacy.howWorks5': 'Paste Events — registers paste actions during the session.',
    'privacy.controlTitle': 'You Control It',
    'privacy.controlDesc':
      "You're in charge. Close the tab and I'm amnesiac. Your privacy is literally one click away.",
    'privacy.control1': 'No camera or microphone access required.',
    'privacy.control2': 'All detection is passive — no permissions needed to start.',
    'privacy.control3': 'Optional explicit permissions available on the Signals page.',
    'privacy.control4': 'Close the tab and everything disappears instantly.',
    'privacy.control5': 'You can stop the demo anytime with one click.',
    'privacy.controlSignalsLink': 'Signals page',

    // ── Manual ────────────────────────────────────────────────────
    'manual.title': 'User Manual | I Can See You',
    'manual.description':
      'A step-by-step user manual for I Can See You, the browser distraction detector. Learn how the detection works, what signals are tracked, and tips for the demo session.',
    'manual.heroHeading': 'User Manual',
    'manual.heroSubtitle':
      "Everything you need to know before the sketchbook starts watching. Spoiler: it's just your browser talking.",
    'manual.howWorksTitle': 'How It Works',
    'manual.howWorksDesc':
      'No magic, just standard browser APIs doing their job. Here\'s what the sketchbook actually listens to.',
    'manual.apiVisibility': 'Page Visibility API',
    'manual.apiVisibilityDesc':
      'Detects when you switch tabs or minimize the browser. If the document is hidden, we know you looked away.',
    'manual.apiFocus': 'Focus Events',
    'manual.apiFocusDesc':
      'Monitors when the window loses or gains focus. Clicking on another application or monitor triggers this.',
    'manual.apiFullscreen': 'Fullscreen API',
    'manual.apiFullscreenDesc': 'Notices when you exit fullscreen mode during the session.',
    'manual.apiMouse': 'Mouse Events',
    'manual.apiMouseDesc': 'Tracks when your cursor leaves the browser viewport.',
    'manual.apiPaste': 'Paste Events',
    'manual.apiPasteDesc': 'Registers paste actions while the session is running.',
    'manual.apiDevtools': 'DevTools Heuristic',
    'manual.apiDevtoolsDesc':
      "A best-effort size-based check to guess if developer tools are open. Low confidence, high curiosity.",
    'manual.tipsTitle': 'Tips to Not Get Caught',
    'manual.tipsDesc':
      "If you're trying to ace the demo without raising any flags, here's your cheat sheet.",
    'manual.tip1': 'Keep the browser window focused at all times.',
    'manual.tip2': 'Do not switch tabs while the session is active.',
    'manual.tip3': 'Use a separate device if you need to look something up.',
    'manual.tip4':
      'Enter fullscreen before the session starts if you want fewer edge cases.',
    'manual.tip5': 'Close your eyes.',
    'manual.tip5Sub': '(Does not work. We still see the browser state.)',

    // ── Signals / Permissions ───────────────────────────────────
    'signals.title': 'Browser Signal Permissions | I Can See You',
    'signals.description':
      'Grant optional browser permissions for enhanced distraction detection — clipboard read and multi-screen detection. See which signals are active, partial, or unavailable in your browser.',
    'signals.keywords':
      'focus browser detector permissions, browser signal permissions, clipboard read permission, multi-screen detection, window management api',
    'signals.heroHeading': "Something's missing here…",
    'signals.heroDesc':
      'These signals need explicit permission. You can grant them now or continue without them — the demo works great either way.',
    'signals.footerNav': 'Support page links',
    'signals.loading': 'Checking permissions…',
    'signals.clipboardLabel': 'Clipboard read',
    'signals.clipboardDesc':
      'Detects whether you paste external content during the session.',
    'signals.multiScreenLabel': 'Multi-screen',
    'signals.multiScreenDesc':
      'Detects whether you use more than one screen at once.',
    'signals.badgeActive': 'ACTIVE',
    'signals.badgePartial': 'PARTIAL',
    'signals.badgeUnavailable': 'UNAVAILABLE',
    'signals.compatNote':
      "Even if some signals aren't available in your browser (common in Firefox and Safari), the demo will still detect tab switches, focus loss, fullscreen exit, and mouse leaving — so the core experience will be great.",

    // ── 404 ─────────────────────────────────────────────────────
    '404.title': 'Page Not Found | I Can See You',
    '404.description':
      "This page doesn't exist. Head back to I Can See You to test your browser distraction signals.",
    '404.mascotMessage': 'I looked everywhere, but this page is invisible.',
    '404.heading': '404',
    '404.body': "This page went off the radar. Even my eyes can't detect it.",

    // ── Mascot messages ─────────────────────────────────────────
    'mascot.default': 'All good… for now.',
    'mascot.eyesAria': 'Eyes Watching',
    'mascot.eyesStaticAria': 'Observing eyes',

    // visibility
    'mascot.visibility.1': 'Hey… that tab went on a little trip.',
    'mascot.visibility.2': 'Back already—or was that another tab pretending to care?',
    'mascot.visibility.3': "The page hid. My eyebrows didn't.",
    'mascot.visibility.4': 'Multitasking, or evasive maneuvering? Tomato, suspicious tomato.',

    // blur
    'mascot.blur.1': 'Tiny distraction detected. I saw everything.',
    'mascot.blur.2': 'Focus wandered off. Should I file a missing-person report?',
    'mascot.blur.3': 'You were late coming back—busy being mysterious?',
    'mascot.blur.4': 'Window lost focus; my notebook kept score anyway.',

    // fullscreen
    'mascot.fullscreen.1': "Fullscreen exit… already bored?",
    'mascot.fullscreen.2': "Couldn't commit to the big picture for long, huh?",
    'mascot.fullscreen.3': 'Shrinking back to normal—stage fright or strategy?',
    'mascot.fullscreen.4': 'The cinematic experience ended sooner than the trailer promised.',

    // mouseleave
    'mascot.mouseleave.1': 'Your mouse escaped the notebook.',
    'mascot.mouseleave.2': 'Cursor left the crime scene. Convenient.',
    'mascot.mouseleave.3': 'Pointer off-stage again—rehearsing your alibi?',
    'mascot.mouseleave.4': 'The mouse slipped away like it owed me money.',

    // paste
    'mascot.paste.1': 'Paste detected. Creative cheating?',
    'mascot.paste.2': 'Ctrl+V with confidence. Brave.',
    'mascot.paste.3': "That's a lot of clipboard ambition for one sitting.",
    'mascot.paste.4': 'Imported wisdom—or wholesale borrowing?',

    // devtools
    'mascot.devtools.1': 'Hmm… curious eyes behind the curtain?',
    'mascot.devtools.2': "Inspecting me? I'm touched. Also filing that away.",
    'mascot.devtools.3': 'DevTools open—doing homework or hunting bugs in my ego?',
    'mascot.devtools.4': 'Peeking under the hood. Cute. Obvious, but cute.',

    // score messages (static mascot)
    'mascot.score.100':
      "Perfect focus. Or you just didn't touch anything for 60 seconds. Either way, I'm suspicious.",
    'mascot.score.80':
      'So close to perfect! Your browser almost believed you cared.',
    'mascot.score.60': "Not bad. But I saw that tab switch. Don't deny it.",
    'mascot.score.40': 'Half focused, half elsewhere. Classic multitasker energy.',
    'mascot.score.20': 'Were you even in the room? Your browser feels neglected.',
    'mascot.score.0':
      'You started the timer and walked away, didn\'t you? At least close the tab next time.',

    // ── Signal labels ───────────────────────────────────────────
    'signal.visibility': 'Tab hidden',
    'signal.blur': 'Focus lost',
    'signal.fullscreen': 'Fullscreen exit',
    'signal.mouseleave': 'Cursor left',
    'signal.paste': 'Paste',
    'signal.devtools': 'DevTools',
    'signal.description.visibility':
      'Page Visibility API: Detects when you switch to another tab or minimize the window.',
    'signal.description.blur':
      'Focus Events: Registers when the active document loses interaction from your operating system.',
    'signal.description.fullscreen':
      'Fullscreen API: Detects when you exit fullscreen mode.',
    'signal.description.mouseleave':
      'Mouse Leave: Indicates when your cursor leaves the browser viewport.',
    'signal.description.paste':
      'Paste Event: Registers if you paste content during the session.',
    'signal.description.devtools':
      'DevTools Heuristic: Best-effort estimate of whether developer tools are open.',

    // ── SEO / Structured data ───────────────────────────────────
    'seo.indexTitle': 'I Can See You — Browser Activity & Distraction Detector',
    'seo.indexDescription':
      'Focus browser detector that tests which signals expose your distractions. Detect tab switches, focus loss, fullscreen exits, and cursor leaving — 60-second demo, 100% local, no camera needed.',
    'seo.indexKeywords':
      'focus browser detector, browser activity detector, distraction detector, tab switch detection, focus loss detection, browser signals, online proctoring demo, attention tracker',
    'seo.webAppName': 'I Can See You',
    'seo.webAppDescription':
      'Free browser activity and distraction detector. Test which signals your browser reveals when you get distracted — tab switches, focus loss, fullscreen exits, and more.',
    'seo.webAppCategory': 'UtilityApplication',
    'seo.webAppOS': 'Any',
    'seo.webAppBrowserReq': 'Requires a modern browser with JavaScript support',
    'seo.faq.whatIsQ': 'What is I Can See You?',
    'seo.faq.whatIsA':
      'I Can See You is a free browser activity detector that shows which signals your browser reveals when you get distracted — tab switches, focus loss, fullscreen exits, and more. No camera. No server. 100% local.',
    'seo.faq.howWorksQ': 'How does browser distraction detection work?',
    'seo.faq.howWorksA':
      'Browser distraction detection uses native web APIs like Page Visibility API, Focus Events, Fullscreen API, and Mouse Events to detect when you switch tabs, lose window focus, exit fullscreen, move your cursor outside the viewport, or paste content during a session.',
    'seo.faq.realProctorQ': 'Is I Can See You a real proctoring tool?',
    'seo.faq.realProctorA':
      "No. I Can See You is an educational demo that shows what browser-level signals can detect about your attention. It does not use your camera, microphone, or access other applications. All data stays local in your browser.",
    'seo.faq.inactivityQ': 'What browser signals can detect inactivity?',
    'seo.faq.inactivityA':
      'Common browser signals that detect inactivity include: tab visibility changes (Page Visibility API), window focus and blur events, fullscreen exit events, mouse leave events when the cursor exits the viewport, paste events, and developer tools detection heuristics.',
    'seo.privacy.faq.cameraQ': 'Does I Can See You access my camera or microphone?',
    'seo.privacy.faq.cameraA':
      'No. I Can See You never requests camera or microphone permissions. It only uses browser-level APIs like Page Visibility, Focus Events, and Mouse Events to detect distraction signals.',
    'seo.privacy.faq.dataQ': 'Is my data sent to a server?',
    'seo.privacy.faq.dataA':
      'No. All detection happens locally in your browser. Nothing is sent to any server. Session data is stored only in sessionStorage and is cleared when you close the tab.',
    'seo.privacy.faq.apisQ': 'What browser APIs does this use to detect distraction?',
    'seo.privacy.faq.apisA':
      'It uses Page Visibility API (tab switches), Focus Events (window focus loss), Fullscreen API (fullscreen exits), Mouse Events (cursor leaving viewport), Paste Events, and a best-effort DevTools heuristic.',

    // ── Contract card ───────────────────────────────────────────
    'contract.signHere': 'Sign here to confirm you actually read this.',

    // ── Footer copy ─────────────────────────────────────────────
    'footer.copy':
      'This site detects browser signals... The sketchbook is watching.',
  },

  es: {
    // ── Common ────────────────────────────────────────────────
    'common.siteName': 'I Can See You',
    'common.brand': 'I can see you',
    'common.backToHome': 'Volver al inicio',
    'common.loading': 'Cargando…',
    'common.retry': 'Reintentar demo',
    'common.share': 'Compartir',
    'common.shareSharing': 'Compartiendo…',
    'common.shareShared': '¡Compartido!',
    'common.shareError': 'Error al compartir',
    'common.seconds': 'Segundos',
    'common.stop': 'Detener',
    'common.goBackHome': 'Volver al inicio',
    'common.authorize': 'Autorizar ahora',
    'common.authorizing': 'Solicitando…',
    'common.authorized': 'Autorizado',
    'common.continue': 'Continuar',
    'common.continueAnyway': 'Continuar de todos modos',

    // ── Navigation ──────────────────────────────────────────────
    'nav.main': 'Navegación principal',
    'nav.footer': 'Navegación del pie',
    'nav.signals': 'Señales',
    'nav.demo': 'Demo',
    'nav.privacy': 'Privacidad',
    'nav.manual': 'Manual',
    'nav.githubAria': 'Ver código en GitHub',
    'nav.switchToLight': 'Que haya luz',
    'nav.switchToDark': 'Bajar las luces',
    'nav.toggleDark': 'Cambiar modo oscuro',

    // ── Landing ─────────────────────────────────────────────────
    'landing.heroTagline': '60 segundos. Eso es todo lo que necesitas. Intenta no distraerte.',
    'landing.heroDescription':
      'Un detector gratuito de actividad del navegador que muestra exactamente qué señales revela tu navegador cuando pierdes la concentración: cambios de pestaña, pérdida de foco, salidas de pantalla completa y más. Sin cámara. Sin servidor. 100% local.',
    'landing.cta': '¡Vamos a probarlo!',
    'landing.coverage.detectTitle': 'Lo que puedo detectar',
    'landing.coverage.detect1': 'Cambios de visibilidad de pestaña a través de la Page Visibility API.',
    'landing.coverage.detect2': 'Eventos de pérdida y recuperación de foco de la ventana.',
    'landing.coverage.detect3': 'Salida de pantalla completa: detecta cuando abandonas el modo de pantalla completa.',
    'landing.coverage.detect4': 'Salida del mouse: tu cursor abandonando el viewport del navegador.',
    'landing.coverage.detect5': 'Eventos de pegar durante la sesión de detección.',
    'landing.coverage.detect6': 'Heurística de DevTools: verificación de mejor esfuerzo para herramientas de desarrollo abiertas.',
    'landing.coverage.cannotTitle': 'Lo que no puedo detectar',
    'landing.coverage.cannot1': 'Aplicaciones abiertas fuera del navegador.',
    'landing.coverage.cannot2': 'El contenido exacto de otras ventanas del sistema.',
    'landing.coverage.cannot3': 'Tu cámara, micrófono o grabación de pantalla.',
    'landing.coverage.cannot4': 'Lo que desayunaste esta mañana.',
    'landing.coverage.cannot5': 'Si realmente estás leyendo esto o solo haciendo scroll.',
    'landing.coverage.cannot6': 'Tu excusa para cambiar de pestaña. (Pero me di cuenta.)',
    'landing.coverage.srHeading': 'Cobertura de detección de señales del navegador',

    // ── Demo ────────────────────────────────────────────────────
    'demo.title': 'Demo de Detección en Vivo | I Can See You',
    'demo.description':
      'Inicia una sesión de detección de distracciones de 60 segundos. Observa en tiempo real cómo las señales del navegador capturan cambios de pestaña, pérdida de foco, salidas de pantalla completa y eventos de salida del mouse.',
    'demo.footerNav': 'Enlaces de demo',
    'demo.compiling': 'Compilando resultados…',
    'demo.sessionStatus': 'Estado de la sesión',
    'demo.inFocus': 'EN FOCO',
    'demo.outOfFocus': 'FUERA DE FOCO',
    'demo.eventDetected': 'EVENTO DETECTADO',
    'demo.incidents': 'Incidentes',
    'demo.dialogQuotes': '\u201C{message}\u201D',

    // ── Results ─────────────────────────────────────────────────
    'results.title': 'Resultados de Detección | I Can See You',
    'results.description':
      'Tus resultados de detección de distracciones — incidentes totales, tiempo distraído y puntuación de atención. Mira exactamente qué señales del navegador te atraparon.',
    'results.noResults': 'Sin resultados',
    'results.noResultsBody':
      'Parece que aún no has completado una sesión de detección. Intentémoslo de nuevo.',
    'results.tryDetection': 'Intentar detección',
    'results.yourResults': 'Tus resultados',
    'results.subtitle':
      'El cuaderno dejó de vigilarte (por ahora). Aquí tienes un resumen de tu atención durante la sesión.',
    'results.distractionsLabel': 'Distracciones',
    'results.distractionsDesc': 'Veces que cambiaste de pestaña o ventana.',
    'results.durationLabel': 'Duración',
    'results.durationDesc': 'Tiempo total fuera de foco durante la sesión.',
    'results.scoreLabel': 'Puntuación de Atención',
    'results.scoreExcellent': 'Enfoque excelente. Casi te pillamos deslizándote.',
    'results.scoreGood': 'No está mal, pero sabemos que puedes hacerlo mejor.',
    'results.scoreOkay': 'Hmm... hay margen de mejora.',
    'results.scorePoor': 'Te perdimos de vista bastante.',
    'results.timelineTitle': 'Línea de tiempo de la sesión',
    'results.timelineStart': '0:00',
    'results.shareTitle': 'I Can See You — Mi Puntuación de Atención',
    'results.shareText': 'Obtuve {score}% de atención. ¿Puedes hacerlo mejor?',
    'results.transparencyTitle': 'Transparencia técnica',
    'results.transparencyText':
      'Este experimento utiliza señales nativas del navegador para determinar tu nivel de atención, sin encender tu cámara ni invadir tu privacidad real.',
    'results.transparencyFooter':
      'Ningún dato de comportamiento se almacena en nuestros servidores. Todo se procesa localmente en este dispositivo y se borra al cerrar.',
    'results.cardHeader': 'I CAN SEE YOU',
    'results.cardSubheader': 'Resumen de Sesión',
    'results.cardScoreLabel': 'Puntuación de Atención',
    'results.cardDistractions': 'Distracciones',
    'results.cardTimeAway': 'Tiempo Ausente',
    'results.cardSessionTime': 'Tiempo de Sesión',
    'results.cardFooterLeft': 'Detector de Señales del Navegador',
    'results.cardFooterRight': 'icanseeyou.dev',
    'results.cardNoData': 'Sin datos de sesión',
    'results.cardCompleteFirst': 'Completa una sesión de detección primero',

    // ── Privacy ───────────────────────────────────────────────────
    'privacy.title': 'Privacidad y Transparencia | I Can See You',
    'privacy.description':
      'Qué detecta realmente este detector de distracciones, qué no puede detectar y cómo tus datos permanecen locales. Transparencia total sobre la Page Visibility API, eventos de foco y otras señales del navegador.',
    'privacy.keywords':
      'detector de foco privacidad, transparencia de señales del navegador, detección local, sin cámara de supervisión, demo de privacidad primero',
    'privacy.heroHeading': 'Privacidad (o falta de ella)',
    'privacy.heroSubtitle':
      'No te preocupes. Te estoy vigilando, pero mi cuaderno se borra mágicamente cuando te vas. Todo es temporal, como mi atención.',
    'privacy.trackTitle': 'Lo que rastreo',
    'privacy.trackDesc':
      'Tu navegador me dice más de lo que crees. Estas son las señales que realmente observo.',
    'privacy.track1': 'Cambios de pestaña a través de la Page Visibility API.',
    'privacy.track2': 'Cuando pierdes o recuperas el foco de la ventana.',
    'privacy.track3': 'Salir del modo de pantalla completa.',
    'privacy.track4': 'Tu cursor abandonando el viewport del navegador.',
    'privacy.track5': 'Eventos de pegar durante la sesión.',
    'privacy.track6': 'Herramientas de desarrollo (heurística de mejor esfuerzo).',
    'privacy.zeroServersTitle': 'Cero Servidores',
    'privacy.zeroServersDesc':
      'Todo queda entre tú y tu navegador. No tengo servidor, base de datos ni memoria.',
    'privacy.zeroServers1': 'Nada se envía a ningún servidor.',
    'privacy.zeroServers2': 'Toda la detección ocurre localmente en tu navegador.',
    'privacy.zeroServers3': 'Los datos de la sesión se borran cuando cierras la pestaña.',
    'privacy.zeroServers4': 'Sin cookies de seguimiento de ningún tipo.',
    'privacy.zeroServers5': 'No tengo servidor. Ni siquiera tengo base de datos.',
    'privacy.dontSeeTitle': 'Lo que no veo',
    'privacy.dontSeeDesc':
      'No soy omnisciente. Hay límites estrictos sobre lo que una página web puede observar, y respeto todos ellos.',
    'privacy.dontSee1': 'Aplicaciones ejecutándose fuera de tu navegador.',
    'privacy.dontSee2': 'Contenido de otras ventanas, pestañas o tu historial del portapapeles.',
    'privacy.dontSee3': 'Tu cámara o micrófono — nunca pido permiso.',
    'privacy.dontSee4': 'Entrada de teclado cuando escribes en otra aplicación.',
    'privacy.dontSee5': 'Obviamente, no puedo verte cuando te estás bañando.',
    'privacy.dontSee6': 'Si realmente leíste los términos de servicio. (Nadie lo hace.)',
    'privacy.dontSee7': 'Tu monólogo interno. Todavía.',
    'privacy.howWorksTitle': 'Cómo funciona',
    'privacy.howWorksDesc':
      'Sin magia, solo APIs estándar del navegador haciendo su trabajo. Aquí está el desglose técnico.',
    'privacy.howWorks1': 'Page Visibility API — detecta cuando cambias de pestaña.',
    'privacy.howWorks2': 'Focus Events — registra cuando la ventana gana o pierde foco.',
    'privacy.howWorks3': 'Fullscreen API — detecta cuando sales de pantalla completa.',
    'privacy.howWorks4': 'Mouse Events — rastrea cuando tu cursor deja el viewport.',
    'privacy.howWorks5': 'Paste Events — registra acciones de pegar durante la sesión.',
    'privacy.controlTitle': 'Tú lo controlas',
    'privacy.controlDesc':
      'Tú mandas. Cierra la pestaña y soy amnésico. Tu privacidad está literalmente a un clic de distancia.',
    'privacy.control1': 'No requiere acceso a cámara ni micrófono.',
    'privacy.control2': 'Toda la detección es pasiva — no se necesitan permisos para empezar.',
    'privacy.control3': 'Permisos explícitos opcionales disponibles en la página de Señales.',
    'privacy.control4': 'Cierra la pestaña y todo desaparece instantáneamente.',
    'privacy.control5': 'Puedes detener la demo en cualquier momento con un clic.',
    'privacy.controlSignalsLink': 'página de Señales',

    // ── Manual ────────────────────────────────────────────────────
    'manual.title': 'Manual de Usuario | I Can See You',
    'manual.description':
      'Un manual de usuario paso a paso para I Can See You, el detector de distracciones del navegador. Aprende cómo funciona la detección, qué señales se rastrean y consejos para la sesión de demo.',
    'manual.heroHeading': 'Manual de Usuario',
    'manual.heroSubtitle':
      'Todo lo que necesitas saber antes de que el cuaderno empiece a vigilar. Spoiler: es solo tu navegador hablando.',
    'manual.howWorksTitle': 'Cómo funciona',
    'manual.howWorksDesc':
      'Sin magia, solo APIs estándar del navegador haciendo su trabajo. Aquí está lo que el cuaderno realmente escucha.',
    'manual.apiVisibility': 'Page Visibility API',
    'manual.apiVisibilityDesc':
      'Detecta cuando cambias de pestaña o minimizas el navegador. Si el documento está oculto, sabemos que miraste a otro lado.',
    'manual.apiFocus': 'Focus Events',
    'manual.apiFocusDesc':
      'Monitorea cuando la ventana pierde o gana foco. Hacer clic en otra aplicación o monitor activa esto.',
    'manual.apiFullscreen': 'Fullscreen API',
    'manual.apiFullscreenDesc': 'Detecta cuando sales del modo de pantalla completa durante la sesión.',
    'manual.apiMouse': 'Mouse Events',
    'manual.apiMouseDesc': 'Rastrea cuando tu cursor abandona el viewport del navegador.',
    'manual.apiPaste': 'Paste Events',
    'manual.apiPasteDesc': 'Registra acciones de pegar mientras la sesión está activa.',
    'manual.apiDevtools': 'DevTools Heuristic',
    'manual.apiDevtoolsDesc':
      'Una verificación de mejor esfuerzo basada en tamaño para adivinar si las herramientas de desarrollo están abiertas. Baja confianza, alta curiosidad.',
    'manual.tipsTitle': 'Consejos para no ser atrapado',
    'manual.tipsDesc':
      'Si intentas pasar la demo sin levantar ninguna bandera, aquí está tu hoja de trucos.',
    'manual.tip1': 'Mantén la ventana del navegador enfocada todo el tiempo.',
    'manual.tip2': 'No cambies de pestaña mientras la sesión está activa.',
    'manual.tip3': 'Usa un dispositivo separado si necesitas buscar algo.',
    'manual.tip4':
      'Entra en pantalla completa antes de que empiece la sesión si quieres menos casos borde.',
    'manual.tip5': 'Cierra los ojos.',
    'manual.tip5Sub': '(No funciona. Todavía vemos el estado del navegador.)',

    // ── Signals / Permissions ───────────────────────────────────
    'signals.title': 'Permisos de Señales del Navegador | I Can See You',
    'signals.description':
      'Concede permisos opcionales del navegador para una detección de distracciones mejorada — lectura del portapapeles y detección multi-pantalla. Mira qué señales están activas, parciales o no disponibles en tu navegador.',
    'signals.keywords':
      'permisos de detector de foco, permisos de señales del navegador, permiso de lectura de portapapeles, detección multi-pantalla, api de gestión de ventanas',
    'signals.heroHeading': 'Algo falta aquí…',
    'signals.heroDesc':
      'Estas señales necesitan permiso explícito. Puedes concederlos ahora o continuar sin ellos — la demo funciona perfectamente de cualquier manera.',
    'signals.footerNav': 'Enlaces de página de soporte',
    'signals.loading': 'Verificando permisos…',
    'signals.clipboardLabel': 'Lectura del portapapeles',
    'signals.clipboardDesc':
      'Detecta si pegas contenido externo durante la sesión.',
    'signals.multiScreenLabel': 'Multi-pantalla',
    'signals.multiScreenDesc':
      'Detecta si usas más de una pantalla a la vez.',
    'signals.badgeActive': 'ACTIVO',
    'signals.badgePartial': 'PARCIAL',
    'signals.badgeUnavailable': 'NO DISPONIBLE',
    'signals.compatNote':
      'Incluso si algunas señales no están disponibles en tu navegador (común en Firefox y Safari), la demo seguirá detectando cambios de pestaña, pérdida de foco, salida de pantalla completa y salida del mouse — así que la experiencia principal será excelente.',

    // ── 404 ─────────────────────────────────────────────────────
    '404.title': 'Página No Encontrada | I Can See You',
    '404.description':
      'Esta página no existe. Vuelve a I Can See You para probar tus señales de distracción del navegador.',
    '404.mascotMessage': 'Busqué por todas partes, pero esta página es invisible.',
    '404.heading': '404',
    '404.body': 'Esta página salió del radar. Incluso mis ojos no pueden detectarla.',

    // ── Mascot messages ─────────────────────────────────────────
    'mascot.default': 'Todo bien… por ahora.',
    'mascot.eyesAria': 'Ojos vigilando',
    'mascot.eyesStaticAria': 'Ojos observando',

    // visibility
    'mascot.visibility.1': 'Oye… esa pestaña se fue de viaje.',
    'mascot.visibility.2': '¿Ya volviste o era otra pestaña fingiendo interés?',
    'mascot.visibility.3': 'La página se escondió. Mis cejas no.',
    'mascot.visibility.4': '¿Multitarea o maniobra evasiva? Tomate, tomate sospechoso.',

    // blur
    'mascot.blur.1': 'Pequeña distracción detectada. Lo vi todo.',
    'mascot.blur.2': 'El foco se perdió. ¿Debo reportar una persona desaparecida?',
    'mascot.blur.3': 'Tardaste en volver — ¿ocupado siendo misterioso?',
    'mascot.blur.4': 'La ventana perdió foco; mi cuaderno siguió anotando de todos modos.',

    // fullscreen
    'mascot.fullscreen.1': 'Salida de pantalla completa… ¿ya te aburriste?',
    'mascot.fullscreen.2': 'No pudiste comprometerte con la imagen grande por mucho tiempo, ¿eh?',
    'mascot.fullscreen.3': 'Volviendo a lo normal — ¿miedo escénico o estrategia?',
    'mascot.fullscreen.4': 'La experiencia cinematográfica terminó antes que el tráiler prometía.',

    // mouseleave
    'mascot.mouseleave.1': 'Tu mouse escapó del cuaderno.',
    'mascot.mouseleave.2': 'El cursor abandonó la escena del crimen. Conveniente.',
    'mascot.mouseleave.3': 'El puntero salió del escenario otra vez — ¿ensayando tu coartada?',
    'mascot.mouseleave.4': 'El mouse se escapó como si me debiera dinero.',

    // paste
    'mascot.paste.1': 'Pegado detectado. ¿Trampa creativa?',
    'mascot.paste.2': 'Ctrl+V con confianza. Valiente.',
    'mascot.paste.3': 'Esa es mucha ambición del portapapeles para una sentada.',
    'mascot.paste.4': '¿Sabiduría importada — o préstamo al por mayor?',

    // devtools
    'mascot.devtools.1': 'Hmm… ¿ojos curiosos detrás de la cortina?',
    'mascot.devtools.2': '¿Me estás inspeccionando? Me conmueve. También lo archivaré.',
    'mascot.devtools.3': 'DevTools abiertos — ¿haciendo tarea o cazando bugs en mi ego?',
    'mascot.devtools.4': 'Asomándose bajo el capó. Lindo. Obvio, pero lindo.',

    // score messages (static mascot)
    'mascot.score.100':
      'Enfoque perfecto. O simplemente no tocaste nada durante 60 segundos. De cualquier forma, sospecho.',
    'mascot.score.80':
      '¡Tan cerca de perfecto! Tu navegador casi creyó que te importaba.',
    'mascot.score.60':
      'No está mal. Pero vi ese cambio de pestaña. No lo niegues.',
    'mascot.score.40':
      'Mitad enfocado, mitad en otra parte. Energía clásica de multitarea.',
    'mascot.score.20':
      '¿Siquiera estabas en la habitación? Tu navegador se siente descuidado.',
    'mascot.score.0':
      'Iniciaste el temporizador y te fuiste, ¿verdad? Al menos cierra la pestaña la próxima vez.',

    // ── Signal labels ───────────────────────────────────────────
    'signal.visibility': 'Pestaña oculta',
    'signal.blur': 'Foco perdido',
    'signal.fullscreen': 'Salida pantalla completa',
    'signal.mouseleave': 'Cursor salió',
    'signal.paste': 'Pegar',
    'signal.devtools': 'DevTools',
    'signal.description.visibility':
      'Page Visibility API: Detecta cuando cambias a otra pestaña o minimizas la ventana.',
    'signal.description.blur':
      'Focus Events: Registra cuando el documento activo pierde interacción de tu sistema operativo.',
    'signal.description.fullscreen':
      'Fullscreen API: Detecta cuando sales del modo de pantalla completa.',
    'signal.description.mouseleave':
      'Mouse Leave: Indica cuando tu cursor abandona el viewport del navegador.',
    'signal.description.paste':
      'Paste Event: Registra si pegas contenido durante la sesión.',
    'signal.description.devtools':
      'DevTools Heuristic: Estimación de mejor esfuerzo de si las herramientas de desarrollo están abiertas.',

    // ── SEO / Structured data ───────────────────────────────────
    'seo.indexTitle': 'I Can See You — Detector de Actividad y Distracción del Navegador',
    'seo.indexDescription':
      'Detector de foco del navegador que prueba qué señales exponen tus distracciones. Detecta cambios de pestaña, pérdida de foco, salidas de pantalla completa y salida del cursor — demo de 60 segundos, 100% local, sin cámara.',
    'seo.indexKeywords':
      'detector de foco del navegador, detector de actividad del navegador, detector de distracciones, detección de cambio de pestaña, detección de pérdida de foco, señales del navegador, demo de supervisión en línea, rastreador de atención',
    'seo.webAppName': 'I Can See You',
    'seo.webAppDescription':
      'Detector gratuito de actividad y distracción del navegador. Prueba qué señales revela tu navegador cuando te distraes — cambios de pestaña, pérdida de foco, salidas de pantalla completa y más.',
    'seo.webAppCategory': 'UtilityApplication',
    'seo.webAppOS': 'Cualquiera',
    'seo.webAppBrowserReq': 'Requiere un navegador moderno con soporte de JavaScript',
    'seo.faq.whatIsQ': '¿Qué es I Can See You?',
    'seo.faq.whatIsA':
      'I Can See You es un detector gratuito de actividad del navegador que muestra qué señales revela tu navegador cuando te distraes — cambios de pestaña, pérdida de foco, salidas de pantalla completa y más. Sin cámara. Sin servidor. 100% local.',
    'seo.faq.howWorksQ': '¿Cómo funciona la detección de distracciones del navegador?',
    'seo.faq.howWorksA':
      'La detección de distracciones del navegador utiliza APIs web nativas como Page Visibility API, Focus Events, Fullscreen API y Mouse Events para detectar cuando cambias de pestaña, pierdes el foco de la ventana, sales de pantalla completa, mueves tu cursor fuera del viewport o pegas contenido durante una sesión.',
    'seo.faq.realProctorQ': '¿Es I Can See You una herramienta real de supervisión?',
    'seo.faq.realProctorA':
      'No. I Can See You es una demo educativa que muestra qué pueden detectar las señales a nivel de navegador sobre tu atención. No usa tu cámara, micrófono ni accede a otras aplicaciones. Todos los datos permanecen localmente en tu navegador.',
    'seo.faq.inactivityQ': '¿Qué señales del navegador pueden detectar inactividad?',
    'seo.faq.inactivityA':
      'Las señales comunes del navegador que detectan inactividad incluyen: cambios de visibilidad de pestaña (Page Visibility API), eventos de foco y desenfoque de ventana, eventos de salida de pantalla completa, eventos de salida del mouse cuando el cursor abandona el viewport, eventos de pegar y heurísticas de detección de herramientas de desarrollo.',
    'seo.privacy.faq.cameraQ': '¿I Can See You accede a mi cámara o micrófono?',
    'seo.privacy.faq.cameraA':
      'No. I Can See You nunca solicita permisos de cámara o micrófono. Solo utiliza APIs a nivel de navegador como Page Visibility, Focus Events y Mouse Events para detectar señales de distracción.',
    'seo.privacy.faq.dataQ': '¿Se envían mis datos a un servidor?',
    'seo.privacy.faq.dataA':
      'No. Toda la detección ocurre localmente en tu navegador. No se envía nada a ningún servidor. Los datos de sesión se almacenan solo en sessionStorage y se borran cuando cierras la pestaña.',
    'seo.privacy.faq.apisQ': '¿Qué APIs del navegador usa para detectar distracciones?',
    'seo.privacy.faq.apisA':
      'Usa Page Visibility API (cambios de pestaña), Focus Events (pérdida de foco de ventana), Fullscreen API (salidas de pantalla completa), Mouse Events (cursor abandonando el viewport), Paste Events y una heurística de mejor esfuerzo de DevTools.',

    // ── Contract card ───────────────────────────────────────────
    'contract.signHere': 'Firma aquí para confirmar que realmente leíste esto.',

    // ── Footer copy ─────────────────────────────────────────────
    'footer.copy':
      'Este sitio detecta señales del navegador... El cuaderno está vigilando.',
  },
} as const;

export type UiStrings = typeof ui.en;
export type UiKey = keyof UiStrings;
