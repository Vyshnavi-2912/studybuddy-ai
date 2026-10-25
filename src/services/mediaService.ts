import { TopicConcept, ReelMedia, ReelCardType } from '../types';
import { diagramService } from './diagramService';

/**
 * Knowledge Base of verified educational diagrams and trusted videos.
 */
interface MediaEntry {
  category: string;
  keywords: string[];
  image: {
    url: string;
    caption: string;
    sourceCredit: string;
    diagramSvg?: string;
  };
  video?: {
    youtubeId: string;
    title: string;
    channelTitle: string;
    duration: string;
    caption: string;
  };
}

const EDUCATIONAL_MEDIA_DB: MediaEntry[] = [
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Transit Networks & Autonomous Systems Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "V3P9pYq1uFE",
      "title": "BGP: The Routers that Stole the Internet",
      "channelTitle": "Computerphile",
      "duration": "11:20",
      "caption": "How Autonomous Systems interconnect through Border Gateway Protocol (BGP) across the global Internet backbone."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Routing & Packet Forwarding Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "1z0ULvg_pW8",
      "title": "How Routers Work: Routing vs Forwarding",
      "channelTitle": "PowerCert Animated Videos",
      "duration": "9:12",
      "caption": "How routers inspect IP headers, consult the Forwarding Information Base (FIB), and switch packets to egress interfaces."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Packet Switching vs Circuit Switching Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "1r9lq6WJ7e0",
      "title": "Packet Switching vs Circuit Switching",
      "channelTitle": "PowerCert Animated Videos",
      "duration": "7:35",
      "caption": "Animated comparison between dedicated circuit physical paths vs chunked packet store-and-forward routing."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Virtual Circuit Networks Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "qQjH8_L4zRw",
      "title": "Virtual Circuit vs Datagram Networks",
      "channelTitle": "Gate Smashers",
      "duration": "9:05",
      "caption": "Virtual circuit setup phase, VCI identifier translation at intermediate switches, and teardown."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Subnetting & CIDR Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "s_NStgWDoGQ",
      "title": "Subnet Mask Explained in 5 Minutes",
      "channelTitle": "PowerCert Animated Videos",
      "duration": "5:28",
      "caption": "Visual breakdown of network bits vs host bits, default subnet masks, and prefix math."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Error Detection & CRC Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "A9g6rTMblz4",
      "title": "Cyclic Redundancy Check (CRC) with Polynomial Division",
      "channelTitle": "Gate Smashers",
      "duration": "11:10",
      "caption": "Step-by-step XOR modulo-2 polynomial division showing CRC codeword sender and receiver verification."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Flow Control & Sliding Window Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "x_w7qFv7jQ0",
      "title": "Sliding Window Protocol: Go-Back-N & Selective Repeat",
      "channelTitle": "Gate Smashers",
      "duration": "13:20",
      "caption": "Sender window, receiver window, sequence number wrap-around, and cumulative vs individual acknowledgments."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Medium Access Control & CSMA/CD Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "KzSj1l6-F7g",
      "title": "CSMA/CD Explained with Animated Collision Example",
      "channelTitle": "Gate Smashers",
      "duration": "8:55",
      "caption": "Carrier sensing, transmission slot timing, collision detection, and Binary Exponential Backoff formula."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "DNS Resolution Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "27r4Bzuj5OI",
      "title": "DNS in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:18",
      "caption": "How the phonebook of the Internet translates human domain names into IP addresses in milliseconds."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "HTTP & Web Architecture Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "iYM2zFP3Zn0",
      "title": "HTTP in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:15",
      "caption": "HTTP/1.1 vs HTTP/2 vs HTTP/3, headers, status codes, and methods (GET, POST, PUT, DELETE)."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Data Link Layer & MAC Addressing Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "4_zSIXb7tLQ",
      "title": "Data Link Layer Explained: Framing, Flow Control, and Error Detection",
      "channelTitle": "PowerCert Animated Videos",
      "duration": "8:40",
      "caption": "Framing, MAC addresses, NIC interfaces, switches, and node-to-node hop delivery."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "OSI Model & Computer Networks Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "vv4y_uOneC0",
      "title": "The 7 OSI Layers in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:14",
      "caption": "Visual overview of how data travels across all seven layers from hardware to browser application."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "TCP / IP & Transport Layer Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "bW_kWgY3vRU",
      "title": "TCP 3-Way Handshake Animation",
      "channelTitle": "NetworkChuck",
      "duration": "8:45",
      "caption": "Step-by-step Wireshark packet capture analysis of SYN, SYN-ACK, and ACK packets."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Java Inheritance & OOP Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "zs3t17c0GnA",
      "title": "Java Inheritance Tutorial in 10 Minutes",
      "channelTitle": "Bro Code",
      "duration": "9:54",
      "caption": "Clear code examples of parent classes, super keyword, and method overriding in Java."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Internet of Things (IoT) Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "QSIPNhOiMoE",
      "title": "Internet of Things (IoT) in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:18",
      "caption": "Overview of connected physical devices, embedded microcontrollers, and wireless mesh networks."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Deadlocks & Concurrency Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "U037sZ_772A",
      "title": "Deadlock — Computerphile",
      "channelTitle": "Computerphile",
      "duration": "8:25",
      "caption": "Classic dining philosophers problem and how resource locks cause permanent execution freeze."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Virtual Memory & Paging Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "qcBIvnQt0Bw",
      "title": "Virtual Memory & Paging Architecture",
      "channelTitle": "PowerCert Animated Videos",
      "duration": "8:40",
      "caption": "How CPU MMU maps virtual page addresses to physical RAM frames using page tables."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Operating Systems Processes & Threads Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "u31qwQUeGuM",
      "title": "Threads vs Processes in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:04",
      "caption": "Fundamental differences between isolated address spaces and shared heap threads."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Database Normalization & SQL Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "GFQaEYEc8_8",
      "title": "Database Normalization Explained (1NF, 2NF, 3NF, BCNF)",
      "channelTitle": "Fireship",
      "duration": "6:15",
      "caption": "Removing redundancy and insertion/deletion anomalies in relational database design."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Data Structures Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "RBSGKlAnoiM",
      "title": "Algorithms and Data Structures in 100 Seconds",
      "channelTitle": "Fireship",
      "duration": "2:15",
      "caption": "Introduction to basic data structures: Arrays, HashMaps, Trees, and Graphs."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Binary Search & Algorithms Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "P3YID7liBug",
      "title": "1.1 Binary Search - Divide and Conquer",
      "channelTitle": "Abdul Bari",
      "duration": "14:22",
      "caption": "In-depth algorithmic analysis of iterative and recursive Binary Search with step-by-step trace."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Machine Learning & AI Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "aircAruvnKk",
      "title": "But what is a neural network? | Chapter 1, Deep Learning",
      "channelTitle": "3Blue1Brown",
      "duration": "19:13",
      "caption": "Visual intuition of weights, biases, and neuron activations in layered networks."
    }
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
    "image": {
      "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "caption": "Python Programming Architectural Overview",
      "sourceCredit": "StudyBuddy Verified Knowledge Base"
    },
    "video": {
      "youtubeId": "kqtD5dpn9C8",
      "title": "Python for Beginners - Full Course",
      "channelTitle": "Programming with Mosh",
      "duration": "1:00:15",
      "caption": "Complete introduction to Python syntax, functions, data structures, and OOP."
    }
  }
];

