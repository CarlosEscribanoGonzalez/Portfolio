// @ts-check
/**
 * @typedef {{ [K in keyof Templates]: {
 *   template: K,
 *   details?: { [F in Templates[K][number]]?: string }
 * } }[keyof Templates]} TemplateDetails
 *
 * @typedef {{
 *   id: string,
 *   categories: ("featured"|"master"|"jams"|"degree")[],
 *   title: string,
 *   subtitle: string,
 *   folder?: string,
 *   description: string,
 *   links?: { label: string, url: string }[],
 *   badge?: string,
 *   badgePosition?: "left" | "bottom-left" | "bottom"
 * } & TemplateDetails} Project
 */

/** @type {Project[]} */
const projects = [
  { //MECHANOCCULT
    id: "mechanoccult",
    categories: ["featured"],
    title: "Mechanoccult",
    subtitle: "Typing & Deckbuilding PVP game",
    description:
      `<b>Mechanoccult</b> is a competitive 1v1 typing game with deckbuilding mechanics. 
      Play as a cultist attempting to summon your deity before your opponent. <br><br> 
      The core gameplay blends the agility of <i>typing games</i> with the tactical depth of a <i>deck-builder</i>. 
      As you recite the ritual to summon your deity, you must manage your corruption level and cast strategic spells to sabotage your rival, 
      alter their text, or protect yourself from their attacks in real time.`,
    template: "Games",
      details: {
      Language: "English",
      Genre: "Competitive Typing, Deck-Builder",
      Status: "In active development",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "Netcode for GameObjects",
      "Showcased At": "CyL Games Show 2026; Guerrilla Game Festival 2026; DEVOTION Game Fest 2026",
      "Team Size": "6",
      "My Role": "Game Designer, Gameplay/UI Programmer & Shader Artist"
    },
    links: [
      { label: "Play", url: "https://typtyp-studios.itch.io/mechanoccult" }
    ],
    badge: "unity.png",
  },
  { //LA CACHARRERA
    id: "la-cacharrera",
    categories: ["featured"],
    title: "La Cacharrera",
    subtitle: "Telemarketer simulator with AI powered NPCs",
    description:
      `<b>La Cacharrera</b> is a telemarketer simulator that puts the player in the shoes of an online salesperson, 
      who must call customers to sell products from the online store LaCacharrera.es. Player's main objective is to survive as many workdays
      as possible without going bankrupt due to insufficient sales or getting fired.
      <br><br>
      NPCs are powered by generative AI technologies and driven by personality algorithms, making each playthrough feel unique.
      This game is a demo built to showcase <i>Conversational NPCs</i>, a tool developed for Unity that gives any agent conversational 
      capabilities. There are plans to commercialize this tool on the Unity Asset Store in the near future.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Simulation",
      "Release Date": "July 21, 2026",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      Technologies: "Whisper (STT), Gemini (LLM), ElevenLabs (TTS)"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/la-cacharrera" }
    ],
    badge: "unity.png",
  },
  { //PATTERNS
    id: "patterns",
    categories: ["featured"],
    title: "Patterns",
    subtitle: "Programming pattern-based escape room",
    description:
      `<b>Patterns</b> is an escape room built entirely around software design patterns, 
      every puzzle being a working implementation of the one it teaches.
      After completing all the puzzles, the player is shown a breakdown of the patterns: 
      how they work, why they matter, and an analogy that reframes them in a way he won't forget.
      <br><br>
      The deeper player gets, the stranger those analogies start to feel. What begins as a 
      clean lesson in software architecture slowly curdles into something else entirely.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Escape Room",
      "Release Date": "January 19, 2026",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/patterns" }
    ],
    badge: "unity.png",
  },
  { //ARTABLETOP
    id: "artabletop",
    categories: ["featured"],
    title: "ARTabletop",
    subtitle: "Bring your favorite tabletop games to life with augmented reality",
    description:
      `This lightweight Android app lets you turn any surface into a game board using augmented reality. 
      Just print a few markers and use your phone’s camera to unlock endless possibilities. 
      <br><br>
      <b>Create your own tabletop games</b>.
      With ARTabletop’s built-in game editor, you can design your own games using images, text, 3D models, and customized settings. 
      No technical knowledge needed. No limits. You set the rules.
      <br><br>
      <b>Explore, share, improve</b>.
      Share your creations with friends and download theirs. Edit your saved games anytime or enjoy them as they are.
      <br><br>
      <b>Play online or offline</b>.
      Take your games with you. Whether you're at home, with friends, or on the go, 
      ARTabletop lets you enjoy your favorite games in both online and offline sessions.`,
    template: "Apps",
    details: {
      Language: "English",
      "Release Date": "July 08, 2025",
      "Operating System": "Android",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "ARCore, AR Foundation",
    },
    links: [
      { label: "Download", url: "https://karesito.itch.io/artabletop" }
    ],
    badge: "unity.png",
  },
  { //RENDERING TECHNIQUES
    id: "rendering-techniques",
    categories: ["featured"],
    title: "Rendering techniques",
    subtitle: "Real-time rendering techiques in Vulkan on a deferred pipeline",
    description:
      `Implementation of several core features commonly found in real-time rendering engines using C++ and the Vulkan graphics API. 
      The techniques were integrated into a deferred rendering pipeline, with a particular focus on shadow generation.
      Features include:
      <ul>
      <li>Ambient occlusion</li>
      <li>Anti-aliasing</li>
      <li>Shadow mapping</li>
      <li>Real-time ray tracing</li>
      <li>Post-processing</li>
      <li>PBR materials</li>
      </ul>
      `,
    template: "Graphics",
    details: {
      "Graphics API": "Vulkan",
      "Programming Language": "C++",
      "Shading Language": "GLSL",
      "Date": "May 20, 2026",
      Technologies: "GLFW, GLM, ImGUI"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Rendering-Techniques-in-Vulkan" }
    ],
    badge: "c++.png",
  },
  { //RENDERING ENGINE
    id: "opengl-engine",
    categories: ["featured"],
    title: "Rendering Engine",
    subtitle: "Real-time rendering engine in OpenGL",
    description:
      `A custom real-time rendering engine built from scratch in C++ and <b>OpenGL</b>. 
      The engine runs a deferred shading pipeline with a forward-rendering fallback, 
      organizing scenes as hierarchical scene graphs with support for multiple cameras, both FPS-style and orbital. 
      VAOs and shader programs are cached and reused across objects that share them, avoiding redundant GPU state changes.
      <br><br>
      Lighting is physically based, implementing the full <i>Disney 2012 BRDF</i> alongside directional and spot lights with realistic distance 
      and window-function attenuation, complemented by other features as bump mapping and distance fog.
      <br><br>
      On top of that, multiple post-processing effects can be easily configured and stacked: 
      bloom, depth-of-field, motion blur, Sobel, Gaussian blur...`,
    template: "Graphics",
    details: {
      "Graphics API": "OpenGL",
      "Programming Language": "C++",
      "Shading Language": "GLSL",
      "Date": "January 01, 2026",
      Technologies: "GLUT, GLEW, GLM, ImGUI"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Rendering-Engine" }
    ],
    badge: "c++.png",
  },

  //MASTER
  { //GRAPHICS PIPELINE IN UNITY
    id: "graphics-pipeline",
    categories: ["master"],
    title: "Graphics Pipeline Stages in Unity",
    subtitle: "Geometry, tessellation and compute shaders in Unity",
    description:
      `Unity project (Built-in Render Pipeline) built to explore the different stages of the graphics pipeline in HLSL, 
      with special emphasis on geometry, tessellation and compute shaders. The result is an interactive sunset island 
      with the following features:
      <ul>
      <li>Billboard entities with movement controlled via compute shaders</li>
      <li>Ocean with adaptive tessellation, animated via a displacement map</li>
      <li>Procedural grass, created using geometry and tessellation shaders</li>
      <li>Interactive puddle, simulated in real time solving the 2D wave equation</li>
      </ul>`,
    template: "Graphics",
    details: {
      "Programming Language": "C#",
      "Shading Language": "HLSL",
      "Date": "May 24, 2026",
      Technologies: "Unity",
      "Team Size": "2",
      "My Role": "Sole Graphics Programmer"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Graphics-Pipeline-Stages-in-Unity" }
    ],
    badge: "unity.png",
  },
  { //PATH TRACER
    id: "path-tracer",
    categories: ["master"],
    title: "Path Tracer with Nori",
    subtitle: "Path tracing techniques implemented in C++ with Nori",
    description:
      `CPU path tracer developed in C++ on top of the Nori educational rendering framework, implementing and studying 
      Monte Carlo techniques for physically based rendering and global illumination. The project was developed incrementally, 
      from sampling and direct lighting to a full path tracer with next-event estimation, multiple importance sampling and microfacet materials.`,
    template: "Graphics",
    details: {
      "Programming Language": "C++",
      "Date": "March 24, 2026",
      Technologies: "Nori",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Nori-Path-Tracer" }
    ],
    badge: "c++.png",
  },
  { //FLUID SIMULATION
    id: "fluid-simulation",
    categories: ["master"],
    title: "Eulerian Fluid Simulation",
    subtitle: "2D simulation of an eulerian fluid (gas) in C++",
    description:
      `Implementation of a 2D eulerian fluid simulator that solves the incompressible Navier-Stokes equations on a staggered (MAC) grid, 
      written in C++. Each time step handles the terms of the equations one at a time: advection, external forces, viscosity and a 
      pressure projection that makes the fluid incompressible. Colored ink is advected along the fluid to visualize the flow.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "March 29, 2026",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Eulerian-Fluid-Simulation" }
    ],
    badge: "c++.png",
  },
  { //BOX FILTERING
    id: "box-filtering",
    categories: ["master"],
    title: "Box-Filtering in CUDA",
    subtitle: "GPU image box-filtering project implemented in C++ with CUDA",
    description:
      `GPU image box-filtering project written in CUDA. It applies convolution filters to images and chains several kernels to build a 
      complete Canny Edge Detector, with support for individual filters. It's also used to measure how techniques such as constant memory, 
      shared memory and block size affect performance.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "April 27, 2026",
      Technologies: "CUDA"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Image-box-filtering-in-CUDA" }
    ],
    badge: "cuda.png",
  },
  { //CLOTH SIMULATION
    id: "cloth-simulation",
    categories: ["master"],
    title: "Mass-Spring Systems & Cloth Simulation",
    subtitle: "Physically based simulation of mass-spring systems and cloth in Unity",
    description:
      `Physically based simulation of mass-spring systems in Unity (C#), from simple node-and-spring setups to full cloth built 
      from triangle meshes. It implements several explicit and implicit integration methods on top of a common multidimensional 
      state formulation, so their stability and behavior can be compared directly.`,
    template: "Software",
    details: {
      "Programming Language": "C#",
      "Date": "February 11, 2026",
      Technologies: "Unity, Math.NET Numerics"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Mass-Spring-Cloth-Simulation" }
    ],
    badge: "unity.png",
  },
  { //ARTICULATED RB
    id: "articulated-rb",
    categories: ["master"],
    title: "Articulated Rigid Bodies in Unity",
    subtitle: "Simulation of articulated rigid bodies connected through point constraints in Unity",
    description:
      `Simulation of articulated rigid bodies in Unity (C#), where rigid bodies are connected through point constraints. 
      The project implements three different ways of integrating and solving the dynamics, making it possible to compare how 
      each one handles constraints in terms of stability and behavior.
      <ul>
      <li>Symplectic Euler with weak constraints</li>
      <li>Symplectic Euler with strong constraints</li>
      <li>Implicit Euler with weak constraints</li>
      </ul>`,
    template: "Software",
    details: {
      "Programming Language": "C#",
      "Date": "March 02, 2026",
      Technologies: "Unity, Math.NET Numerics"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Articulated-Rigid-Bodies-in-Unity" }
    ],
    badge: "unity.png",
  },
  { //ALGORITHMS WITH MESHES
    id: "algorithms-meshes",
    categories: ["master"],
    title: "Algorithms with Meshes",
    subtitle: "Structures and algorithms with triangle meshes in C++",
    description:
      `Collection of algorithms with triangle meshes, written in C++ and organized as four Visual Studio projects. 
      They cover mesh statistics, boundary detection with distance fields, and UV parameterization using barycentric mapping,
      using Eigen for both dense and sparse linear algebra.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "October 22, 2025",
      Technologies: "Eigen"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Algorithms-with-meshes" }
    ],
    badge: "c++.png",
  },
  { //WARPING AND MORPHING
    id: "warping-morphing",
    categories: ["master"],
    title: "Warping and Morphing",
    subtitle: "Image warping and morphing in MATLAB",
    description:
      `Three MATLAB scripts written to understand the fundamentals of image warping. Each script implements a different technique, 
      making it possible to compare their behavior and see why some approaches work better than others.
      <ul>
      <li>Forward warping</li>
      <li>Backward warping</li>
      <li>Morphing (applying backward warping)</li>
      </ul>`,
    template: "Software",
    details: {
      "Programming Language": "MATLAB",
      "Date": "December 02, 2025",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Warping-Morphing" }
    ],
    badge: "matlab.png",
  },
  { //INVERSE KINEMATICS
    id: "inverse-kinematics",
    categories: ["master"],
    title: "Inverse Kinematics",
    subtitle: "Inverse kinematics on a 2D articulated arm in MATLAB",
    description:
      `Inverse kinematics (IK) implementation on a 2D articulated arm, written in MATLAB. 
      The goal is for the end effector of the arm to reach a random target position, different on every execution.
      It uses a numerically computed Jacobian and its pseudoinverse to update the joint angles in 
      small incremental steps until the target is reached.`,
    template: "Software",
    details: {
      "Programming Language": "MATLAB",
      "Date": "December 18, 2026",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Inverse-Kinematics" }
    ],
    badge: "matlab.png",
  },
  { //EMOJI CLASSIFIER
    id: "emoji-classifier",
    categories: ["master"],
    title: "Emoji Classifier",
    subtitle: "Emoji classification in Python using a Convolutional Neural Network",
    description:
      `Convolutional Neural Network built in PyTorch to classify emoji images into five categories: airplanes, birds, boats, rabbits 
      and felines. The dataset is small and the final test set is private, so the focus of the project is on reducing overfitting and 
      training a network that generalizes rather than memorizes.
      <br><br>
      The results obtained were satisfactory, reaching 0.1 validation loss and 95% accuracy in the best runs.`,
    template: "Software",
    details: {
      "Programming Language": "Python",
      "Date": "November 25, 2025",
      Technologies: "PyTorch"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Emoji-Classification-CNN" }
    ],
    badge: "python.png",
  },
  { //TRACKING AND STEREOSCOPY
    id: "tracking-stereoscopy",
    categories: ["master"],
    title: "Tracking and Stereoscopy",
    subtitle: "Tracking and stereoscopy in C++ using ArUco libraries",
    description:
      `Marker-based tracking and stereoscopic rendering project written in C++ with OpenGL, OpenCV and ArUco. 
      ArUco markers are detected by the webcam and tracked to control the position and rotation of the virtual camera. 
      <br><br>
      The scene can be rendered in stereo using two different methods, <i>toe-in</i> and <i>off-axis</i>, with red/blue anaglyph filters.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "November 30, 2025",
      Technologies: "OpenCV, ArUco, OpenGL"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Tracking-Stereoscopy" }
    ],
    badge: "c++.png",
  },
  { //TONEMAPPING 
    id: "tonemapping-cuda",
    categories: ["master"],
    title: "Tone Mapping in CUDA",
    subtitle: "Parallel image tone mapping with CUDA",
    description:
      `GPU implementation of the histogram-based stage of HDR tone mapping, written in CUDA. 
      Given the log-luminance of an image, it computes the cumulative distribution function (CDF) used to remap luminance values.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "April 13, 2026",
      Technologies: "CUDA"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Tone-Mapping-in-CUDA" }
    ],
    badge: "cuda.png",
  },

  //JAMS:
  { //THE OTHER SIDE
    id: "the-other-side",
    categories: ["jams"],
    title: "The Other Side",
    subtitle: "Navigate with sound and solve puzzles",
    description:
      `A horror and suspense game in which the player must solve puzzles by alternating between 
      reality and <b>"the other side"</b>; a dark realm where they can only navigate by sound.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Puzzle, Suspense",
      "Release Date": "October 27, 2024",
      "Jam Duration": "20 days",
      "Ranking Obtained": "Third",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/the-other-side" }
    ],
    badge: "unity.png",
  },
  { //REGRETS & COMPLAINTS
    id: "regrets-and-complaints",
    categories: ["jams"],
    title: "Regrets & Complaints",
    subtitle: "A game about life, time, regrets & complaints",
    description:
      `<b>Regrets & Complaints</b> is a purely narrative experience that explores the relentless passage of time, 
      depicting how different characters grow, age, and eventually die amid regrets and complaints. 
      It emphasizes storytelling and character development within the constraints of time.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Narrative Adventure",
      "Release Date": "March 23, 2024",
      "Jam Duration": "15 days",
      "Ranking Obtained": "Second",
      "Showcased At": "Indie Dev Day 2024",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      "Team Size": "5",
      "My Role": "Lead Programmer & Lead Narrative Designer"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/regrets-n-complaints" }
    ],
    badge: "unity.png",
  },
  { //KUKO
    id: "kuko",
    categories: ["jams"],
    title: "Kuko",
    subtitle: "My very first Unity project",
    description:
      `<b>Kuko</b> is a 2D pixel art platformer where the player controls a baby dragon lost in a cave inhabited 
      by evil humans who want to hunt him.
      <br><br>This game is my first project in Unity, which allowed me to learn the engine's most basic aspects on my own.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Platformer",
      "Release Date": "October 18, 2022",
      "Jam Duration": "18 days",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      "Team Size": "4",
      "My Role": "Lead Programmer"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/kuko" }
    ],
    badge: "unity.png",
  },
  { //JULIAN
    id: "julian",
    categories: ["jams"],
    title: "Julián.",
    subtitle: "My very first game and jam participation",
    description:
      `Julián is a young man notable for his lack of a sense of danger and his passion for Real Betis football club, who is kidnapped
      just before a Real Madrid vs. Betis match. To escape, he is forced to complete a series of challenges governed by three rules.
      <br><br>Will he manage to break free and make it back in time for the game?`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Graphic Adventure",
      "Release Date": "February 08, 2022",
      "Jam Duration": "3 days",
      Platform: "PC",
      Engine: "Adventure Game Studio",
      "Team Size": "4",
      "My Role": "Programmer & Narrative Designer"
    },
    links: [
      { label: "Play", url: "https://guajiro0.itch.io/julian" }
    ],
    badge: "ags.png",
  },

  //DEGREE
  { //KOCUBE
    id: "kocube",
    categories: ["degree"],
    title: "KO Cube",
    subtitle: "Top-down 3v3 multiplayer hero shooter",
    description:
      `<b>KO Cube</b> is a competitive 3v3 hero shooter where players battle across three game modes: 
      <i>Hotzone</i>, <i>Team Deathmatch</i>, and <i>Capture the Flag</i>, with two maps for each mode. 
      <br><br>
      The game features six unique characters, each with a passive ability, basic attack and an ultimate ability. Characters are divided into three 
      playstyles: <i>Tank</i>, <i>DPS</i>, and <i>Healer</i>, with three different skins per character available for purchase in the store.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Hero Shooter",
      "Release Date": "December 12, 2024",
      Platform: "Web (PC & Mobile)",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "Netcode for GameObjects", 
      "Team Size": "5",
      "My Role": "Lead Programmer & Narrative Designer"
    },
    links: [
      { label: "Play", url: "https://flatwall-games.itch.io/kocube" }
    ],
    badge: "unity.png",
  },
  { //INDIE STUDIO 
    id: "indie-studio",
    categories: ["degree"],
    title: "Indie Studio Simulator",
    subtitle: "Living colony simulation using FSMs, Behavior Trees & Utility Systems",
    description:
      `<b>Indie Studio Simulator</b> is a simulation of an indie game development studio designed as a living colony, where 
      different characters interact with each other to create a dynamic environment. 
      <br><br>
      The project focuses on implementing AI systems capable of generating autonomous behaviors and emergent situations using
      <i>Finite State Machines</i>, <i>Behavior Trees</i> and <i>Utility Systems</i>`,
    template: "Games",
    details: {
      Language: "English",
      Genre: "Simulation",
      "Release Date": "December 18, 2024",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      "Team Size": "5",
      "My Role": "Programmer & Technical Artist (shaders & VFX)"
    },
    links: [
      { label: "Play", url: "https://flatwall-games.itch.io/indie-studio-simulator" }
    ],
    badge: "unity.png",
  },
  { //TINPCT
    id: "tinpct",
    categories: ["degree"],
    title: "Trouble in NPC Town",
    subtitle: "Asymmetric 2-player online browser game made with Phaser",
    description:
      `Asymmetric 2-player browser game made with Phaser, where one player pretends to be an NPC and the other has to find and shoot them. 
      The game uses a Spring Boot server with a <b>REST API</b> for user accounts and <b>WebSockets</b> for the real-time game logic.`,
    template: "Games",
    details: {
      "Language": "English",
      "Genre": "Hide-and-seek",
      "Programming Language": "JavaScript, Java",
      "Release Date": "January 24, 2024",
      Platform: "Web (PC)",
      Frameworks: "Phaser, Spring Boot",
      "Team Size": "3",
      "My Role": "Gameplay Programmer, Backend Developer & WebSocket Developer"
    },
    links: [
      { label: "View on GitHub (online version)", url: "https://github.com/CarlosEscribanoGonzalez/Trouble-in-NPC-Town" },
      { label: "Play on Itch.io (offline version)", url: "https://karesito.itch.io/trouble-in-npc-town" }
    ],
    badge: "phaser.png",
  },
  { //CUESTION DE PINOS
    id: "cuestion-de-pinos",
    categories: ["degree"],
    title: "Cuestión de Piños",
    subtitle: "Narrative-driven video game in virtual reality",
    description:
      `<b>Cuestión de Piños</b> is a multi-perspective VR game following the handsome but self-conscious Mario Trespiños in his search for love. 
      Experience his story across three chapters, each played through a different character's eyes.
      <br><br> 
      Your choices shape the plot and lead to multiple endings. Will Mario find love, or a cold and cruel fate?`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Virtual Reality, Interactive Story",
      "Release Date": "May 23, 2024",
      Platform: "PC (VR)",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "XR Interaction Toolkit"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/cuestin-de-pinos" }
    ],
    badge: "unity.png",
  },
  { //SKYLINE
    id: "skyline-express",
    categories: ["degree"],
    title: "Skyline Express",
    subtitle: "Endless Runner for Android with AR features",
    description:
      `<b>Skyline Express: Totally Accurate And Reliable Flying Train Service Simulator</b> is an endless runner in which players control
      a flying train. The main objective is to fly endlessly through the sky while dodging obstacles and collecting coal coins,
      which can be used to buy skins. 
      <br><br>
      The game features three different game modes: <i>Gyro Mode</i>, in which the train is controlled using the phone's gyroscope, 
      <i>Head Mode</i>, in which players control the train by tilting their head (via face tracking), and <i>Machinist Mode</i>,
      which sets the camera to the machinist's point of view and adds vertical movement (also via the gyroscope).`,
    template: "Games",
    details: {
      Language: "English",
      Genre: "Endless Runner",
      "Release Date": "January 20, 2025",
      Platform: "Android",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "ARCore, AR Foundation",
      "Team Size": "5",
      "My Role": "Programmer, Technical Artist (shaders) & AR Integration"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/skyline-express-totally-accurate-and-reliable-flying-train-service-simulator" }
    ],
    badge: "unity.png",
  },
  { //MISSILE RALLY
    id: "missile-rally",
    categories: ["degree"],
    title: "Missile Rally",
    subtitle: "Multiplayer racing game for up to four players",
    description:
      `<b>Missile Rally</b> is a multiplayer racing game for up to 4 players, where players can create a lobby,
      invite their friends and fight for first place over a number of laps. 
      <br><br>
      It is my first multiplayer project in Unity,
      built with the <i>Netcode for GameObjects</i> framework and <i>Unity Relay</i>, using a listen server architecture.`,
    template: "Games",
    details: {
      Language: "Spanish",
      Genre: "Racing",
      "Release Date": "May 13, 2024",
      Platform: "PC",
      Engine: "Unity",
      "Programming Language": "C#",
      Frameworks: "Netcode for GameObjects"
    },
    links: [
      { label: "Play", url: "https://karesito.itch.io/missile-rally" }
    ],
    badge: "unity.png",
  },
  { //PATHFINDING
    id: "pathfinding",
    categories: ["degree"],
    title: "Pathfinding & Reinforcement Learning",
    subtitle: "Q-Learning, A* and Horizon Search in Unity",
    description:
      `Unity project with two AI practices:
      <ul>
      <li>Reinforcement learning with Q-Learning: a pre-trained agent avoids getting caught by an NPC that chases him</li>
      <li>Pathfinding with A* and a Horizon Search: maze solver with enemies that have to be caught before exiting the maze</li>
      </ul>`,
    template: "Software",
    details: {
      "Programming Language": "C#",
      "Date": "January 19, 2024",
      Technologies: "Unity"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Pathfinding-and-Q-Learning" }
    ],
    badge: "unity.png",
  },
  { //SPACE INVADERS
    id: "space-invaders",
    categories: ["degree"],
    title: "Space Invaders in Own Game Engine",
    subtitle: "Space Invaders implemented in a custom, simple game engine developed in C++",
    description:
      `Very small and simple game engine written in C++ with OpenGL and GLUT, on top of which a Space Invaders 
      own simplified implementation has been built. The engine provides a scene system, an .obj model loader and a 
      fixed-timestep game loop, while the game itself is implemented as a set of scripts that use it.`,
    template: "Software",
    details: {
      "Programming Language": "C++",
      "Date": "November 23, 2022",
      "Team Size": "2"
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Space-Invaders-in-Own-Game-Engine" }
    ],
    badge: "c++.png",
  },
  { //GAME OF LIFE
    id: "gameoflife",
    categories: ["degree"],
    title: "Game of Life",
    subtitle: "Own implementation of Conway's Game of Life in JavaScript",
    description:
      `Interactive implementation of John Conway's Game of Life in JavaScript, drawn on an HTML canvas. The world is a square 
      grid of cells that live or die in each step according to the number of living neighbors they have.`,
    template: "Software",
    details: {
      "Programming Language": "JavaScript",
      "Date": "December 03, 2022",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Game-Of-Life" }
    ],
    badge: "javascript.png",
  },
  { //ARKANOID
    id: "arkanoid",
    categories: ["degree"],
    title: "Arkanoid in Assembly",
    subtitle: "Simplified Arkanoid clone written in MIPS assembly",
    description:
      `Simplified Arkanoid clone written in MIPS assembly for the MARS 4.5 simulator. The game is drawn on the Bitmap 
      Display and controlled through the Keyboard and Display MMIO Simulator.`,
    template: "Software",
    details: {
      "Programming Language": "Assembly",
      "Date": "May 23, 2023",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Arkanoid-in-Assembly" }
    ],
    badge: "assembly.png",
  },
  { //BINGO
    id: "bingo",
    categories: ["degree"],
    title: "Bingo Simulator",
    subtitle: "Bingo simulator developed in Java",
    description:
      `This bingo simulator was developed in Java for a first-year data structures course. All data structures are implemented from scratch, 
      without relying on built-in collection classes or external packages, and are used to simulate complete bingo games for 2 to 4 players.
      Developed data structures include:
      <ul>
      <li>List</li>
      <li>Linked List</li>
      <li>Sorted Linked List</li>
      <li>Set</li>
      </ul>`,
    template: "Software",
    details: {
      "Programming Language": "Java",
      "Date": "June 15, 2022",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Bingo-Simulator" }
    ],
    badge: "java.png",
  },
  { //PROCESSING
    id: "processing",
    categories: ["degree"],
    title: "Physics in Processing",
    subtitle: "Physics calculations in computers using Processing",
    description:
      `Collection of physics simulations for the course Physics in Video Games, implemented in Processing (Java mode). 
      Each sketch focuses on a different family of techniques: numerical integration, mass-spring systems, 
      penalty-based contact and impulse-based rigid body collisions.`,
    template: "Software",
    details: {
      "Programming Language": "Processing",
      "Date": "December 12, 2021",
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/CarlosEscribanoGonzalez/Physics-in-Processing" }
    ],
    badge: "processing.png",
  },
];