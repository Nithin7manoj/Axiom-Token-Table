"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import TokenRow from "./TokenRow";
import TokenHeader from "./TokenHeader";
import { sortByName, sortByPrice } from "@/store/tokenSlice";
import { Skeleton } from "@/components/ui/skeleton";

export default function TokenTable() {
  const dispatch = useDispatch();

  const { activeCategory, sortBy, sortDirection } = useSelector(
    (state: RootState) => state.token
  );

  const {
    data: tokens = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      const res = await fetch("/api/tokens");
      if (!res.ok) throw new Error("Failed to fetch tokens");
      return res.json();
    },
    refetchInterval: 5000, // refreshes every 5s for realism
  });

  // Filtering
  const filteredTokens =
    activeCategory === "All"
      ? tokens
      : tokens.filter((token: any) => token.category === activeCategory);

  // Sorting logic (name / price)
  const sortedTokens = [...filteredTokens].sort((a: any, b: any) => {
    const valueA = sortBy === "price" ? a.price : a.name.toLowerCase();
    const valueB = sortBy === "price" ? b.price : b.name.toLowerCase();

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <TokenHeader />

      {/* Table header */}
      <div className="grid grid-cols-4 px-4 py-2 text-xs uppercase tracking-wide bg-muted font-semibold text-muted-foreground border-y">
        <button onClick={() => dispatch(sortByName())} className="text-left">
          Token ⬍
        </button>
        <button onClick={() => dispatch(sortByPrice())} className="text-left">
          Price ⬍
        </button>
        <p className="text-left">Category</p>
        <p className="text-left">24h Change</p>
      </div>

      <div className="rounded-md border bg-card text-card-foreground">
        {/* Skeleton shimmer while loading */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 p-4 border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}

        {/* Error boundary */}
        {isError && (
          <p className="p-4 text-center text-red-500">
            Failed to load tokens. Please try again.
          </p>
        )}

        {/* Final sorted + filtered rows */}
        {!isLoading &&
          !isError &&
          sortedTokens.map((token: any) => (
            <TokenRow key={token.id} token={token} />
          ))}
      </div>
    </div>
  );
}