const GENERIC_STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'model', 'system', 'systems', 'network', 'networks', 
  'protocol', 'protocols', 'layer', 'layers', 'concept', 'concepts', 'introduction', 
  'basics', 'overview', 'architecture', 'process', 'management', 'in', 'of', 'to', 'a', 'an'
]);

/**
 * Resolves media matching the topic using precision semantic keyword matching and clean fallbacks.
 */
export function resolveTopicMedia(
  topic: TopicConcept,
  subject?: string
): { visualImage: ReelMedia; educationalVideo?: ReelMedia } {
  const cleanQuery = `${topic.name} ${topic.definition} ${subject || ''}`.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/[\s,._\-+/]+/).filter(w => w.length > 1);

  // Find best match in verified database using precision scoring
  let bestMatch: MediaEntry | null = null;
  let maxScore = 0;

  for (const entry of EDUCATIONAL_MEDIA_DB) {
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
      bestMatch = entry;
    }
  }

  // Generate topic-grounded vector block diagram
  const blockDiagram = diagramService.generateBlockDiagram(topic, subject);
  const topicFlowchartSvg = blockDiagram.svgMarkup;

  // If a strong match is found in our educational database (min score 6)
  if (bestMatch && maxScore >= 6) {
    const visualImage: ReelMedia = {
      type: 'image',
      url: bestMatch.image.url,
      caption: blockDiagram.title || bestMatch.image.caption,
      sourceCredit: bestMatch.image.sourceCredit,
      diagramSvg: topicFlowchartSvg || bestMatch.image.diagramSvg,
    };

    let educationalVideo: ReelMedia | undefined;
    if (bestMatch.video) {
      educationalVideo = {
        type: 'video',
        url: `https://www.youtube-nocookie.com/embed/${bestMatch.video.youtubeId}?rel=0&modestbranding=1`,
        youtubeId: bestMatch.video.youtubeId,
        title: bestMatch.video.title,
        channelTitle: bestMatch.video.channelTitle,
        duration: bestMatch.video.duration,
        caption: bestMatch.video.caption,
        sourceCredit: `${bestMatch.video.channelTitle} via YouTube Education`,
      };
    }

    return { visualImage, educationalVideo };
  }

  // For custom / uploaded PDFs without a direct video match: Provide accurate topic-grounded process flowchart
  return {
    visualImage: {
      type: 'image',
      url: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80`,
      caption: blockDiagram.title,
      sourceCredit: `StudyBuddy AI Grounded Generator • Page ${topic.pageReference}`,
      diagramSvg: topicFlowchartSvg,
    },
    educationalVideo: undefined
  };
}
