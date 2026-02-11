'use client';

import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';

/**
 * LOTTIE ANIMATION SETUP
 * ======================
 * Replace the placeholder animations below with real Lottie JSON files.
 *
 * Recommended sources (free):
 * - https://lottiefiles.com/search?q=robot+walking
 * - https://lottiefiles.com/search?q=character+pushing
 * - https://lottiefiles.com/search?q=delivery+mascot
 */

// Placeholder: Yellow robot character (walking pose with bounce)
const WALKING_ANIMATION = {
  v: "5.9.6",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "TaskFlow Bot Walking",
  ddd: 0,
  assets: [],
  layers: [
    // Head layer
    {
      ty: 4, nm: "head", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 1, k: [
          { t: 0, s: [100, 55, 0], e: [100, 50, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 15, s: [100, 50, 0], e: [100, 55, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [100, 55, 0], e: [100, 50, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 45, s: [100, 50, 0], e: [100, 55, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [100, 55, 0] }
        ]},
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [50, 45] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 12 }, nm: "head-shape" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "head-group" },
        // Eyes
        { ty: "gr", it: [
          { ty: "el", s: { a: 0, k: [10, 10] }, p: { a: 0, k: [-12, -2] }, nm: "eye-left" },
          { ty: "el", s: { a: 0, k: [10, 10] }, p: { a: 0, k: [12, -2] }, nm: "eye-right" },
          { ty: "fl", c: { a: 0, k: [0, 0, 0, 1] }, o: { a: 0, k: 100 }, nm: "eye-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "eyes-group" },
        // Antenna
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [4, 15] }, p: { a: 0, k: [0, -30] }, r: { a: 0, k: 2 }, nm: "antenna-stem" },
          { ty: "el", s: { a: 0, k: [12, 12] }, p: { a: 0, k: [0, -40] }, nm: "antenna-tip" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "antenna-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "antenna-group" }
      ]
    },
    // Body layer
    {
      ty: 4, nm: "body", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 1, k: [
          { t: 0, s: [100, 110, 0], e: [100, 105, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 15, s: [100, 105, 0], e: [100, 110, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [100, 110, 0], e: [100, 105, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 45, s: [100, 105, 0], e: [100, 110, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [100, 110, 0] }
        ]},
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [45, 55] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 8 }, nm: "body-shape" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "body-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "body-group" },
        // Chest detail
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [25, 20] }, p: { a: 0, k: [0, -5] }, r: { a: 0, k: 4 }, nm: "chest-detail" },
          { ty: "fl", c: { a: 0, k: [0, 0, 0, 1] }, o: { a: 0, k: 30 }, nm: "chest-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "chest-group" }
      ]
    },
    // Left leg (walking animation)
    {
      ty: 4, nm: "leg-left", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [85, 155, 0] },
        a: { a: 0, k: [0, -15, 0] },
        r: { a: 1, k: [
          { t: 0, s: [-20], e: [20], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [20], e: [-20], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [-20] }
        ]},
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [14, 40] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 7 }, nm: "leg-shape" },
          { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 }, nm: "leg-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "leg-group" }
      ]
    },
    // Right leg (walking animation - opposite phase)
    {
      ty: 4, nm: "leg-right", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [115, 155, 0] },
        a: { a: 0, k: [0, -15, 0] },
        r: { a: 1, k: [
          { t: 0, s: [20], e: [-20], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [-20], e: [20], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [20] }
        ]},
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [14, 40] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 7 }, nm: "leg-shape" },
          { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 }, nm: "leg-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "leg-group" }
      ]
    },
    // Left arm (pushing forward)
    {
      ty: 4, nm: "arm-left", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [72, 100, 0] },
        a: { a: 0, k: [5, 0, 0] },
        r: { a: 1, k: [
          { t: 0, s: [30], e: [-30], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [-30], e: [30], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [30] }
        ]},
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [12, 35] }, p: { a: 0, k: [0, 15] }, r: { a: 0, k: 6 }, nm: "arm-shape" },
          { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 }, nm: "arm-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "arm-group" }
      ]
    },
    // Right arm (pushing - extended forward)
    {
      ty: 4, nm: "arm-right", sr: 1, ip: 0, op: 60, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [128, 100, 0] },
        a: { a: 0, k: [-5, 0, 0] },
        r: { a: 1, k: [
          { t: 0, s: [-60], e: [-45], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 30, s: [-45], e: [-60], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 60, s: [-60] }
        ]},
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [12, 35] }, p: { a: 0, k: [0, 15] }, r: { a: 0, k: 6 }, nm: "arm-shape" },
          { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 }, nm: "arm-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "arm-group" }
      ]
    }
  ]
};

