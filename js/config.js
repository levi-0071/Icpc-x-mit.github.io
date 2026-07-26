/* ============================================
   Global Config
   Central place for site-wide constants.
   ============================================ */

const SITE_CONFIG = {
  siteName: "ICPC Amritapuri 2026 — MIT-WPU",
  club: "CoDeC",
  department: "Career Development Centre (CDC)",
  university: "MIT World Peace University, Kothrud, Pune",

  contact: {
    email: "codec@mitwpu.edu.in",
    ambassadors: [
      { name: "Harshvardhan Rathod", role: "Campus Ambassador" },
      { name: "Rugved Dusane", role: "Campus Ambassador" }
    ]
  },

  team: {
    faculty: [
      { name: "Kishanprasad Gunale Sir", role: "Director – Career Development Centre (CDC), MIT-WPU" },
      { name: "Mihir Mohite", role: "CoDeC President" },
      { name: "Saket Tembekar", role: "Member at CDC" }
    ],
    ambassadors: [
      {
        name: "Harshvardhan Rathod",
        role: "Campus Ambassador",
        photo: "assets/team-harshvardhan.jpg",
        phone: "7709285391",
        email: "hmr280606@gmail.com"
      },
      {
        name: "Rugved Dusane",
        role: "Campus Ambassador",
        photo: "assets/team-rugved.jpg",
        phone: "9673480827",
        email: "ultimaterd8@gmail.com"
      }
    ]
  },

  links: {
    registration: "https://amritaicpc.in/?utm_source=103&utm_medium=Email_Description&utm_campaign=ICPCAM2026",

    // TODO: replace with your real "Need a Team" Google Doc/Form share link
    needATeamForm: "https://docs.google.com/forms/d/e/1FAIpQLScGiobgT6Iq2Nu5ZTIYIoZJ07NakZ8d6SzIr58yBqb5Jl1QVQ/viewform",

    // TODO: replace with your real "How to Register" written guide link (if separate from the video)
    howToRegister: "[HOW_TO_REGISTER_GUIDE_URL]",

    // TODO: replace VIDEO_ID with the real "How to Register" YouTube video ID (embed URL format)
    howToRegisterVideo: "https://www.youtube.com/embed/[HOW_TO_REGISTER_VIDEO_ID]",

    // TODO: replace VIDEO_ID with the real "What is ICPC" YouTube video ID
    whatIsIcpcVideo: "https://www.youtube.com/embed/[WHAT_IS_ICPC_VIDEO_ID]",

    // TODO: replace VIDEO_ID with the real 2024 highlights YouTube video ID
    amritapuri2024Highlights: "https://www.youtube.com/embed/[ICPC_2024_HIGHLIGHTS_VIDEO_ID]",

    // TODO: replace with the real Google Form link for the floating Help button
    helpForm: "https://docs.google.com/forms/d/e/1FAIpQLScGiobgT6Iq2Nu5ZTIYIoZJ07NakZ8d6SzIr58yBqb5Jl1QVQ/viewform",

    linkedin: "https://www.linkedin.com/company/icpc-asiawest-amritapuri",
    whatsappCommunity: "https://chat.whatsapp.com/Lxf9JfUmmvuHjgiZSzRPhx"
  },

  facts: {
    teamSize: "3 students per team",
    registrationFee: "To be confirmed — see Welcome Kit",
    registrationLink: "To be added — see Welcome Kit",
    registrationDeadline: "Sept 25, 2026",
    onlinePrelims: "Oct 3, 2026 (2.5 hours)",
    preliminaryFormat: "Online contest; top teams advance to onsite Regionals",
    onsiteSites: "Jan 2–3, 2026 — Kollam, Bengaluru, Coimbatore, Mysuru"
  },

  animation: {
    revealThreshold: 0.15,
    scrollNavOffset: 40
  }
};

// Expose on window for non-module scripts loaded via <script> tags.
window.SITE_CONFIG = SITE_CONFIG;
