export default function ButtonLoader({ size = 4, color = "white" }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full h-${size} w-${size} border-2 border-${color} border-t-transparent`}
    />
  );
}
