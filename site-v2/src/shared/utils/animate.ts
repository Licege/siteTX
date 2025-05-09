import BezierEasing from 'bezier-easing';

export const EASING = {
  EASE_OUT_CIRC: BezierEasing(0, 0.55, 0.45, 1),
  EASE_IN_OUT: BezierEasing(0.42, 0, 0.58, 1),
  EASE_IN: BezierEasing(0.42, 0, 1, 1),
  EASE_OUT: BezierEasing(0, 0, 0.58, 1),
  LINEAR: BezierEasing(0, 0, 1, 1),
};

export const animate = (
  durationMs: number,
  easeFn: BezierEasing.EasingFunction,
  handler: (animationProgress: number, delta: number) => void
) => {
  let frameId: number;
  let isCancelled = false;
  let startTime: DOMHighResTimeStamp | undefined;
  let prevAnimationProgress = 0;

  const loop = (currentTime: number) => {
    if (isCancelled) return;

    if (!startTime) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const animationTime = durationMs * easeFn(Math.min(elapsedTime, durationMs) / durationMs);
    const currentAnimationProgress = animationTime / durationMs;

    handler(currentAnimationProgress, currentAnimationProgress - prevAnimationProgress);
    prevAnimationProgress = currentAnimationProgress;

    if (elapsedTime < durationMs) frameId = requestAnimationFrame(loop);
  };

  frameId = requestAnimationFrame(loop);

  return () => {
    isCancelled = true;
    cancelAnimationFrame(frameId);
  };
};
