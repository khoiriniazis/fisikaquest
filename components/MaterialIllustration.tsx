import type { ReactNode } from "react";

type MaterialIllustrationProps = { slug: string; title: string };

const drawings: Record<string, ReactNode> = {
  usaha: <>
    <path d="M60 224h400" stroke="#b8c9df" strokeWidth="4" strokeLinecap="round" />
    <rect x="190" y="150" width="116" height="74" rx="13" fill="#fff" stroke="#79a5df" strokeWidth="3" />
    <path d="M90 184h78m-15-15 16 15-16 15" fill="none" stroke="#e3a84b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M200 128h118m-14-13 15 13-15 13" fill="none" stroke="#5c8fda" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="90" y="160" fill="#a8772e" fontSize="15" fontWeight="700">Gaya F</text>
    <text x="222" y="117" fill="#547db8" fontSize="14" fontWeight="700">Perpindahan s</text>
    <circle cx="215" cy="208" r="5" fill="#bfd4f1" /><circle cx="282" cy="208" r="5" fill="#bfd4f1" />
  </>,
  "energi-kinetik": <>
    <path d="M65 225h390" stroke="#b8c9df" strokeWidth="4" strokeLinecap="round" />
    <path d="M102 205c35-78 100-91 151-47 43 37 91 44 143 7" fill="none" stroke="#dbe7f6" strokeWidth="13" strokeLinecap="round" />
    <circle cx="275" cy="156" r="36" fill="#fff" stroke="#e5b85f" strokeWidth="4" />
    <circle cx="265" cy="146" r="7" fill="#f7dfab" />
    <path d="M326 147h85m-17-14 17 14-17 14" fill="none" stroke="#5c8fda" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="332" y="128" fill="#547db8" fontSize="14" fontWeight="700">v</text>
    <text x="244" y="162" fill="#a07831" fontSize="13" fontWeight="700">Ek</text>
    <path d="M135 205v20m33-58v58m33-72v72" stroke="#a9bfdc" strokeWidth="3" strokeDasharray="5 6" />
  </>,
  "energi-potensial": <>
    <path d="M50 231h420" stroke="#b8c9df" strokeWidth="4" strokeLinecap="round" />
    <path d="M110 231V196h72v35m190 0v-70h72v70" fill="#eaf1fb" stroke="#a8bfdc" strokeWidth="3" />
    <rect x="342" y="93" width="68" height="66" rx="11" fill="#fff" stroke="#71ad98" strokeWidth="3" />
    <path d="M376 166v53m-10-13 10 14 10-14" fill="none" stroke="#658ec8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M321 158h110" stroke="#b9c8dc" strokeDasharray="5 6" strokeWidth="2" />
    <text x="429" y="132" fill="#547db8" fontSize="15" fontWeight="700">h</text>
    <text x="351" y="130" fill="#548a76" fontSize="14" fontWeight="700">Ep</text>
    <circle cx="144" cy="184" r="15" fill="#cbdcf2" />
  </>,
  "kekekalan-energi": <>
    <path d="M65 216c83-2 106-131 190-131s103 131 200 131" fill="none" stroke="#bdcfea" strokeWidth="9" strokeLinecap="round" />
    <circle cx="255" cy="85" r="20" fill="#fff" stroke="#8f82c7" strokeWidth="4" />
    <circle cx="116" cy="181" r="17" fill="#fff" stroke="#658ed8" strokeWidth="4" />
    <circle cx="399" cy="180" r="17" fill="#fff" stroke="#e2ad50" strokeWidth="4" />
    <path d="M235 56V34m40 22V34" stroke="#9b91c6" strokeWidth="4" strokeLinecap="round" />
    <text x="214" y="30" fill="#7e72b5" fontSize="14" fontWeight="700">Ep tinggi</text>
    <text x="67" y="233" fill="#547db8" fontSize="13" fontWeight="700">Ek bertambah</text>
    <text x="354" y="233" fill="#ad873a" fontSize="13" fontWeight="700">Ek bertambah</text>
    <path d="M132 145c30-45 59-65 94-68m59 0c38 5 68 27 98 68" fill="none" stroke="#d4cdef" strokeWidth="3" strokeDasharray="6 7" />
  </>,
  daya: <>
    <path d="M68 226h385" stroke="#b8c9df" strokeWidth="4" strokeLinecap="round" />
    <path d="M110 226v-35h67v35m0 0v-35h67v35m0 0v-35h67v35" fill="#edf3fc" stroke="#a8bfdc" strokeWidth="3" />
    <circle cx="377" cy="111" r="49" fill="#fff" stroke="#78a4df" strokeWidth="4" />
    <path d="m377 111 23-23" stroke="#e4ae4f" strokeWidth="5" strokeLinecap="round" />
    <circle cx="377" cy="111" r="6" fill="#5c8fda" />
    <text x="359" y="178" fill="#547db8" fontSize="15" fontWeight="700">waktu</text>
    <path d="M135 168v-28m-10 12 10-13 10 13" fill="none" stroke="#5c8fda" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="84" y="123" fill="#a8772e" fontSize="14" fontWeight="700">Usaha</text>
  </>,
  "energi-pegas": <>
    <path d="M94 102v126m15-126v126" stroke="#a8bfdc" strokeWidth="5" strokeLinecap="round" />
    <path d="M109 164h28l12-28 20 56 20-56 20 56 20-56 20 56 14-28h24" fill="none" stroke="#779fd7" strokeWidth="5" strokeLinejoin="round" />
    <rect x="279" y="126" width="91" height="76" rx="12" fill="#fff" stroke="#d8ad5b" strokeWidth="4" />
    <path d="M382 164h63m-15-14 16 14-16 14" fill="none" stroke="#78a4df" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="143" y="116" fill="#547db8" fontSize="14" fontWeight="700">Pegas</text>
    <text x="306" y="170" fill="#a07831" fontSize="15" fontWeight="700">Epegas</text>
    <path d="M111 224h270" stroke="#b8c9df" strokeWidth="3" strokeDasharray="6 7" />
  </>,
};

export function MaterialIllustration({ slug, title }: MaterialIllustrationProps) {
  return <svg className="material-illustration" viewBox="0 0 520 280" role="img" aria-label={`Ilustrasi ${title}`}>
    <defs>
      <linearGradient id={`material-bg-${slug}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f5f8ff" />
        <stop offset="1" stopColor="#eaf2ff" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="520" height="280" rx="24" fill={`url(#material-bg-${slug})`} />
    <circle cx="463" cy="49" r="24" fill="#ffffff80" />
    <circle cx="56" cy="58" r="15" fill="#ffffff80" />
    {drawings[slug] ?? drawings.usaha}
  </svg>;
}
