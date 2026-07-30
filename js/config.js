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
        photo: "assets/team-harshvardhan.png",
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
    registration: "https://docs.google.com/forms/d/e/1FAIpQLScGiobgT6Iq2Nu5ZTIYIoZJ07NakZ8d6SzIr58yBqb5Jl1QVQ/closedform",

    // TODO: replace with your real "Need a Team" Google Doc/Form share link
    needATeamForm: "https://docs.google.com/forms/d/e/1FAIpQLScGiobgT6Iq2Nu5ZTIYIoZJ07NakZ8d6SzIr58yBqb5Jl1QVQ/viewform",

    // TODO: replace with your real "How to Register" written guide link (if separate from the video)
    howToRegister: "[HOW_TO_REGISTER_GUIDE_URL]",

    // TODO: replace VIDEO_ID with the real "How to Register" YouTube video ID (embed URL format)
    howToRegisterVideo: "https://www.youtube.com/embed/[HOW_TO_REGISTER_VIDEO_ID]",

    // TODO: replace VIDEO_ID with the real "What is ICPC" YouTube video ID
    whatIsIcpcVideo: "https://youtu.be/JB-WCVlZ30E?si=A1WFQJHp1xBQqNDh",

    // TODO: replace VIDEO_ID with the real 2024 highlights YouTube video ID
    amritapuri2024Highlights: "https://youtu.be/WjXCyD8Xkgo?si=LamPfSxfmaQPNrzI",

    // TODO: replace with the real Google Form link for the floating Help button
    helpForm: "https://docs.google.com/forms/d/e/1FAIpQLSdG5YSDJBEV35p19BvaS3VdkKHECket0MD4Tni0HnKSKWyjYw/viewform?usp=dialog",

    linkedin: "https://www.linkedin.com/company/icpc-asiawest-amritapuri",
    whatsappCommunity: "https://chat.whatsapp.com/Lxf9JfUmmvuHjgiZSzRPhx"
  },

  facts: {
    teamSize: "3 students per team",
    registrationFee: "1500/- Per Team",
    registrationLink: "[for Link, Click here ↑](https://docs.google.com/forms/d/e/1FAIpQLScGiobgT6Iq2Nu5ZTIYIoZJ07NakZ8d6SzIr58yBqb5Jl1QVQ/closedform)",
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
