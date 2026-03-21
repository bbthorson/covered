import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
      <p className="mt-4 text-warm-500">Loading screening...</p>
    </div>
  );
}
