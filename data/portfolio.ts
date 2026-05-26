export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
};

// Add this type
export type Education = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  courses: string[];
};


// ─── Skills shown in "Technical Arsenal" ───────────────────────
export const skills = [
  'C++',         
  'C#',
  'Verilog / VHDL',
  'PyTorch',
  'NumPy / Pandas',
  'Redis',
  'Streamlit',
  'Cadence Virtuoso',
  'TCP/IP',
  'Distributed Systems',
  'Python',
  'Embedded C',
  'Low-Latency Systems',
  'FIX Protocol',
  'Computer Architecture',
  'RISC-V',
  'DSP',
  'Linux',
  'Git',
  'Cocotb',
  'HSPICE',
  'ModelSim',
  'FPGA',
  'Verilog',
  'SystemVerilog',
  'RTL Design',
  'ASIC Design',
  'SRAM Design',
  'MBIST',
  'Vivado',
  'Vitis HLS',
  'Zynq-7000',
];

// ─── Work Experience ────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    company: 'New York University — Tandon School of Engineering',
    role: 'SRAM Design Verification Engineer',   // was "Graduate Researcher"
    location: 'New York, NY',
    period: 'Jan 2024 - Nov 2025',               // was "2023 – Present"
    points: [
      'Led a 4-person team to optimize a 256x4-bit SRAM array in 7nm FinFET, reducing power by ~20% vs 6T baseline.',
      'Developed and verified SRAM testbenches using Cocotb for Python-based functional and latency testing.',
      'Resolved critical timing violations for reliable read/write operations at high frequencies via STA and back-annotation.',
      'Collaborated with physical design team on RTL-level fixes during timing closure; hands-on Cadence ASIC flow exposure.',
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Software Engineer',                   // was "Programmer Analyst"
    location: 'India',
    period: 'Nov 2020 - Dec 2021',               // was "2021 – 2023"
    points: [
      'Built Python-based systems handling 100K+ requests/sec, improving throughput by 15% and reducing latency by 20%.',
      'Built distributed pipelines for low-latency data ingestion and transformation for operational decision-making.',
      'Implemented monitoring, logging, and debugging strategies maintaining 99.9% uptime in production.',
      'Developed fault-tolerant systems with retry logic and circuit breakers under high-load conditions.',
    ],
  },
  // Keep GVPCOE education entry as-is or move to a separate Education section
];

// ─── Education  ────────────────────────────────────────────
export const education: Education[] = [
  {
    institution: 'NYU Tandon School of Engineering',
    degree: 'MS in Electrical Engineering',
    location: 'New York, NY',
    period: 'Jan 2022 - May 2024',
    courses: [
      'Computer System Architecture',
      'Advanced VLSI Design',
      'Advanced Hardware Design',
      'Digital Signal Processing',
    ],
  },
  {
    institution: 'GVPCOE',
    degree: 'BE in Electronics & Communications Engineering',
    location: 'India',
    period: 'Jul 2016 - Sep 2020',
    courses: [
      'Data Structures & Algorithms',
      'System Design & Optimization',
      'Computer Architecture',
      'Digital Signal Processing',
      'Operating Systems',
    ],
  },
];

