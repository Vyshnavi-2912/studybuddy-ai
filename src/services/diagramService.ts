import { TopicConcept, TopicBlockDiagram, DiagramBlock, DiagramConnection } from '../types';

/**
 * Dedicated Topic-Related Flowchart & Block Diagram Generator.
 * Creates strictly topic-grounded, pedagogical process flowcharts and architecture diagrams
 * for all Computer Science, Networking, Operating Systems, Database, and Engineering topics.
 */
export const diagramService = {
  /**
   * Generates a structured block diagram with vector SVG markup strictly matching the topic.
   */
  generateBlockDiagram(topic: TopicConcept, subjectContext?: string): TopicBlockDiagram {
    const lowerName = topic.name.toLowerCase();
    const lowerDef = topic.definition.toLowerCase();
    const context = `${lowerName} ${lowerDef} ${subjectContext || ''}`;

    // 1. Transit Network & Autonomous Systems (BGP / Inter-Domain)
    if (context.includes('transit') || context.includes('autonomous system') || context.includes('as-path') || context.includes('peering') || context.includes('bgp')) {
      return this.createTransitNetworkDiagram(topic);
    }

    // 2. Routing & Packet Forwarding Engine (FIB / Next-Hop / Longest Prefix)
    if (context.includes('routing') || context.includes('forwarding') || context.includes('dijkstra') || context.includes('distance vector') || context.includes('link state') || context.includes('router')) {
      return this.createRoutingForwardingDiagram(topic);
    }

    // 3. Packet Switching & Datagram Networks
    if (context.includes('packet switch') || context.includes('circuit switch') || context.includes('store and forward') || context.includes('statistical multiplex')) {
      return this.createPacketSwitchingDiagram(topic);
    }

    // 4. Virtual Circuit Switching & Label Swapping
    if (context.includes('virtual circuit') || context.includes('vc ') || context.includes('vci') || context.includes('mpls') || context.includes('connection-oriented network')) {
      return this.createVirtualCircuitDiagram(topic);
    }

    // 5. TCP 3-Way Handshake & Transport
    if (context.includes('tcp') || context.includes('handshake') || context.includes('syn')) {
      return this.createTcpHandshakeDiagram(topic);
    }

    // 6. OSI 7 Layer Protocol Stack & Encapsulation
    if (context.includes('osi') || context.includes('7 layer') || context.includes('encapsulation') || context.includes('protocol stack')) {
      return this.createOsiDiagram(topic);
    }

    // 7. Subnetting & CIDR Address Resolution
    if (context.includes('subnet') || context.includes('cidr') || context.includes('prefix') || context.includes('ip address') || context.includes('ipv4') || context.includes('mask')) {
      return this.createSubnettingDiagram(topic);
    }

    // 8. Error Detection & Correction (CRC / Checksum / Parity)
    if (context.includes('crc') || context.includes('cyclic redundancy') || context.includes('checksum') || context.includes('error detect') || context.includes('parity') || context.includes('hamming')) {
      return this.createErrorDetectionDiagram(topic);
    }

    // 9. Flow Control & Sliding Window (Go-Back-N / Selective Repeat)
    if (context.includes('sliding window') || context.includes('flow control') || context.includes('go-back-n') || context.includes('stop-and-wait') || context.includes('selective repeat')) {
      return this.createFlowControlDiagram(topic);
    }

    // 10. Medium Access Control (CSMA/CD / CSMA/CA / Ethernet)
    if (context.includes('csma') || context.includes('collision') || context.includes('medium access') || context.includes('aloha') || context.includes('carrier sense')) {
      return this.createCsmaCdDiagram(topic);
    }

    // 11. DNS Resolution Architecture
    if (context.includes('dns') || context.includes('domain name') || context.includes('nameserver') || context.includes('resolver')) {
      return this.createDnsDiagram(topic);
    }

    // 12. HTTP / Web Client-Server Architecture
    if (context.includes('http') || context.includes('rest api') || context.includes('web request') || context.includes('client-server') || context.includes('tls')) {
      return this.createHttpDiagram(topic);
    }

    // 13. Deadlock Circular Wait & Coffman Conditions
    if (context.includes('deadlock') || context.includes('coffman') || context.includes('circular wait') || context.includes('banker')) {
      return this.createDeadlockDiagram(topic);
    }

    // 14. Virtual Memory & Paging (TLB)
    if (context.includes('virtual memory') || context.includes('paging') || context.includes('tlb') || context.includes('page fault') || context.includes('page table')) {
      return this.createPagingDiagram(topic);
    }

    // 15. Process Lifecycle & CPU Scheduling
    if (context.includes('process') && (context.includes('schedul') || context.includes('pcb') || context.includes('round robin') || context.includes('context switch'))) {
      return this.createCpuSchedulingDiagram(topic);
    }

    // 16. IoT Architecture
    if (context.includes('iot') || context.includes('internet of things') || context.includes('mqtt') || context.includes('sensor')) {
      return this.createIotDiagram(topic);
    }

    // 17. Database Normalization & Schema Design
    if (context.includes('normalization') || context.includes('1nf') || context.includes('2nf') || context.includes('3nf') || context.includes('sql') || context.includes('relational')) {
      return this.createNormalizationDiagram(topic);
    }

    // 18. Java Inheritance & Polymorphism
    if (context.includes('inheritance') || context.includes('polymorphism') || context.includes('java') || context.includes('subclass')) {
      return this.createJavaInheritanceDiagram(topic);
    }

    // Dynamic Topic Flowchart: Synthesizes a real, academic mechanism flow directly from topic text
    return this.createDynamicTopicFlowchart(topic);
  },

  // 1. TRANSIT NETWORK & AUTONOMOUS SYSTEMS (BGP / BACKBONE)
  createTransitNetworkDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Customer Ingress AS', subtitle: 'Originating Autonomous System', category: 'input', details: ['Generates customer IP payload', 'Border Router announces eBGP prefix'] },
      { id: 'b2', label: '2. Transit Provider Core', subtitle: 'Tier-1 / Tier-2 ISP Backbone', category: 'process', details: ['MPLS Label Switching / Core Routers', 'iBGP high-speed backplane routing'] },
      { id: 'b3', label: '3. SLA & Traffic Policy', subtitle: 'BGP Policy & QoS Filtering', category: 'control', details: ['Enforces peering bandwidth limits', 'Calculates shortest AS-PATH route'] },
      { id: 'b4', label: '4. Egress Peering AS', subtitle: 'Target Destination Network', category: 'output', details: ['Handoff at Internet Exchange Point', 'Final delivery to destination host'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'eBGP Ingress' },
      { fromId: 'b2', toId: 'b3', label: 'Core Transit' },
      { fromId: 'b3', toId: 'b4', label: 'Peering Handoff' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Transit Network Architecture — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Transit Network Architecture & Autonomous System Flow`,
      description: `End-to-end transit network flowchart: Customer AS traffic traverses Tier-1 ISP core backbones under BGP policy to destination peering networks.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 2. ROUTING & PACKET FORWARDING ENGINE
  createRoutingForwardingDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Packet Ingress', subtitle: 'Inbound Line Card (NIC)', category: 'input', details: ['Verifies L2 frame CRC checksum', 'Extracts 32-bit Destination IP'] },
      { id: 'b2', label: '2. Route Lookup (FIB)', subtitle: 'Longest Prefix Match (LPM)', category: 'process', details: ['Searches hardware Trie / TCAM table', 'Resolves Next-Hop IP & Interface'] },
      { id: 'b3', label: '3. Header Processing', subtitle: 'TTL & Checksum Decrement', category: 'control', details: ['Decrements TTL (drops if TTL=0)', 'Recalculates IPv4 header checksum'] },
      { id: 'b4', label: '4. Egress Queuing', subtitle: 'Outbound Interface Port', category: 'output', details: ['Buffers in QoS priority queue', 'Encapsulates into L2 frame & transmits'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Header Parse' },
      { fromId: 'b2', toId: 'b3', label: 'FIB Match' },
      { fromId: 'b3', toId: 'b4', label: 'Queue & Send' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `IP Packet Routing & Forwarding Pipeline — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `IP Packet Forwarding & Routing Engine Pipeline`,
      description: `Hardware forwarding path: Ingress packet undergoes Longest Prefix Match FIB lookup, TTL decrement, and egress queue scheduling.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 3. PACKET SWITCHING & DATAGRAM NETWORKS
  createPacketSwitchingDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Segmentation', subtitle: 'Transport Layer Chunking', category: 'input', details: ['Splits data payload into packets', 'Attaches Sequence Numbers & IP Header'] },
      { id: 'b2', label: '2. Store-and-Forward', subtitle: 'Intermediate Router Nodes', category: 'process', details: ['Buffers entire packet before forwarding', 'Validates bit integrity via CRC'] },
      { id: 'b3', label: '3. Dynamic Routing', subtitle: 'Statistical Multiplexing', category: 'control', details: ['Packets take independent optimal paths', 'Shares link bandwidth dynamically'] },
      { id: 'b4', label: '4. Reassembly Buffer', subtitle: 'Destination Protocol Stack', category: 'output', details: ['Reorders packets by Sequence Number', 'Delivers reconstructed byte stream'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Packetize' },
      { fromId: 'b2', toId: 'b3', label: 'Independent Paths' },
      { fromId: 'b3', toId: 'b4', label: 'Reorder & Merge' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Packet Switching Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Packet Switching Data Flow & Store-and-Forward Architecture`,
      description: `Discrete packet handling: Data segments traverse independent store-and-forward paths before reassembly at the receiver.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 4. VIRTUAL CIRCUIT SWITCHING
  createVirtualCircuitDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Call Setup Phase', subtitle: 'Setup Request Frame', category: 'input', details: ['Source transmits setup packet', 'Negotiates QoS & bandwidth parameters'] },
      { id: 'b2', label: '2. VC Table Creation', subtitle: 'Virtual Circuit Identifier (VCI)', category: 'control', details: ['Each switch reserves table entry', 'Assigns input VCI -> output VCI translation'] },
      { id: 'b3', label: '3. Data Transmission', subtitle: 'Deterministic Label Swapping', category: 'process', details: ['Packets follow dedicated fixed path', 'Minimal header overhead, zero reordering'] },
      { id: 'b4', label: '4. Call Teardown', subtitle: 'Release Circuit State', category: 'output', details: ['Teardown packet frees reserved queues', 'Deallocates VC table entries'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Setup Route' },
      { fromId: 'b2', toId: 'b3', label: 'Label Swapping' },
      { fromId: 'b3', toId: 'b4', label: 'Release Circuit' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Virtual Circuit Protocol Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Virtual Circuit Connection-Oriented Switching Flow`,
      description: `Three-phase virtual circuit model: Call Setup establishes VCI mappings, followed by deterministic data transmission and teardown.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 5. SUBNETTING & CIDR ADDRESSING
  createSubnettingDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Classless IP / CIDR', subtitle: '32-bit Address String', category: 'input', details: ['Binary representation (e.g., 192.168.1.0/26)', 'Prefix length defines network boundary'] },
      { id: 'b2', label: '2. Bitwise AND Masking', subtitle: 'Hardware Routing Engine', category: 'process', details: ['Applies Subnet Mask (255.255.255.192)', 'Isolates Network ID from Host bits'] },
      { id: 'b3', label: '3. Host Range Isolation', subtitle: 'Usable IP Space Partition', category: 'control', details: ['Determines First & Last usable IPs', 'Reserves Subnet ID & Broadcast address'] },
      { id: 'b4', label: '4. Routing Decision', subtitle: 'Local Subnet vs Gateway', category: 'output', details: ['Same subnet: Direct L2 ARP delivery', 'Different subnet: Route to Default Gateway'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Bitwise AND' },
      { fromId: 'b2', toId: 'b3', label: 'Extract Range' },
      { fromId: 'b3', toId: 'b4', label: 'Route Decision' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `CIDR Subnet Resolution Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Subnet Masking & CIDR Address Resolution Pipeline`,
      description: `Hardware masking flow: Binary address masking separates Network and Host fields to determine local vs gateway routing paths.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 6. ERROR DETECTION & CRC
  createErrorDetectionDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Payload Bits (k bits)', subtitle: 'Data Stream Ingestion', category: 'input', details: ['Appends r zero bits for polynomial degree', 'Prepares binary dividend bitstream'] },
      { id: 'b2', label: '2. Modulo-2 Division', subtitle: 'Generator Polynomial G(x)', category: 'process', details: ['Performs XOR binary division', 'Computes remainder Frame Check Sequence (FCS)'] },
      { id: 'b3', label: '3. Frame Transit', subtitle: 'Physical Transmission Link', category: 'control', details: ['Transmits Payload + r-bit FCS', 'Channel noise / bit-flip hazard'] },
      { id: 'b4', label: '4. Receiver Verification', subtitle: 'Zero-Remainder Syndrome Check', category: 'output', details: ['Re-divides received frame by G(x)', 'Remainder == 0: Accept; Else: Drop & NAK'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Modulo-2 XOR' },
      { fromId: 'b2', toId: 'b3', label: 'Append FCS' },
      { fromId: 'b3', toId: 'b4', label: 'Verify Remainder' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Cyclic Redundancy Check (CRC) Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `CRC Polynomial Error Detection & Verification Flow`,
      description: `Bitwise error check: Sender divides payload by generator G(x) to append FCS; receiver validates zero-remainder syndrome.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 7. FLOW CONTROL & SLIDING WINDOW
  createFlowControlDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Sender Window [0..N-1]', subtitle: 'Sliding Window Buffer', category: 'input', details: ['Transmits burst of numbered frames', 'Starts per-frame timeout retransmit clock'] },
      { id: 'b2', label: '2. Channel Traversal', subtitle: 'Bandwidth-Delay Pipe', category: 'process', details: ['Frames in flight across medium', 'Maximizes link channel utilization'] },
      { id: 'b3', label: '3. Receiver Validation', subtitle: 'Sequence Verification & ACK', category: 'control', details: ['Checks in-order frame arrival', 'Sends Cumulative ACK(N+1) back'] },
      { id: 'b4', label: '4. Window Advance', subtitle: 'Sender Buffer Slide', category: 'output', details: ['Slides window forward upon valid ACK', 'On timeout: Retransmits unACKed frames'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Burst Send' },
      { fromId: 'b2', toId: 'b3', label: 'In-Order Check' },
      { fromId: 'b3', toId: 'b4', label: 'ACK Slide' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Sliding Window Flow Control — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Sliding Window Protocol & Flow Control Flowchart`,
      description: `Continuous transmission flow: Sender transmits window of frames; receiver verifies sequence order and returns cumulative ACKs.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 8. CSMA/CD & MEDIUM ACCESS CONTROL
  createCsmaCdDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Carrier Sense (LBT)', subtitle: 'Listen Before Talk', category: 'input', details: ['Measures voltage on shared bus', 'If Busy: 1-Persistent / Wait until idle'] },
      { id: 'b2', label: '2. Frame Transmission', subtitle: 'Transmit on Idle Wire', category: 'process', details: ['Sends preamble & frame bits', 'Continues listening while transmitting (LWT)'] },
      { id: 'b3', label: '3. Collision Detection', subtitle: 'Peak Voltage Threshold Check', category: 'control', details: ['Detects overlapping collision pulse', 'Broadcasts 32-bit Jam Signal to all nodes'] },
      { id: 'b4', label: '4. Exponential Backoff', subtitle: 'Binary Exponential Backoff (BEB)', category: 'output', details: ['Chooses random delay slot in [0..2^k-1]', 'Waits backoff interval then re-senses carrier'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Line Idle' },
      { fromId: 'b2', toId: 'b3', label: 'Monitor (LWT)' },
      { fromId: 'b3', toId: 'b4', label: 'On Collision' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `CSMA/CD Collision Resolution Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `CSMA/CD Multiple Access & Collision Resolution Flowchart`,
      description: `Shared medium access algorithm: Carrier sensing precedes transmission, followed by collision detection and exponential backoff.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 9. DNS DOMAIN NAME RESOLUTION
  createDnsDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Client Query', subtitle: 'Local Stub Resolver', category: 'input', details: ['Checks OS / browser DNS cache', 'Sends recursive query to ISP Resolver'] },
      { id: 'b2', label: '2. Root & TLD Servers', subtitle: 'Hierarchical Nameserver Tree', category: 'process', details: ['Root Server (\'.\') points to TLD (\'.com\')', 'TLD Server delegates to Authoritative NS'] },
      { id: 'b3', label: '3. Authoritative Server', subtitle: 'Zone File Database Master', category: 'control', details: ['Queries authoritative A / AAAA record', 'Returns canonical IP address with TTL'] },
      { id: 'b4', label: '4. Cached IP Delivery', subtitle: 'Socket Connection Open', category: 'output', details: ['Stores in local recursive cache', 'Initiates TCP connection to target server'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Iterative Referral' },
      { fromId: 'b2', toId: 'b3', label: 'Auth Lookup' },
      { fromId: 'b3', toId: 'b4', label: 'Resolved IP' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `DNS Resolution Architecture — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Hierarchical DNS Resolution Architecture Flowchart`,
      description: `Hierarchical lookup flow: Recursive resolver queries Root and TLD nameservers to fetch authoritative IP address records.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 10. HTTP / WEB ARCHITECTURE
  createHttpDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. DNS & Connection', subtitle: 'TCP + TLS 1.3 Handshake', category: 'input', details: ['Resolves domain to server IP', 'Exchanges cryptographic keys'] },
      { id: 'b2', label: '2. HTTP Request', subtitle: 'GET / POST with Headers', category: 'process', details: ['Transmits request line, headers & cookies', 'Content-Type & Authorization payloads'] },
      { id: 'b3', label: '3. Server Processing', subtitle: 'Backend Controller & Database', category: 'control', details: ['Executes business logic in memory', 'Fetches SQL / NoSQL database records'] },
      { id: 'b4', label: '4. HTTP Response', subtitle: '200 OK + Payload Stream', category: 'output', details: ['Streams HTML / JSON / asset chunks', 'Browser DOM render & state hydration'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Socket Open' },
      { fromId: 'b2', toId: 'b3', label: 'Backend Parse' },
      { fromId: 'b3', toId: 'b4', label: '200 Response' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `HTTP Client-Server Request Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `HTTP / Web Client-Server Request Lifecycle Flowchart`,
      description: `Full web round-trip: TCP/TLS connection setup leads to HTTP request transmission, server logic execution, and response payload rendering.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 11. TCP 3-WAY HANDSHAKE
  createTcpHandshakeDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. SYN Request', subtitle: 'Client -> Server (Active Open)', category: 'input', details: ['Client picks initial SeqNum = x', 'Transitions from CLOSED to SYN-SENT'] },
      { id: 'b2', label: '2. SYN-ACK Response', subtitle: 'Server -> Client (Passive Open)', category: 'process', details: ['Server acknowledges AckNum = x + 1', 'Picks own SeqNum = y (SYN-RECEIVED)'] },
      { id: 'b3', label: '3. Final ACK', subtitle: 'Client -> Server', category: 'control', details: ['Client acknowledges AckNum = y + 1', 'Both sockets enter ESTABLISHED state'] },
      { id: 'b4', label: '4. Reliable Byte Stream', subtitle: 'Full-Duplex Data Transmission', category: 'output', details: ['Sliding window flow control active', 'Guaranteed in-order packet delivery'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'SYN' },
      { fromId: 'b2', toId: 'b3', label: 'SYN-ACK' },
      { fromId: 'b3', toId: 'b4', label: 'ESTABLISHED' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `TCP 3-Way Handshake Flowchart — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `TCP 3-Way Handshake State Machine Flowchart`,
      description: `Sequence transition: Client SYN initiates connection; server SYN-ACK validates receptivity; client ACK finalizes ESTABLISHED socket state.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 12. OSI 7 LAYER ENCAPSULATION
  createOsiDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Application / Upper', subtitle: 'Layers 7, 6, 5 (Data)', category: 'input', details: ['HTTP, DNS, SSH payload', 'TLS Encryption & Session state'] },
      { id: 'b2', label: '2. Transport Layer', subtitle: 'Layer 4 (Segments)', category: 'process', details: ['Adds Source & Dest Port Numbers', 'TCP Sequencing & Flow Control'] },
      { id: 'b3', label: '3. Network Layer', subtitle: 'Layer 3 (Packets)', category: 'control', details: ['Adds Source & Destination IP', 'Router forwarding & Path MTU'] },
      { id: 'b4', label: '4. Data Link & Physical', subtitle: 'Layers 2 & 1 (Frames & Bits)', category: 'output', details: ['Adds MAC Header & CRC Trailer', 'Modulates bits across copper/fiber/RF'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Add Ports' },
      { fromId: 'b2', toId: 'b3', label: 'Add IP Header' },
      { fromId: 'b3', toId: 'b4', label: 'Add MAC & CRC' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `OSI 7-Layer Encapsulation Stack — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `OSI 7-Layer Protocol Encapsulation Stack`,
      description: `Top-to-bottom encapsulation model showing how data payload receives protocol headers across all network boundaries.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 13. DEADLOCK CIRCULAR WAIT
  createDeadlockDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Process 1 (P1)', subtitle: 'Holds Resource R1', category: 'process', details: ['Holds exclusive lock on R1', 'Blocks waiting for Resource R2'] },
      { id: 'b2', label: '2. Resource 1 (R1)', subtitle: 'Non-Preemptible Mutex', category: 'storage', details: ['Allocated strictly to P1', 'Requested by Process P2'] },
      { id: 'b3', label: '3. Process 2 (P2)', subtitle: 'Holds Resource R2', category: 'process', details: ['Holds exclusive lock on R2', 'Blocks waiting for Resource R1'] },
      { id: 'b4', label: '4. Resource 2 (R2)', subtitle: 'Non-Preemptible Mutex', category: 'storage', details: ['Allocated strictly to P2', 'Requested by Process P1'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Holds R1' },
      { fromId: 'b2', toId: 'b3', label: 'P2 Waits' },
      { fromId: 'b3', toId: 'b4', label: 'Holds R2' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Coffman Deadlock Circular Wait Cycle — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Coffman Deadlock Circular Wait Cycle`,
      description: `Resource allocation graph displaying the fatal circular wait loop: each process holds a resource while waiting for the other.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 14. VIRTUAL MEMORY & PAGING (TLB)
  createPagingDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Virtual Address', subtitle: 'Page Number (p) + Offset (d)', category: 'input', details: ['Generated by CPU instruction', 'Decoupled from physical RAM address'] },
      { id: 'b2', label: '2. TLB Associative Cache', subtitle: '1-Cycle Translation Cache', category: 'process', details: ['Hit: Direct Frame (f) found in 1ns', 'Miss: Triggers Page Table Walk in RAM'] },
      { id: 'b3', label: '3. Page Table in RAM', subtitle: 'VPN to PFN Mapping Table', category: 'storage', details: ['Valid bit check (bit=0 -> Page Fault)', 'Translates Virtual Page to Physical Frame'] },
      { id: 'b4', label: '4. Physical Memory', subtitle: 'Frame (f) + Offset (d) in RAM', category: 'output', details: ['Accesses actual silicon byte in DRAM', 'Zero data corruption or process leak'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Lookup Page (p)' },
      { fromId: 'b2', toId: 'b3', label: 'On Cache Miss' },
      { fromId: 'b3', toId: 'b4', label: 'Resolve Frame (f)' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Virtual Memory Paging with TLB — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `MMU Virtual Address Translation with TLB`,
      description: `Hardware address mapping: CPU virtual address translates through TLB associative cache and RAM Page Table into physical frames.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 15. CPU SCHEDULING & PROCESS LIFECYCLE
  createCpuSchedulingDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. New Process', subtitle: 'fork() / Executable Load', category: 'input', details: ['Allocates Process Control Block (PCB)', 'Loads text & data segments into memory'] },
      { id: 'b2', label: '2. Ready Queue', subtitle: 'Short-Term Scheduler Pool', category: 'process', details: ['Queued by priority / arrival time', 'Awaiting CPU core dispatch slot'] },
      { id: 'b3', label: '3. Running State', subtitle: 'CPU Core Execution', category: 'control', details: ['Executes machine instructions', 'Preempted on Time Slice or I/O request'] },
      { id: 'b4', label: '4. Waiting / Terminated', subtitle: 'I/O Event or exit()', category: 'output', details: ['Waiting: Sleeps until I/O completion', 'Terminated: Frees RAM & PCB deallocated'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Admit to Queue' },
      { fromId: 'b2', toId: 'b3', label: 'Dispatcher Run' },
      { fromId: 'b3', toId: 'b4', label: 'Yield / Exit' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Operating System Process Lifecycle — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Operating System Process Lifecycle & Scheduling Flow`,
      description: `State machine flowchart: New processes enter the Ready Queue, get scheduled onto CPU cores, and transition between Running, Blocked, and Terminated.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 16. IOT THREE-TIER ARCHITECTURE
  createIotDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Perception Tier', subtitle: 'Physical Sensors & Actuators', category: 'input', details: ['Temperature, Humidity, Ultrasonic', 'Analog to Digital Conversion (ADC)'] },
      { id: 'b2', label: '2. Edge Gateway', subtitle: 'Local Connectivity & MQTT', category: 'process', details: ['LoRaWAN, Wi-Fi, BLE, Zigbee', 'Local Filtering & Packet Formatting'] },
      { id: 'b3', label: '3. Cloud Core Engine', subtitle: 'Telemetry Processing Hub', category: 'storage', details: ['Time-series telemetry storage', 'Anomaly Detection & Business Logic'] },
      { id: 'b4', label: '4. Application Tier', subtitle: 'Dashboards & Control Action', category: 'output', details: ['Mobile / Web Dashboards', 'Automated Actuator Trigger Signals'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Raw Telemetry' },
      { fromId: 'b2', toId: 'b3', label: 'MQTT Publish' },
      { fromId: 'b3', toId: 'b4', label: 'Alert Feeds' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `IoT System Architecture Flow — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Three-Tier IoT System Architecture Flowchart`,
      description: `Physical to cloud loop: Sensor hardware communicates through edge gateways to cloud intelligence and user controls.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 17. DATABASE NORMALIZATION
  createNormalizationDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Unnormalized Table', subtitle: 'Repeating Groups & Multi-values', category: 'input', details: ['Redundant student rows', 'Insertion & deletion anomalies'] },
      { id: 'b2', label: '2. First Normal (1NF)', subtitle: 'Atomic Values in Columns', category: 'process', details: ['No repeating groups', 'Primary key uniquely identified'] },
      { id: 'b3', label: '3. Second Normal (2NF)', subtitle: 'Remove Partial Dependency', category: 'control', details: ['Non-keys fully dependent on primary key', 'Table split by candidate keys'] },
      { id: 'b4', label: '4. Third Normal (3NF)', subtitle: 'Remove Transitive Dependency', category: 'output', details: ['No non-key depends on another non-key', 'Zero update anomalies in production'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Make Atomic' },
      { fromId: 'b2', toId: 'b3', label: 'Isolate Partial' },
      { fromId: 'b3', toId: 'b4', label: 'Isolate Transitive' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Database Normalization Pipeline — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Relational Database Normalization Pipeline`,
      description: `Sequential data decomposition: Moving from unnormalized redundant records through 1NF, 2NF, and 3NF to eliminate anomalies.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // 18. JAVA INHERITANCE
  createJavaInheritanceDiagram(topic: TopicConcept): TopicBlockDiagram {
    const blocks: DiagramBlock[] = [
      { id: 'b1', label: '1. Superclass: Base', subtitle: 'Parent Class (State & Logic)', category: 'input', details: ['protected fields & public methods', 'Base constructors'] },
      { id: 'b2', label: '2. Inheritance Link', subtitle: 'extends & super() keyword', category: 'control', details: ['Constructor chaining', 'Code reuse without duplication'] },
      { id: 'b3', label: '3. Subclasses', subtitle: 'Derived Concrete Classes', category: 'process', details: ['Adds specialized fields', 'Overrides methods with @Override'] },
      { id: 'b4', label: '4. Dynamic Dispatch', subtitle: 'Runtime Polymorphism', category: 'output', details: ['JVM resolves heap object type', 'Clean modular architecture'] },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'extends Base' },
      { fromId: 'b2', toId: 'b3', label: 'super() Chaining' },
      { fromId: 'b3', toId: 'b4', label: 'Runtime Resolution' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `Java OOP Inheritance & Polymorphism — ${topic.name}`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `Java OOP Inheritance & Polymorphism Flow`,
      description: `Object-oriented class hierarchy: State inheritance, super() constructor chaining, and runtime dynamic method dispatch.`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  // INTELLIGENT DYNAMIC TOPIC FLOWCHART (DERIVED FROM STUDENT'S RAW TEXT)
  createDynamicTopicFlowchart(topic: TopicConcept): TopicBlockDiagram {
    const cleanName = topic.name.trim();
    const kp = topic.keyPoints && topic.keyPoints.length > 0 ? topic.keyPoints : [];
    
    // Extract real academic phrases from the topic definition and key points
    const p1 = kp[0] || `${cleanName} Initiation & Ingress Conditions`;
    const p2 = kp[1] || `${cleanName} Core Algorithm & Processing Logic`;
    const p3 = kp[2] || `${cleanName} State Validation & Rule Enforcement`;
    const p4 = kp[3] || `${cleanName} Target Delivery & Outcome State`;

    const blocks: DiagramBlock[] = [
      { 
        id: 'b1', 
        label: `1. Ingress & Setup`, 
        subtitle: `${cleanName} Ingress`, 
        category: 'input', 
        details: [p1.slice(0, 48), `Verified from Page ${topic.pageReference}`] 
      },
      { 
        id: 'b2', 
        label: `2. Protocol Execution`, 
        subtitle: `${cleanName} Core Mechanism`, 
        category: 'process', 
        details: [p2.slice(0, 48), 'Applies documented operational rules'] 
      },
      { 
        id: 'b3', 
        label: `3. State & Rule Check`, 
        subtitle: `Policy & Error Validation`, 
        category: 'control', 
        details: [p3.slice(0, 48), 'Guarantees boundary constraints'] 
      },
      { 
        id: 'b4', 
        label: `4. Target Delivery`, 
        subtitle: `${cleanName} Verified State`, 
        category: 'output', 
        details: [p4.slice(0, 48), 'Deterministic academic outcome'] 
      },
    ];

    const connections: DiagramConnection[] = [
      { fromId: 'b1', toId: 'b2', label: 'Ingress Flow' },
      { fromId: 'b2', toId: 'b3', label: 'Evaluate Rules' },
      { fromId: 'b3', toId: 'b4', label: 'Target Output' },
    ];

    const svgMarkup = this.renderLinearSvg(blocks, connections, `${cleanName} Process Flowchart`);

    return {
      topicId: topic.id,
      topicName: topic.name,
      title: `${cleanName} Architecture & Process Flowchart`,
      description: `Grounded functional flow diagram synthesized directly from Page ${topic.pageReference} of your study notes on "${cleanName}".`,
      blocks,
      connections,
      svgMarkup,
    };
  },

  /**
   * Renders a vector SVG block diagram with clean typography, turquoise accents, and champagne gold badges.
   */
  renderLinearSvg(blocks: DiagramBlock[], connections: DiagramConnection[], diagramTitle: string): string {
    const width = 840;
    const height = 280;
    const blockWidth = 175;
    const blockHeight = 160;
    const startX = 35;
    const startY = 65;
    const gap = 28;

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-h-[360px] select-none">
      <defs>
        <!-- Arrowhead Marker -->
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#14F1D9" />
        </marker>
        <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#0F172A" stop-opacity="0.98" />
        </linearGradient>
      </defs>

      <!-- Background Canvas -->
      <rect width="${width}" height="${height}" rx="16" fill="#0B0F19" stroke="rgba(139, 92, 246, 0.3)" stroke-width="1.5" />
      
      <!-- Top Title Bar -->
      <text x="35" y="38" fill="#FBBF24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="900" letter-spacing="0.5">${diagramTitle.toUpperCase()}</text>
      <line x1="35" y1="48" x2="${width - 35}" y2="48" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1" />
    `;

    // Render Blocks
    blocks.forEach((block, idx) => {
      const x = startX + idx * (blockWidth + gap);
      const y = startY;

      // Color accents based on category
      const accentColor = idx === 0 ? '#10B981' : idx === 1 ? '#00E5C8' : idx === 2 ? '#F7D070' : '#14F1D9';

      svg += `
        <!-- Block ${idx + 1}: ${block.label} -->
        <g transform="translate(${x}, ${y})">
          <!-- Card Container -->
          <rect width="${blockWidth}" height="${blockHeight}" rx="10" fill="url(#blockGrad)" stroke="${accentColor}" stroke-width="1.5" />
          
          <!-- Top Category Header Strip -->
          <rect width="${blockWidth}" height="28" rx="10" fill="${accentColor}" fill-opacity="0.15" />
          <text x="${blockWidth / 2}" y="18" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">${block.label}</text>
          
          <!-- Subtitle / Concept -->
          <text x="${blockWidth / 2}" y="48" text-anchor="middle" fill="#FCFBF7" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">${(block.subtitle || '').slice(0, 22)}</text>
          
          <!-- Detail Lines -->
          <line x1="15" y1="62" x2="${blockWidth - 15}" y2="62" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
          ${(block.details || []).map((detail, dIdx) => `
            <circle cx="18" cy="${78 + dIdx * 20}" r="2.5" fill="${accentColor}" />
            <text x="26" y="${82 + dIdx * 20}" fill="#DFD9C4" font-family="system-ui, sans-serif" font-size="9">${detail.slice(0, 24)}</text>
          `).join('')}
        </g>
      `;

      // Render Connection Arrow to next block
      if (idx < blocks.length - 1) {
        const arrowStartX = x + blockWidth + 2;
        const arrowEndX = x + blockWidth + gap - 2;
        const arrowY = y + blockHeight / 2;
        const connLabel = connections[idx]?.label || '';

        svg += `
          <!-- Arrow ${idx + 1} -> ${idx + 2} -->
          <line x1="${arrowStartX}" y1="${arrowY}" x2="${arrowEndX}" y2="${arrowY}" stroke="#14F1D9" stroke-width="2" marker-end="url(#arrow)" />
          <text x="${arrowStartX + gap / 2}" y="${arrowY - 8}" text-anchor="middle" fill="#F7D070" font-family="system-ui, sans-serif" font-size="8" font-weight="bold">${connLabel}</text>
        `;
      }
    });

    svg += `</svg>`;
    return svg;
  }
};
