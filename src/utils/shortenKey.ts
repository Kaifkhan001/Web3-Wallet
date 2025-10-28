export default function ShortenKeys(key: string) {
  const newK = key.slice(0, 6) + "..." + key.slice(-6);
  return newK;
}
