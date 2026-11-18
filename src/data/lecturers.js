/**
 * ============================================================
 * LECTURER / AGENT DATA
 * ============================================================
 * This is the ONLY file you usually need to edit to add, remove,
 * or change lecturers. The UI is fully data-driven — nothing else
 * needs to change when you edit this array.
 *
 * PHOTOS: taruh SEMUA file foto (persis nama aslinya, termasuk
 * spasi/tanda kurung/ekstensi .jpg vs .jpeg) ke dalam
 * src/assets/images/
 * ============================================================
 */

import ifn from "../assets/images/direktur.jpeg";
import qlb from "../assets/images/buqilba.jpg";
import aik from "../assets/images/pakade2.jpg";
import shc from "../assets/images/busasmi.jpeg";
import who from "../assets/images/budhea.jpeg";
import wra from "../assets/images/budwina.jpeg";
import dwn from "../assets/images/budewi.jpg";
import det from "../assets/images/Pakdeki.jpg";
import ilr from "../assets/images/PakRony.jpg";
import mse from "../assets/images/PakSholeh.jpg";
import ark from "../assets/images/pakarif.jpeg";
import ziz from "../assets/images/Pakaziz.jpg";
import yzn from "../assets/images/pakyumna.jpeg";
import fre from "../assets/images/PakRozi.jpg";
import chs from "../assets/images/bucitra.jpeg";
import hmw from "../assets/images/pakahmad.jpeg";
import prq from "../assets/images/BuPutriRizqiyah.jpg";
import dis from "../assets/images/pak ardi.jpg";
import ipj from "../assets/images/pakeka.jpg";
import ptm from "../assets/images/buputri (2).jpeg";
import trm from "../assets/images/butiara (1).jpg";
import pth from "../assets/images/bupuspita.jpeg";
import urd from "../assets/images/pakhadian.jpg";
import mdf from "../assets/images/pakferdi.png";
import hzn from "../assets/images/buhafiza.png";
import nra from "../assets/images/buNurul.jpg";

