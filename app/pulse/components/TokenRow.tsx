"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TokenRow({ token }: { token: any }) {
  const [price, setPrice] = useState(token.price);
  const [prevPrice, setPrevPrice] = useState(token.price);
  const [open, setOpen] = useState(false);

  //Realtime price update (mock websocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevPrice(price);
      const change = (Math.random() - 0.5) * 3;
      setPrice((prev: number) => +(prev + change).toFixed(2));
    }, 2000);

    return () => clearInterval(interval);
  }, [price]);

  //Decide color based on price movement
  const priceColor =
    price > prevPrice
      ? "text-green-500"
      : price < prevPrice
      ? "text-red-500"
      : "text-foreground";

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          className="
            grid grid-cols-4 items-center px-4 py-3 cursor-pointer border-b
            hover:bg-muted/60 transition-colors
            first:rounded-t-lg last:rounded-b-lg
          "
          onClick={() => setOpen(true)}
        >
          {/* Tooltip on hover */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-semibold tracking-tight">{token.name}</span>
            </TooltipTrigger>
            <TooltipContent>Click for details</TooltipContent>
          </Tooltip>

          {/* Popover on price + animated color change */}
          <Popover>
            <PopoverTrigger
              className={`font-semibold transition-colors duration-500 ${priceColor}`}
            >
              {price}
            </PopoverTrigger>
            <PopoverContent className="text-sm">
              Live price update (mock websocket)
            </PopoverContent>
          </Popover>

          <span className="text-sm opacity-70">{token.category}</span>
          <span className="text-green-600 font-medium">+2.1%</span>
        </div>

        {/* Modal details */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{token.name} Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <p>
              <strong>Price:</strong> {price}
            </p>
            <p>
              <strong>Category:</strong> {token.category}
            </p>
            <p>Updates every 2 seconds (mock websocket)</p>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}




