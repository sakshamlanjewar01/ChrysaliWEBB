// src/data/membersData.js

// ✅ If you don't have image link, it will show a placeholder
export const PLACEHOLDER =
  "https://dummyimage.com/600x600/ffffff/000000.png&text=Member";

// ✅ Google Drive "open?id=" -> direct image
const toDirectDrive = (url = "") => {
  if (!url) return "";
  const match = url.match(/id=([^&]+)/);
  if (match?.[1])
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
};

// ✅ Map of images
const IMAGE_MAP = {
  "Akshay Ajeet Singh":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768571693/Akshay_singh_kchfoe.png",

  "Priyanshi Jha":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768575869/Prii_kmam0v.png",

  "Jatin Thakur":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635105/IMG_0151_-_JATIN_THAKUR_bgpv5x.png",

  "Harsh Dhore":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635106/IMG_0718_-_Harsh_Chandrashekhar_Dhore_xglkls.png",

  "Nitin Kushwaha":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635105/profile-removebg-preview_1_-_Nitin_Kushwaha_cdyxah.png",

  "Aboli Faye":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635106/Abolifaye_-_ABOLI_FAYE_lo8ds1.png",

  "Naziya Kapadia":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635110/Naziya_Kapadia_-_Photo_-_NAZIYA_KAPADIA_duad2n.png",

  "Anjani Manthapurwar":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635104/IMG-20251203-WA0003_-_ANJANI_MANTHAPURWAR_caipla.png",

  "Shreya Pandey":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/IMG_20260115_141725_-_Shreya_Pandey_pucovh.jpg",

  "Rochit Gajpure":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/1000049630-removebg-preview_-_ROCHIT_GAJPURE_fgy1fl.png",

  "Gunjan Mourya":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768757830/IMG_20260113_075732-removebg-preview_-_Gunjan_Mourya_vxsi5a.png",

  "Omkar Barhanpure":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/1000051996-removebg-preview_-_OMKAR_BARHANPURE_d0wkq5.png",

  "Himanshu Topre":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/IMG_7390_-_Himanshu_Topre_bq0bh7.png",

  "Aditya Shandilya":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/1000504506-removebg-preview_-_ADITYA_SHANDILYA_sfl5mt.png",

  "Pratik Pande":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635103/IMG_20251102_195150_-_Pratik_Arun_Pande_qy8hab.jpg",

  "Vigyan Ranjan":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635101/75cdae73-5053-42ef-a459-dc3b40ddcf63-removebg-preview_-_Vigyan_Ranjan_mqlzlv.png",

  "Jahnavee Singh":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635100/17819-removebg-preview_-_Jahnavee_Singh_tvrh8x.png",

  "Tanisha Dalal":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768757957/file_00000000dad07209ba367b36fba8446c_-_Tanisha_Dalal_utaxvc.png",

  "Aarohi Shrivastav":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768757710/1000082997-removebg-preview_-_Aarohi_Ajay_Shrivastava_bxu7dy.png",

  "Arnav Chandekar":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635098/IMG_20260114_001142_-_BCA21_A1_Arnav_Raju_Chandekar_yior9e.jpg",

  "Bishwajeet Sanjay":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635096/1765215181775_-_Bishwajeet_Singh_gtdxsw.png",

  "Vritti Vasani":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635094/IMG_2867_-_Vritti_Vasani_ubhnrf.png",

  "Riya Singh":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635092/IMG_20260113_182732_-_RIYA_SINGH_hau6r7.png",

  "Gaurav Atram":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635083/8b50cc48-bb35-4db9-97f2-8f1a527e8974_-_Gaurav_Baburao_Atram_qzl0hl.png",

  "Isha Gughane":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635074/IMG-20260109-WA0016_-_Isha_Gughane_a45v44.jpg",

  "Annanya Kesharwani":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635074/26448-removebg-preview_-_Annanya_Kesharwani_vkjk4p.png",

  "Saksham Lanjewar":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738936026/IMG_20250206_211809818_HDR-removebg-preview_fo02b5.png",

  "Dhanashree Naik":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768636473/Dhanashree-Naik-removebg-preview_-_Dhanashree_Digambar_Naik_j19gi6.png",

  "Jay Sharma":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768757560/IMG-20260113-WA0001_-_Jay_Sharma_qgpiuk.jpg",

  "Sanjana Joshi":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635088/IMG_20260114_125302_-_SANJANA_SUNIL_JOSHI_qczqzz.png",

  "Aarya Saraf":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635078/file_0000000048847209bca1fee5e32b5951_1_-_Aarya_Atul_Saraf_b0k8oh.png",

  "Nishant Velhankar":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635076/IMG_7395_-_Nishant_Milind_Velhankar_rb872x.png",

  "Nihar Dongre":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635100/IMG-20260114-WA0022_-_Nihar_Dongre_oxmxu6.png",

  "Nikita Vaishnav":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635074/444e39d4-e0e0-4c05-a1f3-45b2b26fee3d_-_Nikita_Nandu_Vaishnav_h9kcy1.jpg",

  "Rainasha Gedam":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635085/IMG_6199_-_Rainasha_Gedam_ndbymf.jpg",

  "Janvi Parekh":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635087/IMG-20250609-WA0057-removebg-preview_-_Janvi_Nikunj_Parekh_ie9o2r.png",

  "Sejal Kashyab":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635088/Picsart_26-01-13_23-05-42-306_-_Sejal_Arvind_Kashyap_nk6kea.png",

  "Gurdeep Matharu":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635092/25c890ea-eb21-4a17-b37c-9395df7c048a_20240906_182027_0000_-_Gurdeep_Singh_Matharu_wphavb.png",

  "Pranita Shahankar":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635084/Image_to_PDF_20250118_21.55.33_1_-_PRANITA_MAHADEV_SHAHANKAR_n7epzb.png",

  "Gunjan Rathod":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635082/1000131727-removebg-preview_-_Gunjan_Rathod_buqonl.png",

  "Rukaiyya Opai":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635079/IMG_9936_-_Rukaiyya_Opai_ayo7rf.png",

  "Sanjana Kushwaha":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635077/IMG-20250909-WA0029_-_Sanjana_Kushwaha_xnqh6i.jpg",

  "Shweta Shrivastava":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635077/55602-removebg-preview_-_Shweta_Shrivastava_o1cgcb.png",

  "Shreyanshi Rahangdale":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635076/IMG_20250828_140824_-_Shreyanshi_Rahangdale_wldx0r.jpg",

  "Shlok Yadav":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635075/shlok_formal_pic-removebg-preview_-_Shlok_Yadav_ajlrdh.png",

  "Rishika Soni":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635075/1000076421-removebg-preview_-_Rishika_Rohit_Soni_mwxpzz.png",

  "Pralanshu Hedaoo":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738919443/pra-removebg-preview_m8suzy.png",

  "Ishita Shrivastava":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738919677/formal_photo1_-_Ishita_Shrivastava-removebg-preview.png",

  "Lucky Meena":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738919242/IMG-20250206-WA0008_-_LUCKY_MEENA-removebg-preview_mudz25.png",
  "Ayaan Sheik":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738988054/ayannobg_psezrl.jpg",

  "Vedant Halde":
    "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738866310/WhatsApp_Image_2025-02-06_at_23.53.00_33ca7dfc_xxrcdh.jpg",

  "Suraj Raut":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635101/IMG_20250707_173240_2_-_Suraj_Raut_iz9331.png",

  "Shristi Pal":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635101/IMG_20251108_154924_-_Shristi_Tridip_Pal_rdcmwd.png",

  "Omsai Gagar":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635088/IMG_20260113_230512_-_Omsai_Rajendra_Gagare_emak3w.jpg",

  "Sarthak Tiwari":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635081/Document_from_Sarthak_%EF%B8%8F__-_Sarthak_w8czjq.png",

  "Vinay Chalsani":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768641131/7143b3bc-b613-4f87-a606-42a6dcca4be7.png",

  "Shreya Nimje":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768635074/image_shreya_-_Shreya_Ravindra_Nimje_jnr93x.png",
  "Ayaan Ghanchi":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768756045/WhatsApp_Image_2026-01-17_at_2.59.28_PM_ujndgy.jpg",

  "Abhay Deshmukh":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768641533/WhatsApp_Image_2026-01-17_at_2.47.41_PM_1_e46tfx.jpg",
  "Aastha Wanjari":
    "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768756503/WhatsApp_Image_2026-01-17_at_3.16.55_PM_owncab.jpg",
};