export const lecturers = [
  {
    code: "IFN",
    name: "Prof. Dr. Ir. Irfan Darmawan",
    degree: "S.T., M.T., IPU",
    expertise: ["DIREKTUR TELKOM UNIVERSITY JAKARTA"],
    image: ifn,
  },
  {
    code: "QLB",
    name: "Qilbaaini Effendi Muftikhali",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Information System",
      "Manajemen Sistem Informasi",
      "Manajemen Investasi TI",
      "SCRUM",
    ],
    image: qlb,
  },
  {
    code: "AIK",
    name: "Dr. Ade Rahmat Iskandar",
    degree: "S.Kom., M.T.",
    expertise: ["Database", "Datawarehouse", "Information System"],
    image: aik,
  },
  {
    code: "SHC",
    name: "Sasmi Hidayatul Yulianing Tyas",
    degree: "S.Kom., M.Kom.",
    expertise: ["Datamining", "Manajemen Sistem Informasi"],
    image: shc,
  },
  {
    code: "WHO",
    name: "Dea Wemona Rahma",
    degree: "S.Kom., M.T.I.",
    expertise: [
      "Electronic Commerce",
      "Manajemen Informasi",
      "Pemodelan Proses Bisnis",
      "Manajemen Proyek TI",
    ],
    image: who,
  },
  {
    code: "WRA",
    name: "Dwina Satrinia",
    degree: "S.Kom., M.T.",
    expertise: ["Datamining", "Business Intelligence", "Big Data"],
    image: wra,
  },
  {
    code: "DWN",
    name: "Dewi Marini Umi Atmaja",
    degree: "S.Kom., M.Kom.",
    expertise: ["Artificial Intelligence", "Sistem Informasi dan Data Mining"],
    image: dwn,
  },
  {
    code: "DET",
    name: "Deki Satria",
    degree: "S.T., M.Kom.",
    expertise: [
      "Sistem Informasi",
      "Tata Kelola Sistem Informasi",
      "Smart City",
      "Penelitian Pengguna",
      "Rekayasa Perangkat Lunak",
    ],
    image: det,
  },
  {
    code: "ILR",
    name: "Ilham Roni Yansyah",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Artificial Intelligence",
      "Information System",
      "Software Engineer",
      "Knowledge Management",
    ],
    image: ilr,
  },
  {
    code: "MSE",
    name: "Muhammad Solehuddin",
    degree: "S.Si., M.Kom.",
    expertise: [
      "Software Engineer",
      "Decision Support System",
      "IT Governance",
      "Human Centered Engineering",
    ],
    image: mse,
  },
  {
    code: "ARK",
    name: "Arif Rahman Hakim",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Data Science",
      "Data Mining",
      "Machine Learning",
      "Artificial Intelligence",
      "Business Intelligence",
    ],
    image: ark,
  },
  {
    code: "ZIZ",
    name: "Muhammad Aziz Kurniawan",
    degree: "S.Si., M.T.",
    expertise: [
      "Information System",
      "UI/UX Design",
      "Mobile Application",
      "Educational Technology",
      "Project Management and Quality Assurance",
    ],
    image: ziz,
  },
  {
    code: "YZN",
    name: "Yumna Zahran Ramadhan",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Enterprise Resource Planning (ERP)",
      "Application Website",
      "Process Business Management",
    ],
    image: yzn,
  },
  {
    code: "FRE",
    name: "Fadhil Rozi Hendrawan",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "IT Governance",
      "Architecture Enterprise",
      "Data Governance",
      "Data Quality",
      "Management Knowledge",
    ],
    image: fre,
  },
  {
    code: "CHS",
    name: "Adelia Chitra Sazkia",
    degree: "S.Kom., M.Comp.Sc.",
    expertise: ["Machine Learning", "Cognitive Science", "Pedagogy"],
    image: chs,
  },
  {
    code: "HMW",
    name: "Ahmad Ridwan Fauzi",
    degree: "S.Kom., M.Sc., MBA.",
    expertise: ["Enterprise Software Development", "Artificial Intelligence", "Simulator"],
    image: hmw,
  },
  {
    code: "PRQ",
    name: "Putri Rizqiyah",
    degree: "S.Kom., M.Kom.",
    expertise: ["Machine Learning", "Natural Language Processing"],
    image: prq,
  },
  {
    code: "DIS",
    name: "Muhammad Ardiansyah",
    degree: "S.Kom., M.M.",
    expertise: ["Strategic Information Systems"],
    image: dis,
  },
  {
    code: "IPJ",
    name: "I Putu Eka Juliantara",
    degree: "S.T., M.Eng.",
    expertise: ["Human-Computer Interaction"],
    image: ipj,
  },
  {
    code: "PTM",
    name: "Putri Utami Rukmana",
    degree: "S.Kom., M.Kom.",
    expertise: ["Machine Learning", "Social Network Analysis", "Text Mining"],
    image: ptm,
  },
  {
    code: "TRM",
    name: "Tiara Rahmania Hadiningrum",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Software Engineering",
      "Software Quality",
      "Software Traceability",
      "Software Testing",
      "Artificial Intelligence",
    ],
    image: trm,
  },
  {
    code: "PTH",
    name: "Puspita Parahita Anindita",
    degree: "S.Kom., BInfTech, MSc.",
    expertise: ["Human-Computer Interactions"],
    image: pth,
  },
  {
    code: "URD",
    name: "Dr. Nur Hadian",
    degree: "S.Kom., M.Kom.",
    expertise: [
      "Information System",
      "IT Governance",
      "Digital Government",
      "Smart Village",
    ],
    image: urd,
  },
  {
    code: "MDF",
    name: "Muhammad Ferdi Kurniawan",
    degree: "S.Kom., M.T.I.",
    expertise: ["Internet of Things", "IT & Data Governance", "Artificial Intelligence"],
    image: mdf,
  },
  {
    code: "HZN",
    name: "Hafidza Safara Zahratunnisa",
    degree: "S.T., M.Kom.",
    expertise: ["Interaction Design"],
    image: hzn,
  },
  {
    code: "NRA",
    name: "Nurul Amalia",
    degree: "S.E.",
    expertise: ["Admisi"],
    image: nra,
  },
];