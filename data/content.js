/* ============================================
   Site Content
   Every piece of user-facing copy that is NOT already
   data-driven via data/team.json, data/roadmap.json, or
   data/notifications.json lives here. Edit this file to
   change on-page text, section order, or card content —
   no HTML edits required.

   Rendered into the page by js/modules/content.js.

   Text fields support the same tiny markdown used
   elsewhere on the site (see js/utils/markdown.js):
     [label](https://example.com)   -> a link
     =(#3e8ef7)<colored text>==     -> a colored <span>
     (accepts a hex code or a CSS color keyword)

   Numbers/dates that change every year (fees, deadlines,
   team size, links) stay in js/config.js -> SITE_CONFIG,
   not here — this file is page copy, config.js is facts.
   ============================================ */

const SITE_CONTENT = {

  // Toast that slides in from the right on page load.
  notifToast: {
    icon: "🚀",
    title: "ICPC Amritapuri 2026 Registrations Now Open!",
    primaryLabel: "Register Now",
    secondaryLabel: "Need a Team? Help"
  },

  // Navbar dropdown ("flyout") menus. Top-level labels + hrefs are
  // structural (they stay in index.html); this only supplies the
  // flyout item titles/descriptions/links shown under each menu.
  nav: {
    about: [
      { href: "#about-codec", title: "CoDeC", desc: "MIT-WPU's competitive programming club" },
      { href: "#about-cdc", title: "CDC", desc: "Career Development Centre" },
      { href: "#about-mitwpu", title: "MIT-WPU", desc: "Our university" },
      { href: "#about-icpc", title: "ICPC Amritapuri 2026", desc: "The contest itself" }
    ],
    benefits: [
      { href: "#benefits", title: "Skill-building", desc: "Sharpen DSA and contest speed" },
      { href: "#benefits", title: "Recognition & career impact", desc: "Stand out to recruiters" },
      { href: "#benefits", title: "Networking", desc: "Meet coaches and finalists" }
    ],
    roadmap: [
      { href: "#roadmap", title: "How to register", desc: "Five steps, start to finish" },
      { href: "#facts", title: "Quick facts", desc: "Dates, fees, team size" }
    ],
    resources: [
      { href: "#resources", title: "Watch: What is ICPC", desc: "A quick primer" },
      { href: "#resources", title: "Amritapuri 2024 highlights", desc: "See last year's regional" },
      { href: "#help", title: "Need a team?", desc: "Get matched with teammates" }
    ]
  },

  hero: {
    eyebrow: "ICPC Amritapuri Regionals 2026",
    // Each line renders as its own block; `gradient: true` applies the
    // site's signature gradient-text treatment (see .text-gradient).
    titleLines: [
      { text: "Solve." },
      { text: "Collaborate." },
      { text: "Conquer.", gradient: true }
    ],
    subtitle: "Everything MIT-WPU students need to compete at ICPC Amritapuri Regionals 2026 — from forming a team to walking onto the onsite stage. Brought to you by CoDeC, with CDC's full backing.",
    actions: [
      { label: "Explore More", href: "#about", icon: "arrow" },
      { label: "Watch Video", href: "#resources", icon: "play" }
    ],
    // First item can carry a `strong` lead-in (rendered in <strong>).
    meta: [
      { strong: "3", text: "per team" },
      { text: "Asia West region" },
      { text: "Open to all MIT-WPU students" }
    ],
    // Steps shown in the vertical rail next to the trophy image.
    rail: [
      { label: "Competitive Programming" },
      { label: "Teamwork & Collaboration" },
      { label: "Global Community" },
      { label: "Career Opportunities" },
      { label: "Innovation & Growth" }
    ]
  },

  about: {
    eyebrow: "About",
    title: "Who's behind this, and what you're signing up for",
    lead: "A quick look at CoDeC, CDC, MIT-WPU, and the contest itself — so you know exactly what you're preparing for.",
    cards: [
      {
        id: "about-codec",
        title: "About CoDeC",
        body: "CoDeC is MIT World Peace University's competitive programming club, built to give students a structured, supportive path into algorithmic problem-solving and contest programming. The club runs regular practice sessions, contest-specific training, peer mentorship, and awareness drives for platforms like Codeforces, CodeChef, LeetCode, and ICPC. CoDeC works closely with the Career Development Centre to align competitive programming activity with placement and career readiness — helping members translate contest performance into interview-ready problem-solving skills."
      },
      {
        id: "about-cdc",
        title: "About CDC",
        body: "The Career Development Centre (CDC) is MIT-WPU's dedicated department for student career growth — spanning placement preparation, industry partnerships, technical upskilling, and competitive exposure programs. CDC works across all departments to connect students with internships, placements, mentorship, and skill-building opportunities that go beyond the classroom. CDC's support for ICPC participation — including sponsoring premium AlgoZenith access for students and enabling Campus Ambassador programs like this one — reflects its broader mission of making students competitive on national and global stages."
      },
      {
        id: "about-mitwpu",
        title: "About MIT-WPU",
        body: "MIT World Peace University (MIT-WPU), Kothrud, Pune, is a multidisciplinary university known for its strong engineering, technology, and innovation ecosystem. Through clubs, centres, and dedicated departments like CDC and CoDeC, the university actively encourages students to pursue competitive programming, research, and industry-aligned learning alongside academics."
      },
      {
        title: "Team format",
        body: "Teams of three compete together — one machine, three minds. Interdisciplinary teams are welcome, as long as every member is a currently enrolled MIT-WPU student."
      },
      {
        id: "about-icpc",
        feature: true,
        title: "About ICPC Amritapuri Regionals 2026",
        body: "The International Collegiate Programming Contest (ICPC) is the oldest, largest, and most prestigious algorithmic programming contest in the world for university students. Teams of three compete to solve real-world problems under time pressure, representing their university at regional and, ultimately, global stages. The Amritapuri Regional is one of the host sites under the ICPC Asia West region. Students first compete in an online Preliminary Round; top-performing teams are then invited to the onsite Regional Contest, typically held across multiple cities (in recent years including Kollam, Bengaluru, Coimbatore, and Mysuru). Winning teams from Amritapuri go on to represent the site at the Asia West Continent Championship, with a path onward to the ICPC World Finals.",
        list: [
          "A globally recognised credential — ICPC participation carries strong weight on resumes and in technical interviews",
          "A genuine test of algorithmic thinking, teamwork, and performance under pressure",
          "A direct pipeline into a community of top competitive programmers, mentors, and recruiters across India"
        ],
        // Matches a key in SITE_CONFIG.links (js/config.js) — reuses the
        // same video-embedding mechanism as the Resources section.
        videoKey: "amritapuri2024Highlights",
        videoTitle: "ICPC Amritapuri Regionals 2024 highlights"
      }
    ]
  },

  benefits: {
    eyebrow: "Why participate",
    title: "What you actually get out of it",
    lead: "Beyond the scoreboard — the skills, recognition, and network that stay with you long after the contest ends.",
    cards: [
      {
        icon: "layers",
        title: "Skill-building",
        items: [
          "Sharpens data structures, algorithms, and problem-solving speed under real contest constraints",
          "Builds team-based coding discipline — planning, division of labour, and debugging under pressure"
        ]
      },
      {
        icon: "star",
        title: "Recognition & career impact",
        items: [
          "Certificates and regional rankings that stand out on resumes and LinkedIn profiles",
          "ICPC experience is widely recognised by top technology companies during technical hiring",
          "A strong ICPC track record has historically opened doors to interviews at competitive-programming-friendly recruiters"
        ]
      },
      {
        icon: "users",
        title: "Networking",
        items: [
          "Access to a nationwide community of competitive programmers, coaches, and ICPC finalists",
          "Exposure to prep sessions and mentorship from AlgoZenith and past ICPC finalists",
          "Direct interaction with CoDeC seniors and CDC mentors who have prior contest experience"
        ]
      },
      {
        icon: "sparkle",
        title: "Beyond the contest",
        items: [
          "A participation certificate is guaranteed for any team that submits at least one accepted solution",
          "Coaches who register multiple teams are also recognised with a dedicated certificate"
        ]
      }
    ]
  },

  roadmap: {
    eyebrow: "How to register",
    title: "Five steps from idea to onsite regional",
    lead: "Follow this in order — each step unlocks the next.",
    video: {
      videoKey: "howToRegisterVideo",
      title: "Watch: How to Register",
      desc: "A walkthrough of the exact steps above, in video form."
    },
    journey: {
      img: "assets/journey-preview.jpg",
      alt: "A programmer's journey: first contest, first accepted solution, first regional, first internship, World Finals",
      caption: "Every ICPC journey starts with a first contest. Yours can look exactly like this."
    }
  },

  facts: {
    eyebrow: "At a glance",
    title: "Quick facts",
    lead: "The essentials, in one place. Anything still pending will be confirmed in the CoDeC Welcome Kit.",
    // Row labels + which SITE_CONFIG.facts key fills the value.
    rows: [
      { label: "Team size", factKey: "teamSize" },
      { label: "Registration fee", factKey: "registrationFee" },
      { label: "Registration link", factKey: "registrationLink" },
      { label: "Registration deadline", factKey: "registrationDeadline" },
      { label: "Online preliminary round", factKey: "onlinePrelims" },
      { label: "Preliminary round format", factKey: "preliminaryFormat" },
      { label: "Onsite regionals", factKey: "onsiteSites" }
    ],
    note: {
      badge: "Contact for MIT-WPU students",
      // Contacts are pulled from SITE_CONFIG.contact.ambassadors
      // (js/config.js) so names/roles are never duplicated here.
      ctaLabel: "Full contact info",
      ctaHref: "#team"
    }
  },

  resources: {
    eyebrow: "Additional resources",
    title: "Watch, read, and get ready",
    lead: "Short primers and last year's highlights, plus links for everything else you'll need.",
    videos: [
      {
        videoKey: "whatIsIcpcVideo",
        title: "What is ICPC?",
        desc: "A quick primer on how the contest works, from Preliminary Round to World Finals."
      }
    ],
    links: [
      { linkKey: "howToRegister", label: "How to Register — full guide" },
      { linkKey: "linkedin", label: "Stay updated — ICPC Asia West Amritapuri on LinkedIn", external: true }
    ]
  },

  help: {
    eyebrow: "Need a hand?",
    title: "Help & support",
    lead: "Stuck at any step? Start here.",
    cards: [
      {
        icon: "arrow",
        title: "Registration page",
        body: "Head straight to the official ICPC registration portal to register your team.",
        ctaLabel: "Go to portal",
        linkKey: "registration"
      },
      {
        icon: "users",
        title: "Need a team?",
        body: "Don't have two teammates yet? Fill in this form and we'll help match you with other solo students.",
        ctaLabel: "Fill the form",
        linkKey: "needATeamForm"
      },
      {
        icon: "mail",
        title: "Contact CoDeC",
        body: "Questions about eligibility, prep sessions, or anything else? Reach out directly.",
        ctaLabel: "Email us"
        // href is built from SITE_CONFIG.contact.email — no linkKey needed
      }
    ]
  },

  community: {
    eyebrow: "Stay in the loop",
    title: "Join our community",
    lead: "Follow along for prep sessions, deadline reminders, and results.",
    whatsapp: {
      title: "Join Our ICPC Community on WhatsApp",
      desc: "Deadline reminders, practice sessions, and quick answers from CoDeC and fellow teams.",
      linkKey: "whatsappCommunity"
    },
    socials: [
      { icon: "linkedin", linkKey: "linkedin", label: "ICPC Asia West Amritapuri — LinkedIn" }
    ]
  },

  team: {
    eyebrow: "The people behind it",
    title: "Our team",
    lead: "Faculty guidance, CDC support, and the students running point on the ground."
  },

  footer: {
    brandText: "CoDeC × ICPC Amritapuri 2026",
    about: "MIT World Peace University's competitive programming club, run in partnership with the Career Development Centre, to guide students through ICPC Amritapuri Regionals 2026.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "About", href: "#about" },
          { label: "Benefits", href: "#benefits" },
          { label: "Roadmap", href: "#roadmap" },
          { label: "Quick facts", href: "#facts" },
          { label: "Our team", href: "#team" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Videos", href: "#resources" },
          { label: "Help & support", href: "#help" },
          { label: "Need a team?", linkKey: "needATeamForm" }
        ]
      },
      {
        title: "Contact",
        links: [
          { label: "Campus Ambassadors", href: "#facts" }
          // Email link is added automatically from SITE_CONFIG.contact.email
        ]
      }
    ],
    copyTail: "Built for the ICPC Amritapuri 2026 community.",
    watermark: "ICPC",
    social: [
      { icon: "whatsapp", linkKey: "whatsappCommunity", label: "WhatsApp Community" },
      { icon: "linkedin", linkKey: "linkedin", label: "LinkedIn" }
    ]
  }
};

// Expose on window for non-module scripts loaded via <script> tags,
// same pattern as js/config.js -> SITE_CONFIG.
window.SITE_CONTENT = SITE_CONTENT;
