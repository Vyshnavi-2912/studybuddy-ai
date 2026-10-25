import { EducationalVideo, MemeTemplate } from '../types';

export interface MemeImageResponse {
  success: boolean;
  imageUrl: string;
  prompt: string;
  provider: string;
}

export interface VideoSearchResponse {
  success: boolean;
  videos: EducationalVideo[];
  source: string;
  query: string;
  category?: string;
  message?: string;
}

// Client-side verified database for educational videos
export const CLIENT_EDUCATIONAL_DB: { category: string; keywords: string[]; videos: EducationalVideo[] }[] = [
{
    "category": "Transit Networks & Autonomous Systems",
    "keywords": [
      "transit network",
      "autonomous system",
      "bgp",
      "border gateway",
      "as routing",
      "peering",
      "isp backbone",
      "transit provider",
      "inter-domain",
      "tier 1 isp"
    ],
    "videos": [
      {
        "youtubeId": "V3P9pYq1uFE",
        "title": "BGP: The Routers that Stole the Internet",
        "channelTitle": "Computerphile",
        "duration": "11:20",
        "thumbnailUrl": "https://img.youtube.com/vi/V3P9pYq1uFE/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/V3P9pYq1uFE?rel=0",
        "caption": "How Autonomous Systems interconnect through Border Gateway Protocol (BGP) across the global Internet backbone."
      },
      {
        "youtubeId": "08x_d_3jH3M",
        "title": "BGP Routing Protocol Explained",
        "channelTitle": "NetworkChuck",
        "duration": "14:15",
        "thumbnailUrl": "https://img.youtube.com/vi/08x_d_3jH3M/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/08x_d_3jH3M?rel=0",
        "caption": "Autonomous Systems, AS numbers, eBGP vs iBGP peering, and transit paths."
      },
      {
        "youtubeId": "vEw0bF6c6sA",
        "title": "What is an Autonomous System (AS)?",
        "channelTitle": "Sunny Classroom",
        "duration": "6:45",
        "thumbnailUrl": "https://img.youtube.com/vi/vEw0bF6c6sA/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/vEw0bF6c6sA?rel=0",
        "caption": "Clear explanation of Autonomous Systems (AS) and how Tier 1, 2, and 3 transit networks route traffic."
      }
    ]
  },
  {
    "category": "Routing & Packet Forwarding",
    "keywords": [
      "routing",
      "forwarding",
      "routing table",
      "fib",
      "forwarding information base",
      "packet forwarding",
      "longest prefix match",
      "next hop",
      "router"
    ],
    "videos": [
      {
        "youtubeId": "1z0ULvg_pW8",
        "title": "How Routers Work: Routing vs Forwarding",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "9:12",
        "thumbnailUrl": "https://img.youtube.com/vi/1z0ULvg_pW8/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1z0ULvg_pW8?rel=0",
        "caption": "How routers inspect IP headers, consult the Forwarding Information Base (FIB), and switch packets to egress interfaces."
      },
      {
        "youtubeId": "J3X0e8qV18A",
        "title": "Routing vs Forwarding in Computer Networks",
        "channelTitle": "Gate Smashers",
        "duration": "7:40",
        "thumbnailUrl": "https://img.youtube.com/vi/J3X0e8qV18A/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/J3X0e8qV18A?rel=0",
        "caption": "The difference between the control plane (Routing Tables) and data plane (Forwarding)."
      },
      {
        "youtubeId": "W3q8Od5qJIo",
        "title": "Longest Prefix Match & Routing Tables",
        "channelTitle": "Sunny Classroom",
        "duration": "8:25",
        "thumbnailUrl": "https://img.youtube.com/vi/W3q8Od5qJIo/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/W3q8Od5qJIo?rel=0",
        "caption": "Step-by-step example of how routers perform Longest Prefix Matching on destination IPs."
      }
    ]
  },
  {
    "category": "Packet Switching vs Circuit Switching",
    "keywords": [
      "packet switching",
      "circuit switching",
      "store and forward",
      "datagram",
      "switching",
      "statistical multiplexing",
      "connectionless"
    ],
    "videos": [
      {
        "youtubeId": "1r9lq6WJ7e0",
        "title": "Packet Switching vs Circuit Switching",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "7:35",
        "thumbnailUrl": "https://img.youtube.com/vi/1r9lq6WJ7e0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1r9lq6WJ7e0?rel=0",
        "caption": "Animated comparison between dedicated circuit physical paths vs chunked packet store-and-forward routing."
      },
      {
        "youtubeId": "s4e_7mN6v4w",
        "title": "Circuit Switching vs Packet Switching with Examples",
        "channelTitle": "Gate Smashers",
        "duration": "10:18",
        "thumbnailUrl": "https://img.youtube.com/vi/s4e_7mN6v4w/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/s4e_7mN6v4w?rel=0",
        "caption": "Bandwidth reservation, call setup delays, datagram routing, and packet reassembly."
      },
      {
        "youtubeId": "6dG_rGzL1P0",
        "title": "How Packet Switching Works",
        "channelTitle": "Computerphile",
        "duration": "8:45",
        "thumbnailUrl": "https://img.youtube.com/vi/6dG_rGzL1P0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/6dG_rGzL1P0?rel=0",
        "caption": "Paul Baran and Donald Davies packet design that founded the architecture of ARPANET and the modern Internet."
      }
    ]
  },
  {
    "category": "Virtual Circuit Networks",
    "keywords": [
      "virtual circuit",
      "vc",
      "connection-oriented switching",
      "vci",
      "vpi",
      "atm",
      "frame relay",
      "virtual path"
    ],
    "videos": [
      {
        "youtubeId": "qQjH8_L4zRw",
        "title": "Virtual Circuit vs Datagram Networks",
        "channelTitle": "Gate Smashers",
        "duration": "9:05",
        "thumbnailUrl": "https://img.youtube.com/vi/qQjH8_L4zRw/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/qQjH8_L4zRw?rel=0",
        "caption": "Virtual circuit setup phase, VCI identifier translation at intermediate switches, and teardown."
      },
      {
        "youtubeId": "M7X8q2p9J4k",
        "title": "Virtual Circuits Explained",
        "channelTitle": "Sunny Classroom",
        "duration": "7:15",
        "thumbnailUrl": "https://img.youtube.com/vi/M7X8q2p9J4k/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/M7X8q2p9J4k?rel=0",
        "caption": "Permanent Virtual Circuits (PVC) and Switched Virtual Circuits (SVC) illustrated."
      }
    ]
  },
  {
    "category": "Subnetting & CIDR",
    "keywords": [
      "subnetting",
      "cidr",
      "subnet mask",
      "slash notation",
      "ip subnet",
      "network id",
      "host id",
      "prefix length"
    ],
    "videos": [
      {
        "youtubeId": "s_NStgWDoGQ",
        "title": "Subnet Mask Explained in 5 Minutes",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "5:40",
        "thumbnailUrl": "https://img.youtube.com/vi/s_NStgWDoGQ/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/s_NStgWDoGQ?rel=0",
        "caption": "How subnet masks split IP addresses into Network IDs and Host IDs via bitwise AND operations."
      },
      {
        "youtubeId": "ecCuyq-Wprc",
        "title": "Subnetting Mastery: Practical Step-by-Step Tutorial",
        "channelTitle": "NetworkChuck",
        "duration": "18:30",
        "thumbnailUrl": "https://img.youtube.com/vi/ecCuyq-Wprc/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/ecCuyq-Wprc?rel=0",
        "caption": "Fast binary math to find usable IP ranges, subnet boundaries, and broadcast addresses."
      },
      {
        "youtubeId": "rs39FWDhzDs",
        "title": "CIDR (Classless Inter-Domain Routing) Explained",
        "channelTitle": "Sunny Classroom",
        "duration": "8:10",
        "thumbnailUrl": "https://img.youtube.com/vi/rs39FWDhzDs/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/rs39FWDhzDs?rel=0",
        "caption": "Overcoming Class A, B, and C limitations with arbitrary prefix aggregation and route summarization."
      }
    ]
  },
  {
    "category": "Error Detection & CRC",
    "keywords": [
      "crc",
      "cyclic redundancy check",
      "error detection",
      "checksum",
      "polynomial",
      "fcs",
      "frame check sequence",
      "hamming code",
      "parity check"
    ],
    "videos": [
      {
        "youtubeId": "A9g6rTMblz4",
        "title": "Cyclic Redundancy Check (CRC) with Polynomial Division",
        "channelTitle": "Gate Smashers",
        "duration": "12:35",
        "thumbnailUrl": "https://img.youtube.com/vi/A9g6rTMblz4/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/A9g6rTMblz4?rel=0",
        "caption": "Step-by-step Modulo-2 binary division example showing transmitter CRC generation and receiver zero-remainder verification."
      },
      {
        "youtubeId": "w95Fk_4cZf0",
        "title": "CRC Generator Polynomial & Error Detection",
        "channelTitle": "Neso Academy",
        "duration": "10:45",
        "thumbnailUrl": "https://img.youtube.com/vi/w95Fk_4cZf0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/w95Fk_4cZf0?rel=0",
        "caption": "Mathematical formulation of polynomial codes, generator polynomials G(x), and FCS calculation."
      },
      {
        "youtubeId": "1X8sL_38y8A",
        "title": "Checksum and Error Detection in Computer Networks",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "6:50",
        "thumbnailUrl": "https://img.youtube.com/vi/1X8sL_38y8A/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1X8sL_38y8A?rel=0",
        "caption": "How one-complement checksums detect corrupted bytes in IP and TCP headers."
      }
    ]
  },
  {
    "category": "Flow Control & Sliding Window",
    "keywords": [
      "sliding window",
      "flow control",
      "go-back-n",
      "selective repeat",
      "stop and wait",
      "window size",
      "arq",
      "acknowledgment"
    ],
    "videos": [
      {
        "youtubeId": "x_w7qFv7jQ0",
        "title": "Sliding Window Protocol: Go-Back-N & Selective Repeat",
        "channelTitle": "Gate Smashers",
        "duration": "14:20",
        "thumbnailUrl": "https://img.youtube.com/vi/x_w7qFv7jQ0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/x_w7qFv7jQ0?rel=0",
        "caption": "Window size calculations, sequence number bounds, cumulative ACKs, and timer handling."
      },
      {
        "youtubeId": "LNuQv4r8K4c",
        "title": "Stop and Wait ARQ Flow Control",
        "channelTitle": "Neso Academy",
        "duration": "9:15",
        "thumbnailUrl": "https://img.youtube.com/vi/LNuQv4r8K4c/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/LNuQv4r8K4c?rel=0",
        "caption": "Sender waiting states, lost frames, lost ACKs, and timeout retransmission mechanisms."
      },
      {
        "youtubeId": "7Q4hW2Q4XzE",
        "title": "Flow Control in Computer Networks Animation",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "7:55",
        "thumbnailUrl": "https://img.youtube.com/vi/7Q4hW2Q4XzE/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/7Q4hW2Q4XzE?rel=0",
        "caption": "Preventing receiver buffer overflow with dynamic sliding window advertisements."
      }
    ]
  },
  {
    "category": "Medium Access Control & CSMA/CD",
    "keywords": [
      "csma",
      "csma/cd",
      "csma/ca",
      "carrier sense",
      "collision detection",
      "jam signal",
      "exponential backoff",
      "ethernet mac"
    ],
    "videos": [
      {
        "youtubeId": "KzSj1l6-F7g",
        "title": "CSMA/CD Explained with Animated Collision Example",
        "channelTitle": "Gate Smashers",
        "duration": "11:10",
        "thumbnailUrl": "https://img.youtube.com/vi/KzSj1l6-F7g/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/KzSj1l6-F7g?rel=0",
        "caption": "Carrier sensing, transmission slot timing, collision detection, and Binary Exponential Backoff formula."
      },
      {
        "youtubeId": "aK8T1eU3P6U",
        "title": "CSMA/CD Carrier Sense Multiple Access / Collision Detection",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "6:30",
        "thumbnailUrl": "https://img.youtube.com/vi/aK8T1eU3P6U/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/aK8T1eU3P6U?rel=0",
        "caption": "How devices share a single wire in Ethernet without constantly corrupting each other transmissions."
      },
      {
        "youtubeId": "vC3M2W1bK0k",
        "title": "CSMA/CD and Jamming Signal Explained",
        "channelTitle": "Sunny Classroom",
        "duration": "7:45",
        "thumbnailUrl": "https://img.youtube.com/vi/vC3M2W1bK0k/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/vC3M2W1bK0k?rel=0",
        "caption": "The role of 32-bit jam signals in alerting all stations on the cable to back off."
      }
    ]
  },
  {
    "category": "DNS Resolution",
    "keywords": [
      "dns",
      "domain name",
      "dns resolution",
      "root server",
      "tld",
      "authoritative nameserver",
      "recursive resolver",
      "dns record"
    ],
    "videos": [
      {
        "youtubeId": "27r4Bzuj5OI",
        "title": "DNS in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:18",
        "thumbnailUrl": "https://img.youtube.com/vi/27r4Bzuj5OI/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/27r4Bzuj5OI?rel=0",
        "caption": "How the phonebook of the Internet translates human domain names into IP addresses in milliseconds."
      },
      {
        "youtubeId": "mpQZVYPuDGU",
        "title": "How a DNS Server Works",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "4:59",
        "thumbnailUrl": "https://img.youtube.com/vi/mpQZVYPuDGU/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/mpQZVYPuDGU?rel=0",
        "caption": "Full recursive resolution walkthrough: Resolver -> Root (.) -> TLD (.com) -> Authoritative Nameserver."
      },
      {
        "youtubeId": "72snZctFFtA",
        "title": "DNS Explained Step by Step",
        "channelTitle": "NetworkChuck",
        "duration": "11:24",
        "thumbnailUrl": "https://img.youtube.com/vi/72snZctFFtA/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/72snZctFFtA?rel=0",
        "caption": "A, AAAA, MX, CNAME records and TTL caching explained."
      }
    ]
  },
  {
    "category": "HTTP & Web Architecture",
    "keywords": [
      "http",
      "https",
      "web architecture",
      "http request",
      "http response",
      "stateless",
      "tls handshake",
      "ssl"
    ],
    "videos": [
      {
        "youtubeId": "iYM2zFP3Zn0",
        "title": "HTTP in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:15",
        "thumbnailUrl": "https://img.youtube.com/vi/iYM2zFP3Zn0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/iYM2zFP3Zn0?rel=0",
        "caption": "HTTP/1.1 vs HTTP/2 vs HTTP/3, headers, status codes, and methods (GET, POST, PUT, DELETE)."
      },
      {
        "youtubeId": "T4Df5_cojAs",
        "title": "How HTTPS Works and SSL/TLS Handshake",
        "channelTitle": "Computerphile",
        "duration": "10:48",
        "thumbnailUrl": "https://img.youtube.com/vi/T4Df5_cojAs/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/T4Df5_cojAs?rel=0",
        "caption": "Asymmetric encryption exchange, session keys, and digital certificates protecting web traffic."
      }
    ]
  },
  // 1. OSI 7 Layers & Networking
  {
    category: 'OSI Model & Computer Networks',
    keywords: ['osi', '7 layer', 'open system', 'encapsulation', 'networking model', 'application layer', 'presentation layer', 'session layer', 'physical layer'],
    videos: [
      {
        youtubeId: 'vv4y_uOneC0',
        title: 'The 7 OSI Layers in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:14',
        thumbnailUrl: 'https://img.youtube.com/vi/vv4y_uOneC0/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/vv4y_uOneC0?rel=0',
        caption: 'Visual overview of how data travels across all seven layers from hardware to browser application.'
      },
      {
        youtubeId: 'LANW3m7EgmA',
        title: 'OSI Model Explained | Real World Network Tutorial',
        channelTitle: 'NetworkChuck',
        duration: '16:42',
        thumbnailUrl: 'https://img.youtube.com/vi/LANW3m7EgmA/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/LANW3m7EgmA?rel=0',
        caption: 'Practical deep dive into how packets are constructed and deconstructed across layers.'
      },
      {
        youtubeId: 'HEEnLZV2wGI',
        title: 'The OSI Model Demystified',
        channelTitle: 'PowerCert Animated Videos',
        duration: '8:30',
        thumbnailUrl: 'https://img.youtube.com/vi/HEEnLZV2wGI/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/HEEnLZV2wGI?rel=0',
        caption: 'Animated step-by-step visual walkthrough of each layer function.'
      }
    ]
  },

  // 2. TCP 3-Way Handshake & Transport
  {
    category: 'TCP / IP & Transport Layer',
    keywords: ['tcp', 'handshake', 'syn', 'ack', 'transport', 'udp', 'connection-oriented', 'three way handshake'],
    videos: [
      {
        youtubeId: 'bW_kWgY3vRU',
        title: 'TCP 3-Way Handshake Animation',
        channelTitle: 'NetworkChuck',
        duration: '8:45',
        thumbnailUrl: 'https://img.youtube.com/vi/bW_kWgY3vRU/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/bW_kWgY3vRU?rel=0',
        caption: 'Step-by-step Wireshark packet capture analysis of SYN, SYN-ACK, and ACK.'
      },
      {
        youtubeId: 'uwoD5YsGACg',
        title: 'TCP vs UDP in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:10',
        thumbnailUrl: 'https://img.youtube.com/vi/uwoD5YsGACg/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/uwoD5YsGACg?rel=0',
        caption: 'Contrasting reliable connection-oriented TCP vs lightweight connectionless UDP.'
      },
      {
        youtubeId: 'F27PLin3TV0',
        title: 'How the Internet Works - TCP/IP Protocol Suite',
        channelTitle: 'CrashCourse',
        duration: '11:45',
        thumbnailUrl: 'https://img.youtube.com/vi/F27PLin3TV0/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/F27PLin3TV0?rel=0',
        caption: 'How IP routes packets and TCP guarantees in-order byte delivery.'
      }
    ]
  },

  // 3. Java Inheritance & Object-Oriented Hierarchies
  {
    category: 'Java Inheritance & OOP',
    keywords: ['inheritance', 'java', 'polymorphism', 'oop', 'class', 'extends', 'subclass', 'superclass', 'overriding'],
    videos: [
      {
        youtubeId: 'zs3t17c0GnA',
        title: 'Java Inheritance Tutorial in 10 Minutes',
        channelTitle: 'Bro Code',
        duration: '9:54',
        thumbnailUrl: 'https://img.youtube.com/vi/zs3t17c0GnA/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/zs3t17c0GnA?rel=0',
        caption: 'Clear code examples of parent classes, super keyword, and method overriding.'
      },
      {
        youtubeId: '9JpDgfe54tc',
        title: 'Inheritance in Java Full Tutorial',
        channelTitle: 'Programming with Mosh',
        duration: '11:20',
        thumbnailUrl: 'https://img.youtube.com/vi/9JpDgfe54tc/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/9JpDgfe54tc?rel=0',
        caption: 'IS-A relationship, code reusability, and access modifiers in inheritance hierarchies.'
      },
      {
        youtubeId: '14Q1h8gMgn8',
        title: 'Inheritance in Java with Real-World Examples',
        channelTitle: 'Telusko',
        duration: '13:10',
        thumbnailUrl: 'https://img.youtube.com/vi/14Q1h8gMgn8/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/14Q1h8gMgn8?rel=0',
        caption: 'Single, Multilevel, and Hierarchical inheritance demonstrated in Java code.'
      }
    ]
  },

  // 4. Internet of Things (IoT) & Embedded Systems
  {
    category: 'Internet of Things (IoT)',
    keywords: ['iot', 'internet of things', 'mqtt', 'sensor', 'actuator', 'smart', 'embedded', 'edge computing', 'telemetry', 'arduino'],
    videos: [
      {
        youtubeId: '6mBO2vqLv38',
        title: 'How IoT Works — Internet of Things Architecture',
        channelTitle: 'IBM Technology',
        duration: '9:30',
        thumbnailUrl: 'https://img.youtube.com/vi/6mBO2vqLv38/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/6mBO2vqLv38?rel=0',
        caption: 'Explaining edge devices, telemetry protocol (MQTT), and cloud event stream processing.'
      },
      {
        youtubeId: 'QSIPNhOiMoE',
        title: 'What is IoT? | Internet of Things Explained',
        channelTitle: 'Simplilearn',
        duration: '7:50',
        thumbnailUrl: 'https://img.youtube.com/vi/QSIPNhOiMoE/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/QSIPNhOiMoE?rel=0',
        caption: 'Perception, network, and application layers of IoT ecosystem.'
      },
      {
        youtubeId: 'UrwWn6hzsqA',
        title: 'IoT Architecture Explained Step by Step',
        channelTitle: 'Edureka',
        duration: '14:25',
        thumbnailUrl: 'https://img.youtube.com/vi/UrwWn6hzsqA/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/UrwWn6hzsqA?rel=0',
        caption: 'Sensors, microcontrollers, gateways, cloud communication, and user interfaces.'
      }
    ]
  },

  // 5. Deadlocks & Operating Systems
  {
    category: 'Deadlocks & Concurrency',
    keywords: ['deadlock', 'coffman', 'circular wait', 'hold and wait', 'mutex', 'preemption', 'banker', 'dining philosophers', 'concurrency'],
    videos: [
      {
        youtubeId: 'UQiB9r9J7aU',
        title: 'Deadlock — Computerphile',
        channelTitle: 'Computerphile',
        duration: '8:15',
        thumbnailUrl: 'https://img.youtube.com/vi/UQiB9r9J7aU/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/UQiB9r9J7aU?rel=0',
        caption: 'Dr. Steve Bagley explains Coffman deadlock conditions and dining philosophers.'
      },
      {
        youtubeId: '2q0_174k61I',
        title: 'Deadlock in Operating Systems | Coffman Conditions',
        channelTitle: 'Gate Smashers',
        duration: '10:20',
        thumbnailUrl: 'https://img.youtube.com/vi/2q0_174k61I/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/2q0_174k61I?rel=0',
        caption: 'Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait conditions.'
      },
      {
        youtubeId: 'r_v_3yG_Bq0',
        title: 'Dining Philosophers Problem & Concurrency Deadlocks',
        channelTitle: 'Neso Academy',
        duration: '12:40',
        thumbnailUrl: 'https://img.youtube.com/vi/r_v_3yG_Bq0/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/r_v_3yG_Bq0?rel=0',
        caption: 'Classic Dijkstra synchronization problem and Banker\'s algorithm prevention.'
      }
    ]
  },

  // 6. Virtual Memory & Paging Architecture
  {
    category: 'Virtual Memory & Paging',
    keywords: ['virtual memory', 'paging', 'tlb', 'translation lookaside', 'page fault', 'mmu', 'segmentation', 'ram'],
    videos: [
      {
        youtubeId: 'qcBIvnQt0Bw',
        title: 'Virtual Memory & Paging Architecture',
        channelTitle: 'Computerphile',
        duration: '10:48',
        thumbnailUrl: 'https://img.youtube.com/vi/qcBIvnQt0Bw/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/qcBIvnQt0Bw?rel=0',
        caption: 'How the Operating System tricks processes into believing they possess contiguous memory.'
      },
      {
        youtubeId: 'V32H0X6_Krk',
        title: 'Paging & TLB Hit vs Miss Walkthrough',
        channelTitle: 'Neso Academy',
        duration: '14:15',
        thumbnailUrl: 'https://img.youtube.com/vi/V32H0X6_Krk/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/V32H0X6_Krk?rel=0',
        caption: 'Hardware cache lookup in Translation Lookaside Buffer.'
      },
      {
        youtubeId: 'qlH4-oHnBb8',
        title: 'Virtual Memory in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:20',
        thumbnailUrl: 'https://img.youtube.com/vi/qlH4-oHnBb8/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/qlH4-oHnBb8?rel=0',
        caption: 'Memory protection, swap space, and page tables made simple.'
      }
    ]
  },

  // 7. Binary Search & Algorithms
  {
    category: 'Binary Search & Algorithms',
    keywords: ['binary search', 'search algorithm', 'divide and conquer', 'logarithmic time', 'o(log n)', 'sorted array', 'search', 'algorithm'],
    videos: [
      {
        youtubeId: 'P3YID7liBug',
        title: '1.1 Binary Search - Divide and Conquer',
        channelTitle: 'Abdul Bari',
        duration: '14:22',
        thumbnailUrl: 'https://img.youtube.com/vi/P3YID7liBug/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/P3YID7liBug?rel=0',
        caption: 'In-depth algorithmic analysis of iterative and recursive Binary Search with step-by-step trace.'
      },
      {
        youtubeId: 'C9ee30n_CzI',
        title: 'Binary Search in 60 Seconds',
        channelTitle: 'Bro Code',
        duration: '1:00',
        thumbnailUrl: 'https://img.youtube.com/vi/C9ee30n_CzI/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/C9ee30n_CzI?rel=0',
        caption: 'Fast-paced visualization of middle index comparisons in sorted lists.'
      },
      {
        youtubeId: 'fDKIpRe8GW4',
        title: '10 Common Search & Sort Algorithms in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:40',
        thumbnailUrl: 'https://img.youtube.com/vi/fDKIpRe8GW4/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/fDKIpRe8GW4?rel=0',
        caption: 'Comparing Linear Search, Binary Search, Quick Sort, and Merge Sort complexities.'
      }
    ]
  },

  // 8. Database Normalization & SQL
  {
    category: 'Database Normalization & SQL',
    keywords: ['normalization', '1nf', '2nf', '3nf', 'database', 'sql', 'bcnf', 'functional dependency', 'redundancy', 'relational'],
    videos: [
      {
        youtubeId: 'GFQaEYEc8_8',
        title: 'Database Normalization Explained (1NF, 2NF, 3NF, BCNF)',
        channelTitle: 'Fireship',
        duration: '6:15',
        thumbnailUrl: 'https://img.youtube.com/vi/GFQaEYEc8_8/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/GFQaEYEc8_8?rel=0',
        caption: 'Removing redundancy and update anomalies in relational database design.'
      },
      {
        youtubeId: 'UrYLYV7WSHM',
        title: '1NF, 2NF, 3NF Normalization with Easy Examples',
        channelTitle: 'Gate Smashers',
        duration: '13:50',
        thumbnailUrl: 'https://img.youtube.com/vi/UrYLYV7WSHM/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/UrYLYV7WSHM?rel=0',
        caption: 'Step-by-step table decomposition based on primary keys and dependencies.'
      },
      {
        youtubeId: 'K74VO3qX3X8',
        title: 'Database Normalization Tutorial',
        channelTitle: 'Bro Code',
        duration: '8:40',
        thumbnailUrl: 'https://img.youtube.com/vi/K74VO3qX3X8/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/K74VO3qX3X8?rel=0',
        caption: 'Beginner-friendly visual guide to first, second, and third normal forms.'
      }
    ]
  },

  // 9. Data Structures
  {
    category: 'Data Structures',
    keywords: ['data structures', 'linked list', 'binary tree', 'stack', 'queue', 'array', 'graph', 'hash table', 'node'],
    videos: [
      {
        youtubeId: 'RBSGKlAnoiM',
        title: 'Algorithms and Data Structures in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:15',
        thumbnailUrl: 'https://img.youtube.com/vi/RBSGKlAnoiM/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/RBSGKlAnoiM?rel=0',
        caption: 'Introduction to basic data structures: Arrays, HashMaps, Trees, and Graphs.'
      },
      {
        youtubeId: '_t2G34wyibM',
        title: 'Data Structures: Crash Course Computer Science #14',
        channelTitle: 'CrashCourse',
        duration: '10:07',
        thumbnailUrl: 'https://img.youtube.com/vi/_t2G34wyibM/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/477jI5q0p3U?rel=0',
        caption: 'How memory stores arrays, matrices, structs, and pointer-linked nodes.'
      },
      {
        youtubeId: '7ghh67bJ4NA',
        title: 'Data Structures for Beginners',
        channelTitle: 'NeetCode',
        duration: '15:20',
        thumbnailUrl: 'https://img.youtube.com/vi/7ghh67bJ4NA/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/7ghh67bJ4NA?rel=0',
        caption: 'Visualizing arrays, pointers, stacks, queues, and linked list traversal.'
      }
    ]
  },

  // 10. Machine Learning & Neural Networks
  {
    category: 'Machine Learning & AI',
    keywords: ['machine learning', 'neural network', 'deep learning', 'gradient descent', 'backpropagation', 'artificial intelligence', 'model'],
    videos: [
      {
        youtubeId: 'aircAruvnKk',
        title: 'But what is a neural network? | Chapter 1, Deep Learning',
        channelTitle: '3Blue1Brown',
        duration: '19:13',
        thumbnailUrl: 'https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/aircAruvnKk?rel=0',
        caption: 'Visual intuition of weights, biases, and neuron activations in layered networks.'
      },
      {
        youtubeId: 'IHZwWFHWa-w',
        title: 'Gradient Descent, How Neural Networks Learn | Chapter 2',
        channelTitle: '3Blue1Brown',
        duration: '21:01',
        thumbnailUrl: 'https://img.youtube.com/vi/IHZwWFHWa-w/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/IHZwWFHWa-w?rel=0',
        caption: 'Mathematical derivation and visual representation of cost reduction.'
      }
    ]
  },

  // 11. Processes vs Threads
  {
    category: 'Operating Systems & Concurrency',
    keywords: ['process', 'thread', 'multithreading', 'context switch', 'fork', 'scheduling', 'cpu scheduling'],
    videos: [
      {
        youtubeId: 'u31qwQUeGuM',
        title: 'Threads vs Processes in 100 Seconds',
        channelTitle: 'Fireship',
        duration: '2:04',
        thumbnailUrl: 'https://img.youtube.com/vi/u31qwQUeGuM/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/u31qwQUeGuM?rel=0',
        caption: 'Fundamental differences between isolated address spaces and shared heap threads.'
      },
      {
        youtubeId: '477jI5q0p3U',
        title: 'Multithreading and Concurrency Explained',
        channelTitle: 'Computerphile',
        duration: '9:35',
        thumbnailUrl: 'https://img.youtube.com/vi/477jI5q0p3U/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/477jI5q0p3U?rel=0',
        caption: 'Race conditions, critical sections, and semaphores.'
      }
    ]
  },

  // 12. Python Programming
  {
    category: 'Python Programming',
    keywords: ['python', 'def', 'list comprehension', 'python oop', 'dunder', 'lambda'],
    videos: [
      {
        youtubeId: 'kqtD5dpn9C8',
        title: 'Python for Beginners - Full Course',
        channelTitle: 'Programming with Mosh',
        duration: '1:00:15',
        thumbnailUrl: 'https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/kqtD5dpn9C8?rel=0',
        caption: 'Complete introduction to Python syntax, functions, data structures, and OOP.'
      },
      {
        youtubeId: 'xk4_1vDrzzo',
        title: 'Python Object Oriented Programming (OOP)',
        channelTitle: 'Tech With Tim',
        duration: '31:18',
        thumbnailUrl: 'https://img.youtube.com/vi/xk4_1vDrzzo/hqdefault.jpg',
        embedUrl: 'https://www.youtube-nocookie.com/embed/xk4_1vDrzzo?rel=0',
        caption: 'Classes, instances, inheritance, and methods explained with clean Python code.'
      }
    ]
  }
];

