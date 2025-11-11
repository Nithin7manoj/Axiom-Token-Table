export async function GET() {
  const tokens = [
    { id: 1, name: "ETH/USDT", price: 3021.52, category: "New Pair" },
    { id: 2, name: "BTC/USDT", price: 61321.12, category: "Final Stretch" },
    { id: 3, name: "SOL/USDT", price: 122.81, category: "Migrated" },
  ];

  return Response.json(tokens);
}
