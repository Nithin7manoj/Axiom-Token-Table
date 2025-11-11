"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/store/tokenSlice";
import type { RootState } from "@/store/store";

export default function TokenHeader() {
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.token.activeCategory
  );

  return (
    <Tabs
      value={activeCategory}
      onValueChange={(value) => dispatch(setCategory(value as any))}
      className="mb-4"
    >
      <TabsList>
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="New Pair">New Pairs</TabsTrigger>
        <TabsTrigger value="Final Stretch">Final Stretch</TabsTrigger>
        <TabsTrigger value="Migrated">Migrated</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}





