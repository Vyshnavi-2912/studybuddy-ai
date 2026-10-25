import * as pdfjsLib from 'pdfjs-dist';
import { DocumentNote, PageContent } from '../types';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

/**
 * Extracts text from an uploaded PDF file while preserving page boundaries and line breaks.
 */
export async function extractTextFromPdf(file: File): Promise<{
  title: string;
  pages: PageContent[];
  fullText: string;
}> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) {
      throw new Error('The uploaded PDF appears to be empty.');
    }

    const pages: PageContent[] = [];
    let aggregatedText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items preserving spacing
      let lastY: number | null = null;
      let pageText = '';

      for (const item of textContent.items as any[]) {
        if (!item.str) continue;
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith(' ') && !pageText.endsWith('\n')) {
          pageText += ' ';
        }
        pageText += item.str;
        lastY = item.transform[5];
      }

      pageText = pageText.trim();
      const wordCount = pageText ? pageText.split(/\s+/).filter(Boolean).length : 0;

      pages.push({
        pageNumber: pageNum,
        text: pageText,
        charCount: pageText.length,
        wordCount,
      });

      aggregatedText += `\n\n--- Page ${pageNum} ---\n` + pageText;
    }

    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

    return {
      title: cleanTitle,
      pages,
      fullText: aggregatedText.trim(),
    };
  } catch (err: any) {
    console.error('PDF parsing error:', err);
    throw new Error(err.message || 'Could not parse the PDF file. Please ensure it is a valid text-based PDF.');
  }
}

/**
 * Pre-engineered high-quality sample notes ready for instant exploration.
 */
