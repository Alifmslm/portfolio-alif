import { motionValue } from "motion/react";

/**
 * Horizontal rail velocity in px/s, driven by ProjectFeed's onScroll.
 * LiquidImage frames add this to the vertical scroll velocity so the
 * RGB-split warp fires when swiping the rail sideways too.
 */
export const railVelocity = motionValue(0);