export const apiService = {
  /**
   * Generates a real AI image for an educational meme.
   */
  async generateMemeImage(params: {
    topicName: string;
    template: MemeTemplate;
    visualPrompt?: string;
    topText?: string;
    bottomText?: string;
    openaiApiKey?: string;
  }): Promise<MemeImageResponse> {
    try {
      // 1. Attempt backend API first
      const res = await fetch('/api/generate-meme-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.imageUrl) {
          return data;
        }
      } else if (res.status === 429) {
        throw new Error('Image generation rate limit reached on provider. Please try again shortly or configure an API key in Settings.');
      }
    } catch (e: any) {
      if (e.message && e.message.includes('rate limit')) {
        throw e;
      }
      console.warn('Backend image endpoint unavailable, falling back to direct FLUX stream:', e);
    }

    // 2. Client-side Pollinations Turbo AI generation (fast 1-2s response)
    const seed = Math.floor(Math.random() * 999999);
    const cleanTopic = params.topicName.replace(/[^\w\s-]/g, '').trim();
    const prompt = `Educational comic meme illustration about ${cleanTopic}: ${params.visualPrompt || params.template}. Colorful funny educational cartoon style, meme format, highly detailed, expressive characters, clean digital art.`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.slice(0, 250))}?width=600&height=600&model=turbo&seed=${seed}&nologo=true`;

    return {
      success: true,
      imageUrl,
      prompt,
      provider: 'pollinations-turbo-direct',
    };
  },

  /**
   * Searches for real educational videos matching the topic.
   * Returns genuinely matched videos or an honest empty list with search instructions.
   */
  async searchVideos(query: string, apiKey?: string): Promise<EducationalVideo[]> {
    if (!query || !query.trim()) return [];

    try {
      const res = await fetch(`/api/search-videos?query=${encodeURIComponent(query)}&apiKey=${encodeURIComponent(apiKey || '')}`);
      if (res.ok) {
        const data = await res.json();
        if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
          return data.videos;
        }
      }
    } catch (e) {
      console.warn('Backend video search endpoint unavailable, using client-side semantic matcher:', e);
    }

    // Client-side precision fallback matching
    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = cleanQuery.split(/[\s,._\-+/]+/).filter(w => w.length > 1);

    const GENERIC_STOPWORDS = new Set([
      'the', 'and', 'for', 'with', 'model', 'system', 'systems', 'network', 'networks', 
      'protocol', 'protocols', 'layer', 'layers', 'concept', 'concepts', 'introduction', 
      'basics', 'overview', 'architecture', 'process', 'management', 'in', 'of', 'to', 'a', 'an'
    ]);

    let bestEntry: typeof CLIENT_EDUCATIONAL_DB[0] | null = null;
    let maxScore = 0;

    for (const entry of CLIENT_EDUCATIONAL_DB) {
      let score = 0;
      const categoryLower = entry.category.toLowerCase();

      // 1. Direct Category Match Bonus
      if (categoryLower === cleanQuery || cleanQuery.includes(categoryLower) || categoryLower.includes(cleanQuery)) {
        score += 60;
      }

      // 2. Multi-word phrase matches (high confidence signal)
      for (const kw of entry.keywords) {
        const kwLower = kw.toLowerCase();
        if (cleanQuery.includes(kwLower)) {
          score += kwLower.length * 8;
        } else if (kwLower.includes(cleanQuery) && cleanQuery.length > 3) {
          score += cleanQuery.length * 5;
        }
      }

      // 3. Significant token-level matching (excluding generic stopwords)
      for (const token of queryTokens) {
        if (GENERIC_STOPWORDS.has(token)) {
          continue;
        }

        if (categoryLower.includes(token)) {
          score += token.length * 4;
        }

        for (const kw of entry.keywords) {
          const kwLower = kw.toLowerCase();
          const kwWords = kwLower.split(/[\s,._\-+/]+/);
          if (kwWords.includes(token)) {
            score += token.length * 6;
          } else if (kwLower.includes(token)) {
            score += token.length * 2;
          }
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestEntry = entry;
      }
    }

    if (bestEntry && maxScore >= 6) {
      return bestEntry.videos;
    }

    // Do NOT return fake or unrelated videos (like OSI model for Java). Return empty so UI shows honest search button.
    return [];
  },

  /**
   * Downloads a composite meme image with overlay text using HTML5 Canvas.
   */
  async downloadMemeImage(
    imageUrl: string,
    topText: string,
    bottomText: string,
    topicName: string
  ): Promise<void> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not create canvas context');

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 800;

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Configure text style
        const fontSize = Math.max(24, Math.floor(canvas.width / 20));
        ctx.font = `900 ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(4, Math.floor(fontSize / 6));
        ctx.lineJoin = 'round';

        // Helper to wrap text
        const wrapText = (text: string, yStart: number, maxW: number) => {
          const words = text.split(' ');
          let line = '';
          const lines = [];
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxW && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }
          lines.push(line);

          lines.forEach((l, idx) => {
            const y = yStart + idx * (fontSize * 1.2);
            ctx.strokeText(l.trim(), canvas.width / 2, y);
            ctx.fillText(l.trim(), canvas.width / 2, y);
          });
        };

        const maxTextWidth = canvas.width - 60;
        if (topText) {
          wrapText(topText.toUpperCase(), fontSize * 1.3, maxTextWidth);
        }
        if (bottomText) {
          wrapText(bottomText.toUpperCase(), canvas.height - fontSize * 2.5, maxTextWidth);
        }

        // Watermark/branding
        ctx.font = `600 ${Math.floor(fontSize * 0.45)}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'right';
        ctx.fillText('StudyBuddy AI', canvas.width - 20, canvas.height - 15);

        // Trigger download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `StudyBuddy-Meme-${topicName.replace(/\s+/g, '_')}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      };

      img.onerror = () => {
        // Fallback: download direct image URL
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `StudyBuddy-Meme-${topicName.replace(/\s+/g, '_')}.jpg`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      };

      img.src = imageUrl;
    });
  }
};
