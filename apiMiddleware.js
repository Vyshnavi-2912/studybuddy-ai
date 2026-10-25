// Shared API routes for Express server and Vite development server

export const VERIFIED_EDUCATIONAL_VIDEOS = [
  {
    "category": "Transit Networks & Autonomous Systems",
    "keywords": [
      "transit network",
      "transit networks",
      "autonomous system",
      "autonomous systems",
      "as number",
      "bgp",
      "border gateway",
      "inter-domain",
      "peering",
      "isp backbone",
      "transit provider",
      "tier 1 isp",
      "tier 2 isp",
      "as path",
      "exterior gateway protocol",
      "internet exchange point",
      "ixp"
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
      "forwarding table",
      "fib",
      "next hop",
      "longest prefix match",
      "dijkstra",
      "link state",
      "distance vector",
      "router",
      "packet forwarding",
      "ospf",
      "rip",
      "control plane",
      "data plane"
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
      "packet switch",
      "store and forward",
      "statistical multiplexing",
      "datagram network",
      "datagram",
      "message switching",
      "queuing delay",
      "packet loss",
      "bandwidth reservation"
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
        "caption": "Paul Baran and Donald Davies packet design that founded ARPANET and the modern Internet."
      }
    ]
  },
  {
    "category": "Virtual Circuit Networks",
    "keywords": [
      "virtual circuit",
      "virtual circuits",
      "vc",
      "vci",
      "vpi",
      "connection-oriented network",
      "atm network",
      "frame relay",
      "label switching",
      "mpls",
      "virtual path",
      "connection-oriented switching"
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
      "subnet",
      "cidr",
      "subnet mask",
      "slash notation",
      "ip prefix",
      "classless inter-domain",
      "variable length subnet mask",
      "vlsm",
      "host bits",
      "network bits",
      "ip address",
      "broadcast address"
    ],
    "videos": [
      {
        "youtubeId": "s_NStgWDoGQ",
        "title": "Subnet Mask Explained in 5 Minutes",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "5:28",
        "thumbnailUrl": "https://img.youtube.com/vi/s_NStgWDoGQ/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/s_NStgWDoGQ/hqdefault.jpg",
        "caption": "Visual breakdown of network bits vs host bits, default subnet masks, and prefix math."
      },
      {
        "youtubeId": "ecCuyq-Wprc",
        "title": "Subnetting Mastery - The Complete Series",
        "channelTitle": "Practical Networking",
        "duration": "16:15",
        "thumbnailUrl": "https://img.youtube.com/vi/ecCuyq-Wprc/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/ecCuyq-Wprc?rel=0",
        "caption": "Intuitive math tricks to calculate subnet ranges, usable hosts, and broadcast addresses."
      },
      {
        "youtubeId": "rs39FWDhzDs",
        "title": "CIDR Notation and IP Addressing",
        "channelTitle": "NetworkChuck",
        "duration": "12:40",
        "thumbnailUrl": "https://img.youtube.com/vi/rs39FWDhzDs/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/rs39FWDhzDs?rel=0",
        "caption": "Why classful addressing was replaced by Classless Inter-Domain Routing (CIDR)."
      }
    ]
  },
  {
    "category": "Error Detection & CRC",
    "keywords": [
      "crc",
      "cyclic redundancy check",
      "error detection",
      "error correction",
      "polynomial division",
      "generator polynomial",
      "checksum",
      "parity check",
      "crc-32",
      "crc-16",
      "hamming code",
      "bit error"
    ],
    "videos": [
      {
        "youtubeId": "A9g6rTMblz4",
        "title": "Cyclic Redundancy Check (CRC) with Polynomial Division",
        "channelTitle": "Gate Smashers",
        "duration": "11:10",
        "thumbnailUrl": "https://img.youtube.com/vi/A9g6rTMblz4/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/A9g6rTMblz4?rel=0",
        "caption": "Step-by-step XOR modulo-2 polynomial division showing CRC codeword sender and receiver verification."
      },
      {
        "youtubeId": "w95Fk_4cZf0",
        "title": "How CRC Works in Ethernet",
        "channelTitle": "Computerphile",
        "duration": "9:50",
        "thumbnailUrl": "https://img.youtube.com/vi/w95Fk_4cZf0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/w95Fk_4cZf0?rel=0",
        "caption": "Mathematical foundation of generator polynomials and frame check sequence (FCS)."
      },
      {
        "youtubeId": "1X8sL_38y8A",
        "title": "Checksum vs CRC vs Parity",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "6:42",
        "thumbnailUrl": "https://img.youtube.com/vi/1X8sL_38y8A/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1X8sL_38y8A?rel=0",
        "caption": "Comparing single parity bit checks, Internet checksum, and robust polynomial CRC."
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
      "piggybacking",
      "transmission delay",
      "propagation delay",
      "arq",
      "automatic repeat request"
    ],
    "videos": [
      {
        "youtubeId": "x_w7qFv7jQ0",
        "title": "Sliding Window Protocol: Go-Back-N & Selective Repeat",
        "channelTitle": "Gate Smashers",
        "duration": "13:20",
        "thumbnailUrl": "https://img.youtube.com/vi/x_w7qFv7jQ0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/x_w7qFv7jQ0?rel=0",
        "caption": "Sender window, receiver window, sequence number wrap-around, and cumulative vs individual acknowledgments."
      },
      {
        "youtubeId": "LNuQv4r8K4c",
        "title": "Flow Control in Computer Networks",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "7:55",
        "thumbnailUrl": "https://img.youtube.com/vi/LNuQv4r8K4c/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/LNuQv4r8K4c?rel=0",
        "caption": "Preventing fast senders from overwhelming slow receivers using sliding window buffers."
      },
      {
        "youtubeId": "7Q4hW2Q4XzE",
        "title": "Stop-and-Wait vs Sliding Window Protocol",
        "channelTitle": "Neso Academy",
        "duration": "10:45",
        "thumbnailUrl": "https://img.youtube.com/vi/7Q4hW2Q4XzE/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/7Q4hW2Q4XzE?rel=0",
        "caption": "Mathematical calculation of network utilization, bandwidth-delay product, and optimal window size."
      }
    ]
  },
  {
    "category": "Medium Access Control & CSMA/CD",
    "keywords": [
      "csma",
      "csma/cd",
      "csma/ca",
      "collision detection",
      "collision avoidance",
      "carrier sense",
      "exponential backoff",
      "aloha",
      "slotted aloha",
      "mac sublayer",
      "shared channel",
      "jamming signal",
      "collision domain"
    ],
    "videos": [
      {
        "youtubeId": "KzSj1l6-F7g",
        "title": "CSMA/CD Explained with Animated Collision Example",
        "channelTitle": "Gate Smashers",
        "duration": "8:55",
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
      "domain name system",
      "dns resolution",
      "root server",
      "tld",
      "authoritative nameserver",
      "recursive resolver",
      "dns record",
      "a record",
      "cname",
      "dns lookup",
      "nameserver"
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
      "ssl",
      "rest api",
      "http/2",
      "http/3",
      "status code",
      "headers",
      "get request",
      "post request"
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
  {
    "category": "Data Link Layer & MAC Addressing",
    "keywords": [
      "data link",
      "data link layer",
      "mac address",
      "ethernet frame",
      "framing",
      "bit stuffing",
      "byte stuffing",
      "nic",
      "ethernet switch",
      "llc",
      "mac sublayer",
      "preamble",
      "node to node"
    ],
    "videos": [
      {
        "youtubeId": "4_zSIXb7tLQ",
        "title": "Data Link Layer Explained: Framing, Flow Control, and Error Detection",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "8:40",
        "thumbnailUrl": "https://img.youtube.com/vi/4_zSIXb7tLQ/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/4_zSIXb7tLQ?rel=0",
        "caption": "Framing, MAC addresses, NIC interfaces, switches, and node-to-node hop delivery."
      },
      {
        "youtubeId": "d_2mK_S1nIo",
        "title": "MAC Addresses & Ethernet Frames",
        "channelTitle": "NetworkChuck",
        "duration": "13:10",
        "thumbnailUrl": "https://img.youtube.com/vi/d_2mK_S1nIo/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/d_2mK_S1nIo?rel=0",
        "caption": "48-bit hex MAC addresses, OUI manufacturer prefixes, and unicast vs multicast frames."
      },
      {
        "youtubeId": "7CDP_Yf5W7w",
        "title": "Framing in Data Link Layer: Bit Stuffing & Byte Stuffing",
        "channelTitle": "Gate Smashers",
        "duration": "10:05",
        "thumbnailUrl": "https://img.youtube.com/vi/7CDP_Yf5W7w/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/7CDP_Yf5W7w?rel=0",
        "caption": "Delimiting frame boundaries using flag bytes and bit-stuffing 0 after five consecutive 1s."
      }
    ]
  },
  {
    "category": "OSI Model & Computer Networks",
    "keywords": [
      "osi",
      "osi model",
      "7 layer",
      "open systems interconnection",
      "encapsulation",
      "reference model",
      "protocol stack",
      "presentation layer",
      "session layer",
      "physical layer"
    ],
    "videos": [
      {
        "youtubeId": "vv4y_uOneC0",
        "title": "The 7 OSI Layers in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:14",
        "thumbnailUrl": "https://img.youtube.com/vi/vv4y_uOneC0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/vv4y_uOneC0?rel=0",
        "caption": "Visual overview of how data travels across all seven layers from hardware to browser application."
      },
      {
        "youtubeId": "LANW3m7EgmA",
        "title": "OSI Model Explained | Real World Network Tutorial",
        "channelTitle": "NetworkChuck",
        "duration": "16:42",
        "thumbnailUrl": "https://img.youtube.com/vi/LANW3m7EgmA/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/LANW3m7EgmA?rel=0",
        "caption": "Practical deep dive into how packets are constructed and deconstructed across layers."
      },
      {
        "youtubeId": "HEEnLZV2wGI",
        "title": "The OSI Model Demystified",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "8:30",
        "thumbnailUrl": "https://img.youtube.com/vi/HEEnLZV2wGI/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/HEEnLZV2wGI?rel=0",
        "caption": "Animated step-by-step visual walkthrough of each layer function."
      }
    ]
  },
  {
    "category": "TCP / IP & Transport Layer",
    "keywords": [
      "tcp",
      "handshake",
      "syn",
      "ack",
      "transport layer",
      "udp",
      "connection-oriented",
      "three way handshake",
      "tcp segment",
      "reliable delivery",
      "tcp vs udp"
    ],
    "videos": [
      {
        "youtubeId": "bW_kWgY3vRU",
        "title": "TCP 3-Way Handshake Animation",
        "channelTitle": "NetworkChuck",
        "duration": "8:45",
        "thumbnailUrl": "https://img.youtube.com/vi/bW_kWgY3vRU/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/bW_kWgY3vRU?rel=0",
        "caption": "Step-by-step Wireshark packet capture analysis of SYN, SYN-ACK, and ACK packets."
      },
      {
        "youtubeId": "uwoD5YsGACg",
        "title": "TCP vs UDP in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:10",
        "thumbnailUrl": "https://img.youtube.com/vi/uwoD5YsGACg/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/uwoD5YsGACg?rel=0",
        "caption": "Contrasting reliable connection-oriented TCP vs lightweight connectionless UDP."
      },
      {
        "youtubeId": "F27PLin3TV0",
        "title": "How the Internet Works - TCP/IP Protocol Suite",
        "channelTitle": "CrashCourse",
        "duration": "11:45",
        "thumbnailUrl": "https://img.youtube.com/vi/F27PLin3TV0/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/F27PLin3TV0?rel=0",
        "caption": "How IP routes packets and TCP guarantees in-order byte delivery."
      }
    ]
  },
  {
    "category": "Java Inheritance & OOP",
    "keywords": [
      "inheritance",
      "java",
      "object oriented",
      "oop",
      "polymorphism",
      "subclass",
      "superclass",
      "extends",
      "method overriding",
      "class hierarchy"
    ],
    "videos": [
      {
        "youtubeId": "zs3t17c0GnA",
        "title": "Java Inheritance Tutorial in 10 Minutes",
        "channelTitle": "Bro Code",
        "duration": "9:54",
        "thumbnailUrl": "https://img.youtube.com/vi/zs3t17c0GnA/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/zs3t17c0GnA?rel=0",
        "caption": "Clear code examples of parent classes, super keyword, and method overriding in Java."
      },
      {
        "youtubeId": "9JpDgfe54tc",
        "title": "Inheritance in Java Full Tutorial",
        "channelTitle": "Programming with Mosh",
        "duration": "11:20",
        "thumbnailUrl": "https://img.youtube.com/vi/9JpDgfe54tc/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/9JpDgfe54tc?rel=0",
        "caption": "IS-A relationship, code reusability, and access modifiers in inheritance hierarchies."
      }
    ]
  },
  {
    "category": "Internet of Things (IoT)",
    "keywords": [
      "iot",
      "internet of things",
      "mqtt",
      "sensor",
      "actuator",
      "edge computing",
      "iot gateway",
      "embedded systems",
      "smart sensors"
    ],
    "videos": [
      {
        "youtubeId": "QSIPNhOiMoE",
        "title": "Internet of Things (IoT) in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:18",
        "thumbnailUrl": "https://img.youtube.com/vi/QSIPNhOiMoE/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/QSIPNhOiMoE?rel=0",
        "caption": "Overview of connected physical devices, embedded microcontrollers, and wireless mesh networks."
      },
      {
        "youtubeId": "mzy84Vb_Gxk",
        "title": "IoT Architecture: Sensors, Gateways, Cloud",
        "channelTitle": "IBM Technology",
        "duration": "8:42",
        "thumbnailUrl": "https://img.youtube.com/vi/mzy84Vb_Gxk/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/mzy84Vb_Gxk?rel=0",
        "caption": "How sensor data travels from physical edge devices through MQTT brokers into enterprise analytics."
      }
    ]
  },
  {
    "category": "Deadlocks & Concurrency",
    "keywords": [
      "deadlock",
      "deadlocks",
      "coffman conditions",
      "circular wait",
      "mutual exclusion",
      "hold and wait",
      "no preemption",
      "banker algorithm",
      "resource allocation graph"
    ],
    "videos": [
      {
        "youtubeId": "U037sZ_772A",
        "title": "Deadlock — Computerphile",
        "channelTitle": "Computerphile",
        "duration": "8:25",
        "thumbnailUrl": "https://img.youtube.com/vi/U037sZ_772A/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/U037sZ_772A?rel=0",
        "caption": "Classic dining philosophers problem and how resource locks cause permanent execution freeze."
      },
      {
        "youtubeId": "8_m7t7Z8s0I",
        "title": "Deadlock Coffman Conditions & Banker's Algorithm",
        "channelTitle": "Gate Smashers",
        "duration": "12:10",
        "thumbnailUrl": "https://img.youtube.com/vi/8_m7t7Z8s0I/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/8_m7t7Z8s0I?rel=0",
        "caption": "The four necessary Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait."
      }
    ]
  },
  {
    "category": "Virtual Memory & Paging",
    "keywords": [
      "virtual memory",
      "paging",
      "page table",
      "tlb",
      "translation lookaside",
      "page fault",
      "mmu",
      "page replacement",
      "lru",
      "frame allocation"
    ],
    "videos": [
      {
        "youtubeId": "qcBIvnQt0Bw",
        "title": "Virtual Memory & Paging Architecture",
        "channelTitle": "PowerCert Animated Videos",
        "duration": "8:40",
        "thumbnailUrl": "https://img.youtube.com/vi/qcBIvnQt0Bw/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/qcBIvnQt0Bw?rel=0",
        "caption": "How CPU MMU maps virtual page addresses to physical RAM frames using page tables."
      },
      {
        "youtubeId": "2quOy5yE16o",
        "title": "Page Tables, TLB, and Page Faults",
        "channelTitle": "Computerphile",
        "duration": "11:15",
        "thumbnailUrl": "https://img.youtube.com/vi/2quOy5yE16o/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/2quOy5yE16o?rel=0",
        "caption": "Hardware TLB cache lookup and handling interrupt page faults from secondary swap storage."
      }
    ]
  },
  {
    "category": "Operating Systems Processes & Threads",
    "keywords": [
      "process",
      "thread",
      "threads",
      "multithreading",
      "context switch",
      "cpu scheduling",
      "pcb",
      "round robin",
      "fork",
      "inter-process communication"
    ],
    "videos": [
      {
        "youtubeId": "u31qwQUeGuM",
        "title": "Threads vs Processes in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:04",
        "thumbnailUrl": "https://img.youtube.com/vi/u31qwQUeGuM/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/u31qwQUeGuM?rel=0",
        "caption": "Fundamental differences between isolated address spaces and shared heap threads."
      },
      {
        "youtubeId": "477jI5q0p3U",
        "title": "Multithreading and Concurrency Explained",
        "channelTitle": "Computerphile",
        "duration": "9:35",
        "thumbnailUrl": "https://img.youtube.com/vi/477jI5q0p3U/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/477jI5q0p3U?rel=0",
        "caption": "Race conditions, critical sections, and semaphores."
      }
    ]
  },
  {
    "category": "Database Normalization & SQL",
    "keywords": [
      "normalization",
      "1nf",
      "2nf",
      "3nf",
      "database",
      "sql",
      "bcnf",
      "functional dependency",
      "redundancy",
      "relational schema",
      "foreign key"
    ],
    "videos": [
      {
        "youtubeId": "GFQaEYEc8_8",
        "title": "Database Normalization Explained (1NF, 2NF, 3NF, BCNF)",
        "channelTitle": "Fireship",
        "duration": "6:15",
        "thumbnailUrl": "https://img.youtube.com/vi/GFQaEYEc8_8/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/GFQaEYEc8_8?rel=0",
        "caption": "Removing redundancy and insertion/deletion anomalies in relational database design."
      },
      {
        "youtubeId": "K74VO3qX3X8",
        "title": "Database Normalization - 1NF, 2NF, 3NF",
        "channelTitle": "Decomplexify",
        "duration": "8:45",
        "thumbnailUrl": "https://img.youtube.com/vi/K74VO3qX3X8/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/K74VO3qX3X8?rel=0",
        "caption": "Beginner-friendly visual guide to first, second, and third normal forms."
      }
    ]
  },
  {
    "category": "Data Structures",
    "keywords": [
      "data structures",
      "linked list",
      "binary tree",
      "stack",
      "queue",
      "hash table",
      "graph traversal",
      "bst",
      "doubly linked list",
      "priority queue"
    ],
    "videos": [
      {
        "youtubeId": "RBSGKlAnoiM",
        "title": "Algorithms and Data Structures in 100 Seconds",
        "channelTitle": "Fireship",
        "duration": "2:15",
        "thumbnailUrl": "https://img.youtube.com/vi/RBSGKlAnoiM/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/RBSGKlAnoiM?rel=0",
        "caption": "Introduction to basic data structures: Arrays, HashMaps, Trees, and Graphs."
      },
      {
        "youtubeId": "7ghh67bJ4NA",
        "title": "Data Structures for Beginners",
        "channelTitle": "NeetCode",
        "duration": "15:20",
        "thumbnailUrl": "https://img.youtube.com/vi/7ghh67bJ4NA/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/7ghh67bJ4NA?rel=0",
        "caption": "Visualizing arrays, pointers, stacks, queues, and linked list traversal."
      }
    ]
  },
  {
    "category": "Binary Search & Algorithms",
    "keywords": [
      "binary search",
      "search algorithm",
      "divide and conquer",
      "logarithmic time",
      "o(log n)",
      "sorted array",
      "halving search space"
    ],
    "videos": [
      {
        "youtubeId": "P3YID7liBug",
        "title": "1.1 Binary Search - Divide and Conquer",
        "channelTitle": "Abdul Bari",
        "duration": "14:22",
        "thumbnailUrl": "https://img.youtube.com/vi/P3YID7liBug/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/P3YID7liBug?rel=0",
        "caption": "In-depth algorithmic analysis of iterative and recursive Binary Search with step-by-step trace."
      }
    ]
  },
  {
    "category": "Machine Learning & AI",
    "keywords": [
      "machine learning",
      "neural network",
      "deep learning",
      "gradient descent",
      "backpropagation",
      "artificial intelligence",
      "loss function",
      "activation function"
    ],
    "videos": [
      {
        "youtubeId": "aircAruvnKk",
        "title": "But what is a neural network? | Chapter 1, Deep Learning",
        "channelTitle": "3Blue1Brown",
        "duration": "19:13",
        "thumbnailUrl": "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/aircAruvnKk?rel=0",
        "caption": "Visual intuition of weights, biases, and neuron activations in layered networks."
      },
      {
        "youtubeId": "IHZwWFHWa-w",
        "title": "Gradient Descent, How Neural Networks Learn | Chapter 2",
        "channelTitle": "3Blue1Brown",
        "duration": "21:01",
        "thumbnailUrl": "https://img.youtube.com/vi/IHZwWFHWa-w/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/IHZwWFHWa-w?rel=0",
        "caption": "Mathematical derivation and visual representation of cost reduction."
      }
    ]
  },
  {
    "category": "Python Programming",
    "keywords": [
      "python",
      "python programming",
      "def",
      "list comprehension",
      "python oop",
      "dunder",
      "lambda function",
      "python dictionary"
    ],
    "videos": [
      {
        "youtubeId": "kqtD5dpn9C8",
        "title": "Python for Beginners - Full Course",
        "channelTitle": "Programming with Mosh",
        "duration": "1:00:15",
        "thumbnailUrl": "https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/kqtD5dpn9C8?rel=0",
        "caption": "Complete introduction to Python syntax, functions, data structures, and OOP."
      },
      {
        "youtubeId": "xk4_1vDrzzo",
        "title": "Python Object Oriented Programming (OOP)",
        "channelTitle": "Tech With Tim",
        "duration": "31:18",
        "thumbnailUrl": "https://img.youtube.com/vi/xk4_1vDrzzo/hqdefault.jpg",
        "embedUrl": "https://www.youtube-nocookie.com/embed/xk4_1vDrzzo?rel=0",
        "caption": "Classes, instances, inheritance, and methods explained with clean Python code."
      }
    ]
  }
];

export function handleGenerateMeme(body) {
  const { topicName, template, visualPrompt } = body || {};
  if (!topicName) {
    return { error: 'topicName is required', status: 400 };
  }

  const cleanTopic = topicName.replace(/[^\w\s-]/g, '').trim();
  const seed = Math.floor(Math.random() * 999999);
  const prompt = `Educational comic meme illustration about ${cleanTopic}: ${visualPrompt || template}. Colorful funny educational cartoon style, meme format, highly detailed, expressive characters, clean digital art.`;
  const encodedPrompt = encodeURIComponent(prompt.slice(0, 300));
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&model=flux&seed=${seed}&nologo=true`;

  return {
    status: 200,
    data: {
      success: true,
      imageUrl,
      prompt,
      provider: 'pollinations-flux'
    }
  };
}

export function handleSearchVideos(query) {
  if (!query) {
    return { error: 'Query is required', status: 400 };
  }

  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/[\s,._\-+/]+/).filter(w => w.length > 1);

  const GENERIC_STOPWORDS = new Set([
    'the', 'and', 'for', 'with', 'model', 'system', 'systems', 'network', 'networks', 
    'protocol', 'protocols', 'layer', 'layers', 'concept', 'concepts', 'introduction', 
    'basics', 'overview', 'architecture', 'process', 'management', 'in', 'of', 'to', 'a', 'an'
  ]);

  let bestEntry = null;
  let maxScore = 0;

  for (const entry of VERIFIED_EDUCATIONAL_VIDEOS) {
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

  // If a genuine match was found with adequate relevance (min score 6)
  if (bestEntry && maxScore >= 6) {
    return {
      status: 200,
      data: {
        success: true,
        videos: bestEntry.videos,
        source: 'verified-knowledge-base',
        category: bestEntry.category,
        query
      }
    };
  }

  return {
    status: 200,
    data: {
      success: true,
      videos: [],
      source: 'no-direct-match',
      query,
      message: `No pre-verified video in local index for "${query}". You can search YouTube directly or explore the block diagram.`
    }
  };
}