export const SAMPLE_DOCUMENTS: DocumentNote[] = [
  {
    id: 'sample-doc-net-1',
    title: 'Computer Networks: OSI Model & TCP/IP Protocol Suite',
    fileName: 'Computer_Networks_OSI_Model.pdf',
    fileSize: 482000,
    pageCount: 4,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: 'ready',
    detectedSubject: 'Computer Science & Networking',
    summary: 'Comprehensive notes covering the 7 layers of the OSI model, TCP 3-way handshake, UDP connectionless delivery, IP addressing, and subnetting.',
    rawPages: [
      {
        pageNumber: 1,
        wordCount: 285,
        charCount: 1840,
        text: `COMPUTER NETWORKS & ARCHITECTURE
Chapter 2: The Open Systems Interconnection (OSI) Reference Model

1. Introduction to OSI Model
The OSI reference model was developed by the International Organization for Standardization (ISO) in 1984. It partitions network communication into 7 distinct abstraction layers. Each layer serves the layer above it and is served by the layer below it.

Key Principle of Encapsulation:
Data from higher layers is wrapped with headers (and trailers at Data Link layer) as it traverses down the protocol stack: Data -> Segment (Transport) -> Packet (Network) -> Frame (Data Link) -> Bits (Physical).

Layer 1 — Physical Layer:
Responsible for transmission and reception of raw unstructured bit streams over physical transmission mediums (fiber optics, twisted pair copper, radio waves). Defines electrical voltage levels, physical connectors (RJ-45), timing, and data rates.
- Devices: Hubs, Repeaters, Network Cables.
- PDU (Protocol Data Unit): Bits.

Layer 2 — Data Link Layer:
Provides node-to-node data transfer across the physical medium. Handles physical addressing via MAC (Media Access Control) addresses (48-bit hex format e.g., 00:1A:2B:3C:4D:5E).
Key Functions: Framing, Error detection (CRC / Cyclic Redundancy Check), and Flow Control (Stop-and-Wait, Sliding Window). Divided into LLC (Logical Link Control) and MAC sublayers.
- Devices: Network Switches, Bridges, Network Interface Cards (NICs).
- PDU: Frames.`
      },
      {
        pageNumber: 2,
        wordCount: 310,
        charCount: 1980,
        text: `Layer 3 — Network Layer:
Responsible for packet routing, logical addressing, and path determination across heterogeneous interconnected networks.
- Primary Protocol: IPv4 (32-bit addresses, dotted decimal e.g. 192.168.1.1) and IPv6 (128-bit hexadecimal).
- Routing Protocols: OSPF (Open Shortest Path First - Dijkstra link-state), BGP (Border Gateway Protocol - path-vector for Autonomous Systems), RIP (Routing Information Protocol).
- Packet Structure: IP header contains Source IP, Destination IP, Time to Live (TTL prevents infinite routing loops), Protocol identifier, and Checksum.
- Devices: Routers, Layer 3 Multilayer Switches.
- PDU: Packets.

Layer 4 — Transport Layer:
Provides end-to-end communication services, port addressing (0 to 65535), multiplexing, and quality of service between host applications.
Comparison of Core Transport Protocols:
1. TCP (Transmission Control Protocol):
   - Connection-oriented: Requires 3-Way Handshake (SYN -> SYN-ACK -> ACK) before data transfer begins.
   - Guaranteed Delivery: Positive acknowledgment with retransmission (PAR) upon timeout.
   - Congestion Control: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery.
   - Flow Control: Sliding window mechanism advertised in TCP header.
   - Ideal for: Web (HTTP/HTTPS), File transfers (FTP), Email (SMTP).

2. UDP (User Datagram Protocol):
   - Connectionless: Lightweight 8-byte header, sends datagrams without handshake.
   - Unreliable: No acknowledgments, no ordering guarantee, no retransmissions.
   - Low Latency: Minimal overhead, no transmission delays from acknowledgments.
   - Ideal for: Real-time gaming, Voice over IP (VoIP), Video streaming, DNS queries.`
      },
      {
        pageNumber: 3,
        wordCount: 290,
        charCount: 1890,
        text: `Layer 5 — Session Layer:
Establishes, manages, and terminates communication sessions between applications. Supports simplex, half-duplex, and full-duplex dialogues.
- Checkpointing: Inserts sync checkpoints into long data streams so recovery resumes from the last checkpoint rather than starting over.
- Protocols: NetBIOS, RPC (Remote Procedure Call), PPTP.

Layer 6 — Presentation Layer:
Acts as the network data translator and formatter. Ensures data sent from the application layer of one system can be read by the application layer of another.
Core Responsibilities:
- Data Translation: Translates between ASCII, EBCDIC, and UTF-8 encoding.
- Encryption and Decryption: SSL/TLS protocols encrypt payloads for confidentiality.
- Data Compression: Lossless and lossy compression algorithms (JPEG, MPEG, GZIP) to optimize bandwidth utilization.

Layer 7 — Application Layer:
The layer closest to the end user. Directly interacts with software applications that implement a communicating component.
Core Application Protocols:
- HTTP / HTTPS (Hypertext Transfer Protocol Secure, Port 80 / 443): Web page retrieval.
- DNS (Domain Name System, Port 53 UDP/TCP): Resolves human-readable domain names (e.g. google.com) into numerical IP addresses.
- SMTP (Port 25 / 587): Sending emails between mail transfer agents.
- SSH (Secure Shell, Port 22): Encrypted remote terminal access.`
      },
      {
        pageNumber: 4,
        wordCount: 260,
        charCount: 1720,
        text: `Subnetting & IP Addressing Fundamentals:
An IPv4 address consists of 32 bits divided into Network ID and Host ID.
- Subnet Mask: Specifies which bits represent the network and which bits represent host machines.
- CIDR (Classless Inter-Domain Routing): Denoted as /prefix (e.g., 192.168.1.0/24 means 24 bits for network and 8 bits for host, allowing 2^(32-24) - 2 = 254 usable host addresses).
- The -2 subtracts Network Address (all host bits 0) and Broadcast Address (all host bits 1).

TCP 3-Way Handshake Deep Dive:
1. Step 1 (SYN): Client sends a SYN segment with an Initial Sequence Number (ISN_client = X).
2. Step 2 (SYN-ACK): Server receives SYN, allocates buffers/variables, responds with SYN segment (ISN_server = Y) and ACK = X + 1.
3. Step 3 (ACK): Client receives SYN-ACK, acknowledges with ACK = Y + 1. Client can now transmit application payload.

TCP 4-Way Connection Teardown:
FIN (Client) -> ACK (Server) -> FIN (Server) -> ACK (Client). Client enters TIME_WAIT state (typically 2 MSL = 120s) to guarantee last ACK reaches server.`
      }
    ],
    fullText: ''
  },
  {
    id: 'sample-doc-os-2',
    title: 'Operating Systems: Concurrency, Deadlocks & Virtual Memory',
    fileName: 'OS_Concurrency_Deadlocks_Memory.pdf',
    fileSize: 520000,
    pageCount: 3,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: 'ready',
    detectedSubject: 'Computer Science & Operating Systems',
    summary: 'Essential concepts in modern Operating Systems: Process vs Thread execution, Critical Sections, Semaphores, Coffman Deadlock Conditions, and Paging.',
    rawPages: [
      {
        pageNumber: 1,
        wordCount: 300,
        charCount: 1910,
        text: `OPERATING SYSTEMS & SYSTEMS ARCHITECTURE
Unit 3: Concurrency, Synchronization & Mutual Exclusion

1. Process vs. Thread
- Process: An executing program instance in its own isolated virtual address space. Contains Text segment (code), Data segment (globals), Heap (dynamic memory), and Stack (local frames). Context switching between processes has high overhead due to MMU and TLB flush.
- Thread: A lightweight execution unit within a parent process. Multiple threads share the same address space, code, and heap, but each maintains its own Program Counter, Register state, and Stack. Fast context switching, but susceptible to race conditions.

2. The Critical Section Problem
A critical section is a code block accessing shared mutable state (variables, memory, hardware peripherals).
Three Mandatory Criteria for Valid Solutions:
1. Mutual Exclusion: If thread T1 is executing in its critical section, no other thread can execute in their critical section.
2. Progress: If no thread is in the critical section and some wish to enter, selection cannot be postponed indefinitely.
3. Bounded Waiting: A bound must exist on the number of times other threads enter before a requesting thread's request is granted (prevents starvation).

3. Synchronization Primitives
- Mutex Lock: Binary mutual exclusion lock with ownership semantics. Only the thread that acquired the mutex can unlock it.
- Semaphore: Integer counter introduced by Edsger Dijkstra with two atomic operations:
  * wait(S) or P(S): Decrements S. If S < 0, calling thread blocks.
  * signal(S) or V(S): Increments S. If S <= 0, awakens a blocked thread.
  * Counting Semaphore: Initialized to N to control access to a pool of N identical resources.`
      },
      {
        pageNumber: 2,
        wordCount: 320,
        charCount: 2020,
        text: `4. Deadlocks & The Coffman Conditions
A deadlock occurs when a set of concurrent processes are blocked because each process holds a resource and waits for another resource held by another process in the same set.

The 4 Necessary and Sufficient Coffman Conditions (Deadlock occurs if and only if all four hold simultaneously):
1. Mutual Exclusion: At least one resource must be held in a non-shareable mode (only one process uses it at a time).
2. Hold and Wait: A process must currently hold at least one resource while waiting to acquire additional resources held by other processes.
3. No Preemption: Resources cannot be forcibly seized from a process; they can only be released voluntarily after the process finishes its task.
4. Circular Wait: A closed chain of processes exists {P0, P1, ..., Pn} such that P0 waits for a resource held by P1, P1 waits for P2, and Pn waits for P0.

Deadlock Handling Strategies:
- Prevention: Invalidate at least one Coffman condition (e.g. impose total ordering on all resources to eliminate Circular Wait).
- Avoidance: Ensure the system never enters an unsafe state using Dijkstra's Banker's Algorithm.
- Detection and Recovery: Allow deadlocks to occur, periodically run cycle-detection algorithms on Resource Allocation Graphs, and recover by process termination or resource preemption.`
      },
      {
        pageNumber: 3,
        wordCount: 280,
        charCount: 1810,
        text: `5. Virtual Memory & Paging Architecture
Virtual memory provides an illusion of vast contiguous memory to each process by decoupling logical address space from physical RAM.

Paging Mechanics:
- Logical memory is split into fixed-size blocks called Pages (typically 4 KB).
- Physical memory is split into identical fixed-size blocks called Frames.
- Page Table: Hardware-managed table mapping virtual page numbers (VPN) to physical frame numbers (PFN).

Address Translation:
Virtual Address = [Page Number (p) | Offset (d)]
Physical Address = [Frame Number (f) | Offset (d)]

Translation Lookaside Buffer (TLB):
High-speed hardware associative cache located inside the CPU MMU. Caches recent VPN -> PFN mappings to prevent two physical memory accesses per instruction.
- TLB Hit: Translation resolved in ~1 CPU clock cycle.
- TLB Miss: Memory controller traverses page table in RAM (Page Walk).

Page Fault Handling:
Triggered when CPU references a page with the 'valid/invalid' bit set to 0 (page resides on secondary disk swap space):
1. CPU traps to OS kernel.
2. OS verifies legal access and finds a free physical frame.
3. Disk I/O reads requested page into the frame.
4. OS updates page table entry to valid.
5. CPU restarts the trapped instruction.`
      }
    ],
    fullText: ''
  },
  {
    id: 'sample-doc-java-3',
    title: 'Java Programming: Inheritance, Polymorphism & OOP Hierarchy',
    fileName: 'Java_Inheritance_and_Polymorphism.pdf',
    fileSize: 495000,
    pageCount: 2,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: 'ready',
    detectedSubject: 'Computer Science & Software Engineering',
    summary: 'Comprehensive lecture notes on Java Inheritance (extends keyword), Method Overriding, super keyword, Polymorphism, and Abstract Classes.',
    rawPages: [
      {
        pageNumber: 1,
        wordCount: 310,
        charCount: 1950,
        text: `OBJECT-ORIENTED PROGRAMMING IN JAVA
Chapter 4: Class Inheritance & Method Overriding

1. Java Inheritance Fundamentals
Inheritance is an OOP mechanism wherein a child class (subclass) inherits state (fields) and behavior (methods) from an existing parent class (superclass) using the 'extends' keyword.
Key Benefits:
- Code Reusability: Subclasses reuse tested algorithms from superclasses without duplication.
- Extensibility: Specialized behaviors are added to child classes while preserving base contracts.
- Method Overriding: A subclass provides a specific implementation of a method defined in its superclass using the @Override annotation.

2. The super Keyword & Constructor Chaining
- super(): Invokes the constructor of the direct superclass. Must be the very first statement in a subclass constructor.
- super.methodName(): Calls the superclass implementation of an overridden method.
- Access Modifiers in Inheritance:
  * private: Accessible ONLY within the declaring class. Subclasses do NOT inherit private fields directly.
  * protected: Accessible within the same package AND by subclasses in different packages.
  * public: Universally accessible.`
      },
      {
        pageNumber: 2,
        wordCount: 290,
        charCount: 1860,
        text: `3. Polymorphism & Dynamic Method Dispatch
Polymorphism allows objects of different concrete subclasses to be treated through a unified superclass or interface reference.
- Dynamic Method Dispatch (Runtime Polymorphism): The JVM determines at runtime which version of an overridden method to execute based on the actual object type on the heap, not the reference type.
- Example: Vehicle v = new ElectricCar(); v.startEngine(); executes ElectricCar's overridden method.

4. Abstract Classes vs Interfaces
- Abstract Class: Declared with 'abstract'. Cannot be instantiated directly. Can have both concrete methods with bodies and abstract method signatures.
- Final Classes & Methods: Declaring a class 'final' prohibits inheritance (e.g., java.lang.String is final for security and immutability). Declaring a method 'final' prevents overriding.`
      }
    ],
    fullText: ''
  },
  {
    id: 'sample-doc-iot-4',
    title: 'Internet of Things: Architecture, Sensors & MQTT Protocols',
    fileName: 'IoT_Architecture_Sensors_MQTT.pdf',
    fileSize: 460000,
    pageCount: 2,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    status: 'ready',
    detectedSubject: 'Computer Science & IoT Systems',
    summary: 'Detailed overview of the 3-Tier IoT Architecture, Sensor/Actuator perception, Edge gateways, and lightweight MQTT telemetry.',
    rawPages: [
      {
        pageNumber: 1,
        wordCount: 295,
        charCount: 1880,
        text: `INTERNET OF THINGS (IoT) SYSTEMS
Unit 1: Fundamentals of IoT Architecture

1. The Three-Tier IoT Architecture
IoT systems are fundamentally partitioned into three functional tiers:
1. Perception Layer (Physical Tier):
   * Composed of physical sensors (temperature, accelerometer, LiDAR, pressure) and actuators (servos, relays, valves).
   * Converts analog physical environmental phenomena into digital telemetry readings.
2. Network Layer (Transmission Tier):
   * Routes telemetry data from perception devices to processing nodes via Wi-Fi, BLE, Zigbee, LoRaWAN, or Cellular NB-IoT.
   * Edge Gateways perform local protocol translation and data aggregation.
3. Application Layer (Service Tier):
   * Cloud analytics platforms, dashboards, anomaly detection models, and user command interfaces.`
      },
      {
        pageNumber: 2,
        wordCount: 285,
        charCount: 1820,
        text: `2. MQTT Telemetry Protocol (Message Queuing Telemetry Transport)
MQTT is an ISO standard (ISO/IEC 20922) publish-subscribe network protocol designed for constrained remote devices with high-latency or low-bandwidth links.
Key Architectural Components:
- MQTT Broker: Central server coordinating messages (e.g. Mosquitto, HiveMQ).
- Publishers: Sensor nodes sending data to specific hierarchical topics (e.g. factory/sensor1/temperature).
- Subscribers: Client applications receiving updates from topics of interest.

Quality of Service (QoS) Levels in MQTT:
- QoS 0 (At most once): Fire and forget. No acknowledgment. Fast, lowest overhead.
- QoS 1 (At least once): Guaranteed delivery with PUBACK, but duplicate messages may occur.
- QoS 2 (Exactly once): Four-step handshake (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP) guaranteeing zero data loss and zero duplicates.`
      }
    ],
    fullText: ''
  }
];

// Initialize full text for samples
SAMPLE_DOCUMENTS.forEach(doc => {
  doc.fullText = doc.rawPages.map(p => `--- Page ${p.pageNumber} ---\n${p.text}`).join('\n\n');
});