// Idle animation - gentle breathing/hovering
const IDLE_ANIMATION = {
  v: "5.9.6",
  fr: 60,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: "TaskFlow Bot Idle",
  ddd: 0,
  assets: [],
  layers: [
    // Head layer with gentle bob
    {
      ty: 4, nm: "head", sr: 1, ip: 0, op: 90, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 1, k: [
          { t: 0, s: [100, 55, 0], e: [100, 52, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 45, s: [100, 52, 0], e: [100, 55, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 90, s: [100, 55, 0] }
        ]},
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [50, 45] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 12 }, nm: "head-shape" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "head-group" },
        // Eyes with blink
        { ty: "gr", it: [
          { ty: "el", s: { a: 1, k: [
            { t: 0, s: [10, 10], e: [10, 10] },
            { t: 60, s: [10, 10], e: [10, 2] },
            { t: 65, s: [10, 2], e: [10, 10] },
            { t: 70, s: [10, 10], e: [10, 10] },
            { t: 90, s: [10, 10] }
          ]}, p: { a: 0, k: [-12, -2] }, nm: "eye-left" },
          { ty: "el", s: { a: 1, k: [
            { t: 0, s: [10, 10], e: [10, 10] },
            { t: 60, s: [10, 10], e: [10, 2] },
            { t: 65, s: [10, 2], e: [10, 10] },
            { t: 70, s: [10, 10], e: [10, 10] },
            { t: 90, s: [10, 10] }
          ]}, p: { a: 0, k: [12, -2] }, nm: "eye-right" },
          { ty: "fl", c: { a: 0, k: [0, 0, 0, 1] }, o: { a: 0, k: 100 }, nm: "eye-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "eyes-group" },
        // Antenna with glow pulse
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [4, 15] }, p: { a: 0, k: [0, -30] }, r: { a: 0, k: 2 }, nm: "antenna-stem" },
          { ty: "el", s: { a: 1, k: [
            { t: 0, s: [12, 12], e: [14, 14], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
            { t: 45, s: [14, 14], e: [12, 12], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
            { t: 90, s: [12, 12] }
          ]}, p: { a: 0, k: [0, -40] }, nm: "antenna-tip" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "antenna-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "antenna-group" }
      ]
    },
    // Body
    {
      ty: 4, nm: "body", sr: 1, ip: 0, op: 90, st: 0,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 1, k: [
          { t: 0, s: [100, 110, 0], e: [100, 107, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 45, s: [100, 107, 0], e: [100, 110, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: 90, s: [100, 110, 0] }
        ]},
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [45, 55] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 8 }, nm: "body-shape" },
          { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] }, o: { a: 0, k: 100 }, nm: "body-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "body-group" },
        { ty: "gr", it: [
          { ty: "rc", s: { a: 0, k: [25, 20] }, p: { a: 0, k: [0, -5] }, r: { a: 0, k: 4 }, nm: "chest-detail" },
          { ty: "fl", c: { a: 0, k: [0, 0, 0, 1] }, o: { a: 0, k: 30 }, nm: "chest-fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ], nm: "chest-group" }
      ]
    },
    // Legs (static in idle)
    {
      ty: 4, nm: "leg-left", sr: 1, ip: 0, op: 90, st: 0,
      ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [85, 155, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      shapes: [{ ty: "gr", it: [
        { ty: "rc", s: { a: 0, k: [14, 40] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 7 } },
        { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ], nm: "leg-group" }]
    },
    {
      ty: 4, nm: "leg-right", sr: 1, ip: 0, op: 90, st: 0,
      ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [115, 155, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      shapes: [{ ty: "gr", it: [
        { ty: "rc", s: { a: 0, k: [14, 40] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 7 } },
        { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ], nm: "leg-group" }]
    },
    // Arms (relaxed at sides)
    {
      ty: 4, nm: "arm-left", sr: 1, ip: 0, op: 90, st: 0,
      ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [72, 100, 0] }, a: { a: 0, k: [5, 0, 0] }, r: { a: 0, k: 10 }, s: { a: 0, k: [100, 100, 100] } },
      shapes: [{ ty: "gr", it: [
        { ty: "rc", s: { a: 0, k: [12, 35] }, p: { a: 0, k: [0, 15] }, r: { a: 0, k: 6 } },
        { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ], nm: "arm-group" }]
    },
    {
      ty: 4, nm: "arm-right", sr: 1, ip: 0, op: 90, st: 0,
      ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [128, 100, 0] }, a: { a: 0, k: [-5, 0, 0] }, r: { a: 0, k: -10 }, s: { a: 0, k: [100, 100, 100] } },
      shapes: [{ ty: "gr", it: [
        { ty: "rc", s: { a: 0, k: [12, 35] }, p: { a: 0, k: [0, 15] }, r: { a: 0, k: 6 } },
        { ty: "fl", c: { a: 0, k: [0.85, 0.7, 0, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ], nm: "arm-group" }]
    }
  ]
};

export interface AnimatedCharacterRef {
  playWalking: () => void;
  playIdle: () => void;
  stop: () => void;
}

interface AnimatedCharacterProps {
  className?: string;
  size?: number;
}

// Dynamically import Lottie only on client side
const AnimatedCharacter = forwardRef<AnimatedCharacterRef, AnimatedCharacterProps>(
  ({ className = '', size = 120 }, ref) => {
    const [animationType, setAnimationType] = useState<'walking' | 'idle'>('idle');
    const [LottieComponent, setLottieComponent] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Load Lottie dynamically on client side only
    useEffect(() => {
      setIsMounted(true);
      import('lottie-react').then((mod) => {
        setLottieComponent(() => mod.default);
      });
    }, []);

    useImperativeHandle(ref, () => ({
      playWalking: () => setAnimationType('walking'),
      playIdle: () => setAnimationType('idle'),
      stop: () => {}
    }));

    const animationData = animationType === 'walking' ? WALKING_ANIMATION : IDLE_ANIMATION;

    // Don't render anything on server or before mounted
    if (!isMounted || !LottieComponent) {
      return (
        <div
          className={`pointer-events-none select-none ${className}`}
          style={{ width: size, height: size }}
        />
      );
    }

    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{ width: size, height: size }}
      >
        <LottieComponent
          key={animationType}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }
);

AnimatedCharacter.displayName = 'AnimatedCharacter';

export default AnimatedCharacter;
