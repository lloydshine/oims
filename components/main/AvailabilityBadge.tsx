export function AvailabilityBadge({ isAvailable }: { isAvailable: boolean }) {
  return (
    <div
      className={`px-2 py-1 text-white rounded-full ${
        isAvailable ? "bg-green-600" : "bg-orange-600"
      }`}
    >
      <span className="text-sm">
        {isAvailable ? "Available" : "Not Available"}
      </span>
    </div>
  );
}