// ✅ Name-safe image getter
export const getImage = (name) => {
  const cleaned = (name || "").trim();
  const url = IMAGE_MAP[cleaned];
  if (!url) return PLACEHOLDER;

  // drive convert (not needed now but safe)
  if (url.includes("drive.google.com")) return toDirectDrive(url);

  return url;
};

// ✅ Helper export for your photo-like grid
export const getMemberCard = (name, post) => ({
  title: (name || "").trim(),
  subtitle: post,
  image: getImage(name),
  url: "#",
});

// ✅ FULL MEMBERS LIST (sr 1 -> 31)
export const MEMBERS_LIST = [
  {
    sr: 1,
    post: "President",
    branch: "MCA 2nd Yr",
    names: ["Akshay Ajeet Singh"],
    contacts: [""],
  },
  {
    sr: 2,
    post: "Vice-President",
    branch: "BCA 2nd Yr",
    names: ["Priyanshi Jha"],
    contacts: [""],
  },
  {
    sr: 3,
    post: "Incharge Central SRC",
    branch: "MCA 2nd Yr",
    names: ["Jatin Thakur"],
    contacts: [""],
  },
  {
    sr: 4,
    post: "Incharge IQAC",
    branch: "MCA 1st Yr",
    names: ["Harsh Dhore"],
    contacts: [""],
  },
  {
    sr: 5,
    post: "Technical Head",
    branch: "MCA 2nd Yr",
    names: ["Nitin Kushwaha"],
    contacts: [""],
  },
  {
    sr: 6,
    post: "Cultural Head",
    branch: "MCA 2nd Yr",
    names: ["Aboli Faye"],
    contacts: [""],
  },
  {
    sr: 7,
    post: "Inaugural Head",
    branch: "MCA 2nd Yr",
    names: ["Naziya Kapadia"],
    contacts: [""],
  },
  {
    sr: 8,
    post: "Backdrop Head",
    branch: "MCA 2nd Yr",
    names: ["Anjani Manthapurwar"],
    contacts: [""],
  },
  {
    sr: 9,
    post: "Discipline Head",
    branch: "MCA 2nd Yr",
    names: ["Shreya Pandey"],
    contacts: [""],
  },
  {
    sr: 10,
    post: "Refreshment Head",
    branch: "MCA 2nd Yr",
    names: ["Rochit Gajpure"],
    contacts: [""],
  },
  {
    sr: 11,
    post: "Sports Head",
    branch: "MCA 2nd Yr",
    names: ["Gunjan Mourya", "Omkar Barhanpure"],
    contacts: ["", ""],
  },
  {
    sr: 12,
    post: "Sports Coordinator",
    branch: "MCA 1st Yr",
    names: ["Himanshu Topre"],
    contacts: [""],
  },
  {
    sr: 13,
    post: "Treasurer",
    branch: "MCA 2nd Yr",
    names: ["Aditya Shandilya"],
    contacts: [""],
  },
  {
    sr: 14,
    post: "Co-Treasurer",
    branch: "BCA 2nd Yr",
    names: ["Ayaan Ghanchi"],
    contacts: [""],
  },
  {
    sr: 15,
    post: "Secretary",
    branch: "MCA 1st Yr",
    names: ["Pratik Pande"],
    contacts: [""],
  },
  {
    sr: 16,
    post: "Joint-Secretary",
    branch: "BCA 1st Yr",
    names: ["Vigyan Ranjan"],
    contacts: [""],
  },
  {
    sr: 17,
    post: "Executive",
    branch: "MCA 2nd Yr / BCA 2nd Yr",
    names: ["Jahnavee Singh", "Tanisha Dalal"],
    contacts: ["", ""],
  },
  {
    sr: 18,
    post: "Co-Executive",
    branch: "MCA 1st Yr / BCA 1st Yr",
    names: [
      "Aarohi Shrivastav",
      "Shristi Pal",
      "Bishwajeet Sanjay",
      "Arnav Chandekar",
    ],
    contacts: ["", "", "", ""],
  },
  {
    sr: 19,
    post: "CR (MCA SEM-IV)",
    branch: "MCA 2nd Yr",
    names: ["Omkar Barhanpure", "Vedant Halde", "Pralanshu Hedaoo"],
    contacts: ["", "", ""],
  },
  {
    sr: 20,
    post: "LR (MCA SEM-IV)",
    branch: "MCA 2nd Yr",
    names: ["Vritti Vasani", "Riya Singh", "Ishita Shrivastava"],
    contacts: ["", "", ""],
  },
  {
    sr: 21,
    post: "CR (MCA SEM-II)",
    branch: "MCA 1st Yr",
    names: ["Gurdeep Matharu", "Vinay Chalsani", "Suraj Raut"],
    contacts: ["", "", ""],
  },
  {
    sr: 22,
    post: "LR (MCA SEM-II)",
    branch: "MCA 1st Yr",
    names: ["Janvi Parekh", "Sejal Kashyab", "Rainasha Gedam"],
    contacts: ["", "", ""],
  },
  {
    sr: 23,
    post: "CR (BCA)",
    branch: "BCA 2nd Yr",
    names: ["Ayaan Sheik"],
    contacts: [""],
  },
  {
    sr: 24,
    post: "LR (BCA)",
    branch: "BCA 2nd Yr",
    names: ["Pranita Shahankar"],
    contacts: [""],
  },
  {
    sr: 25,
    post: "CR (BCA)",
    branch: "BCA 1st Yr",
    names: ["Sarthak Tiwari"],
    contacts: [""],
  },
  {
    sr: 26,
    post: "LR (BCA)",
    branch: "BCA 1st Yr",
    names: ["Gunjan Rathod"],
    contacts: [""],
  },
  {
    sr: 27,
    post: "CDPC Coordinators",
    branch: "MCA 2nd Yr",
    names: [
      "Shreya Pandey",
      "Lucky Meena",
      "Nitin Kushwaha",
      "Jay Sharma",
      "Saksham Lanjewar",
      "Dhanashree Naik",
    ],
    contacts: ["", "", "", "", "", ""],
  },
  {
    sr: 28,
    post: "CDPC Coordinators",
    branch: "BCA 2nd Yr",
    names: ["Sanjana Joshi"],
    contacts: [""],
  },
  {
    sr: 29,
    post: "CDPC Coordinators",
    branch: "MCA 1st Yr",
    names: [
      "Nihar Dongre",
      "Aarya Saraf",
      "Nishant Velhankar",
      "Nikita Vaishnav",
      "Abhay Deshmukh",
      "Shreya Nimje",
    ],
    contacts: ["", "", "", "", "", ""],
  },
  {
    sr: 30,
    post: "CDPC Coordinator (BCA)",
    branch: "BCA 1st Yr",
    names: ["Omsai Gagar"],
    contacts: [""],
  },
  {
    sr: 31,
    post: "Committee Members",
    branch: "BCA/MCA",
    names: [
      "Rukaiyya Opai",
      "Sanjana Kushwaha",
      "Shweta Shrivastava",
      "Shreyanshi Rahangdale",
      "Shlok Yadav",
      "Rishika Soni",
      "Gaurav Atram",
      "Isha Gughane",
      "Annanya Kesharwani",
      "Aastha Wanjari",
    ],
    contacts: ["", "", "", "", "", "", "", "", "", ""],
  },
];
