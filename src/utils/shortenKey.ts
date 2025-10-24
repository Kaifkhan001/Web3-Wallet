export default function ShortenKeys(key: string) {
  const newK = key.slice(0, 4) + "..." + key.slice(-4);
  return newK;
}
