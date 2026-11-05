export function matchesOrderFormat(order: {resolution:string;aspect_ratio:string}, resolution:unknown, aspect:unknown) {
  return order.resolution === resolution && order.aspect_ratio === aspect;
}

export function retryChoice(saved: {resolution:string;aspectRatio:string}|null, resolution:string, aspectRatio:string): "fresh"|"reuse"|"copy" {
  if (!saved) return "fresh";
  return matchesOrderFormat({resolution:saved.resolution,aspect_ratio:saved.aspectRatio},resolution,aspectRatio) ? "reuse" : "copy";
}