// ─── Featured Projects ──────────────────────────────────────────
export const projects: Project[] = [
  {
    title: 'NYC Subway Arrival Telegram Bot',
    description:
      'Production Telegram bot built with async Python (aiohttp + asyncio). Fetches MTA GTFS-RT feeds concurrently, with per-stage latency instrumentation, rate limiting, and stale-feed detection for production reliability.',
    tech: ['Python', 'asyncio', 'aiohttp', 'Telegram Bot API', 'GTFS-RT'],
    githubUrl: 'https://github.com/saulgoodman-bot/SubwayCatch',
  },
  {
    title: 'Ultra-Low-Latency FPGA FIX Parser',
    description:
      'Hardware FIX protocol parser built for HFT-grade latency targets. FSM-based pipelined parsing, FIFO buffering, BRAM/ROM lookup for tag-value validation, and parallel field extraction — designed for sub-microsecond message processing on FPGA fabric.',
    tech: ['Verilog', 'FPGA', 'FIX Protocol', 'FSM', 'FIFO', 'BRAM', 'Low-Latency'],
    githubUrl: 'https://github.com/chandrakirannarala/fpga_accelerate_FIX',
  },
  {
    title: 'C++-Based Huffman Compression System',
    description:
      'High-performance file compression tool built using data structures and algorithms for lossless compression with memory management and efficient I/O',
    tech: ['C++', 'DSA', 'Huffman Coding / Encoding', 'MMT'],
    githubUrl: 'https://github.com/chandrakirannarala/',
  },
  {
    title: 'Blood Pressure Monitoring System',
    description:
      'Embedded system project using an STM32 microcontroller. Interfaced with an MPR pressure sensor to capture pulse waves. Implemented digital signal processing (DSP) filters to extract heart rate and estimate blood pressure. Displayed real-time waveforms on the built-in LCD using the LTDC controller.',
    tech: ['C', 'STM32', 'SPI', 'DSP'],
    githubUrl: 'https://github.com/chandrakirannarala/BloodPressureMonitor',
  },
  {
    title: 'Object Detection on Zynq-7000 SoC',
    description:
      'Real-time object detection accelerated on Zynq-7000 using Vitis HLS. Offloads convolution layers to FPGA fabric, achieving significant inference speedup over ARM-only baseline with hardware/software co-design.',
    tech: ['Zynq-7000', 'Vitis HLS', 'Vivado', 'C++', 'Hardware Acceleration'],
    githubUrl: '#',
  },
  {
    title: 'RISC-V RV32I Processor',
    description:
      'Full 5-stage pipelined RV32I processor in SystemVerilog with hazard detection, forwarding logic, and branch stubs. Verified on Basys 3 FPGA at 100 MHz.',
    tech: ['SystemVerilog', 'RISC-V', 'RV32I', 'Basys 3', 'Pipelining'],
    githubUrl: 'https://github.com/chandrakirannarala/EL6463-Team-Project',
  },
  {
    title: 'MBIST Engine — 256x4b SRAM @ 7nm',
    description:
      'Memory Built-In Self-Test engine for a 256x4-bit SRAM at 7nm FinFET. Implements March-C and MATS+ algorithms with full fault coverage analysis, timing verification, and automated TCL regression flows.',
    tech: ['ASIC', 'SRAM', '7nm FinFET', 'MBIST', 'HSPICE', 'Cadence Virtuoso', 'Cocotb', 'TCL'],
    githubUrl: 'https://github.com/chandrakirannarala/',
  },
  {
    title: 'Low-Latency Pong on Artix-7',
    description:
      'Pong game implemented entirely in Verilog on Artix-7 FPGA with 60 fps VGA output. Custom hSync/vSync controller, sprite rendering pipeline, collision detection — zero software overhead, running purely in FPGA fabric.',
    tech: ['Verilog', 'Artix-7', 'VGA', 'FSM', 'Digital Design'],
    githubUrl: 'https://github.com/chandrakirannarala/',
  },
  {
    title: 'Moving Average Crossover Dashboard',
    description:
      'Event-driven trading strategy prototype with live Alpha Vantage data, Streamlit dashboard, Sharpe ratio & Max Drawdown metrics, and Redis caching for sub-second responsiveness.',
    tech: ['Python', 'Streamlit', 'Alpha Vantage API', 'Redis', 'Plotly', 'Event-Driven'],
    githubUrl: 'https://github.com/chandrakirannarala/Event-Driven-MA-Crossover-Strategy',
  },
  {
    title: 'F1 Performance Analysis Platform',
    description:
      'Real-time F1 telemetry dashboard integrating lap times, tyre degradation, and pit stop analytics via OpenF1 API with multi-level caching.',
    tech: ['Python', 'Streamlit', 'OpenF1 API', 'Redis', 'Plotly'],
    githubUrl: 'https://github.com/chandrakirannarala/F1_Data',
  },
];
